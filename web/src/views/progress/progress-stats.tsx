import { Flame, GraduationCap, Target } from "lucide-react";
import { CountingNumber } from "@/components/animate-ui/primitives/texts/counting-number";
import { ProgressRing } from "@/components/progress-ring";
import { Card } from "@/components/ui/card";
import { useLanguage } from "@/hooks/use-language";
import { useProgress } from "@/hooks/use-progress";

export function ProgressStats() {
  const { t } = useLanguage();
  const { completion, completedCount, totalChapters, averageScore, streak } = useProgress();

  return (
    <div className="grid gap-4 sm:grid-cols-3">
      <Card className="flex items-center gap-4 p-5">
        <ProgressRing value={completion} size={56} strokeWidth={5}>
          <GraduationCap className="size-5 text-primary" />
        </ProgressRing>
        <div>
          <p className="font-display text-3xl font-semibold tabular-nums">
            <CountingNumber number={completedCount} />
            <span className="text-muted-foreground">/{totalChapters}</span>
          </p>
          <p className="text-sm text-muted-foreground">{t("progress.chaptersDone")}</p>
        </div>
      </Card>

      <Card className="flex items-center gap-4 p-5">
        <span className="grid size-14 place-items-center rounded-xl bg-chart-2/12 text-chart-2">
          <Target className="size-6" />
        </span>
        <div>
          <p className="font-display text-3xl font-semibold tabular-nums">
            <CountingNumber number={Math.round(averageScore * 100)} />%
          </p>
          <p className="text-sm text-muted-foreground">{t("progress.avgScore")}</p>
        </div>
      </Card>

      <Card className="flex items-center gap-4 p-5">
        <span className="grid size-14 place-items-center rounded-xl bg-chart-5/12 text-chart-5">
          <Flame className="size-6" />
        </span>
        <div>
          <p className="font-display text-3xl font-semibold tabular-nums">
            <CountingNumber number={streak} />
          </p>
          <p className="text-sm text-muted-foreground">{t("progress.streak")}</p>
        </div>
      </Card>
    </div>
  );
}
