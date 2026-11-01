import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Category, Course, Trainer } from "@/types";

interface CourseHeaderProps {
  category: Category;
  course: Course;
  trainer?: Trainer;
  onBack: () => void;
}

export default function CourseHeader({
  category,
  course,
  trainer,
  onBack,
}: CourseHeaderProps) {
  return (
    <header className="flex items-center gap-2 rounded-2xl border border-zinc-200/70 bg-white px-3 py-3 shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
      <button
        type="button"
        onClick={onBack}
        aria-label="חזרה לנושאים"
        className="flex h-10 shrink-0 items-center gap-0.5 rounded-lg px-2 text-xs font-semibold text-zinc-700 hover:bg-zinc-100"
      >
        <ChevronRight className="h-5 w-5" />
        נושאים
      </button>
      <div className="min-w-0 flex-1">
        <p className="flex items-center gap-1 truncate text-xs text-zinc-500">
          {category.title}
          <ChevronLeft className="h-3 w-3 shrink-0" />
        </p>
        <div className="mt-0.5 flex items-center gap-2">
          <span className="truncate text-sm font-bold">{trainer?.name}</span>
          <span className="shrink-0 rounded-full bg-zinc-100 px-2.5 py-1 text-xs font-medium text-zinc-700">
            {course.approachBadge}
          </span>
        </div>
      </div>
      {trainer && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={trainer.avatarUrl}
          alt=""
          width={36}
          height={36}
          className="h-9 w-9 shrink-0 rounded-full border border-zinc-200/70 object-cover"
        />
      )}
    </header>
  );
}
