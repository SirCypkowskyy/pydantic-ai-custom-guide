import { type ReactNode, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

/**
 * Inline term with a definition. Uses a Popover so it works on touch screens (tap to open,
 * tap outside to close); on a mouse it also opens on hover via pointer-gated handlers.
 */
export function Term({ children, definition }: { children: ReactNode; definition: string }) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          onPointerEnter={(e) => {
            if (e.pointerType === "mouse") setOpen(true);
          }}
          onPointerLeave={(e) => {
            if (e.pointerType === "mouse") setOpen(false);
          }}
          className="cursor-help font-medium text-primary underline decoration-dotted decoration-primary/50 underline-offset-4"
        >
          {children}
        </button>
      </PopoverTrigger>
      <PopoverContent
        side="top"
        className="w-auto max-w-xs p-3 text-sm leading-relaxed"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        {definition}
      </PopoverContent>
    </Popover>
  );
}
