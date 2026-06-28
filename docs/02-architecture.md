# 2. Architecture

```
┌─────────────────────────────────────────────────────────────┐
│  Browser (PWA-capable React SPA)                            │
│  ─ Vite + React 18 + TS + Tailwind + shadcn/ui              │
│  ─ React Router (BrowserRouter, SPA fallback)               │
│  ─ TanStack Query for server state                          │
│  ─ AuthContext + AppContext for session/onboarding          │
└────────────────┬────────────────────────────────────────────┘
                 │ HTTPS
                 ▼
┌─────────────────────────────────────────────────────────────┐
│  Supabase (Lovable Cloud)                                   │
│  ─ Postgres (RLS-enforced)                                  │
│  ─ Auth (email + Google OAuth)                              │
│  ─ Edge Functions (Deno):                                   │
│      • text-to-speech  → OpenAI gpt-4o-mini-tts             │
│      • openai-image    → OpenAI gpt-image-1                 │
│      • gemini-image    → Gemini (optional)                  │
│      • gemini-text     → Gemini (optional)                  │
└────────────────┬────────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────────────┐
│  External APIs                                              │
│  ─ OpenAI (TTS + image gen)                                 │
│  ─ Lovable AI Gateway (fallback / dev)                      │
│  ─ Lovable Assets CDN (immutable MP3 + PNG hosting)         │
└─────────────────────────────────────────────────────────────┘
```

## Data flow — narration playback

```
slide.narrationKey ──► useSlideNarration
                          │
                          ▼
                    narrationManifest.json
                       (hash → CDN URL)
                          │
                  ┌───────┴────────┐
              hit │                │ miss
                  ▼                ▼
            CDN MP3          edge fn TTS
            (instant)        (≈1.5s, cached blob)
```

## Data flow — onboarding & progress
- `AuthContext` exposes Supabase user.
- On auth-ready, `AppContext` hydrates from `profiles` + `user_day_completions`.
- `completeDay(n)` writes through to Supabase AND localStorage.
- localStorage = offline cache; server = source of truth.

## Key invariants
1. `LOVABLE_API_KEY` / `OPENAI_API_KEY` never reach the browser.
2. All `public.*` tables have `GRANT` + RLS policies.
3. Audio + image generation are idempotent (hash-keyed manifests).
