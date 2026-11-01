"use client";

import { useState } from "react";
import AppTopBar from "@/components/AppTopBar";
import CategoryExplorer, { ALL_FILTER } from "@/components/CategoryExplorer";
import CourseHeader from "@/components/CourseHeader";
import LessonWorkspace from "@/components/LessonWorkspace";
import Onboarding from "@/components/Onboarding";
import PracticeFeedback from "@/components/PracticeFeedback";
import ProfileDrawer from "@/components/ProfileDrawer";
import QuickFixPlayer from "@/components/QuickFixPlayer";
import { CATEGORIES } from "@/data/categories";
import { COURSES } from "@/data/courses";
import { QUICK_FIXES } from "@/data/quickfixes";
import { TRAINERS } from "@/data/trainers";
import { useTrainingHistory } from "@/hooks/useTrainingHistory";
import { useTrainingState } from "@/hooks/useTrainingState";
import { getContinueTarget } from "@/lib/progress";
import type { FeedbackId } from "@/types";

const TOTAL_LESSONS = COURSES.reduce((n, c) => n + c.lessons.length, 0);

export default function Home() {
  const {
    state,
    isHydrated,
    saveSetup,
    completeLesson,
    renameDog,
    resetProgress,
  } = useTrainingState();
  const { entries, addEntry, clearHistory } = useTrainingHistory();
  const [categoryId, setCategoryId] = useState(CATEGORIES[0].id);
  const [filter, setFilter] = useState(ALL_FILTER);
  const [query, setQuery] = useState("");
  const [courseId, setCourseId] = useState<string | null>(null);
  const [quickFixId, setQuickFixId] = useState<string | null>(null);
  const [viewedLessonId, setViewedLessonId] = useState<string | null>(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const [feedbackOpen, setFeedbackOpen] = useState(false);

  if (!isHydrated) {
    return <div className="min-h-screen" aria-busy="true" />;
  }

  if (!state.isSetupComplete) {
    return <Onboarding onComplete={saveSetup} />;
  }

  const quickFix = QUICK_FIXES.find((f) => f.id === quickFixId);
  const course = COURSES.find((c) => c.id === courseId);

  const resetAll = () => {
    resetProgress();
    clearHistory();
    setProfileOpen(false);
    setFeedbackOpen(false);
    setCourseId(null);
    setQuickFixId(null);
    setViewedLessonId(null);
    setFilter(ALL_FILTER);
    setQuery("");
  };

  const totalMinutes = Math.round(
    entries.reduce((sum, e) => sum + e.durationSeconds, 0) / 60,
  );

  let screen: React.ReactNode;
  let feedbackModal: React.ReactNode = null;

  if (quickFix) {
    screen = (
      <QuickFixPlayer fix={quickFix} onBack={() => setQuickFixId(null)} />
    );
  } else if (!course) {
    screen = (
      <CategoryExplorer
        dogName={state.dogName}
        completedLessonIds={state.completedLessonIds}
        continueTarget={getContinueTarget(
          state.completedLessonIds,
          state.lastCourseId,
        )}
        selectedCategoryId={categoryId}
        filter={filter}
        query={query}
        onSelectCategory={setCategoryId}
        onFilterChange={setFilter}
        onQueryChange={setQuery}
        onOpenQuickFix={setQuickFixId}
        onOpenCourse={(id, lessonId) => {
          setViewedLessonId(lessonId ?? null);
          setCourseId(id);
        }}
      />
    );
  } else {
    const category = CATEGORIES.find((c) => c.id === course.categoryId)!;
    const trainer = TRAINERS.find((t) => t.id === course.trainerId);
    const firstOpen = course.lessons.find(
      (l) => !state.completedLessonIds.includes(l.id),
    );
    const lesson =
      course.lessons.find((l) => l.id === viewedLessonId) ??
      firstOpen ??
      course.lessons[0];
    const index = course.lessons.findIndex((l) => l.id === lesson.id);
    const nextLesson = course.lessons[index + 1];

    const backToCategories = () => {
      setCategoryId(course.categoryId);
      setCourseId(null);
      setViewedLessonId(null);
    };

    const handleFeedback = (feedback: FeedbackId, note: string) => {
      addEntry({
        lessonId: lesson.id,
        lessonTitle: lesson.title,
        courseTitle: course.title,
        durationSeconds: lesson.videoSeconds + lesson.practiceSeconds,
        feedback,
        note,
      });
      completeLesson(lesson.id);
      setFeedbackOpen(false);
      if (nextLesson) setViewedLessonId(nextLesson.id);
      else backToCategories();
    };

    screen = (
      <>
        <CourseHeader
          category={category}
          course={course}
          trainer={trainer}
          onBack={backToCategories}
        />
        <LessonWorkspace
          lessons={course.lessons}
          lesson={lesson}
          categoryId={course.categoryId}
          completedLessonIds={state.completedLessonIds}
          ctaLabel={
            nextLesson ? "סיימנו לתרגל – לשלב הבא" : "סיימנו לתרגל – סיום הקורס"
          }
          onSelectLesson={setViewedLessonId}
          onFinish={() => setFeedbackOpen(true)}
        />
      </>
    );

    if (feedbackOpen) {
      feedbackModal = (
        <PracticeFeedback
          lessonTitle={lesson.title}
          onSubmit={handleFeedback}
          onClose={() => setFeedbackOpen(false)}
        />
      );
    }
  }

  return (
    <>
      <div className="mx-auto min-h-screen w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <AppTopBar
          dogName={state.dogName}
          onOpenProfile={() => setProfileOpen(true)}
        />
        {screen}
      </div>
      {feedbackModal}
      <ProfileDrawer
        open={profileOpen}
        dogName={state.dogName}
        completedCount={state.completedLessonIds.length}
        totalLessons={TOTAL_LESSONS}
        totalMinutes={totalMinutes}
        recent={entries.slice(0, 5)}
        onRename={renameDog}
        onReset={resetAll}
        onClose={() => setProfileOpen(false)}
      />
    </>
  );
}
