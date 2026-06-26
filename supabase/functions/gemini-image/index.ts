// Generate or edit images using the user's Gemini API key (Nano Banana).
import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors';

const GEMINI_API_KEY = Deno.env.get('GEMINI_API_KEY');

interface Body {
  prompt: string;
  // Optional input image(s) for editing. Base64 (no data: prefix) or data URL.
  images?: string[];
  // Model override. Defaults to Nano Banana.
  model?: string;
}

function stripDataUrl(b64: string): { data: string; mimeType: string } {
  const m = b64.match(/^data:(.+?);base64,(.*)$/);
  if (m) return { mimeType: m[1], data: m[2] };
  return { mimeType: 'image/png', data: b64 };
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
    if (!body.prompt || typeof body.prompt !== 'string') {
      return new Response(JSON.stringify({ error: 'prompt is required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const model = body.model || 'gemini-2.5-flash-image';
    const parts: any[] = [{ text: body.prompt }];
    if (body.images?.length) {
      for (const img of body.images) {
        const { data, mimeType } = stripDataUrl(img);
        parts.push({ inline_data: { mime_type: mimeType, data } });
      }
    }

    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${GEMINI_API_KEY}`;
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts }],
        generationConfig: { responseModalities: ['IMAGE', 'TEXT'] },
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error('Gemini image error', res.status, errText);
      return new Response(JSON.stringify({ error: `Gemini ${res.status}: ${errText}` }), {
        status: res.status,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const json = await res.json();
    const out = json?.candidates?.[0]?.content?.parts ?? [];
    const imgPart = out.find((p: any) => p.inline_data || p.inlineData);
    const inline = imgPart?.inline_data || imgPart?.inlineData;
    if (!inline?.data) {
      return new Response(JSON.stringify({ error: 'No image returned', raw: json }), {
        status: 502,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    return new Response(
      JSON.stringify({
        dataUrl: `data:${inline.mime_type || inline.mimeType || 'image/png'};base64,${inline.data}`,
        mimeType: inline.mime_type || inline.mimeType || 'image/png',
        base64: inline.data,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    );
  } catch (e) {
    console.error('gemini-image error', e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : 'Unknown error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
