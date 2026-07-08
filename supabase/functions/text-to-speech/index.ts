// Premium TTS via MeshAPI → ElevenLabs Multilingual v2
// - eleven_multilingual_v2 for the richest, warmest voice (QuitSure-style)
// - Native voice options per language + gender
// - Tuned voice_settings for calm, unhurried coach delivery
// - mp3_44100_128 for full-band, non-thin audio on mobile speakers
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

type PresetType =
  | "dailyCoach"
  | "motivationLift"
  | "cravingEmergency"
  | "story"
  | "guided";
type VoiceGender = "female" | "male";
type ContentLanguage = "en" | "de" | "zh" | "hi";

// Curated ElevenLabs voice IDs per language + gender.
// Multilingual v2 handles all four languages with any voice, but native-language
// timbre + tuning gives the "premium" feel users expect.
const voiceByLangGender: Record<ContentLanguage, Record<VoiceGender, string>> = {
  en: {
    female: "EXAVITQu4vr4xnSDxMaL", // Sarah — warm, calm, professional
    male: "onwK4e9ZLuTAKqWW03F9",   // Daniel — deep, warm British
  },
  hi: {
    female: "EXAVITQu4vr4xnSDxMaL", // Sarah handles Hindi cleanly in multilingual_v2
    male: "onwK4e9ZLuTAKqWW03F9",   // Daniel
  },
  zh: {
    female: "XrExE9yKIg1WjnnlVkGX", // Matilda — soft, natural Mandarin
    male: "TX3LPaxmHKxFdv7VOQHJ",   // Liam — clear, calm
  },
  de: {
    female: "XrExE9yKIg1WjnnlVkGX", // Matilda — supportive
    male: "JBFqnCBsd6RMkjVDRZzb",   // George — warm German-friendly baritone
  },
};

// Explicit voice preference names (from Settings UI) → ElevenLabs IDs.
const namedVoiceMap: Record<string, string> = {
  // New premium named voices exposed in Settings
  sarah: "EXAVITQu4vr4xnSDxMaL",
  daniel: "onwK4e9ZLuTAKqWW03F9",
  matilda: "XrExE9yKIg1WjnnlVkGX",
  george: "JBFqnCBsd6RMkjVDRZzb",
  liam: "TX3LPaxmHKxFdv7VOQHJ",
  charlotte: "XB0fDUnXU5powFXDhCwa",
  // Backward-compat legacy names
  calm_female: "EXAVITQu4vr4xnSDxMaL",
  energetic_male: "onwK4e9ZLuTAKqWW03F9",
  nova: "EXAVITQu4vr4xnSDxMaL",
  shimmer: "21m00Tcm4TlvDq8ikWAM",
  alloy: "pNInz6obpgDQGcFmaJgB",
  onyx: "onwK4e9ZLuTAKqWW03F9",
  echo: "VR6AewLTigWG4xSOukaG",
  fable: "AZnzlk1XvdvUeBnXmlld",
  sage: "EXAVITQu4vr4xnSDxMaL",
  ash: "onwK4e9ZLuTAKqWW03F9",
};

// Voice-settings tuning per preset. Premium warmth = higher stability + high
// similarity_boost + low style + speaker_boost. Speed is set separately.
interface VoiceSettings {
  stability: number;
  similarity_boost: number;
  style: number;
  use_speaker_boost: boolean;
  speed: number;
}

const presetSettings: Record<PresetType, VoiceSettings> = {
  dailyCoach: {
    stability: 0.55,        // relaxed but consistent
    similarity_boost: 0.80, // stays true to voice character
    style: 0.15,            // small dose of expressiveness
    use_speaker_boost: true,
    speed: 1.0,
  },
  motivationLift: {
    stability: 0.50,
    similarity_boost: 0.82,
    style: 0.35,
    use_speaker_boost: true,
    speed: 1.02,
  },
  cravingEmergency: {
    stability: 0.72,        // very steady, meditative
    similarity_boost: 0.85,
    style: 0.05,
    use_speaker_boost: true,
    speed: 0.92,
  },
  story: {
    stability: 0.60,
    similarity_boost: 0.80,
    style: 0.25,
    use_speaker_boost: true,
    speed: 0.98,
  },
  guided: {
    stability: 0.75,        // near-monotone, breathwork calm
    similarity_boost: 0.85,
    style: 0.05,
    use_speaker_boost: true,
    speed: 0.90,
  },
};

// Insert breath-length pauses to help prosody land naturally on long lines.
function processTextForLanguage(
  text: string,
  language: ContentLanguage,
): string {
  let processed = text.replace(/\.{3,}/g, "... ");
  switch (language) {
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

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { text, preset, gender, language, voice: requestedVoice } =
      await req.json();
    const MESHAPI_API_KEY = Deno.env.get("MESHAPI_API_KEY");

    if (!MESHAPI_API_KEY) throw new Error("MESHAPI_API_KEY is not configured");
    if (!text) throw new Error("Text is required");

    const selectedLanguage: ContentLanguage =
      language && ["en", "hi", "zh", "de"].includes(language)
        ? (language as ContentLanguage)
        : "en";
    const selectedPreset: PresetType =
      preset && preset in presetSettings
        ? (preset as PresetType)
        : "dailyCoach";
    const selectedGender: VoiceGender = gender === "male" ? "male" : "female";

    // Voice resolution: explicit named/raw voice → language-native default.
    let voice: string;
    if (requestedVoice && namedVoiceMap[requestedVoice]) {
      voice = namedVoiceMap[requestedVoice];
    } else if (requestedVoice && /^[A-Za-z0-9]{18,}$/.test(requestedVoice)) {
      voice = requestedVoice; // raw ElevenLabs voice ID
    } else {
      voice = voiceByLangGender[selectedLanguage][selectedGender];
    }

    const settings = presetSettings[selectedPreset];
    const processedText = processTextForLanguage(text, selectedLanguage);

    console.log(
      `TTS(ElevenLabs mv2) lang=${selectedLanguage} preset=${selectedPreset} voice=${voice} gender=${selectedGender} chars=${processedText.length}`,
    );

    const response = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${voice}?output_format=mp3_44100_128`,
      {
        method: "POST",
        headers: {
          "xi-api-key": ELEVENLABS_API_KEY,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model_id: "eleven_multilingual_v2",
          text: processedText,
          voice_settings: {
            stability: settings.stability,
            similarity_boost: settings.similarity_boost,
            style: settings.style,
            use_speaker_boost: settings.use_speaker_boost,
            speed: settings.speed,
          },
        }),
      },
    );

    if (!response.ok) {
      const errText = await response.text().catch(() => "");
      console.error("MeshAPI TTS error:", response.status, errText);
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limited. Please retry shortly." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } },
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "MeshAPI credits exhausted. Please top up your MeshAPI account." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } },
        );
      }
      throw new Error(`TTS gateway error ${response.status}: ${errText}`);
    }

    const audioBuffer = await response.arrayBuffer();
    console.log(`TTS success: ${audioBuffer.byteLength} bytes`);

    return new Response(audioBuffer, {
      headers: {
        ...corsHeaders,
        "Content-Type": "audio/mpeg",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error) {
    console.error("text-to-speech function error:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
