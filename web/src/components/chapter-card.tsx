import { Link } from "@tanstack/react-router";
import { ArrowRight, Check, Clock } from "lucide-react";
import { ChapterIcon } from "@/components/chapter-icon";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { Card } from "@/components/ui/card";
import type { Chapter } from "@/content/curriculum";
import { useLanguage } from "@/hooks/use-language";
import { cn } from "@/lib/utils";

export function ChapterCard({ chapter, done }: { chapter: Chapter; done?: boolean }) {
  const { lang, t } = useLanguage();
  return (
    <Card
      className={cn(
        "group relative flex flex-col gap-3 p-5 transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md hover:shadow-primary/5",
        done && "border-chart-5/30",
      )}
    >
      <Link
        to="/chapters/$slug"
        params={{ slug: chapter.slug }}
        className="absolute inset-0"
        aria-label={chapter.title[lang]}
      />
      <div className="flex items-center justify-between">
        <span className="grid size-10 place-items-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
          <ChapterIcon name={chapter.icon} className="size-5" />
        </span>
        {done ? (
          <span className="grid size-6 place-items-center rounded-full bg-chart-5/15 text-chart-5">
            <Check className="size-3.5" />
          </span>
        ) : (
          <span className="font-display text-2xl font-semibold text-muted-foreground/30 tabular-nums">
            {String(chapter.order).padStart(2, "0")}
          </span>
        )}
      </div>

      <div className="space-y-1.5">
        <h3 className="font-display text-lg font-semibold leading-snug tracking-tight">
          {chapter.title[lang]}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed">{chapter.summary[lang]}</p>
      </div>

      <div className="mt-auto flex items-center justify-between pt-2">
        <div className="flex items-center gap-2">
          <DifficultyBadge difficulty={chapter.difficulty} />
          <span className="inline-flex items-center gap-1 text-xs text-muted-foreground tabular-nums">
            <Clock className="size-3" />
            {chapter.minutes} {t("common.minutes")}
          </span>
        </div>
        <ArrowRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
      </div>
    </Card>
  );
}
