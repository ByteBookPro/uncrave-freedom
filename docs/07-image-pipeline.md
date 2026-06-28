# 7. Image Pipeline

## Provider
**OpenAI `gpt-image-1`** (a.k.a. gpt-image-2 via Lovable Gateway).
Edge function: `supabase/functions/openai-image/index.ts`.

## Format
- Aspect ratio: **1024×1536 (portrait)** for mobile-first slides.
- Quality: `medium` (balance cost vs detail).
- Returns base64; generator uploads to Lovable Assets CDN; updates manifest.

## Prompt template (in `scripts/generateSlideImages.ts`)
```
Cinematic 35mm photoreal image. Subject: <slide.imagePrompt or slide.text>.
Mood: calm, hopeful, premium editorial. Soft natural light, shallow depth of field,
warm color grading. No text, no watermark, no UI elements. Vertical 9:16.
```

## Idempotency
`slideImageManifest.json` keys by `slide.id`. Generator skips slides already present unless `--force` flag passed.

## Manual override
Set `slide.backgroundImage` to any CDN URL directly in `sessionModules.ts` — manifest lookup respects explicit values first.

## Cost guardrails
- ~$0.04 per `medium` image × ~350 slides ≈ **$14 full regen**.
- Script throttles to concurrency 3, 500ms gap, resumes on crash.
