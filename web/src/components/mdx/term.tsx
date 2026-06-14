import type { ReactNode } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

/** Inline term with a definition tooltip, used to gloss jargon on first use. */
export function Term({ children, definition }: { children: ReactNode; definition: string }) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <span className="cursor-help font-medium text-primary underline decoration-dotted decoration-primary/50 underline-offset-4">
          {children}
        </span>
      </TooltipTrigger>
      <TooltipContent className="max-w-xs text-sm leading-relaxed">{definition}</TooltipContent>
    </Tooltip>
  );
}
