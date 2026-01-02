import { useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useQueryClient } from '@tanstack/react-query';
import { useEventTracking } from './useEventTracking';

export function useProgress() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const { trackEvent } = useEventTracking();

  const updateModuleProgress = useCallback(async (
    dayId: string,
    moduleId: string,
    secondsWatched: number,
    totalActiveSeconds: number
  ) => {
    if (!user) return;

    const { error } = await supabase
      .from('user_progress')
      .upsert({
        user_id: user.id,
        day_id: dayId,
        module_id: moduleId,
        seconds_watched: secondsWatched,
        total_active_seconds: totalActiveSeconds,
        updated_at: new Date().toISOString()
      }, {
        onConflict: 'user_id,day_id,module_id'
      });

    if (!error) {
      queryClient.invalidateQueries({ queryKey: ['user-progress'] });
    }
  }, [user, queryClient]);

  const completeModule = useCallback(async (
    dayId: string,
    moduleId: string,
    secondsWatched: number,
    totalActiveSeconds: number
  ) => {
    if (!user) return;

    const { error } = await supabase
      .from('user_progress')
      .upsert({
        user_id: user.id,
        day_id: dayId,
        module_id: moduleId,
        seconds_watched: secondsWatched,
        total_active_seconds: totalActiveSeconds,
        completed_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }, {
        onConflict: 'user_id,day_id,module_id'
      });

    if (!error) {
      trackEvent('complete_module', { dayId, moduleId, secondsWatched });
      queryClient.invalidateQueries({ queryKey: ['user-progress'] });
    }
  }, [user, queryClient, trackEvent]);

  const completeDay = useCallback(async (
    dayId: string,
    totalDurationSeconds: number
  ) => {
    if (!user) return;

    const { error } = await supabase
      .from('user_day_completions')
      .upsert({
        user_id: user.id,
        day_id: dayId,
        total_duration_seconds: totalDurationSeconds,
        completed_at: new Date().toISOString()
      }, {
        onConflict: 'user_id,day_id'
      });

    if (!error) {
      trackEvent('complete_day', { dayId, totalDurationSeconds });
      queryClient.invalidateQueries({ queryKey: ['user-day-completions'] });
    }
  }, [user, queryClient, trackEvent]);

  const logPractice = useCallback(async (
    practiceId: string,
    durationSeconds: number,
    intensityBefore?: number,
    intensityAfter?: number,
    metadata?: Record<string, unknown>
  ) => {
    if (!user) return;

    const { error } = await supabase
      .from('user_practice_logs')
      .insert([{
        user_id: user.id,
        practice_id: practiceId,
        duration_seconds: durationSeconds,
        intensity_before: intensityBefore,
        intensity_after: intensityAfter,
        metadata_json: metadata || {}
      }]);

    if (!error) {
      trackEvent('practice_complete', { practiceId, durationSeconds, intensityBefore, intensityAfter });
    }
  }, [user, trackEvent]);

  const logCraving = useCallback(async (
    intensity: number,
    triggerTag?: string,
    contextTag?: string,
    copingUsed?: string,
    overcame: boolean = true
  ) => {
    if (!user) return;

    const { error } = await supabase
      .from('craving_logs')
      .insert([{
        user_id: user.id,
        intensity,
        trigger_tag: triggerTag,
        context_tag: contextTag,
        coping_used: copingUsed,
        overcame
      }]);

    if (!error) {
      trackEvent('craving_logged', { intensity, triggerTag, contextTag, overcame });
    }
  }, [user, trackEvent]);

  return {
    updateModuleProgress,
    completeModule,
    completeDay,
    logPractice,
    logCraving
  };
}
