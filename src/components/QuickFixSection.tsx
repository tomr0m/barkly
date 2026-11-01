import { Play } from "lucide-react";
import { CATEGORY_THUMBNAILS } from "@/lib/thumbnails";
import type { QuickFix } from "@/types";

interface QuickFixSectionProps {
  fixes: QuickFix[];
  onOpen: (fixId: string) => void;
}

export default function QuickFixSection({
  fixes,
  onOpen,
}: QuickFixSectionProps) {
  if (fixes.length === 0) return null;

  return (
    <section aria-label="מענה מהיר" className="mt-10">
      <h2 className="text-base font-bold">
        מענה מהיר לבעיות נפוצות (דקה אחת בלבד)
      </h2>
      <div className="mt-4 grid grid-cols-3 gap-2.5 md:gap-4">
        {fixes.map((fix) => (
          <button
            key={fix.id}
            type="button"
            onClick={() => onOpen(fix.id)}
            className="overflow-hidden rounded-2xl border border-zinc-200/70 bg-white text-start shadow-[0_4px_20px_rgba(0,0,0,0.03)] transition-all duration-200 hover:border-zinc-300 active:scale-[0.99]"
          >
            <span className="relative block aspect-[4/3] bg-zinc-900">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={CATEGORY_THUMBNAILS[fix.categoryId]}
                alt=""
                className="absolute inset-0 h-full w-full object-cover"
              />
              <span className="absolute inset-0 bg-black/40" />
              <span className="absolute inset-0 flex items-center justify-center">
                <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/30 bg-white/20 text-white backdrop-blur-md">
                  <Play className="h-3.5 w-3.5 fill-white" />
                </span>
              </span>
              <span className="absolute bottom-1.5 end-1.5 rounded-full bg-black/50 px-1.5 py-0.5 font-mono text-[10px] text-white">
                01:00
              </span>
            </span>
            <span className="block p-2.5 text-xs font-semibold md:p-4 md:text-sm leading-snug text-zinc-900">
              {fix.title}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}
