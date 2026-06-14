import { useEffect } from "react";
import { useLanguage } from "@/hooks/use-language";
import { site } from "@/lib/site";

export interface DocumentMeta {
  title: string;
  description?: string;
  /** Route path without the deployment base, e.g. "/chapters/agenty". */
  path?: string;
  type?: "website" | "article";
  image?: string;
}

function upsertMeta(key: string, value: string, attr: "name" | "property") {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", value);
}

function upsertLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

/**
 * Imperatively manages document head per route: title, description, canonical, Open Graph
 * and Twitter Card tags. A static SPA has no server render, so crawlers that execute JS
 * still get correct per-page metadata.
 */
export function useDocumentMeta({ title, description, path, type, image }: DocumentMeta) {
  const { lang } = useLanguage();

  useEffect(() => {
    const fullTitle = title === site.name ? title : `${title} - ${site.shortName}`;
    const desc = description ?? site.description;
    const origin = window.location.origin;
    const url = `${origin}${import.meta.env.BASE_URL}${(path ?? "").replace(/^\//, "")}`;
    const ogImage = `${origin}${import.meta.env.BASE_URL}og-image.png`;

    document.title = fullTitle;
    upsertMeta("description", desc, "name");
    upsertLink("canonical", url);

    upsertMeta("og:site_name", site.name, "property");
    upsertMeta("og:title", fullTitle, "property");
    upsertMeta("og:description", desc, "property");
    upsertMeta("og:url", url, "property");
    upsertMeta("og:type", type ?? "website", "property");
    upsertMeta("og:locale", lang === "pl" ? "pl_PL" : "en_US", "property");
    upsertMeta("og:image", image ?? ogImage, "property");

    upsertMeta("twitter:card", "summary_large_image", "name");
    upsertMeta("twitter:title", fullTitle, "name");
    upsertMeta("twitter:description", desc, "name");
    upsertMeta("twitter:image", image ?? ogImage, "name");
  }, [title, description, path, type, image, lang]);
}
