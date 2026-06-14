import { useSyncExternalStore } from "react";
import { chapters } from "@/content/curriculum";
import { type ProgressState, progressStore } from "@/lib/progress-store";

export interface ProgressSummary {
  state: ProgressState;
  completedCount: number;
  totalChapters: number;
  /** 0..1 fraction of chapters completed. */
  completion: number;
  /** 0..1 average best score across attempted chapters (1 if none attempted). */
  averageScore: number;
  attemptedCount: number;
  streak: number;
}

export function useProgress(): ProgressSummary {
  const state = useSyncExternalStore(progressStore.subscribe, progressStore.getSnapshot);

  const entries = Object.values(state.chapters);
  const attempted = entries.filter((c) => c.total > 0);
  const completedCount = entries.filter((c) => c.completed).length;
  const averageScore =
    attempted.length === 0
      ? 0
      : attempted.reduce((sum, c) => sum + c.bestCorrect / c.total, 0) / attempted.length;

  return {
    state,
    completedCount,
    totalChapters: chapters.length,
    completion: chapters.length === 0 ? 0 : completedCount / chapters.length,
    averageScore,
    attemptedCount: attempted.length,
    streak: state.streak,
  };
}
