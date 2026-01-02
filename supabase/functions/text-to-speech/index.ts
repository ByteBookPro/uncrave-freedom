import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Voice presets optimized for psychological impact in behavior change content
// Based on research: warm mezzo-soprano/baritone, variable pacing, context-aware settings
const voicePresets = {
  // Default daily coach - warm, steady, supportive
  dailyCoach: {
    stability: 0.52,           // 45-60 range: stable but not robotic
    similarity_boost: 0.82,    // 75-90 range: consistent voice
    style: 0.28,               // 20-35 range: warm emotion, not theatrical
    speed: 0.97,               // ~0.95-1.00: natural pace
  },
  // Motivation lift - end of modules, pledges, breakthroughs
  motivationLift: {
    stability: 0.42,           // 35-50 range: slightly more expressive
    similarity_boost: 0.85,
    style: 0.38,               // 30-45 range: more energy
    speed: 1.02,               // 1.00-1.05: slightly faster, brighter
  },
  // Craving emergency / urge surfing - calm, grounding
  cravingEmergency: {
    stability: 0.68,           // 60-75 range: extra steady
    similarity_boost: 0.80,
    style: 0.18,               // 10-25 range: calm, minimal expression
    speed: 0.90,               // 0.88-0.95: slower, more pauses
  },
  // Story / explanation - engaging narrative
  story: {
    stability: 0.48,
    similarity_boost: 0.85,
    style: 0.32,               // Warm storytelling
    speed: 0.95,               // 145-165 wpm equivalent
  },
  // Guided breathing / meditation
  guided: {
    stability: 0.72,           // Very steady for breathing exercises
    similarity_boost: 0.78,
    style: 0.15,               // Minimal, calming
    speed: 0.88,               // 110-135 wpm equivalent
  },
};

// Voice options - warm, supportive voices
const voiceOptions = {
  // Primary: Sarah - warm mezzo-soprano, neutral accent, supportive
  female: 'EXAVITQu4vr4xnSDxMaL',  // Sarah
  // Alternative: George - warm baritone, calm, authoritative
  male: 'JBFqnCBsd6RMkjVDRZzb',    // George
  // Backup voices
  femaleAlt: 'XrExE9yKIg1WjnnlVkGX', // Matilda - warm, nurturing
  maleAlt: 'onwK4e9ZLuTAKqWW03F9',   // Daniel - calm, reassuring
};

type VoicePreset = keyof typeof voicePresets;
type VoiceGender = 'female' | 'male';

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { text, voiceId, preset, gender } = await req.json();
    const ELEVENLABS_API_KEY = Deno.env.get('ELEVENLABS_API_KEY_1') || Deno.env.get('ELEVENLABS_API_KEY');

    if (!ELEVENLABS_API_KEY) {
      console.error('ELEVENLABS_API_KEY is not configured');
      throw new Error('ElevenLabs API key not configured');
    }

    if (!text) {
      throw new Error('Text is required');
    }

    // Select voice based on gender preference or use provided voiceId
    const selectedGender: VoiceGender = gender || 'female';
    const selectedVoice = voiceId || voiceOptions[selectedGender];

    // Select preset based on context or use dailyCoach as default
    const selectedPreset: VoicePreset = preset && voicePresets[preset as VoicePreset] 
      ? preset as VoicePreset 
      : 'dailyCoach';
    const voiceSettings = voicePresets[selectedPreset];

    console.log(`Generating speech:
      - Text: "${text.substring(0, 60)}..."
      - Voice: ${selectedVoice} (${selectedGender})
      - Preset: ${selectedPreset}
      - Settings: stability=${voiceSettings.stability}, style=${voiceSettings.style}, speed=${voiceSettings.speed}`);

    // Process text to enhance pauses for psychological impact
    // Add micro-pauses around key phrases and ensure proper breathing room
    const processedText = text
      // Ensure ellipses create longer pauses
      .replace(/\.{3,}/g, '... ')
      // Add subtle pause after "Here's the truth" type phrases
      .replace(/(Here's the (?:truth|secret|thing)[.:])(\s)/gi, '$1...$2')
      .replace(/(But here's what)/gi, '... $1')
      .replace(/(And that's)/gi, '... $1');

    const response = await fetch(
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

    if (!response.ok) {
      const errorText = await response.text();
      console.error('ElevenLabs API error:', response.status, errorText);
      throw new Error(`ElevenLabs API error: ${response.status}`);
    }

    console.log('Successfully generated audio with preset:', selectedPreset);
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
