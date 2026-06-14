import { createFileRoute } from "@tanstack/react-router";
import { useDocumentMeta } from "@/hooks/use-document-meta";
import { useLanguage } from "@/hooks/use-language";

export const Route = createFileRoute("/playground")({
  component: PlaygroundRoute,
});

function PlaygroundRoute() {
  const { lang, t } = useLanguage();
  useDocumentMeta({ title: t("nav.playground"), path: "playground" });

  return (
    <div className="mx-auto w-full max-w-4xl px-5 py-14">
      <h1 className="font-display text-4xl font-semibold tracking-tight">{t("nav.playground")}</h1>
      <p className="mt-4 text-muted-foreground">
        {lang === "pl"
          ? "Interaktywna piaskownica z odtwarzaniem śladów uruchomień agenta powstaje w kolejnym kroku."
          : "An interactive playground that replays agent run traces is coming next."}
      </p>
    </div>
  );
}
