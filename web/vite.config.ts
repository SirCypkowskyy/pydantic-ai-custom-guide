import { copyFileSync, writeFileSync } from "node:fs";
import { fileURLToPath, URL } from "node:url";
import mdx from "@mdx-js/rollup";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkFrontmatter from "remark-frontmatter";
import remarkGfm from "remark-gfm";
import { defineConfig } from "vite";

// GitHub Pages serves the site under /<repo>/. In dev we want "/".
const base = process.env.NODE_ENV === "production" ? "/pydantic-ai-custom-guide/" : "/";

/**
 * GitHub Pages has no server to rewrite unknown paths back to the SPA. Serving a copy of
 * index.html as 404.html makes deep links and hard refreshes resolve to the app, which
 * then routes client-side. `.nojekyll` stops Pages from filtering underscore files.
 */
function githubPagesSpaFallback() {
  return {
    name: "github-pages-spa-fallback",
    closeBundle() {
      const out = fileURLToPath(new URL("./dist", import.meta.url));
      try {
        copyFileSync(`${out}/index.html`, `${out}/404.html`);
        writeFileSync(`${out}/.nojekyll`, "");
      } catch {
        /* dist not produced (e.g. dev server) */
      }
    },
  };
}

export default defineConfig({
  base,
  plugins: [
    tanstackRouter({ target: "react", autoCodeSplitting: true }),
    {
      enforce: "pre",
      ...mdx({
        providerImportSource: "@mdx-js/react",
        remarkPlugins: [remarkFrontmatter, remarkGfm],
        rehypePlugins: [
          rehypeSlug,
          [rehypeAutolinkHeadings, { behavior: "wrap" }],
          [
            rehypePrettyCode,
            {
              theme: { dark: "github-dark-dimmed", light: "github-light" },
              keepBackground: false,
            },
          ],
        ],
      }),
    },
    react({ include: /\.(jsx|js|mdx|md|tsx|ts)$/ }),
    tailwindcss(),
    githubPagesSpaFallback(),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
