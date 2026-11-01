"use client";

import { Play, Search, X } from "lucide-react";
import CourseCard from "./CourseCard";
import QuickFixSection from "./QuickFixSection";
import { CATEGORIES } from "@/data/categories";
import { COURSES } from "@/data/courses";
import { QUICK_FIXES } from "@/data/quickfixes";
import { TRAINERS } from "@/data/trainers";
import type { ContinueTarget } from "@/lib/progress";
import type { Course, QuickFix } from "@/types";

export const ALL_FILTER = "all";

interface CategoryExplorerProps {
  dogName: string;
  completedLessonIds: string[];
  continueTarget: ContinueTarget | null;
  selectedCategoryId: string;
  filter: string;
  query: string;
  onSelectCategory: (categoryId: string) => void;
  onFilterChange: (filter: string) => void;
  onQueryChange: (query: string) => void;
  onOpenCourse: (courseId: string, lessonId?: string) => void;
  onOpenQuickFix: (fixId: string) => void;
}

function courseMatches(course: Course, q: string): boolean {
  const trainer = TRAINERS.find((t) => t.id === course.trainerId);
  const category = CATEGORIES.find((c) => c.id === course.categoryId);
  const haystack = [
    course.title,
    course.approach,
    course.approachBadge,
    trainer?.name,
    trainer?.specialty,
    category?.title,
    category?.topics,
    ...course.lessons.flatMap((l) => [l.title, l.shortTitle, l.description]),
  ];
  return haystack.some((t) => t?.toLowerCase().includes(q));
}

function fixMatches(fix: QuickFix, q: string): boolean {
  const trainer = TRAINERS.find((t) => t.id === fix.trainerId);
  return [fix.title, fix.description, trainer?.name].some((t) =>
    t?.toLowerCase().includes(q),
  );
}

export default function CategoryExplorer({
  dogName,
  completedLessonIds,
  continueTarget,
  selectedCategoryId,
  filter,
  query,
  onSelectCategory,
  onFilterChange,
  onQueryChange,
  onOpenCourse,
  onOpenQuickFix,
}: CategoryExplorerProps) {
  const q = query.trim().toLowerCase();
  const searching = q.length > 0;
  const inFilter = (categoryId: string) =>
    filter === ALL_FILTER || filter === categoryId;

  const visibleCategories = CATEGORIES.filter((c) => inFilter(c.id));
  const category =
    visibleCategories.find((c) => c.id === selectedCategoryId) ??
    visibleCategories[0];

  const resultCourses = COURSES.filter(
    (c) => inFilter(c.categoryId) && courseMatches(c, q),
  );
  const visibleFixes = QUICK_FIXES.filter(
    (f) => inFilter(f.categoryId) && (!searching || fixMatches(f, q)),
  );
  const categoryCourses = COURSES.filter((c) => c.categoryId === category.id);

  const heroTrainer = continueTarget
    ? TRAINERS.find((t) => t.id === continueTarget.course.trainerId)
    : undefined;

  return (
    <div>
      <header className="md:text-center">
        <p className="text-xs text-zinc-500">אילוף של {dogName}</p>
        <h1 className="mt-1 text-2xl font-bold leading-snug">
          במה נתרגל היום?
        </h1>

        <div className="relative mx-auto mt-5 max-w-2xl">
          <Search className="pointer-events-none absolute start-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
          <input
            type="search"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="חיפוש תרגיל, התנהגות או מאלף..."
            aria-label="חיפוש"
            className="w-full rounded-xl border border-zinc-200 bg-white py-3 pe-10 ps-10 text-sm text-zinc-900 transition-all placeholder:text-zinc-400 focus:border-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900/10 [&::-webkit-search-cancel-button]:hidden"
          />
          {query && (
            <button
              type="button"
              onClick={() => onQueryChange("")}
              aria-label="ניקוי חיפוש"
              className="absolute end-2 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-lg text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        <div
          role="group"
          aria-label="סינון לפי נושא"
          className="-mx-4 mt-3 flex gap-2 overflow-x-auto px-4 [scrollbar-width:none] md:mx-0 md:flex-wrap md:justify-center md:overflow-visible md:px-0 [&::-webkit-scrollbar]:hidden"
        >
          {[{ id: ALL_FILTER, label: "הכל" }]
            .concat(CATEGORIES.map((c) => ({ id: c.id, label: c.chipLabel })))
            .map((chip) => {
              const selected = filter === chip.id;
              return (
                <button
                  key={chip.id}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => onFilterChange(chip.id)}
                  className={`shrink-0 whitespace-nowrap rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                    selected
                      ? "border-zinc-900 bg-zinc-900 text-white"
                      : "border-zinc-200 bg-white text-zinc-700 hover:border-zinc-300"
                  }`}
                >
                  {chip.label}
                </button>
              );
            })}
        </div>
      </header>

      <main className="pt-6 lg:pt-8">
        {!searching && continueTarget && (
          <section
            aria-label="המשך אימון"
            className="mb-8 rounded-2xl bg-zinc-900 p-5 text-white shadow-[0_8px_24px_rgba(0,0,0,0.12)] md:flex md:items-center md:justify-between md:gap-8 md:p-6"
          >
            <div className="flex items-center gap-3">
              {heroTrainer && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={heroTrainer.avatarUrl}
                  alt={heroTrainer.name}
                  width={48}
                  height={48}
                  className="h-12 w-12 shrink-0 rounded-full border border-white/20 object-cover"
                />
              )}
              <div className="min-w-0">
                <h2 className="text-base font-bold leading-snug">
                  ממשיכים לתרגל עם {dogName}
                </h2>
                <p className="mt-0.5 truncate text-xs text-zinc-400">
                  {heroTrainer?.name} • {continueTarget.course.title}
                </p>
              </div>
            </div>
            <div className="mt-4 md:mt-0 md:flex-1 md:text-start">
              <p className="text-sm text-zinc-300">שיעור הבא</p>
              <p className="mt-0.5 text-lg font-semibold">
                {continueTarget.lesson.title}
              </p>
            </div>
            <button
              type="button"
              onClick={() =>
                onOpenCourse(continueTarget.course.id, continueTarget.lesson.id)
              }
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-white py-3 md:mt-0 md:w-auto md:shrink-0 md:px-8 text-sm font-semibold text-zinc-900 transition-all duration-200 hover:bg-zinc-100 active:scale-[0.99]"
            >
              <Play className="h-4 w-4 fill-zinc-900" />
              המשך שיעור
            </button>
          </section>
        )}

        {searching ? (
          <section aria-label="תוצאות חיפוש">
            <h2 className="text-base font-bold">תוצאות חיפוש</h2>
            {resultCourses.length === 0 && visibleFixes.length === 0 ? (
              <p className="mt-4 rounded-2xl border border-zinc-200/70 bg-white p-5 text-sm text-zinc-500">
                לא נמצאו תוצאות עבור &quot;{query.trim()}&quot;. נסה מילה אחרת
                או בחר &quot;הכל&quot; בסינון.
              </p>
            ) : (
              <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-2">
                {resultCourses.map((course) => (
                  <CourseCard
                    key={course.id}
                    course={course}
                    completedLessonIds={completedLessonIds}
                    categoryLabel={
                      CATEGORIES.find((c) => c.id === course.categoryId)?.title
                    }
                    onOpen={() => onOpenCourse(course.id)}
                  />
                ))}
              </div>
            )}
          </section>
        ) : (
          <>
            <section aria-label="נושאי אילוף">
              <div
                className={`grid gap-3 ${
                  visibleCategories.length === 1
                    ? "grid-cols-1"
                    : "grid-cols-1 sm:grid-cols-2 md:grid-cols-4 md:gap-4"
                }`}
              >
                {visibleCategories.map((c) => {
                  const selected = c.id === category.id;
                  const Icon = c.icon;
                  return (
                    <button
                      key={c.id}
                      type="button"
                      aria-pressed={selected}
                      onClick={() => onSelectCategory(c.id)}
                      className={`flex flex-col items-start gap-3 rounded-2xl border p-4 text-start transition-all duration-200 active:scale-[0.99] ${
                        selected
                          ? "border-zinc-900 bg-zinc-900 text-white shadow-[0_8px_24px_rgba(0,0,0,0.12)]"
                          : "border-zinc-200/70 bg-white shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:border-zinc-300"
                      }`}
                    >
                      <span
                        className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                          selected
                            ? "bg-white/15 text-white"
                            : "bg-zinc-100 text-zinc-700"
                        }`}
                      >
                        <Icon className="h-5 w-5" />
                      </span>
                      <span>
                        <span className="block text-sm font-bold leading-snug">
                          {c.title}
                        </span>
                        <span
                          className={`mt-1 block text-xs leading-relaxed ${
                            selected ? "text-zinc-300" : "text-zinc-500"
                          }`}
                        >
                          {c.topics}
                        </span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </section>

            <section className="mt-8" aria-label="מאלפים בנושא">
              <h2 className="text-lg font-bold">{category.title}</h2>
              <p className="mt-1 text-sm text-zinc-500">
                {category.description} בחר מאלף לפי השיטה שמתאימה לך ולכלב.
              </p>
              <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-2">
                {categoryCourses.map((course) => (
                  <CourseCard
                    key={course.id}
                    course={course}
                    completedLessonIds={completedLessonIds}
                    onOpen={() => onOpenCourse(course.id)}
                  />
                ))}
              </div>
            </section>
          </>
        )}

        <QuickFixSection fixes={visibleFixes} onOpen={onOpenQuickFix} />
      </main>
    </div>
  );
}
