import type { Language } from "@/i18n";

export interface QuizOption {
  text: Record<Language, string>;
}

export interface QuizQuestion {
  prompt: Record<Language, string>;
  options: QuizOption[];
  /** Index of the correct option. */
  answer: number;
  explanation: Record<Language, string>;
}

export interface ChapterQuiz {
  questions: QuizQuestion[];
}
