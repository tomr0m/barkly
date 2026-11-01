"use client";

import { useState } from "react";
import { ShieldCheck } from "lucide-react";

interface OnboardingProps {
  onComplete: (dogName: string) => void;
}

export default function Onboarding({ onComplete }: OnboardingProps) {
  const [dogName, setDogName] = useState("");
  const [touched, setTouched] = useState(false);

  const trimmed = dogName.trim();
  const error =
    trimmed.length === 0
      ? "יש להזין את שם הכלב"
      : trimmed.length < 2
        ? "השם חייב להכיל לפחות 2 תווים"
        : trimmed.length > 20
          ? "השם יכול להכיל עד 20 תווים"
          : null;

  const submit = () => {
    setTouched(true);
    if (!error) onComplete(trimmed);
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-lg rounded-2xl border border-slate-200/80 bg-white p-8 shadow-sm sm:p-10">
        <div className="mb-8 flex items-center gap-2 text-slate-900">
          <ShieldCheck className="h-6 w-6 text-slate-700" />
          <span className="text-lg font-bold tracking-wide">Barkly</span>
        </div>

        <h1 className="mb-2 text-2xl font-bold text-slate-900">
          איך קוראים לכלב שלך?
        </h1>
        <p className="mb-8 text-sm leading-relaxed text-slate-500">
          שיעורים קצרים של שתי דקות, ואחריהם תרגול מעשי עם הכלב. בחר נושא ומאלף,
          והתחל.
        </p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            submit();
          }}
          noValidate
        >
          <label
            htmlFor="dog-name"
            className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-700"
          >
            שם הכלב
          </label>
          <input
            id="dog-name"
            type="text"
            value={dogName}
            onChange={(e) => setDogName(e.target.value)}
            onBlur={() => setTouched(true)}
            placeholder="פרדי"
            autoComplete="off"
            maxLength={30}
            aria-invalid={touched && !!error}
            aria-describedby={touched && error ? "dog-name-error" : undefined}
            className={`w-full rounded-xl border bg-white px-4 py-3 text-slate-900 transition-all placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 ${
              touched && error ? "border-rose-400" : "border-slate-300"
            }`}
          />
          {touched && error && (
            <p id="dog-name-error" className="mt-2 text-sm text-rose-600">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="mt-6 w-full rounded-xl bg-slate-900 px-4 py-3 font-medium text-white shadow-sm transition-all hover:bg-slate-800"
          >
            כניסה לשיעורים
          </button>
        </form>
      </div>
    </div>
  );
}
