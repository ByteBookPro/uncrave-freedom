// Premium TTS via MeshAPI → Cartesia Sonic-3
// - Cartesia Sonic-3 is a multilingual, low-latency premium TTS
// - mp3_44100_128 for full-band audio (fixes the thin/treble sound)
// - Per-language voice pairing with warm delivery
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

// Cartesia voice UUIDs. Sonic-3 is multilingual — same voice IDs across languages.
// Curated for warmth and coach-like delivery.
const CARTESIA_VOICES = {
  sarah:            "694f9389-aac1-45b6-b726-9d9369183238", // warm, calm female
  britishLady:      "71a7ad14-091c-4e8e-a314-022ece01c121", // measured female
  calmLady:         "00a77add-48d5-4ef6-8157-71e5437b282d", // soft female
  newsman:          "d46abd1d-2d02-43e8-819f-51fb652c1c61", // steady male
  britishReader:    "79a125e8-cd45-4c13-8a67-188112f4dd22", // warm male
  barbershop:       "a0e99841-438c-4a64-b679-ae501e7d6091", // deep male
} as const;

const voiceByLangGender: Record<ContentLanguage, Record<VoiceGender, string>> = {
  en: { female: CARTESIA_VOICES.sarah,         male: CARTESIA_VOICES.britishReader },
  hi: { female: CARTESIA_VOICES.sarah,         male: CARTESIA_VOICES.britishReader },
  zh: { female: CARTESIA_VOICES.calmLady,      male: CARTESIA_VOICES.newsman },
  de: { female: CARTESIA_VOICES.britishLady,   male: CARTESIA_VOICES.barbershop },
};

// Named voice preferences (used by Settings picker).
const namedVoiceMap: Record<string, string> = {
  sarah: CARTESIA_VOICES.sarah,
  british_lady: CARTESIA_VOICES.britishLady,
  calm_lady: CARTESIA_VOICES.calmLady,
  newsman: CARTESIA_VOICES.newsman,
  british_reader: CARTESIA_VOICES.britishReader,
  barbershop: CARTESIA_VOICES.barbershop,
  // Backward-compat legacy names
  calm_female: CARTESIA_VOICES.sarah,
  energetic_male: CARTESIA_VOICES.britishReader,
  nova: CARTESIA_VOICES.sarah,
  shimmer: CARTESIA_VOICES.calmLady,
  alloy: CARTESIA_VOICES.britishLady,
  onyx: CARTESIA_VOICES.barbershop,
  echo: CARTESIA_VOICES.newsman,
  fable: CARTESIA_VOICES.britishReader,
  sage: CARTESIA_VOICES.sarah,
  ash: CARTESIA_VOICES.newsman,
};

// Speed tuning per preset (Cartesia accepts `speed` in [-1, 1], but the MeshAPI
// OpenAI-compat surface uses the OpenAI-style `speed` multiplier). We keep both.
const presetSpeed: Record<PresetType, number> = {
  dailyCoach: 1.0,
  motivationLift: 1.03,
  cravingEmergency: 0.92,
  story: 0.98,
  guided: 0.90,
};

const languageCode: Record<ContentLanguage, string> = {
  en: "en", hi: "hi", zh: "zh", de: "de",
};

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
      preset && preset in presetSpeed
        ? (preset as PresetType)
        : "dailyCoach";
    const selectedGender: VoiceGender = gender === "male" ? "male" : "female";

    let voice: string;
    if (requestedVoice && namedVoiceMap[requestedVoice]) {
      voice = namedVoiceMap[requestedVoice];
    } else if (
      requestedVoice &&
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
        .test(requestedVoice)
    ) {
      voice = requestedVoice; // raw Cartesia voice UUID
    } else {
      voice = voiceByLangGender[selectedLanguage][selectedGender];
    }

    const speed = presetSpeed[selectedPreset];
    const processedText = processTextForLanguage(text, selectedLanguage);

    console.log(
      `TTS(Cartesia/Sonic-3) lang=${selectedLanguage} preset=${selectedPreset} voice=${voice} speed=${speed} chars=${processedText.length}`,
    );

    const response = await fetch("https://api.meshapi.ai/v1/audio/speech", {
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
        speed,
        // Cartesia-specific extras forwarded through the gateway
        language: languageCode[selectedLanguage],
      }),
    });

    if (!response.ok) {
      const errText = await response.text().catch(() => "");
      console.error("MeshAPI/Cartesia TTS error:", response.status, errText);
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
