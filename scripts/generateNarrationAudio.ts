/**
 * Premium narration audio regeneration — MeshAPI → ElevenLabs Multilingual v2.
 *
 *   MESHAPI_API_KEY=... bun run scripts/generateNarrationAudio.ts
 *   bun run scripts/generateNarrationAudio.ts --force        # ignore manifest cache
 *   bun run scripts/generateNarrationAudio.ts --lang en      # one language only
 *   bun run scripts/generateNarrationAudio.ts --day 1        # one day only (EN slides + all localized modules)
 *   bun run scripts/generateNarrationAudio.ts --gender male  # regen male voice track
 *
 * Pipeline per clip:
 *   1. Walk every slide narration (EN) + every localized module narration (HI/ZH/DE).
 *   2. Hash sha1(`${lang}|${normalized text}`).slice(0,16) — matches the runtime manifest reader.
 *   3. Skip if manifest already has a URL (unless --force).
 *   4. POST to MeshAPI /v1/audio/speech (elevenlabs/eleven_multilingual_v2) with premium voice_settings.
 *   5. Upload MP3 to Lovable CDN via `lovable-assets`.
 *   6. Write src/data/narrationManifest.json + src/data/generationProgress.json.
 */
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { execSync } from "node:child_process";
import { daySessions } from "../src/data/sessionModules";
import { localizedNarrations } from "../src/data/sessionNarrationLocalized";

const MESHAPI_API_KEY = process.env.MESHAPI_API_KEY;
if (!MESHAPI_API_KEY) {
  console.error("MESHAPI_API_KEY required");
  process.exit(1);
}

const FORCE = process.argv.includes("--force");
const langArgIdx = process.argv.indexOf("--lang");
const ONLY_LANG = langArgIdx >= 0 ? process.argv[langArgIdx + 1] : null;
const dayArgIdx = process.argv.indexOf("--day");
const ONLY_DAY = dayArgIdx >= 0 ? Number(process.argv[dayArgIdx + 1]) : null;
const genderArgIdx = process.argv.indexOf("--gender");
const ONLY_GENDER = genderArgIdx >= 0 ? process.argv[genderArgIdx + 1] : "female";

const MANIFEST_PATH = path.resolve("src/data/narrationManifest.json");
const PROGRESS_PATH = path.resolve("src/data/generationProgress.json");

type Lang = "en" | "hi" | "zh" | "de";
type Gender = "female" | "male";

// Cartesia Sonic-3 voice UUIDs (multilingual — same IDs across EN/HI/ZH/DE).
const voiceByLangGender: Record<Lang, Record<Gender, string>> = {
  en: { female: "694f9389-aac1-45b6-b726-9d9369183238", male: "79a125e8-cd45-4c13-8a67-188112f4dd22" },
  hi: { female: "694f9389-aac1-45b6-b726-9d9369183238", male: "79a125e8-cd45-4c13-8a67-188112f4dd22" },
  zh: { female: "00a77add-48d5-4ef6-8157-71e5437b282d", male: "d46abd1d-2d02-43e8-819f-51fb652c1c61" },
  de: { female: "71a7ad14-091c-4e8e-a314-022ece01c121", male: "a0e99841-438c-4a64-b679-ae501e7d6091" },
};

const SPEED = 1.0; // dailyCoach preset


const manifest: Record<string, string> = fs.existsSync(MANIFEST_PATH)
  ? JSON.parse(fs.readFileSync(MANIFEST_PATH, "utf8"))
  : {};

interface ProgressFile {
  images: { total: number; generated: number; updatedAt: string | null };
  audio: {
    total: number;
    generated: number;
    updatedAt: string | null;
    perLang: Record<Lang, number>;
  };
}
const progress: ProgressFile = fs.existsSync(PROGRESS_PATH)
  ? JSON.parse(fs.readFileSync(PROGRESS_PATH, "utf8"))
  : {
      images: { total: 0, generated: 0, updatedAt: null },
      audio: {
        total: 0,
        generated: 0,
        updatedAt: null,
        perLang: { en: 0, hi: 0, zh: 0, de: 0 },
      },
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

function processText(text: string, lang: Lang): string {
  let processed = text.replace(/\.{3,}/g, "... ");
  switch (lang) {
    case "hi":
      processed = processed.replace(/([।!?])(\s)/g, "$1 ... $2");
      break;
    case "zh":
      processed = processed.replace(/([。！？])(\s*)/g, "$1 ... $2");
      break;
    case "de":
      processed = processed.replace(/(Jetzt|Dann|Aber)/g, "... $1");
      break;
    default:
      processed = processed
        .replace(/(Here's the (?:truth|secret|thing)[.:])(\s)/gi, "$1 ... $2")
        .replace(/(But here's what)/gi, "... $1");
  }
  return processed;
}

async function generateMp3(text: string, lang: Lang, gender: Gender): Promise<Buffer> {
  const voice = voiceByLangGender[lang][gender];
  const processedText = processText(text, lang);
  for (let attempt = 1; attempt <= 4; attempt++) {
    const res = await fetch("https://api.meshapi.ai/v1/audio/speech", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${MESHAPI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "cartesia/sonic-3",
        input: processedText,
        voice,
        response_format: "mp3_44100_128",
        stream: false,
        speed: SPEED,
        language: lang,
      }),
    });
    if (res.status === 429 || res.status >= 500) {
      const wait = 1500 * attempt;
      console.warn(`  ↻ ${res.status}, retry in ${wait}ms`);
      await new Promise((r) => setTimeout(r, wait));
      continue;
    }
    if (!res.ok) throw new Error(`meshapi ${res.status}: ${(await res.text()).slice(0, 200)}`);
    return Buffer.from(await res.arrayBuffer());
  }
  throw new Error("exhausted retries");
}

function upload(file: string, filename: string): string {
  const out = execSync(`lovable-assets create --file ${file} --filename ${filename}`, {
    encoding: "utf8",
  });
  const json = JSON.parse(out);
  if (!json.url) throw new Error("upload missing url: " + out);
  return json.url;
}

// Build the work list.
interface Job {
  lang: Lang;
  text: string;
  tag: string;
  dayNumber: number;
}
const jobs: Job[] = [];

for (const day of daySessions) {
  for (const mod of day.modules) {
    const slides = mod.content?.slides ?? [];
    for (const slide of slides) {
      const text = slide.narration || slide.content;
      if (text && text.trim()) {
        jobs.push({
          lang: "en",
          text,
          tag: `d${day.dayNumber}-${mod.id}-${slide.id}`,
          dayNumber: day.dayNumber,
        });
      }
    }
  }
}

for (const lang of ["hi", "zh", "de"] as Lang[]) {
  const map = localizedNarrations[lang] || {};
  for (const [moduleKey, text] of Object.entries(map)) {
    if (text && text.trim()) {
      // moduleKey like "d1m3" — extract day number
      const dayMatch = moduleKey.match(/^d(\d+)/);
      const dayNumber = dayMatch ? Number(dayMatch[1]) : 0;
      jobs.push({ lang, text, tag: `${lang}-${moduleKey}`, dayNumber });
    }
  }
}

const filtered = jobs.filter((j) => {
  if (ONLY_LANG && j.lang !== ONLY_LANG) return false;
  if (ONLY_DAY && j.dayNumber !== ONLY_DAY) return false;
  return true;
});
console.log(
  `Total jobs: ${filtered.length} (langs=${ONLY_LANG ?? "all"} day=${ONLY_DAY ?? "all"} gender=${ONLY_GENDER})`,
);

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
    console.log(
      `→ ${job.tag} [${job.lang}] ${job.text.slice(0, 60).replace(/\s+/g, " ")}…`,
    );
    const buf = await generateMp3(job.text, job.lang, ONLY_GENDER as Gender);
    const tmp = `/tmp/narr-${hash}.mp3`;
    fs.writeFileSync(tmp, buf);
    const url = upload(tmp, `${job.lang}_${hash}.mp3`);
    manifest[hash] = url;
    generated++;
    progress.audio.generated = generated + skipped;
    progress.audio.perLang[job.lang] = (progress.audio.perLang[job.lang] || 0) + 1;
    progress.audio.updatedAt = new Date().toISOString();
    if (generated % 3 === 0) saveAll();
    await new Promise((r) => setTimeout(r, 300));
  } catch (e: any) {
    console.error(`  ✗ ${job.tag}: ${e.message}`);
  }
}
saveAll();
console.log(
  `\nDone. generated=${generated} skipped=${skipped} total=${filtered.length}`,
);
