# 6. Audio Engine

## Goals
- Zero perceptible latency for shipped content.
- Per-language voice presets that *feel* native (warmth, pacing, accent).
- Idempotent regeneration — never re-bill for unchanged text.

## Provider
**OpenAI `gpt-4o-mini-tts`** via the project's `OPENAI_API_KEY`.
Edge function: `supabase/functions/text-to-speech/index.ts`.

## Voices
| Gender | Default voice |
|--------|---------------|
| female | `nova` |
| male   | `onyx` |

User-selectable (Settings): `alloy`, `echo`, `fable`, `onyx`, `nova`, `shimmer`, `sage`, `ash`.

## Presets (steering via `instructions`)
- `dailyCoach` — warm trusted coach, speed 0.96
- `motivationLift` — quietly confident, 1.0
- `cravingEmergency` — meditation-soft, 0.88
- `story` — intimate storyteller, 0.97
- `guided` — breathwork guide, 0.87

Per-language `languageHint` lines (en/hi/zh/de) shape accent + tone. See edge fn for current strings.

## Text preprocessing
Pauses are inserted contextually before playback so the model breathes naturally:
- `...` normalized
- Hindi: pad after `। ! ?`
- Chinese: pad after `。！？`
- German: brief pause before "Jetzt/Dann/Aber"
- English: pause before "But here's what" etc.

## Runtime cache stack
1. **Manifest cache** (`narrationManifest.json`) — primary. URL → audio element.
2. **In-memory blob cache** (`useAudioCache`) — `URL.createObjectURL` per session.
3. **Live TTS** — only if neither has the clip (safety net).

## Hashing rule
```
key = sha1(`${lang}|${text}`)
```
Changing translation text yields a new hash → old audio remains cached, new one is generated. Old entries can be pruned manually by diffing manifest keys against active narration.

## Autoplay policy
Mobile/Safari blocks audio without a user gesture. The slide engine renders a **"Tap to begin"** overlay on first mount and resumes the `AudioContext` inside the click handler.
