import { COURSES } from "@/data/courses";
import type { Course, Lesson } from "@/types";

export interface ContinueTarget {
  course: Course;
  lesson: Lesson;
}

function nextOpenLesson(
  course: Course,
  completed: string[],
): Lesson | undefined {
  return course.lessons.find((l) => !completed.includes(l.id));
}

/** The lesson to resume: last-touched course first, then any course in progress. */
export function getContinueTarget(
  completed: string[],
  lastCourseId: string | null,
): ContinueTarget | null {
  const last = COURSES.find((c) => c.id === lastCourseId);
  const lastLesson = last && nextOpenLesson(last, completed);
  if (last && lastLesson) return { course: last, lesson: lastLesson };

  for (const course of COURSES) {
    const started = course.lessons.some((l) => completed.includes(l.id));
    const lesson = nextOpenLesson(course, completed);
    if (started && lesson) return { course, lesson };
  }
  return null;
}
