# Pydantic AI Custom Guide - Design Spec

Date: 2026-06-14
Repo: `SirCypkowskyy/pydantic-ai-custom-guide`
Live URL: `https://sircypkowskyy.github.io/pydantic-ai-custom-guide/`

## 1. Goal

A static, bilingual (Polish default, English toggle) single-page application that
teaches Pydantic AI as of June 2026, plus a tour of wider Pydantic (core validation,
pydantic-settings, FastAPI integration). Deployed to GitHub Pages. Backed by a
`/sandbox` of runnable UV Python mini-projects, one per chapter, smoke-tested against
Ollama Cloud.

The bar for visual quality: comparable to react.dev/learn and the C# tour of
learn.microsoft.com. Rich pages with diagrams, tables, animated behavior examples,
execution/transition graphs, syntax-highlighted code, GFM-style annotations, footnotes,
tooltips, illustrations, and the occasional meme. Every page passes a strict visual QA
and a de-slop pass (no em-dashes, natural Polish, varied rhythm).

## 2. Stack

- Vite + React 19 + TypeScript (strict).
- Tailwind CSS v4.
- shadcn/ui plus animate-ui (animate-ui favored over shadcn where both fit) plus
  animate-ui icons.
- TanStack Router (HTML5 history with a `404.html` SPA fallback so deep links resolve
  on GitHub Pages under the base path).
- TanStack Query (loads chapter metadata, quiz JSON, and the search index; drives the
  simulated playground replay).
- Content authored as MDX. Shiki for build-time syntax highlighting. GFM callouts,
  footnotes, shadcn tooltips.
- Diagrams: Mermaid (architecture and flow), React Flow (interactive execution and
  transition graphs), shadcn chart / Recharts (model, cost, and benchmark data).
- Comments: `@giscus/react`, themed to match dark and light, mapped per pathname,
  language aware.
- Theme: custom ThemeProvider following the shadcn Vite pattern. Dark and light. Light
  may keep a white background.
- Quality gates: Biome (strict) and `tsc --noEmit` (strict) for the SPA. Ruff (strict)
  plus basedpyright/mypy for every sandbox project.

## 3. Bilingual model

Runtime language toggle. One route tree. UI strings from a lightweight i18n context.
Selected language persisted to `localStorage`, default Polish. Each chapter ships
`pl.mdx` and `en.mdx`; the active language selects which MDX renders.

## 4. Architecture separation

```
src/
  components/   presentational components and shadcn ui/ primitives
  views/        composed, stateful sections (no routing concerns)
  pages/        route-level, wire data and views together
  hooks/        useX only
  lib/          config (giscus, site), utils
  content/      chapters/<slug>/{pl,en}.mdx + quiz.json + meta.ts
  i18n/
  routes/       TanStack Router route definitions
```

Rule: hooks never import views; views never import pages; pages compose views and wire
data. shadcn primitives live under `components/ui/`.

## 5. Required shadcn components, each with a real job

alert (callouts), button, data-table (model comparison), calendar (study planner that
schedules chapters), card, badge (chapter status and difficulty), select (model picker),
sonner (quiz toasts), spinner, textarea (playground prompt), skeleton (loading states),
drawer (mobile nav and quiz review), dialog (code and image lightbox, progress
export/import), chart (token, cost, and benchmark visualizations), collapsible,
collapsible sidebar (chapter navigation), tooltip. Animate-ui supplies animated tabs,
counters, code, transitions, and icons used across the site.

## 6. Curriculum (~15 chapters)

Each chapter links the exact documentation pages it draws from and ends with a quiz.

1. Install and setup
2. Agents
3. Models (including Ollama Cloud)
4. Structured output
5. Tools and function calling
6. Dependencies
7. Messages and history
8. Streaming
9. MCP (Model Context Protocol)
10. Multi-agent, graphs, durable execution
11. Testing and evals
12. Logfire observability and deployment
13. Pydantic core validation
14. pydantic-settings
15. FastAPI / SQLModel integration

## 7. Quizzes, score, and progress (first-class feature)

- `useQuizProgress` hook backed by `localStorage` (namespaced, versioned schema).
- Per chapter persisted: completion state, best score, last score, attempts,
  per-question correctness, timestamp.
- Progress dashboard page: overall completion via shadcn chart, per-chapter status
  badges, score and streak counters (animate-ui), the calendar study planner.
- Sidebar shows a live progress ring and per-chapter check badges.
- Export/import progress as JSON via a shadcn dialog, so progress survives a cleared
  browser. Fully static, no backend.

## 8. /sandbox

One `uv init` project per chapter (~13-15). Strict Ruff plus basedpyright/mypy. Each
demonstrates that chapter's feature with pydantic-ai on Ollama Cloud. API key read from
`.env` (`OLLAMA_CLOUD_API_KEY`), never committed. A minimal `smoke_test` we run this
session to prove the project works. Chapters link to these projects on GitHub and to the
official pydantic-ai examples.

## 9. Comments and infra

- giscus wired via a single config module. `repoId` and `categoryId` fetched via
  `gh api graphql` after the repo exists and Discussions are enabled. The giscus GitHub
  App install is a one-time manual browser grant; flagged in the README.
- GitHub Actions workflow builds the Vite app and deploys to Pages. Vite `base` set to
  `/pydantic-ai-custom-guide/`. `404.html` duplicates `index.html` for SPA routing.

## 10. Playground

Browser-only and static. Replays pre-recorded agent traces with animation. No live model
calls from client code (that would leak the API key). Live calls live only in `/sandbox`.

## 11. Content quality

No `/humanize` skill is installed; its principles are applied manually on every page
(no em-dashes, varied sentence rhythm, natural Polish, no filler). frontend-design skill
drives the visual system. Source accuracy grounded in current (June 2026) Pydantic AI and
Pydantic docs, fetched during the build rather than recalled.

## 12. Build order

1. Create repo via `gh`, enable Discussions, fetch giscus IDs.
2. Scaffold SPA and design system (frontend-design), shadcn and animate-ui wiring,
   theming, i18n, routing, CI.
3. Build one reference chapter end to end to lock the page template.
4. Fan out remaining chapters (PL and EN) and sandbox projects in parallel via a Workflow.
5. Visual QA and de-slop pass on every page.
6. Deploy.
