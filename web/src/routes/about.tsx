import { createFileRoute } from "@tanstack/react-router";
import { useDocumentMeta } from "@/hooks/use-document-meta";
import { useLanguage } from "@/hooks/use-language";
import { site } from "@/lib/site";

export const Route = createFileRoute("/about")({
  component: AboutRoute,
});

function AboutRoute() {
  const { lang, t } = useLanguage();
  useDocumentMeta({ title: t("nav.about"), path: "about" });

  return (
    <div className="mx-auto w-full max-w-3xl px-5 py-14">
      <h1 className="font-display text-4xl font-semibold tracking-tight">{t("nav.about")}</h1>
      <p className="mt-4 text-muted-foreground leading-relaxed">
        {lang === "pl"
          ? "Nieoficjalny, społecznościowy przewodnik po Pydantic AI. Kod źródłowy jest otwarty."
          : "An unofficial, community guide to Pydantic AI. The source code is open."}
      </p>
      <a
        href={site.repoUrl}
        target="_blank"
        rel="noreferrer"
        className="mt-6 inline-flex text-primary hover:underline"
      >
        {t("footer.sourceOnGitHub")}
      </a>
    </div>
  );
}
