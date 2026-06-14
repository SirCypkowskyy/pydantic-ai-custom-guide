"""Chapter 4: Structured output.

Shows how to get typed results out of an agent instead of free-form text:

1. a Pydantic ``BaseModel`` as ``output_type`` so ``result.output`` is a parsed object,
2. a union of models so the agent picks the right shape for the question,
3. an ``output_validator`` that raises ``ModelRetry`` to push back on bad output.

Run it with: ``uv run sandbox/04-structured-output/main.py``
"""

from __future__ import annotations

import asyncio

from pydantic import BaseModel, Field
from pydantic_ai import Agent, ModelRetry, PromptedOutput, RunContext

from pai_sandbox_shared import ollama_model


class CityFact(BaseModel):
    """A single fact about a city, returned as structured data."""

    city: str = Field(description="Name of the city.")
    country: str = Field(description="Country the city is in.")
    population_millions: float = Field(description="Approximate population in millions.")
    fun_fact: str = Field(description="One short, interesting fact about the city.")


# The simplest case: a Pydantic model as output_type. ``result.output`` is a CityFact.
city_agent = Agent(
    ollama_model("qwen3-coder:480b"),
    output_type=CityFact,
    instructions="Wypełnij dane o mieście. Populację podaj liczbowo, w milionach.",
)


class Weather(BaseModel):
    """Answer shape for a weather-style question."""

    location: str
    summary: str


class Recipe(BaseModel):
    """Answer shape for a cooking-style question."""

    dish: str
    ingredients: list[str]


# A union output lets the model choose the right shape. PromptedOutput works on any
# OpenAI-compatible endpoint because it asks for JSON in the prompt rather than relying
# on a provider-specific structured-output feature.
router_agent = Agent(
    ollama_model("qwen3-coder:480b"),
    output_type=PromptedOutput(
        [Weather, Recipe],
        name="WeatherOrRecipe",
        description="Return weather info or a recipe, depending on the question.",
    ),
    instructions="Wybierz odpowiedni format odpowiedzi na podstawie pytania.",
)


# Validation: a model can return well-typed but nonsensical data. An output validator
# raises ModelRetry to tell the model what was wrong and let it correct itself.
validated_agent = Agent(
    ollama_model("qwen3-coder:480b"),
    output_type=CityFact,
    instructions="Podaj prawdziwe dane o mieście.",
)


@validated_agent.output_validator
def reject_empty_facts(_ctx: RunContext[None], output: CityFact) -> CityFact:
    """Force a retry when the population looks impossible."""
    if output.population_millions <= 0:
        raise ModelRetry("population_millions musi być dodatnia, popraw wartość.")
    return output


def run_city_fact() -> None:
    """Run synchronously and return a parsed Pydantic model."""
    result = city_agent.run_sync("Opowiedz mi o Krakowie.")
    fact = result.output
    print("City:", fact.city, "-", fact.country)
    print("Fun fact:", fact.fun_fact)


async def run_router() -> None:
    """Async run whose output type depends on the question."""
    result = await router_agent.run("Jakie są składniki klasycznej carbonary?")
    print("Router output type:", type(result.output).__name__)
    print("Router output:", result.output)


def run_validated() -> None:
    """Run synchronously while guarded by an output validator."""
    result = validated_agent.run_sync("Podaj dane o Warszawie.")
    print("Validated:", result.output.city, result.output.population_millions, "mln")


if __name__ == "__main__":
    run_city_fact()
    asyncio.run(run_router())
    run_validated()
