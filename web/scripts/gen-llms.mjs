// Generates llms.txt artifacts after the Vite build:
//   dist/llms.txt              index of chapters and pages (llmstxt.org format)
//   dist/llms-full.txt         every chapter's content (PL + EN) concatenated
//   dist/chapters/<slug>.md    per-chapter Polish markdown
//   dist/chapters/<slug>.en.md per-chapter English markdown
//
// Chapter metadata is loaded by transpiling curriculum.ts with esbuild (it has only a
// type-only import, so it reduces to pure data). Chapter bodies come from the MDX sources,
// with the custom JSX components reduced to plain markdown.

import { mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { transform } from "esbuild";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(root, "dist");
const chaptersDir = join(root, "src", "content", "chapters");
const SITE = "https://sircypkowskyy.github.io/pydantic-ai-custom-guide";

async function loadCurriculum() {
  const src = readFileSync(join(root, "src", "content", "curriculum.ts"), "utf8");
  const { code } = await transform(src, { loader: "ts", format: "esm" });
  const tmp = join(dist, ".curriculum.mjs");
  writeFileSync(tmp, code);
  const mod = await import(pathToFileURL(tmp).href);
  rmSync(tmp, { force: true });
  return mod;
}

function mdxToMarkdown(src) {
  return src
    .replace(
      /<Mermaid[\s\S]*?chart=\{`([\s\S]*?)`\}[\s\S]*?\/>/g,
      (_, chart) => `\n\`\`\`mermaid\n${chart.trim()}\n\`\`\`\n`,
    )
    .replace(/<RunFlow[\s\S]*?\/>/g, (m) => {
      const labels = [...m.matchAll(/label:\s*"([^"]+)"/g)].map((x) => x[1]);
      return labels.length ? `\n> Flow: ${labels.join(" -> ")}\n` : "";
    })
    .replace(/<Callout[^>]*kind="([^"]*)"[^>]*>/g, (_, k) => `\n**[${k}]**\n\n`)
    .replace(/<Callout[^>]*>/g, "\n**[note]**\n\n")
    .replace(/<\/Callout>/g, "\n")
    .replace(/<Term[^>]*>([\s\S]*?)<\/Term>/g, "$1")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function readBody(slug, lang) {
  try {
    return mdxToMarkdown(readFileSync(join(chaptersDir, slug, `${lang}.mdx`), "utf8"));
  } catch {
    return null;
  }
}

function chapterMarkdown(chapter, lang) {
  const body = readBody(chapter.slug, lang);
  const sources = chapter.docs.map((d) => `- [${d.label}](${d.url})`).join("\n");
  const head = [
    `# ${chapter.title[lang]}`,
    "",
    `> ${chapter.summary[lang]}`,
    "",
    lang === "pl" ? "## Źródła w dokumentacji" : "## Source documentation",
    sources,
    "",
  ].join("\n");
  return `${head}\n${body ?? (lang === "pl" ? "_Treść w przygotowaniu._" : "_Content in preparation._")}\n`;
}

async function main() {
  let curriculum;
  try {
    curriculum = await loadCurriculum();
  } catch (e) {
    console.error("gen-llms: skipped (could not load curriculum):", e.message);
    return;
  }
  const { chapters } = curriculum;

  mkdirSync(join(dist, "chapters"), { recursive: true });

  // Per-chapter markdown
  for (const chapter of chapters) {
    writeFileSync(join(dist, "chapters", `${chapter.slug}.md`), chapterMarkdown(chapter, "pl"));
    writeFileSync(join(dist, "chapters", `${chapter.slug}.en.md`), chapterMarkdown(chapter, "en"));
  }

  // llms.txt index
  const chapterLinks = chapters
    .map(
      (c) => `- [${c.order}. ${c.title.pl}](${SITE}/chapters/${c.slug}.md): ${c.summary.pl}`,
    )
    .join("\n");
  const pageLinks = [
    `- [Strona główna / Home](${SITE}/): wprowadzenie i program kursu`,
    `- [Program / Curriculum](${SITE}/chapters): pełna lista rozdziałów`,
    `- [Postępy / Progress](${SITE}/progress): panel wyników i plan nauki`,
    `- [Piaskownica / Playground](${SITE}/playground): odtwarzanie śladów uruchomień`,
    `- [O przewodniku / About](${SITE}/about): informacje o projekcie`,
  ].join("\n");
  const llms = `# Pydantic AI - Przewodnik (PL/EN)

> Dwujęzyczny przewodnik po Pydantic AI na czerwiec 2026: agenty, narzędzia, modele, structured output, MCP, multi-agent, testy i wdrożenia. Bilingual (Polish/English) guide to Pydantic AI.

Strona jest statycznym SPA na GitHub Pages. Każdy rozdział ma wersję markdown pod adresem \`/chapters/<slug>.md\` (polski) i \`/chapters/<slug>.en.md\` (angielski). Pełna treść kursu: \`/llms-full.txt\`.

## Rozdziały / Chapters

${chapterLinks}

## Strony / Pages

${pageLinks}

## Pełna treść / Full content

- [llms-full.txt](${SITE}/llms-full.txt): cała treść kursu w jednym pliku / the whole course in one file
`;
  writeFileSync(join(dist, "llms.txt"), llms);

  // llms-full.txt
  const parts = chapters
    .map((c) => {
      const pl = readBody(c.slug, "pl");
      const en = readBody(c.slug, "en");
      const sections = [`## ${c.order}. ${c.title.pl} / ${c.title.en}`, "", `> ${c.summary.pl}`, ""];
      if (pl) sections.push("### Polski", "", pl, "");
      if (en) sections.push("### English", "", en, "");
      if (!pl && !en) sections.push("_Treść w przygotowaniu / content in preparation._", "");
      return sections.join("\n");
    })
    .join("\n\n---\n\n");
  const full = `# Pydantic AI - Przewodnik: pełna treść / full content

> Wygenerowane automatycznie z rozdziałów kursu. Auto-generated from the course chapters.

${parts}
`;
  writeFileSync(join(dist, "llms-full.txt"), full);

  console.log(`gen-llms: wrote llms.txt, llms-full.txt, and ${chapters.length * 2} chapter markdown files`);
}

await main();
