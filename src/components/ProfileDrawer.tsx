"use client";

import { useEffect, useState } from "react";
import { Check, Clock, Pencil, Trash2, X } from "lucide-react";
import { feedbackLabel } from "@/lib/feedback";
import type { HistoryEntry } from "@/types";

interface ProfileDrawerProps {
  open: boolean;
  dogName: string;
  completedCount: number;
  totalLessons: number;
  totalMinutes: number;
  recent: HistoryEntry[];
  onRename: (name: string) => void;
  onReset: () => void;
  onClose: () => void;
}

function formatWhen(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleString("he-IL", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function ProfileDrawer({
  open,
  dogName,
  completedCount,
  totalLessons,
  totalMinutes,
  recent,
  onRename,
  onReset,
  onClose,
}: ProfileDrawerProps) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(dogName);
  const [confirmReset, setConfirmReset] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const draftTrimmed = draft.trim();
  const draftValid = draftTrimmed.length >= 2 && draftTrimmed.length <= 20;

  const close = () => {
    setEditing(false);
    setConfirmReset(false);
    onClose();
  };

  const saveName = () => {
    if (!draftValid) return;
    onRename(draftTrimmed);
    setEditing(false);
  };

  return (
    <div
      className={`fixed inset-0 z-50 ${open ? "" : "pointer-events-none"}`}
      aria-hidden={!open}
    >
      <button
        type="button"
        tabIndex={open ? 0 : -1}
        aria-label="סגירת הפרופיל"
        onClick={close}
        className={`absolute inset-0 bg-zinc-900/40 backdrop-blur-[2px] transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0"
        }`}
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="פרופיל הכלב"
        className={`absolute inset-y-0 left-0 flex w-full flex-col overflow-y-auto border-r border-zinc-200/70 bg-white shadow-xl transition-all duration-300 sm:w-96 ${
          open ? "visible translate-x-0" : "invisible -translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-zinc-100 px-5 py-4">
          <h2 className="text-sm font-semibold text-zinc-900">פרופיל הכלב</h2>
          <button
            type="button"
            onClick={close}
            aria-label="סגירה"
            className="flex h-9 w-9 items-center justify-center rounded-lg text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex flex-1 flex-col gap-6 p-5">
          <div className="flex items-center gap-4">
            <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-zinc-900 text-2xl font-bold text-white">
              {dogName.charAt(0)}
            </span>
            {editing ? (
              <form
                className="flex min-w-0 flex-1 flex-col gap-2"
                onSubmit={(e) => {
                  e.preventDefault();
                  saveName();
                }}
              >
                <label htmlFor="rename-dog" className="sr-only">
                  שם הכלב
                </label>
                <input
                  id="rename-dog"
                  autoFocus
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  maxLength={30}
                  className="w-full rounded-xl border border-zinc-300 bg-white px-3 py-2 text-sm focus:border-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900/10"
                />
                {!draftValid && (
                  <p className="text-xs text-rose-600">
                    השם חייב להכיל בין 2 ל-20 תווים
                  </p>
                )}
                <div className="flex gap-2">
                  <button
                    type="submit"
                    disabled={!draftValid}
                    className="flex items-center gap-1 rounded-lg bg-zinc-900 px-3 py-1.5 text-xs font-semibold text-white disabled:bg-zinc-300"
                  >
                    <Check className="h-3.5 w-3.5" />
                    שמירה
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setEditing(false);
                      setDraft(dogName);
                    }}
                    className="rounded-lg border border-zinc-200 px-3 py-1.5 text-xs font-semibold text-zinc-700 hover:bg-zinc-50"
                  >
                    ביטול
                  </button>
                </div>
              </form>
            ) : (
              <div className="min-w-0 flex-1">
                <p className="truncate text-xl font-bold text-zinc-900">
                  {dogName}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setDraft(dogName);
                    setEditing(true);
                  }}
                  className="mt-1 flex items-center gap-1 text-xs font-medium text-zinc-500 hover:text-zinc-900"
                >
                  <Pencil className="h-3 w-3" />
                  עריכת שם
                </button>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-2xl border border-zinc-200/70 p-4">
              <p className="text-2xl font-semibold tabular-nums text-zinc-900">
                {completedCount}
                <span className="text-sm font-normal text-zinc-400">
                  {" "}
                  / {totalLessons}
                </span>
              </p>
              <p className="mt-1 text-xs text-zinc-500">שיעורים שהושלמו</p>
            </div>
            <div className="rounded-2xl border border-zinc-200/70 p-4">
              <p className="text-2xl font-semibold tabular-nums text-zinc-900">
                {totalMinutes}
              </p>
              <p className="mt-1 text-xs text-zinc-500">דקות אימון</p>
            </div>
          </div>

          <section aria-label="פעילות אחרונה">
            <h3 className="text-sm font-semibold text-zinc-900">
              פעילות אחרונה
            </h3>
            {recent.length === 0 ? (
              <p className="mt-3 rounded-2xl border border-dashed border-zinc-200 p-4 text-sm text-zinc-500">
                עדיין אין אימונים ביומן. אחרי סיום תרגול הוא יופיע כאן.
              </p>
            ) : (
              <ul className="mt-3 flex flex-col divide-y divide-zinc-100 rounded-2xl border border-zinc-200/70">
                {recent.map((e) => (
                  <li key={e.id} className="p-4">
                    <div className="flex items-start justify-between gap-3">
                      <p className="text-sm font-semibold text-zinc-900">
                        {e.lessonTitle}
                      </p>
                      <span className="shrink-0 rounded-full bg-zinc-100 px-2.5 py-1 text-xs font-medium text-zinc-700">
                        {feedbackLabel(e.feedback)}
                      </span>
                    </div>
                    <p className="mt-1 flex items-center gap-1.5 text-xs text-zinc-500">
                      <Clock className="h-3 w-3" />
                      {formatWhen(e.timestamp)}
                    </p>
                    {e.note && (
                      <p className="mt-2 text-sm leading-relaxed text-zinc-600">
                        {e.note}
                      </p>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </section>

          <section className="mt-auto border-t border-zinc-100 pt-5">
            {confirmReset ? (
              <div className="rounded-2xl border border-rose-200 bg-rose-50 p-4">
                <p className="text-sm leading-relaxed text-rose-900">
                  פעולה זו תמחק את כל ההתקדמות, היומן ושם הכלב, ואי אפשר לבטל
                  אותה.
                </p>
                <div className="mt-3 flex gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setConfirmReset(false);
                      onReset();
                    }}
                    className="rounded-lg bg-rose-600 px-3 py-2 text-xs font-semibold text-white hover:bg-rose-700"
                  >
                    מחיקת כל הנתונים
                  </button>
                  <button
                    type="button"
                    onClick={() => setConfirmReset(false)}
                    className="rounded-lg border border-rose-200 bg-white px-3 py-2 text-xs font-semibold text-zinc-700 hover:bg-zinc-50"
                  >
                    ביטול
                  </button>
                </div>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setConfirmReset(true)}
                className="flex items-center gap-2 text-sm font-medium text-zinc-500 hover:text-rose-600"
              >
                <Trash2 className="h-4 w-4" />
                איפוס נתונים
              </button>
            )}
          </section>
        </div>
      </aside>
    </div>
  );
}
