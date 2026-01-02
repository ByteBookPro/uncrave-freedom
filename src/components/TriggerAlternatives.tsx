import React, { useState, useEffect } from 'react';
import { Check, ChevronRight, Sparkles, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

// Suggested alternatives for each trigger type
const SUGGESTED_ALTERNATIVES: Record<string, string[]> = {
  // Emotional
  stress: ['Take 5 deep breaths', 'Walk for 5 minutes', 'Listen to calming music', 'Do a quick stretch'],
  anxiety: ['Practice 4-7-8 breathing', 'Ground yourself (5 senses)', 'Call a supportive friend', 'Write in a journal'],
  boredom: ['Go for a walk', 'Read an article', 'Drink a glass of water', 'Do a 2-minute puzzle'],
  loneliness: ['Text or call someone', 'Go to a public space', 'Listen to a podcast', 'Pet an animal'],
  celebration: ['Treat yourself to a snack', 'Share the news with someone', 'Do a happy dance', 'Take a photo to remember'],
  frustration: ['Count to 10 slowly', 'Squeeze a stress ball', 'Take a cold drink', 'Step outside briefly'],
  
  // Routine
  morning: ['Shower first thing', 'Do 5 morning stretches', 'Have breakfast immediately', 'Check messages instead'],
  coffee: ['Hold cup with both hands', 'Drink tea instead', 'Have coffee in a different spot', 'Add a crossword while drinking'],
  after_meal: ['Brush teeth immediately', 'Take a short walk', 'Chew gum', 'Clear the table right away'],
  commute: ['Keep gum in the car', 'Listen to an engaging podcast', 'Sing along to music', 'Practice car-safe deep breaths'],
  work_break: ['Walk around the building', 'Get water or healthy snack', 'Do desk stretches', 'Chat with a non-smoking colleague'],
  evening: ['Have herbal tea', 'Read a book', 'Take a warm bath', 'Do evening stretches'],
  
  // Social
  social: ['Hold a drink in your smoking hand', 'Stay near non-smokers', 'Keep hands busy with phone', 'Step away when others smoke'],
  alcohol: ['Sip water between drinks', 'Choose non-smoking venues', 'Limit drinks (cravings intensify)', 'Leave early if tempted'],
  phone_call: ['Pace while talking', 'Hold something in your hand', 'Doodle on paper', 'Sit in a non-smoking spot'],
  seeing_others: ['Look away and breathe', 'Remind yourself of your "why"', 'Move to a different area', 'Text your quit buddy'],
};

// Default alternatives for custom triggers
const DEFAULT_ALTERNATIVES = [
  'Take 3 deep breaths',
  'Drink a glass of water',
  'Go for a short walk',
  'Distract yourself for 5 minutes',
];

// Get trigger label from ID
const TRIGGER_LABELS: Record<string, { label: string; emoji: string }> = {
  stress: { label: 'Stress', emoji: '😰' },
  anxiety: { label: 'Anxiety', emoji: '😟' },
  boredom: { label: 'Boredom', emoji: '😑' },
  loneliness: { label: 'Loneliness', emoji: '😔' },
  celebration: { label: 'Celebration', emoji: '🎉' },
  frustration: { label: 'Frustration', emoji: '😤' },
  morning: { label: 'Waking Up', emoji: '🌅' },
  coffee: { label: 'With Coffee', emoji: '☕' },
  after_meal: { label: 'After Meals', emoji: '🍽️' },
  commute: { label: 'Driving/Commute', emoji: '🚗' },
  work_break: { label: 'Work Breaks', emoji: '⏰' },
  evening: { label: 'Evening/Before Bed', emoji: '🌙' },
  social: { label: 'Social Events', emoji: '👥' },
  alcohol: { label: 'With Alcohol', emoji: '🍺' },
  phone_call: { label: 'Phone Calls', emoji: '📞' },
  seeing_others: { label: 'Seeing Others Smoke', emoji: '🚬' },
};

interface TriggerAlternativesProps {
  onComplete?: () => void;
  showSaveButton?: boolean;
  compact?: boolean;
}

export function TriggerAlternatives({ onComplete, showSaveButton = true, compact = false }: TriggerAlternativesProps) {
  const { user } = useAuth();
  const [triggers, setTriggers] = useState<string[]>([]);
  const [alternatives, setAlternatives] = useState<Record<string, string[]>>({});
  const [customInputs, setCustomInputs] = useState<Record<string, string>>({});
  const [currentTriggerIndex, setCurrentTriggerIndex] = useState(0);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Load saved triggers and alternatives on mount
  useEffect(() => {
    const loadData = async () => {
      if (!user) {
        setIsLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('profiles')
        .select('triggers, trigger_alternatives')
        .eq('id', user.id)
        .single();

      if (!error && data) {
        const savedTriggers = (data.triggers as string[]) || [];
        setTriggers(savedTriggers);
        
        // Parse saved alternatives
        const savedAlternatives = (data.trigger_alternatives as Record<string, string[]>) || {};
        setAlternatives(savedAlternatives);
      }
      setIsLoading(false);
    };

    loadData();
  }, [user]);

  const currentTrigger = triggers[currentTriggerIndex];
  
  const getTriggerDisplay = (triggerId: string) => {
    return TRIGGER_LABELS[triggerId] || { label: triggerId, emoji: '📌' };
  };

  const getSuggestions = (triggerId: string) => {
    return SUGGESTED_ALTERNATIVES[triggerId] || DEFAULT_ALTERNATIVES;
  };

  const toggleAlternative = (triggerId: string, alternative: string) => {
    setAlternatives(prev => {
      const current = prev[triggerId] || [];
      if (current.includes(alternative)) {
        return { ...prev, [triggerId]: current.filter(a => a !== alternative) };
      } else {
        return { ...prev, [triggerId]: [...current, alternative] };
      }
    });
  };

  const addCustomAlternative = (triggerId: string) => {
    const custom = customInputs[triggerId]?.trim();
    if (!custom) return;
    
    setAlternatives(prev => {
      const current = prev[triggerId] || [];
      if (!current.includes(custom)) {
        return { ...prev, [triggerId]: [...current, custom] };
      }
      return prev;
    });
    setCustomInputs(prev => ({ ...prev, [triggerId]: '' }));
  };

  const handleNext = () => {
    if (currentTriggerIndex < triggers.length - 1) {
      setCurrentTriggerIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentTriggerIndex > 0) {
      setCurrentTriggerIndex(prev => prev - 1);
    }
  };

  const handleSave = async () => {
    if (!user) {
      toast.error('Please sign in to save your strategies');
      return;
    }

    setIsSaving(true);

    const { error } = await supabase
      .from('profiles')
      .update({ trigger_alternatives: alternatives })
      .eq('id', user.id);

    setIsSaving(false);

    if (error) {
      toast.error('Failed to save coping strategies');
    } else {
      toast.success('Your coping strategies have been saved!');
      onComplete?.();
    }
  };

  if (isLoading) {
    return (
      <Card className={compact ? 'border-0 shadow-none' : ''}>
        <CardContent className="py-8 text-center text-muted-foreground">
          Loading your triggers...
        </CardContent>
      </Card>
    );
  }

  if (triggers.length === 0) {
    return (
      <Card className={compact ? 'border-0 shadow-none' : ''}>
        <CardContent className="py-8 text-center">
          <Lightbulb className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <p className="text-muted-foreground mb-2">No triggers identified yet.</p>
          <p className="text-sm text-muted-foreground">
            Complete the trigger identification exercise first to set up your coping strategies.
          </p>
        </CardContent>
      </Card>
    );
  }

  const triggerDisplay = getTriggerDisplay(currentTrigger);
  const suggestions = getSuggestions(currentTrigger);
  const selectedForTrigger = alternatives[currentTrigger] || [];

  return (
    <Card className={compact ? 'border-0 shadow-none bg-transparent' : ''}>
      {!compact && (
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            Build Your Coping Strategies
          </CardTitle>
          <CardDescription>
            For each trigger, choose alternatives you'll do instead of smoking.
          </CardDescription>
        </CardHeader>
      )}
      
      <CardContent className={compact ? 'p-0' : ''}>
        {/* Progress indicator */}
        <div className="flex items-center justify-between mb-6">
          <span className="text-sm text-muted-foreground">
            Trigger {currentTriggerIndex + 1} of {triggers.length}
          </span>
          <div className="flex gap-1">
            {triggers.map((_, idx) => (
              <div
                key={idx}
                className={`h-2 w-8 rounded-full transition-colors ${
                  idx === currentTriggerIndex
                    ? 'bg-primary'
                    : idx < currentTriggerIndex
                    ? 'bg-primary/40'
                    : 'bg-muted'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Current trigger */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-2">
            <span className="text-2xl">{triggerDisplay.emoji}</span>
            <span className="font-semibold text-lg">{triggerDisplay.label}</span>
          </div>
          <p className="text-sm text-muted-foreground">
            When you feel this trigger, what will you do instead?
          </p>
        </div>

        {/* Suggested alternatives */}
        <div className="space-y-2 mb-4">
          <p className="text-sm font-medium text-muted-foreground">Suggested alternatives:</p>
          <div className="grid gap-2">
            {suggestions.map(suggestion => (
              <button
                key={suggestion}
                onClick={() => toggleAlternative(currentTrigger, suggestion)}
                className={`
                  flex items-center justify-between p-3 rounded-lg text-left text-sm
                  transition-all duration-200 border
                  ${selectedForTrigger.includes(suggestion)
                    ? 'bg-primary/10 border-primary text-foreground'
                    : 'bg-muted/30 border-border hover:bg-muted hover:border-muted-foreground/30'
                  }
                `}
              >
                <span>{suggestion}</span>
                {selectedForTrigger.includes(suggestion) && (
                  <Check className="h-4 w-4 text-primary flex-shrink-0" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Custom alternative input */}
        <div className="mb-6">
          <p className="text-sm font-medium text-muted-foreground mb-2">Or add your own:</p>
          <div className="flex gap-2">
            <Input
              placeholder="Your custom coping strategy..."
              value={customInputs[currentTrigger] || ''}
              onChange={(e) => setCustomInputs(prev => ({ ...prev, [currentTrigger]: e.target.value }))}
              onKeyDown={(e) => e.key === 'Enter' && addCustomAlternative(currentTrigger)}
            />
            <Button
              variant="outline"
              onClick={() => addCustomAlternative(currentTrigger)}
              disabled={!customInputs[currentTrigger]?.trim()}
            >
              Add
            </Button>
          </div>
        </div>

        {/* Show custom selections */}
        {selectedForTrigger.filter(a => !suggestions.includes(a)).length > 0 && (
          <div className="mb-6">
            <p className="text-sm font-medium text-muted-foreground mb-2">Your custom strategies:</p>
            <div className="flex flex-wrap gap-2">
              {selectedForTrigger.filter(a => !suggestions.includes(a)).map(custom => (
                <button
                  key={custom}
                  onClick={() => toggleAlternative(currentTrigger, custom)}
                  className="inline-flex items-center gap-1 px-3 py-1.5 bg-primary/10 border border-primary rounded-full text-sm"
                >
                  {custom}
                  <Check className="h-3 w-3" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between pt-4 border-t">
          <Button
            variant="outline"
            onClick={handlePrev}
            disabled={currentTriggerIndex === 0}
          >
            Previous
          </Button>
          
          <span className="text-sm text-muted-foreground">
            {selectedForTrigger.length} selected
          </span>
          
          {currentTriggerIndex < triggers.length - 1 ? (
            <Button onClick={handleNext}>
              Next
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          ) : showSaveButton ? (
            <Button onClick={handleSave} disabled={isSaving}>
              {isSaving ? 'Saving...' : 'Save All Strategies'}
            </Button>
          ) : (
            <Button onClick={onComplete}>
              Done
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
