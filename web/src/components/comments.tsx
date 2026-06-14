import Giscus from "@giscus/react";
import { useTheme } from "next-themes";
import { useLanguage } from "@/hooks/use-language";
import { giscus } from "@/lib/site";

/**
 * giscus-backed comments, mapped per pathname so each chapter has its own thread. Theme
 * and language follow the app. Requires the giscus GitHub App installed on the repo.
 */
export function Comments() {
  const { resolvedTheme } = useTheme();
  const { lang } = useLanguage();

  return (
    <Giscus
      id="comments"
      repo={giscus.repo}
      repoId={giscus.repoId}
      category={giscus.category}
      categoryId={giscus.categoryId}
      mapping="pathname"
      strict="1"
      reactionsEnabled="1"
      emitMetadata="0"
      inputPosition="top"
      theme={resolvedTheme === "dark" ? "dark_dimmed" : "light"}
      lang={lang}
      loading="lazy"
    />
  );
}
