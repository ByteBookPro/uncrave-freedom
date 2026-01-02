import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Play, Clock, CheckCircle2, Lock } from 'lucide-react';
import { useCourseDays, useUserDayCompletions, useDayModules } from '@/hooks/useCourseData';
import { useApp } from '@/contexts/AppContext';
import { cn } from '@/lib/utils';

export function TodayTab() {
  const { setCurrentView, setSelectedDay, user } = useApp();
  const { data: days, isLoading: daysLoading } = useCourseDays();
  const { data: completions } = useUserDayCompletions();

  // Calculate current day based on completions
  const completedDayIds = new Set(completions?.map(c => c.day_id) || []);
  const completedDayNumbers = days?.filter(d => completedDayIds.has(d.id)).map(d => d.day_number) || [];
  const highestCompleted = Math.max(0, ...completedDayNumbers);
  const currentDayNumber = Math.min(highestCompleted + 1, 10);

  const currentDay = days?.find(d => d.day_number === currentDayNumber);
  const isCurrentDayComplete = currentDay ? completedDayIds.has(currentDay.id) : false;

  const handleStartSession = () => {
    if (currentDay) {
      setSelectedDay(currentDay.day_number);
      setCurrentView('session');
    }
  };

  if (daysLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-4 space-y-6 pb-24">
      {/* Greeting */}
      <div className="space-y-1">
        <h1 className="text-2xl font-bold">
          {user?.name ? `Welcome back, ${user.name.split(' ')[0]}!` : 'Welcome back!'}
        </h1>
        <p className="text-muted-foreground">
          {isCurrentDayComplete 
            ? "Great job today! Come back tomorrow for your next session." 
            : "Ready for today's session?"}
        </p>
      </div>

      {/* Current Day Card */}
      {currentDay && (
        <Card className="overflow-hidden shadow-card">
          <div className="gradient-hero p-6 text-primary-foreground">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <p className="text-sm opacity-80">Day {currentDay.day_number}</p>
                <h2 className="text-xl font-bold">{currentDay.title}</h2>
                {currentDay.subtitle && (
                  <p className="text-sm opacity-90">{currentDay.subtitle}</p>
                )}
              </div>
              {isCurrentDayComplete ? (
                <CheckCircle2 className="w-8 h-8" />
              ) : (
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                  <Play className="w-6 h-6 ml-0.5" />
                </div>
              )}
            </div>
          </div>
          
          <div className="p-4 space-y-4">
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                <span>{Math.round(currentDay.min_duration_seconds / 60)}-{Math.round(currentDay.max_duration_seconds / 60)} min</span>
              </div>
            </div>

            <Button 
              onClick={handleStartSession}
              className="w-full gradient-hero text-primary-foreground shadow-button"
              size="lg"
              disabled={isCurrentDayComplete}
            >
              {isCurrentDayComplete ? (
                <>
                  <CheckCircle2 className="w-5 h-5 mr-2" />
                  Completed
                </>
              ) : (
                <>
                  <Play className="w-5 h-5 mr-2" />
                  Start Session
                </>
              )}
            </Button>
          </div>
        </Card>
      )}

      {/* All Days Overview */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold">Your Journey</h3>
        <div className="space-y-2">
          {days?.map((day) => {
            const isCompleted = completedDayIds.has(day.id);
            const isLocked = day.day_number > currentDayNumber;
            const isCurrent = day.day_number === currentDayNumber;

            return (
              <button
                key={day.id}
                onClick={() => {
                  if (!isLocked) {
                    setSelectedDay(day.day_number);
                    setCurrentView('session');
                  }
                }}
                disabled={isLocked}
                className={cn(
                  "w-full flex items-center gap-4 p-4 rounded-xl transition-all text-left",
                  isCompleted && "bg-success/10 border border-success/30",
                  isCurrent && !isCompleted && "bg-primary/10 border border-primary/30",
                  isLocked && "bg-muted/50 opacity-60",
                  !isCompleted && !isCurrent && !isLocked && "bg-card border border-border hover:border-primary/50"
                )}
              >
                <div className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold",
                  isCompleted && "bg-success text-success-foreground",
                  isCurrent && !isCompleted && "gradient-hero text-primary-foreground",
                  isLocked && "bg-muted text-muted-foreground",
                  !isCompleted && !isCurrent && !isLocked && "bg-muted text-foreground"
                )}>
                  {isCompleted ? (
                    <CheckCircle2 className="w-5 h-5" />
                  ) : isLocked ? (
                    <Lock className="w-4 h-4" />
                  ) : (
                    day.day_number
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <p className={cn(
                    "font-medium truncate",
                    isLocked && "text-muted-foreground"
                  )}>
                    {day.title}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {Math.round(day.min_duration_seconds / 60)} min
                  </p>
                </div>

                {isCurrent && !isCompleted && (
                  <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">
                    Today
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
