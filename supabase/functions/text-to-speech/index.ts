import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Voice preset types that map to language-specific settings
type PresetType = 'dailyCoach' | 'motivationLift' | 'cravingEmergency' | 'story' | 'guided';
type VoiceGender = 'female' | 'male';
type ContentLanguage = 'en' | 'de' | 'zh' | 'hi';

interface VoiceSettings {
  stability: number;
  similarity_boost: number;
  style: number;
  speed: number;
}

// Language-specific voice presets optimized for smoking cessation content
// Based on: warm coach archetype, language-specific articulation needs
const languagePresets: Record<ContentLanguage, Record<PresetType, VoiceSettings>> = {
  // English - baseline warm coach settings
  en: {
    dailyCoach: {
      stability: 0.58,
      similarity_boost: 0.85,
      style: 0.25,
      speed: 0.96,
    },
    motivationLift: {
      stability: 0.48,
      similarity_boost: 0.85,
      style: 0.38,
      speed: 1.02,
    },
    cravingEmergency: {
      stability: 0.70,
      similarity_boost: 0.80,
      style: 0.15,
      speed: 0.90,
    },
    story: {
      stability: 0.52,
      similarity_boost: 0.85,
      style: 0.35,
      speed: 1.00,
    },
    guided: {
      stability: 0.74,
      similarity_boost: 0.78,
      style: 0.12,
      speed: 0.90,
    },
  },

  // Hindi (हिंदी) - warm urban Indian accent, soft confidence
  // Short lines + punctuation for natural breaths
  hi: {
    dailyCoach: {
      stability: 0.60,           // 0.55-0.65 range
      similarity_boost: 0.85,    // 0.80-0.90 range
      style: 0.28,               // 0.22-0.35 range
      speed: 0.96,               // 0.94-0.98 range
    },
    motivationLift: {
      stability: 0.52,
      similarity_boost: 0.85,
      style: 0.40,
      speed: 1.02,
    },
    cravingEmergency: {
      stability: 0.72,           // H-GUIDED preset for calm grounding
      similarity_boost: 0.82,
      style: 0.16,               // 0.10-0.22 range
      speed: 0.91,               // 0.88-0.94 range
    },
    story: {
      stability: 0.52,           // 0.45-0.60 range
      similarity_boost: 0.85,
      style: 0.38,               // 0.30-0.45 range
      speed: 1.02,               // 0.98-1.05 range
    },
    guided: {
      stability: 0.72,           // 0.65-0.78 range
      similarity_boost: 0.82,
      style: 0.16,               // 0.10-0.22 range
      speed: 0.91,               // 0.88-0.94 range
    },
  },

  // Chinese (简体中文) - Standard Putonghua, clear tones, calm authority
  // Needs "breathing punctuation" for clarity
  zh: {
    dailyCoach: {
      stability: 0.66,           // 0.60-0.72 range
      similarity_boost: 0.87,    // 0.82-0.92 range
      style: 0.22,               // 0.15-0.28 range
      speed: 0.98,               // 0.95-1.00 range
    },
    motivationLift: {
      stability: 0.55,
      similarity_boost: 0.87,
      style: 0.35,
      speed: 1.03,
    },
    cravingEmergency: {
      stability: 0.76,           // ZH-GUIDED preset
      similarity_boost: 0.85,
      style: 0.13,               // 0.08-0.18 range
      speed: 0.91,               // 0.88-0.94 range
    },
    story: {
      stability: 0.58,           // 0.50-0.65 range
      similarity_boost: 0.87,
      style: 0.35,               // 0.28-0.42 range
      speed: 1.03,               // 1.00-1.06 range
    },
    guided: {
      stability: 0.76,           // 0.70-0.82 range
      similarity_boost: 0.85,
      style: 0.13,               // 0.08-0.18 range
      speed: 0.91,               // 0.88-0.94 range
    },
  },

  // German (Deutsch) - Hochdeutsch, warm and supportive, not news anchor
  // Short spoken German, supportive phrasing
  de: {
    dailyCoach: {
      stability: 0.64,           // 0.58-0.70 range
      similarity_boost: 0.89,    // 0.85-0.93 range
      style: 0.25,               // 0.18-0.32 range
      speed: 0.95,               // 0.92-0.97 range
    },
    motivationLift: {
      stability: 0.52,
      similarity_boost: 0.89,
      style: 0.38,
      speed: 1.01,
    },
    cravingEmergency: {
      stability: 0.76,           // DE-GUIDED preset
      similarity_boost: 0.88,
      style: 0.13,               // 0.08-0.18 range
      speed: 0.90,               // 0.88-0.93 range
    },
    story: {
      stability: 0.56,           // 0.48-0.65 range
      similarity_boost: 0.89,
      style: 0.38,               // 0.30-0.45 range
      speed: 1.01,               // 0.98-1.04 range
    },
    guided: {
      stability: 0.76,           // 0.70-0.82 range
      similarity_boost: 0.88,
      style: 0.13,               // 0.08-0.18 range
      speed: 0.90,               // 0.88-0.93 range
    },
  },
};

// Voice options by language and gender
// Using ElevenLabs multilingual voices that support all 4 languages
const voiceOptions: Record<ContentLanguage, Record<VoiceGender, string>> = {
  en: {
    female: 'EXAVITQu4vr4xnSDxMaL',  // Sarah - warm mezzo-soprano
    male: 'JBFqnCBsd6RMkjVDRZzb',    // George - warm baritone
  },
  de: {
    female: 'EXAVITQu4vr4xnSDxMaL',  // Sarah (multilingual)
    male: 'JBFqnCBsd6RMkjVDRZzb',    // George (multilingual)
  },
  zh: {
    female: 'EXAVITQu4vr4xnSDxMaL',  // Sarah (multilingual)
    male: 'JBFqnCBsd6RMkjVDRZzb',    // George (multilingual)
  },
  hi: {
    female: 'EXAVITQu4vr4xnSDxMaL',  // Sarah (multilingual)
    male: 'JBFqnCBsd6RMkjVDRZzb',    // George (multilingual)
  },
};

// Process text with language-specific enhancements for natural pacing
function processTextForLanguage(text: string, language: ContentLanguage): string {
  let processed = text;

  // Common processing for all languages
  processed = processed.replace(/\.{3,}/g, '... ');

  switch (language) {
    case 'hi':
      // Hindi: ensure pauses around key phrases
      // "ठीक है… एक सांस लेते हैं।" pattern
      processed = processed
        .replace(/([।!?])(\s)/g, '$1...$2')  // Add pause after Hindi punctuation
        .replace(/(अब|फिर|और|लेकिन)(\s)/g, '...$1$2');  // Pause before connectors
      break;

    case 'zh':
      // Chinese: breathing punctuation, pause around key markers
      processed = processed
        .replace(/([。！？])(\s*)/g, '$1...$2')  // Pause after Chinese punctuation
        .replace(/(现在|然后|但是|接下来)/g, '...$1');  // Pause before connectors
      break;

    case 'de':
      // German: supportive phrasing, natural spoken pauses
      processed = processed
        .replace(/(Jetzt|Dann|Aber|Und jetzt)/gi, '...$1')
        .replace(/(Schritt für Schritt)/gi, '$1...');
      break;

    case 'en':
    default:
      // English processing
      processed = processed
        .replace(/(Here's the (?:truth|secret|thing)[.:])(\s)/gi, '$1...$2')
        .replace(/(But here's what)/gi, '... $1')
        .replace(/(And that's)/gi, '... $1');
      break;
  }

  return processed;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { text, voiceId, preset, gender, language } = await req.json();
    const ELEVENLABS_API_KEY = Deno.env.get('ELEVENLABS_API_KEY_1') || Deno.env.get('ELEVENLABS_API_KEY');

    if (!ELEVENLABS_API_KEY) {
      console.error('ELEVENLABS_API_KEY is not configured');
      throw new Error('ElevenLabs API key not configured');
    }

    if (!text) {
      throw new Error('Text is required');
    }

    // Select language, gender and voice
    const selectedLanguage: ContentLanguage = language && languagePresets[language as ContentLanguage] 
      ? language as ContentLanguage 
      : 'en';
    const selectedGender: VoiceGender = gender === 'male' ? 'male' : 'female';
    const selectedVoice = voiceId || voiceOptions[selectedLanguage][selectedGender];

    // Select preset based on context or use dailyCoach as default
    const selectedPreset: PresetType = preset && languagePresets[selectedLanguage][preset as PresetType] 
      ? preset as PresetType 
      : 'dailyCoach';
    
    // Get language-specific voice settings
    const voiceSettings = languagePresets[selectedLanguage][selectedPreset];

    console.log(`Generating speech:
      - Text: "${text.substring(0, 60)}..."
      - Voice: ${selectedVoice} (${selectedGender})
      - Language: ${selectedLanguage}
      - Preset: ${selectedPreset}
      - Settings: stability=${voiceSettings.stability}, style=${voiceSettings.style}, speed=${voiceSettings.speed}`);

    // Process text with language-specific enhancements
    const processedText = processTextForLanguage(text, selectedLanguage);

    // Retry with exponential backoff on 429 (ElevenLabs concurrent-request limit is 2)
    const maxAttempts = 5;
    let response: Response | null = null;
    let lastErrorText = '';
    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      response = await fetch(
        `https://api.elevenlabs.io/v1/text-to-speech/${selectedVoice}?output_format=mp3_44100_128`,
        {
          method: 'POST',
          headers: {
            'xi-api-key': ELEVENLABS_API_KEY,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            text: processedText,
            model_id: 'eleven_multilingual_v2',
            voice_settings: {
              stability: voiceSettings.stability,
              similarity_boost: voiceSettings.similarity_boost,
              style: voiceSettings.style,
              use_speaker_boost: true,
              speed: voiceSettings.speed,
            },
          }),
        }
      );

      if (response.ok) break;

      lastErrorText = await response.text();
      console.error(`ElevenLabs API error (attempt ${attempt + 1}):`, response.status, lastErrorText);

      // Retry only on 429 (concurrency) or 5xx
      if (response.status !== 429 && response.status < 500) break;

      // Backoff: 600ms, 1.2s, 2.4s, 4.8s + jitter
      const delay = 600 * Math.pow(2, attempt) + Math.floor(Math.random() * 400);
      await new Promise((r) => setTimeout(r, delay));
    }

    if (!response || !response.ok) {
      throw new Error(`ElevenLabs API error: ${response?.status ?? 'no-response'}`);
    }

    console.log('Successfully generated audio with preset:', selectedPreset, 'for language:', selectedLanguage);
    const audioBuffer = await response.arrayBuffer();

    return new Response(audioBuffer, {
      headers: {
        ...corsHeaders,
        'Content-Type': 'audio/mpeg',
      },
    });
  } catch (error) {
    console.error('Text-to-speech error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      },
    );
  }
});
