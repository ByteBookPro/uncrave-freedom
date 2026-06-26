// Generate text (slide copy, summaries, reframes) via the user's Gemini API key.
import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors';

const GEMINI_API_KEY = Deno.env.get('GEMINI_API_KEY');

interface Body {
  prompt: string;
  system?: string;
  model?: string;
  json?: boolean;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  try {
    if (!GEMINI_API_KEY) {
      return new Response(JSON.stringify({ error: 'GEMINI_API_KEY not configured' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const body = (await req.json()) as Body;
    if (!body.prompt) {
      return new Response(JSON.stringify({ error: 'prompt is required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const model = body.model || 'gemini-2.5-flash';
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${GEMINI_API_KEY}`;

    const payload: any = {
      contents: [{ role: 'user', parts: [{ text: body.prompt }] }],
      generationConfig: {} as Record<string, unknown>,
    };
    if (body.system) {
      payload.systemInstruction = { parts: [{ text: body.system }] };
    }
    if (body.json) {
      payload.generationConfig.responseMimeType = 'application/json';
    }

    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const errText = await res.text();
      return new Response(JSON.stringify({ error: `Gemini ${res.status}: ${errText}` }), {
        status: res.status,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const json = await res.json();
    const text =
      json?.candidates?.[0]?.content?.parts?.map((p: any) => p.text).filter(Boolean).join('\n') ?? '';

    return new Response(JSON.stringify({ text, raw: json }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : 'Unknown error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
