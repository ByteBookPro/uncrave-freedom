import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Flame, Calendar, Clock, TrendingUp, Heart, Award, Zap, Shield, ChevronDown, ChevronUp } from 'lucide-react';
import { useCourseDays, useUserDayCompletions } from '@/hooks/useCourseData';
import { useApp } from '@/contexts/AppContext';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { cn } from '@/lib/utils';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

// Trigger labels for display
const TRIGGER_LABELS: Record<string, { label: string; emoji: string }> = {
  stress: { label: 'Stress', emoji: '😰' },
  anxiety: { label: 'Anxiety', emoji: '😟' },
  boredom: { label: 'Boredom', emoji: '😑' },
  loneliness: { label: 'Loneliness', emoji: '😔' },
  celebration: { label: 'Celebration', emoji: '🎉' },
  frustration: { label: 'Frustration', emoji: '😤' },
  morning: { label: 'Waking Up', emoji: '🌅' },
  coffee: { label: 'With Coffee', emoji: '☕' },
  after_meal: { label: 'After Meals', emoji: '🍽️' },
  commute: { label: 'Driving/Commute', emoji: '🚗' },
  work_break: { label: 'Work Breaks', emoji: '⏰' },
  evening: { label: 'Evening/Before Bed', emoji: '🌙' },
  social: { label: 'Social Events', emoji: '👥' },
  alcohol: { label: 'With Alcohol', emoji: '🍺' },
  phone_call: { label: 'Phone Calls', emoji: '📞' },
  seeing_others: { label: 'Seeing Others Smoke', emoji: '🚬' },
};

export function ProgressTab() {
  const { user } = useApp();
  const { user: authUser } = useAuth();
  const { data: days } = useCourseDays();
  const { data: completions } = useUserDayCompletions();
  
  const [triggers, setTriggers] = useState<string[]>([]);
  const [alternatives, setAlternatives] = useState<Record<string, string[]>>({});
  const [isTriggersOpen, setIsTriggersOpen] = useState(false);

  // Load triggers and alternatives
  useEffect(() => {
    const loadData = async () => {
      if (!authUser) return;

      const { data, error } = await supabase
        .from('profiles')
        .select('triggers, trigger_alternatives')
        .eq('id', authUser.id)
        .single();

      if (!error && data) {
        setTriggers((data.triggers as string[]) || []);
        setAlternatives((data.trigger_alternatives as Record<string, string[]>) || {});
      }
    };

    loadData();
  }, [authUser]);

  const completedCount = completions?.length || 0;
  const totalDays = days?.length || 10;
  const progressPercent = (completedCount / totalDays) * 100;

  // Calculate streak (consecutive days)
  const streak = completedCount; // Simplified - would need date checking for real streak

  // Calculate total time spent
  const totalSeconds = completions?.reduce((sum, c) => sum + (c.total_duration_seconds || 0), 0) || 0;
  const totalMinutes = Math.round(totalSeconds / 60);

  // Calculate days since quit (if quit_date exists)
  const quitDate = user?.quitDate ? new Date(user.quitDate) : null;
  const daysSinceQuit = quitDate 
    ? Math.floor((Date.now() - quitDate.getTime()) / (1000 * 60 * 60 * 24))
    : 0;

  // Calculate money saved (assuming $15/pack, 20 cigs/pack)
  const cigsPerDay = user?.cigarettesPerDay || 10;
  const moneySaved = quitDate 
    ? ((cigsPerDay / 20) * 15 * daysSinceQuit).toFixed(2)
    : '0.00';

  // Calculate cigarettes not smoked
  const cigsNotSmoked = daysSinceQuit * cigsPerDay;

  const getTriggerDisplay = (triggerId: string) => {
    return TRIGGER_LABELS[triggerId] || { label: triggerId, emoji: '📌' };
  };

  const totalStrategies = Object.values(alternatives).flat().length;

  return (
    <div className="p-4 space-y-6 pb-24">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-2xl font-bold">Your Progress</h1>
        <p className="text-muted-foreground">
          Every step forward is a victory
        </p>
      </div>

      {/* Streak Card */}
      <Card className="overflow-hidden">
        <div className="gradient-warmth p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-80">Current Streak</p>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-4xl font-bold">{streak}</span>
                <span className="text-lg">days</span>
              </div>
            </div>
            <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
              <Flame className="w-8 h-8" />
            </div>
          </div>
        </div>
      </Card>

      {/* Course Progress */}
      <Card className="p-4 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">Course Progress</h3>
          <span className="text-sm text-muted-foreground">{completedCount}/{totalDays} days</span>
        </div>
        
        <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
          <div 
            className="h-full gradient-success rounded-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        <div className="grid grid-cols-10 gap-1">
          {Array.from({ length: totalDays }).map((_, i) => {
            const dayNum = i + 1;
            const day = days?.find(d => d.day_number === dayNum);
            const isCompleted = day && completions?.some(c => c.day_id === day.id);
            
            return (
              <div
                key={i}
                className={cn(
                  "aspect-square rounded-lg flex items-center justify-center text-xs font-medium transition-all",
                  isCompleted 
                    ? "gradient-success text-white" 
                    : "bg-muted text-muted-foreground"
                )}
              >
                {dayNum}
              </div>
            );
          })}
        </div>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-primary/10">
              <Clock className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold">{totalMinutes}</p>
              <p className="text-xs text-muted-foreground">Minutes practiced</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-success/10">
              <Calendar className="w-5 h-5 text-success" />
            </div>
            <div>
              <p className="text-2xl font-bold">{daysSinceQuit}</p>
              <p className="text-xs text-muted-foreground">Days smoke-free</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-accent/10">
              <TrendingUp className="w-5 h-5 text-accent" />
            </div>
            <div>
              <p className="text-2xl font-bold">${moneySaved}</p>
              <p className="text-xs text-muted-foreground">Money saved</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-coral/10">
              <Heart className="w-5 h-5 text-coral" />
            </div>
            <div>
              <p className="text-2xl font-bold">{cigsNotSmoked}</p>
              <p className="text-xs text-muted-foreground">Cigarettes avoided</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Triggers & Coping Strategies Summary */}
      {triggers.length > 0 && (
        <Collapsible open={isTriggersOpen} onOpenChange={setIsTriggersOpen}>
          <Card className="overflow-hidden">
            <CollapsibleTrigger className="w-full p-4 flex items-center justify-between hover:bg-muted/50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-primary/10">
                  <Shield className="w-5 h-5 text-primary" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold">Your Coping Plan</h3>
                  <p className="text-xs text-muted-foreground">
                    {triggers.length} triggers • {totalStrategies} strategies
                  </p>
                </div>
              </div>
              {isTriggersOpen ? (
                <ChevronUp className="w-5 h-5 text-muted-foreground" />
              ) : (
                <ChevronDown className="w-5 h-5 text-muted-foreground" />
              )}
            </CollapsibleTrigger>
            
            <CollapsibleContent>
              <div className="px-4 pb-4 space-y-3 border-t pt-3">
                {triggers.map((triggerId) => {
                  const display = getTriggerDisplay(triggerId);
                  const strategies = alternatives[triggerId] || [];
                  
                  return (
                    <div key={triggerId} className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{display.emoji}</span>
                        <span className="font-medium text-sm">{display.label}</span>
                      </div>
                      {strategies.length > 0 ? (
                        <div className="flex flex-wrap gap-1.5 pl-7">
                          {strategies.map((strategy, idx) => (
                            <span
                              key={idx}
                              className="inline-flex items-center gap-1 px-2 py-0.5 bg-success/10 text-success text-xs rounded-full"
                            >
                              <Zap className="w-3 h-3" />
                              {strategy}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <p className="text-xs text-muted-foreground pl-7 italic">
                          No strategies set yet
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </CollapsibleContent>
          </Card>
        </Collapsible>
      )}

      {/* Achievements */}
      <Card className="p-4 space-y-4">
        <h3 className="font-semibold flex items-center gap-2">
          <Award className="w-5 h-5 text-accent" />
          Achievements
        </h3>
        
        <div className="grid grid-cols-4 gap-3">
          {[
            { earned: completedCount >= 1, label: 'Day 1', emoji: '🌱' },
            { earned: completedCount >= 3, label: '3 Days', emoji: '🌿' },
            { earned: completedCount >= 7, label: '1 Week', emoji: '🌳' },
            { earned: completedCount >= 10, label: 'Graduate', emoji: '🎓' },
          ].map((badge, i) => (
            <div key={i} className="text-center">
              <div className={cn(
                "w-12 h-12 mx-auto rounded-full flex items-center justify-center text-2xl transition-all",
                badge.earned 
                  ? "bg-accent/20" 
                  : "bg-muted grayscale opacity-50"
              )}>
                {badge.emoji}
              </div>
              <p className="text-xs mt-1 text-muted-foreground">{badge.label}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
