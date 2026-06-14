import { useQuery } from "@tanstack/react-query";
import { FileCode2, ListTree } from "lucide-react";
import { useRef } from "react";
import { ExternalLink } from "@/components/animate-ui/icons/external-link";
import { AnimateIcon } from "@/components/animate-ui/icons/icon";
import { Comments } from "@/components/comments";
import { mdxComponents } from "@/components/mdx/mdx-components";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import type { Chapter } from "@/content/curriculum";
import { useLanguage } from "@/hooks/use-language";
import { useToc } from "@/hooks/use-toc";
import { getChapterQuiz, loadChapterContent } from "@/lib/chapter-content";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";
import { ChapterQuiz } from "@/views/chapter/chapter-quiz";

export function ChapterReader({ chapter }: { chapter: Chapter }) {
  const { lang, t } = useLanguage();
  const contentRef = useRef<HTMLDivElement>(null);

  const { data: Content, isLoading } = useQuery({
    queryKey: ["chapter-content", chapter.slug, lang],
    queryFn: () => loadChapterContent(chapter.slug, lang),
  });

  const { items: toc, activeId } = useToc(contentRef, Boolean(Content));
  const quiz = getChapterQuiz(chapter.slug);

  return (
    <div className="grid gap-10 py-10 lg:grid-cols-[minmax(0,1fr)_15rem]">
      <div className="min-w-0">
        {isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-8 w-2/3" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-11/12" />
            <Skeleton className="h-40 w-full" />
            <Skeleton className="h-4 w-10/12" />
          </div>
        ) : Content ? (
          <>
            <div ref={contentRef} className="mdx-body">
              <Content components={mdxComponents} />
            </div>
            {quiz ? (
              <div className="mt-12">
                <Separator className="mb-8" />
                <ChapterQuiz slug={chapter.slug} quiz={quiz} />
              </div>
            ) : null}
            <div className="mt-14">
              <Separator className="mb-8" />
              <h2 className="mb-1 font-display text-2xl font-semibold tracking-tight">
                {t("comments.title")}
              </h2>
              <p className="mb-6 text-sm text-muted-foreground">{t("comments.subtitle")}</p>
              <Comments />
            </div>
          </>
        ) : (
          <Card className="border-dashed bg-muted/30 p-8 text-center text-muted-foreground">
            {lang === "pl"
              ? "Treść tego rozdziału jest w przygotowaniu."
              : "The content of this chapter is being prepared."}
          </Card>
        )}
      </div>

      <aside className="space-y-7 lg:sticky lg:top-20 lg:self-start">
        {toc.length > 0 ? (
          <nav>
            <h2 className="mb-2 flex items-center gap-1.5 font-semibold text-xs uppercase tracking-wide text-muted-foreground">
              <ListTree className="size-3.5" />
              {t("common.onThisPage")}
            </h2>
            <ul className="space-y-1 border-l text-sm">
              {toc.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className={cn(
                      "-ml-px block border-l py-1 transition-colors",
                      item.level === 3 ? "pl-6" : "pl-3",
                      activeId === item.id
                        ? "border-primary font-medium text-primary"
                        : "border-transparent text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {item.text}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        ) : null}

        <div>
          <h2 className="mb-2 font-semibold text-xs uppercase tracking-wide text-muted-foreground">
            {t("common.sourceDocs")}
          </h2>
          <ul className="space-y-1.5">
            {chapter.docs.map((doc) => (
              <li key={doc.url}>
                <AnimateIcon animateOnHover asChild>
                  <a
                    href={doc.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline"
                  >
                    <ExternalLink className="size-3.5 shrink-0" />
                    {doc.label}
                  </a>
                </AnimateIcon>
              </li>
            ))}
          </ul>
        </div>

        {chapter.sandbox ? (
          <div>
            <h2 className="mb-2 font-semibold text-xs uppercase tracking-wide text-muted-foreground">
              {t("common.runnable")}
            </h2>
            <a
              href={`${site.sandboxUrl}/${chapter.sandbox}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline"
            >
              <FileCode2 className="size-3.5 shrink-0" />
              sandbox/{chapter.sandbox}
            </a>
          </div>
        ) : null}
      </aside>
    </div>
  );
}
