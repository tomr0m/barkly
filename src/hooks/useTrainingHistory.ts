"use client";

import { useCallback, useEffect, useState } from "react";
import type { HistoryEntry } from "@/types";

const STORAGE_KEY = "barkly_history";
const MAX_ENTRIES = 200;

function readStorage(): HistoryEntry[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as HistoryEntry[]) : [];
  } catch {
    return [];
  }
}

export function useTrainingHistory() {
  const [entries, setEntries] = useState<HistoryEntry[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    // localStorage is only available on the client; hydrate after mount.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setEntries(readStorage());
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
    } catch {
      // Storage unavailable or full: keep running in memory.
    }
  }, [entries, isHydrated]);

  const addEntry = useCallback(
    (entry: Omit<HistoryEntry, "id" | "timestamp">) => {
      const now = new Date();
      const full: HistoryEntry = {
        ...entry,
        id: `${now.getTime()}-${entry.lessonId}`,
        timestamp: now.toISOString(),
      };
      setEntries((prev) => [full, ...prev].slice(0, MAX_ENTRIES));
    },
    [],
  );

  const clearHistory = useCallback(() => setEntries([]), []);

  return { entries, addEntry, clearHistory };
}
