import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Play, Pause, RotateCcw, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BreathingCoachProps {
  config?: {
    inhaleSec?: number;
    holdSec?: number;
    exhaleSec?: number;
    cycles?: number;
  };
  onComplete?: (intensityBefore: number, intensityAfter: number, durationSeconds: number) => void;
  onCancel?: () => void;
}

type Phase = 'idle' | 'inhale' | 'hold' | 'exhale' | 'complete';

export function BreathingCoach({ 
  config = { inhaleSec: 4, holdSec: 4, exhaleSec: 6, cycles: 4 },
  onComplete,
  onCancel 
}: BreathingCoachProps) {
  const { inhaleSec = 4, holdSec = 4, exhaleSec = 6, cycles = 4 } = config;
  
  const [phase, setPhase] = useState<Phase>('idle');
  const [currentCycle, setCurrentCycle] = useState(0);
  const [timer, setTimer] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [intensityBefore, setIntensityBefore] = useState<number>(5);
  const [intensityAfter, setIntensityAfter] = useState<number>(5);
  const [showBeforeSlider, setShowBeforeSlider] = useState(true);
  const [startTime, setStartTime] = useState<number | null>(null);

  const phaseLabels: Record<Phase, string> = {
    idle: 'Ready to Begin',
    inhale: 'Breathe In',
    hold: 'Hold',
    exhale: 'Breathe Out',
    complete: 'Well Done!'
  };

  const phaseDuration = phase === 'inhale' ? inhaleSec : phase === 'hold' ? holdSec : phase === 'exhale' ? exhaleSec : 0;

  const handleStart = () => {
    setShowBeforeSlider(false);
    setPhase('inhale');
    setCurrentCycle(1);
    setTimer(inhaleSec);
    setStartTime(Date.now());
    setIsPaused(false);
  };

  const handleComplete = useCallback(() => {
    if (startTime && onComplete) {
      const duration = Math.round((Date.now() - startTime) / 1000);
      onComplete(intensityBefore, intensityAfter, duration);
    }
  }, [startTime, intensityBefore, intensityAfter, onComplete]);

  const handleReset = () => {
    setPhase('idle');
    setCurrentCycle(0);
    setTimer(0);
    setIsPaused(false);
    setShowBeforeSlider(true);
    setStartTime(null);
  };

  useEffect(() => {
    if (phase === 'idle' || phase === 'complete' || isPaused) return;

    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          // Move to next phase
          if (phase === 'inhale') {
            setPhase('hold');
            return holdSec;
          } else if (phase === 'hold') {
            setPhase('exhale');
            return exhaleSec;
          } else if (phase === 'exhale') {
            if (currentCycle >= cycles) {
              setPhase('complete');
              return 0;
            } else {
              setCurrentCycle((c) => c + 1);
              setPhase('inhale');
              return inhaleSec;
            }
          }
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [phase, isPaused, currentCycle, cycles, inhaleSec, holdSec, exhaleSec]);

  const getCircleScale = () => {
    if (phase === 'inhale') return 1 + ((phaseDuration - timer) / phaseDuration) * 0.3;
    if (phase === 'hold') return 1.3;
    if (phase === 'exhale') return 1.3 - ((phaseDuration - timer) / phaseDuration) * 0.3;
    return 1;
  };

  const getCircleOpacity = () => {
    if (phase === 'hold') return 1;
    return 0.8 + ((phaseDuration - timer) / phaseDuration) * 0.2;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[500px] p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-foreground">Breathing Coach</h2>
        <p className="text-muted-foreground">
          {phase === 'idle' ? 'Take a moment to center yourself' : 
           phase === 'complete' ? 'You did great!' : 
           `Cycle ${currentCycle} of ${cycles}`}
        </p>
      </div>

      {/* Before slider */}
      {showBeforeSlider && (
        <div className="w-full max-w-xs space-y-4 animate-fade-in">
          <p className="text-center text-sm text-muted-foreground">
            How intense is your craving right now?
          </p>
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
            <span className="font-semibold text-primary">{intensityBefore}</span>
            <span>10 - Intense</span>
          </div>
        </div>
      )}

      {/* Breathing circle */}
      <div className="relative flex items-center justify-center w-64 h-64">
        {/* Background glow */}
        <div 
          className={cn(
            "absolute w-48 h-48 rounded-full transition-all duration-1000",
            phase !== 'idle' && phase !== 'complete' && "animate-pulse-soft"
          )}
          style={{
            background: 'var(--gradient-hero)',
            opacity: 0.2,
            transform: `scale(${getCircleScale() * 1.1})`,
          }}
        />
        
        {/* Main circle */}
        <div 
          className="absolute rounded-full gradient-hero shadow-glow flex items-center justify-center transition-all duration-1000"
          style={{
            width: '12rem',
            height: '12rem',
            transform: `scale(${getCircleScale()})`,
            opacity: getCircleOpacity(),
          }}
        >
          <div className="text-center text-primary-foreground">
            <p className="text-lg font-semibold">{phaseLabels[phase]}</p>
            {phase !== 'idle' && phase !== 'complete' && (
              <p className="text-4xl font-bold">{timer}</p>
            )}
          </div>
        </div>
      </div>

      {/* After slider (shown on complete) */}
      {phase === 'complete' && (
        <div className="w-full max-w-xs space-y-4 animate-fade-in">
          <p className="text-center text-sm text-muted-foreground">
            How do you feel now?
          </p>
          <Slider
            value={[intensityAfter]}
            onValueChange={(v) => setIntensityAfter(v[0])}
            max={10}
            min={1}
            step={1}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>1 - Calm</span>
            <span className="font-semibold text-primary">{intensityAfter}</span>
            <span>10 - Still Intense</span>
          </div>
        </div>
      )}

      {/* Controls */}
      <div className="flex items-center gap-4">
        {phase === 'idle' && (
          <Button 
            onClick={handleStart}
            className="gradient-hero text-primary-foreground shadow-button px-8"
            size="lg"
          >
            <Play className="w-5 h-5 mr-2" />
            Start
          </Button>
        )}

        {phase !== 'idle' && phase !== 'complete' && (
          <>
            <Button
              onClick={() => setIsPaused(!isPaused)}
              variant="outline"
              size="lg"
            >
              {isPaused ? <Play className="w-5 h-5" /> : <Pause className="w-5 h-5" />}
            </Button>
            <Button
              onClick={handleReset}
              variant="ghost"
              size="lg"
            >
              <RotateCcw className="w-5 h-5" />
            </Button>
          </>
        )}

        {phase === 'complete' && (
          <Button 
            onClick={handleComplete}
            className="gradient-success text-primary-foreground shadow-button px-8"
            size="lg"
          >
            <Check className="w-5 h-5 mr-2" />
            Done
          </Button>
        )}
      </div>

      {onCancel && phase === 'idle' && (
        <Button variant="ghost" onClick={onCancel} className="text-muted-foreground">
          Cancel
        </Button>
      )}
    </div>
  );
}
