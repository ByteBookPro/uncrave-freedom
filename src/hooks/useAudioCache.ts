import { useState, useRef, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { ContentLanguage } from '@/types/database';

interface CachedAudio {
  url: string;
  blob: Blob;
}

// In-memory cache for audio during session
const audioCache = new Map<string, CachedAudio>();

export function useAudioCache() {
  const [isLoading, setIsLoading] = useState(false);

  // Generate a cache key from text and settings
  const getCacheKey = useCallback((text: string, language: ContentLanguage, preset: string, gender: string): string => {
    // Create a hash-like key from the first 50 chars + language + preset + gender
    const textHash = text.substring(0, 100).replace(/\s+/g, '_').substring(0, 50);
    return `${language}_${preset}_${gender}_${textHash}`;
  }, []);

  // Check if audio is cached in memory
  const getCachedAudio = useCallback((key: string): CachedAudio | null => {
    return audioCache.get(key) || null;
  }, []);

  // Store audio in memory cache
  const cacheAudio = useCallback((key: string, blob: Blob): string => {
    const url = URL.createObjectURL(blob);
    audioCache.set(key, { url, blob });
    console.log(`Cached audio: ${key}`);
    return url;
  }, []);

  // Fetch audio from TTS API and cache it
  const fetchAndCacheAudio = useCallback(async (
    text: string,
    options: {
      preset?: string;
      gender?: string;
      language?: ContentLanguage;
    },
    signal?: AbortSignal
  ): Promise<{ url: string; blob: Blob } | null> => {
    const language = options.language || 'en';
    const preset = options.preset || 'dailyCoach';
    const gender = options.gender || 'female';
    
    const cacheKey = getCacheKey(text, language, preset, gender);
    
    // Check memory cache first
    const cached = getCachedAudio(cacheKey);
    if (cached) {
      console.log(`Using cached audio: ${cacheKey}`);
      return cached;
    }

    setIsLoading(true);
    
    try {
      console.log(`Fetching new audio: ${cacheKey}`);
      
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
          signal
        }
      );

      if (!response.ok) {
        throw new Error(`TTS API error: ${response.status}`);
      }

      const blob = await response.blob();
      const url = cacheAudio(cacheKey, blob);
      
      return { url, blob };
    } catch (err) {
      if (err instanceof Error && err.name === 'AbortError') {
        console.log('Audio fetch aborted');
        return null;
      }
      console.error('Audio fetch error:', err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [getCacheKey, getCachedAudio, cacheAudio]);

  // Prefetch all slide narrations for a module
  const prefetchModuleAudio = useCallback(async (
    narrations: Array<{ text: string; slideId: string }>,
    options: {
      preset?: string;
      gender?: string;
      language?: ContentLanguage;
    }
  ): Promise<Map<string, string>> => {
    const audioUrls = new Map<string, string>();
    
    console.log(`Prefetching ${narrations.length} audio clips...`);
    
    // Fetch all audio in parallel (with some concurrency limit)
    const batchSize = 3; // Fetch 3 at a time to avoid overwhelming the API
    
    for (let i = 0; i < narrations.length; i += batchSize) {
      const batch = narrations.slice(i, i + batchSize);
      
      await Promise.all(
        batch.map(async ({ text, slideId }) => {
          if (!text) return;
          
          try {
            const result = await fetchAndCacheAudio(text, options);
            if (result) {
              audioUrls.set(slideId, result.url);
            }
          } catch (err) {
            console.error(`Failed to prefetch audio for slide ${slideId}:`, err);
          }
        })
      );
    }
    
    console.log(`Prefetched ${audioUrls.size}/${narrations.length} audio clips`);
    return audioUrls;
  }, [fetchAndCacheAudio]);

  // Clear cache (call on unmount if needed)
  const clearCache = useCallback(() => {
    audioCache.forEach((cached) => {
      URL.revokeObjectURL(cached.url);
    });
    audioCache.clear();
  }, []);

  return {
    isLoading,
    getCacheKey,
    getCachedAudio,
    cacheAudio,
    fetchAndCacheAudio,
    prefetchModuleAudio,
    clearCache,
  };
}
