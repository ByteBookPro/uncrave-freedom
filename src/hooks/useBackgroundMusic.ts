import { useState, useRef, useCallback, useEffect } from 'react';

// Ambient background music URLs (royalty-free)
const AMBIENT_TRACKS = {
  calm: 'https://cdn.pixabay.com/audio/2022/02/07/audio_5f95e03a4f.mp3', // Calm ambient
  meditation: 'https://cdn.pixabay.com/audio/2022/03/13/audio_75ab7bc679.mp3', // Meditation
  uplifting: 'https://cdn.pixabay.com/audio/2024/01/21/audio_28b0ec5ea2.mp3', // Uplifting ambient
};

export type MusicTrack = keyof typeof AMBIENT_TRACKS;

interface UseBackgroundMusicOptions {
  volume?: number; // 0-1, default 0.15 (very quiet)
  fadeInDuration?: number; // ms
  fadeOutDuration?: number; // ms
}

export function useBackgroundMusic(options: UseBackgroundMusicOptions = {}) {
  const { 
    volume: initialVolume = 0.15, 
    fadeInDuration = 2000,
    fadeOutDuration = 1500 
  } = options;
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<MusicTrack>('calm');
  const [volume, setVolume] = useState(initialVolume);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      if (fadeIntervalRef.current) {
        clearInterval(fadeIntervalRef.current);
      }
    };
  }, []);

  // Fade volume smoothly
  const fadeVolume = useCallback((targetVolume: number, duration: number): Promise<void> => {
    return new Promise((resolve) => {
      if (!audioRef.current) {
        resolve();
        return;
      }

      const startVolume = audioRef.current.volume;
      const volumeDiff = targetVolume - startVolume;
      const steps = 20;
      const stepDuration = duration / steps;
      const volumeStep = volumeDiff / steps;
      let currentStep = 0;

      if (fadeIntervalRef.current) {
        clearInterval(fadeIntervalRef.current);
      }

      fadeIntervalRef.current = setInterval(() => {
        currentStep++;
        if (audioRef.current) {
          audioRef.current.volume = Math.max(0, Math.min(1, startVolume + (volumeStep * currentStep)));
        }
        
        if (currentStep >= steps) {
          if (fadeIntervalRef.current) {
            clearInterval(fadeIntervalRef.current);
          }
          resolve();
        }
      }, stepDuration);
    });
  }, []);

  const play = useCallback(async (track?: MusicTrack) => {
    const selectedTrack = track || currentTrack;
    
    // If already playing the same track, just resume
    if (audioRef.current && currentTrack === selectedTrack && audioRef.current.paused) {
      await fadeVolume(0, 0);
      audioRef.current.play();
      await fadeVolume(volume, fadeInDuration);
      setIsPlaying(true);
      return;
    }

    // Stop current if different track
    if (audioRef.current) {
      await fadeVolume(0, fadeOutDuration);
      audioRef.current.pause();
    }

    // Create new audio element
    const audio = new Audio(AMBIENT_TRACKS[selectedTrack]);
    audio.loop = true;
    audio.volume = 0;
    audioRef.current = audio;
    setCurrentTrack(selectedTrack);

    try {
      await audio.play();
      await fadeVolume(volume, fadeInDuration);
      setIsPlaying(true);
    } catch (err) {
      console.log('Background music autoplay blocked, will play on user interaction');
    }
  }, [currentTrack, volume, fadeInDuration, fadeOutDuration, fadeVolume]);

  const pause = useCallback(async () => {
    if (audioRef.current) {
      await fadeVolume(0, fadeOutDuration);
      audioRef.current.pause();
      setIsPlaying(false);
    }
  }, [fadeOutDuration, fadeVolume]);

  const stop = useCallback(async () => {
    if (audioRef.current) {
      await fadeVolume(0, fadeOutDuration);
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  }, [fadeOutDuration, fadeVolume]);

  const setMusicVolume = useCallback((newVolume: number) => {
    setVolume(newVolume);
    if (audioRef.current && isPlaying) {
      audioRef.current.volume = newVolume;
    }
  }, [isPlaying]);

  // Duck volume when narration is playing
  const duck = useCallback(async () => {
    if (audioRef.current && isPlaying) {
      await fadeVolume(volume * 0.3, 500); // Duck to 30% of normal volume
    }
  }, [isPlaying, volume, fadeVolume]);

  const unduck = useCallback(async () => {
    if (audioRef.current && isPlaying) {
      await fadeVolume(volume, 500);
    }
  }, [isPlaying, volume, fadeVolume]);

  return {
    play,
    pause,
    stop,
    duck,
    unduck,
    isPlaying,
    currentTrack,
    volume,
    setVolume: setMusicVolume,
  };
}
