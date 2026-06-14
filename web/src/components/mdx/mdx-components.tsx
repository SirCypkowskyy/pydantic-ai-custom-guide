import type { MDXComponents } from "mdx/types";
import { Callout } from "@/components/mdx/callout";
import { Pre } from "@/components/mdx/code-block";
import { Mermaid } from "@/components/mdx/mermaid";
import { RunFlow } from "@/components/mdx/run-flow";
import { Term } from "@/components/mdx/term";

/**
 * The component map handed to every rendered chapter. Base HTML elements are styled by
 * the `.mdx-body` CSS layer; only <pre> and the custom authoring components are mapped
 * here, which keeps chapter MDX free of imports.
 */
export const mdxComponents: MDXComponents = {
  pre: Pre,
  Callout,
  RunFlow,
  Mermaid,
  Term,
};
