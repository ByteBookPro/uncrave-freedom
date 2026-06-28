# Evidence-Based Cessation Program — Audit & Upgrade Plan

> Purpose: align the 10-day course narration with techniques that **clinical
> trials have shown to roughly double quit rates** vs. willpower alone, so the
> rewrite (next phase) targets the highest-impact swaps.

## What actually works (sources at end)

| Intervention | Evidence | Where it should live in the course |
|---|---|---|
| **Cognitive Behavioural Therapy (CBT)** — identify trigger → thought → urge → behaviour chain, then substitute | Cochrane: behavioural support increases quit rates ~50–60% | Days 2–4: trigger mapping, thought records, urge-surfing drills |
| **Motivational Interviewing (MI)** — *evoke* the user's own reasons rather than lecture | Lindson 2019 Cochrane: MI ↑ quit attempts vs. brief advice | Day 1 (already partly there) + every check-in: open Qs not statements |
| **Urge surfing / mindful acceptance** (Marlatt; Bowen RP-MBCT) | RCTs: ↓ relapse at 6 mo; especially strong in heavy smokers | Craving emergency module (use `cravingEmergency` preset) |
| **Implementation intentions** ("If trigger X, then I will Y") | Gollwitzer meta-analyses d=.65 for habit change | Day 3 trigger plans; convert wishes → if/then chips |
| **Cue exposure + delay rule** — wait 5 min, urge peaks then falls | Most cravings <5 min; teaching the curve reduces felt threat | Day 2–5 narration: explicitly teach the urge curve |
| **Self-efficacy reinforcement** (Bandura) | Predicts maintenance > 6 mo better than motivation | Daily reflection: small win recap before sleep |
| **Identity-based change** — "I'm a non-smoker" vs. "I'm trying to quit" (West PRIME) | Robert West: identity flip is the strongest single predictor | Day 6 (Freedom Day) reframe |
| **NRT / varenicline awareness** | Pharmacotherapy doubles cessation odds | Day 1 module: not pushed, but **acknowledged** as legitimate aid |
| **Social commitment** (telling someone, public pledge) | Lab + field: pre-commitment ↑ follow-through 30–40% | Day 1 pledge already in app — keep, surface more |
| **Lapse ≠ relapse reframe** | Marlatt Abstinence Violation Effect | Day 7–8 explicit script |

**Explicitly avoid** (low/no evidence): scare tactics (lung photos), shame
language, willpower framing, "you'll fail without our app." None of these
move quit rates and several *reduce* self-efficacy.

## Concrete narration upgrades to apply in phase 3

1. **Replace lecture lines with MI open questions.** Wherever the script
   currently asserts ("You smoke because of stress"), rewrite as
   ("What does smoking do for you right now that nothing else does?").
2. **Add the 4-step urge-surfing micro-script** (notice → name → breathe →
   ride the wave for 90s) into every craving-related slide. Use the
   `cravingEmergency` preset for these.
3. **Make every "tip" an if/then implementation intention.** E.g. not
   "drink water when you crave" but "If I notice the after-coffee urge, then
   I'll stand up and drink a full glass of water before sitting back down."
4. **Add an explicit identity reframe at Day 6** ("From today, when someone
   offers, I say 'I don't smoke' — not 'I'm trying to quit'.").
5. **Add a Day 7 lapse-recovery script** so the first slip doesn't end the
   journey — currently the course implies linear success.
6. **Mention NRT / patches/gum neutrally** on Day 1 ("These aren't cheating —
   they roughly double your odds. Talk to a pharmacist.") — increases
   credibility and removes a common shame point.

## Phase plan (so we don't burn credits twice)

- ✅ **Phase 1 — Images** (in progress now): `openai/gpt-image-2` regen of
  ~350 slides. Updates `slideImageManifest.json` incrementally.
- ✅ **Phase 2 — Voice picker** (shipped this turn): 6 OpenAI voices in
  Settings, live TTS for non-default selections, bundled CDN narration
  remains the default-voice fallback (zero re-render needed).
- ⏭ **Phase 3 — Content rewrite** (next, after you approve this audit):
  apply the 6 upgrades above to all 10 days × 4 languages, then regenerate
  the narration manifest. **Estimated cost: ~25–40 credits for narration
  re-render, no image re-render needed.**

## Sources (publicly available)

- Cochrane Reviews: Behavioural interventions for smoking cessation
  (Lancaster & Stead, updated 2017–2023).
- Lindson N, et al. *Motivational interviewing for smoking cessation*.
  Cochrane Database Syst Rev. 2019.
- West R, Brown J. *Theory of Addiction* (PRIME theory), 2nd ed. 2013.
- Marlatt GA, Donovan DM. *Relapse Prevention*, 2nd ed. Guilford, 2005.
- Bowen S, et al. *Mindfulness-Based Relapse Prevention for substance use
  disorders: a pilot efficacy trial*. Subst Abus 2009.
- Gollwitzer PM, Sheeran P. *Implementation intentions and goal achievement:
  a meta-analysis*. Adv Exp Soc Psychol 2006.
- US Clinical Practice Guideline: *Treating Tobacco Use and Dependence*
  (Fiore et al., 2008 update — still the standing reference).
- NICE Guideline NG209 (UK, 2021): *Tobacco: preventing uptake, promoting
  quitting and treating dependence*.
