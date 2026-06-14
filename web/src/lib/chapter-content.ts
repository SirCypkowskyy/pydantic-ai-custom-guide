import type { ComponentType } from "react";
import type { ChapterQuiz } from "@/content/quiz-types";
import type { Language } from "@/i18n";

type MdxModule = { default: ComponentType<{ components?: unknown }> };

const contentModules = import.meta.glob<MdxModule>("/src/content/chapters/*/*.mdx");

const quizModules = import.meta.glob<{ quiz: ChapterQuiz }>("/src/content/chapters/*/quiz.ts", {
  eager: true,
});

function contentKey(slug: string, lang: Language): string {
  return `/src/content/chapters/${slug}/${lang}.mdx`;
}

export function hasChapterContent(slug: string, lang: Language): boolean {
  return contentKey(slug, lang) in contentModules;
}

export async function loadChapterContent(
  slug: string,
  lang: Language,
): Promise<ComponentType<{ components?: unknown }> | null> {
  const loader = contentModules[contentKey(slug, lang)];
  if (!loader) return null;
  const mod = await loader();
  return mod.default;
}

export function getChapterQuiz(slug: string): ChapterQuiz | null {
  return quizModules[`/src/content/chapters/${slug}/quiz.ts`]?.quiz ?? null;
}
