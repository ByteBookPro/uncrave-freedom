import { useState, useRef, useCallback, useEffect } from 'react';
import { useAudioCache } from '@/hooks/useAudioCache';
import { VoicePreset } from '@/hooks/useTextToSpeech';
import { ContentLanguage } from '@/types/database';

interface UseSlideNarrationOptions {
  language: ContentLanguage;
  gender: 'male' | 'female';
}

interface NarrationState {
  isLoading: boolean;
  isPlaying: boolean;
  progress: number;
  duration: number;
  isComplete: boolean;
}

export function useSlideNarration(options: UseSlideNarrationOptions) {
  const { language, gender } = options;
  const { fetchAndCacheAudio } = useAudioCache();
  
  const [state, setState] = useState<NarrationState>({
    isLoading: false,
    isPlaying: false,
    progress: 0,
    duration: 0,
    isComplete: false,
  });
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const onEndedCallbackRef = useRef<(() => void) | null>(null);
  const currentSlideIdRef = useRef<string | null>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);
  
  // Cleanup function
  const cleanup = useCallback(() => {
    // Clear progress tracking
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }
    
    // Abort any pending fetch
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    
    // Stop and clear audio element
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.onended = null;
      audioRef.current.onerror = null;
      audioRef.current.ontimeupdate = null;
      audioRef.current.onplay = null;
      audioRef.current.onpause = null;
      audioRef.current.onloadedmetadata = null;
      audioRef.current = null;
    }
    
    currentSlideIdRef.current = null;
  }, []);
  
  // Stop narration completely
  const stop = useCallback(() => {
    cleanup();
    setState({
      isLoading: false,
      isPlaying: false,
      progress: 0,
      duration: 0,
      isComplete: false,
    });
  }, [cleanup]);
  
  // Play narration for a slide
  const play = useCallback(async (
    slideId: string,
    text: string,
    voicePreset: VoicePreset,
    onEnded?: () => void
  ): Promise<void> => {
    // Don't restart if already playing the same slide
    if (currentSlideIdRef.current === slideId && audioRef.current && !audioRef.current.paused) {
      return;
    }
    
    // Clean up previous audio
    cleanup();
    
    // Store callback and slide ID
    onEndedCallbackRef.current = onEnded || null;
    currentSlideIdRef.current = slideId;
    
    // Early exit if no text
    if (!text || text.trim().length === 0) {
      setState(prev => ({ ...prev, isComplete: true }));
      onEnded?.();
      return;
    }
    
    // Create new abort controller
    const controller = new AbortController();
    abortControllerRef.current = controller;
    
    setState(prev => ({ ...prev, isLoading: true, isPlaying: false, progress: 0, isComplete: false }));
    
    try {
      const result = await fetchAndCacheAudio(text, {
        preset: voicePreset,
        gender,
        language,
      }, controller.signal);
      
      // Check if we were aborted during fetch
      if (controller.signal.aborted || currentSlideIdRef.current !== slideId) {
        return;
      }
      
      if (!result) {
        setState(prev => ({ ...prev, isLoading: false }));
        return;
      }
      
      // Create and configure audio element
      const audio = new Audio(result.url);
      audioRef.current = audio;
      
      audio.onloadedmetadata = () => {
        if (currentSlideIdRef.current !== slideId) return;
        setState(prev => ({ ...prev, duration: audio.duration }));
      };
      
      audio.onplay = () => {
        if (currentSlideIdRef.current !== slideId) return;
        setState(prev => ({ ...prev, isPlaying: true, isLoading: false }));
        
        // Start progress tracking
        progressIntervalRef.current = setInterval(() => {
          if (audioRef.current && !audioRef.current.paused) {
            const progress = (audioRef.current.currentTime / audioRef.current.duration) * 100;
            setState(prev => ({ ...prev, progress: Math.min(progress, 100) }));
          }
        }, 100);
      };
      
      audio.onpause = () => {
        if (currentSlideIdRef.current !== slideId) return;
        if (!audio.ended) {
          setState(prev => ({ ...prev, isPlaying: false }));
        }
      };
      
      audio.onended = () => {
        // Clear progress interval
        if (progressIntervalRef.current) {
          clearInterval(progressIntervalRef.current);
          progressIntervalRef.current = null;
        }
        
        setState(prev => ({ ...prev, isPlaying: false, progress: 100, isComplete: true }));
        
        // Only call callback if this is still the current slide
        if (currentSlideIdRef.current === slideId && onEndedCallbackRef.current) {
          // Small delay before calling onEnded to ensure state is settled
          setTimeout(() => {
            if (currentSlideIdRef.current === slideId) {
              onEndedCallbackRef.current?.();
            }
          }, 800);
        }
      };
      
      audio.onerror = (e) => {
        console.error('Audio playback error:', e);
        setState(prev => ({ ...prev, isLoading: false, isPlaying: false }));
      };
      
      // Start playback
      await audio.play();
      
    } catch (err) {
      if (err instanceof Error && err.name === 'AbortError') {
        console.log('Narration fetch aborted for slide:', slideId);
        return;
      }
      console.error('Narration error:', err);
      setState(prev => ({ ...prev, isLoading: false }));
    }
  }, [language, gender, fetchAndCacheAudio, cleanup]);
  
  // Pause current audio
  const pause = useCallback(() => {
    if (audioRef.current && !audioRef.current.paused) {
      audioRef.current.pause();
    }
  }, []);
  
  // Resume current audio
  const resume = useCallback(() => {
    if (audioRef.current && audioRef.current.paused) {
      audioRef.current.play();
    }
  }, []);
  
  // Cleanup on unmount
  useEffect(() => {
    return () => {
      cleanup();
    };
  }, [cleanup]);
  
  return {
    ...state,
    play,
    pause,
    resume,
    stop,
  };
}
