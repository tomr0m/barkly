"use client";

import { useEffect, useState } from "react";
import { Pause, Play } from "lucide-react";
import { formatClock } from "@/lib/time";

interface VideoPlayerProps {
  title: string;
  totalSeconds: number;
  thumbnailUrl?: string;
}

export default function VideoPlayer({
  title,
  totalSeconds,
  thumbnailUrl,
}: VideoPlayerProps) {
  const [playing, setPlaying] = useState(false);
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => {
      setElapsed((e) => {
        if (e + 1 >= totalSeconds) {
          setPlaying(false);
          return totalSeconds;
        }
        return e + 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [playing, totalSeconds]);

  const toggle = () => {
    if (!playing && elapsed >= totalSeconds) setElapsed(0);
    setPlaying((p) => !p);
  };

  const pct = (elapsed / totalSeconds) * 100;

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-zinc-900">
      {thumbnailUrl && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={thumbnailUrl}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}
      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/25 to-black/40" />

      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? "השהיית הווידאו" : "הפעלת הווידאו"}
        className="absolute inset-0 flex items-center justify-center"
      >
        <span
          className={`flex h-14 w-14 items-center justify-center rounded-full border border-white/30 bg-white/20 text-white backdrop-blur-md transition-all duration-200 hover:bg-white/30 active:scale-95 ${
            playing ? "opacity-60" : "opacity-100"
          }`}
        >
          {playing ? (
            <Pause className="h-6 w-6 fill-white" />
          ) : (
            <Play className="h-6 w-6 fill-white" />
          )}
        </span>
      </button>

      <div className="absolute inset-x-0 bottom-0 px-4 pb-3.5">
        <div className="mb-2.5 flex items-center justify-between gap-3">
          <span className="truncate text-xs font-medium text-white/80">
            {title}
          </span>
          <span
            dir="ltr"
            className="shrink-0 rounded-full border border-white/20 bg-black/40 px-2.5 py-0.5 font-mono text-[11px] tabular-nums text-white backdrop-blur-sm"
          >
            {formatClock(elapsed)} / {formatClock(totalSeconds)}
          </span>
        </div>
        <input
          type="range"
          dir="ltr"
          min={0}
          max={totalSeconds}
          step={1}
          value={elapsed}
          onChange={(e) => setElapsed(Number(e.target.value))}
          aria-label="ציר זמן"
          style={{
            background: `linear-gradient(to right, #fff ${pct}%, rgba(255,255,255,0.25) ${pct}%)`,
          }}
          className="block h-[3px] w-full cursor-pointer appearance-none rounded-full [&::-moz-range-thumb]:h-2.5 [&::-moz-range-thumb]:w-2.5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-white [&::-webkit-slider-thumb]:h-2.5 [&::-webkit-slider-thumb]:w-2.5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow"
        />
      </div>
    </div>
  );
}
