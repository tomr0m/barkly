import type { AccentColor } from "@/types";

// Full class strings so Tailwind can detect them statically.
export const ACCENT_STYLES: Record<
  AccentColor,
  { ring: string; soft: string; text: string; dot: string; pulse: string }
> = {
  emerald: {
    ring: "ring-emerald-500",
    soft: "bg-emerald-50 border-emerald-200",
    text: "text-emerald-700",
    dot: "bg-emerald-500",
    pulse: "bg-emerald-400/40",
  },
  sky: {
    ring: "ring-sky-500",
    soft: "bg-sky-50 border-sky-200",
    text: "text-sky-700",
    dot: "bg-sky-500",
    pulse: "bg-sky-400/40",
  },
  amber: {
    ring: "ring-amber-500",
    soft: "bg-amber-50 border-amber-200",
    text: "text-amber-700",
    dot: "bg-amber-500",
    pulse: "bg-amber-400/40",
  },
  indigo: {
    ring: "ring-indigo-500",
    soft: "bg-indigo-50 border-indigo-200",
    text: "text-indigo-700",
    dot: "bg-indigo-500",
    pulse: "bg-indigo-400/40",
  },
  rose: {
    ring: "ring-rose-500",
    soft: "bg-rose-50 border-rose-200",
    text: "text-rose-700",
    dot: "bg-rose-500",
    pulse: "bg-rose-400/40",
  },
};
