import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Play, Pause, ChevronLeft, ChevronRight, Volume2, VolumeX, Loader2, Music, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTextToSpeech, VoicePreset } from '@/hooks/useTextToSpeech';
import { useBackgroundMusic } from '@/hooks/useBackgroundMusic';
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

// Calculate minimum slide duration (fallback when audio disabled)
function calculateFallbackDuration(slide: Slide): number {
  const narrationText = slide.narration || slide.content;
  const wordCount = narrationText.split(/\s+/).length;
  // Estimate ~2.5 words per second speaking rate
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
  defaultVoicePreset = 'dailyCoach'
}: AnimatedSlidesProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [slideProgress, setSlideProgress] = useState(0);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [musicEnabled, setMusicEnabled] = useState(true);
  const [showTranscript, setShowTranscript] = useState(true);
  const [waitingForAudio, setWaitingForAudio] = useState(false);
  const [audioCompleted, setAudioCompleted] = useState(false);
  
  const { speak, stop, isLoading: isNarrationLoading, isPlaying: isNarrationPlaying, audioDuration } = useTextToSpeech();
  const backgroundMusic = useBackgroundMusic({ volume: 0.12 });
  const { profile } = useAuth();
  
  // Refs for tracking
  const currentIndexRef = useRef(currentIndex);
  const isPlayingRef = useRef(isPlaying);
  const progressTimerRef = useRef<NodeJS.Timeout | null>(null);
  
  // Keep refs in sync
  useEffect(() => {
    currentIndexRef.current = currentIndex;
  }, [currentIndex]);
  
  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);
  
  // Get user's language
  const userLanguage: ContentLanguage = profile?.language || 'en';
  
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
  
  // Calculate slide duration based on audio or fallback
  const currentSlideDuration = useMemo(() => {
    if (audioDuration > 0) {
      return audioDuration + 1; // Add 1 second buffer after audio ends
    }
    return calculateFallbackDuration(currentSlide);
  }, [currentSlide, audioDuration]);
  
  const totalProgress = ((currentIndex + slideProgress / 100) / slides.length) * 100;

  // Track if all slides have been viewed
  const [viewedSlides, setViewedSlides] = useState<Set<number>>(new Set([0]));

  // Current transcript text - per-slide narration or localized module narration
  const currentNarration = useMemo(() => {
    // For English, show the current slide's narration
    if (userLanguage === 'en' || !localizedNarration) {
      return currentSlide.narration || currentSlide.content;
    }
    // For other languages, show the full localized narration
    return localizedNarration;
  }, [currentSlide, localizedNarration, userLanguage]);

  // Advance to next slide
  const advanceToNextSlide = useCallback(() => {
    if (currentIndexRef.current < slides.length - 1) {
      const nextIndex = currentIndexRef.current + 1;
      setCurrentIndex(nextIndex);
      setViewedSlides(prev => new Set([...prev, nextIndex]));
      setSlideProgress(0);
      setAudioCompleted(false);
      onProgress?.(nextIndex + 1, slides.length);
    } else {
      // Last slide completed
      setIsPlaying(false);
      onComplete?.();
    }
  }, [slides.length, onProgress, onComplete]);

  // Play narration for current slide
  const playSlideNarration = useCallback(() => {
    if (!audioEnabled) {
      setAudioCompleted(true);
      return;
    }

    // For non-English, play localized narration only on first slide
    if (localizedNarration && currentIndexRef.current === 0) {
      const voicePreset = detectVoicePreset(currentSlide, title) || defaultVoicePreset;
      setWaitingForAudio(true);
      speak(localizedNarration, { 
        preset: voicePreset,
        onEnded: () => {
          setWaitingForAudio(false);
          setAudioCompleted(true);
        }
      });
      return;
    }

    // For English or subsequent slides, play per-slide narration
    const narrationText = currentSlide.narration || currentSlide.content;
    if (narrationText && narrationText.length > 0) {
      const voicePreset = currentSlide.voicePreset || detectVoicePreset(currentSlide, title) || defaultVoicePreset;
      setWaitingForAudio(true);
      speak(narrationText, { 
        preset: voicePreset,
        onEnded: () => {
          setWaitingForAudio(false);
          setAudioCompleted(true);
        }
      });
    } else {
      setAudioCompleted(true);
    }
  }, [audioEnabled, currentSlide, speak, title, defaultVoicePreset, localizedNarration]);

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
    if (isNarrationPlaying) {
      backgroundMusic.duck();
    } else {
      backgroundMusic.unduck();
    }
  }, [isNarrationPlaying]);

  // Stop music when component unmounts
  useEffect(() => {
    return () => {
      backgroundMusic.stop();
    };
  }, []);

  // Play narration when slide changes and playing
  useEffect(() => {
    if (isPlaying) {
      playSlideNarration();
    }
  }, [currentIndex, isPlaying]);

  // Handle play/pause state changes
  useEffect(() => {
    if (!isPlaying) {
      stop();
      if (progressTimerRef.current) {
        clearInterval(progressTimerRef.current);
        progressTimerRef.current = null;
      }
    }
  }, [isPlaying, stop]);

  // Stop narration when component unmounts
  useEffect(() => {
    return () => {
      stop();
      if (progressTimerRef.current) {
        clearInterval(progressTimerRef.current);
      }
    };
  }, [stop]);

  // Stop narration when audio is disabled
  useEffect(() => {
    if (!audioEnabled) {
      stop();
      setAudioCompleted(true);
    }
  }, [audioEnabled, stop]);

  // Auto-advance when audio completes (audio-driven transitions)
  useEffect(() => {
    if (!isPlaying || !audioCompleted) return;

    // Small delay after audio ends before advancing
    const timer = setTimeout(() => {
      if (isPlayingRef.current) {
        advanceToNextSlide();
      }
    }, 800);

    return () => clearTimeout(timer);
  }, [audioCompleted, isPlaying, advanceToNextSlide]);

  // Fallback timer for when audio is disabled
  useEffect(() => {
    if (!isPlaying || audioEnabled) return;

    const fallbackDuration = calculateFallbackDuration(currentSlide);
    
    progressTimerRef.current = setInterval(() => {
      setSlideProgress(prev => {
        const increment = 100 / (fallbackDuration * 10);
        if (prev + increment >= 100) {
          advanceToNextSlide();
          return 0;
        }
        return prev + increment;
      });
    }, 100);

    return () => {
      if (progressTimerRef.current) {
        clearInterval(progressTimerRef.current);
        progressTimerRef.current = null;
      }
    };
  }, [isPlaying, audioEnabled, currentSlide, advanceToNextSlide]);

  // Check completion when all slides viewed
  useEffect(() => {
    if (viewedSlides.size === slides.length) {
      onComplete?.();
    }
  }, [viewedSlides.size, slides.length, onComplete]);

  const goToSlide = (index: number) => {
    // Stop current audio before navigating
    stop();
    setAudioCompleted(false);
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

  // Ken Burns animation styles
  const kenBurnsStyle = {
    animation: isPlaying ? `kenBurns ${currentSlideDuration}s ease-in-out` : 'none',
  };

  // Get text position classes based on slide config
  const getTextPositionClasses = (position?: string, hasImage?: boolean) => {
    if (hasImage) {
      // For image slides, use safe positioning with adequate padding
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
    // For gradient slides
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
    <div className="w-full rounded-2xl overflow-hidden shadow-card">
      {/* Slide display */}
      <div 
        className={cn(
          "relative overflow-hidden",
          // Use aspect ratio for consistent sizing across devices
          currentSlide.backgroundImage 
            ? "aspect-[4/5] xs:aspect-[3/4] sm:aspect-[16/10] md:aspect-video" 
            : "min-h-[280px] xs:min-h-[320px] sm:min-h-[360px] md:aspect-video",
          !currentSlide.backgroundImage && (currentSlide.backgroundGradient || "bg-gradient-to-br from-primary/80 to-freedom/80")
        )}
      >
        {/* Background image if provided - object-contain to show full image */}
        {currentSlide.backgroundImage && (
          <div className="absolute inset-0 bg-black">
            <img 
              src={currentSlide.backgroundImage}
              alt={currentSlide.title}
              className="w-full h-full object-contain"
              style={{ 
                objectPosition: 'center center',
              }}
            />
            {/* Gradient overlay for text readability at edges */}
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

        {/* Content - positioned based on slide config */}
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
          
          {/* Title and content - show on all slides including image slides */}
          {currentSlide.backgroundImage ? (
            // Image slide: compact text overlay
            <div className="max-w-[90%] xs:max-w-[85%] sm:max-w-md bg-black/40 backdrop-blur-sm rounded-lg p-2 xs:p-3 sm:p-4">
              <h3 className="text-sm xs:text-base sm:text-lg md:text-xl font-bold drop-shadow-lg leading-tight">
                {currentSlide.title}
              </h3>
              <p className="text-xs xs:text-sm sm:text-base opacity-90 leading-snug mt-1 xs:mt-1.5 drop-shadow line-clamp-3 xs:line-clamp-none">
                {currentSlide.content}
              </p>
            </div>
          ) : (
            // Gradient slide: larger text
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

        {/* Ken Burns animation for images */}
        {currentSlide.backgroundImage && isPlaying && (
          <style>{`
            .animate-ken-burns {
              animation: kenBurns ${currentSlideDuration}s ease-in-out;
            }
          `}</style>
        )}

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

        {/* Slide indicator */}
        <div className="absolute bottom-2 xs:bottom-3 sm:bottom-4 left-0 right-0 flex justify-center gap-1 xs:gap-1.5 z-10 flex-wrap px-4">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={cn(
                "w-1.5 h-1.5 xs:w-2 xs:h-2 rounded-full transition-all",
                index === currentIndex 
                  ? "bg-white w-4 xs:w-5 sm:w-6" 
                  : index < currentIndex 
                    ? "bg-white/70" 
                    : "bg-white/30"
              )}
            />
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="p-3 sm:p-4 bg-card space-y-2 sm:space-y-3">
        {/* Progress bar */}
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

          <span className="text-xs sm:text-sm text-muted-foreground flex items-center gap-1 sm:gap-2">
            {isNarrationLoading && (
              <Loader2 className="w-3 h-3 sm:w-4 sm:h-4 animate-spin text-primary" />
            )}
            {isNarrationPlaying && !isNarrationLoading && (
              <Volume2 className="w-3 h-3 sm:w-4 sm:h-4 text-primary animate-pulse" />
            )}
            {backgroundMusic.isPlaying && (
              <Music className="w-3 h-3 sm:w-4 sm:h-4 text-primary/60" />
            )}
            {currentIndex + 1} / {slides.length}
          </span>

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

      {/* Add Ken Burns keyframes via style tag */}
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
