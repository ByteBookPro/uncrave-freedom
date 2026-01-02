import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Check, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BodyScanProps {
  onComplete?: (durationSeconds: number, tensionData: Record<string, number>) => void;
  onCancel?: () => void;
}

const bodyParts = [
  { id: 'head', label: 'Head & Face', description: 'Notice any tension in your forehead, jaw, or scalp' },
  { id: 'neck', label: 'Neck & Shoulders', description: 'Feel the weight on your shoulders, any tightness in your neck' },
  { id: 'chest', label: 'Chest & Heart', description: 'Notice your breathing, any heaviness or lightness' },
  { id: 'stomach', label: 'Stomach & Core', description: 'Feel your belly rise and fall, any butterflies or tension' },
  { id: 'hands', label: 'Arms & Hands', description: 'Notice any tingling, warmth, or tension in your hands' },
  { id: 'legs', label: 'Legs & Feet', description: 'Feel grounded, notice any tension in your thighs or feet' },
];

export function BodyScan({ onComplete, onCancel }: BodyScanProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [tensionLevels, setTensionLevels] = useState<Record<string, number>>({});
  const [isComplete, setIsComplete] = useState(false);
  const [startTime] = useState(Date.now());
  const [countdown, setCountdown] = useState(8);

  const currentPart = bodyParts[currentIndex];
  const progress = ((currentIndex + 1) / bodyParts.length) * 100;

  useEffect(() => {
    if (isComplete || !currentPart) return;

    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          return 8;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [currentIndex, isComplete, currentPart]);

  const handleNext = () => {
    if (currentIndex < bodyParts.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setCountdown(8);
    } else {
      setIsComplete(true);
    }
  };

  const handleTensionChange = (value: number) => {
    setTensionLevels((prev) => ({
      ...prev,
      [currentPart.id]: value,
    }));
  };

  const handleComplete = () => {
    if (onComplete) {
      const duration = Math.round((Date.now() - startTime) / 1000);
      onComplete(duration, tensionLevels);
    }
  };

  const currentTension = tensionLevels[currentPart?.id] ?? 3;

  if (isComplete) {
    const avgTension = Object.values(tensionLevels).reduce((a, b) => a + b, 0) / Object.values(tensionLevels).length;
    const mostTense = Object.entries(tensionLevels).sort(([, a], [, b]) => b - a)[0];
    const mostTensePart = bodyParts.find((p) => p.id === mostTense?.[0]);

    return (
      <div className="flex flex-col items-center min-h-[500px] p-6 space-y-6 animate-fade-in">
        <div className="w-20 h-20 rounded-full gradient-success flex items-center justify-center shadow-glow">
          <Check className="w-10 h-10 text-primary-foreground" />
        </div>
        
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold">Body Scan Complete</h2>
          <p className="text-muted-foreground">You've checked in with your whole body</p>
        </div>

        <div className="w-full max-w-sm bg-card rounded-2xl p-4 shadow-soft space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Average Tension</span>
            <span className="font-bold text-lg">{avgTension.toFixed(1)}/10</span>
          </div>
          {mostTensePart && (
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Most Tense Area</span>
              <span className="font-medium">{mostTensePart.label}</span>
            </div>
          )}
        </div>

        <div className="w-full max-w-sm space-y-2">
          {bodyParts.map((part) => (
            <div key={part.id} className="flex items-center gap-3">
              <span className="text-sm flex-1">{part.label}</span>
              <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                <div 
                  className={cn(
                    "h-full rounded-full transition-all",
                    (tensionLevels[part.id] ?? 0) > 6 ? "bg-destructive" :
                    (tensionLevels[part.id] ?? 0) > 3 ? "bg-accent" : "bg-success"
                  )}
                  style={{ width: `${((tensionLevels[part.id] ?? 0) / 10) * 100}%` }}
                />
              </div>
              <span className="text-sm font-medium w-6">{tensionLevels[part.id] ?? 0}</span>
            </div>
          ))}
        </div>

        <Button
          onClick={handleComplete}
          className="gradient-hero text-primary-foreground px-8"
          size="lg"
        >
          Done
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center min-h-[500px] p-6 space-y-6">
      {/* Progress */}
      <div className="w-full max-w-sm">
        <div className="flex justify-between text-sm text-muted-foreground mb-2">
          <span>Progress</span>
          <span>{currentIndex + 1} of {bodyParts.length}</span>
        </div>
        <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
          <div 
            className="h-full gradient-hero rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Body visualization */}
      <div className="relative w-40 h-64 my-4">
        {/* Simple body outline */}
        <div className="absolute inset-0 bg-muted rounded-3xl opacity-30" />
        
        {/* Highlight current region */}
        {bodyParts.map((part, index) => {
          const heights: Record<string, string> = {
            head: 'top-0 h-12',
            neck: 'top-10 h-10',
            chest: 'top-18 h-14',
            stomach: 'top-32 h-12',
            hands: 'top-24 h-16',
            legs: 'top-44 h-20',
          };
          
          return (
            <div
              key={part.id}
              className={cn(
                "absolute left-4 right-4 rounded-xl transition-all duration-500",
                heights[part.id],
                index === currentIndex 
                  ? "bg-primary/60 animate-pulse-soft" 
                  : index < currentIndex 
                    ? "bg-success/30" 
                    : "bg-muted/50"
              )}
            />
          );
        })}
      </div>

      {/* Current part info */}
      <div className="text-center space-y-2 animate-fade-in" key={currentPart.id}>
        <h3 className="text-xl font-bold">{currentPart.label}</h3>
        <p className="text-sm text-muted-foreground px-4">{currentPart.description}</p>
        <p className="text-xs text-muted-foreground">Focus for {countdown}s...</p>
      </div>

      {/* Tension slider */}
      <div className="w-full max-w-sm space-y-4">
        <div className="text-center">
          <span className="text-4xl font-bold text-primary">{currentTension}</span>
          <p className="text-sm text-muted-foreground">Tension Level</p>
        </div>
        <Slider
          value={[currentTension]}
          onValueChange={(v) => handleTensionChange(v[0])}
          max={10}
          min={0}
          step={1}
          className="w-full"
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Relaxed</span>
          <span>Very Tense</span>
        </div>
      </div>

      {/* Navigation */}
      <Button
        onClick={handleNext}
        className="gradient-hero text-primary-foreground px-8"
        size="lg"
      >
        {currentIndex < bodyParts.length - 1 ? (
          <>Next <ChevronRight className="w-4 h-4 ml-2" /></>
        ) : (
          <>Complete <Check className="w-4 h-4 ml-2" /></>
        )}
      </Button>

      {onCancel && currentIndex === 0 && (
        <Button variant="ghost" onClick={onCancel} className="text-muted-foreground">
          Cancel
        </Button>
      )}
    </div>
  );
}
