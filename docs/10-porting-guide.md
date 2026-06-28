# 10. Porting to another AI IDE

This project is plain Vite + React + Supabase. There is **no Lovable-specific
runtime code** — only two integration touchpoints to replace.

## Step 1 — Clone & install
```bash
git clone <repo>
cd uncrave
bun install        # or npm install / pnpm install
```

## Step 2 — Backend
Pick one:

### Option A: keep Supabase (recommended)
- Create a free Supabase project.
- `supabase db push docs/schema.sql`
- `supabase functions deploy` (every dir in `supabase/functions/`)
- Set secrets: `supabase secrets set OPENAI_API_KEY=...`
- Copy URL + anon key into `.env` as `VITE_SUPABASE_URL` / `VITE_SUPABASE_PUBLISHABLE_KEY` / `VITE_SUPABASE_PROJECT_ID`.

### Option B: another backend (Firebase, custom Node)
- Rewrite `src/integrations/supabase/client.ts` shim — keep the same public
  surface: `auth.signIn/signOut/getSession`, `from(table).select/insert/update/delete`,
  `functions.invoke`.
- Re-create tables from `schema.sql` in your DB; preserve column names so
  hooks need zero edits.

## Step 3 — Replace asset upload
`scripts/generate*.ts` upload to **Lovable Assets CDN** via the `lovable-assets`
CLI. Replace the `uploadAsset()` helper at the top of each script with:

```ts
// Supabase Storage example
import { createClient } from "@supabase/supabase-js";
const sb = createClient(URL, SERVICE_ROLE);
async function uploadAsset(localPath: string, filename: string, contentType: string) {
  const buf = await Bun.file(localPath).arrayBuffer();
  await sb.storage.from("media").upload(filename, buf, { contentType, upsert: true });
  return `${URL}/storage/v1/object/public/media/${filename}`;
}
```

Create two public buckets first (`audio`, `images`), set cache to `public, max-age=31536000, immutable`.

## Step 4 — Remove Lovable-only files (optional)
- `lovable-tagger` in `vite.config.ts`
- `.lovable/` folder
- `LOVABLE_API_KEY` references (fallback only; safe to delete)

## Step 5 — Generate content
```bash
bun run scripts/generateNarrationAudio.ts
bun run scripts/generateSlideImages.ts
```

## Step 6 — Deploy
Static frontend → Vercel/Netlify/CF Pages. SPA fallback to `index.html`.

## What you do NOT need to port
- React code is framework-agnostic.
- Tailwind config + design tokens are vanilla.
- shadcn/ui components are vendored under `src/components/ui/`.
- All AI prompts are inline in scripts/edge functions.

## AI IDE prompts to bootstrap
Copy this into the chat of any new AI IDE on first open:

> Read `docs/README.md` and `docs/02-architecture.md`. Then summarize the
> project structure, list every edge function, and propose the smallest
> change to get `bun run dev` working in this environment. Do not touch
> `src/integrations/supabase/types.ts` (auto-generated).
