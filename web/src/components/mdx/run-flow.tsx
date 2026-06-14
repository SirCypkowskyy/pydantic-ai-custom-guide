import { Bot, Cpu, MessageCircle, Sparkles, Wrench } from "lucide-react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

type NodeKind = "user" | "agent" | "tool" | "model" | "output";

const KIND: Record<NodeKind, { icon: typeof Bot; cls: string }> = {
  user: { icon: MessageCircle, cls: "border-chart-3/50 bg-chart-3/10 text-chart-3" },
  agent: { icon: Bot, cls: "border-primary/50 bg-primary/10 text-primary" },
  tool: { icon: Wrench, cls: "border-chart-2/50 bg-chart-2/12 text-chart-2" },
  model: { icon: Cpu, cls: "border-chart-4/50 bg-chart-4/12 text-chart-4" },
  output: { icon: Sparkles, cls: "border-chart-5/50 bg-chart-5/12 text-chart-5" },
};

export interface FlowNode {
  kind: NodeKind;
  label: string;
  detail?: string;
}

/**
 * A compact, animated execution graph. Nodes reveal in sequence and a pulse travels the
 * connectors, conveying the order of an agent run without a heavy graph library.
 */
export function RunFlow({ nodes, title }: { nodes: FlowNode[]; title?: string }) {
  return (
    <figure className="my-7 rounded-xl border bg-card/50 p-5">
      {title ? (
        <figcaption className="mb-4 font-display text-sm font-semibold tracking-tight text-muted-foreground">
          {title}
        </figcaption>
      ) : null}
      <motion.ol
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
        transition={{ staggerChildren: 0.18 }}
        className="flex flex-col gap-0 md:flex-row md:items-stretch md:gap-0"
      >
        {nodes.map((node, i) => {
          const { icon: Icon, cls } = KIND[node.kind];
          const last = i === nodes.length - 1;
          return (
            <motion.li
              key={`${node.kind}-${node.label}`}
              variants={{
                hidden: { opacity: 0, y: 10 },
                show: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-1 flex-col items-stretch md:items-center"
            >
              <div className="flex items-center gap-3 md:flex-col md:gap-2 md:text-center">
                <span
                  className={cn("grid size-11 shrink-0 place-items-center rounded-xl border", cls)}
                >
                  <Icon className="size-5" />
                </span>
                <span className="flex flex-col md:items-center">
                  <span className="font-medium text-sm leading-tight">{node.label}</span>
                  {node.detail ? (
                    <span className="text-xs text-muted-foreground">{node.detail}</span>
                  ) : null}
                </span>
              </div>
              {!last ? (
                <span className="relative my-1 ml-5 flex h-6 w-px items-center justify-center bg-border md:my-3 md:ml-0 md:h-px md:w-full">
                  <motion.span
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: [0, 1, 0] }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.1, delay: 0.3 + i * 0.18, repeat: 1 }}
                    className="absolute size-1.5 rounded-full bg-primary"
                  />
                </span>
              ) : null}
            </motion.li>
          );
        })}
      </motion.ol>
    </figure>
  );
}
