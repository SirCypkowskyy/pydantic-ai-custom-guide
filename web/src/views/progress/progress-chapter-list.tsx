import { Link } from "@tanstack/react-router";
import { Check, Circle } from "lucide-react";
import { ChapterIcon } from "@/components/chapter-icon";
import { Card } from "@/components/ui/card";
import { chapters } from "@/content/curriculum";
import { useLanguage } from "@/hooks/use-language";
import { useProgress } from "@/hooks/use-progress";
import { cn } from "@/lib/utils";

export function ProgressChapterList() {
  const { lang } = useLanguage();
  const { state } = useProgress();

  return (
    <Card className="divide-y p-0">
      {chapters.map((chapter) => {
        const p = state.chapters[chapter.slug];
        const done = p?.completed ?? false;
        return (
          <Link
            key={chapter.slug}
            to="/chapters/$slug"
            params={{ slug: chapter.slug }}
            className="flex items-center gap-3 px-4 py-3 transition-colors hover:bg-accent/40"
          >
            <span
              className={cn(
                "grid size-8 shrink-0 place-items-center rounded-lg",
                done ? "bg-chart-5/15 text-chart-5" : "bg-muted text-muted-foreground",
              )}
            >
              {done ? <Check className="size-4" /> : <Circle className="size-3.5" />}
            </span>
            <ChapterIcon name={chapter.icon} className="size-4 text-muted-foreground" />
            <span className="flex-1 truncate text-sm font-medium">
              <span className="text-muted-foreground tabular-nums">{chapter.order}.</span>{" "}
              {chapter.title[lang]}
            </span>
            {p && p.total > 0 ? (
              <span className="text-sm text-muted-foreground tabular-nums">
                {p.bestCorrect}/{p.total}
              </span>
            ) : (
              <span className="text-xs text-muted-foreground/60">
                {lang === "pl" ? "brak" : "none"}
              </span>
            )}
          </Link>
        );
      })}
    </Card>
  );
}
