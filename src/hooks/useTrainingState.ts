"use client";

import { useCallback, useEffect, useState } from "react";
import { COURSES } from "@/data/courses";
import type { UserProgress } from "@/types";

const STORAGE_KEY = "barkly_state";

export const DEFAULT_STATE: UserProgress = {
  dogName: "",
  completedLessonIds: [],
  lastCourseId: null,
  isSetupComplete: false,
};

function readStorage(): UserProgress {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_STATE;
    const saved = JSON.parse(raw) as Partial<UserProgress>;
    return {
      dogName: saved.dogName ?? "",
      completedLessonIds: Array.isArray(saved.completedLessonIds)
        ? saved.completedLessonIds
        : [],
      lastCourseId: saved.lastCourseId ?? null,
      isSetupComplete: saved.isSetupComplete ?? false,
    };
  } catch {
    return DEFAULT_STATE;
  }
}

export function useTrainingState() {
  const [state, setState] = useState<UserProgress>(DEFAULT_STATE);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    // localStorage is only available on the client; hydrate after mount.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setState(readStorage());
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // Storage unavailable or full: keep running in memory.
    }
  }, [state, isHydrated]);

  const saveSetup = useCallback((dogName: string) => {
    setState((prev) => ({
      ...prev,
      dogName: dogName.trim(),
      isSetupComplete: true,
    }));
  }, []);

  const completeLesson = useCallback((lessonId: string) => {
    const course = COURSES.find((c) =>
      c.lessons.some((l) => l.id === lessonId),
    );
    setState((prev) =>
      prev.completedLessonIds.includes(lessonId)
        ? prev
        : {
            ...prev,
            completedLessonIds: [...prev.completedLessonIds, lessonId],
            lastCourseId: course?.id ?? prev.lastCourseId,
          },
    );
  }, []);

  const renameDog = useCallback((dogName: string) => {
    setState((prev) => ({ ...prev, dogName: dogName.trim() }));
  }, []);

  const resetProgress = useCallback(() => {
    setState(DEFAULT_STATE);
  }, []);

  return {
    state,
    isHydrated,
    saveSetup,
    completeLesson,
    renameDog,
    resetProgress,
  };
}
