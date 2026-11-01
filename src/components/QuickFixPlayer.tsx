"use client";

import { ChevronRight } from "lucide-react";
import VideoPlayer from "./VideoPlayer";
import { TRAINERS } from "@/data/trainers";
import { CATEGORY_THUMBNAILS } from "@/lib/thumbnails";
import type { QuickFix } from "@/types";

interface QuickFixPlayerProps {
  fix: QuickFix;
  onBack: () => void;
}

export default function QuickFixPlayer({ fix, onBack }: QuickFixPlayerProps) {
  const trainer = TRAINERS.find((t) => t.id === fix.trainerId);

  return (
    <div>
      <header className="flex items-center gap-2 rounded-2xl border border-zinc-200/70 bg-white px-3 py-3 shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
        <button
          type="button"
          onClick={onBack}
          aria-label="חזרה למרכז הלמידה"
          className="flex h-10 shrink-0 items-center gap-0.5 rounded-lg px-2 text-xs font-semibold text-zinc-700 hover:bg-zinc-100"
        >
          <ChevronRight className="h-5 w-5" />
          חזרה
        </button>
        <div className="min-w-0 flex-1">
          <p className="text-xs text-zinc-500">מענה מהיר</p>
          <p className="truncate text-sm font-bold">{trainer?.name}</p>
        </div>
      </header>

      <main className="mt-4 flex flex-col gap-4 lg:mt-6 lg:grid lg:grid-cols-12 lg:items-start lg:gap-8">
        <section className="rounded-2xl border border-zinc-200/70 bg-white p-5 shadow-[0_4px_20px_rgba(0,0,0,0.03)] lg:col-span-8">
          <h1 className="text-xl font-bold tracking-tight">{fix.title}</h1>
          <p className="mb-4 mt-1 text-sm leading-relaxed text-zinc-500">
            {fix.description}
          </p>
          <VideoPlayer
            title={fix.videoTitle}
            totalSeconds={fix.videoSeconds}
            thumbnailUrl={CATEGORY_THUMBNAILS[fix.categoryId]}
          />
        </section>

        <section className="rounded-2xl border border-zinc-200/70 bg-white p-5 shadow-[0_4px_20px_rgba(0,0,0,0.03)] lg:col-span-4">
          <h2 className="text-sm font-semibold">3 צעדים ליישום מיידי</h2>
          <ol className="mt-4 flex flex-col gap-4">
            {fix.steps.map((step, i) => (
              <li key={step} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-zinc-100 text-xs font-semibold tabular-nums text-zinc-800">
                  {i + 1}
                </span>
                <p className="text-[15px] leading-7 text-zinc-700">{step}</p>
              </li>
            ))}
          </ol>
        </section>

        <button
          type="button"
          onClick={onBack}
          className="w-full rounded-xl bg-zinc-900 py-4 lg:col-span-8 lg:col-start-1 text-base font-semibold text-white shadow-[0_8px_24px_rgba(0,0,0,0.15)] transition-all duration-200 hover:bg-zinc-800 active:scale-[0.99]"
        >
          חזרה למרכז הלמידה
        </button>
      </main>
    </div>
  );
}
