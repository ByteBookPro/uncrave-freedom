import { useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

type EventType = 
  | 'app_open'
  | 'start_day'
  | 'complete_day'
  | 'start_module'
  | 'complete_module'
  | 'media_play'
  | 'media_complete'
  | 'practice_start'
  | 'practice_complete'
  | 'craving_logged'
  | 'paywall_view'
  | 'subscribe_success';

export function useEventTracking() {
  const { user } = useAuth();

  const trackEvent = useCallback(async (
    eventType: EventType,
    payload: Record<string, unknown> = {}
  ) => {
    try {
      await supabase.from('events').insert([{
        user_id: user?.id || null,
        event_type: eventType,
        payload_json: payload
      }]);
    } catch (error) {
      console.error('Failed to track event:', error);
    }
  }, [user]);

  return { trackEvent };
}
