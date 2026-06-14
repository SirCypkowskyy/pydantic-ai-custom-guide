import { useDocumentMeta } from "@/hooks/use-document-meta";
import { useLanguage } from "@/hooks/use-language";
import { useProgress } from "@/hooks/use-progress";
import { ProgressActions } from "@/views/progress/progress-actions";
import { ProgressChapterList } from "@/views/progress/progress-chapter-list";
import { ProgressChart } from "@/views/progress/progress-chart";
import { ProgressPlanner } from "@/views/progress/progress-planner";
import { ProgressStats } from "@/views/progress/progress-stats";

export function ProgressPage() {
  const { t } = useLanguage();
  const { attemptedCount } = useProgress();
  useDocumentMeta({
    title: t("progress.title"),
    description: t("progress.subtitle"),
    path: "progress",
  });

  return (
    <div className="mx-auto w-full max-w-5xl px-5 py-12">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-display text-4xl font-semibold tracking-tight">
            {t("progress.title")}
          </h1>
          <p className="mt-2 text-muted-foreground">{t("progress.subtitle")}</p>
        </div>
        <ProgressActions />
      </div>

      {attemptedCount === 0 ? (
        <p className="mt-10 rounded-xl border border-dashed bg-muted/30 p-8 text-center text-muted-foreground">
          {t("progress.empty")}
        </p>
      ) : null}

      <div className="mt-8 space-y-8">
        <ProgressStats />
        <div className="grid gap-6 lg:grid-cols-2">
          <ProgressChart />
          <ProgressPlanner />
        </div>
        <div>
          <h2 className="mb-3 font-display text-xl font-semibold tracking-tight">
            {t("nav.chapters")}
          </h2>
          <ProgressChapterList />
        </div>
      </div>
    </div>
  );
}
