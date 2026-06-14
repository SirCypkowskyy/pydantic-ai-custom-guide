import { ThemeTogglerButton } from "@/components/animate-ui/components/buttons/theme-toggler";
import { useLanguage } from "@/hooks/use-language";

/**
 * Wraps animate-ui's theme toggler, which animates the switch with a View Transition.
 * Cycles light -> dark -> system.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const { t } = useLanguage();
  return (
    <ThemeTogglerButton
      variant="ghost"
      size="sm"
      modes={["light", "dark", "system"]}
      aria-label={t("theme.toggle")}
      title={t("theme.toggle")}
      className={className}
    />
  );
}
