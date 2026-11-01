"use client";

import LessonTabs from "./LessonTabs";
import PracticeTimer from "./PracticeTimer";
import Troubleshooting from "./Troubleshooting";
import VideoPlayer from "./VideoPlayer";
import { TROUBLESHOOTING } from "@/data/troubleshooting";
import { CATEGORY_THUMBNAILS } from "@/lib/thumbnails";
import type { Lesson } from "@/types";

interface LessonWorkspaceProps {
  lessons: Lesson[];
  lesson: Lesson;
  categoryId: string;
  completedLessonIds: string[];
  ctaLabel: string;
  onSelectLesson: (lessonId: string) => void;
  onFinish: () => void;
}

const CARD =
  "rounded-2xl border border-zinc-200/70 bg-white p-5 shadow-[0_4px_20px_rgba(0,0,0,0.03)]";

/**
 * Mobile: one column ordered playlist, video, takeaways, timer.
 * Desktop (lg): 8/4 split, video + takeaways on the main side, playlist +
 * timer on a sticky sidebar. The wrappers use `contents` on mobile so the
 * `order-*` utilities reach across them.
 */
export default function LessonWorkspace({
  lessons,
  lesson,
  categoryId,
  completedLessonIds,
  ctaLabel,
  onSelectLesson,
  onFinish,
}: LessonWorkspaceProps) {
  return (
    <div className="mt-4 flex flex-col gap-4 pb-24 lg:mt-6 lg:grid lg:grid-cols-12 lg:items-start lg:gap-8 lg:pb-0">
      <div className="contents lg:col-span-8 lg:flex lg:flex-col lg:gap-4">
        <section className={`${CARD} order-2 lg:order-none`}>
          <h1 className="text-xl font-bold tracking-tight text-zinc-900">
            {lesson.title}
          </h1>
          <p className="mb-4 mt-1 text-sm leading-relaxed text-zinc-500">
            {lesson.description}
          </p>
          <VideoPlayer
            key={lesson.id}
            title={lesson.videoTitle}
            totalSeconds={lesson.videoSeconds}
            thumbnailUrl={CATEGORY_THUMBNAILS[categoryId]}
          />
        </section>

        <section className={`${CARD} order-3 lg:order-none`}>
          <h2 className="text-sm font-semibold text-zinc-900">
            3 דגשים לתרגול מיידי
          </h2>
          <ol className="mt-4 flex flex-col gap-4">
            {lesson.rules.map((rule, i) => (
              <li key={rule} className="flex items-start gap-3">
                <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-zinc-100 text-xs font-semibold tabular-nums text-zinc-800">
                  {i + 1}
                </span>
                <p className="text-[15px] leading-7 text-zinc-700">{rule}</p>
              </li>
            ))}
          </ol>
        </section>

        {TROUBLESHOOTING[lesson.id] && (
          <div className="order-3 lg:order-none">
            <Troubleshooting
              key={lesson.id}
              tips={TROUBLESHOOTING[lesson.id]}
            />
          </div>
        )}

        <div className="pointer-events-none fixed inset-x-0 bottom-0 z-20 order-5 bg-linear-to-t from-slate-50 via-slate-50 to-transparent px-4 pb-5 pt-6 sm:px-6 lg:pointer-events-auto lg:static lg:order-none lg:bg-none lg:p-0">
          <button
            type="button"
            onClick={onFinish}
            className="pointer-events-auto mx-auto block w-full max-w-xl rounded-xl bg-zinc-900 py-4 text-base font-semibold text-white shadow-[0_8px_24px_rgba(0,0,0,0.15)] transition-all duration-200 hover:bg-zinc-800 active:scale-[0.99] lg:max-w-none"
          >
            {ctaLabel}
          </button>
        </div>
      </div>

      <aside className="contents lg:sticky lg:top-6 lg:col-span-4 lg:flex lg:flex-col lg:gap-4">
        <div className="order-1 lg:order-none">
          <LessonTabs
            lessons={lessons}
            completedLessonIds={completedLessonIds}
            viewedLessonId={lesson.id}
            onSelect={onSelectLesson}
          />
        </div>
        <section className={`${CARD} order-4 lg:order-none`}>
          <h2 className="mb-4 text-sm font-semibold text-zinc-900">
            טיימר תרגול
          </h2>
          <PracticeTimer
            key={lesson.id}
            durationSeconds={lesson.practiceSeconds}
          />
        </section>
      </aside>
    </div>
  );
}
