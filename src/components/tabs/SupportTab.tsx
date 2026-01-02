import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { 
  AlertCircle, Wind, Waves, Phone, MessageCircle, Heart, 
  ArrowLeft, ChevronRight, Coffee, Utensils, Beer, Briefcase, 
  Users, Car, Frown, Zap 
} from 'lucide-react';
import { BreathingCoach } from '@/components/practices/BreathingCoach';
import { UrgeSurfing } from '@/components/practices/UrgeSurfing';
import { useProgress } from '@/hooks/useProgress';
import { cn } from '@/lib/utils';

type SupportView = 'main' | 'craving' | 'breathing' | 'urge-surfing';

const triggers = [
  { id: 'stress', label: 'Stress', icon: Zap },
  { id: 'coffee', label: 'Coffee', icon: Coffee },
  { id: 'meal', label: 'After meal', icon: Utensils },
  { id: 'alcohol', label: 'Alcohol', icon: Beer },
  { id: 'work', label: 'Work break', icon: Briefcase },
  { id: 'social', label: 'Social', icon: Users },
  { id: 'commute', label: 'Commute', icon: Car },
  { id: 'boredom', label: 'Boredom', icon: Frown },
];

export function SupportTab() {
  const [view, setView] = useState<SupportView>('main');
  const [cravingIntensity, setCravingIntensity] = useState(5);
  const [selectedTrigger, setSelectedTrigger] = useState<string | null>(null);
  const { logCraving } = useProgress();

  const handleCravingLogged = async (copingUsed: string, overcame: boolean) => {
    await logCraving(cravingIntensity, selectedTrigger || undefined, undefined, copingUsed, overcame);
    setView('main');
    setCravingIntensity(5);
    setSelectedTrigger(null);
  };

  if (view === 'breathing') {
    return (
      <div className="min-h-screen bg-background">
        <div className="sticky top-0 z-10 bg-background/80 backdrop-blur border-b border-border p-4">
          <Button variant="ghost" onClick={() => setView('main')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </div>
        <BreathingCoach 
          config={{ inhaleSec: 4, holdSec: 4, exhaleSec: 6, cycles: 3 }}
          onComplete={() => handleCravingLogged('breathing', true)}
          onCancel={() => setView('main')}
        />
      </div>
    );
  }

  if (view === 'urge-surfing') {
    return (
      <div className="min-h-screen bg-background">
        <div className="sticky top-0 z-10 bg-background/80 backdrop-blur border-b border-border p-4">
          <Button variant="ghost" onClick={() => setView('main')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </div>
        <UrgeSurfing 
          onComplete={() => handleCravingLogged('urge_surfing', true)}
          onCancel={() => setView('main')}
        />
      </div>
    );
  }

  if (view === 'craving') {
    return (
      <div className="p-4 space-y-6 pb-24">
        <Button variant="ghost" onClick={() => setView('main')} className="mb-2">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold">Log Your Craving</h1>
          <p className="text-muted-foreground">Understanding your triggers helps you beat them</p>
        </div>

        {/* Intensity slider */}
        <Card className="p-6 space-y-4">
          <div className="text-center">
            <span className="text-5xl font-bold text-primary">{cravingIntensity}</span>
            <p className="text-sm text-muted-foreground mt-1">Craving Intensity</p>
          </div>
          <Slider
            value={[cravingIntensity]}
            onValueChange={(v) => setCravingIntensity(v[0])}
            max={10}
            min={1}
            step={1}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Mild</span>
            <span>Intense</span>
          </div>
        </Card>

        {/* Trigger selection */}
        <div className="space-y-3">
          <h3 className="font-semibold">What triggered this?</h3>
          <div className="grid grid-cols-4 gap-2">
            {triggers.map((trigger) => {
              const Icon = trigger.icon;
              return (
                <button
                  key={trigger.id}
                  onClick={() => setSelectedTrigger(trigger.id === selectedTrigger ? null : trigger.id)}
                  className={cn(
                    "flex flex-col items-center gap-1 p-3 rounded-xl transition-all",
                    selectedTrigger === trigger.id
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted hover:bg-muted/80"
                  )}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-xs">{trigger.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Quick actions */}
        <div className="space-y-3">
          <h3 className="font-semibold">What helps right now?</h3>
          <div className="grid grid-cols-2 gap-3">
            <Button
              onClick={() => setView('breathing')}
              variant="outline"
              className="h-auto py-4 flex-col gap-2"
            >
              <Wind className="w-6 h-6 text-primary" />
              <span>Quick Breathing</span>
            </Button>
            <Button
              onClick={() => setView('urge-surfing')}
              variant="outline"
              className="h-auto py-4 flex-col gap-2"
            >
              <Waves className="w-6 h-6 text-freedom" />
              <span>Urge Surfing</span>
            </Button>
          </div>
        </div>

        <Button 
          onClick={() => handleCravingLogged('logged_only', false)}
          variant="secondary"
          className="w-full"
        >
          Just Log It
        </Button>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-6 pb-24">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-2xl font-bold">Need Support?</h1>
        <p className="text-muted-foreground">
          We're here to help you through tough moments
        </p>
      </div>

      {/* Emergency CTA */}
      <Card className="overflow-hidden">
        <button 
          onClick={() => setView('craving')}
          className="w-full p-6 text-left bg-gradient-to-r from-coral to-destructive text-white"
        >
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center">
              <AlertCircle className="w-7 h-7" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold">I'm Having a Craving</h3>
              <p className="text-sm opacity-90">Get immediate help right now</p>
            </div>
            <ChevronRight className="w-6 h-6" />
          </div>
        </button>
      </Card>

      {/* Quick Actions */}
      <div className="space-y-3">
        <h3 className="font-semibold">Quick Relief</h3>
        <div className="grid grid-cols-2 gap-3">
          <Card 
            className="p-4 cursor-pointer hover:shadow-card transition-shadow"
            onClick={() => setView('breathing')}
          >
            <div className="flex flex-col items-center text-center gap-2">
              <div className="w-12 h-12 rounded-xl gradient-hero flex items-center justify-center">
                <Wind className="w-6 h-6 text-primary-foreground" />
              </div>
              <p className="font-medium">Deep Breathing</p>
              <p className="text-xs text-muted-foreground">2-3 min</p>
            </div>
          </Card>
          
          <Card 
            className="p-4 cursor-pointer hover:shadow-card transition-shadow"
            onClick={() => setView('urge-surfing')}
          >
            <div className="flex flex-col items-center text-center gap-2">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-freedom to-primary flex items-center justify-center">
                <Waves className="w-6 h-6 text-white" />
              </div>
              <p className="font-medium">Urge Surfing</p>
              <p className="text-xs text-muted-foreground">3-5 min</p>
            </div>
          </Card>
        </div>
      </div>

      {/* Resources */}
      <div className="space-y-3">
        <h3 className="font-semibold">More Resources</h3>
        
        <Card className="p-4">
          <button className="w-full flex items-center gap-4 text-left">
            <div className="p-2 rounded-xl bg-success/10">
              <Phone className="w-5 h-5 text-success" />
            </div>
            <div className="flex-1">
              <p className="font-medium">Quitline</p>
              <p className="text-sm text-muted-foreground">1-800-QUIT-NOW</p>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </button>
        </Card>

        <Card className="p-4">
          <button className="w-full flex items-center gap-4 text-left">
            <div className="p-2 rounded-xl bg-primary/10">
              <MessageCircle className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1">
              <p className="font-medium">Community Chat</p>
              <p className="text-sm text-muted-foreground">Connect with others</p>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </button>
        </Card>

        <Card className="p-4">
          <button className="w-full flex items-center gap-4 text-left">
            <div className="p-2 rounded-xl bg-coral/10">
              <Heart className="w-5 h-5 text-coral" />
            </div>
            <div className="flex-1">
              <p className="font-medium">Your Reasons to Quit</p>
              <p className="text-sm text-muted-foreground">Remember your why</p>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </button>
        </Card>
      </div>
    </div>
  );
}
