import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Code, CodeBlock, CodeHeader } from "@/components/animate-ui/components/animate/code";
import { ArrowRight } from "@/components/animate-ui/icons/arrow-right";
import { AnimateIcon } from "@/components/animate-ui/icons/icon";
import { Sparkles } from "@/components/animate-ui/icons/sparkles";
import { Terminal } from "@/components/animate-ui/icons/terminal";
import { Button } from "@/components/ui/button";
import { chapters } from "@/content/curriculum";
import { useLanguage } from "@/hooks/use-language";

const SNIPPET = `from pydantic_ai import Agent

agent = Agent(
    "openai:gpt-4o",
    system_prompt="Odpowiadaj zwięźle i po polsku.",
)

odpowiedz = agent.run_sync("Czym jest Pydantic AI?")
print(odpowiedz.output)
#> Pydantic AI to framework do budowy agentów LLM...`;

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
};

export function HomeHero() {
  const { t } = useLanguage();
  const totalMinutes = chapters.reduce((sum, c) => sum + c.minutes, 0);

  return (
    <section className="relative overflow-hidden border-b">
      <div
        className="-z-10 pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)",
          backgroundSize: "22px 22px",
        }}
        aria-hidden="true"
      />
      <div className="mx-auto grid w-full max-w-6xl gap-12 px-5 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:py-24">
        <motion.div
          initial="hidden"
          animate="show"
          transition={{ staggerChildren: 0.09, delayChildren: 0.05 }}
          className="flex flex-col items-start gap-6"
        >
          <motion.span
            variants={fadeUp}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2 rounded-full border bg-card px-3 py-1 text-sm font-medium text-muted-foreground"
          >
            <Sparkles className="size-3.5 text-primary" animateOnView />
            {t("home.hero.kicker")}
          </motion.span>

          <motion.h1
            variants={fadeUp}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-balance font-display text-[clamp(2.5rem,6vw,4.25rem)] font-semibold leading-[1.02] tracking-tight"
          >
            {t("home.hero.titleLead")}{" "}
            <span className="text-primary">{t("home.hero.titleEm")}</span>{" "}
            {t("home.hero.titleTail")}
          </motion.h1>

          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-xl text-pretty text-lg text-muted-foreground leading-relaxed"
          >
            {t("home.hero.subtitle")}
          </motion.p>

          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-wrap items-center gap-3"
          >
            <AnimateIcon animateOnHover asChild>
              <Button asChild size="lg" className="group gap-2">
                <Link to="/chapters/$slug" params={{ slug: chapters[0]?.slug ?? "instalacja" }}>
                  {t("home.hero.cta")}
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </Button>
            </AnimateIcon>
            <Button asChild size="lg" variant="outline">
              <Link to="/chapters">{t("home.hero.ctaSecondary")}</Link>
            </Button>
          </motion.div>

          <motion.dl
            variants={fadeUp}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mt-2 flex gap-8"
          >
            {[
              { value: `${chapters.length}`, label: t("nav.chapters") },
              { value: `${Math.round(totalMinutes / 60)}h`, label: t("common.minutes") },
              { value: "PL / EN", label: t("nav.sourceDocs") },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col">
                <dt className="font-display text-2xl font-semibold tabular-nums">{stat.value}</dt>
                <dd className="text-xs text-muted-foreground uppercase tracking-wide">
                  {stat.label}
                </dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24, rotate: -1 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
          className="relative"
        >
          <div className="-inset-4 -z-10 absolute rounded-3xl bg-primary/5 blur-2xl" aria-hidden />
          <Code code={SNIPPET} className="shadow-xl shadow-black/5">
            <CodeHeader icon={Terminal} copyButton>
              <span className="font-mono text-xs">hello_agent.py</span>
            </CodeHeader>
            <CodeBlock lang="python" writing duration={2600} cursor />
          </Code>
        </motion.div>
      </div>
    </section>
  );
}
