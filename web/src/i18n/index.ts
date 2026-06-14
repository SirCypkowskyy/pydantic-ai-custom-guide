import { en } from "./dictionaries/en";
import { pl } from "./dictionaries/pl";

export type Language = "pl" | "en";
export type TranslationKey = keyof typeof pl;

export const dictionaries: Record<Language, Record<TranslationKey, string>> = {
  pl,
  en,
};

export const LANGUAGES: Language[] = ["pl", "en"];
export const DEFAULT_LANGUAGE: Language = "pl";
export const LANGUAGE_STORAGE_KEY = "pai-lang";
