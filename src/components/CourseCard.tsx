import { Clock, Gauge } from "lucide-react";
import { TRAINERS } from "@/data/trainers";
import type { Course } from "@/types";

interface CourseCardProps {
  course: Course;
  completedLessonIds: string[];
  categoryLabel?: string;
  onOpen: () => void;
}

const CHIP =
  "inline-flex items-center gap-1 rounded-full bg-zinc-100 px-2.5 py-1 text-xs font-medium text-zinc-700";

export default function CourseCard({
  course,
  completedLessonIds,
  categoryLabel,
  onOpen,
}: CourseCardProps) {
  const trainer = TRAINERS.find((t) => t.id === course.trainerId);
  const total = course.lessons.length;
  const done = course.lessons.filter((l) =>
    completedLessonIds.includes(l.id),
  ).length;
  const minutes = Math.ceil(
    course.lessons.reduce((sum, l) => sum + l.videoSeconds, 0) / 60,
  );
  const finished = done === total;

  return (
    <article className="rounded-2xl border border-zinc-200/70 bg-white p-5 shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
      <div className="flex items-center gap-3">
        {trainer && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={trainer.avatarUrl}
            alt={trainer.name}
            width={48}
            height={48}
            className="h-12 w-12 shrink-0 rounded-full border border-zinc-200/70 object-cover"
          />
        )}
        <div className="min-w-0 flex-1">
          <p className="text-sm font-bold">{trainer?.name}</p>
          <span className="mt-1.5 inline-block rounded-full bg-zinc-100 px-2.5 py-1 text-xs font-medium text-zinc-700">
            {course.approachBadge}
          </span>
        </div>
      </div>

      {categoryLabel && (
        <p className="mt-3 text-xs text-zinc-500">{categoryLabel}</p>
      )}
      <h3 className="mt-3 text-base font-semibold text-zinc-900">
        {course.title}
      </h3>
      <p className="mt-1 text-sm leading-relaxed text-zinc-600">
        {course.approach}
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        <span className={CHIP}>
          <Clock className="h-3.5 w-3.5" />
          {total} שיעורים • {minutes} דקות
        </span>
        <span className={CHIP}>
          <Gauge className="h-3.5 w-3.5" />
          {course.level === "beginner" ? "מתאים למתחילים" : "מתקדם"}
        </span>
      </div>

      <div className="mt-4 flex items-center justify-between gap-3 border-t border-zinc-100 pt-4">
        <span className="text-xs tabular-nums text-zinc-500">
          {finished
            ? "הושלם"
            : done > 0
              ? `${done} מתוך ${total} הושלמו`
              : "טרם התחלת"}
        </span>
        <button
          type="button"
          onClick={onOpen}
          className="rounded-xl bg-zinc-900 px-4 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-zinc-800 active:scale-[0.99]"
        >
          כניסה למסלול זה
        </button>
      </div>
    </article>
  );
}
