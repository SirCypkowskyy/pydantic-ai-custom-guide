import { useDocumentMeta } from "@/hooks/use-document-meta";
import { useLanguage } from "@/hooks/use-language";
import { HomeCurriculum } from "@/views/home/home-curriculum";

export function ChaptersPage() {
  const { lang } = useLanguage();
  useDocumentMeta({
    title: lang === "pl" ? "Program kursu" : "Curriculum",
    description:
      lang === "pl"
        ? "Pełny program przewodnika po Pydantic AI: piętnaście rozdziałów od podstaw do produkcji."
        : "The full Pydantic AI guide curriculum: fifteen chapters from basics to production.",
    path: "chapters",
  });
  return <HomeCurriculum />;
}
