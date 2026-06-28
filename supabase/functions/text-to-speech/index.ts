// Lovable AI Gateway TTS — no rate limits, native streaming, billed per request.
// Returns MP3 audio. Frontend caches by text hash so each narration is generated once.
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
type OpenAIVoice = "alloy" | "echo" | "fable" | "onyx" | "nova" | "shimmer" | "sage" | "ash";

// Legacy gender->voice map (backward compat for old saved preferences).
const genderVoiceMap: Record<VoiceGender, OpenAIVoice> = {
  female: "nova",
  male: "onyx",
};

// Map legacy preference strings to OpenAI voices.
const legacyVoiceMap: Record<string, OpenAIVoice> = {
  calm_female: "nova",
  energetic_male: "onyx",
};

const ALLOWED_VOICES: OpenAIVoice[] = ["alloy", "echo", "fable", "onyx", "nova", "shimmer", "sage", "ash"];

// Natural-language pacing/tone steering. The model honors these like a director.
const presetInstructions: Record<PresetType, string> = {
  dailyCoach:
    "Speak like a warm, trusted coach. Calm, confident, unhurried. Pause naturally after commas and full stops. Slight upward warmth at the end of reassuring lines. Never robotic or news-anchor.",
  motivationLift:
    "Speak with quiet, grounded conviction — like someone who deeply believes in the listener. A little brighter and more buoyant than baseline, but never excited or salesy. Lift the key promise words.",
  cravingEmergency:
    "Speak very slowly and softly, like a meditation guide talking someone through a hard moment. Long breaths between sentences. Low, steady, reassuring. Sound physically close to the listener.",
  story:
    "Narrate like a thoughtful storyteller — intimate, almost confidential. Vary pacing: slow on the meaningful lines, slightly faster on connective tissue. Let pauses do the work.",
  guided:
    "Speak as a breathwork / meditation guide. Very slow, very soft, very spacious. Long pauses, especially around the words 'breathe in', 'hold', 'breathe out'. Voice should feel like an exhale.",
};

const languageHint: Record<ContentLanguage, string> = {
  en: "Speak in clear, natural English.",
  hi: "Speak in natural, warm Hindi (हिंदी) with an urban Indian accent. Soft confidence, never harsh. Pronounce English loanwords cleanly.",
  zh: "Speak in clear, standard Mandarin Chinese (普通话) with calm authority. Crisp tones, but never clipped — keep warmth.",
  de: "Speak in warm, supportive German (Hochdeutsch). Conversational, not news-anchor. Soft on consonants.",
};

const presetSpeed: Record<PresetType, number> = {
  dailyCoach: 0.96,
  motivationLift: 1.0,
  cravingEmergency: 0.88,
  story: 0.97,
  guided: 0.87,
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
    const { text, preset, gender, language, voice: requestedVoice } = await req.json();
    const OPENAI_API_KEY = Deno.env.get("OPENAI_API_KEY");

    if (!OPENAI_API_KEY) {
      throw new Error("OPENAI_API_KEY is not configured");
    }
    if (!text) {
      throw new Error("Text is required");
    }

    const selectedLanguage: ContentLanguage =
      language && ["en", "hi", "zh", "de"].includes(language)
        ? (language as ContentLanguage)
        : "en";
    const selectedPreset: PresetType =
      preset && preset in presetInstructions
        ? (preset as PresetType)
        : "dailyCoach";

    // Voice resolution priority: explicit `voice` → legacy mapping → gender fallback.
    let voice: OpenAIVoice;
    if (requestedVoice && ALLOWED_VOICES.includes(requestedVoice as OpenAIVoice)) {
      voice = requestedVoice as OpenAIVoice;
    } else if (requestedVoice && legacyVoiceMap[requestedVoice]) {
      voice = legacyVoiceMap[requestedVoice];
    } else {
      const selectedGender: VoiceGender = gender === "male" ? "male" : "female";
      voice = genderVoiceMap[selectedGender];
    }

    const speed = presetSpeed[selectedPreset];
    const instructions = `${presetInstructions[selectedPreset]} ${languageHint[selectedLanguage]}`;
    const processedText = processTextForLanguage(text, selectedLanguage);

    console.log(
      `TTS request: lang=${selectedLanguage} preset=${selectedPreset} voice=${voice} (requested=${requestedVoice ?? "n/a"}) speed=${speed} chars=${processedText.length}`,
    );

    const response = await fetch(
      "https://api.openai.com/v1/audio/speech",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "gpt-4o-mini-tts",
          input: processedText,
          voice,
          instructions,
          speed,
          response_format: "mp3",
        }),
      },
    );

    if (!response.ok) {
      const errText = await response.text().catch(() => "");
      console.error("Lovable AI TTS error:", response.status, errText);
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limited. Please retry shortly." }),
          {
            status: 429,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          },
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({
            error: "AI credits exhausted. Please add credits in workspace settings.",
          }),
          {
            status: 402,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          },
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
