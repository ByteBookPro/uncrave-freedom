import React from 'react';
import { Button } from '@/components/ui/button';
import { useApp } from '@/contexts/AppContext';
import { programDays } from '@/data/programContent';
import { 
  ArrowLeft, 
  Lock, 
  Check, 
  Play,
  Clock,
  ChevronRight
} from 'lucide-react';

export function ProgramView() {
  const { user, setCurrentView, setSelectedDay } = useApp();

  if (!user) return null;

  const handleDayClick = (day: number) => {
    const dayContent = programDays[day - 1];
    if (!dayContent.isLocked || day <= user.currentDay) {
      setSelectedDay(day);
      setCurrentView('session');
    }
  };

  return (
    <div className="min-h-screen gradient-dawn pb-8">
      {/* Header */}
      <div className="bg-card border-b border-border p-4 sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setCurrentView('dashboard')}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-xl font-bold font-display">10-Day Program</h1>
            <p className="text-sm text-muted-foreground">
              {user.completedDays.length} of 10 days completed
            </p>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="p-6">
        <div className="space-y-4">
          {programDays.map((day, index) => {
            const isCompleted = user.completedDays.includes(day.day);
            const isCurrent = day.day === user.currentDay;
            const isLocked = day.day > user.currentDay;
            const isQuitDay = day.day === 6;

            return (
              <button
                key={day.day}
                onClick={() => handleDayClick(day.day)}
                disabled={isLocked}
                className={`w-full text-left transition-all duration-300 ${
                  isLocked ? 'opacity-60 cursor-not-allowed' : 'hover:scale-[1.02]'
                }`}
              >
                <div className={`relative bg-card rounded-2xl p-5 shadow-soft ${
                  isCurrent ? 'ring-2 ring-primary shadow-card' : ''
                } ${isCompleted ? 'bg-success/5' : ''}`}>
                  {/* Timeline connector */}
                  {index < programDays.length - 1 && (
                    <div className={`absolute left-[2.25rem] top-full w-0.5 h-4 ${
                      isCompleted ? 'bg-success' : 'bg-border'
                    }`} />
                  )}

                  <div className="flex items-start gap-4">
                    {/* Day indicator */}
                    <div className={`w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 ${
                      isCompleted 
                        ? 'gradient-success text-success-foreground' 
                        : isCurrent 
                        ? 'gradient-hero text-primary-foreground animate-pulse-soft'
                        : isQuitDay
                        ? 'bg-coral/20 text-coral'
                        : 'bg-muted text-muted-foreground'
                    }`}>
                      {isCompleted ? (
                        <Check className="w-6 h-6" />
                      ) : isLocked ? (
                        <Lock className="w-5 h-5" />
                      ) : (
                        <span className="text-lg font-bold">{day.day}</span>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                          isQuitDay 
                            ? 'bg-coral/20 text-coral' 
                            : day.day > 6 
                            ? 'bg-success/20 text-success'
                            : 'bg-primary/10 text-primary'
                        }`}>
                          Day {day.day}
                        </span>
                        {isQuitDay && (
                          <span className="text-xs bg-coral text-coral-foreground px-2 py-0.5 rounded-full">
                            Quit Day
                          </span>
                        )}
                      </div>
                      <h3 className="font-bold font-display text-foreground mb-1 truncate">
                        {day.title}
                      </h3>
                      <p className="text-sm text-muted-foreground truncate mb-2">
                        {day.subtitle}
                      </p>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {day.duration}
                        </span>
                        <span>{day.modules.length} modules</span>
                      </div>
                    </div>

                    {/* Action */}
                    <div className="flex items-center">
                      {isCurrent && !isCompleted ? (
                        <div className="w-10 h-10 rounded-full gradient-hero flex items-center justify-center">
                          <Play className="w-4 h-4 text-primary-foreground" />
                        </div>
                      ) : !isLocked ? (
                        <ChevronRight className="w-5 h-5 text-muted-foreground" />
                      ) : null}
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Info Card */}
        <div className="mt-8 bg-primary/5 rounded-2xl p-6 border border-primary/20">
          <h3 className="font-bold font-display mb-2 flex items-center gap-2">
            <span className="text-xl">💡</span>
            How It Works
          </h3>
          <p className="text-sm text-muted-foreground mb-3">
            Complete each day's session (15-20 min) at your own pace. You can continue smoking normally until Day 6 — that's when you'll smoke your last cigarette.
          </p>
          <p className="text-sm text-muted-foreground">
            Days 7-10 focus on staying smoke-free and building your new identity as a non-smoker.
          </p>
        </div>
      </div>
    </div>
  );
}
