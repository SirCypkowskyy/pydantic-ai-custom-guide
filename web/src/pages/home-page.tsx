import { useDocumentMeta } from "@/hooks/use-document-meta";
import { useLanguage } from "@/hooks/use-language";
import { HomeCurriculum } from "@/views/home/home-curriculum";
import { HomeFeatures } from "@/views/home/home-features";
import { HomeHero } from "@/views/home/home-hero";

export function HomePage() {
  const { lang } = useLanguage();
  useDocumentMeta({
    title:
      lang === "pl"
        ? "Pydantic AI - kompletny przewodnik po polsku i angielsku"
        : "Pydantic AI - the complete guide in Polish and English",
    description:
      lang === "pl"
        ? "Naucz się Pydantic AI od podstaw do produkcji: agenty, narzędzia, modele, MCP, testy i wdrożenia. Z działającymi przykładami w Pythonie."
        : "Learn Pydantic AI from basics to production: agents, tools, models, MCP, testing and deployment. With runnable Python examples.",
    path: "",
  });

  return (
    <>
      <HomeHero />
      <HomeFeatures />
      <HomeCurriculum />
    </>
  );
}
