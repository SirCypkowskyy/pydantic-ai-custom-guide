import { type ReactNode, useCallback, useMemo, useState } from "react";
import {
  DEFAULT_LANGUAGE,
  dictionaries,
  LANGUAGE_STORAGE_KEY,
  type Language,
  type TranslationKey,
} from "@/i18n";
import { LanguageContext } from "@/i18n/language-context";

function readInitial(): Language {
  try {
    const stored = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (stored === "pl" || stored === "en") return stored;
  } catch {
    /* storage unavailable */
  }
  return DEFAULT_LANGUAGE;
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>(readInitial);

  const setLang = useCallback((next: Language) => {
    setLangState(next);
    try {
      window.localStorage.setItem(LANGUAGE_STORAGE_KEY, next);
    } catch {
      /* storage unavailable */
    }
    document.documentElement.lang = next;
  }, []);

  const toggle = useCallback(() => {
    setLang(lang === "pl" ? "en" : "pl");
  }, [lang, setLang]);

  const t = useCallback((key: TranslationKey) => dictionaries[lang][key] ?? key, [lang]);

  const value = useMemo(() => ({ lang, setLang, toggle, t }), [lang, setLang, toggle, t]);

  return <LanguageContext value={value}>{children}</LanguageContext>;
}
