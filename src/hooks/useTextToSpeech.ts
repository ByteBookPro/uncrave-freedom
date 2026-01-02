import { useState, useRef, useCallback } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { ContentLanguage } from '@/types/database';

// Voice presets for different content contexts
export type VoicePreset = 
  | 'dailyCoach'       // Default: warm, steady, supportive
  | 'motivationLift'   // End of modules, pledges, breakthroughs
  | 'cravingEmergency' // Urge surfing, craving moments - calm, grounding
  | 'story'            // Narrative content, explanations
  | 'guided';          // Breathing exercises, meditation

export type VoiceGender = 'female' | 'male';

export interface SpeakOptions {
  voiceId?: string;
  preset?: VoicePreset;
  gender?: VoiceGender;
  language?: ContentLanguage;
}

export function useTextToSpeech() {
  const { profile } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentText, setCurrentText] = useState<string>('');
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioUrlRef = useRef<string | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  // Get user's voice preference from profile
  const getUserVoiceGender = (): VoiceGender => {
    const voicePref = (profile as any)?.voice_preference;
    if (voicePref === 'energetic_male') return 'male';
    return 'female';
  };

  // Get user's language preference from profile
  const getUserLanguage = (): ContentLanguage => {
    return (profile as any)?.language || 'en';
  };

  const speak = useCallback(async (text: string, options?: SpeakOptions | string) => {
    if (!text) return;

    // Support both old signature (voiceId string) and new options object
    const opts: SpeakOptions = typeof options === 'string' 
      ? { voiceId: options } 
      : options || {};

    // Use user's preferences if not explicitly specified
    const gender = opts.gender || getUserVoiceGender();
    const language = opts.language || getUserLanguage();

    // Cancel any ongoing request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // Stop any currently playing audio immediately
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }

    // Clean up previous audio URL
    if (audioUrlRef.current) {
      URL.revokeObjectURL(audioUrlRef.current);
      audioUrlRef.current = null;
    }

    setIsLoading(true);
    setIsPlaying(false);
    setError(null);
    setCurrentText(text);

    // Create new abort controller for this request
    abortControllerRef.current = new AbortController();

    try {
      console.log('Requesting TTS:', {
        text: text.substring(0, 50) + '...',
        preset: opts.preset || 'dailyCoach',
        gender,
        language
      });

      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/text-to-speech`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({ 
            text, 
            voiceId: opts.voiceId,
            preset: opts.preset || 'dailyCoach',
            gender,
            language
          }),
          signal: abortControllerRef.current.signal
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Failed to generate audio' }));
        throw new Error(errorData.error || 'Failed to generate audio');
      }

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      audioUrlRef.current = audioUrl;

      const audio = new Audio(audioUrl);
      audioRef.current = audio;

      audio.onplay = () => setIsPlaying(true);
      audio.onpause = () => setIsPlaying(false);
      audio.onended = () => setIsPlaying(false);
      audio.onerror = () => {
        setError('Failed to play audio');
        setIsPlaying(false);
      };

      await audio.play();
    } catch (err) {
      // Ignore abort errors
      if (err instanceof Error && err.name === 'AbortError') {
        console.log('TTS request was cancelled');
        return;
      }
      console.error('TTS error:', err);
      setError(err instanceof Error ? err.message : 'Failed to generate speech');
    } finally {
      setIsLoading(false);
    }
  }, [profile]);

  const pause = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
  }, []);

  const resume = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  }, []);

  const stop = useCallback(() => {
    // Cancel any pending request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }
    
    // Clean up audio URL
    if (audioUrlRef.current) {
      URL.revokeObjectURL(audioUrlRef.current);
      audioUrlRef.current = null;
    }
    
    setIsPlaying(false);
    setIsLoading(false);
  }, []);

  const toggle = useCallback(() => {
    if (isPlaying) {
      pause();
    } else if (audioRef.current) {
      resume();
    }
  }, [isPlaying, pause, resume]);

  return {
    speak,
    pause,
    resume,
    stop,
    toggle,
    isLoading,
    isPlaying,
    error,
    currentText,
  };
}
