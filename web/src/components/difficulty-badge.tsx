import { Badge } from "@/components/ui/badge";
import type { Difficulty } from "@/content/curriculum";
import { useLanguage } from "@/hooks/use-language";
import { cn } from "@/lib/utils";

const STYLES: Record<Difficulty, string> = {
  intro: "border-chart-5/40 bg-chart-5/10 text-chart-5",
  intermediate: "border-chart-2/50 bg-chart-2/15 text-chart-2",
  advanced: "border-primary/40 bg-primary/10 text-primary",
};

const LABEL_KEY = {
  intro: "difficulty.intro",
  intermediate: "difficulty.intermediate",
  advanced: "difficulty.advanced",
} as const;

export function DifficultyBadge({
  difficulty,
  className,
}: {
  difficulty: Difficulty;
  className?: string;
}) {
  const { t } = useLanguage();
  return (
    <Badge variant="outline" className={cn("font-medium", STYLES[difficulty], className)}>
      {t(LABEL_KEY[difficulty])}
    </Badge>
  );
}
