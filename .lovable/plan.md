## Premium Overhaul Plan — UnCrave (QuitSure-grade)

I'll execute this in 4 sequential phases. Each phase is self-contained and shippable, so you can test as we go.

---

### Phase 1 — Voice engine migration (foundation)

**Why first:** Current ElevenLabs setup is hitting 429s, has abrupt cutoffs, and burns credits. Lovable AI TTS (`openai/gpt-4o-mini-tts`) streams natively, no rate-limit pain, supports `instructions` (tone/pacing steering) and `speed`.

- Rewrite `supabase/functions/text-to-speech/index.ts` to call Lovable AI Gateway `/v1/audio/speech`.
- Map our existing presets (COACH / GUIDED / STORY) onto:
  - `voice`: pick warm voices per language (alloy, sage, shimmer, etc.) — verified per language test.
  - `instructions`: natural-language pacing ("speak slowly and warmly, with reassuring pauses after every comma, like a meditation guide").
  - `speed`: 0.92–1.0 depending on preset.
- Return MP3 (`response_format: mp3`) — simpler caching than PCM, still high quality.
- Keep the same response shape so the frontend hook doesn't break.
- **Caching:** add a Supabase Storage bucket `narration-cache` keyed by `sha256(text+lang+preset+voice)`. Edge function checks storage first, generates only on miss, uploads, returns signed URL. Result: each narration generated once across all users.

### Phase 2 — Perfect sync engine

**Why:** Audio cuts off, slides drift, NotAllowedError on autoplay. Fix the player core.

- Rewrite `useSlideNarration.ts`:
  - Preload next slide's audio while current plays (double-buffer).
  - Use `audio.addEventListener('ended')` as the single source of truth for slide advance.
  - Strict slide-ID guard: ignore `ended` events from stale audio instances.
  - Handle `NotAllowedError` (autoplay block) by showing a "Tap to begin" gate on the first slide only.
- Rewrite `AnimatedSlides.tsx`:
  - Audio-first: text/image timing derives from `audio.duration`, never fixed timers.
  - 40/60 split: text card visible 0–40% of audio, image crossfades in at 40%.
  - Crossfade transitions (300ms opacity + subtle scale) instead of hard cuts.
  - Word-level highlighting synced to audio currentTime (karaoke-style, QuitSure signature).
  - 2s breath pause between narrations with a soft inhale/exhale visual.
- Progress bar already exists — keep, but make it smoother (rAF instead of setInterval).

### Phase 3 — Premium visual redesign

**Why:** Match QuitSure's calm cinematic feel. Currently feels like a generic app.

- New design tokens in `index.css`:
  - Deep night-sky palette (charcoal `#0E1116`, mist `#1A1F2A`, ember accent `#E8A87C`, sage `#7FB069`).
  - Gradient meshes for slide backgrounds (radial, multi-stop).
  - Typography: install `@fontsource/fraunces` (display, narration headlines) + `@fontsource/inter` (body). Fraunces gives the QuitSure-style editorial warmth.
- Slide chrome:
  - Glassmorphic narration card (backdrop-blur, subtle border, soft inner shadow).
  - Cinematic letterboxing on image slides (object-cover with vignette overlay).
  - Floating progress dots → thin gradient line at top.
  - Replace play/pause icons with custom larger touch targets.
- Micro-motion: `fade-in` + `scale-in` on every slide entry, breath-rhythm pulse on the pause indicator.
- Use `design--create_directions` for the slide player itself so you pick the exact look — no guessing.

### Phase 4 — Research-driven content rewrite

**Why:** QuitSure's secret sauce is CBT + cognitive reframing (Allen Carr method) + identity-based habit change (James Clear). Our current scripts are too generic.

- Deep research pass via subagent: QuitSure methodology, Allen Carr "Easyway", James Clear identity habits, Stanford SmokeFreeTXT CBT prompts, Mayo Clinic urge-surfing.
- Rewrite Day 1–10 narration around a clear arc:
  - **Day 1–2:** Cognitive reframing — "you don't quit smoking, you escape a trap" (Carr's central insight).
  - **Day 3–4:** Identity shift — "I am a non-smoker" (Clear).
  - **Day 5–6:** Urge surfing + 4-minute rule (CBT).
  - **Day 7:** Quit Day with implementation intentions ("if X then Y").
  - **Day 8–10:** Relapse prevention, freedom anchoring, future-self visualization.
- Each slide gets:
  - One core insight (not three).
  - A sensory metaphor.
  - A 1-sentence call-to-action.
- Apply to all 4 languages (EN/HI/ZH/DE) — culturally adapted, not literal translations.

---

### Technical notes

- Lovable AI TTS is billed per request; storage caching makes the 2nd+ play free.
- Switching off ElevenLabs means we keep the connector but stop calling it (zero ongoing cost).
- No DB schema changes needed except adding the storage bucket.
- Existing onboarding/profile data integration stays intact.

---

### Order of execution

I'll ship Phase 1 + 2 in the first pass (voice migration + sync engine) — that fixes the broken core. Then we pause so you can test. If sync feels right, I move to Phase 3 (visual) and Phase 4 (content).

Approve and I'll start Phase 1+2 now.