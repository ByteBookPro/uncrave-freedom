import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { CourseDay, DayModule, Practice, UserProgress, UserDayCompletion } from '@/types/database';
import { useAuth } from '@/contexts/AuthContext';

export function useCourseDays() {
  return useQuery({
    queryKey: ['course-days'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('course_days')
        .select('*')
        .eq('is_published', true)
        .order('day_number');
      
      if (error) throw error;
      return data as CourseDay[];
    }
  });
}

export function useDayModules(dayId: string | null) {
  return useQuery({
    queryKey: ['day-modules', dayId],
    queryFn: async () => {
      if (!dayId) return [];
      
      const { data, error } = await supabase
        .from('day_modules')
        .select('*')
        .eq('day_id', dayId)
        .order('order_index');
      
      if (error) throw error;
      return data as DayModule[];
    },
    enabled: !!dayId
  });
}

export function usePractices() {
  return useQuery({
    queryKey: ['practices'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('practices')
        .select('*')
        .order('order_index');
      
      if (error) throw error;
      return data as Practice[];
    }
  });
}

export function useUserProgress() {
  const { user } = useAuth();
  
  return useQuery({
    queryKey: ['user-progress', user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      const { data, error } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', user.id);
      
      if (error) throw error;
      return data as UserProgress[];
    },
    enabled: !!user
  });
}

export function useUserDayCompletions() {
  const { user } = useAuth();
  
  return useQuery({
    queryKey: ['user-day-completions', user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      const { data, error } = await supabase
        .from('user_day_completions')
        .select('*')
        .eq('user_id', user.id);
      
      if (error) throw error;
      return data as UserDayCompletion[];
    },
    enabled: !!user
  });
}

export function useCurrentDay() {
  const { data: completions } = useUserDayCompletions();
  const { data: days } = useCourseDays();
  
  if (!days || !completions) return 1;
  
  // Find the highest completed day number
  const completedDayIds = new Set(completions.map(c => c.day_id));
  const completedDayNumbers = days
    .filter(d => completedDayIds.has(d.id))
    .map(d => d.day_number);
  
  const highestCompleted = Math.max(0, ...completedDayNumbers);
  return Math.min(highestCompleted + 1, 10);
}
