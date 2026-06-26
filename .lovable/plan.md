# Plan

## Issue 1 — Progress/onboarding resets after closing browser

### Root cause
`AppContext` stores **everything** in `localStorage` only (`uncrave_user`, `uncrave_onboarded`, `completedDays`, `currentDay`, journal, cravings). Supabase auth persists fine, but when you open a fresh browser / clear site data / sign in on another device, localStorage is empty → app thinks you're a brand-new user and shows onboarding from Day 1. Server tables (`profiles`, `user_day_completions`, `user_progress`) already hold the real data — they just aren't being read on app load.

### Fix
1. On auth-ready (user present in `AuthContext`), hydrate `AppContext` from the server:
   - `profiles` → name, language, smoking stats, triggers, reasons, `current_day`, onboarding status (add `onboarded` column to `profiles` if not already there; otherwise infer from `current_day >= 1` + required fields filled).
   - `user_day_completions` → `completedDays` array.
2. Write-through: when `completeDay(n)` runs, also `upsert` into `user_day_completions` AND bump `profiles.current_day`.
3. When `setUser`/`updateProfile` runs, persist to `profiles` via existing `AuthContext.updateProfile`.
4. Keep `localStorage` as an offline cache, but server is the source of truth — hydration overwrites local on login.
5. Onboarding gate becomes: show onboarding only when `profile.current_day` is null/0 AND required onboarding fields are missing.

### Files touched
- `src/contexts/AppContext.tsx` — accept auth user, hydrate from Supabase, write-through.
- `src/components/Onboarding.tsx` — on completion, persist to `profiles` (not just local).
- Possible migration: add `onboarded boolean default false` to `profiles` if cleaner than inferring.

---

## Issue 2 — Real-time TTS wait between slides

### Decision on storage
You picked "bundle MP3s in app", but that would add ~80–150 MB to the bundle (10 days × ~6 modules × ~10 slides × 4 languages × ~80 KB each) — slow installs, slow updates, and any narration tweak needs a full rebuild. **Recommended swap: upload the same pre-generated MP3s to Lovable Assets CDN.** Functionally identical to bundling for the user (instant playback, zero runtime TTS, zero ElevenLabs/Lovable AI credits per play), but no bundle bloat and tweakable per-file. I'll proceed with CDN unless you'd rather take the bundle hit.

### Generation approach
1. One-time generation script (`scripts/generate-narration.ts`, run via `code--exec`) that:
   - Iterates every slide that has `narrationKey` across all modules.
   - For each language ∈ {en, hi, zh, de}, looks up the localized text.
   - Calls the existing `text-to-speech` edge function with the correct preset.
   - Saves MP3 to `/tmp/narration/{lang}/{narrationKey}.mp3`.
   - Uploads via `lovable-assets create` → writes a single manifest `src/data/narrationManifest.ts` mapping `{lang, key} → CDN url`.
2. Throttle (concurrency 2, 1s gap) so we don't hit gateway rate limits — script is resumable (skips files already in the manifest).

### Runtime change
- `useSlideNarration` first checks the manifest. If a URL exists → set `audio.src = url` directly (no fetch, no edge function, instant). Falls back to the live TTS edge function only for slides not yet in the manifest (safety net during rollout).
- Removes "Preparing audio…" wait entirely for shipped content.

### Files touched
- New: `scripts/generate-narration.ts`, `src/data/narrationManifest.ts`.
- `src/hooks/useSlideNarration.ts` — manifest-first lookup.
- Edge function `text-to-speech` — unchanged (kept as fallback).

---

## Execution order
1. Ship Issue 1 fix first (small, high-impact, unblocks testing).
2. Run narration generation script in the background (will take ~15–30 min and consume credits once).
3. Wire manifest-first playback, verify on Day 1.

## Open question
Confirm: **CDN-hosted audio** (recommended) or **literally bundle in app** (your original pick)?
