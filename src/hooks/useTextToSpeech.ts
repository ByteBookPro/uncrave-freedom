import { useState, useRef, useCallback } from 'react';
import { useAuth } from '@/contexts/AuthContext';

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
}

export function useTextToSpeech() {
  const { profile } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioUrlRef = useRef<string | null>(null);

  // Get user's voice preference from profile - read directly from profile each time
  const getUserVoiceGender = (): VoiceGender => {
    const voicePref = (profile as any)?.voice_preference;
    console.log('Getting voice gender, profile voice_preference:', voicePref);
    if (voicePref === 'energetic_male') return 'male';
    return 'female'; // Default to calm_female
  };

  const speak = useCallback(async (text: string, options?: SpeakOptions | string) => {
    if (!text) return;

    // Support both old signature (voiceId string) and new options object
    const opts: SpeakOptions = typeof options === 'string' 
      ? { voiceId: options } 
      : options || {};

    // Use user's voice preference if not explicitly specified - get fresh value
    const gender = opts.gender || getUserVoiceGender();

    setIsLoading(true);
    setError(null);

    try {
      // Stop any currently playing audio
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }

      // Clean up previous audio URL
      if (audioUrlRef.current) {
        URL.revokeObjectURL(audioUrlRef.current);
        audioUrlRef.current = null;
      }

      console.log('Requesting TTS:', {
        text: text.substring(0, 50) + '...',
        preset: opts.preset || 'dailyCoach',
        gender,
        voicePreference: (profile as any)?.voice_preference || 'calm_female'
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
            gender
          }),
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
      console.log('Audio playback started with preset:', opts.preset || 'dailyCoach');
    } catch (err) {
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
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
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
  };
}
