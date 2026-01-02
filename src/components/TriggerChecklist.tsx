import React, { useState, useEffect } from 'react';
import { Check, Plus, X, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

// Extended trigger options with display labels and categories
const TRIGGER_OPTIONS = [
  // Emotional triggers
  { id: 'stress', label: 'Stress', category: 'emotional', emoji: '😰' },
  { id: 'anxiety', label: 'Anxiety', category: 'emotional', emoji: '😟' },
  { id: 'boredom', label: 'Boredom', category: 'emotional', emoji: '😑' },
  { id: 'loneliness', label: 'Loneliness', category: 'emotional', emoji: '😔' },
  { id: 'celebration', label: 'Celebration', category: 'emotional', emoji: '🎉' },
  { id: 'frustration', label: 'Frustration', category: 'emotional', emoji: '😤' },
  
  // Routine triggers
  { id: 'morning', label: 'Waking Up', category: 'routine', emoji: '🌅' },
  { id: 'coffee', label: 'With Coffee', category: 'routine', emoji: '☕' },
  { id: 'after_meal', label: 'After Meals', category: 'routine', emoji: '🍽️' },
  { id: 'commute', label: 'Driving/Commute', category: 'routine', emoji: '🚗' },
  { id: 'work_break', label: 'Work Breaks', category: 'routine', emoji: '⏰' },
  { id: 'evening', label: 'Evening/Before Bed', category: 'routine', emoji: '🌙' },
  
  // Social triggers
  { id: 'social', label: 'Social Events', category: 'social', emoji: '👥' },
  { id: 'alcohol', label: 'With Alcohol', category: 'social', emoji: '🍺' },
  { id: 'phone_call', label: 'Phone Calls', category: 'social', emoji: '📞' },
  { id: 'seeing_others', label: 'Seeing Others Smoke', category: 'social', emoji: '🚬' },
] as const;

const CATEGORY_LABELS: Record<string, string> = {
  emotional: 'Emotional Triggers',
  routine: 'Routine Triggers',
  social: 'Social Triggers',
  custom: 'Your Custom Triggers',
};

interface TriggerChecklistProps {
  onComplete?: (triggers: string[]) => void;
  showSaveButton?: boolean;
  compact?: boolean;
}

export function TriggerChecklist({ onComplete, showSaveButton = true, compact = false }: TriggerChecklistProps) {
  const { user } = useAuth();
  const [selectedTriggers, setSelectedTriggers] = useState<string[]>([]);
  const [customTriggers, setCustomTriggers] = useState<string[]>([]);
  const [newCustomTrigger, setNewCustomTrigger] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Load saved triggers on mount
  useEffect(() => {
    const loadTriggers = async () => {
      if (!user) {
        setIsLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('profiles')
        .select('triggers')
        .eq('id', user.id)
        .single();

      if (!error && data?.triggers) {
        const saved = data.triggers as string[];
        const predefinedIds: string[] = TRIGGER_OPTIONS.map(t => t.id);
        setSelectedTriggers(saved.filter(t => predefinedIds.includes(t)));
        setCustomTriggers(saved.filter(t => !predefinedIds.includes(t)));
      }
      setIsLoading(false);
    };

    loadTriggers();
  }, [user]);

  const toggleTrigger = (triggerId: string) => {
    setSelectedTriggers(prev => 
      prev.includes(triggerId) 
        ? prev.filter(t => t !== triggerId)
        : [...prev, triggerId]
    );
  };

  const addCustomTrigger = () => {
    const trimmed = newCustomTrigger.trim();
    if (trimmed && !customTriggers.includes(trimmed)) {
      setCustomTriggers(prev => [...prev, trimmed]);
      setNewCustomTrigger('');
    }
  };

  const removeCustomTrigger = (trigger: string) => {
    setCustomTriggers(prev => prev.filter(t => t !== trigger));
  };

  const getAllTriggers = () => [...selectedTriggers, ...customTriggers];

  const handleSave = async () => {
    if (!user) {
      toast.error('Please sign in to save your triggers');
      return;
    }

    setIsSaving(true);
    const allTriggers = getAllTriggers();

    const { error } = await supabase
      .from('profiles')
      .update({ triggers: allTriggers })
      .eq('id', user.id);

    setIsSaving(false);

    if (error) {
      toast.error('Failed to save triggers');
    } else {
      toast.success('Your triggers have been saved!');
      onComplete?.(allTriggers);
    }
  };

  const groupedTriggers = TRIGGER_OPTIONS.reduce((acc, trigger) => {
    if (!acc[trigger.category]) acc[trigger.category] = [];
    acc[trigger.category].push(trigger);
    return acc;
  }, {} as Record<string, typeof TRIGGER_OPTIONS[number][]>);

  if (isLoading) {
    return (
      <Card className={compact ? 'border-0 shadow-none' : ''}>
        <CardContent className="py-8 text-center text-muted-foreground">
          Loading your triggers...
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={compact ? 'border-0 shadow-none bg-transparent' : ''}>
      {!compact && (
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            Identify Your Triggers
          </CardTitle>
          <CardDescription>
            Select all the situations that typically make you want to smoke. 
            This helps us personalize your quit strategies.
          </CardDescription>
        </CardHeader>
      )}
      
      <CardContent className={compact ? 'p-0' : ''}>
        <div className="space-y-6">
          {/* Predefined triggers by category */}
          {Object.entries(groupedTriggers).map(([category, triggers]) => (
            <div key={category}>
              <h4 className="text-sm font-medium text-muted-foreground mb-3">
                {CATEGORY_LABELS[category]}
              </h4>
              <div className="flex flex-wrap gap-2">
                {triggers.map(trigger => (
                  <button
                    key={trigger.id}
                    onClick={() => toggleTrigger(trigger.id)}
                    className={`
                      inline-flex items-center gap-1.5 px-3 py-2 rounded-full text-sm font-medium
                      transition-all duration-200 border
                      ${selectedTriggers.includes(trigger.id)
                        ? 'bg-primary text-primary-foreground border-primary shadow-sm'
                        : 'bg-muted/50 text-foreground border-border hover:bg-muted hover:border-muted-foreground/30'
                      }
                    `}
                  >
                    <span>{trigger.emoji}</span>
                    <span>{trigger.label}</span>
                    {selectedTriggers.includes(trigger.id) && (
                      <Check className="h-3.5 w-3.5 ml-0.5" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          ))}

          {/* Custom triggers */}
          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-3">
              {CATEGORY_LABELS.custom}
            </h4>
            
            {customTriggers.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-3">
                {customTriggers.map(trigger => (
                  <Badge 
                    key={trigger} 
                    variant="secondary"
                    className="pl-3 pr-1 py-1.5 gap-1"
                  >
                    {trigger}
                    <button
                      onClick={() => removeCustomTrigger(trigger)}
                      className="ml-1 p-0.5 rounded-full hover:bg-destructive/20 transition-colors"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
            
            <div className="flex gap-2">
              <Input
                placeholder="Add a custom trigger..."
                value={newCustomTrigger}
                onChange={(e) => setNewCustomTrigger(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && addCustomTrigger()}
                className="flex-1"
              />
              <Button 
                size="icon" 
                variant="outline"
                onClick={addCustomTrigger}
                disabled={!newCustomTrigger.trim()}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Summary and save */}
          {getAllTriggers().length > 0 && (
            <div className="pt-4 border-t">
              <p className="text-sm text-muted-foreground mb-3">
                You've identified <span className="font-semibold text-foreground">{getAllTriggers().length}</span> triggers. 
                Understanding these is the first step to breaking free.
              </p>
              
              {showSaveButton && (
                <Button 
                  onClick={handleSave} 
                  disabled={isSaving}
                  className="w-full"
                >
                  {isSaving ? 'Saving...' : 'Save My Triggers'}
                </Button>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
