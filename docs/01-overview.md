# 1. Product Overview

## Mission
Help smokers quit in 10 days using a CBT/NLP-informed, voice-narrated, slide-based program. Zero typing, premium feel, multi-language.

## User journey

1. **Auth** — email/password (Supabase). Google OAuth available.
2. **Onboarding** — taps & sliders only: name, language, cigarettes/day, years smoking, triggers, reasons-to-quit. Stored in `profiles`.
3. **Today tab** — shows current day card. Tap → enters `DaySessionPlayer`.
4. **Day session** — sequence of *modules*; each module is a sequence of *slides*. Each slide auto-advances when its narration ends.
5. **Practice tab** — breathing coach, body scan, urge surfing, craving tool.
6. **Progress tab** — streak, completed days, lifetime stats (money/time saved).
7. **Support tab** — broadcasts from admin, coping plans.

## Gating rules
- Day N unlocks only after Day N-1 has reached **≥90% audio play time** and all interactive drills complete.
- Minimum 900s (15 min) viewing not enforced — actual audio duration governs.
- Progress is persisted server-side in `user_day_completions` + `user_progress`; localStorage is a cache only.

## Evidence base
See [`.lovable/program-evidence.md`](../.lovable/program-evidence.md). Core techniques:
- **CBT** — trigger chains, cognitive reframing
- **NLP** — identity reframing ("I am a non-smoker")
- **Mindfulness** — urge surfing (Bowen/Marlatt)
- **Behavioral substitution** — replace ritual with breath/movement

## 10-day curriculum (high level)

| Day | Theme |
|-----|-------|
| 1 | Why you smoke — trigger map |
| 2 | The nicotine lie — how addiction hijacks dopamine |
| 3 | Identifying your top 3 triggers |
| 4 | Building replacement rituals |
| 5 | **Quit Day Preparation** |
| 6 | **Freedom Day** — first 24h |
| 7 | Cravings as waves — surfing |
| 8 | Reframing identity |
| 9 | Social pressure & relapse prevention |
| 10 | Living smoke-free — long-term plan |
