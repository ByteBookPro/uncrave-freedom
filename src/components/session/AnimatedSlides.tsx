import React, { useState, useEffect, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Play, Pause, ChevronLeft, ChevronRight, Volume2, VolumeX, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTextToSpeech, VoicePreset } from '@/hooks/useTextToSpeech';

interface Slide {
  id: string;
  title: string;
  content: string;
  backgroundGradient?: string;
  icon?: string;
  narration?: string; // Optional narration text for this slide
  voicePreset?: VoicePreset; // Optional voice preset for this slide
}

interface AnimatedSlidesProps {
  slides: Slide[];
  autoPlay?: boolean;
  slideDuration?: number; // base seconds per slide (auto-adjusts for narration length)
  onProgress?: (currentSlide: number, totalSlides: number) => void;
  onComplete?: () => void;
  title?: string;
  narrationKey?: string; // Key to look up narration in sessionNarration
  defaultVoicePreset?: VoicePreset;
}

// Detect voice preset based on slide content
function detectVoicePreset(slide: Slide, title?: string): VoicePreset {
  const text = `${slide.title} ${slide.content} ${slide.narration || ''}`.toLowerCase();
  
  // Breathing, meditation, guided exercises
  if (text.includes('breathe') || text.includes('breathing') || text.includes('inhale') || 
      text.includes('exhale') || text.includes('close your eyes') || text.includes('meditation')) {
    return 'guided';
  }
  
  // Craving/urge surfing content
  if (text.includes('craving') || text.includes('urge') || text.includes('emergency') ||
      text.includes('waves') || text.includes('surf')) {
    return 'cravingEmergency';
  }
  
  // Motivational content, endings, pledges
  if (text.includes('congratulation') || text.includes('you did it') || text.includes('freedom') ||
      text.includes('commit') || text.includes('promise') || text.includes('celebrate') ||
      text.includes('you can do') || text.includes('proud')) {
    return 'motivationLift';
  }
  
  // Personal stories
  if (text.includes('let me tell you') || text.includes('story') || text.includes('imagine') ||
      text.includes('picture') || text.includes('i know what') || text.includes('sarah') ||
      text.includes('years ago')) {
    return 'story';
  }
  
  // Default to daily coach
  return 'dailyCoach';
}

// Calculate slide duration based on narration length (~150 words per minute)
function calculateSlideDuration(slide: Slide, baseDuration: number): number {
  const narrationText = slide.narration || slide.content;
  const wordCount = narrationText.split(/\s+/).length;
  // Average speaking rate: ~150 words per minute = 2.5 words per second
  // Add buffer for pauses and processing
  const estimatedDuration = Math.max(baseDuration, (wordCount / 2.2) + 3);
  return Math.min(estimatedDuration, 120); // Cap at 2 minutes per slide
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
  const [hasPlayedNarration, setHasPlayedNarration] = useState<Set<number>>(new Set());
  
  const { speak, stop, isLoading: isNarrationLoading, isPlaying: isNarrationPlaying } = useTextToSpeech();

  // Guard against empty slides array
  if (!slides || slides.length === 0) {
    return (
      <div className="w-full rounded-2xl overflow-hidden shadow-card p-8 bg-card text-center">
        <p className="text-muted-foreground">No slides available</p>
      </div>
    );
  }

  const currentSlide = slides[currentIndex];
  
  // Calculate dynamic slide duration based on narration length
  const currentSlideDuration = useMemo(() => 
    calculateSlideDuration(currentSlide, slideDuration),
    [currentSlide, slideDuration]
  );
  
  const totalProgress = ((currentIndex + slideProgress / 100) / slides.length) * 100;

  // Track if all slides have been viewed
  const [viewedSlides, setViewedSlides] = useState<Set<number>>(new Set([0]));

  // Play narration when slide changes with appropriate voice preset
  useEffect(() => {
    if (!audioEnabled || hasPlayedNarration.has(currentIndex)) return;
    
    const narrationText = currentSlide.narration || currentSlide.content;
    if (narrationText && narrationText.length > 0) {
      // Determine the voice preset for this slide
      const voicePreset = currentSlide.voicePreset || detectVoicePreset(currentSlide, title) || defaultVoicePreset;
      
      console.log(`Playing narration for slide ${currentIndex + 1} with preset: ${voicePreset}`);
      speak(narrationText, { preset: voicePreset, gender: 'female' });
      setHasPlayedNarration(prev => new Set([...prev, currentIndex]));
    }
  }, [currentIndex, audioEnabled, currentSlide, hasPlayedNarration, speak, title, defaultVoicePreset]);

  // Stop narration when component unmounts or audio disabled
  useEffect(() => {
    return () => {
      stop();
    };
  }, [stop]);

  // Stop narration when audio is disabled
  useEffect(() => {
    if (!audioEnabled) {
      stop();
    }
  }, [audioEnabled, stop]);

  useEffect(() => {
    if (!isPlaying) return;

    const progressInterval = setInterval(() => {
      setSlideProgress((prev) => {
        if (prev >= 100) {
          // Move to next slide
          if (currentIndex < slides.length - 1) {
            const nextIndex = currentIndex + 1;
            setCurrentIndex(nextIndex);
            setViewedSlides(prevViewed => new Set([...prevViewed, nextIndex]));
            onProgress?.(nextIndex + 1, slides.length);
            return 0;
          } else {
            // Completed all slides
            setIsPlaying(false);
            onComplete?.();
            return 100;
          }
        }
        // Use dynamic duration for progress calculation
        return prev + (100 / (currentSlideDuration * 10));
      });
    }, 100);

    return () => clearInterval(progressInterval);
  }, [isPlaying, currentIndex, slides.length, currentSlideDuration, onProgress, onComplete]);

  // Check completion when all slides viewed
  useEffect(() => {
    if (viewedSlides.size === slides.length) {
      onComplete?.();
    }
  }, [viewedSlides.size, slides.length, onComplete]);

  const goToSlide = (index: number) => {
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

  // Ken Burns animation styles - use dynamic duration
  const kenBurnsStyle = {
    animation: isPlaying ? `kenBurns ${currentSlideDuration}s ease-in-out` : 'none',
  };

  return (
    <div className="w-full rounded-2xl overflow-hidden shadow-card">
      {/* Slide display */}
      <div 
        className={cn(
          "relative aspect-video overflow-hidden",
          currentSlide.backgroundGradient || "bg-gradient-to-br from-primary/80 to-freedom/80"
        )}
        style={kenBurnsStyle}
      >
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-white rounded-full blur-3xl" />
        </div>

        {/* Content */}
        <div 
          className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center text-white animate-fade-in"
          key={currentSlide.id}
        >
          {currentSlide.icon && (
            <span className="text-5xl mb-4">{currentSlide.icon}</span>
          )}
          <h3 className="text-2xl font-bold mb-4 drop-shadow-lg">
            {currentSlide.title}
          </h3>
          <p className="text-lg opacity-90 max-w-md leading-relaxed drop-shadow">
            {currentSlide.content}
          </p>
        </div>

        {/* Slide navigation arrows */}
        <button
          onClick={goPrev}
          disabled={currentIndex === 0}
          className={cn(
            "absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/20 backdrop-blur flex items-center justify-center transition-opacity",
            currentIndex === 0 ? "opacity-30 cursor-not-allowed" : "hover:bg-black/40"
          )}
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
        <button
          onClick={goNext}
          disabled={currentIndex === slides.length - 1}
          className={cn(
            "absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/20 backdrop-blur flex items-center justify-center transition-opacity",
            currentIndex === slides.length - 1 ? "opacity-30 cursor-not-allowed" : "hover:bg-black/40"
          )}
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>

        {/* Slide indicator */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-1.5">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={cn(
                "w-2 h-2 rounded-full transition-all",
                index === currentIndex 
                  ? "bg-white w-6" 
                  : index < currentIndex 
                    ? "bg-white/70" 
                    : "bg-white/30"
              )}
            />
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="p-4 bg-card space-y-3">
        {/* Progress bar */}
        <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
          <div 
            className="h-full gradient-hero rounded-full transition-all duration-100"
            style={{ width: `${totalProgress}%` }}
          />
        </div>

        {/* Control buttons */}
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsPlaying(!isPlaying)}
            className="h-10 w-10"
          >
            {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
          </Button>

          <span className="text-sm text-muted-foreground flex items-center gap-2">
            {isNarrationLoading && (
              <Loader2 className="w-4 h-4 animate-spin text-primary" />
            )}
            {isNarrationPlaying && !isNarrationLoading && (
              <Volume2 className="w-4 h-4 text-primary animate-pulse" />
            )}
            {currentIndex + 1} / {slides.length}
          </span>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setAudioEnabled(!audioEnabled)}
            className="h-10 w-10"
          >
            {audioEnabled ? (
              <Volume2 className="w-5 h-5" />
            ) : (
              <VolumeX className="w-5 h-5 text-muted-foreground" />
            )}
          </Button>
        </div>
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
