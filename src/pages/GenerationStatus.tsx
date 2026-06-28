import { useMemo } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Image as ImageIcon, Volume2, CheckCircle2, Clock } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import narrationManifest from "@/data/narrationManifest.json";
import slideImageManifest from "@/data/slideImageManifest.json";
import progress from "@/data/generationProgress.json";
import { daySessions } from "@/data/sessionModules";
import { localizedNarrations } from "@/data/sessionNarrationLocalized";

function expectedAudioCount() {
  let n = 0;
  for (const day of daySessions) {
    for (const mod of day.modules) {
      const slides = (mod as any).content?.slides ?? [];
      for (const s of slides) if ((s.narration || s.content || "").trim()) n++;
    }
  }
  for (const lang of ["hi", "zh", "de"] as const) {
    n += Object.values(localizedNarrations[lang] || {}).filter((t) => (t || "").trim()).length;
  }
  return n;
}

function expectedImageCount() {
  let n = 0;
  for (const day of daySessions) {
    for (const mod of day.modules) {
      const slides = (mod as any).content?.slides ?? [];
      n += slides.length;
    }
  }
  return n;
}

function formatTime(iso: string | null) {
  if (!iso) return "Never";
  const d = new Date(iso);
  const diff = Date.now() - d.getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins} min ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours} hr ago`;
  return d.toLocaleString();
}

export default function GenerationStatus() {
  const audioExpected = useMemo(expectedAudioCount, []);
  const imageExpected = useMemo(expectedImageCount, []);

  const audioDone = Object.keys(narrationManifest as Record<string, string>).length;
  const imageDone = Object.keys(slideImageManifest as Record<string, string>).length;

  const audioPct = Math.min(100, Math.round((audioDone / Math.max(1, audioExpected)) * 100));
  const imagePct = Math.min(100, Math.round((imageDone / Math.max(1, imageExpected)) * 100));

  const perLang = (progress as any).audio?.perLang ?? { en: 0, hi: 0, zh: 0, de: 0 };

  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="border-b sticky top-0 bg-background/95 backdrop-blur z-10">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center gap-3">
          <Button variant="ghost" size="icon" asChild>
            <Link to="/settings"><ArrowLeft className="h-5 w-5" /></Link>
          </Button>
          <h1 className="text-lg font-semibold">Content Generation</h1>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-6 space-y-5">
        <Card className="p-5 space-y-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10"><Volume2 className="h-5 w-5 text-primary" /></div>
              <div>
                <h2 className="font-semibold">Audio narration</h2>
                <p className="text-xs text-muted-foreground">Pre-generated MP3s served from CDN</p>
              </div>
            </div>
            {audioPct === 100 && <CheckCircle2 className="h-5 w-5 text-success" />}
          </div>
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span>{audioDone} of {audioExpected} clips</span>
              <span className="font-medium">{audioPct}%</span>
            </div>
            <Progress value={audioPct} />
          </div>
          <div className="grid grid-cols-4 gap-2 text-center">
            {(["en", "hi", "zh", "de"] as const).map((l) => (
              <div key={l} className="rounded-lg bg-muted/40 py-2">
                <div className="text-xs uppercase text-muted-foreground">{l}</div>
                <div className="text-sm font-semibold">{perLang[l] ?? 0}</div>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Clock className="h-3.5 w-3.5" />
            Last updated {formatTime((progress as any).audio?.updatedAt ?? null)}
          </div>
        </Card>

        <Card className="p-5 space-y-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-secondary/10"><ImageIcon className="h-5 w-5 text-secondary-foreground" /></div>
              <div>
                <h2 className="font-semibold">Slide imagery</h2>
                <p className="text-xs text-muted-foreground">Cinematic visuals generated per slide</p>
              </div>
            </div>
            {imagePct === 100 && <CheckCircle2 className="h-5 w-5 text-success" />}
          </div>
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span>{imageDone} of {imageExpected} images</span>
              <span className="font-medium">{imagePct}%</span>
            </div>
            <Progress value={imagePct} />
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Clock className="h-3.5 w-3.5" />
            Last updated {formatTime((progress as any).images?.updatedAt ?? null)}
          </div>
        </Card>

        <Card className="p-4 text-xs text-muted-foreground leading-relaxed">
          Regeneration runs server-side using your OpenAI key. Counts above reflect the latest committed manifest — refresh after a new generation run completes.
        </Card>
      </main>
    </div>
  );
}
