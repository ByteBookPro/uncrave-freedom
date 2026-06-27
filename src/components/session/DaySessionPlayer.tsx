import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useApp } from '@/contexts/AppContext';
import { useAuth } from '@/contexts/AuthContext';
import { MediaPlayer } from './MediaPlayer';
import { AnimatedSlides } from './AnimatedSlides';
import { BreathingCoach } from '../practices/BreathingCoach';
import { UrgeSurfing } from '../practices/UrgeSurfing';
import { BodyScan } from '../practices/BodyScan';
import { TriggerChecklist } from '../TriggerChecklist';
import { TriggerAlternatives } from '../TriggerAlternatives';
import { 
  ArrowLeft, 
  ArrowRight,
  Check,
  X,
  Lock,
  Play,
  Timer,
  Sparkles,
  AlertCircle,
  Heart,
  Target,
  Cigarette,
  Clock
} from 'lucide-react';
import { cn } from '@/lib/utils';
import slideImageManifest from '@/data/slideImageManifest.json';

// Module types matching database schema
type ModuleType = 'STORY_VIDEO' | 'ANIMATED_SLIDES' | 'COACH_VIDEO' | 'GUIDED_PRACTICE' | 'CHECKPOINT' | 'CRAVING_TOOL' | 'TRIGGER_ALTERNATIVES';
type PracticeType = 'BREATHING' | 'URGE_SURFING' | 'BODY_SCAN' | 'TRIGGER_SCAN' | 'THOUGHT_REFRAME' | 'VISUALIZATION';

interface SessionModule {
  id: string;
  title: string;
  description?: string;
  type: ModuleType;
  estimatedSeconds: number;
  gatingRequired: boolean;
  practiceType?: PracticeType;
  content?: {
    slides?: Array<{ id: string; title: string; content: string; backgroundGradient?: string; icon?: string }>;
    videoUrl?: string;
    transcript?: string;
    practiceConfig?: Record<string, unknown>;
  };
}

interface ModuleProgress {
  moduleId: string;
  watchedSeconds: number;
  watchedPercent: number;
  isCompleted: boolean;
  practiceCompleted?: boolean;
}

interface DaySessionPlayerProps {
  dayNumber: number;
  dayTitle: string;
  modules: SessionModule[];
  onComplete: () => void;
  onClose: () => void;
}

const MIN_SESSION_SECONDS = 900; // 15 minutes
const GATING_THRESHOLD = 0.9; // 90% watch requirement

export function DaySessionPlayer({
  dayNumber,
  dayTitle,
  modules,
  onComplete,
  onClose
}: DaySessionPlayerProps) {
  const { addJournalEntry, user: appUser } = useApp();
  const { profile } = useAuth();
  
  // Session state
  const [currentModuleIndex, setCurrentModuleIndex] = useState(0);
  const [moduleProgress, setModuleProgress] = useState<Record<string, ModuleProgress>>({});
  const [totalActiveSeconds, setTotalActiveSeconds] = useState(0);
  const [sessionStartTime] = useState(Date.now());
  const [showCompletion, setShowCompletion] = useState(false);
  const [activePractice, setActivePractice] = useState<PracticeType | null>(null);

  // Safe access to current module with bounds checking
  const safeModuleIndex = Math.min(Math.max(0, currentModuleIndex), Math.max(0, modules.length - 1));
  const currentModule = modules.length > 0 ? modules[safeModuleIndex] : null;
  
  // Calculate overall progress
  const overallProgress = useMemo(() => {
    if (modules.length === 0) return 0;
    const completedCount = Object.values(moduleProgress).filter(m => m.isCompleted).length;
    return (completedCount / modules.length) * 100;
  }, [moduleProgress, modules.length]);

  // Track active time
  useEffect(() => {
    const interval = setInterval(() => {
      setTotalActiveSeconds(prev => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Guard: If no modules available, show error and allow closing
  if (!currentModule) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
        <div className="text-center max-w-sm">
          <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-8 h-8 text-muted-foreground" />
          </div>
          <h2 className="text-xl font-bold mb-2">Session Not Available</h2>
          <p className="text-muted-foreground mb-6">
            Day {dayNumber} content is not available yet. Please try again later.
          </p>
          <Button onClick={onClose} className="w-full">
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  // Check if current module is unlocked
  const isModuleUnlocked = useCallback((index: number): boolean => {
    if (index === 0) return true;
    
    // Check all previous gated modules are completed
    for (let i = 0; i < index; i++) {
      const module = modules[i];
      if (module.gatingRequired) {
        const progress = moduleProgress[module.id];
        if (!progress?.isCompleted) return false;
      }
    }
    return true;
  }, [modules, moduleProgress]);

  // Check if can proceed to next
  const canProceed = useCallback((): boolean => {
    const progress = moduleProgress[currentModule.id];
    if (!currentModule.gatingRequired) return true;
    return progress?.isCompleted ?? false;
  }, [currentModule, moduleProgress]);

  // Check if can complete session
  const canCompleteSession = useCallback((): boolean => {
    // All gated modules must be completed
    const allGatedCompleted = modules
      .filter(m => m.gatingRequired)
      .every(m => moduleProgress[m.id]?.isCompleted);
    
    // Minimum active time reached
    const minTimeReached = totalActiveSeconds >= MIN_SESSION_SECONDS;
    
    return allGatedCompleted && minTimeReached;
  }, [modules, moduleProgress, totalActiveSeconds]);

  // Handle media progress update
  const handleMediaProgress = useCallback((watchedSeconds: number, totalSeconds: number) => {
    const watchedPercent = totalSeconds > 0 ? watchedSeconds / totalSeconds : 0;
    const isCompleted = watchedPercent >= GATING_THRESHOLD;

    setModuleProgress(prev => ({
      ...prev,
      [currentModule.id]: {
        moduleId: currentModule.id,
        watchedSeconds,
        watchedPercent,
        isCompleted,
      }
    }));
  }, [currentModule.id]);

  // Handle media complete
  const handleMediaComplete = useCallback(() => {
    setModuleProgress(prev => ({
      ...prev,
      [currentModule.id]: {
        ...prev[currentModule.id],
        moduleId: currentModule.id,
        watchedSeconds: currentModule.estimatedSeconds,
        watchedPercent: 1,
        isCompleted: true,
      }
    }));
  }, [currentModule]);

  // Handle practice complete
  const handlePracticeComplete = useCallback((data?: { intensityBefore?: number; intensityAfter?: number }) => {
    setModuleProgress(prev => ({
      ...prev,
      [currentModule.id]: {
        moduleId: currentModule.id,
        watchedSeconds: currentModule.estimatedSeconds,
        watchedPercent: 1,
        isCompleted: true,
        practiceCompleted: true,
      }
    }));
    setActivePractice(null);

    // Log practice if intensity data provided
    if (data?.intensityBefore !== undefined && data?.intensityAfter !== undefined) {
      addJournalEntry({
        date: new Date(),
        day: dayNumber,
        type: 'achievement',
        content: `Completed ${currentModule.title} practice. Intensity: ${data.intensityBefore} → ${data.intensityAfter}`,
      });
    }
  }, [currentModule, dayNumber, addJournalEntry]);

  // Handle slides progress
  const handleSlidesProgress = useCallback((currentSlide: number, totalSlides: number) => {
    const watchedPercent = currentSlide / totalSlides;
    const watchedSeconds = Math.floor(watchedPercent * currentModule.estimatedSeconds);
    const isCompleted = watchedPercent >= GATING_THRESHOLD;

    setModuleProgress(prev => ({
      ...prev,
      [currentModule.id]: {
        moduleId: currentModule.id,
        watchedSeconds,
        watchedPercent,
        isCompleted,
      }
    }));
  }, [currentModule]);

  // Navigation handlers
  const handleNext = () => {
    if (currentModuleIndex < modules.length - 1) {
      setCurrentModuleIndex(prev => prev + 1);
    } else if (canCompleteSession()) {
      handleSessionComplete();
    }
  };

  const handlePrevious = () => {
    if (currentModuleIndex > 0) {
      setCurrentModuleIndex(prev => prev - 1);
    }
  };

  const handleSessionComplete = () => {
    onComplete();
    setShowCompletion(true);
  };

  // Format time display
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const remainingSeconds = Math.max(0, MIN_SESSION_SECONDS - totalActiveSeconds);
  const timeProgress = Math.min(100, (totalActiveSeconds / MIN_SESSION_SECONDS) * 100);

  // Render completion screen
  if (showCompletion) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-freedom/10 flex items-center justify-center p-6">
        <div className="text-center animate-scale-in max-w-sm">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-success to-success/70 flex items-center justify-center mx-auto mb-8 shadow-lg">
            <Sparkles className="w-12 h-12 text-success-foreground" />
          </div>
          <h1 className="text-3xl font-bold mb-4">Day {dayNumber} Complete!</h1>
          <p className="text-lg text-muted-foreground mb-4">
            You spent {formatTime(totalActiveSeconds)} in this session.
          </p>
          <p className="text-muted-foreground mb-8">
            {dayNumber < 6 
              ? "Great progress! Continue with your day and return tomorrow."
              : dayNumber === 6
              ? "Congratulations! You're now smoke-free. The journey continues!"
              : "You're doing amazing! Keep up the great work."
            }
          </p>
          
          {dayNumber < 10 && (
            <p className="text-sm text-muted-foreground mb-6">
              Day {dayNumber + 1} unlocks tomorrow
            </p>
          )}

          <Button size="lg" onClick={onClose} className="w-full">
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  // Render practice component
  if (activePractice) {
    switch (activePractice) {
      case 'BREATHING':
        return (
          <BreathingCoach
            onComplete={(before, after) => handlePracticeComplete({ intensityBefore: before, intensityAfter: after })}
            onCancel={() => setActivePractice(null)}
          />
        );
      case 'URGE_SURFING':
        return (
          <UrgeSurfing
            onComplete={(before, after) => handlePracticeComplete({ intensityBefore: before, intensityAfter: after })}
            onCancel={() => setActivePractice(null)}
          />
        );
      case 'BODY_SCAN':
        return (
          <BodyScan
            onComplete={() => handlePracticeComplete()}
            onCancel={() => setActivePractice(null)}
          />
        );
      case 'TRIGGER_SCAN':
        // Trigger scan uses the TriggerChecklist component
        return (
          <div className="min-h-screen bg-background p-4">
            <TriggerChecklist 
              onComplete={() => handlePracticeComplete()}
              showSaveButton={true}
            />
            <Button 
              variant="outline" 
              className="w-full mt-4"
              onClick={() => setActivePractice(null)}
            >
              Cancel
            </Button>
          </div>
        );
      case 'VISUALIZATION':
        // Visualization uses BodyScan component for now (guided meditation style)
        return (
          <BodyScan
            onComplete={() => handlePracticeComplete()}
            onCancel={() => setActivePractice(null)}
          />
        );
      default:
        return null;
    }
  }

  // Render module content
  const renderModuleContent = () => {
    const progress = moduleProgress[currentModule.id];
    const isLocked = !isModuleUnlocked(currentModuleIndex);

    if (isLocked) {
      return (
        <div className="flex flex-col items-center justify-center h-64 text-center">
          <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
            <Lock className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Module Locked</h3>
          <p className="text-muted-foreground text-sm">
            Complete the previous modules to unlock this content.
          </p>
        </div>
      );
    }

    switch (currentModule.type) {
      case 'STORY_VIDEO':
      case 'COACH_VIDEO':
        return (
          <MediaPlayer
            src={currentModule.content?.videoUrl || ''}
            type="video"
            title={currentModule.title}
            transcript={currentModule.content?.transcript}
            onProgress={(current, total) => handleMediaProgress(current, total)}
            onComplete={handleMediaComplete}
            autoPlay={false}
          />
        );

      case 'ANIMATED_SLIDES': {
        const rawSlides = currentModule.content?.slides || [];
        const manifest = slideImageManifest as Record<string, { url: string }>;
        const hydratedSlides = rawSlides.map((s) => {
          const key = `d${dayNumber}-${currentModule.id}-${s.id}`;
          const generated = manifest[key]?.url;
          return generated ? { ...s, backgroundImage: generated } : s;
        });
        return (
          <AnimatedSlides
            slides={hydratedSlides}
            slideDuration={Math.floor(currentModule.estimatedSeconds / (hydratedSlides.length || 1))}
            onProgress={handleSlidesProgress}
            onComplete={handleMediaComplete}
            title={currentModule.title}
            narrationKey={currentModule.id}
            totalEstimatedSeconds={currentModule.estimatedSeconds}
          />
        );
      }

      case 'GUIDED_PRACTICE':
        const practiceCompleted = progress?.practiceCompleted;
        return (
          <div className="space-y-6">
            <div className="bg-card rounded-2xl p-6 shadow-sm border">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center">
                  <Play className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold">{currentModule.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {Math.ceil(currentModule.estimatedSeconds / 60)} minute practice
                  </p>
                </div>
              </div>
              
              {currentModule.description && (
                <p className="text-muted-foreground mb-4">{currentModule.description}</p>
              )}

              {practiceCompleted ? (
                <div className="flex items-center gap-2 text-success">
                  <Check className="w-5 h-5" />
                  <span className="font-medium">Practice completed!</span>
                </div>
              ) : (
                <Button 
                  size="lg" 
                  className="w-full"
                  onClick={() => setActivePractice(currentModule.practiceType || 'BREATHING')}
                >
                  <Play className="w-4 h-4 mr-2" />
                  Start Practice
                </Button>
              )}
            </div>
          </div>
        );

      case 'CHECKPOINT':
        // Rich checkpoint with user data for "Your Reasons to Quit" module
        const isReasonsCheckpoint = currentModule.id === 'd1m2';
        
        if (isReasonsCheckpoint) {
          const cigarettesPerDay = profile?.cigarettes_per_day || appUser?.cigarettesPerDay || 20;
          const yearsSmoking = profile?.years_smoking || appUser?.yearsOfSmoking || 5;
          const triggers = profile?.triggers || appUser?.triggers || [];
          const reasonsToQuit = appUser?.reasonsToQuit || [];
          
          // Calculate stats
          const cigarettesSmoked = cigarettesPerDay * yearsSmoking * 365;
          const costPerCigarette = 0.50; // average
          const moneySpent = cigarettesSmoked * costPerCigarette;
          const minutesPerCig = 5;
          const hoursLost = Math.round((cigarettesSmoked * minutesPerCig) / 60);
          
          return (
            <div className="space-y-6">
              {/* Personal Summary Card */}
              <div className="bg-gradient-to-br from-primary/10 to-coral/10 rounded-2xl p-6 border border-primary/20">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center">
                    <Heart className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{profile?.display_name || appUser?.name || 'Your'} Journey</h3>
                    <p className="text-sm text-muted-foreground">Based on your profile</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-background/60 rounded-xl p-4 text-center">
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <Cigarette className="w-4 h-4 text-coral" />
                      <span className="text-2xl font-bold text-coral">{cigarettesPerDay}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">cigarettes/day</p>
                  </div>
                  <div className="bg-background/60 rounded-xl p-4 text-center">
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <Clock className="w-4 h-4 text-accent" />
                      <span className="text-2xl font-bold text-accent">{yearsSmoking}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">years smoking</p>
                  </div>
                </div>
                
                <div className="bg-background/60 rounded-xl p-4 text-center">
                  <p className="text-sm text-muted-foreground mb-1">That's approximately</p>
                  <p className="text-lg font-semibold">
                    <span className="text-coral">{cigarettesSmoked.toLocaleString()}</span> cigarettes · 
                    <span className="text-primary ml-2">${moneySpent.toLocaleString()}</span> spent · 
                    <span className="text-accent ml-2">{hoursLost.toLocaleString()}</span> hours
                  </p>
                </div>
              </div>
              
              {/* Triggers Card */}
              {triggers.length > 0 && (
                <div className="bg-card rounded-2xl p-6 shadow-sm border">
                  <div className="flex items-center gap-2 mb-3">
                    <Target className="w-5 h-5 text-accent" />
                    <h4 className="font-semibold">Your Triggers</h4>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {triggers.map((trigger, idx) => (
                      <span 
                        key={idx}
                        className="px-3 py-1.5 bg-accent/10 text-accent rounded-full text-sm font-medium"
                      >
                        {trigger}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Reasons Card */}
              {reasonsToQuit.length > 0 && (
                <div className="bg-card rounded-2xl p-6 shadow-sm border">
                  <div className="flex items-center gap-2 mb-3">
                    <Heart className="w-5 h-5 text-success" />
                    <h4 className="font-semibold">Your Reasons to Quit</h4>
                  </div>
                  <ul className="space-y-2">
                    {reasonsToQuit.filter(r => r.trim()).map((reason, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-success mt-0.5">✓</span>
                        <span className="text-foreground">{reason}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {/* Motivation Message */}
              <div className="bg-gradient-to-br from-success/10 to-freedom/10 rounded-2xl p-6 border border-success/20 text-center">
                <Sparkles className="w-8 h-8 text-success mx-auto mb-3" />
                <p className="text-lg font-semibold text-foreground mb-2">
                  You're taking back control
                </p>
                <p className="text-sm text-muted-foreground">
                  These reasons and triggers are your roadmap to freedom. We'll work on each one together.
                </p>
              </div>
              
              {/* Complete Button */}
              <Button 
                className="w-full"
                size="lg"
                onClick={() => handlePracticeComplete()}
              >
                <Check className="w-4 h-4 mr-2" />
                I've Reflected on My Reasons
              </Button>
            </div>
          );
        }
        
        // Default simple checkpoint for other modules
        return (
          <div className="bg-card rounded-2xl p-6 shadow-sm border">
            <h3 className="font-semibold mb-4">{currentModule.title}</h3>
            <p className="text-muted-foreground mb-6">{currentModule.description}</p>
            <Button 
              className="w-full"
              onClick={() => handlePracticeComplete()}
            >
              <Check className="w-4 h-4 mr-2" />
              Mark as Complete
            </Button>
          </div>
        );

      case 'CRAVING_TOOL':
        return (
          <div className="bg-card rounded-2xl p-6 shadow-sm border">
            <h3 className="font-semibold mb-4">Quick Craving Relief</h3>
            <p className="text-muted-foreground mb-6">
              Use this tool whenever you feel an urge. It only takes a few minutes.
            </p>
            <Button 
              size="lg" 
              className="w-full"
              onClick={() => setActivePractice('URGE_SURFING')}
            >
              <Play className="w-4 h-4 mr-2" />
              Start Urge Surfing
            </Button>
          </div>
        );

      case 'TRIGGER_ALTERNATIVES':
        const alternativesCompleted = progress?.isCompleted;
        return (
          <div className="space-y-4">
            {!alternativesCompleted && (
              <div className="bg-card rounded-2xl p-4 shadow-sm border mb-4">
                <p className="text-sm text-muted-foreground">
                  For each trigger you identified, select the coping strategies you'll use instead of smoking.
                </p>
              </div>
            )}
            <TriggerAlternatives 
              onComplete={() => handlePracticeComplete()}
              showSaveButton={true}
              compact={true}
            />
            {alternativesCompleted && (
              <div className="flex items-center gap-2 text-success mt-4">
                <Check className="w-5 h-5" />
                <span className="font-medium">Coping strategies saved!</span>
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  const isLastModule = currentModuleIndex === modules.length - 1;
  const showTimeWarning = isLastModule && remainingSeconds > 0;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="bg-card border-b sticky top-0 z-10 p-3 sm:p-4">
        <div className="flex items-center justify-between mb-2 sm:mb-3">
          <Button variant="ghost" size="icon" onClick={onClose} className="h-9 w-9 sm:h-10 sm:w-10">
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </Button>
          <div className="text-center flex-1 px-2">
            <p className="text-xs text-muted-foreground">Day {dayNumber}</p>
            <p className="font-semibold text-xs sm:text-sm truncate">{dayTitle}</p>
          </div>
          <div className="w-9 sm:w-10" />
        </div>
        
        {/* Module progress */}
        <div className="space-y-1.5 sm:space-y-2">
          <Progress value={overallProgress} className="h-1.5 sm:h-2" />
          <div className="flex justify-center text-xs text-muted-foreground">
            <span>Module {safeModuleIndex + 1} of {modules.length}</span>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 p-3 sm:p-4 pb-24 sm:pb-28 overflow-y-auto">
        {/* Module header */}
        <div className="mb-4 sm:mb-6">
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-muted-foreground mb-1">
            <span className="capitalize">{currentModule.type.replace('_', ' ').toLowerCase()}</span>
            <span>•</span>
            <span>{Math.ceil(currentModule.estimatedSeconds / 60)} min</span>
            {currentModule.gatingRequired && (
              <>
                <span>•</span>
                <span className="text-primary">Required</span>
              </>
            )}
          </div>
          <h2 className="text-lg sm:text-xl font-bold">{currentModule.title}</h2>
        </div>

        {/* Module content */}
        {renderModuleContent()}

        {/* Time warning */}
        {showTimeWarning && (
          <div className="mt-6 p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-amber-700 dark:text-amber-400">
                {formatTime(remainingSeconds)} remaining
              </p>
              <p className="text-sm text-muted-foreground">
                Stay in the session for at least 15 minutes to complete this day.
              </p>
            </div>
          </div>
        )}
      </main>

      {/* Bottom navigation */}
      <footer className="fixed bottom-0 left-0 right-0 bg-card border-t p-3 sm:p-4 safe-area-pb">
        <div className="max-w-md mx-auto flex gap-2 sm:gap-3">
          <Button 
            variant="outline"
            size="default"
            onClick={handlePrevious}
            disabled={safeModuleIndex === 0}
            className="flex-1 h-11 sm:h-12 text-sm sm:text-base"
          >
            <ArrowLeft className="w-4 h-4 mr-1.5 sm:mr-2" />
            <span className="hidden xs:inline">Previous</span>
            <span className="xs:hidden">Prev</span>
          </Button>
          
          {isLastModule ? (
            <Button 
              size="default"
              onClick={handleNext}
              disabled={!canCompleteSession()}
              className={cn(
                "flex-1 h-11 sm:h-12 text-sm sm:text-base",
                canCompleteSession() && "bg-success hover:bg-success/90"
              )}
            >
              <span className="hidden xs:inline">Complete Day</span>
              <span className="xs:hidden">Complete</span>
              <Check className="w-4 h-4 ml-1.5 sm:ml-2" />
            </Button>
          ) : (
            <Button 
              size="default"
              onClick={handleNext}
              disabled={!canProceed()}
              className="flex-1 h-11 sm:h-12 text-sm sm:text-base"
            >
              Next
              <ArrowRight className="w-4 h-4 ml-1.5 sm:ml-2" />
            </Button>
          )}
        </div>
      </footer>
    </div>
  );
}
