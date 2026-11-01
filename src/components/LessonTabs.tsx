"use client";

import { useEffect, useRef } from "react";
import { Check, Lock } from "lucide-react";
import { formatCompact } from "@/lib/time";
import type { Lesson } from "@/types";

interface LessonTabsProps {
  lessons: Lesson[];
  completedLessonIds: string[];
  viewedLessonId: string;
  onSelect: (lessonId: string) => void;
}

/** Horizontal pills on mobile, vertical playlist card on desktop. */
export default function LessonTabs({
  lessons,
  completedLessonIds,
  viewedLessonId,
  onSelect,
}: LessonTabsProps) {
  const activeRef = useRef<HTMLButtonElement>(null);
  // Lessons unlock in order: everything up to the first incomplete one.
  const firstOpen = lessons.findIndex(
    (l) => !completedLessonIds.includes(l.id),
  );
  const unlockedIndex = firstOpen === -1 ? lessons.length - 1 : firstOpen;

  useEffect(() => {
    activeRef.current?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  }, [viewedLessonId]);

  return (
    <nav
      aria-label="שיעורים"
      className="rounded-2xl border border-zinc-200/70 bg-white p-3 shadow-[0_4px_20px_rgba(0,0,0,0.03)] lg:p-5"
    >
      <h2 className="mb-4 hidden text-sm font-semibold text-zinc-900 lg:block">
        רשימת שיעורים
      </h2>
      <div className="flex snap-x gap-2 overflow-x-auto [scrollbar-width:none] lg:flex-col lg:overflow-visible [&::-webkit-scrollbar]:hidden">
        {lessons.map((lesson, i) => {
          const done = completedLessonIds.includes(lesson.id);
          const locked = !done && i > unlockedIndex;
          const selected = lesson.id === viewedLessonId;
          return (
            <button
              key={lesson.id}
              ref={selected ? activeRef : undefined}
              type="button"
              disabled={locked}
              aria-current={selected ? "step" : undefined}
              onClick={() => onSelect(lesson.id)}
              className={`flex shrink-0 snap-center items-center gap-1.5 whitespace-nowrap rounded-full border px-3.5 py-2 text-xs font-semibold tabular-nums transition-colors lg:w-full lg:gap-2 lg:rounded-xl lg:px-4 lg:py-3 lg:text-sm ${
                selected
                  ? "border-zinc-900 bg-zinc-900 text-white"
                  : locked
                    ? "cursor-not-allowed border-zinc-200/70 bg-zinc-50 text-zinc-400"
                    : "border-zinc-200 bg-white text-zinc-700 hover:border-zinc-300"
              }`}
            >
              {done && <Check className="h-3.5 w-3.5" strokeWidth={3} />}
              {locked && <Lock className="h-3.5 w-3.5" />}
              <span>
                שיעור {i + 1}: {lesson.shortTitle}
              </span>
              <span
                className={`lg:ms-auto ${selected ? "text-zinc-300" : "text-zinc-400"}`}
              >
                • {formatCompact(lesson.videoSeconds)} דק&apos;
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
