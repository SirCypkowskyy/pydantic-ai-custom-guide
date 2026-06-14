import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";

// Monotonic id so each render uses a unique mermaid id. Reusing an id makes mermaid's
// temporary measurement nodes collide, which renders the diagram doubled and offset.
let renderSeq = 0;

/**
 * Renders a Mermaid diagram, re-rendering on theme change. Mermaid is imported lazily so
 * it only loads on chapters that actually use a diagram.
 */
export function Mermaid({ chart, caption }: { chart: string; caption?: string }) {
  const { resolvedTheme } = useTheme();
  const ref = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    const el = ref.current;
    setError(null);

    void (async () => {
      try {
        const mermaid = (await import("mermaid")).default;
        mermaid.initialize({
          startOnLoad: false,
          theme: resolvedTheme === "dark" ? "dark" : "neutral",
          fontFamily: "Geist, sans-serif",
          securityLevel: "strict",
        });
        renderSeq += 1;
        const { svg } = await mermaid.render(`mmd-${renderSeq}`, chart);
        if (!cancelled && el) el.innerHTML = svg;
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : "diagram error");
      }
    })();

    return () => {
      cancelled = true;
      if (el) el.innerHTML = "";
    };
  }, [chart, resolvedTheme]);

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
