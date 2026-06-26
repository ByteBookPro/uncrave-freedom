// Pre-generated narration audio manifest.
// Maps a hash of (language|normalized text) → CDN URL of the MP3.
// Player checks this first; on a hit, plays the bundled clip instantly with zero TTS cost.
// On a miss, falls back to the live text-to-speech edge function.
import manifest from './narrationManifest.json';
import { ContentLanguage } from '@/types/database';

function normalize(text: string): string {
  return text.replace(/\s+/g, ' ').trim();
}

// Browser-side SHA-1 (sync via subtle crypto isn't sync — use a tiny FNV?).
// We use a precomputed-hash strategy: the generator script used Node's crypto SHA-1.
// In the browser we replicate with Web Crypto (async). Cache results.
const hashCache = new Map<string, string>();

export async function getNarrationUrl(
  language: ContentLanguage,
  text: string,
): Promise<string | null> {
  if (!text) return null;
  const key = `${language}|${normalize(text)}`;
  let hash = hashCache.get(key);
  if (!hash) {
    const buf = await crypto.subtle.digest('SHA-1', new TextEncoder().encode(key));
    hash = Array.from(new Uint8Array(buf))
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('')
      .slice(0, 16);
    hashCache.set(key, hash);
  }
  return (manifest as Record<string, string>)[hash] ?? null;
}
