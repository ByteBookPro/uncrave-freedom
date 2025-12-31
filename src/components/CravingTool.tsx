import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useApp } from '@/contexts/AppContext';
import { 
  ArrowLeft, 
  Wind,
  Droplets,
  Brain,
  Timer,
  MessageCircle,
  Check,
  Heart,
  Sparkles
} from 'lucide-react';

type CravingStep = 'intensity' | 'technique' | 'breathing' | 'distract' | 'affirmation' | 'complete';

const distractions = [
  { id: 'd1', text: 'Take a short walk', emoji: '🚶' },
  { id: 'd2', text: 'Drink a glass of water', emoji: '💧' },
  { id: 'd3', text: 'Chew gum or eat a mint', emoji: '🍬' },
  { id: 'd4', text: 'Call or text a friend', emoji: '📱' },
  { id: 'd5', text: 'Do 10 jumping jacks', emoji: '🏃' },
  { id: 'd6', text: 'Brush your teeth', emoji: '🪥' },
  { id: 'd7', text: 'Play a quick game', emoji: '🎮' },
  { id: 'd8', text: 'Listen to your favorite song', emoji: '🎵' },
];

const affirmations = [
  "I am stronger than any craving.",
  "This urge will pass in a few minutes.",
  "I don't smoke. I am a non-smoker.",
  "Every craving I overcome makes me stronger.",
  "I choose health and freedom over cigarettes.",
  "I am proud of how far I've come.",
];

export function CravingTool() {
  const { setCurrentView, addCravingLog } = useApp();
  const [step, setStep] = useState<CravingStep>('intensity');
  const [intensity, setIntensity] = useState<number>(3);
  const [breathCount, setBreathCount] = useState(0);
  const [isBreathing, setIsBreathing] = useState(false);
  const [breathPhase, setBreathPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');
  const [timer, setTimer] = useState(5);
  const [selectedAffirmation, setSelectedAffirmation] = useState('');

  // Breathing exercise
  useEffect(() => {
    if (!isBreathing) return;

    const phases = ['inhale', 'hold', 'exhale'] as const;
    let phaseIndex = 0;
    let countdown = 5;

    const interval = setInterval(() => {
      countdown--;
      setTimer(countdown);

      if (countdown === 0) {
        phaseIndex = (phaseIndex + 1) % 3;
        setBreathPhase(phases[phaseIndex]);
        countdown = 5;
        setTimer(5);

        if (phaseIndex === 0) {
          setBreathCount(prev => {
            if (prev + 1 >= 3) {
              setIsBreathing(false);
              setStep('distract');
              return 0;
            }
            return prev + 1;
          });
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isBreathing]);

  useEffect(() => {
    setSelectedAffirmation(affirmations[Math.floor(Math.random() * affirmations.length)]);
  }, []);

  const handleComplete = (overcame: boolean) => {
    addCravingLog({
      timestamp: new Date(),
      intensity: intensity as 1 | 2 | 3 | 4 | 5,
      overcame,
    });
    
    if (overcame) {
      setStep('complete');
    } else {
      setCurrentView('dashboard');
    }
  };

  const renderStep = () => {
    switch (step) {
      case 'intensity':
        return (
          <div className="text-center animate-fade-in">
            <div className="w-20 h-20 rounded-full bg-coral/20 flex items-center justify-center mx-auto mb-6">
              <Heart className="w-10 h-10 text-coral animate-pulse-soft" />
            </div>
            <h2 className="text-2xl font-bold font-display mb-3">How strong is this craving?</h2>
            <p className="text-muted-foreground mb-8">
              Rate your craving intensity from 1 (mild) to 5 (very strong)
            </p>
            
            <div className="flex justify-center gap-3 mb-8">
              {[1, 2, 3, 4, 5].map((level) => (
                <button
                  key={level}
                  onClick={() => setIntensity(level)}
                  className={`w-14 h-14 rounded-full text-xl font-bold transition-all ${
                    intensity === level
                      ? 'gradient-warmth text-primary-foreground scale-110 shadow-button'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>

            <div className="flex gap-2 text-sm text-muted-foreground mb-8 justify-center">
              <span>Mild</span>
              <span className="flex-1" />
              <span>Very Strong</span>
            </div>

            <Button variant="hero" size="xl" onClick={() => setStep('technique')} className="w-full">
              Get Help Now
            </Button>
          </div>
        );

      case 'technique':
        return (
          <div className="animate-fade-in">
            <h2 className="text-2xl font-bold font-display mb-3 text-center">
              Let's beat this craving
            </h2>
            <p className="text-muted-foreground mb-6 text-center">
              Remember: Cravings are like waves — they rise, peak, and fall within 3-5 minutes.
            </p>

            <div className="space-y-4">
              <button
                onClick={() => {
                  setIsBreathing(true);
                  setStep('breathing');
                }}
                className="w-full bg-card rounded-2xl p-5 shadow-soft flex items-center gap-4 hover:shadow-card transition-all text-left"
              >
                <div className="w-14 h-14 rounded-xl gradient-hero flex items-center justify-center">
                  <Wind className="w-7 h-7 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-bold">5-5-5 Breathing</h3>
                  <p className="text-sm text-muted-foreground">
                    Deep breathing to calm your nervous system
                  </p>
                </div>
              </button>

              <button
                onClick={() => setStep('distract')}
                className="w-full bg-card rounded-2xl p-5 shadow-soft flex items-center gap-4 hover:shadow-card transition-all text-left"
              >
                <div className="w-14 h-14 rounded-xl bg-accent/20 flex items-center justify-center">
                  <Brain className="w-7 h-7 text-accent" />
                </div>
                <div>
                  <h3 className="font-bold">Distraction Techniques</h3>
                  <p className="text-sm text-muted-foreground">
                    Redirect your attention away from the craving
                  </p>
                </div>
              </button>

              <button
                onClick={() => setStep('affirmation')}
                className="w-full bg-card rounded-2xl p-5 shadow-soft flex items-center gap-4 hover:shadow-card transition-all text-left"
              >
                <div className="w-14 h-14 rounded-xl bg-success/20 flex items-center justify-center">
                  <MessageCircle className="w-7 h-7 text-success" />
                </div>
                <div>
                  <h3 className="font-bold">Positive Affirmations</h3>
                  <p className="text-sm text-muted-foreground">
                    Remind yourself why you're doing this
                  </p>
                </div>
              </button>
            </div>
          </div>
        );

      case 'breathing':
        return (
          <div className="text-center animate-fade-in flex flex-col items-center justify-center min-h-[60vh]">
            <div className={`w-40 h-40 rounded-full flex items-center justify-center mb-8 transition-all duration-1000 ${
              breathPhase === 'inhale' 
                ? 'scale-125 gradient-hero shadow-glow' 
                : breathPhase === 'hold'
                ? 'scale-125 gradient-success shadow-glow'
                : 'scale-100 bg-freedom/30'
            }`}>
              <div className="text-center">
                <p className="text-3xl font-bold text-primary-foreground">{timer}</p>
                <p className="text-sm text-primary-foreground/80 uppercase tracking-wider">
                  {breathPhase === 'inhale' ? 'Breathe In' : breathPhase === 'hold' ? 'Hold' : 'Breathe Out'}
                </p>
              </div>
            </div>

            <p className="text-lg text-muted-foreground mb-4">
              Breath {breathCount + 1} of 3
            </p>

            <div className="flex gap-2">
              {[0, 1, 2].map((i) => (
                <div 
                  key={i}
                  className={`w-3 h-3 rounded-full transition-all ${
                    i <= breathCount ? 'gradient-hero' : 'bg-muted'
                  }`}
                />
              ))}
            </div>
          </div>
        );

      case 'distract':
        return (
          <div className="animate-fade-in">
            <h2 className="text-2xl font-bold font-display mb-3 text-center">
              Try one of these
            </h2>
            <p className="text-muted-foreground mb-6 text-center">
              Pick a distraction — your craving will pass in minutes.
            </p>

            <div className="grid grid-cols-2 gap-3 mb-8">
              {distractions.map((d) => (
                <div
                  key={d.id}
                  className="bg-card rounded-xl p-4 shadow-soft text-center hover:shadow-card transition-all cursor-pointer"
                >
                  <span className="text-3xl mb-2 block">{d.emoji}</span>
                  <p className="text-sm font-medium">{d.text}</p>
                </div>
              ))}
            </div>

            <Button 
              variant="hero" 
              size="lg" 
              onClick={() => handleComplete(true)}
              className="w-full"
            >
              <Check className="w-5 h-5 mr-2" />
              I Overcame the Craving!
            </Button>
          </div>
        );

      case 'affirmation':
        return (
          <div className="text-center animate-fade-in">
            <div className="w-20 h-20 rounded-full gradient-success flex items-center justify-center mx-auto mb-8">
              <Sparkles className="w-10 h-10 text-success-foreground" />
            </div>

            <p className="text-sm text-muted-foreground mb-4 uppercase tracking-wider">
              Say this out loud
            </p>

            <blockquote className="text-2xl font-bold font-display mb-8 text-foreground leading-relaxed">
              "{selectedAffirmation}"
            </blockquote>

            <div className="space-y-3">
              <Button 
                variant="hero" 
                size="lg" 
                onClick={() => handleComplete(true)}
                className="w-full"
              >
                <Check className="w-5 h-5 mr-2" />
                I Overcame the Craving!
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                onClick={() => setSelectedAffirmation(affirmations[Math.floor(Math.random() * affirmations.length)])}
                className="w-full"
              >
                Show Another Affirmation
              </Button>
            </div>
          </div>
        );

      case 'complete':
        return (
          <div className="text-center animate-scale-in flex flex-col items-center justify-center min-h-[60vh]">
            <div className="w-24 h-24 rounded-full gradient-success flex items-center justify-center mb-8 animate-breathe shadow-glow">
              <Check className="w-12 h-12 text-success-foreground" />
            </div>

            <h2 className="text-3xl font-bold font-display mb-3">
              Amazing! You did it! 🎉
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-md">
              You just proved that you're stronger than any craving. Each one you overcome makes the next one easier.
            </p>

            <div className="bg-success/10 rounded-2xl p-6 mb-8 max-w-md">
              <p className="text-success font-semibold">
                Remember: Cravings typically peak and pass within 3-5 minutes. You just surfed that wave!
              </p>
            </div>

            <Button variant="hero" size="xl" onClick={() => setCurrentView('dashboard')}>
              Back to Dashboard
            </Button>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen gradient-dawn">
      {/* Header */}
      <div className="bg-card border-b border-border p-4">
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setCurrentView('dashboard')}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-xl font-bold font-display">Craving Help</h1>
            <p className="text-sm text-muted-foreground">You've got this!</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {renderStep()}
      </div>
    </div>
  );
}
