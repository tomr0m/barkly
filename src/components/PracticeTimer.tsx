"use client";

import { useEffect, useRef, useState } from "react";
import { Pause, Play, RotateCcw } from "lucide-react";
import { formatClock } from "@/lib/time";

interface PracticeTimerProps {
  durationSeconds: number;
}

export default function PracticeTimer({ durationSeconds }: PracticeTimerProps) {
  const [remaining, setRemaining] = useState(durationSeconds);
  const [running, setRunning] = useState(false);
  const endsAtRef = useRef(0);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      const left = Math.max(
        0,
        Math.ceil((endsAtRef.current - Date.now()) / 1000),
      );
      setRemaining(left);
      if (left === 0) setRunning(false);
    }, 250);
    return () => clearInterval(id);
  }, [running]);

  const start = () => {
    const from = remaining === 0 ? durationSeconds : remaining;
    endsAtRef.current = Date.now() + from * 1000;
    setRemaining(from);
    setRunning(true);
  };

  const reset = () => {
    setRunning(false);
    setRemaining(durationSeconds);
  };

  const finished = remaining === 0;

  return (
    <div>
      <p
        dir="ltr"
        role="timer"
        className={`text-center font-mono text-4xl font-light tracking-tight tabular-nums ${
          finished ? "text-zinc-400" : "text-zinc-900"
        }`}
      >
        {formatClock(remaining)}
      </p>
      <p className="mt-2 text-center text-xs text-zinc-500">
        {finished ? "זמן התרגול הסתיים" : "זמן תרגול עם הכלב"}
      </p>
      <div className="mt-4 flex gap-2">
        <button
          type="button"
          onClick={running ? () => setRunning(false) : start}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-zinc-900 py-3.5 text-base font-semibold text-white transition-all duration-200 hover:bg-zinc-800 active:scale-[0.99]"
        >
          {running ? (
            <>
              <Pause className="h-5 w-5" />
              השהה
            </>
          ) : (
            <>
              <Play className="h-5 w-5" />
              {remaining === durationSeconds ? "התחל תרגול" : "המשך"}
            </>
          )}
        </button>
        <button
          type="button"
          onClick={reset}
          aria-label="איפוס הטיימר"
          className="flex w-14 items-center justify-center rounded-xl border border-zinc-200 text-zinc-700 transition-all duration-200 hover:bg-zinc-50 active:scale-[0.99]"
        >
          <RotateCcw className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
