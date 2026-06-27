/**
 * Auto-regenerate Gemini background images for every slide.
 *
 * Usage:
 *   GEMINI_API_KEY=... bun run scripts/generateSlideImages.ts          # only changed copy
 *   GEMINI_API_KEY=... bun run scripts/generateSlideImages.ts --force  # regenerate everything
 *   GEMINI_API_KEY=... bun run scripts/generateSlideImages.ts --day 3  # one day only
 *
 * The script:
 *  1. Walks every slide in src/data/sessionModules.ts
 *  2. Hashes title + content + narration so unchanged copy is skipped
 *  3. Asks Gemini (gemini-2.5-flash-image / Nano Banana) for a premium,
 *     cinematic, text-free vertical photograph
 *  4. Uploads the PNG to the Lovable CDN via `lovable-assets`
 *  5. Writes the {key -> url} map into src/data/slideImageManifest.json
 *
 * The app reads that manifest at runtime (DaySessionPlayer hydrates each
 * slide's backgroundImage from it), so you never need to touch sessionModules.ts
 * after updating copy — just rerun the script.
 */

import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { execSync } from "node:child_process";
import { daySessions } from "../src/data/sessionModules";

/**
 * Calls our deployed `gemini-image` edge function (which holds the user's
 * GEMINI_API_KEY in Supabase secrets), so this script does not need a
 * Gemini key in the local environment.
 */
const SUPABASE_URL = process.env.SUPABASE_URL || "https://gbqratkoykehwofkuttk.supabase.co";
const SUPABASE_ANON_KEY =
  process.env.SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdicXJhdGtveWtlaHdvZmt1dHRrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjcxNjk1NjMsImV4cCI6MjA4Mjc0NTU2M30.4IRIihN09QjEqmWd9zxZBmGCcEBdbM3yScGVEYD0zt8";

const MANIFEST_PATH = path.resolve("src/data/slideImageManifest.json");
const FORCE = process.argv.includes("--force");
const dayArgIdx = process.argv.indexOf("--day");
const ONLY_DAY = dayArgIdx >= 0 ? Number(process.argv[dayArgIdx + 1]) : null;

const STYLE_PROMPT = `Premium cinematic editorial photograph for a smoking cessation wellness app.
Aesthetic: modern, hopeful, calm, emotionally grounding — Apple Health x Calm x Headspace.
Lighting: soft natural golden-hour or diffused window light, gentle shadows.
Palette: muted teal, warm coral, sand, cream, deep forest green.
Composition: 9:16 vertical, shallow depth of field, room for overlay text at top OR bottom (lots of negative space / soft gradient).
Subjects: real humans of varied ethnicities and ages in moments of clarity, breath, freedom, connection, nature, fresh morning light, hands, eyes, sky, water, mountains, plants.
Strictly forbidden: cigarettes, vapes, smoke, ashtrays, lighters, text, typography, captions, watermarks, logos, illustrations, cartoons, 3D renders, AI artifacts, distorted hands.
Style: photorealistic 35mm film, Kodak Portra 400, subtle grain, no HDR, no oversaturation.`;

interface ManifestEntry { hash: string; url: string; updatedAt: string; }
const manifest: Record<string, ManifestEntry> = fs.existsSync(MANIFEST_PATH)
  ? JSON.parse(fs.readFileSync(MANIFEST_PATH, "utf8"))
  : {};

function save() {
  fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2) + "\n");
}

function hashText(s: string) {
  return crypto.createHash("sha1").update(s).digest("hex").slice(0, 12);
}

async function generateImage(prompt: string): Promise<Buffer> {
  const url = `${SUPABASE_URL}/functions/v1/gemini-image`;
  for (let attempt = 1; attempt <= 4; attempt++) {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        apikey: SUPABASE_ANON_KEY,
      },
      body: JSON.stringify({ prompt }),
    });
    if (res.status === 429 || res.status >= 500) {
      const wait = 2000 * attempt;
      console.warn(`  ↻ ${res.status}, retrying in ${wait}ms`);
      await new Promise((r) => setTimeout(r, wait));
      continue;
    }
    if (!res.ok) throw new Error(`edge ${res.status}: ${(await res.text()).slice(0, 300)}`);
    const json: any = await res.json();
    if (!json.base64) throw new Error("no image: " + JSON.stringify(json).slice(0, 300));
    return Buffer.from(json.base64, "base64");
  }
  throw new Error("exhausted retries");
}

function uploadToCdn(filePath: string, filename: string): string {
  const stdout = execSync(`lovable-assets create --file ${filePath} --filename ${filename}`, { encoding: "utf8" });
  const json = JSON.parse(stdout);
  if (!json.url) throw new Error("upload missing url: " + stdout);
  return json.url;
}

async function main() {
  let generated = 0;
  let skipped = 0;
  for (const day of daySessions) {
    if (ONLY_DAY && day.dayNumber !== ONLY_DAY) continue;
    for (const mod of day.modules) {
      const slides = mod.content?.slides;
      if (!slides) continue;
      for (const slide of slides) {
        const key = `d${day.dayNumber}-${mod.id}-${slide.id}`;
        const sourceText = [slide.title, slide.content, slide.narration ?? ""].join("\n");
        const h = hashText(sourceText);
        if (!FORCE && manifest[key]?.hash === h && manifest[key]?.url) {
          skipped++;
          continue;
        }
        const conceptPrompt = `${STYLE_PROMPT}

Day ${day.dayNumber} — ${day.title} (${day.subtitle})
Module: ${mod.title}
Slide title: "${slide.title}"
Slide visual concept: ${slide.content}
Emotional context (do NOT show as text, only translate into mood/scene): ${(slide.narration ?? "").slice(0, 500)}

Create ONE vertical photograph that visually embodies this moment. No text in image.`;

        console.log(`→ ${key} :: ${slide.title.slice(0, 50)}`);
        try {
          const buf = await generateImage(conceptPrompt);
          const tmp = `/tmp/slide-${key}.png`;
          fs.writeFileSync(tmp, buf);
          const url = uploadToCdn(tmp, `${key}.png`);
          manifest[key] = { hash: h, url, updatedAt: new Date().toISOString() };
          save();
          generated++;
          await new Promise((r) => setTimeout(r, 700));
        } catch (e: any) {
          console.error(`  ✗ ${key}: ${e.message}`);
        }
      }
    }
  }
  console.log(`\nDone. generated=${generated} skipped=${skipped} total=${generated + skipped}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
