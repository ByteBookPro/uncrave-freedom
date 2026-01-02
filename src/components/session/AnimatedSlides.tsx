import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Play, Pause, ChevronLeft, ChevronRight, Volume2, VolumeX, Loader2, Music, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';
import { VoicePreset } from '@/hooks/useTextToSpeech';
import { useBackgroundMusic } from '@/hooks/useBackgroundMusic';
import { useSlideNarration } from '@/hooks/useSlideNarration';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useAuth } from '@/contexts/AuthContext';
import { getLocalizedNarration } from '@/data/sessionNarrationLocalized';
import { ContentLanguage } from '@/types/database';

interface Slide {
  id: string;
  title: string;
  content: string;
  backgroundGradient?: string;
  backgroundImage?: string;
  textPosition?: 'top' | 'center' | 'bottom' | 'top-left' | 'bottom-left';
  icon?: string;
  narration?: string;
  voicePreset?: VoicePreset;
}

interface AnimatedSlidesProps {
  slides: Slide[];
  autoPlay?: boolean;
  slideDuration?: number;
  onProgress?: (currentSlide: number, totalSlides: number) => void;
  onComplete?: () => void;
  title?: string;
  narrationKey?: string;
  defaultVoicePreset?: VoicePreset;
  totalEstimatedSeconds?: number;
}

// Detect voice preset based on slide content
function detectVoicePreset(slide: Slide, title?: string): VoicePreset {
  const text = `${slide.title} ${slide.content} ${slide.narration || ''}`.toLowerCase();
  
  if (text.includes('breathe') || text.includes('breathing') || text.includes('inhale') || 
      text.includes('exhale') || text.includes('close your eyes') || text.includes('meditation')) {
    return 'guided';
  }
  
  if (text.includes('craving') || text.includes('urge') || text.includes('emergency') ||
      text.includes('waves') || text.includes('surf')) {
    return 'cravingEmergency';
  }
  
  if (text.includes('congratulation') || text.includes('you did it') || text.includes('freedom') ||
      text.includes('commit') || text.includes('promise') || text.includes('celebrate') ||
      text.includes('you can do') || text.includes('proud')) {
    return 'motivationLift';
  }
  
  if (text.includes('let me tell you') || text.includes('story') || text.includes('imagine') ||
      text.includes('picture') || text.includes('i know what') || text.includes('sarah') ||
      text.includes('years ago')) {
    return 'story';
  }
  
  return 'dailyCoach';
}

// Calculate minimum slide duration based on word count (fallback when audio disabled)
function calculateFallbackDuration(text: string): number {
  const wordCount = text.split(/\s+/).length;
  return Math.max(5, Math.ceil(wordCount / 2.5) + 2);
}

export function AnimatedSlides({
  slides,
  autoPlay = true,
  slideDuration = 10,
  onProgress,
  onComplete,
  title,
  narrationKey,
  defaultVoicePreset = 'dailyCoach',
  totalEstimatedSeconds = 600
}: AnimatedSlidesProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [slideProgress, setSlideProgress] = useState(0);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [musicEnabled, setMusicEnabled] = useState(true);
  const [showTranscript, setShowTranscript] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [completedSlides, setCompletedSlides] = useState<Set<number>>(new Set());
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [viewedSlides, setViewedSlides] = useState<Set<number>>(new Set([0]));
  const [slideDurations, setSlideDurations] = useState<Record<number, number>>({});
  
  const backgroundMusic = useBackgroundMusic({ volume: 0.12 });
  const { profile } = useAuth();
  
  // Get user's language and voice preference
  const userLanguage: ContentLanguage = profile?.language || 'en';
  const userGender = (profile as any)?.voice_preference === 'energetic_male' ? 'male' : 'female';
  
  // Use the slide narration hook
  const narration = useSlideNarration({
    language: userLanguage,
    gender: userGender,
  });
  
  // Refs for timers
  const pauseTimerRef = useRef<NodeJS.Timeout | null>(null);
  const isPlayingRef = useRef(isPlaying);
  const currentIndexRef = useRef(currentIndex);
  const audioEnabledRef = useRef(audioEnabled);
  
  // Keep refs in sync
  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);
  
  useEffect(() => {
    currentIndexRef.current = currentIndex;
  }, [currentIndex]);
  
  useEffect(() => {
    audioEnabledRef.current = audioEnabled;
  }, [audioEnabled]);
  
  // Get localized narration for the module (non-English languages)
  const localizedNarration = useMemo(() => {
    if (!narrationKey || userLanguage === 'en') return null;
    return getLocalizedNarration(narrationKey, userLanguage);
  }, [narrationKey, userLanguage]);

  // Guard against empty slides array
  if (!slides || slides.length === 0) {
    return (
      <div className="w-full rounded-2xl overflow-hidden shadow-card p-8 bg-card text-center">
        <p className="text-muted-foreground">No slides available</p>
      </div>
    );
  }

  const currentSlide = slides[currentIndex];
  const totalProgress = ((currentIndex + slideProgress / 100) / slides.length) * 100;

  // Get current narration text
  const getCurrentNarration = useCallback((): string => {
    return currentSlide.narration || currentSlide.content;
  }, [currentSlide]);

  const currentNarration = getCurrentNarration();

  // Advance to next slide
  const advanceToNextSlide = useCallback(() => {
    if (currentIndexRef.current < slides.length - 1) {
      const nextIndex = currentIndexRef.current + 1;
      
      // Only pause between major sections (every 3 slides)
      const shouldPause = nextIndex % 3 === 0 && nextIndex < slides.length - 1;
      
      if (shouldPause) {
        setIsPaused(true);
        pauseTimerRef.current = setTimeout(() => {
          setIsPaused(false);
          setCurrentIndex(nextIndex);
          setViewedSlides(prev => new Set([...prev, nextIndex]));
          setSlideProgress(0);
          onProgress?.(nextIndex + 1, slides.length);
        }, 2000);
      } else {
        setCurrentIndex(nextIndex);
        setViewedSlides(prev => new Set([...prev, nextIndex]));
        setSlideProgress(0);
        onProgress?.(nextIndex + 1, slides.length);
      }
    } else {
      setIsPlaying(false);
      onComplete?.();
    }
  }, [slides.length, onProgress, onComplete]);

  // Use ref to avoid dependency on narration object
  const narrationRef = useRef(narration);
  useEffect(() => {
    narrationRef.current = narration;
  }, [narration]);
  
  // Play narration for current slide - stable callback
  const playCurrentSlide = useCallback(() => {
    if (!audioEnabledRef.current || !isPlayingRef.current) return;
    
    const slideIndex = currentIndexRef.current;
    const slide = slides[slideIndex];
    if (!slide) return;
    
    const text = slide.narration || slide.content;
    const voicePreset = slide.voicePreset || detectVoicePreset(slide, title) || defaultVoicePreset;
    
    // Mark slide as completed and advance when narration ends
    const handleNarrationEnded = () => {
      setCompletedSlides(prev => new Set([...prev, slideIndex]));
      
      if (isPlayingRef.current) {
        advanceToNextSlide();
      }
    };
    
    narrationRef.current.play(slide.id, text, voicePreset, handleNarrationEnded);
  }, [slides, title, defaultVoicePreset, advanceToNextSlide]);

  // Start background music when component mounts and slideshow starts
  useEffect(() => {
    if (isPlaying && musicEnabled) {
      backgroundMusic.play('calm');
    } else if (!musicEnabled) {
      backgroundMusic.stop();
    }
  }, [isPlaying, musicEnabled]);

  // Duck music when narration is playing
  useEffect(() => {
    if (narration.isPlaying) {
      backgroundMusic.duck();
    } else {
      backgroundMusic.unduck();
    }
  }, [narration.isPlaying]);

  // Stop music on unmount
  useEffect(() => {
    return () => {
      backgroundMusic.stop();
    };
  }, []);

  // Play narration when slide changes or playback starts
  useEffect(() => {
    if (isPlaying && !isPaused && audioEnabled) {
      // Small delay to ensure state is settled
      const timer = setTimeout(() => {
        playCurrentSlide();
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [currentIndex, isPlaying, isPaused, audioEnabled, playCurrentSlide]);

  // Handle play/pause state changes
  useEffect(() => {
    if (!isPlaying) {
      narrationRef.current.stop();
      if (pauseTimerRef.current) {
        clearTimeout(pauseTimerRef.current);
        pauseTimerRef.current = null;
      }
    }
  }, [isPlaying]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      narrationRef.current.stop();
      if (pauseTimerRef.current) {
        clearTimeout(pauseTimerRef.current);
      }
    };
  }, []);

  // Stop narration when audio is disabled
  useEffect(() => {
    if (!audioEnabled) {
      narrationRef.current.stop();
    }
  }, [audioEnabled]);

  // Fallback timer for when audio is disabled
  useEffect(() => {
    if (!isPlaying || audioEnabled || isPaused) return;

    const fallbackDuration = calculateFallbackDuration(currentSlide.content);
    
    const progressInterval = setInterval(() => {
      setSlideProgress(prev => {
        const increment = 100 / (fallbackDuration * 10);
        if (prev + increment >= 100) {
          advanceToNextSlide();
          return 0;
        }
        return prev + increment;
      });
    }, 100);

    return () => clearInterval(progressInterval);
  }, [isPlaying, audioEnabled, isPaused, currentSlide, advanceToNextSlide]);

  // Check completion when all slides viewed
  useEffect(() => {
    if (viewedSlides.size === slides.length) {
      onComplete?.();
    }
  }, [viewedSlides.size, slides.length, onComplete]);
  
  // Track elapsed time for the module
  useEffect(() => {
    if (!isPlaying) return;
    
    const interval = setInterval(() => {
      setElapsedSeconds(prev => prev + 1);
    }, 1000);
    
    return () => clearInterval(interval);
  }, [isPlaying]);
  
  // Track audio duration for current slide when it becomes known
  useEffect(() => {
    if (narration.duration > 0 && !slideDurations[currentIndex]) {
      setSlideDurations(prev => ({ ...prev, [currentIndex]: Math.ceil(narration.duration) }));
    }
  }, [narration.duration, currentIndex, slideDurations]);
  
  // Calculate actual total duration from known slide durations
  const actualTotalSeconds = useMemo(() => {
    const knownDurations = Object.values(slideDurations);
    const avgDuration = knownDurations.length > 0 
      ? knownDurations.reduce((a, b) => a + b, 0) / knownDurations.length 
      : totalEstimatedSeconds / slides.length;
    
    let total = 0;
    for (let i = 0; i < slides.length; i++) {
      total += slideDurations[i] || avgDuration;
    }
    // Add 2 seconds per section pause (every 3 slides, except last)
    const pauseCount = Math.floor((slides.length - 1) / 3);
    total += pauseCount * 2;
    
    return Math.ceil(total);
  }, [slideDurations, slides.length, totalEstimatedSeconds]);
  
  // Format time for display
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const goToSlide = (index: number) => {
    // Stop current narration before navigating
    narrationRef.current.stop();
    if (pauseTimerRef.current) {
      clearTimeout(pauseTimerRef.current);
      setIsPaused(false);
    }
    
    // Calculate new elapsed time based on slide position
    const perSlideEstimate = totalEstimatedSeconds / slides.length;
    setElapsedSeconds(Math.floor(index * perSlideEstimate));
    
    setCurrentIndex(index);
    setSlideProgress(0);
    setViewedSlides(prev => new Set([...prev, index]));
    onProgress?.(index + 1, slides.length);
  };

  const goNext = () => {
    if (currentIndex < slides.length - 1) {
      goToSlide(currentIndex + 1);
    }
  };

  const goPrev = () => {
    if (currentIndex > 0) {
      goToSlide(currentIndex - 1);
    }
  };

  // Get text position classes based on slide config
  const getTextPositionClasses = (position?: string, hasImage?: boolean) => {
    if (hasImage) {
      switch (position) {
        case 'top':
          return 'items-center justify-start pt-4 xs:pt-6 sm:pt-8';
        case 'top-left':
          return 'items-start justify-start pt-4 xs:pt-6 sm:pt-8 pl-3 xs:pl-4 sm:pl-6 text-left';
        case 'bottom':
          return 'items-center justify-end pb-10 xs:pb-12 sm:pb-14';
        case 'bottom-left':
          return 'items-start justify-end pb-10 xs:pb-12 sm:pb-14 pl-3 xs:pl-4 sm:pl-6 text-left';
        default:
          return 'items-center justify-center';
      }
    }
    switch (position) {
      case 'top':
        return 'items-center justify-start pt-6 sm:pt-8 md:pt-12';
      case 'top-left':
        return 'items-start justify-start pt-6 sm:pt-8 md:pt-12 pl-4 sm:pl-6 md:pl-8 text-left';
      case 'bottom':
        return 'items-center justify-end pb-14 sm:pb-16 md:pb-20';
      case 'bottom-left':
        return 'items-start justify-end pb-14 sm:pb-16 md:pb-20 pl-4 sm:pl-6 md:pl-8 text-left';
      default:
        return 'items-center justify-center';
    }
  };

  return (
    <div className="w-full rounded-2xl overflow-hidden shadow-card relative">
      {/* Brief pause indicator */}
      {isPaused && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 bg-black/50 text-white text-xs px-3 py-1.5 rounded-full flex items-center gap-2 backdrop-blur-sm">
          <Loader2 className="w-3 h-3 animate-spin" />
          <span>Next section...</span>
        </div>
      )}
      
      {/* Slide display */}
      <div 
        className={cn(
          "relative overflow-hidden",
          currentSlide.backgroundImage 
            ? "aspect-[4/5] xs:aspect-[3/4] sm:aspect-[16/10] md:aspect-video" 
            : "min-h-[280px] xs:min-h-[320px] sm:min-h-[360px] md:aspect-video",
          !currentSlide.backgroundImage && (currentSlide.backgroundGradient || "bg-gradient-to-br from-primary/80 to-freedom/80")
        )}
      >
        {/* Background image if provided */}
        {currentSlide.backgroundImage && (
          <div className="absolute inset-0 bg-black">
            <img 
              src={currentSlide.backgroundImage}
              alt={currentSlide.title}
              className="w-full h-full object-contain"
              style={{ objectPosition: 'center center' }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />
          </div>
        )}
        
        {/* Background pattern (only show if no image) */}
        {!currentSlide.backgroundImage && (
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-1/4 left-1/4 w-24 sm:w-32 h-24 sm:h-32 bg-white rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 right-1/4 w-28 sm:w-40 h-28 sm:h-40 bg-white rounded-full blur-3xl" />
          </div>
        )}

        {/* Content */}
        <div 
          className={cn(
            "absolute inset-0 flex flex-col p-3 xs:p-4 sm:p-6 md:p-8 text-white animate-fade-in",
            getTextPositionClasses(currentSlide.textPosition, !!currentSlide.backgroundImage)
          )}
          key={currentSlide.id}
        >
          {currentSlide.icon && !currentSlide.backgroundImage && (
            <span className="text-3xl xs:text-4xl sm:text-5xl mb-2 sm:mb-3 md:mb-4">{currentSlide.icon}</span>
          )}
          
          {currentSlide.backgroundImage ? (
            <div className="max-w-[90%] xs:max-w-[85%] sm:max-w-md bg-black/40 backdrop-blur-sm rounded-lg p-2 xs:p-3 sm:p-4">
              <h3 className="text-sm xs:text-base sm:text-lg md:text-xl font-bold drop-shadow-lg leading-tight">
                {currentSlide.title}
              </h3>
              <p className="text-xs xs:text-sm sm:text-base opacity-90 leading-snug mt-1 xs:mt-1.5 drop-shadow line-clamp-3 xs:line-clamp-none">
                {currentSlide.content}
              </p>
            </div>
          ) : (
            <>
              <h3 className="text-lg xs:text-xl sm:text-2xl font-bold mb-2 sm:mb-3 md:mb-4 drop-shadow-lg px-2 max-w-md">
                {currentSlide.title}
              </h3>
              <p className="text-sm xs:text-base sm:text-lg opacity-90 max-w-xs sm:max-w-sm md:max-w-md leading-relaxed drop-shadow px-2">
                {currentSlide.content}
              </p>
            </>
          )}
        </div>

        {/* Slide navigation arrows */}
        <button
          onClick={goPrev}
          disabled={currentIndex === 0}
          className={cn(
            "absolute left-1 xs:left-2 top-1/2 -translate-y-1/2 w-8 h-8 xs:w-9 xs:h-9 sm:w-10 sm:h-10 rounded-full bg-black/40 backdrop-blur flex items-center justify-center transition-opacity z-10",
            currentIndex === 0 ? "opacity-30 cursor-not-allowed" : "hover:bg-black/50"
          )}
        >
          <ChevronLeft className="w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6 text-white" />
        </button>
        <button
          onClick={goNext}
          disabled={currentIndex === slides.length - 1}
          className={cn(
            "absolute right-1 xs:right-2 top-1/2 -translate-y-1/2 w-8 h-8 xs:w-9 xs:h-9 sm:w-10 sm:h-10 rounded-full bg-black/40 backdrop-blur flex items-center justify-center transition-opacity z-10",
            currentIndex === slides.length - 1 ? "opacity-30 cursor-not-allowed" : "hover:bg-black/50"
          )}
        >
          <ChevronRight className="w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6 text-white" />
        </button>

        {/* Slide indicator with completion checkmarks */}
        <div className="absolute bottom-2 xs:bottom-3 sm:bottom-4 left-0 right-0 flex justify-center gap-1 xs:gap-1.5 z-10 flex-wrap px-4">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={cn(
                "relative w-1.5 h-1.5 xs:w-2 xs:h-2 rounded-full transition-all",
                index === currentIndex 
                  ? "bg-white w-4 xs:w-5 sm:w-6" 
                  : completedSlides.has(index)
                    ? "bg-green-400" 
                    : index < currentIndex 
                      ? "bg-white/70" 
                      : "bg-white/30"
              )}
            >
              {completedSlides.has(index) && index !== currentIndex && (
                <span className="absolute inset-0 flex items-center justify-center text-[6px] text-white">✓</span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="p-3 sm:p-4 bg-card space-y-2 sm:space-y-3">
        {/* Audio progress bar for current slide */}
        <div className="space-y-1">
          <div className="flex items-center justify-between text-[10px] sm:text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              {narration.isPlaying && <Volume2 className="w-3 h-3 animate-pulse text-primary" />}
              {narration.isLoading && <Loader2 className="w-3 h-3 animate-spin text-primary" />}
              {!narration.isPlaying && !narration.isLoading && completedSlides.has(currentIndex) && (
                <span className="text-green-500">✓ Completed</span>
              )}
              {!narration.isPlaying && !narration.isLoading && !completedSlides.has(currentIndex) && (
                <span>Slide {currentIndex + 1}</span>
              )}
            </span>
            <span>{Math.round(narration.progress)}%</span>
          </div>
          <div className="w-full h-1.5 sm:h-2 bg-muted rounded-full overflow-hidden">
            <div 
              className={cn(
                "h-full rounded-full transition-all duration-150",
                completedSlides.has(currentIndex) ? "bg-green-500" : "bg-primary"
              )}
              style={{ width: `${narration.progress}%` }}
            />
          </div>
        </div>
        
        {/* Overall progress bar */}
        <div className="w-full h-1 sm:h-1.5 bg-muted rounded-full overflow-hidden">
          <div 
            className="h-full gradient-hero rounded-full transition-all duration-100"
            style={{ width: `${totalProgress}%` }}
          />
        </div>

        {/* Control buttons */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-0.5 sm:gap-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsPlaying(!isPlaying)}
              className="h-9 w-9 sm:h-10 sm:w-10"
            >
              {isPlaying ? <Pause className="w-4 h-4 sm:w-5 sm:h-5" /> : <Play className="w-4 h-4 sm:w-5 sm:h-5 ml-0.5" />}
            </Button>
          </div>

          <div className="text-xs sm:text-sm text-muted-foreground flex items-center gap-1.5 sm:gap-2">
            {narration.isLoading && (
              <Loader2 className="w-3 h-3 sm:w-4 sm:h-4 animate-spin text-primary" />
            )}
            {narration.isPlaying && !narration.isLoading && (
              <Volume2 className="w-3 h-3 sm:w-4 sm:h-4 text-primary animate-pulse" />
            )}
            {backgroundMusic.isPlaying && (
              <Music className="w-3 h-3 sm:w-4 sm:h-4 text-primary/60" />
            )}
            <span className="font-mono">{formatTime(elapsedSeconds)}</span>
            <span className="text-muted-foreground/50">/</span>
            <span className="font-mono text-muted-foreground/70">{formatTime(actualTotalSeconds)}</span>
          </div>

          <div className="flex items-center gap-0.5 sm:gap-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowTranscript(!showTranscript)}
              className="h-9 w-9 sm:h-10 sm:w-10"
              title={showTranscript ? "Hide transcript" : "Show transcript"}
            >
              <FileText className={cn("w-4 h-4 sm:w-5 sm:h-5", !showTranscript && "text-muted-foreground")} />
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMusicEnabled(!musicEnabled)}
              className="h-9 w-9 sm:h-10 sm:w-10"
              title={musicEnabled ? "Mute background music" : "Enable background music"}
            >
              <Music className={cn("w-4 h-4 sm:w-5 sm:h-5", !musicEnabled && "text-muted-foreground")} />
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setAudioEnabled(!audioEnabled)}
              className="h-9 w-9 sm:h-10 sm:w-10"
              title={audioEnabled ? "Mute narration" : "Enable narration"}
            >
              {audioEnabled ? (
                <Volume2 className="w-4 h-4 sm:w-5 sm:h-5" />
              ) : (
                <VolumeX className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
              )}
            </Button>
          </div>
        </div>

        {/* Transcript display */}
        {showTranscript && (
          <ScrollArea className="h-20 sm:h-24 w-full rounded-lg bg-muted/50 p-2 sm:p-3">
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              {currentNarration}
            </p>
          </ScrollArea>
        )}
      </div>

      {/* Ken Burns keyframes */}
      <style>{`
        @keyframes kenBurns {
          0% { transform: scale(1) translate(0, 0); }
          50% { transform: scale(1.1) translate(-2%, -2%); }
          100% { transform: scale(1) translate(0, 0); }
        }
      `}</style>
    </div>
  );
}
