/**
 * Regenerate every narration MP3 using the user's OPENAI_API_KEY.
 *
 *   OPENAI_API_KEY=... bun run scripts/generateNarrationAudio.ts
 *   bun run scripts/generateNarrationAudio.ts --force        # ignore manifest cache
 *   bun run scripts/generateNarrationAudio.ts --lang en      # one language only
 *
 * Pipeline per clip:
 *   1. Walk every slide narration (EN) + every localized module narration (HI/ZH/DE).
 *   2. Hash sha1(`${lang}|${normalized text}`).slice(0,16) — same as the runtime manifest reader.
 *   3. Skip if manifest already has a URL (unless --force).
 *   4. POST to OpenAI /v1/audio/speech (gpt-4o-mini-tts), pull MP3.
 *   5. Upload to Lovable CDN via `lovable-assets`.
 *   6. Write src/data/narrationManifest.json + src/data/generationProgress.json (timestamps).
 */
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { execSync } from "node:child_process";
import { daySessions } from "../src/data/sessionModules";
import { localizedNarrations } from "../src/data/sessionNarrationLocalized";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
if (!OPENAI_API_KEY) {
  console.error("OPENAI_API_KEY required");
  process.exit(1);
}

const FORCE = process.argv.includes("--force");
const langArgIdx = process.argv.indexOf("--lang");
const ONLY_LANG = langArgIdx >= 0 ? process.argv[langArgIdx + 1] : null;

const MANIFEST_PATH = path.resolve("src/data/narrationManifest.json");
const PROGRESS_PATH = path.resolve("src/data/generationProgress.json");

type Lang = "en" | "hi" | "zh" | "de";

// Voice + preset choices match the runtime defaults so users hear matching audio.
const VOICE = "nova";
const SPEED = 0.96;
const INSTRUCTIONS_BY_LANG: Record<Lang, string> = {
  en: "Warm, trusted coach. Calm, confident, unhurried. Speak naturally in clear English.",
  hi: "गर्म, भरोसेमंद कोच की तरह बोलें — शांत, आत्मविश्वासी, बिना जल्दबाज़ी के। प्राकृतिक, स्पष्ट हिंदी में।",
  zh: "温暖、值得信赖的教练。冷静、自信、从容。用清晰、自然的普通话讲述。",
  de: "Warmer, vertrauensvoller Coach. Ruhig, selbstsicher, unaufgeregt. Sprich natürliches, klares Deutsch.",
};

const manifest: Record<string, string> = fs.existsSync(MANIFEST_PATH)
  ? JSON.parse(fs.readFileSync(MANIFEST_PATH, "utf8"))
  : {};

interface ProgressFile {
  images: { total: number; generated: number; updatedAt: string | null };
  audio: { total: number; generated: number; updatedAt: string | null; perLang: Record<Lang, number> };
}
const progress: ProgressFile = fs.existsSync(PROGRESS_PATH)
  ? JSON.parse(fs.readFileSync(PROGRESS_PATH, "utf8"))
  : {
      images: { total: 0, generated: 0, updatedAt: null },
      audio: { total: 0, generated: 0, updatedAt: null, perLang: { en: 0, hi: 0, zh: 0, de: 0 } },
    };

function normalize(s: string) {
  return s.replace(/\s+/g, " ").trim();
}

function hashKey(lang: Lang, text: string) {
  const key = `${lang}|${normalize(text)}`;
  return crypto.createHash("sha1").update(key).digest("hex").slice(0, 16);
}

function saveAll() {
  fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2) + "\n");
  fs.writeFileSync(PROGRESS_PATH, JSON.stringify(progress, null, 2) + "\n");
}

async function generateMp3(text: string, lang: Lang): Promise<Buffer> {
  for (let attempt = 1; attempt <= 4; attempt++) {
    const res = await fetch("https://api.openai.com/v1/audio/speech", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini-tts",
        input: text,
        voice: VOICE,
        instructions: INSTRUCTIONS_BY_LANG[lang],
        speed: SPEED,
        response_format: "mp3",
      }),
    });
    if (res.status === 429 || res.status >= 500) {
      const wait = 1500 * attempt;
      console.warn(`  ↻ ${res.status}, retry in ${wait}ms`);
      await new Promise((r) => setTimeout(r, wait));
      continue;
    }
    if (!res.ok) throw new Error(`openai ${res.status}: ${(await res.text()).slice(0, 200)}`);
    return Buffer.from(await res.arrayBuffer());
  }
  throw new Error("exhausted retries");
}

function upload(file: string, filename: string): string {
  const out = execSync(`lovable-assets create --file ${file} --filename ${filename}`, { encoding: "utf8" });
  const json = JSON.parse(out);
  if (!json.url) throw new Error("upload missing url: " + out);
  return json.url;
}

// Build the work list.
interface Job { lang: Lang; text: string; tag: string; }
const jobs: Job[] = [];

for (const day of daySessions) {
  for (const mod of day.modules) {
    const slides = mod.content?.slides ?? [];
    for (const slide of slides) {
      const text = slide.narration || slide.content;
      if (text && text.trim()) {
        jobs.push({ lang: "en", text, tag: `d${day.dayNumber}-${mod.id}-${slide.id}` });
      }
    }
  }
}

for (const lang of ["hi", "zh", "de"] as Lang[]) {
  const map = localizedNarrations[lang] || {};
  for (const [moduleKey, text] of Object.entries(map)) {
    if (text && text.trim()) jobs.push({ lang, text, tag: `${lang}-${moduleKey}` });
  }
}

const filtered = jobs.filter((j) => !ONLY_LANG || j.lang === ONLY_LANG);
console.log(`Total jobs: ${filtered.length} (en+hi+zh+de)`);

progress.audio.total = filtered.length;
let generated = 0;
let skipped = 0;

for (const job of filtered) {
  const hash = hashKey(job.lang, job.text);
  if (!FORCE && manifest[hash]) {
    skipped++;
    continue;
  }
  try {
    console.log(`→ ${job.tag} [${job.lang}] ${job.text.slice(0, 60).replace(/\s+/g, " ")}…`);
    const buf = await generateMp3(job.text, job.lang);
    const tmp = `/tmp/narr-${hash}.mp3`;
    fs.writeFileSync(tmp, buf);
    const url = upload(tmp, `${job.lang}_${hash}.mp3`);
    manifest[hash] = url;
    generated++;
    progress.audio.generated = generated + skipped;
    progress.audio.perLang[job.lang] = (progress.audio.perLang[job.lang] || 0) + 1;
    progress.audio.updatedAt = new Date().toISOString();
    if (generated % 5 === 0) saveAll();
    await new Promise((r) => setTimeout(r, 250));
  } catch (e: any) {
    console.error(`  ✗ ${job.tag}: ${e.message}`);
  }
}
saveAll();
console.log(`\nDone. generated=${generated} skipped=${skipped} total=${filtered.length}`);
