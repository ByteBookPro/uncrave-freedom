import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useApp } from '@/contexts/AppContext';
import { UserProfile } from '@/types/app';
import { commonTriggers } from '@/data/programContent';
import { ArrowRight, ArrowLeft, Heart, Sparkles, Target, Check } from 'lucide-react';

type OnboardingStep = 'welcome' | 'name' | 'habits' | 'triggers' | 'reasons' | 'ready';

export function Onboarding() {
  const { setUser, setIsOnboarded, setCurrentView } = useApp();
  const [step, setStep] = useState<OnboardingStep>('welcome');
  const [name, setName] = useState('');
  const [cigarettesPerDay, setCigarettesPerDay] = useState('');
  const [yearsOfSmoking, setYearsOfSmoking] = useState('');
  const [pricePerPack, setPricePerPack] = useState('');
  const [selectedTriggers, setSelectedTriggers] = useState<string[]>([]);
  const [reasons, setReasons] = useState<string[]>(['', '', '']);

  const toggleTrigger = (triggerId: string) => {
    setSelectedTriggers(prev =>
      prev.includes(triggerId)
        ? prev.filter(t => t !== triggerId)
        : [...prev, triggerId]
    );
  };

  const updateReason = (index: number, value: string) => {
    const newReasons = [...reasons];
    newReasons[index] = value;
    setReasons(newReasons);
  };

  const handleComplete = () => {
    const user: UserProfile = {
      id: Date.now().toString(),
      name,
      cigarettesPerDay: parseInt(cigarettesPerDay) || 20,
      yearsOfSmoking: parseInt(yearsOfSmoking) || 5,
      pricePerPack: parseFloat(pricePerPack) || 10,
      cigarettesPerPack: 20,
      triggers: selectedTriggers.map(id => 
        commonTriggers.find(t => t.id === id)?.label || ''
      ).filter(Boolean),
      reasonsToQuit: reasons.filter(r => r.trim() !== ''),
      currentDay: 1,
      completedDays: [],
      createdAt: new Date(),
    };
    setUser(user);
    setIsOnboarded(true);
    setCurrentView('dashboard');
  };

  const canProceed = () => {
    switch (step) {
      case 'name': return name.trim().length > 0;
      case 'habits': return cigarettesPerDay && yearsOfSmoking;
      case 'triggers': return selectedTriggers.length > 0;
      case 'reasons': return reasons.some(r => r.trim() !== '');
      default: return true;
    }
  };

  const renderStep = () => {
    switch (step) {
      case 'welcome':
        return (
          <div className="flex flex-col items-center text-center animate-fade-in">
            <div className="w-24 h-24 rounded-full gradient-hero flex items-center justify-center mb-8 animate-breathe shadow-glow">
              <Sparkles className="w-12 h-12 text-primary-foreground" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold font-display mb-4 text-foreground">
              Welcome to <span className="text-gradient-hero">UnCrave</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-md">
              Your 10-day journey to freedom starts here. No willpower needed — just follow along.
            </p>
            <div className="space-y-4 text-left bg-card p-6 rounded-2xl shadow-card mb-8 max-w-md w-full">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Heart className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Science-Based Approach</h3>
                  <p className="text-sm text-muted-foreground">Using proven psychology techniques to remove the desire to smoke.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <Target className="w-4 h-4 text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Keep Smoking (For Now)</h3>
                  <p className="text-sm text-muted-foreground">You'll continue smoking until Day 6 while we prepare your mind.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-success/10 flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-4 h-4 text-success" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">95% Success Rate</h3>
                  <p className="text-sm text-muted-foreground">Those who complete all 10 days stay smoke-free long term.</p>
                </div>
              </div>
            </div>
            <Button variant="hero" size="xl" onClick={() => setStep('name')} className="w-full max-w-md">
              Begin Your Journey <ArrowRight className="ml-2" />
            </Button>
          </div>
        );

      case 'name':
        return (
          <div className="flex flex-col items-center text-center animate-slide-up">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
              <span className="text-3xl">👋</span>
            </div>
            <h2 className="text-3xl font-bold font-display mb-3">What's your name?</h2>
            <p className="text-muted-foreground mb-8 max-w-md">
              Let's make this personal. We'll use your name throughout the journey.
            </p>
            <Input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="max-w-md text-center text-lg h-14 rounded-xl mb-8"
            />
          </div>
        );

      case 'habits':
        return (
          <div className="flex flex-col items-center text-center animate-slide-up">
            <div className="w-16 h-16 rounded-full bg-coral/10 flex items-center justify-center mb-6">
              <span className="text-3xl">🚬</span>
            </div>
            <h2 className="text-3xl font-bold font-display mb-3">About your smoking</h2>
            <p className="text-muted-foreground mb-8 max-w-md">
              This helps us personalize your experience and track your progress.
            </p>
            <div className="space-y-4 max-w-md w-full">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2 text-left">
                  Cigarettes per day
                </label>
                <Input
                  type="number"
                  placeholder="e.g., 20"
                  value={cigarettesPerDay}
                  onChange={(e) => setCigarettesPerDay(e.target.value)}
                  className="h-12 rounded-xl"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2 text-left">
                  Years of smoking
                </label>
                <Input
                  type="number"
                  placeholder="e.g., 10"
                  value={yearsOfSmoking}
                  onChange={(e) => setYearsOfSmoking(e.target.value)}
                  className="h-12 rounded-xl"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2 text-left">
                  Price per pack ($)
                </label>
                <Input
                  type="number"
                  placeholder="e.g., 12"
                  value={pricePerPack}
                  onChange={(e) => setPricePerPack(e.target.value)}
                  className="h-12 rounded-xl"
                />
              </div>
            </div>
          </div>
        );

      case 'triggers':
        return (
          <div className="flex flex-col items-center text-center animate-slide-up">
            <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mb-6">
              <span className="text-3xl">⚡</span>
            </div>
            <h2 className="text-3xl font-bold font-display mb-3">What triggers you?</h2>
            <p className="text-muted-foreground mb-8 max-w-md">
              Select the situations when you usually reach for a cigarette.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-w-lg w-full">
              {commonTriggers.map((trigger) => (
                <button
                  key={trigger.id}
                  onClick={() => toggleTrigger(trigger.id)}
                  className={`p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                    selectedTriggers.includes(trigger.id)
                      ? 'border-primary bg-primary/10 shadow-sm'
                      : 'border-border bg-card hover:border-primary/50'
                  }`}
                >
                  <span className="text-xl mb-1 block">{trigger.emoji}</span>
                  <span className="text-sm font-medium">{trigger.label}</span>
                  {selectedTriggers.includes(trigger.id) && (
                    <Check className="w-4 h-4 text-primary absolute top-2 right-2" />
                  )}
                </button>
              ))}
            </div>
          </div>
        );

      case 'reasons':
        return (
          <div className="flex flex-col items-center text-center animate-slide-up">
            <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mb-6">
              <span className="text-3xl">💚</span>
            </div>
            <h2 className="text-3xl font-bold font-display mb-3">Why do you want to quit?</h2>
            <p className="text-muted-foreground mb-8 max-w-md">
              Your personal reasons will motivate you throughout this journey.
            </p>
            <div className="space-y-4 max-w-md w-full">
              {reasons.map((reason, index) => (
                <div key={index} className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold">
                    {index + 1}.
                  </span>
                  <Input
                    type="text"
                    placeholder={
                      index === 0 ? "e.g., For my children" :
                      index === 1 ? "e.g., To improve my health" :
                      "e.g., To save money"
                    }
                    value={reason}
                    onChange={(e) => updateReason(index, e.target.value)}
                    className="h-12 rounded-xl pl-10"
                  />
                </div>
              ))}
            </div>
          </div>
        );

      case 'ready':
        return (
          <div className="flex flex-col items-center text-center animate-fade-in">
            <div className="w-24 h-24 rounded-full gradient-success flex items-center justify-center mb-8 animate-breathe shadow-glow">
              <Check className="w-12 h-12 text-success-foreground" />
            </div>
            <h2 className="text-3xl font-bold font-display mb-3">
              You're all set, {name}!
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-md">
              Your personalized 10-day quit program is ready. Remember: you can keep smoking for now — we'll prepare your mind first.
            </p>
            <div className="bg-card p-6 rounded-2xl shadow-card mb-8 max-w-md w-full text-left">
              <h3 className="font-semibold mb-4 text-center">Your Profile</h3>
              <div className="space-y-2 text-sm">
                <p><span className="text-muted-foreground">Cigarettes/day:</span> <span className="font-semibold">{cigarettesPerDay}</span></p>
                <p><span className="text-muted-foreground">Years smoking:</span> <span className="font-semibold">{yearsOfSmoking}</span></p>
                <p><span className="text-muted-foreground">Top triggers:</span> <span className="font-semibold">{selectedTriggers.slice(0, 3).map(id => commonTriggers.find(t => t.id === id)?.label).join(', ')}</span></p>
              </div>
            </div>
            <Button variant="hero" size="xl" onClick={handleComplete} className="w-full max-w-md">
              Start Day 1 <Sparkles className="ml-2" />
            </Button>
          </div>
        );
    }
  };

  const steps: OnboardingStep[] = ['welcome', 'name', 'habits', 'triggers', 'reasons', 'ready'];
  const currentIndex = steps.indexOf(step);

  return (
    <div className="min-h-screen gradient-dawn flex flex-col">
      {/* Progress bar */}
      {step !== 'welcome' && (
        <div className="p-4">
          <div className="flex items-center justify-between max-w-md mx-auto mb-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setStep(steps[currentIndex - 1])}
              className="text-muted-foreground"
            >
              <ArrowLeft className="w-4 h-4 mr-1" /> Back
            </Button>
            <span className="text-sm text-muted-foreground">
              Step {currentIndex} of {steps.length - 1}
            </span>
          </div>
          <div className="h-2 bg-muted rounded-full max-w-md mx-auto overflow-hidden">
            <div 
              className="h-full gradient-hero transition-all duration-500 rounded-full"
              style={{ width: `${(currentIndex / (steps.length - 1)) * 100}%` }}
            />
          </div>
        </div>
      )}

      {/* Content */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-2xl">
          {renderStep()}
        </div>
      </div>

      {/* Navigation */}
      {step !== 'welcome' && step !== 'ready' && (
        <div className="p-6">
          <Button 
            variant="hero" 
            size="lg" 
            onClick={() => setStep(steps[currentIndex + 1])}
            disabled={!canProceed()}
            className="w-full max-w-md mx-auto block"
          >
            Continue <ArrowRight className="ml-2" />
          </Button>
        </div>
      )}
    </div>
  );
}
