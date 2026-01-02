import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Check, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface UrgeSurfingProps {
  onComplete?: (intensityBefore: number, intensityAfter: number, durationSeconds: number) => void;
  onCancel?: () => void;
}

type Step = 'name' | 'locate' | 'rate-before' | 'surf' | 'rate-after' | 'complete';

const urgeNames = [
  { id: 'craving', label: 'Craving', emoji: '🔥' },
  { id: 'restless', label: 'Restless', emoji: '😤' },
  { id: 'anxious', label: 'Anxious', emoji: '😰' },
  { id: 'bored', label: 'Bored', emoji: '😐' },
  { id: 'stressed', label: 'Stressed', emoji: '😫' },
  { id: 'habitual', label: 'Habitual', emoji: '🔄' },
];

const bodyRegions = [
  { id: 'head', label: 'Head', position: 'top-4' },
  { id: 'chest', label: 'Chest', position: 'top-20' },
  { id: 'stomach', label: 'Stomach', position: 'top-32' },
  { id: 'hands', label: 'Hands', position: 'top-28' },
  { id: 'throat', label: 'Throat', position: 'top-12' },
];

export function UrgeSurfing({ onComplete, onCancel }: UrgeSurfingProps) {
  const [step, setStep] = useState<Step>('name');
  const [selectedUrge, setSelectedUrge] = useState<string | null>(null);
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [intensityBefore, setIntensityBefore] = useState(5);
  const [intensityAfter, setIntensityAfter] = useState(5);
  const [surfTimer, setSurfTimer] = useState(120); // 2 minutes
  const [startTime] = useState(Date.now());

  // Wave animation progress
  const waveProgress = ((120 - surfTimer) / 120) * 100;

  useEffect(() => {
    if (step !== 'surf' || surfTimer <= 0) return;

    const interval = setInterval(() => {
      setSurfTimer((prev) => {
        if (prev <= 1) {
          setStep('rate-after');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [step, surfTimer]);

  const handleComplete = () => {
    if (onComplete) {
      const duration = Math.round((Date.now() - startTime) / 1000);
      onComplete(intensityBefore, intensityAfter, duration);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col items-center min-h-[500px] p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-foreground">Urge Surfing</h2>
        <p className="text-muted-foreground text-sm">
          {step === 'name' && 'What are you feeling?'}
          {step === 'locate' && 'Where do you feel it?'}
          {step === 'rate-before' && 'How intense is it?'}
          {step === 'surf' && 'Ride the wave...'}
          {step === 'rate-after' && 'How do you feel now?'}
          {step === 'complete' && 'Great job!'}
        </p>
      </div>

      {/* Step: Name the urge */}
      {step === 'name' && (
        <div className="w-full max-w-sm space-y-4 animate-fade-in">
          <div className="grid grid-cols-2 gap-3">
            {urgeNames.map((urge) => (
              <button
                key={urge.id}
                onClick={() => setSelectedUrge(urge.id)}
                className={cn(
                  "p-4 rounded-xl border-2 transition-all duration-200 text-left",
                  selectedUrge === urge.id
                    ? "border-primary bg-primary/10"
                    : "border-border hover:border-primary/50"
                )}
              >
                <span className="text-2xl">{urge.emoji}</span>
                <p className="mt-1 font-medium">{urge.label}</p>
              </button>
            ))}
          </div>
          <Button
            onClick={() => setStep('locate')}
            disabled={!selectedUrge}
            className="w-full gradient-hero text-primary-foreground"
          >
            Continue <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      )}

      {/* Step: Locate sensation */}
      {step === 'locate' && (
        <div className="w-full max-w-sm space-y-4 animate-fade-in">
          <div className="relative mx-auto w-32 h-64 bg-muted rounded-3xl">
            {/* Simple body silhouette regions */}
            {bodyRegions.map((region) => (
              <button
                key={region.id}
                onClick={() => setSelectedRegion(region.id)}
                className={cn(
                  "absolute left-1/2 -translate-x-1/2 w-16 h-12 rounded-xl transition-all duration-200",
                  region.position,
                  selectedRegion === region.id
                    ? "bg-primary/60"
                    : "bg-primary/20 hover:bg-primary/40"
                )}
              />
            ))}
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {bodyRegions.map((region) => (
              <button
                key={region.id}
                onClick={() => setSelectedRegion(region.id)}
                className={cn(
                  "px-3 py-1.5 rounded-full text-sm transition-all",
                  selectedRegion === region.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted hover:bg-muted/80"
                )}
              >
                {region.label}
              </button>
            ))}
          </div>
          <Button
            onClick={() => setStep('rate-before')}
            disabled={!selectedRegion}
            className="w-full gradient-hero text-primary-foreground"
          >
            Continue <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      )}

      {/* Step: Rate intensity before */}
      {step === 'rate-before' && (
        <div className="w-full max-w-sm space-y-6 animate-fade-in">
          <div className="text-center">
            <span className="text-6xl font-bold text-primary">{intensityBefore}</span>
            <p className="text-muted-foreground mt-2">Intensity</p>
          </div>
          <Slider
            value={[intensityBefore]}
            onValueChange={(v) => setIntensityBefore(v[0])}
            max={10}
            min={1}
            step={1}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>1 - Mild</span>
            <span>10 - Overwhelming</span>
          </div>
          <Button
            onClick={() => setStep('surf')}
            className="w-full gradient-hero text-primary-foreground"
          >
            Start Surfing <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      )}

      {/* Step: Surf the urge */}
      {step === 'surf' && (
        <div className="w-full max-w-sm space-y-6 animate-fade-in flex-1 flex flex-col items-center justify-center">
          {/* Wave animation */}
          <div className="relative w-full h-40 bg-muted rounded-2xl overflow-hidden">
            <div 
              className="absolute bottom-0 left-0 right-0 gradient-hero transition-all duration-1000"
              style={{ height: `${30 + Math.sin(waveProgress * 0.1) * 20 + (waveProgress * 0.4)}%` }}
            >
              <svg 
                className="absolute top-0 w-full" 
                viewBox="0 0 1200 120" 
                preserveAspectRatio="none"
                style={{ height: '30px', transform: 'translateY(-50%)' }}
              >
                <path 
                  d="M0,60 C300,120 600,0 900,60 C1050,90 1150,30 1200,60 V120 H0 Z" 
                  fill="currentColor" 
                  className="text-primary"
                />
              </svg>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <p className="text-4xl font-bold">{formatTime(surfTimer)}</p>
                <p className="text-sm text-muted-foreground mt-1">Ride the wave</p>
              </div>
            </div>
          </div>
          
          <p className="text-center text-sm text-muted-foreground px-4">
            Observe the urge without acting on it. Notice it rise, peak, and fall like a wave.
          </p>

          <Button
            variant="outline"
            onClick={() => setStep('rate-after')}
            className="mt-4"
          >
            Skip to rating
          </Button>
        </div>
      )}

      {/* Step: Rate intensity after */}
      {step === 'rate-after' && (
        <div className="w-full max-w-sm space-y-6 animate-fade-in">
          <div className="text-center space-y-2">
            <p className="text-sm text-muted-foreground">Before: {intensityBefore}</p>
            <span className="text-6xl font-bold text-success">{intensityAfter}</span>
            <p className="text-muted-foreground mt-2">Current Intensity</p>
          </div>
          <Slider
            value={[intensityAfter]}
            onValueChange={(v) => setIntensityAfter(v[0])}
            max={10}
            min={1}
            step={1}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>1 - Passed</span>
            <span>10 - Still Strong</span>
          </div>
          <Button
            onClick={() => setStep('complete')}
            className="w-full gradient-success text-primary-foreground"
          >
            See Results <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      )}

      {/* Step: Complete */}
      {step === 'complete' && (
        <div className="w-full max-w-sm space-y-6 animate-fade-in text-center flex-1 flex flex-col items-center justify-center">
          <div className="w-20 h-20 rounded-full gradient-success flex items-center justify-center shadow-glow">
            <Check className="w-10 h-10 text-primary-foreground" />
          </div>
          <div>
            <h3 className="text-xl font-bold">Great Job!</h3>
            <p className="text-muted-foreground mt-2">
              You reduced your urge from <span className="font-bold text-destructive">{intensityBefore}</span> to <span className="font-bold text-success">{intensityAfter}</span>
            </p>
          </div>
          {intensityBefore > intensityAfter && (
            <p className="text-sm text-success font-medium">
              That's a {Math.round(((intensityBefore - intensityAfter) / intensityBefore) * 100)}% reduction! 🎉
            </p>
          )}
          <Button
            onClick={handleComplete}
            className="gradient-hero text-primary-foreground px-8"
            size="lg"
          >
            Done
          </Button>
        </div>
      )}

      {onCancel && step === 'name' && (
        <Button variant="ghost" onClick={onCancel} className="text-muted-foreground">
          Cancel
        </Button>
      )}
    </div>
  );
}
