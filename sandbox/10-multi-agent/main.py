"""Chapter 10: Multi-agent applications and graphs.

Shows the two main composition patterns from the chapter against a real model on
Ollama Cloud:

1. Agent delegation: one agent calls another from inside a tool and folds the
   delegate's usage back into the parent run.
2. A ``pydantic_graph`` state machine where each node drives a dedicated agent
   and the nodes hand control to one another while sharing typed state.

The graph wires three specialised agents into an editorial pipeline:
``Research`` gathers bullet points, ``Draft`` turns them into a short paragraph,
and ``Review`` either approves the draft or sends it back for one rewrite.

Run it with: ``uv run sandbox/10-multi-agent/main.py``
"""

from __future__ import annotations

import asyncio
from dataclasses import dataclass, field

from pydantic_ai import Agent, RunContext
from pydantic_graph import BaseNode, End, Graph, GraphRunContext

from pai_sandbox_shared import ollama_model

# A tool-capable model so delegation tools actually get called.
MODEL = ollama_model("qwen3-coder:480b")

# --- Part 1: agent delegation -------------------------------------------------

bullet_agent = Agent(
    MODEL,
    output_type=list[str],
    retries=3,
    instructions="Zwróć krótkie hasła. Każde hasło to jeden zwięzły punkt po polsku.",
)

editor_agent = Agent(
    MODEL,
    instructions=(
        "Użyj narzędzia `gather_points`, aby zebrać punkty na zadany temat, "
        "a następnie zwróć jedno zdanie podsumowania po polsku."
    ),
)


@editor_agent.tool
async def gather_points(ctx: RunContext[None], topic: str, count: int) -> list[str]:
    """Delegate point gathering to ``bullet_agent`` and share usage with the parent."""
    result = await bullet_agent.run(
        f"Podaj {count} punktów na temat: {topic}.",
        usage=ctx.usage,
    )
    return result.output


async def run_delegation() -> None:
    """Run the parent agent, which delegates to the bullet agent through a tool."""
    result = await editor_agent.run("Streść w jednym zdaniu, czym jest Pydantic AI.")
    print("Delegation:", result.output)
    print("Delegation requests:", result.usage().requests)


# --- Part 2: a pydantic-graph editorial pipeline ------------------------------


@dataclass
class Article:
    """Shared, typed state passed between graph nodes."""

    topic: str
    points: list[str] = field(default_factory=list)
    draft: str = ""
    revisions: int = 0


research_agent = Agent(
    MODEL,
    output_type=list[str],
    instructions="Zwróć 3 rzeczowe punkty na zadany temat. Każdy punkt po polsku.",
)
draft_agent = Agent(
    MODEL,
    instructions="Na podstawie punktów napisz jeden spójny akapit po polsku.",
)
review_agent = Agent(
    MODEL,
    output_type=bool,
    instructions=(
        "Oceń, czy akapit jest zwięzły i trzyma się tematu. "
        "Zwróć true, jeśli akapit jest dobry, w przeciwnym razie false."
    ),
)


@dataclass
class Research(BaseNode[Article]):
    """Collect bullet points for the topic and move on to drafting."""

    async def run(self, ctx: GraphRunContext[Article]) -> Draft:
        result = await research_agent.run(ctx.state.topic)
        ctx.state.points = result.output
        return Draft()


@dataclass
class Draft(BaseNode[Article]):
    """Turn the gathered points into a paragraph, then hand off to review."""

    async def run(self, ctx: GraphRunContext[Article]) -> Review:
        joined = "\n".join(f"- {point}" for point in ctx.state.points)
        result = await draft_agent.run(f"Temat: {ctx.state.topic}\nPunkty:\n{joined}")
        ctx.state.draft = result.output
        return Review()


@dataclass
class Review(BaseNode[Article, None, str]):
    """Approve the draft or send it back for a single rewrite."""

    async def run(self, ctx: GraphRunContext[Article]) -> Draft | End[str]:
        approved = await review_agent.run(ctx.state.draft)
        if approved.output or ctx.state.revisions >= 1:
            return End(ctx.state.draft)
        ctx.state.revisions += 1
        return Draft()


pipeline = Graph(nodes=[Research, Draft, Review])


async def run_pipeline() -> None:
    """Run the editorial graph from the ``Research`` node with fresh state."""
    state = Article(topic="Po co stosować typowane zależności w agentach?")
    result = await pipeline.run(Research(), state=state)
    print("Pipeline points:", state.points)
    print("Pipeline draft:", result.output)


async def main() -> None:
    """Run both the delegation demo and the graph pipeline."""
    await run_delegation()
    await run_pipeline()


if __name__ == "__main__":
    asyncio.run(main())
