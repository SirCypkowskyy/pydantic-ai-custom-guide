import { createFileRoute } from "@tanstack/react-router";
import { useDocumentMeta } from "@/hooks/use-document-meta";
import { useLanguage } from "@/hooks/use-language";
import { useProgress } from "@/hooks/use-progress";

export const Route = createFileRoute("/progress")({
  component: ProgressRoute,
});

function ProgressRoute() {
  const { lang, t } = useLanguage();
  const { completion, completedCount, totalChapters } = useProgress();
  useDocumentMeta({ title: t("progress.title"), path: "progress" });

  return (
    <div className="mx-auto w-full max-w-4xl px-5 py-14">
      <h1 className="font-display text-4xl font-semibold tracking-tight">{t("progress.title")}</h1>
      <p className="mt-2 text-muted-foreground">{t("progress.subtitle")}</p>
      <p className="mt-8 text-lg">
        {completedCount} / {totalChapters} ({Math.round(completion * 100)}%)
      </p>
      <p className="mt-4 text-sm text-muted-foreground">
        {lang === "pl"
          ? "Pełny panel postępów z wykresem i planem nauki powstaje w kolejnym kroku."
          : "The full progress dashboard with a chart and study planner is coming next."}
      </p>
    </div>
  );
}
