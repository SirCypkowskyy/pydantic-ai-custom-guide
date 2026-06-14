import { useLanguage } from "@/hooks/use-language";
import type { Language } from "@/i18n";
import { cn } from "@/lib/utils";

const OPTIONS: Language[] = ["pl", "en"];

export function LanguageToggle({ className }: { className?: string }) {
  const { lang, setLang } = useLanguage();
  return (
    <fieldset
      className={cn(
        "inline-flex items-center rounded-full border bg-card p-0.5 text-xs font-semibold",
        className,
      )}
      aria-label="Language"
    >
      {OPTIONS.map((option) => {
        const active = option === lang;
        return (
          <button
            key={option}
            type="button"
            onClick={() => setLang(option)}
            aria-pressed={active}
            className={cn(
              "rounded-full px-2.5 py-1 uppercase tracking-wide transition-colors",
              active
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {option}
          </button>
        );
      })}
    </fieldset>
  );
}
