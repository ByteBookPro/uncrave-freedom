import { useCallback, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

export function useGeminiImage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generate = useCallback(
    async (prompt: string, opts?: { images?: string[]; model?: string }) => {
      setLoading(true);
      setError(null);
      try {
        const { data, error } = await supabase.functions.invoke('gemini-image', {
          body: { prompt, images: opts?.images, model: opts?.model },
        });
        if (error) throw error;
        if ((data as any)?.error) throw new Error((data as any).error);
        return data as { dataUrl: string; mimeType: string; base64: string };
      } catch (e) {
        const msg = e instanceof Error ? e.message : 'Image generation failed';
        setError(msg);
        throw e;
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  return { generate, loading, error };
}

export function useGeminiText() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generate = useCallback(
    async (prompt: string, opts?: { system?: string; model?: string; json?: boolean }) => {
      setLoading(true);
      setError(null);
      try {
        const { data, error } = await supabase.functions.invoke('gemini-text', {
          body: { prompt, ...opts },
        });
        if (error) throw error;
        if ((data as any)?.error) throw new Error((data as any).error);
        return (data as { text: string }).text;
      } catch (e) {
        const msg = e instanceof Error ? e.message : 'Text generation failed';
        setError(msg);
        throw e;
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  return { generate, loading, error };
}
