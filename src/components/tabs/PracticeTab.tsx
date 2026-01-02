import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Wind, Waves, Eye, Brain, Sparkles, Heart, Lock, ArrowLeft, Clock } from 'lucide-react';
import { BreathingCoach } from '@/components/practices/BreathingCoach';
import { UrgeSurfing } from '@/components/practices/UrgeSurfing';
import { BodyScan } from '@/components/practices/BodyScan';
import { useProgress } from '@/hooks/useProgress';
import { cn } from '@/lib/utils';

type PracticeType = 'breathing' | 'urge-surfing' | 'body-scan' | 'visualization' | 'trigger-scan' | 'craving-emergency';

interface PracticePack {
  id: PracticeType;
  title: string;
  description: string;
  duration: string;
  icon: React.ElementType;
  color: string;
  unlockAfterDay: number;
  alwaysAvailable?: boolean;
}

const practicePacks: PracticePack[] = [
  {
    id: 'breathing',
    title: '5-5-5 Breathing',
    description: 'Calm your nervous system with guided breathing',
    duration: '2-3 min',
    icon: Wind,
    color: 'from-primary to-freedom',
    unlockAfterDay: 0,
    alwaysAvailable: true,
  },
  {
    id: 'urge-surfing',
    title: 'Urge Surfing',
    description: 'Ride the wave of cravings without giving in',
    duration: '3-5 min',
    icon: Waves,
    color: 'from-freedom to-primary',
    unlockAfterDay: 0,
    alwaysAvailable: true,
  },
  {
    id: 'body-scan',
    title: 'Body Scan',
    description: 'Release tension and increase body awareness',
    duration: '5-6 min',
    icon: Eye,
    color: 'from-success to-primary',
    unlockAfterDay: 2,
  },
  {
    id: 'visualization',
    title: 'Visualization Reset',
    description: 'Imagine your smoke-free future',
    duration: '3-4 min',
    icon: Sparkles,
    color: 'from-accent to-coral',
    unlockAfterDay: 3,
  },
  {
    id: 'trigger-scan',
    title: 'Trigger Scan & Reframe',
    description: 'Identify and reframe your smoking triggers',
    duration: '5 min',
    icon: Brain,
    color: 'from-coral to-accent',
    unlockAfterDay: 1,
  },
  {
    id: 'craving-emergency',
    title: 'Craving Emergency',
    description: 'Intense craving? This combo flow helps fast',
    duration: '6-8 min',
    icon: Heart,
    color: 'from-destructive to-coral',
    unlockAfterDay: 4,
  },
];

export function PracticeTab() {
  const [activePractice, setActivePractice] = useState<PracticeType | null>(null);
  const { logPractice } = useProgress();
  
  // For now, assume user has completed day 3 (would come from actual progress)
  const completedDays = 3;

  const handlePracticeComplete = async (
    practiceType: PracticeType,
    intensityBefore?: number,
    intensityAfter?: number,
    duration?: number
  ) => {
    // In a real app, we'd get the practice ID from the database
    // For now, just log it
    console.log('Practice completed:', { practiceType, intensityBefore, intensityAfter, duration });
    setActivePractice(null);
  };

  if (activePractice === 'breathing') {
    return (
      <div className="min-h-screen bg-background">
        <div className="sticky top-0 z-10 bg-background/80 backdrop-blur border-b border-border p-4">
          <Button variant="ghost" onClick={() => setActivePractice(null)}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </div>
        <BreathingCoach 
          config={{ inhaleSec: 5, holdSec: 5, exhaleSec: 5, cycles: 4 }}
          onComplete={(before, after, duration) => handlePracticeComplete('breathing', before, after, duration)}
          onCancel={() => setActivePractice(null)}
        />
      </div>
    );
  }

  if (activePractice === 'urge-surfing') {
    return (
      <div className="min-h-screen bg-background">
        <div className="sticky top-0 z-10 bg-background/80 backdrop-blur border-b border-border p-4">
          <Button variant="ghost" onClick={() => setActivePractice(null)}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </div>
        <UrgeSurfing 
          onComplete={(before, after, duration) => handlePracticeComplete('urge-surfing', before, after, duration)}
          onCancel={() => setActivePractice(null)}
        />
      </div>
    );
  }

  if (activePractice === 'body-scan') {
    return (
      <div className="min-h-screen bg-background">
        <div className="sticky top-0 z-10 bg-background/80 backdrop-blur border-b border-border p-4">
          <Button variant="ghost" onClick={() => setActivePractice(null)}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </div>
        <BodyScan 
          onComplete={(duration) => handlePracticeComplete('body-scan', undefined, undefined, duration)}
          onCancel={() => setActivePractice(null)}
        />
      </div>
    );
  }

  return (
    <div className="p-4 space-y-6 pb-24">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-2xl font-bold">Practice</h1>
        <p className="text-muted-foreground">
          Build your skills with repeatable exercises
        </p>
      </div>

      {/* Recommended */}
      <Card className="p-4 border-2 border-primary/20 bg-primary/5">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-xl gradient-hero">
            <Waves className="w-5 h-5 text-primary-foreground" />
          </div>
          <div className="flex-1">
            <p className="text-xs text-muted-foreground uppercase tracking-wide">Recommended for you</p>
            <p className="font-semibold mt-0.5">Urge Surfing</p>
            <p className="text-sm text-muted-foreground mt-1">Based on your last craving intensity</p>
          </div>
          <Button 
            size="sm" 
            className="gradient-hero text-primary-foreground"
            onClick={() => setActivePractice('urge-surfing')}
          >
            Start
          </Button>
        </div>
      </Card>

      {/* Practice Packs */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold">Practice Packs</h3>
        <div className="grid gap-3">
          {practicePacks.map((pack) => {
            const Icon = pack.icon;
            const isLocked = !pack.alwaysAvailable && completedDays < pack.unlockAfterDay;

            return (
              <button
                key={pack.id}
                onClick={() => !isLocked && setActivePractice(pack.id)}
                disabled={isLocked}
                className={cn(
                  "w-full flex items-center gap-4 p-4 rounded-2xl transition-all text-left bg-card shadow-soft",
                  isLocked && "opacity-60",
                  !isLocked && "hover:shadow-card"
                )}
              >
                <div className={cn(
                  "w-14 h-14 rounded-2xl flex items-center justify-center bg-gradient-to-br",
                  pack.color,
                  isLocked && "grayscale"
                )}>
                  {isLocked ? (
                    <Lock className="w-6 h-6 text-white/80" />
                  ) : (
                    <Icon className="w-6 h-6 text-white" />
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <p className="font-semibold">{pack.title}</p>
                  <p className="text-sm text-muted-foreground line-clamp-1">
                    {pack.description}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <Clock className="w-3 h-3 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">{pack.duration}</span>
                    {isLocked && (
                      <span className="text-xs text-muted-foreground">
                        • Unlocks after Day {pack.unlockAfterDay}
                      </span>
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
