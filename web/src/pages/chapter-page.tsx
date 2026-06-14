import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Clock, ExternalLink, FileCode2 } from "lucide-react";
import { ChapterIcon } from "@/components/chapter-icon";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { chapterNeighbours, chaptersBySlug } from "@/content/curriculum";
import { useDocumentMeta } from "@/hooks/use-document-meta";
import { useLanguage } from "@/hooks/use-language";
import { site } from "@/lib/site";

export function ChapterPage({ slug }: { slug: string }) {
  const { lang, t } = useLanguage();
  const chapter = chaptersBySlug[slug];

  useDocumentMeta({
    title: chapter ? chapter.title[lang] : "404",
    description: chapter?.summary[lang],
    path: `chapters/${slug}`,
    type: "article",
  });

  if (!chapter) {
    return (
      <div className="mx-auto max-w-2xl px-5 py-24 text-center">
        <p className="font-display text-5xl font-semibold text-primary">404</p>
        <p className="mt-3 text-muted-foreground">
          {lang === "pl" ? "Nie znaleziono rozdziału." : "Chapter not found."}
        </p>
        <Button asChild className="mt-6">
          <Link to="/chapters">{t("nav.chapters")}</Link>
        </Button>
      </div>
    );
  }

  const { prev, next } = chapterNeighbours(slug);

  return (
    <article className="mx-auto w-full max-w-6xl px-5 py-10 lg:py-14">
      <header className="border-b pb-8">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link to="/chapters" className="hover:text-foreground">
            {t("nav.chapters")}
          </Link>
          <span>/</span>
          <span className="text-foreground">
            {lang === "pl" ? "Rozdział" : "Chapter"} {chapter.order}
          </span>
        </div>

        <div className="mt-5 flex items-start gap-4">
          <span className="hidden size-14 shrink-0 place-items-center rounded-2xl bg-primary/10 text-primary sm:grid">
            <ChapterIcon name={chapter.icon} className="size-7" />
          </span>
          <div className="space-y-3">
            <h1 className="font-display text-[clamp(2rem,5vw,3rem)] font-semibold leading-tight tracking-tight">
              {chapter.title[lang]}
            </h1>
            <p className="max-w-2xl text-lg text-muted-foreground leading-relaxed">
              {chapter.summary[lang]}
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <DifficultyBadge difficulty={chapter.difficulty} />
              <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground tabular-nums">
                <Clock className="size-3.5" />
                {chapter.minutes} {t("common.minutes")}
              </span>
            </div>
          </div>
        </div>
      </header>

      <div className="grid gap-10 py-10 lg:grid-cols-[1fr_16rem]">
        <div className="min-w-0">
          <Card className="border-dashed bg-muted/30 p-8 text-center text-muted-foreground">
            {lang === "pl"
              ? "Treść tego rozdziału jest w przygotowaniu."
              : "The content of this chapter is being prepared."}
          </Card>
        </div>

        <aside className="space-y-6 lg:sticky lg:top-20 lg:self-start">
          <div>
            <h2 className="mb-2 font-semibold text-sm uppercase tracking-wide text-muted-foreground">
              {t("common.sourceDocs")}
            </h2>
            <ul className="space-y-1.5">
              {chapter.docs.map((doc) => (
                <li key={doc.url}>
                  <a
                    href={doc.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline"
                  >
                    <ExternalLink className="size-3.5" />
                    {doc.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {chapter.sandbox ? (
            <div>
              <h2 className="mb-2 font-semibold text-sm uppercase tracking-wide text-muted-foreground">
                {t("common.runnable")}
              </h2>
              <a
                href={`${site.sandboxUrl}/${chapter.sandbox}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline"
              >
                <FileCode2 className="size-3.5" />
                sandbox/{chapter.sandbox}
              </a>
            </div>
          ) : null}
        </aside>
      </div>

      <nav className="flex items-center justify-between gap-4 border-t pt-8">
        {prev ? (
          <Button asChild variant="ghost" className="h-auto justify-start gap-3 py-3 text-left">
            <Link to="/chapters/$slug" params={{ slug: prev.slug }}>
              <ArrowLeft className="size-4 shrink-0" />
              <span className="flex flex-col">
                <span className="text-xs text-muted-foreground">{t("common.previous")}</span>
                <span className="font-medium">{prev.title[lang]}</span>
              </span>
            </Link>
          </Button>
        ) : (
          <span />
        )}
        {next ? (
          <Button asChild variant="ghost" className="h-auto justify-end gap-3 py-3 text-right">
            <Link to="/chapters/$slug" params={{ slug: next.slug }}>
              <span className="flex flex-col">
                <span className="text-xs text-muted-foreground">{t("common.next")}</span>
                <span className="font-medium">{next.title[lang]}</span>
              </span>
              <ArrowRight className="size-4 shrink-0" />
            </Link>
          </Button>
        ) : (
          <span />
        )}
      </nav>
    </article>
  );
}
