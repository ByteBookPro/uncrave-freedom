# 8. Scripts

All generator scripts live in `scripts/` and run with **Bun** (`bun run scripts/<file>.ts`). They require `OPENAI_API_KEY` in env (or `.env`).

## `scripts/generateNarrationAudio.ts`
- Walks every slide that has `narrationKey`.
- For each `lang ∈ {en, hi, zh, de}`, looks up localized text.
- Hashes `lang|text` (sha1).
- Skips if hash is already in `src/data/narrationManifest.json`.
- Else calls OpenAI `/v1/audio/speech` (`gpt-4o-mini-tts`, voice `nova`, preset by module type).
- Uploads MP3 via `lovable-assets create --filename <hash>.mp3`.
- Writes URL into manifest. Atomic save every 5 clips.
- Concurrency: 2, gap 800ms. Resumable on Ctrl-C.

Run:
```bash
bun run scripts/generateNarrationAudio.ts          # all langs, all days
bun run scripts/generateNarrationAudio.ts --lang hi
bun run scripts/generateNarrationAudio.ts --day 5
```

## `scripts/generateSlideImages.ts`
- Walks every slide; uses `slide.id` as manifest key.
- Calls OpenAI `/v1/images/generations` (`gpt-image-1`, 1024x1536, quality `medium`).
- Uploads PNG via `lovable-assets create`.
- Writes URL into `src/data/slideImageManifest.json`.
- Updates `src/data/generationProgress.json` for the in-app status page.

Run:
```bash
bun run scripts/generateSlideImages.ts
bun run scripts/generateSlideImages.ts --day 3 --force
```

## In-app progress monitor
`/settings/generation` (component `src/pages/GenerationStatus.tsx`) polls `generationProgress.json` and shows:
- Images: total / generated / updatedAt
- Audio: per-language progress + last hash written

## CLI prerequisites
- Bun ≥ 1.0
- `lovable-assets` CLI (Lovable sandbox only). On other IDEs, swap upload step for **Supabase Storage** (`audio` + `slide-images` buckets, public, immutable cache) and emit `https://<ref>.supabase.co/storage/v1/object/public/...` URLs. The two helpers are isolated in a single `uploadAsset()` function at the top of each script — replace once.
