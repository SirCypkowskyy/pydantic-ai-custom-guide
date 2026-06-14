import { type ComponentPropsWithoutRef, useRef, useState } from "react";
import { Check } from "@/components/animate-ui/icons/check";
import { Copy } from "@/components/animate-ui/icons/copy";
import { AnimateIcon } from "@/components/animate-ui/icons/icon";
import { cn } from "@/lib/utils";

/**
 * Renders a build-time highlighted <pre> (from rehype-pretty-code) inside a framed
 * card with a copy button. The code string is read from the DOM on click, so we do not
 * re-serialise the highlighted spans.
 */
export function Pre({ className, children, ...props }: ComponentPropsWithoutRef<"pre">) {
  const ref = useRef<HTMLPreElement>(null);
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    const text = ref.current?.textContent ?? "";
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <div className="group relative my-6 overflow-hidden rounded-xl border bg-[#fbfaf8] dark:bg-[#1d1a18]">
      <AnimateIcon animateOnHover asChild>
        <button
          type="button"
          onClick={copy}
          aria-label="Copy code"
          className="absolute top-2.5 right-2.5 z-10 grid size-8 place-items-center rounded-md border bg-background/80 text-muted-foreground opacity-0 backdrop-blur transition-all hover:text-foreground focus-visible:opacity-100 group-hover:opacity-100"
        >
          {copied ? <Check className="size-4 text-chart-5" /> : <Copy className="size-4" />}
        </button>
      </AnimateIcon>
      <pre
        ref={ref}
        className={cn(
          "scrollbar-slim overflow-x-auto py-4 text-[0.825rem] leading-relaxed [&_code]:grid [&_code]:font-mono [&_.line]:px-4 [&_[data-line]]:px-4",
          className,
        )}
        {...props}
      >
        {children}
      </pre>
    </div>
  );
}
