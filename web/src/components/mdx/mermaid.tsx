import { useTheme } from "next-themes";
import { useEffect, useId, useRef, useState } from "react";

/**
 * Renders a Mermaid diagram, re-rendering on theme change. Mermaid is imported lazily so
 * it only loads on chapters that actually use a diagram.
 */
export function Mermaid({ chart, caption }: { chart: string; caption?: string }) {
  const { resolvedTheme } = useTheme();
  const rawId = useId().replace(/[^a-zA-Z0-9]/g, "");
  const ref = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      try {
        const mermaid = (await import("mermaid")).default;
        mermaid.initialize({
          startOnLoad: false,
          theme: resolvedTheme === "dark" ? "dark" : "neutral",
          fontFamily: "Hanken Grotesk, sans-serif",
          securityLevel: "strict",
        });
        const { svg } = await mermaid.render(`m${rawId}`, chart);
        if (!cancelled && ref.current) ref.current.innerHTML = svg;
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : "diagram error");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [chart, resolvedTheme, rawId]);

  if (error) {
    return <pre className="my-6 rounded-lg border border-destructive/40 p-4 text-xs">{error}</pre>;
  }

  return (
    <figure className="my-7 overflow-x-auto rounded-xl border bg-card/40 p-5 text-center [&_svg]:mx-auto [&_svg]:h-auto [&_svg]:max-w-full">
      <div ref={ref} />
      {caption ? (
        <figcaption className="mt-3 text-sm text-muted-foreground">{caption}</figcaption>
      ) : null}
    </figure>
  );
}
