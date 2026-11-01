import type { LucideIcon } from "lucide-react";

export type AccentColor = "emerald" | "sky" | "amber" | "indigo" | "rose";

export interface Trainer {
  id: string;
  name: string;
  specialty: string;
  tagline: string;
  badge: string;
  avatarUrl: string;
  accentColor: AccentColor;
}

export interface Category {
  id: string;
  title: string;
  /** Short list of topics covered, shown under the title. */
  topics: string;
  description: string;
  /** Label used by the hub filter chips. */
  chipLabel: string;
  icon: LucideIcon;
}

export interface Lesson {
  id: string;
  title: string;
  /** Short label used in the lesson pills. */
  shortTitle: string;
  description: string;
  /** Length of the micro-lesson video (90-120 seconds). */
  videoSeconds: number;
  /** Length of the hands-on practice timer. */
  practiceSeconds: number;
  /** Exactly three concrete practice rules. */
  rules: string[];
  videoTitle: string;
}

export type CourseLevel = "beginner" | "advanced";

export interface Course {
  id: string;
  categoryId: string;
  trainerId: string;
  title: string;
  /** Short label describing the trainer's method. */
  level: CourseLevel;
  approachBadge: string;
  /** One or two sentences on the trainer's philosophy for this topic. */
  approach: string;
  lessons: Lesson[];
}

export interface QuickFix {
  id: string;
  title: string;
  description: string;
  categoryId: string;
  trainerId: string;
  /** Micro-video length, about one minute. */
  videoSeconds: number;
  videoTitle: string;
  /** Exactly three steps. */
  steps: string[];
}

export interface UserProgress {
  dogName: string;
  completedLessonIds: string[];
  /** Course of the most recently completed lesson. */
  lastCourseId: string | null;
  isSetupComplete: boolean;
}

export type FeedbackId = "mastered" | "distracted" | "needs-repeat";

export interface HistoryEntry {
  id: string;
  /** ISO timestamp of when the session was logged. */
  timestamp: string;
  lessonId: string;
  lessonTitle: string;
  courseTitle: string;
  /** Video plus practice time, in seconds. */
  durationSeconds: number;
  feedback: FeedbackId;
  note: string;
}
