import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Play, Pause, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Slide {
  id: string;
  title: string;
  content: string;
  backgroundGradient?: string;
  icon?: string;
}

interface AnimatedSlidesProps {
  slides: Slide[];
  autoPlay?: boolean;
  slideDuration?: number; // seconds per slide
  onProgress?: (currentSlide: number, totalSlides: number) => void;
  onComplete?: () => void;
  title?: string;
}

export function AnimatedSlides({
  slides,
  autoPlay = true,
  slideDuration = 10,
  onProgress,
  onComplete,
  title
}: AnimatedSlidesProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [slideProgress, setSlideProgress] = useState(0);

  const currentSlide = slides[currentIndex];
  const totalProgress = ((currentIndex + slideProgress / 100) / slides.length) * 100;

  useEffect(() => {
    if (!isPlaying) return;

    const progressInterval = setInterval(() => {
      setSlideProgress((prev) => {
        if (prev >= 100) {
          // Move to next slide
          if (currentIndex < slides.length - 1) {
            setCurrentIndex((i) => i + 1);
            onProgress?.(currentIndex + 1, slides.length);
            return 0;
          } else {
            // Completed all slides
            setIsPlaying(false);
            onComplete?.();
            return 100;
          }
        }
        return prev + (100 / (slideDuration * 10));
      });
    }, 100);

    return () => clearInterval(progressInterval);
  }, [isPlaying, currentIndex, slides.length, slideDuration, onProgress, onComplete]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setSlideProgress(0);
    onProgress?.(index, slides.length);
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
    animation: isPlaying ? `kenBurns ${slideDuration}s ease-in-out` : 'none',
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

          <span className="text-sm text-muted-foreground">
            {currentIndex + 1} / {slides.length}
          </span>

          <div className="w-10" /> {/* Spacer for alignment */}
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
