# UnCrave — Full Project Documentation

A complete, IDE-agnostic handbook for the **UnCrave** 10-day smoking-cessation app.
Everything needed to rebuild, extend, or port this project to any AI IDE
(Cursor, Windsurf, Claude Code, Copilot Workspace, Bolt, etc.) lives in this
folder.

## Contents

| File | What it covers |
|------|----------------|
| [`01-overview.md`](./01-overview.md) | Product vision, user journey, evidence base |
| [`02-architecture.md`](./02-architecture.md) | Tech stack, runtime topology, data flow |
| [`03-frontend.md`](./03-frontend.md) | React app structure, routing, contexts, hooks, components |
| [`04-backend.md`](./04-backend.md) | Supabase schema, RLS, edge functions, secrets |
| [`05-content-system.md`](./05-content-system.md) | 10-day curriculum, slide model, localization (EN/HI/ZH/DE) |
| [`06-audio-engine.md`](./06-audio-engine.md) | TTS pipeline, manifest cache, OpenAI gpt-4o-mini-tts |
| [`07-image-pipeline.md`](./07-image-pipeline.md) | gpt-image-1 slide generation, CDN upload |
| [`08-scripts.md`](./08-scripts.md) | All generator scripts, how to run them, resume semantics |
| [`09-deployment.md`](./09-deployment.md) | Publishing, custom domain, env vars, mobile wrapping |
| [`10-porting-guide.md`](./10-porting-guide.md) | Step-by-step port to any AI IDE / non-Lovable stack |
| [`11-roadmap.md`](./11-roadmap.md) | Outstanding work, known issues, future modules |
| [`schema.sql`](./schema.sql) | Full Postgres schema dump (tables, RLS, functions) |
| [`env.example`](./env.example) | All required environment variables |

## Quick start (any IDE)

```bash
# 1. Install
bun install        # or npm install

# 2. Configure env (see env.example)
cp docs/env.example .env

# 3. Run
bun run dev        # http://localhost:8080

# 4. Provision backend
#    - Create a Supabase project
#    - Apply docs/schema.sql
#    - Deploy supabase/functions/* (text-to-speech, openai-image, gemini-*)
#    - Set secrets: OPENAI_API_KEY, GEMINI_API_KEY (optional), LOVABLE_API_KEY (optional)

# 5. Generate content (one-time, ~30 min, ~$15 OpenAI)
bun run scripts/generateNarrationAudio.ts
bun run scripts/generateSlideImages.ts
```

## Project identity

- **Name:** UnCrave
- **Stack:** Vite + React 18 + TypeScript + Tailwind + shadcn/ui + Supabase
- **Languages supported:** English, Hindi, Mandarin Chinese, German
- **Published URL:** https://brave-smoke-free.lovable.app
- **License:** Proprietary (owner: project creator)
