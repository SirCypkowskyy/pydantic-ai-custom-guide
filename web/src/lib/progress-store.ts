/**
 * External store for quiz score and course progress. Persists to localStorage and stays
 * in sync across tabs via the `storage` event. Consumed through useSyncExternalStore so
 * any component (sidebar ring, dashboard, quiz) reads the same source of truth.
 */

export interface ChapterProgress {
  completed: boolean;
  /** Best run, as correct answers out of total. */
  bestCorrect: number;
  lastCorrect: number;
  total: number;
  attempts: number;
  /** questionIndex -> was the latest answer correct. */
  answers: Record<number, boolean>;
  updatedAt: string;
}

export interface ProgressState {
  version: 2;
  chapters: Record<string, ChapterProgress>;
  /** Local calendar day (yyyy-mm-dd) of the last recorded activity. */
  lastActiveDay: string | null;
  streak: number;
}

const STORAGE_KEY = "pai-progress-v2";
const PASS_THRESHOLD = 0.6;

function emptyState(): ProgressState {
  return { version: 2, chapters: {}, lastActiveDay: null, streak: 0 };
}

function isProgressState(value: unknown): value is ProgressState {
  return (
    typeof value === "object" &&
    value !== null &&
    (value as ProgressState).version === 2 &&
    typeof (value as ProgressState).chapters === "object"
  );
}

function load(): ProgressState {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return emptyState();
    const parsed: unknown = JSON.parse(raw);
    return isProgressState(parsed) ? parsed : emptyState();
  } catch {
    return emptyState();
  }
}

let state: ProgressState = load();
const listeners = new Set<() => void>();

function persist(): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    /* storage unavailable or full */
  }
}

function emit(): void {
  for (const listener of listeners) listener();
}

function setState(next: ProgressState): void {
  state = next;
  persist();
  emit();
}

function dayKey(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(
    date.getDate(),
  ).padStart(2, "0")}`;
}

function nextStreak(prev: ProgressState, today: string): number {
  if (prev.lastActiveDay === today) return prev.streak;
  if (prev.lastActiveDay === null) return 1;
  const last = new Date(`${prev.lastActiveDay}T00:00:00`);
  const now = new Date(`${today}T00:00:00`);
  const diffDays = Math.round((now.getTime() - last.getTime()) / 86_400_000);
  return diffDays === 1 ? prev.streak + 1 : 1;
}

export const progressStore = {
  subscribe(listener: () => void): () => void {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },
  getSnapshot(): ProgressState {
    return state;
  },
  recordQuizResult(slug: string, answers: Record<number, boolean>, total: number): void {
    const correct = Object.values(answers).filter(Boolean).length;
    const today = dayKey(new Date());
    const existing = state.chapters[slug];
    const bestCorrect = Math.max(existing?.bestCorrect ?? 0, correct);
    const chapter: ChapterProgress = {
      completed: (existing?.completed ?? false) || correct / total >= PASS_THRESHOLD,
      bestCorrect,
      lastCorrect: correct,
      total,
      attempts: (existing?.attempts ?? 0) + 1,
      answers,
      updatedAt: new Date().toISOString(),
    };
    setState({
      ...state,
      chapters: { ...state.chapters, [slug]: chapter },
      streak: nextStreak(state, today),
      lastActiveDay: today,
    });
  },
  reset(): void {
    setState(emptyState());
  },
  export(): string {
    return JSON.stringify(state, null, 2);
  },
  import(json: string): boolean {
    try {
      const parsed: unknown = JSON.parse(json);
      if (!isProgressState(parsed)) return false;
      setState(parsed);
      return true;
    } catch {
      return false;
    }
  },
};

export const PROGRESS_PASS_THRESHOLD = PASS_THRESHOLD;

// Keep tabs in sync when the underlying storage changes elsewhere.
if (typeof window !== "undefined") {
  window.addEventListener("storage", (event) => {
    if (event.key === STORAGE_KEY) {
      state = load();
      emit();
    }
  });
}
