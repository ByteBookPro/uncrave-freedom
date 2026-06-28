# 3. Frontend

## Routing (`src/App.tsx`)
| Path | Component | Notes |
|------|-----------|-------|
| `/` | `Index` → `MainApp` | Tab shell, gated by auth + onboarding |
| `/auth` | `Auth` | Email + Google sign-in |
| `/admin` | `Admin` | Restricted by `user_roles.role = 'admin'` |
| `/settings` | `Settings` | Language, voice preview, account |
| `/settings/generation` | `GenerationStatus` | Live image/audio gen progress |
| `*` | `NotFound` | 404 |

## Contexts
- **`AuthContext`** — wraps Supabase auth: `user`, `isLoading`, `isAdmin`, `signIn`, `signOut`, `updateProfile`.
- **`AppContext`** — onboarding, current day, completed days, journal, cravings, view state. Hydrates from server; write-through to `profiles` & `user_day_completions`.

## Tab shell (`MainApp.tsx`)
Bottom-nav: **Today · Practice · Progress · Support**. Settings & Admin icons top-right. When `currentView === 'session'`, renders `DaySessionPlayer` full-screen.

## Session player (`src/components/session/`)
- **`DaySessionPlayer.tsx`** — orchestrates modules; prev/next; close to dashboard.
- **`AnimatedSlides.tsx`** — slide engine. Per-slide progress bar, 2s inter-slide pause, audio-driven advance, autoplay-unlock overlay.
- **`MediaPlayer.tsx`** — generic audio/video wrapper.

## Hooks
| Hook | Purpose |
|------|---------|
| `useSlideNarration` | Manifest-first audio fetch; falls back to live TTS edge fn |
| `useTextToSpeech` | Direct TTS call (settings preview) |
| `useAudioCache` | In-memory blob cache (URL.createObjectURL) |
| `useBackgroundMusic` | Optional ambient loop |
| `useCourseData` | Loads `daySessions` for active language |
| `useProgress` | Reads/writes `user_progress` |
| `useEventTracking` | Inserts into `events` table |
| `useGemini` | Optional Gemini image/text proxy |

## Design system
- Tailwind with semantic tokens in `src/index.css` (`--background`, `--primary`, `--accent`, etc.).
- Custom button variants: `hero`, `warmth`, `success`, `soft`, `coral`.
- Never hardcode color utilities; always semantic.
- Mobile-first; uses `safe-area-pb/pt` and `xs/sm/md` breakpoints.

## Localization (`src/i18n/translations.ts`)
Flat key→string map for UI chrome. Narration scripts live separately in `src/data/sessionNarrationLocalized.ts`.
