import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Calendar, LogOut, Globe, Cigarette, Play, Square, Loader2, Zap, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { format } from 'date-fns';
import { TriggerChecklist } from '@/components/TriggerChecklist';
import { TriggerAlternatives } from '@/components/TriggerAlternatives';
type ContentLanguage = 'en' | 'de' | 'zh' | 'hi';
type VoiceGender = 'female' | 'male';

const sampleTexts: Record<ContentLanguage, string> = {
  en: "Hello! I'm your personal coach, here to guide you on your journey to a smoke-free life.",
  de: "Hallo! Ich bin dein persönlicher Coach und begleite dich auf deinem Weg in ein rauchfreies Leben.",
  zh: "你好！我是你的私人教练，将在你迈向无烟生活的旅程中为你提供指导。",
  hi: "नमस्ते! मैं आपका व्यक्तिगत कोच हूँ, धूम्रपान-मुक्त जीवन की आपकी यात्रा में आपका मार्गदर्शन करने के लिए यहाँ हूँ।"
};
type VoicePreference = 'calm_female' | 'energetic_male';

const languageLabels: Record<ContentLanguage, string> = {
  en: 'English',
  de: 'Deutsch',
  zh: '中文',
  hi: 'हिन्दी'
};

const voiceLabels: Record<VoicePreference, { name: string; description: string }> = {
  calm_female: { name: 'Calm Coach', description: 'Warm, soothing female voice' },
  energetic_male: { name: 'Energetic Coach', description: 'Motivating, upbeat male voice' }
};

export default function Settings() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, profile, signOut } = useAuth();
  
  const [displayName, setDisplayName] = useState('');
  const [language, setLanguage] = useState<ContentLanguage>('en');
  const [voicePreference, setVoicePreference] = useState<VoicePreference>('calm_female');
  const [cigarettesPerDay, setCigarettesPerDay] = useState<number | ''>('');
  const [yearsSmoking, setYearsSmoking] = useState<number | ''>('');
  const [isSaving, setIsSaving] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [previewingVoice, setPreviewingVoice] = useState<VoicePreference | null>(null);
  const [previewAudio, setPreviewAudio] = useState<HTMLAudioElement | null>(null);
  const [triggersOpen, setTriggersOpen] = useState(false);
  const [alternativesOpen, setAlternativesOpen] = useState(false);

  const stopPreview = useCallback(() => {
    if (previewAudio) {
      previewAudio.pause();
      previewAudio.src = '';
      setPreviewAudio(null);
    }
    setPreviewingVoice(null);
  }, [previewAudio]);

  const playVoicePreview = useCallback(async (voice: VoicePreference) => {
    // Stop any current preview
    stopPreview();
    
    setPreviewingVoice(voice);
    
    try {
      const gender: VoiceGender = voice === 'calm_female' ? 'female' : 'male';
      const sampleText = sampleTexts[language];
      
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/text-to-speech`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({
            text: sampleText,
            gender,
            language,
            preset: 'dailyCoach'
          }),
        }
      );

      if (!response.ok) throw new Error('TTS failed');

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);
      
      audio.onended = () => {
        URL.revokeObjectURL(audioUrl);
        setPreviewingVoice(null);
        setPreviewAudio(null);
      };
      
      audio.onerror = () => {
        URL.revokeObjectURL(audioUrl);
        setPreviewingVoice(null);
        setPreviewAudio(null);
        toast({
          title: 'Preview failed',
          description: 'Could not play voice preview.',
          variant: 'destructive',
        });
      };
      
      setPreviewAudio(audio);
      await audio.play();
    } catch (error) {
      console.error('Voice preview error:', error);
      setPreviewingVoice(null);
      toast({
        title: 'Preview failed',
        description: 'Could not generate voice preview.',
        variant: 'destructive',
      });
    }
  }, [language, stopPreview, toast]);

  useEffect(() => {
    if (profile) {
      setDisplayName(profile.display_name || '');
      setLanguage((profile.language as ContentLanguage) || 'en');
      setVoicePreference(((profile as any).voice_preference as VoicePreference) || 'calm_female');
      setCigarettesPerDay(profile.cigarettes_per_day || '');
      setYearsSmoking(profile.years_smoking || '');
    }
  }, [profile]);

  const handleSave = async () => {
    if (!user) return;
    
    setIsSaving(true);
    try {
      const updates = {
        display_name: displayName || null,
        language,
        voice_preference: voicePreference,
        cigarettes_per_day: cigarettesPerDay === '' ? null : cigarettesPerDay,
        years_smoking: yearsSmoking === '' ? null : yearsSmoking,
      };
      
      const { error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user.id);

      if (error) throw error;

      // Force a page reload to refresh the profile in AuthContext
      // This ensures the TTS hook gets the updated voice preference
      toast({
        title: 'Settings saved',
        description: 'Your profile has been updated successfully.',
      });
      
      // Small delay to show toast, then reload to refresh profile
      setTimeout(() => {
        window.location.reload();
      }, 500);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to save settings. Please try again.',
        variant: 'destructive',
      });
      setIsSaving(false);
    }
  };

  const handleSignOut = async () => {
    setIsSigningOut(true);
    try {
      await signOut();
      navigate('/auth');
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to sign out. Please try again.',
        variant: 'destructive',
      });
      setIsSigningOut(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-md mx-auto p-4 space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate('/')}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold">Settings</h1>
        </div>

        {/* Profile Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Profile
            </CardTitle>
            <CardDescription>
              Update your personal information
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                value={user?.email || ''}
                disabled
                className="bg-muted"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="displayName">Display Name</Label>
              <Input
                id="displayName"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="Enter your name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="language">Language</Label>
              <Select value={language} onValueChange={(val) => setLanguage(val as ContentLanguage)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(languageLabels).map(([code, label]) => (
                    <SelectItem key={code} value={code}>
                      <div className="flex items-center gap-2">
                        <Globe className="h-4 w-4" />
                        {label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label>Narrator Voice</Label>
              <div className="space-y-2">
                {Object.entries(voiceLabels).map(([code, { name, description }]) => {
                  const isSelected = voicePreference === code;
                  const isPreviewing = previewingVoice === code;
                  
                  return (
                    <div 
                      key={code}
                      className={`flex items-center justify-between p-3 rounded-lg border transition-colors cursor-pointer ${
                        isSelected 
                          ? 'border-primary bg-primary/5' 
                          : 'border-border hover:border-primary/50'
                      }`}
                      onClick={() => setVoicePreference(code as VoicePreference)}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                          isSelected ? 'border-primary' : 'border-muted-foreground'
                        }`}>
                          {isSelected && <div className="w-2 h-2 rounded-full bg-primary" />}
                        </div>
                        <div>
                          <p className="font-medium">{name}</p>
                          <p className="text-sm text-muted-foreground">{description}</p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-9 w-9"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (isPreviewing) {
                            stopPreview();
                          } else {
                            playVoicePreview(code as VoicePreference);
                          }
                        }}
                        disabled={previewingVoice !== null && !isPreviewing}
                      >
                        {isPreviewing ? (
                          previewAudio ? (
                            <Square className="h-4 w-4" />
                          ) : (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          )
                        ) : (
                          <Play className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  );
                })}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Smoking Profile Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Cigarette className="h-5 w-5" />
              Smoking Profile
            </CardTitle>
            <CardDescription>
              Your smoking history for personalized tracking
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="cigarettesPerDay">Cigarettes per day</Label>
              <Input
                id="cigarettesPerDay"
                type="number"
                min="0"
                value={cigarettesPerDay}
                onChange={(e) => setCigarettesPerDay(e.target.value === '' ? '' : parseInt(e.target.value))}
                placeholder="e.g. 20"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="yearsSmoking">Years smoking</Label>
              <Input
                id="yearsSmoking"
                type="number"
                min="0"
                value={yearsSmoking}
                onChange={(e) => setYearsSmoking(e.target.value === '' ? '' : parseInt(e.target.value))}
                placeholder="e.g. 10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Triggers & Coping Strategies Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5" />
              Triggers & Coping Strategies
            </CardTitle>
            <CardDescription>
              Review and update your personal triggers and coping strategies
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* My Triggers */}
            <Collapsible open={triggersOpen} onOpenChange={setTriggersOpen}>
              <CollapsibleTrigger asChild>
                <Button variant="outline" className="w-full justify-between">
                  <span>My Triggers</span>
                  {triggersOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="pt-4">
                <TriggerChecklist 
                  compact 
                  showSaveButton 
                  onComplete={() => setTriggersOpen(false)}
                />
              </CollapsibleContent>
            </Collapsible>

            {/* Coping Strategies */}
            <Collapsible open={alternativesOpen} onOpenChange={setAlternativesOpen}>
              <CollapsibleTrigger asChild>
                <Button variant="outline" className="w-full justify-between">
                  <span>My Coping Strategies</span>
                  {alternativesOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="pt-4">
                <TriggerAlternatives 
                  compact 
                  showSaveButton 
                  onComplete={() => setAlternativesOpen(false)}
                />
              </CollapsibleContent>
            </Collapsible>
          </CardContent>
        </Card>

        {/* Quit Date Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Quit Date
            </CardTitle>
            <CardDescription>
              Your smoke-free journey started
            </CardDescription>
          </CardHeader>
          <CardContent>
            {profile?.quit_date ? (
              <div className="text-center py-4">
                <p className="text-3xl font-bold text-primary">
                  {format(new Date(profile.quit_date), 'MMMM d, yyyy')}
                </p>
                <p className="text-muted-foreground mt-2">
                  {Math.floor((Date.now() - new Date(profile.quit_date).getTime()) / (1000 * 60 * 60 * 24))} days smoke-free
                </p>
              </div>
            ) : (
              <p className="text-muted-foreground text-center py-4">
                Complete the onboarding to set your quit date
              </p>
            )}
          </CardContent>
        </Card>

        {/* Save Button */}
        <Button 
          onClick={handleSave} 
          className="w-full" 
          disabled={isSaving}
        >
          {isSaving ? 'Saving...' : 'Save Changes'}
        </Button>

        <Separator />

        {/* Sign Out Section */}
        <Card className="border-destructive/20">
          <CardContent className="pt-6">
            <Button 
              variant="destructive" 
              className="w-full" 
              onClick={handleSignOut}
              disabled={isSigningOut}
            >
              <LogOut className="h-4 w-4 mr-2" />
              {isSigningOut ? 'Signing out...' : 'Sign Out'}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
