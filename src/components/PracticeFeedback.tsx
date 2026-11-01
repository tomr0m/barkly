"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { FEEDBACK_OPTIONS } from "@/lib/feedback";
import type { FeedbackId } from "@/types";

interface PracticeFeedbackProps {
  lessonTitle: string;
  onSubmit: (feedback: FeedbackId, note: string) => void;
  onClose: () => void;
}

export default function PracticeFeedback({
  lessonTitle,
  onSubmit,
  onClose,
}: PracticeFeedbackProps) {
  const [feedback, setFeedback] = useState<FeedbackId | null>(null);
  const [note, setNote] = useState("");

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-4">
      <button
        type="button"
        aria-label="סגירה"
        onClick={onClose}
        className="absolute inset-0 bg-zinc-900/40 backdrop-blur-[2px]"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="feedback-title"
        className="relative w-full rounded-t-3xl border border-zinc-200/70 bg-white p-6 pb-8 shadow-xl sm:max-w-md sm:rounded-2xl sm:pb-6"
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 id="feedback-title" className="text-lg font-bold text-zinc-900">
              איך הלך התרגול היום?
            </h2>
            <p className="mt-1 text-sm text-zinc-500">{lessonTitle}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="סגירה"
            className="-me-2 -mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div
          role="radiogroup"
          aria-label="איך הלך התרגול"
          className="mt-5 flex flex-wrap gap-2"
        >
          {FEEDBACK_OPTIONS.map((o) => {
            const selected = feedback === o.id;
            return (
              <button
                key={o.id}
                type="button"
                role="radio"
                aria-checked={selected}
                onClick={() => setFeedback(o.id)}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                  selected
                    ? "border-zinc-900 bg-zinc-900 text-white"
                    : "border-zinc-200 bg-white text-zinc-700 hover:border-zinc-300"
                }`}
              >
                {o.label}
              </button>
            );
          })}
        </div>

        <label
          htmlFor="feedback-note"
          className="mb-2 mt-6 block text-xs font-semibold text-zinc-700"
        >
          הערה קצרה להמשך (לא חובה)
        </label>
        <input
          id="feedback-note"
          type="text"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          maxLength={120}
          autoComplete="off"
          className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-900 transition-all placeholder:text-zinc-400 focus:border-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900/10"
        />

        <button
          type="button"
          disabled={!feedback}
          onClick={() => feedback && onSubmit(feedback, note.trim())}
          className="mt-6 w-full rounded-xl bg-zinc-900 py-3.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-zinc-800 active:scale-[0.99] disabled:cursor-not-allowed disabled:bg-zinc-300 disabled:active:scale-100"
        >
          שמירה והמשך
        </button>
      </div>
    </div>
  );
}
