import { cn } from "@/lib/utils";

interface BrandLogoProps {
  className?: string;
  withWordmark?: boolean;
}

/**
 * Editorial wordmark: a bracketed check mark (validation, the heart of Pydantic) set in
 * the accent colour, paired with a serif wordmark. Deliberately not an AI-slop rounded
 * gradient blob.
 */
export function BrandLogo({ className, withWordmark = true }: BrandLogoProps) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <svg
        viewBox="0 0 32 32"
        className="size-7 shrink-0"
        fill="none"
        aria-hidden="true"
        role="img"
      >
        <title>Pydantic AI</title>
        <path
          d="M9 5H6.5A2.5 2.5 0 0 0 4 7.5v17A2.5 2.5 0 0 0 6.5 27H9M23 5h2.5A2.5 2.5 0 0 1 28 7.5v17a2.5 2.5 0 0 1-2.5 2.5H23"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          className="text-foreground/35"
        />
        <path
          d="M11.5 16.5 14.5 20l6.5-8"
          stroke="currentColor"
          strokeWidth="2.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-primary"
        />
      </svg>
      {withWordmark ? (
        <span className="font-display text-base leading-tight font-semibold tracking-tight">
          Cyprian's Pydantic<span className="text-primary"> AI</span> Guide
        </span>
      ) : null}
    </span>
  );
}
