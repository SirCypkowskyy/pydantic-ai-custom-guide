/**
 * Central site configuration. Anything tied to the deployment target lives here so
 * there is a single place to change when the repo, URLs, or comment backend move.
 */

export const site = {
  name: "Cyprian's Pydantic AI Guide",
  shortName: "Pydantic AI Guide",
  description: "Kompletny dwujęzyczny przewodnik po Pydantic AI - czerwiec 2026.",
  repo: "SirCypkowskyy/pydantic-ai-custom-guide",
  repoUrl: "https://github.com/SirCypkowskyy/pydantic-ai-custom-guide",
  sandboxUrl: "https://github.com/SirCypkowskyy/pydantic-ai-custom-guide/tree/main/sandbox",
  author: {
    name: "Cyprian Gburek",
    handle: "SirCypkowskyy",
    site: "https://gburek.dev",
    github: "https://github.com/SirCypkowskyy",
  },
  /** Updated whenever the content is reviewed against upstream docs. */
  contentDate: "2026-06",
} as const;

/**
 * giscus comment backend. repoId and categoryId were fetched from the GitHub GraphQL
 * API after Discussions were enabled. The giscus GitHub App must still be installed on
 * the repo for comments to work (one-time browser grant at github.com/apps/giscus).
 */
export const giscus = {
  repo: "SirCypkowskyy/pydantic-ai-custom-guide" as const,
  repoId: "R_kgDOS6NvUQ",
  category: "Announcements",
  categoryId: "DIC_kwDOS6NvUc4C_H_J",
} as const;
