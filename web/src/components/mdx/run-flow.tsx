import { ArrowDown, ArrowRight, Bot, Cpu, MessageCircle, Sparkles, Wrench } from "lucide-react";
import { motion } from "motion/react";
import { Fragment } from "react";
import { cn } from "@/lib/utils";

type NodeKind = "user" | "agent" | "tool" | "model" | "output";

const KIND: Record<NodeKind, { icon: typeof Bot; cls: string; dot: string }> = {
  user: {
    icon: MessageCircle,
    cls: "border-chart-3/40 bg-chart-3/10 text-chart-3",
    dot: "bg-chart-3",
  },
  agent: { icon: Bot, cls: "border-primary/40 bg-primary/10 text-primary", dot: "bg-primary" },
  tool: { icon: Wrench, cls: "border-chart-2/45 bg-chart-2/12 text-chart-2", dot: "bg-chart-2" },
  model: { icon: Cpu, cls: "border-chart-4/45 bg-chart-4/12 text-chart-4", dot: "bg-chart-4" },
  output: {
    icon: Sparkles,
    cls: "border-chart-5/45 bg-chart-5/12 text-chart-5",
    dot: "bg-chart-5",
  },
};

export interface FlowNode {
  kind: NodeKind;
  label: string;
  detail?: string;
}

/**
 * A horizontal (vertical on mobile) execution graph: chip nodes joined by directional
 * arrows, with a pulse that travels the path once in view. Conveys the order of a run.
 */
export function RunFlow({ nodes, title }: { nodes: FlowNode[]; title?: string }) {
  return (
    <figure className="my-7 rounded-xl border bg-card/50 p-5">
      {title ? (
        <figcaption className="mb-5 font-display text-sm font-semibold tracking-tight text-muted-foreground">
          {title}
        </figcaption>
      ) : null}
      <motion.ol
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
        transition={{ staggerChildren: 0.16 }}
        className="flex flex-col items-stretch gap-0 md:flex-row md:items-start"
      >
        {nodes.map((node, i) => {
          const { icon: Icon, cls, dot } = KIND[node.kind];
          const last = i === nodes.length - 1;
          return (
            <Fragment key={`${node.kind}-${node.label}`}>
              <motion.li
                variants={{ hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-1 items-center gap-3 md:flex-col md:gap-2 md:text-center"
              >
                <span
                  className={cn(
                    "relative grid size-12 shrink-0 place-items-center rounded-xl border shadow-sm",
                    cls,
                  )}
                >
                  <Icon className="size-5" />
                  <span
                    className={cn(
                      "absolute -top-1 -right-1 grid size-4 place-items-center rounded-full text-[0.6rem] font-bold text-background",
                      dot,
                    )}
                  >
                    {i + 1}
                  </span>
                </span>
                <span className="flex flex-col md:items-center">
                  <span className="font-medium text-sm leading-tight">{node.label}</span>
                  {node.detail ? (
                    <span className="font-mono text-[0.7rem] text-muted-foreground">
                      {node.detail}
                    </span>
                  ) : null}
                </span>
              </motion.li>

              {!last ? (
                <motion.li
                  aria-hidden="true"
                  variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }}
                  transition={{ duration: 0.4 }}
                  className="flex items-center justify-center md:flex-1 md:pt-3"
                >
                  {/* vertical arrow on mobile, horizontal on desktop */}
                  <span className="relative my-1 ml-5 flex h-7 w-px items-center justify-center md:my-0 md:ml-0 md:h-px md:w-full">
                    <span className="absolute inset-0 bg-gradient-to-b from-border to-border md:bg-gradient-to-r" />
                    <motion.span
                      initial={{ offsetDistance: "0%", opacity: 0 }}
                      whileInView={{ opacity: [0, 1, 1, 0] }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.25 + i * 0.16 }}
                      className={cn(
                        "absolute size-2 rounded-full md:top-1/2 md:-translate-y-1/2",
                        dot,
                      )}
                      style={{ left: "50%", top: "50%", transform: "translate(-50%,-50%)" }}
                    />
                  </span>
                  <ArrowDown className="size-4 shrink-0 text-muted-foreground md:hidden" />
                  <ArrowRight className="hidden size-4 shrink-0 text-muted-foreground md:-ml-1 md:block" />
                </motion.li>
              ) : null}
            </Fragment>
          );
        })}
      </motion.ol>
    </figure>
  );
}
