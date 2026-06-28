# 9. Deployment

## On Lovable
- Click **Publish** (top-right). First publish creates `<slug>.lovable.app`.
- Custom domain: Project Settings → Domains → Connect Domain.
- Backend (edge fns + migrations) deploys **automatically** on save.
- Frontend changes require an explicit publish click.

## Self-hosting

### Frontend
```bash
bun install
bun run build              # → dist/
# Serve dist/ on any static host (Vercel, Netlify, Cloudflare Pages, S3+CF).
# SPA fallback: route all unknown paths to /index.html.
```

### Backend (Supabase open-source)
```bash
supabase init
supabase db push docs/schema.sql
supabase functions deploy text-to-speech openai-image
supabase secrets set OPENAI_API_KEY=sk-...
```

### Env vars the client expects
```
VITE_SUPABASE_URL=...
VITE_SUPABASE_PUBLISHABLE_KEY=...
VITE_SUPABASE_PROJECT_ID=...
```

## Mobile wrappers
- **Capacitor** — recommended. `bun add @capacitor/core @capacitor/cli && npx cap init`. Add platforms, copy `dist/`, build native.
- **Expo (WebView)** — wrap the published URL inside `react-native-webview` for store distribution.

Audio autoplay works on iOS only after user tap; the existing "Tap to begin" overlay handles this in both browser and WebView.

## SEO
- `index.html` already has title (<60 chars), meta description (<160), OG/Twitter tags, JSON-LD, canonical, viewport.
- One H1 per page (in `Index.tsx`).
- All slide images shipped with descriptive `alt`.
