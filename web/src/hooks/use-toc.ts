import { type RefObject, useEffect, useState } from "react";

export interface TocItem {
  id: string;
  text: string;
  level: number;
}

/**
 * Builds a table of contents from the headings inside a container and tracks which one is
 * currently in view (scroll spy). Re-scans whenever `ready` flips, so it picks up async
 * MDX content once it has mounted.
 */
export function useToc(containerRef: RefObject<HTMLElement | null>, ready: boolean) {
  const [items, setItems] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const root = containerRef.current;
    if (!(root && ready)) return;

    const headings = Array.from(root.querySelectorAll<HTMLElement>("h2[id], h3[id]"));
    setItems(
      headings.map((h) => ({
        id: h.id,
        text: h.textContent?.replace(/#$/, "").trim() ?? "",
        level: h.tagName === "H2" ? 2 : 3,
      })),
    );

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        }
      },
      { rootMargin: "-80px 0px -70% 0px", threshold: 0 },
    );
    for (const h of headings) observer.observe(h);
    return () => observer.disconnect();
  }, [containerRef, ready]);

  return { items, activeId };
}
