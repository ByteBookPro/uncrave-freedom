# 11. Roadmap & Known Issues

## In-flight
- **Image regen (350 slides)** — script ready; blocked on valid OpenAI key
  for the workspace. Resume by running `bun run scripts/generateSlideImages.ts`.
- **Audio regen (668 clips)** — same blocker, same resume path.

## Known issues
- iOS Safari: `AudioContext` occasionally stays suspended on first navigation
  back into a session. Workaround already shipped: "Tap to begin" overlay
  re-renders on every session entry.
- ElevenLabs path is dead (replaced by OpenAI TTS) but `ELEVENLABS_API_KEY`
  secrets remain configured. Safe to delete via Connectors UI.
- `narrationManifest.json` is large (~700 entries) — fine for now; if it
  exceeds ~5MB, move to a Supabase table and fetch by hash on demand.

## Future modules
- Day 11–30 "Maintenance" pack
- Partner/buddy mode (shared progress)
- Apple Watch breathing complication
- Wear OS tile for craving SOS
- Push notifications via Supabase + OneSignal
- A/B framework on `events` table for narration variants

## Tech debt
- `useTextToSpeech` and `useSlideNarration` overlap — merge into one hook.
- `AppContext` is large; split into `OnboardingContext` + `ProgressContext`.
- Add Playwright e2e for Day 1 happy path.
- Replace `sessionNarration.ts` (legacy) once all localized keys verified.
