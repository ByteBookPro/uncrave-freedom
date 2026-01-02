import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Calendar, LogOut, Globe, Cigarette } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { format } from 'date-fns';

type ContentLanguage = 'en' | 'de' | 'zh' | 'hi';

const languageLabels: Record<ContentLanguage, string> = {
  en: 'English',
  de: 'Deutsch',
  zh: '中文',
  hi: 'हिन्दी'
};

export default function Settings() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, profile, signOut } = useAuth();
  
  const [displayName, setDisplayName] = useState('');
  const [language, setLanguage] = useState<ContentLanguage>('en');
  const [cigarettesPerDay, setCigarettesPerDay] = useState<number | ''>('');
  const [yearsSmoking, setYearsSmoking] = useState<number | ''>('');
  const [isSaving, setIsSaving] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);

  useEffect(() => {
    if (profile) {
      setDisplayName(profile.display_name || '');
      setLanguage((profile.language as ContentLanguage) || 'en');
      setCigarettesPerDay(profile.cigarettes_per_day || '');
      setYearsSmoking(profile.years_smoking || '');
    }
  }, [profile]);

  const handleSave = async () => {
    if (!user) return;
    
    setIsSaving(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          display_name: displayName || null,
          language,
          cigarettes_per_day: cigarettesPerDay === '' ? null : cigarettesPerDay,
          years_smoking: yearsSmoking === '' ? null : yearsSmoking,
        })
        .eq('id', user.id);

      if (error) throw error;

      toast({
        title: 'Settings saved',
        description: 'Your profile has been updated successfully.',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to save settings. Please try again.',
        variant: 'destructive',
      });
    } finally {
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
