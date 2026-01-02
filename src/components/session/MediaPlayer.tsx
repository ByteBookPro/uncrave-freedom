import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Play, Pause, Volume2, VolumeX, Maximize2, RotateCcw } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { cn } from '@/lib/utils';

interface MediaPlayerProps {
  src?: string;
  poster?: string;
  transcript?: string;
  autoPlay?: boolean;
  onProgress?: (currentTime: number, duration: number) => void;
  onComplete?: () => void;
  title?: string;
  type?: 'video' | 'audio';
}

export function MediaPlayer({
  src,
  poster,
  transcript,
  autoPlay = false,
  onProgress,
  onComplete,
  title,
  type = 'video'
}: MediaPlayerProps) {
  const mediaRef = useRef<HTMLVideoElement | HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [showTranscript, setShowTranscript] = useState(false);
  const [hasEnded, setHasEnded] = useState(false);

  useEffect(() => {
    const media = mediaRef.current;
    if (!media) return;

    const handleTimeUpdate = () => {
      setCurrentTime(media.currentTime);
      onProgress?.(media.currentTime, media.duration);
    };

    const handleLoadedMetadata = () => {
      setDuration(media.duration);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setHasEnded(true);
      onComplete?.();
    };

    media.addEventListener('timeupdate', handleTimeUpdate);
    media.addEventListener('loadedmetadata', handleLoadedMetadata);
    media.addEventListener('ended', handleEnded);

    return () => {
      media.removeEventListener('timeupdate', handleTimeUpdate);
      media.removeEventListener('loadedmetadata', handleLoadedMetadata);
      media.removeEventListener('ended', handleEnded);
    };
  }, [onProgress, onComplete]);

  const togglePlay = () => {
    const media = mediaRef.current;
    if (!media) return;

    if (isPlaying) {
      media.pause();
    } else {
      media.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (value: number[]) => {
    const media = mediaRef.current;
    if (!media) return;
    media.currentTime = value[0];
    setCurrentTime(value[0]);
  };

  const toggleMute = () => {
    const media = mediaRef.current;
    if (!media) return;
    media.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleReplay = () => {
    const media = mediaRef.current;
    if (!media) return;
    media.currentTime = 0;
    media.play();
    setIsPlaying(true);
    setHasEnded(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  // If no src, show placeholder with transcript
  if (!src) {
    return (
      <div className="w-full rounded-2xl overflow-hidden bg-gradient-to-br from-primary/20 to-freedom/20">
        <div className="aspect-video flex items-center justify-center p-8">
          <div className="text-center space-y-4">
            <div className="w-20 h-20 rounded-full gradient-hero mx-auto flex items-center justify-center shadow-glow">
              <Play className="w-8 h-8 text-primary-foreground ml-1" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">{title || 'Media Content'}</h3>
              <p className="text-sm text-muted-foreground mt-1">Video content coming soon</p>
            </div>
          </div>
        </div>
        
        {transcript && (
          <div className="p-4 bg-card/80 backdrop-blur border-t border-border">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setShowTranscript(!showTranscript)}
              className="mb-2"
            >
              {showTranscript ? 'Hide' : 'Show'} Transcript
            </Button>
            {showTranscript && (
              <div className="max-h-48 overflow-y-auto text-sm text-muted-foreground leading-relaxed animate-fade-in">
                {transcript}
              </div>
            )}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="w-full rounded-2xl overflow-hidden bg-black shadow-card">
      {/* Media element */}
      <div className="relative aspect-video bg-black">
        {type === 'video' ? (
          <video
            ref={mediaRef as React.RefObject<HTMLVideoElement>}
            src={src}
            poster={poster}
            className="w-full h-full object-cover"
            autoPlay={autoPlay}
            playsInline
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center gradient-hero">
            <audio
              ref={mediaRef as React.RefObject<HTMLAudioElement>}
              src={src}
              autoPlay={autoPlay}
            />
            <div className="text-center text-primary-foreground">
              <Volume2 className="w-16 h-16 mx-auto mb-4 animate-pulse-soft" />
              <p className="font-medium">{title || 'Audio Playing'}</p>
            </div>
          </div>
        )}

        {/* Play overlay when paused */}
        {!isPlaying && !hasEnded && (
          <button
            onClick={togglePlay}
            className="absolute inset-0 flex items-center justify-center bg-black/30 transition-opacity hover:bg-black/40"
          >
            <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur flex items-center justify-center">
              <Play className="w-10 h-10 text-white ml-1" />
            </div>
          </button>
        )}

        {/* Replay overlay when ended */}
        {hasEnded && (
          <button
            onClick={handleReplay}
            className="absolute inset-0 flex items-center justify-center bg-black/50"
          >
            <div className="text-center text-white">
              <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur flex items-center justify-center mx-auto mb-2">
                <RotateCcw className="w-8 h-8" />
              </div>
              <p className="font-medium">Replay</p>
            </div>
          </button>
        )}
      </div>

      {/* Controls */}
      <div className="p-4 bg-card space-y-3">
        {/* Progress bar */}
        <div className="space-y-1">
          <Slider
            value={[currentTime]}
            max={duration || 100}
            step={0.1}
            onValueChange={handleSeek}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Control buttons */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={togglePlay}
              className="h-10 w-10"
            >
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMute}
              className="h-10 w-10"
            >
              {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </Button>
          </div>

          <div className="flex items-center gap-2">
            {transcript && (
              <Button
                variant={showTranscript ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setShowTranscript(!showTranscript)}
              >
                CC
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Transcript */}
      {transcript && showTranscript && (
        <div className="p-4 bg-muted/50 border-t border-border animate-fade-in">
          <div className="max-h-32 overflow-y-auto text-sm text-muted-foreground leading-relaxed">
            {transcript}
          </div>
        </div>
      )}
    </div>
  );
}
