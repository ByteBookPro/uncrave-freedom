## Goal

Rebuild the 10-day program with premium-feel media (QuitSure-level polish) and evidence-grounded copy so every screen supports the quit outcome.

## Why the current audio sounds "treble / thin"

Current MP3s were generated with OpenAI `gpt-4o-mini-tts` at `speed: 0.87–0.96` and only voice `nova`/`onyx`. On mobile speakers that voice reads as thin/sibilant. QuitSure-style warmth needs:
- ElevenLabs `eleven_multilingual_v2` (not turbo) at `mp3_44100_128`
- `stability 0.55`, `similarity_boost 0.80`, `style 0.15`, `speaker_boost true`
- Per-language native voices (not one voice speaking 4 languages)
- Request-stitching for smooth prosody across long narrations

## Scope (approved)

1. **Full scientific rewrite** of all 10 days
2. **Regenerate all audio** (all 10 days × 4 languages) via ElevenLabs/MeshAPI at premium settings
3. **Regenerate all slide backgrounds** via MeshAPI images
4. **Add short AI video clips** (Seedance via MeshAPI) — 1 hero clip per day (10 total)
5. New voice picker in Settings that maps to per-language ElevenLabs voice IDs

## Phase plan (I will pause between phases for your approval)

### Phase 1 — Copy rewrite (this turn, no cost)
Rewrite `src/data/sessionModules.ts` narrations grounded in:
- **Nicotine pharmacology**: NIDA 2023, half-life 2h, receptor upregulation & 12-week downregulation
- **CBT-RP** (Marlatt & Gordon): trigger → craving → urge-surfing (≤3 min duration finding, Bowen 2014)
- **Motivational Interviewing** (Miller & Rollnick): change talk, ambivalence resolution
- **Behavioral timeline**: CDC/Surgeon General 2020 — 20min BP, 12h CO, 2wk circulation, 1yr CHD risk halved, 10yr lung cancer halved
- **Identity-based change** (Clear/Oettingen WOOP): "I am a non-smoker" vs "I'm quitting"
- **Craving neuroscience**: dopamine prediction error, Volkow 2011
Each slide gets a `citation` field surfaced as a small footnote.

### Phase 2 — Audio regeneration (~$15–25, ~45 min)
- Rewrite `supabase/functions/text-to-speech/index.ts` for `eleven_multilingual_v2` + per-language voice IDs
- New per-language voice map:
  - EN female: Sarah `EXAVITQu4vr4xnSDxMaL` / male: Daniel `onwK4e9ZLuTAKqWW03F9`
  - HI female: Monika Sogam / male: Niraj (ElevenLabs Hindi natives)
  - ZH female: Xiaoxiao / male: Yunxi
  - DE female: Julia / male: Stefan
- Update `scripts/generateNarrationAudio.ts` to route through MeshAPI ElevenLabs with request-stitching
- Regenerate all ~200 clips → upload to Lovable CDN → refresh `narrationManifest.json`

### Phase 3 — Slide images (~$8–12, ~30 min)
Regenerate all slide backgrounds via `openai/gpt-image-1-mini` (MeshAPI) with the existing cinematic style prompt, keyed to the new copy.

### Phase 4 — Video clips (~$5–10, ~20 min)
1 hero 5s 9:16 clip per day (10 total) via `videogen--generate_video`, shown at module start. Falls back gracefully to still image on slow connections.

### Phase 5 — Settings UX
Add per-language voice picker (Sarah/Daniel style) in Settings that persists to `profiles.voice_preference`.

## What I need from you now

Say **"Go phase 1"** and I'll rewrite all 10 days of copy (largest, no cost). Review the copy, then approve Phase 2 audio regen — that's where the "treble" goes away.

Total estimated cost across all phases: **~$30–50 of MeshAPI credits**. Total wall time: ~2 hours of my execution across separate turns.

## Technical details

- Copy lives in `src/data/sessionModules.ts` (`slides[].narration`) + `src/data/sessionNarrationLocalized.ts` (HI/ZH/DE module-level)
- Audio manifest: `src/data/narrationManifest.json` keyed by `sha1(lang|normalized_text).slice(0,16)`
- Image manifest: `src/data/slideImageManifest.json` keyed by `d{n}-{modId}-{slideId}` with content hash
- Video manifest: new `src/data/slideVideoManifest.json` keyed by `d{n}-hero`
- All regeneration is idempotent — reruns skip unchanged content
