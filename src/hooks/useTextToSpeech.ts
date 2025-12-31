import { useState, useRef, useCallback } from 'react';

export function useTextToSpeech() {
  const [isLoading, setIsLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioUrlRef = useRef<string | null>(null);

  const speak = useCallback(async (text: string, voiceId?: string) => {
    if (!text) return;

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

      console.log('Requesting TTS for:', text.substring(0, 50) + '...');

      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/text-to-speech`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({ text, voiceId }),
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
      console.log('Audio playback started');
    } catch (err) {
      console.error('TTS error:', err);
      setError(err instanceof Error ? err.message : 'Failed to generate speech');
    } finally {
      setIsLoading(false);
    }
  }, []);

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
