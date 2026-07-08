// Generate images via MeshAPI (OpenAI-compatible image endpoint).
// MeshAPI auto-routes to the best available image model when `model: "auto"` is sent.
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface Body {
  prompt: string;
  size?: "1024x1024" | "1024x1536" | "1536x1024" | "auto";
  quality?: "low" | "medium" | "high" | "auto";
  model?: string;
  n?: number;
}

const MESHAPI_URL = "https://api.meshapi.ai/v1/images/generations";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  try {
    const MESHAPI_API_KEY = Deno.env.get("MESHAPI_API_KEY");
    if (!MESHAPI_API_KEY) {
      return new Response(JSON.stringify({ error: "MESHAPI_API_KEY not configured" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const body = (await req.json()) as Body;
    if (!body.prompt) {
      return new Response(JSON.stringify({ error: "prompt is required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const res = await fetch(MESHAPI_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${MESHAPI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: body.model || "openai/gpt-image-1-mini",
        prompt: body.prompt,
        size: body.size || "1024x1536",
        quality: body.quality || "medium",
        n: body.n || 1,
        response_format: "b64_json",
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error("MeshAPI image error", res.status, errText);
      return new Response(JSON.stringify({ error: `MeshAPI ${res.status}: ${errText}` }), {
        status: res.status,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const json = await res.json();
    // MeshAPI returns OpenAI-compatible shape: { data: [{ b64_json | url }] }
    const first = json?.data?.[0];
    let b64: string | undefined = first?.b64_json;

    // If provider returned a URL instead of b64, fetch and inline it.
    if (!b64 && first?.url) {
      const imgRes = await fetch(first.url);
      if (imgRes.ok) {
        const buf = new Uint8Array(await imgRes.arrayBuffer());
        let bin = "";
        for (let i = 0; i < buf.length; i++) bin += String.fromCharCode(buf[i]);
        b64 = btoa(bin);
      }
    }

    if (!b64) {
      return new Response(JSON.stringify({ error: "No image returned", raw: json }), {
        status: 502,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(
      JSON.stringify({
        dataUrl: `data:image/png;base64,${b64}`,
        mimeType: "image/png",
        base64: b64,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (e) {
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
