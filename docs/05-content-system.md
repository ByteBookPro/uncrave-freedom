# 5. Content System

## Source files
- **`src/data/sessionModules.ts`** — canonical day → module → slide tree (English text + image refs).
- **`src/data/sessionNarrationLocalized.ts`** — `{ [narrationKey]: { en, hi, zh, de } }`.
- **`src/data/sessionNarration.ts`** — legacy English-only narration (kept as fallback).
- **`src/data/programContent.ts`** — supporting copy (tips, affirmations).
- **`src/data/narrationManifest.json`** — `sha1("lang|text") → CDN URL` mapping.
- **`src/data/slideImageManifest.json`** — `slideId → CDN URL` mapping.

## Slide shape
```ts
interface Slide {
  id: string;
  text: string;                // English fallback
  narrationKey?: string;       // lookup into Localized map
  backgroundImage?: string;    // CDN URL (filled by generator)
  textPosition?: 'top' | 'center' | 'bottom';
  duration?: number;           // optional ceiling; default = audio length
}
```

## Module shape
```ts
interface Module {
  id: string;                  // e.g. "d1m2"
  title: string;
  slides: Slide[];
  practiceId?: string;         // optional gated drill
}
```

## Day shape
```ts
interface DaySession {
  dayNumber: number;
  title: string;
  subtitle?: string;
  modules: Module[];
}
```

## Language switching
Settings → Language updates `profiles.language`. Player calls `getLocalizedNarration(key, lang)`; if the localized variant is missing, falls back to English. Voice presets per language live in the TTS edge fn (`languageHint` map).

## Adding a new day
1. Append a `DaySession` to `daySessions` in `sessionModules.ts`.
2. For each slide with text, add a `narrationKey` and the 4 translations in `sessionNarrationLocalized.ts`.
3. Run `bun run scripts/generateNarrationAudio.ts` (resumable, hash-keyed).
4. Run `bun run scripts/generateSlideImages.ts`.
5. Commit updated `narrationManifest.json` + `slideImageManifest.json`.
