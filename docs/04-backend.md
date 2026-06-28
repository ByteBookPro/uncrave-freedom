# 4. Backend (Supabase)

## Tables (public schema)

| Table | Purpose |
|-------|---------|
| `profiles` | One row per user. Onboarding answers + `current_day` + `language` + voice prefs |
| `user_roles` | `(user_id, role)` — role check via `has_role()` SECURITY DEFINER |
| `course_days` | Curriculum metadata (day_number, title, duration bounds, language) |
| `day_modules` | Ordered modules per day |
| `module_assets` | Optional CMS-driven assets (images/audio overrides) |
| `practices` | Library of breathing / body-scan / urge-surf drills |
| `user_day_completions` | Source of truth for `completedDays` |
| `user_progress` | Aggregated streak / minutes / money saved |
| `user_practice_logs` | Each practice session |
| `craving_logs` | Craving tool entries |
| `events` | Analytics firehose (event_name + payload jsonb) |
| `broadcasts` | Admin push notifications |
| `user_broadcast_reads` | Read receipts |

Full DDL: [`schema.sql`](./schema.sql).

## RLS pattern
Every table:
```sql
GRANT SELECT, INSERT, UPDATE, DELETE ON public.<t> TO authenticated;
GRANT ALL ON public.<t> TO service_role;
ALTER TABLE public.<t> ENABLE ROW LEVEL SECURITY;

CREATE POLICY "owner_rw" ON public.<t>
  FOR ALL TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());
```
Admin tables (`broadcasts`, `course_days`) gate writes on `has_role(auth.uid(), 'admin')`.

## SECURITY DEFINER helpers
```sql
CREATE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER
SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles
                 WHERE user_id = _user_id AND role = _role)
$$;
```
Roles MUST NOT live on `profiles` — they live in `user_roles` to prevent privilege escalation.

## Edge functions (`supabase/functions/`)

| Function | `verify_jwt` | Calls |
|----------|--------------|-------|
| `text-to-speech` | false | OpenAI `/v1/audio/speech` with `gpt-4o-mini-tts` |
| `openai-image` | false | OpenAI `/v1/images/generations` with `gpt-image-1` |
| `gemini-image` | true | Gemini image (optional) |
| `gemini-text` | true | Gemini text (optional) |

CORS preflight handled in every fn. Errors return JSON `{ error }` with proper status (`402` credits, `429` rate-limit, `500` other).

## Required secrets
- `OPENAI_API_KEY` — TTS + images
- `LOVABLE_API_KEY` — optional gateway fallback
- `GEMINI_API_KEY` — optional
- Supabase auto-set: `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `SUPABASE_ANON_KEY`

## Triggers
- `on_auth_user_created` → `handle_new_user()` inserts a row in `profiles`.
- `set_updated_at` on every table using `update_updated_at_column()`.
