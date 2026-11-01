"use client";

import { useState } from "react";
import { ChevronDown, LifeBuoy } from "lucide-react";

interface TroubleshootingProps {
  tips: string[];
}

export default function Troubleshooting({ tips }: TroubleshootingProps) {
  const [open, setOpen] = useState(false);

  return (
    <section className="rounded-2xl border border-zinc-200/70 bg-white shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="troubleshooting-panel"
        className="flex w-full items-center gap-3 p-5 text-start"
      >
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-zinc-100 text-zinc-700">
          <LifeBuoy className="h-4 w-4" />
        </span>
        <span className="flex-1 text-sm font-semibold text-zinc-900">
          מה עושים כשהתרגיל משתבש?
        </span>
        <ChevronDown
          className={`h-5 w-5 shrink-0 text-zinc-400 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        id="troubleshooting-panel"
        className={`grid transition-[grid-template-rows] duration-200 ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <ul className="flex flex-col gap-3 border-t border-zinc-100 px-5 pb-5 pt-4">
            {tips.map((tip) => (
              <li key={tip} className="flex items-start gap-3">
                <span
                  className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-400"
                  aria-hidden
                />
                <p className="text-[15px] leading-7 text-zinc-700">{tip}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
