import { ChevronDown, ShieldCheck } from "lucide-react";

interface AppTopBarProps {
  dogName: string;
  onOpenProfile: () => void;
}

export default function AppTopBar({ dogName, onOpenProfile }: AppTopBarProps) {
  return (
    <div className="mb-6 flex items-center justify-between">
      <span className="flex items-center gap-2 text-zinc-900">
        <ShieldCheck className="h-5 w-5 text-zinc-700" />
        <span className="text-base font-bold tracking-wide">Barkly</span>
      </span>
      <button
        type="button"
        onClick={onOpenProfile}
        aria-label={`פרופיל של ${dogName}`}
        className="flex items-center gap-2 rounded-full border border-zinc-200/70 bg-white py-1.5 pe-3 ps-1.5 shadow-[0_4px_20px_rgba(0,0,0,0.03)] transition-colors hover:border-zinc-300"
      >
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-900 text-sm font-bold text-white">
          {dogName.charAt(0)}
        </span>
        <span className="max-w-32 truncate text-sm font-semibold text-zinc-900">
          {dogName}
        </span>
        <ChevronDown className="h-4 w-4 text-zinc-400" />
      </button>
    </div>
  );
}
