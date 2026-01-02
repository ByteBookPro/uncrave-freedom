import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useApp } from '@/contexts/AppContext';
import { useAuth } from '@/contexts/AuthContext';
import { programDays } from '@/data/programContent';
import { getNarration } from '@/data/sessionNarration';
import { useTextToSpeech } from '@/hooks/useTextToSpeech';
import type { ContentLanguage } from '@/types/database';
import { 
  ArrowLeft, 
  ArrowRight,
  Check,
  Play,
  Pause,
  BookOpen,
  Mic,
  PenLine,
  Lightbulb,
  Sparkles,
  X,
  Volume2,
  Loader2
} from 'lucide-react';

export function DaySession() {
  const { user, selectedDay, setCurrentView, completeDay, addJournalEntry } = useApp();
  const [currentModuleIndex, setCurrentModuleIndex] = useState(0);
  const [reflectionText, setReflectionText] = useState('');
  const [reasonsToQuit, setReasonsToQuit] = useState(['', '', '']);
  const [showCompletion, setShowCompletion] = useState(false);
  
  const { speak, toggle, stop, isLoading, isPlaying } = useTextToSpeech();

  // Stop audio when changing modules or leaving
  useEffect(() => {
    return () => {
      stop();
    };
  }, [currentModuleIndex, stop]);

  if (!user) return null;

  const dayContent = programDays[selectedDay - 1];
  if (!dayContent) return null;

  const currentModule = dayContent.modules[currentModuleIndex];
  const progress = ((currentModuleIndex + 1) / dayContent.modules.length) * 100;

  const getModuleIcon = (type: string) => {
    switch (type) {
      case 'video': return <Play className="w-5 h-5" />;
      case 'audio': return <Mic className="w-5 h-5" />;
      case 'text': return <BookOpen className="w-5 h-5" />;
      case 'exercise': return <PenLine className="w-5 h-5" />;
      case 'reflection': return <Lightbulb className="w-5 h-5" />;
      default: return <BookOpen className="w-5 h-5" />;
    }
  };

  const handlePlayNarration = () => {
    if (isPlaying) {
      toggle();
    } else {
      const narration = getNarration(currentModule.id, currentModule.content);
      if (narration) {
        speak(narration);
      }
    }
  };

  const handleNext = () => {
    stop(); // Stop any playing audio
    if (currentModuleIndex < dayContent.modules.length - 1) {
      setCurrentModuleIndex(prev => prev + 1);
      setReflectionText('');
    } else {
      handleDayComplete();
    }
  };

  const handlePrevious = () => {
    stop(); // Stop any playing audio
    setCurrentModuleIndex(prev => prev - 1);
  };

  const handleDayComplete = () => {
    completeDay(selectedDay);
    
    if (reflectionText.trim()) {
      addJournalEntry({
        date: new Date(),
        day: selectedDay,
        type: 'reflection',
        content: reflectionText,
      });
    }

    const validReasons = reasonsToQuit.filter(r => r.trim() !== '');
    validReasons.forEach(reason => {
      addJournalEntry({
        date: new Date(),
        day: selectedDay,
        type: 'reason',
        content: reason,
      });
    });

    setShowCompletion(true);
  };

  const handleClose = () => {
    stop();
    setCurrentView('dashboard');
  };

  if (showCompletion) {
    return (
      <div className="min-h-screen gradient-dawn flex items-center justify-center p-6">
        <div className="text-center animate-scale-in">
          <div className="w-24 h-24 rounded-full gradient-success flex items-center justify-center mx-auto mb-8 animate-breathe shadow-glow">
            <Sparkles className="w-12 h-12 text-success-foreground" />
          </div>
          <h1 className="text-3xl font-bold font-display mb-4">
            Day {selectedDay} Complete!
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-md mx-auto">
            {selectedDay < 6 
              ? "Great job! Continue with your day and remember, you can keep smoking normally for now."
              : selectedDay === 6
              ? "Congratulations! You're now smoke-free. The journey continues!"
              : "You're doing amazing! Keep up the great work on your smoke-free journey."
            }
          </p>
          
          {selectedDay < 10 && (
            <p className="text-sm text-muted-foreground mb-6">
              Day {selectedDay + 1} will be unlocked tomorrow
            </p>
          )}

          <Button variant="hero" size="xl" onClick={handleClose}>
            Back to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  const renderModuleContent = () => {
    const hasNarration = !!getNarration(currentModule.id);
    
    switch (currentModule.type) {
      case 'video':
      case 'audio':
        return (
          <div className="flex flex-col items-center">
            {/* Audio Player */}
            <div className="w-full aspect-video bg-gradient-to-br from-primary/20 to-freedom/20 rounded-2xl flex flex-col items-center justify-center mb-6 relative overflow-hidden">
              {/* Animated background when playing */}
              {isPlaying && (
                <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-freedom/30 animate-pulse" />
              )}
              
              <button
                onClick={handlePlayNarration}
                disabled={isLoading}
                className="w-20 h-20 rounded-full gradient-hero flex items-center justify-center shadow-button hover:scale-105 transition-transform disabled:opacity-50 relative z-10"
              >
                {isLoading ? (
                  <Loader2 className="w-8 h-8 text-primary-foreground animate-spin" />
                ) : isPlaying ? (
                  <Pause className="w-8 h-8 text-primary-foreground" />
                ) : (
                  <Play className="w-8 h-8 text-primary-foreground ml-1" />
                )}
              </button>
              
              <p className="mt-4 text-sm text-muted-foreground relative z-10">
                {isLoading ? 'Generating audio...' : isPlaying ? 'Playing...' : 'Tap to play audio narration'}
              </p>

              {/* Sound wave animation when playing */}
              {isPlaying && (
                <div className="flex items-center gap-1 mt-2">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div
                      key={i}
                      className="w-1 bg-primary rounded-full animate-pulse"
                      style={{
                        height: `${Math.random() * 20 + 10}px`,
                        animationDelay: `${i * 0.1}s`,
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
            
            {/* Script/Content Preview */}
            <div className="bg-card rounded-2xl p-6 shadow-soft w-full">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold">Session Transcript</h4>
                {hasNarration && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handlePlayNarration}
                    disabled={isLoading}
                    className="text-primary"
                  >
                    <Volume2 className="w-4 h-4 mr-1" />
                    {isPlaying ? 'Pause' : 'Listen'}
                  </Button>
                )}
              </div>
              <div className="text-muted-foreground leading-relaxed whitespace-pre-line max-h-64 overflow-y-auto">
                {getNarration(currentModule.id) || 
                  `Content for ${currentModule.title}. This session will guide you through ${dayContent.objective.toLowerCase()}`
                }
              </div>
            </div>
          </div>
        );

      case 'exercise':
        if (selectedDay === 1 && currentModule.id === 'd1m2') {
          return (
            <div className="space-y-4">
              <div className="bg-accent/10 rounded-2xl p-6 mb-6">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <span className="text-xl">✍️</span>
                  Your Reasons to Quit
                </h4>
                <p className="text-sm text-muted-foreground">
                  What are your top 3 reasons for wanting to quit smoking? These will motivate you throughout your journey.
                </p>
              </div>
              
              {reasonsToQuit.map((reason, index) => (
                <div key={index}>
                  <label className="block text-sm font-medium mb-2">
                    Reason {index + 1}
                  </label>
                  <Textarea
                    value={reason}
                    onChange={(e) => {
                      const newReasons = [...reasonsToQuit];
                      newReasons[index] = e.target.value;
                      setReasonsToQuit(newReasons);
                    }}
                    placeholder={
                      index === 0 ? "e.g., For my children's health and to be around for them longer" :
                      index === 1 ? "e.g., To breathe easier and feel more energetic" :
                      "e.g., To save money for a vacation"
                    }
                    className="min-h-[80px] rounded-xl"
                  />
                </div>
              ))}
            </div>
          );
        }
        
        return (
          <div className="bg-accent/10 rounded-2xl p-6">
            <h4 className="font-semibold mb-2">{currentModule.title}</h4>
            <p className="text-muted-foreground mb-4">{currentModule.content}</p>
            <Textarea
              value={reflectionText}
              onChange={(e) => setReflectionText(e.target.value)}
              placeholder="Write your thoughts here..."
              className="min-h-[150px] rounded-xl"
            />
          </div>
        );

      case 'text':
        const textNarration = getNarration(currentModule.id);
        return (
          <div className="bg-card rounded-2xl p-6 shadow-soft">
            {textNarration && (
              <div className="flex justify-end mb-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handlePlayNarration}
                  disabled={isLoading}
                  className="text-primary"
                >
                  {isLoading ? (
                    <Loader2 className="w-4 h-4 mr-1 animate-spin" />
                  ) : (
                    <Volume2 className="w-4 h-4 mr-1" />
                  )}
                  {isPlaying ? 'Pause' : 'Listen'}
                </Button>
              </div>
            )}
            <div className="text-foreground leading-relaxed whitespace-pre-line">
              {textNarration || (
                <>
                  <strong className="text-lg block mb-4 text-gradient-hero font-display">{currentModule.title}</strong>
                  Educational content about {currentModule.title}. {dayContent.objective}
                </>
              )}
            </div>
          </div>
        );

      case 'reflection':
        return (
          <div>
            <div className="bg-primary/5 rounded-2xl p-6 mb-6 border border-primary/20">
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-accent" />
                Daily Reflection
              </h4>
              <p className="text-sm text-muted-foreground">
                Take a moment to reflect on what you learned today. How do you feel about your journey so far?
              </p>
            </div>
            <Textarea
              value={reflectionText}
              onChange={(e) => setReflectionText(e.target.value)}
              placeholder="Today I learned... I feel... I'm looking forward to..."
              className="min-h-[200px] rounded-xl"
            />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border p-4 sticky top-0 z-10">
        <div className="flex items-center justify-between mb-4">
          <Button variant="ghost" size="icon" onClick={() => { stop(); setCurrentView('program'); }}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="text-center">
            <p className="text-xs text-muted-foreground">Day {selectedDay}</p>
            <p className="font-semibold text-sm">{dayContent.title}</p>
          </div>
          <Button variant="ghost" size="icon" onClick={handleClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>
        
        {/* Progress */}
        <div className="h-1.5 bg-muted rounded-full overflow-hidden">
          <div 
            className="h-full gradient-hero transition-all duration-500 rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-xs text-muted-foreground text-center mt-2">
          Module {currentModuleIndex + 1} of {dayContent.modules.length}
        </p>
      </div>

      {/* Module Content */}
      <div className="p-6 pb-32">
        {/* Module Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
            currentModule.type === 'video' || currentModule.type === 'audio' 
              ? 'gradient-hero text-primary-foreground' 
              : currentModule.type === 'exercise'
              ? 'bg-accent/20 text-accent'
              : currentModule.type === 'reflection'
              ? 'bg-coral/20 text-coral'
              : 'bg-primary/10 text-primary'
          }`}>
            {getModuleIcon(currentModule.type)}
          </div>
          <div>
            <h2 className="text-xl font-bold font-display">{currentModule.title}</h2>
            <p className="text-sm text-muted-foreground capitalize">
              {currentModule.type} • {currentModule.duration}
            </p>
          </div>
        </div>

        {/* Content */}
        {renderModuleContent()}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border p-4">
        <div className="flex gap-3">
          <Button 
            variant="outline"
            size="lg"
            onClick={handlePrevious}
            disabled={currentModuleIndex === 0}
            className="flex-1"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>
          <Button 
            variant="hero"
            size="lg"
            onClick={handleNext}
            className="flex-1"
          >
            {currentModuleIndex === dayContent.modules.length - 1 ? (
              <>
                Complete Day <Check className="w-4 h-4 ml-2" />
              </>
            ) : (
              <>
                Next <ArrowRight className="w-4 h-4 ml-2" />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
