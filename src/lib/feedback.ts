import type { FeedbackId } from "@/types";

export const FEEDBACK_OPTIONS: { id: FeedbackId; label: string }[] = [
  { id: "mastered", label: "שלט מעולה" },
  { id: "distracted", label: "היו הסחות דעת" },
  { id: "needs-repeat", label: "דורש חזרה נוספת" },
];

export function feedbackLabel(id: FeedbackId): string {
  return FEEDBACK_OPTIONS.find((o) => o.id === id)?.label ?? "";
}
