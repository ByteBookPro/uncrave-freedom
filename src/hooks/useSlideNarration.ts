import { useState, useRef, useCallback, useEffect } from 'react';
import { ContentLanguage } from '@/types/database';
import { VoicePreset } from '@/hooks/useTextToSpeech';

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
  needsUserGesture: boolean;
}

// In-memory cache for audio during session
const audioCache = new Map<string, { url: string; blob: Blob }>();

// Generate a cache key from text and settings
function getCacheKey(text: string, language: ContentLanguage, preset: string, gender: string): string {
  const textHash = text.substring(0, 100).replace(/\s+/g, '_').substring(0, 50);
  return `${language}_${preset}_${gender}_${textHash}`;
}

export function useSlideNarration(options: UseSlideNarrationOptions) {
  const { language, gender } = options;
  
  const [state, setState] = useState<NarrationState>({
    isLoading: false,
    isPlaying: false,
    progress: 0,
    duration: 0,
    isComplete: false,
    needsUserGesture: false,
  });
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const onEndedCallbackRef = useRef<(() => void) | null>(null);
  const currentSlideIdRef = useRef<string | null>(null);
  const progressIntervalRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  
  // Cleanup audio element only (not abort controller)
  const cleanupAudioElement = useCallback(() => {
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }
    
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
  }, []);
  
  // Full cleanup including abort
  const fullCleanup = useCallback(() => {
    cleanupAudioElement();
    
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    
    currentSlideIdRef.current = null;
  }, [cleanupAudioElement]);
  
  // Stop narration completely
  const stop = useCallback(() => {
    fullCleanup();
    setState({
      isLoading: false,
      isPlaying: false,
      progress: 0,
      duration: 0,
      isComplete: false,
      needsUserGesture: false,
    });
  }, [fullCleanup]);
  
  // Play narration for a slide
  const play = useCallback(async (
    slideId: string,
    text: string,
    voicePreset: VoicePreset,
    onEnded?: () => void
  ): Promise<void> => {
    // Don't restart if already playing the same slide
    if (currentSlideIdRef.current === slideId && audioRef.current && !audioRef.current.paused) {
      console.log('Already playing slide:', slideId);
      return;
    }
    
    console.log('Playing narration for slide:', slideId);
    
    // Clean up previous audio element only (don't abort - let new request take over)
    cleanupAudioElement();
    
    // Abort previous fetch if any
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    
    // Store callback and slide ID
    onEndedCallbackRef.current = onEnded || null;
    currentSlideIdRef.current = slideId;
    
    // Early exit if no text
    if (!text || text.trim().length === 0) {
      console.log('No text for slide:', slideId);
      setState(prev => ({ ...prev, isComplete: true }));
      setTimeout(() => onEnded?.(), 500);
      return;
    }
    
    // Create new abort controller
    const controller = new AbortController();
    abortControllerRef.current = controller;
    
    setState(prev => ({ ...prev, isLoading: true, isPlaying: false, progress: 0, isComplete: false }));
    
    try {
      const preset = voicePreset || 'dailyCoach';
      const cacheKey = getCacheKey(text, language, preset, gender);
      
      // Check cache first
      const cached = audioCache.get(cacheKey);
      let audioUrl: string;
      
      if (cached) {
        console.log('Using cached audio:', cacheKey);
        audioUrl = cached.url;
      } else {
        console.log('Fetching audio:', cacheKey);
        
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
              preset,
              gender,
              language
            }),
            signal: controller.signal
          }
        );

        // Check if aborted during fetch
        if (controller.signal.aborted) {
          console.log('Fetch aborted for slide:', slideId);
          return;
        }
        
        // Check if still current slide
        if (currentSlideIdRef.current !== slideId) {
          console.log('Slide changed during fetch, ignoring:', slideId);
          return;
        }

        if (!response.ok) {
          throw new Error(`TTS API error: ${response.status}`);
        }

        const blob = await response.blob();
        audioUrl = URL.createObjectURL(blob);
        audioCache.set(cacheKey, { url: audioUrl, blob });
        console.log('Cached audio:', cacheKey);
      }
      
      // Final check before playing
      if (currentSlideIdRef.current !== slideId) {
        console.log('Slide changed before playback, ignoring:', slideId);
        return;
      }
      
      // Create and configure audio element
      const audio = new Audio(audioUrl);
      audioRef.current = audio;
      
      audio.onloadedmetadata = () => {
        if (currentSlideIdRef.current !== slideId) return;
        console.log('Audio loaded, duration:', audio.duration);
        setState(prev => ({ ...prev, duration: audio.duration }));
      };
      
      audio.onplay = () => {
        if (currentSlideIdRef.current !== slideId) return;
        console.log('Audio playing for slide:', slideId);
        setState(prev => ({ ...prev, isPlaying: true, isLoading: false }));
        
        // Start progress tracking
        progressIntervalRef.current = setInterval(() => {
          if (audioRef.current && !audioRef.current.paused && audioRef.current.duration > 0) {
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
        console.log('Audio ended for slide:', slideId);
        
        // Clear progress interval
        if (progressIntervalRef.current) {
          clearInterval(progressIntervalRef.current);
          progressIntervalRef.current = null;
        }
        
        setState(prev => ({ ...prev, isPlaying: false, progress: 100, isComplete: true }));
        
        // Only call callback if this is still the current slide
        if (currentSlideIdRef.current === slideId && onEndedCallbackRef.current) {
          console.log('Calling onEnded callback for slide:', slideId);
          // Small delay before advancing
          setTimeout(() => {
            if (currentSlideIdRef.current === slideId) {
              onEndedCallbackRef.current?.();
            }
          }, 800);
        }
      };
      
      audio.onerror = (e) => {
        console.error('Audio playback error for slide:', slideId, e);
        setState(prev => ({ ...prev, isLoading: false, isPlaying: false }));
      };
      
      // Start playback
      await audio.play();
      
    } catch (err) {
      if (err instanceof Error && err.name === 'AbortError') {
        console.log('Narration aborted for slide:', slideId);
        return;
      }
      console.error('Narration error for slide:', slideId, err);
      setState(prev => ({ ...prev, isLoading: false }));
    }
  }, [language, gender, cleanupAudioElement]);
  
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
  
  // Cleanup on unmount only
  useEffect(() => {
    return () => {
      fullCleanup();
    };
  }, []);
  
  return {
    ...state,
    play,
    pause,
    resume,
    stop,
  };
}
