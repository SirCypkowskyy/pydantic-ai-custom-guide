"""Chapter 12: Observability with Logfire.

Shows how a few lines of Logfire setup give you a full trace of every agent run:
the messages exchanged with the model, each tool call with its arguments and
result, token usage, and latency.

The example instruments a small tool-using agent. We configure Logfire with
``send_to_logfire="if-token-present"`` so the script runs the same way whether or
not a Logfire token is configured: with a token the spans are shipped to your
Logfire project, without one the instrumentation stays local and silent. Set
``LOGFIRE_TOKEN`` in the repository ``.env`` to see the traces in the dashboard.

Run it with: ``uv run sandbox/12-logfire-observability/main.py``
"""

from __future__ import annotations

import logfire
from pydantic import BaseModel
from pydantic_ai import Agent, RunContext

from pai_sandbox_shared import ollama_model

# Configure Logfire once, before any agent runs. ``if-token-present`` keeps the
# script runnable offline: instrumentation is set up but nothing is shipped
# unless LOGFIRE_TOKEN is available.
logfire.configure(
    send_to_logfire="if-token-present",
    service_name="ch12-logfire-observability",
)
# Trace every Pydantic AI agent run.
logfire.instrument_pydantic_ai()
# Capture the underlying HTTP calls to the model provider as well.
logfire.instrument_httpx(capture_all=True)


class WeatherDeps(BaseModel):
    """Typed dependencies: a tiny in-memory weather table."""

    readings: dict[str, str]


class WeatherReport(BaseModel):
    """Structured answer returned by the agent."""

    city: str
    summary: str


weather_agent = Agent(
    # A tool-capable model so the agent can actually call the tool below.
    ollama_model("qwen3-coder:480b"),
    deps_type=WeatherDeps,
    output_type=WeatherReport,
    instructions=(
        "Sprawdz pogode dla podanego miasta uzywajac narzedzia, "
        "a nastepnie zwiezle ja podsumuj po polsku."
    ),
)


@weather_agent.tool
def get_weather(ctx: RunContext[WeatherDeps], city: str) -> str:
    """Return the current weather for a city from the dependency table."""
    return ctx.deps.readings.get(city, "brak danych")


def run_traced() -> None:
    """Run the agent inside an explicit span so the run groups nicely in Logfire."""
    deps = WeatherDeps(readings={"Warszawa": "18 stopni, slonecznie"})
    with logfire.span("weather lookup"):
        result = weather_agent.run_sync("Jaka jest pogoda w Warszawie?", deps=deps)
    print("Miasto:", result.output.city)
    print("Podsumowanie:", result.output.summary)


if __name__ == "__main__":
    run_traced()
