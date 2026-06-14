export const meta = {
  name: "content-fanout",
  description: "Author the remaining Pydantic AI tutorial chapters (PL+EN+quiz) and sandbox projects",
  phases: [
    { title: "Chapters", detail: "one agent per chapter writes pl.mdx, en.mdx, quiz.ts" },
    { title: "Sandbox", detail: "one agent per chapter writes a runnable uv project" },
  ],
};

const REPO = "/home/cyprian/Documents/GitHub/pydantic-ai-learning-materials";

// Shared accuracy notes so agents do not hallucinate the API.
const API = `
Pydantic AI v2 API facts (June 2026), use these exactly:
- Create: \`Agent("openai:gpt-5.2", instructions=..., deps_type=..., output_type=...)\`. Prefer \`instructions\` over the legacy \`system_prompt\`.
- Run: \`run_sync()\` (sync), \`await run()\` (async), \`run_stream()\` (stream chunks), \`run_stream_events()\` (stream events). Result has \`.output\`.
- \`RunContext[Deps]\` is passed to dynamic instructions (\`@agent.instructions\`) and tools (\`@agent.tool\`); deps via \`ctx.deps\`.
- Tools: \`@agent.tool\` (with RunContext) or \`@agent.tool_plain\` (no context). Args validated from type hints.
- Structured output: pass a Pydantic BaseModel (or dataclass/TypedDict) as \`output_type=\`. Use \`NativeOutput\`, \`PromptedOutput\`, \`ToolOutput\` for output modes when relevant.
- Custom/OpenAI-compatible provider: \`from pydantic_ai.models.openai import OpenAIChatModel\` + \`from pydantic_ai.providers.openai import OpenAIProvider\`; \`OpenAIChatModel(name, provider=OpenAIProvider(base_url=..., api_key=...))\`.
- Messages/history: \`result.all_messages()\`, pass \`message_history=\` to a run. ModelMessage types live in \`pydantic_ai.messages\`.
- MCP: \`from pydantic_ai.mcp import MCPServerStdio, MCPServerStreamableHTTP\`; pass via \`toolsets=[...]\` on the Agent.
- Multi-agent/graph: \`pydantic_graph\` (\`BaseNode\`, \`Graph\`, \`GraphRunContext\`, \`End\`); durable execution via DBOS/Temporal integrations.
- Testing: \`TestModel\`, \`FunctionModel\` from \`pydantic_ai.models.test\` / \`.function\`; \`agent.override(model=...)\`; \`capture_run_messages()\`. Evals: \`pydantic_evals\` (\`Dataset\`, \`Case\`, evaluators).
- Observability: \`logfire\`; \`logfire.configure()\`, \`logfire.instrument_pydantic_ai()\`.
`;

const CHAPTERS = [
  {
    slug: "instalacja", num: 1, sandbox: "01-instalacja",
    plTitle: "Instalacja i pierwszy agent", enTitle: "Install & first agent",
    plSummary: "Postaw środowisko z uv, zainstaluj pydantic-ai i uruchom pierwszego agenta w kilka minut.",
    docs: "Installation https://pydantic.dev/docs/ai/install ; Overview https://pydantic.dev/docs/ai/overview",
    query: "installation, uv pip install pydantic-ai, first agent hello world, model setup, API keys env vars",
    points: "uv add pydantic-ai; setting model via provider:name; OPENAI_API_KEY / provider env vars; a minimal hello-world agent with run_sync; note Ollama Cloud is covered in the Models chapter.",
  },
  {
    slug: "modele", num: 3, sandbox: "03-modele",
    plTitle: "Modele i dostawcy", enTitle: "Models & providers",
    plSummary: "Podłącz różnych dostawców modeli, w tym Ollama Cloud, i poznaj ustawienia oraz fallbacki.",
    docs: "Models https://pydantic.dev/docs/ai/models ; OpenAI-compatible https://pydantic.dev/docs/ai/models/openai",
    query: "models, providers, OpenAI Anthropic Google, model settings, FallbackModel, OpenAI-compatible base_url api_key, Ollama",
    points: "model id format provider:name; ModelSettings (temperature, max_tokens); FallbackModel; OpenAIChatModel+OpenAIProvider for Ollama Cloud base_url https://ollama.com/v1 (this is what the sandbox uses, show it).",
  },
  {
    slug: "structured-output", num: 4, sandbox: "04-structured-output",
    plTitle: "Typowane wyjścia", enTitle: "Structured output",
    plSummary: "Zmuś model do zwracania danych zgodnych z modelem Pydantic. Walidacja, retry i tryby wyjścia.",
    docs: "Output https://pydantic.dev/docs/ai/output",
    query: "structured output, output_type Pydantic BaseModel, NativeOutput PromptedOutput ToolOutput, output validator, retries",
    points: "output_type=BaseModel; validation + ModelRetry; output modes (tool vs native vs prompted); output_validator. Show a BaseModel example.",
  },
  {
    slug: "narzedzia", num: 5, sandbox: "05-narzedzia",
    plTitle: "Narzędzia i wywołania funkcji", enTitle: "Tools & function calling",
    plSummary: "Daj agentowi narzędzia: rejestracja, walidacja argumentów, kontekst i obsługa błędów narzędzi.",
    docs: "Tools https://pydantic.dev/docs/ai/tools",
    query: "tools, @agent.tool, @agent.tool_plain, RunContext, tool args validation, ModelRetry, docstrings as descriptions",
    points: "@agent.tool (RunContext) vs @agent.tool_plain; args validated from type hints; ModelRetry for recoverable errors; tool docstring becomes description. Use a tool-capable model in the sandbox (e.g. qwen3-coder:480b).",
  },
  {
    slug: "zaleznosci", num: 6, sandbox: "06-zaleznosci",
    plTitle: "Zależności (DI)", enTitle: "Dependencies (DI)",
    plSummary: "System wstrzykiwania zależności w pydantic-ai: typowany kontekst, zasoby i testowalność.",
    docs: "Dependencies https://pydantic.dev/docs/ai/dependencies",
    query: "dependencies, deps_type, RunContext deps, dataclass dependencies, dependency injection for tools and instructions, testing with deps",
    points: "deps_type + a dataclass of deps; ctx.deps in tools/instructions; why DI makes agents testable (override deps in tests).",
  },
  {
    slug: "wiadomosci-historia", num: 7, sandbox: "07-wiadomosci-historia",
    plTitle: "Wiadomości i historia", enTitle: "Messages & history",
    plSummary: "Struktura wiadomości, prowadzenie rozmowy wielokrotnej i przekazywanie historii między uruchomieniami.",
    docs: "Message history https://pydantic.dev/docs/ai/message-history",
    query: "message history, all_messages, message_history parameter, multi-turn conversation, ModelMessage types, serialization",
    points: "result.all_messages(); pass message_history= to continue a conversation; ModelRequest/ModelResponse parts; serialising messages to JSON.",
  },
  {
    slug: "streaming", num: 8, sandbox: "08-streaming",
    plTitle: "Strumieniowanie", enTitle: "Streaming",
    plSummary: "Strumieniuj tekst i ustrukturyzowane wyjście w czasie rzeczywistym, z walidacją częściową.",
    docs: "Output / streaming https://pydantic.dev/docs/ai/output",
    query: "streaming, run_stream, stream_text, stream_output, partial validation of structured output, run_stream_events",
    points: "async with run_stream() as response; response.stream_text(); streaming structured output with partial validation; run_stream_events for fine-grained events.",
  },
  {
    slug: "mcp", num: 9, sandbox: "09-mcp",
    plTitle: "MCP (Model Context Protocol)", enTitle: "MCP (Model Context Protocol)",
    plSummary: "Podłącz agenta do serwerów MCP, korzystaj z zewnętrznych narzędzi i zasobów przez standard.",
    docs: "MCP https://pydantic.dev/docs/ai/mcp",
    query: "MCP client, MCPServerStdio, MCPServerStreamableHTTP, toolsets, connecting to MCP servers, agent as MCP server",
    points: "MCPServerStdio / MCPServerStreamableHTTP; pass via toolsets=[...]; agent.run inside async context manager for the server lifecycle. Note tool-capable model required.",
  },
  {
    slug: "multi-agent", num: 10, sandbox: "10-multi-agent",
    plTitle: "Multi-agent i grafy", enTitle: "Multi-agent & graphs",
    plSummary: "Łącz agentów, buduj grafy z pydantic-graph i poznaj trwałe wykonanie (durable execution).",
    docs: "Multi-agent https://pydantic.dev/docs/ai/multi-agent-applications ; Graphs https://pydantic.dev/docs/ai/graph",
    query: "multi-agent, agent delegation, programmatic hand-off, pydantic_graph BaseNode Graph GraphRunContext End, durable execution",
    points: "agent delegation (one agent's tool calls another); pydantic_graph nodes returning next node or End; mention durable execution (DBOS/Temporal). Keep the sandbox graph small.",
  },
  {
    slug: "testy-ewaluacje", num: 11, sandbox: "11-testy-ewaluacje",
    plTitle: "Testy i ewaluacje", enTitle: "Testing & evals",
    plSummary: "Testuj agentów bez wydawania pieniędzy na model i mierz jakość z pydantic-evals.",
    docs: "Testing https://pydantic.dev/docs/ai/testing ; Evals https://pydantic.dev/docs/ai/evals",
    query: "testing, TestModel, FunctionModel, agent.override, capture_run_messages, pydantic_evals Dataset Case evaluators",
    points: "TestModel/FunctionModel + agent.override(model=...) for offline tests; capture_run_messages; pydantic_evals Dataset/Case/evaluators for quality. The sandbox smoke_test here can use TestModel so it never needs the network (still keep the live key-gated pattern available).",
  },
  {
    slug: "logfire-observability", num: 12, sandbox: "12-logfire-observability",
    plTitle: "Obserwowalność z Logfire", enTitle: "Observability with Logfire",
    plSummary: "Podłącz Logfire i OpenTelemetry, śledź uruchomienia agenta i przygotuj wdrożenie.",
    docs: "Logfire / debugging https://pydantic.dev/docs/ai/logfire",
    query: "logfire, logfire.configure, instrument_pydantic_ai, OpenTelemetry, tracing agent runs, debugging",
    points: "logfire.configure() + logfire.instrument_pydantic_ai(); spans for runs/tools; OTel export; note token cost is the value. Sandbox shows configure + a traced run (logfire send disabled if no token).",
  },
  {
    slug: "pydantic-walidacja", num: 13, sandbox: "13-pydantic-walidacja",
    plTitle: "Pydantic: walidacja u podstaw", enTitle: "Pydantic: validation at the core",
    plSummary: "Fundament całej biblioteki: BaseModel, typy, walidatory, serializacja i TypeAdapter.",
    docs: "Pydantic docs https://pydantic.dev/docs/validation ; llms-full https://pydantic.dev/docs/validation/latest/llms-full.txt",
    query: "Pydantic BaseModel, field validation, field_validator model_validator, computed_field, TypeAdapter, model_dump model_validate, Field constraints",
    points: "This is core Pydantic (not pydantic-ai). BaseModel, Field constraints, @field_validator/@model_validator, computed_field, TypeAdapter, model_dump/model_validate. No LLM call needed; the sandbox here is pure Pydantic (its smoke test can run offline with plain assertions, no API key).",
  },
  {
    slug: "pydantic-settings", num: 14, sandbox: "14-pydantic-settings",
    plTitle: "pydantic-settings", enTitle: "pydantic-settings",
    plSummary: "Typowana konfiguracja aplikacji: zmienne środowiskowe, pliki .env i źródła ustawień.",
    docs: "Settings https://pydantic.dev/docs/validation/concepts/pydantic_settings",
    query: "pydantic-settings BaseSettings, SettingsConfigDict, env_file, environment variables, nested settings, customise sources",
    points: "BaseSettings + SettingsConfigDict(env_file='.env'); env var loading; nested models; secret handling. The sandbox uses pydantic-settings to load OLLAMA_CLOUD_API_KEY (dogfood); offline-safe smoke test.",
  },
  {
    slug: "fastapi-integracja", num: 15, sandbox: "15-fastapi-integracja",
    plTitle: "Integracja z FastAPI", enTitle: "FastAPI integration",
    plSummary: "Wystaw agenta przez API: walidacja żądań, modele odpowiedzi i strumieniowanie w FastAPI.",
    docs: "FastAPI https://fastapi.tiangolo.com ; Pydantic AI overview https://pydantic.dev/docs/ai/overview",
    query: "FastAPI integration, request/response Pydantic models, dependency injection, StreamingResponse with agent run_stream, async endpoints",
    points: "FastAPI endpoint that takes a Pydantic request model and returns a Pydantic response from agent.run; StreamingResponse using run_stream; reuse one Agent across requests. Sandbox: a small FastAPI app + a TestClient smoke test (offline with TestModel).",
  },
];

function chapterPrompt(ch) {
  return `You are authoring ONE chapter of a bilingual (Polish default, English) Pydantic AI tutorial. The quality bar is react.dev/learn.

STEP 1 - Read the reference chapter to learn the EXACT format and component usage (read all four):
- ${REPO}/web/src/content/chapters/agenty/pl.mdx
- ${REPO}/web/src/content/chapters/agenty/en.mdx
- ${REPO}/web/src/content/chapters/agenty/quiz.ts
- ${REPO}/web/src/components/mdx/mdx-components.tsx

STEP 2 - Ground in current docs. Run this and read the output (best effort, ~90s):
  npx ctx7@latest docs /pydantic/pydantic-ai "${ch.query}"
If it errors or times out, rely on the API facts below plus the reference.

${API}

STEP 3 - Write EXACTLY these three files (use the Write tool):
- ${REPO}/web/src/content/chapters/${ch.slug}/pl.mdx
- ${REPO}/web/src/content/chapters/${ch.slug}/en.mdx
- ${REPO}/web/src/content/chapters/${ch.slug}/quiz.ts

CHAPTER: ${ch.num}. ${ch.plTitle} / ${ch.enTitle}
PL summary: ${ch.plSummary}
Source docs to cite/ground in: ${ch.docs}
Must cover (accurately): ${ch.points}

HARD REQUIREMENTS:
- MDX body starts at "## " (h2). NEVER use h1 (the page already renders the title). Open with 1-2 intro paragraphs BEFORE the first h2.
- Components are auto-injected (no imports). Use them exactly like the reference:
  - <Callout kind="note|tip|warning|danger|key"> ...markdown... </Callout>
  - <RunFlow title="..." nodes={[{ kind: "user", label: "...", detail: "..." }, ...]} />  (kinds: user, agent, tool, model, output)
  - <Mermaid caption="..." chart={\`flowchart TD ...\`} />
  - <Term definition="...">term</Term>
- At least one Callout, at least one \`\`\`python code block, and at least one diagram (RunFlow or Mermaid). Add one footnote ([^id] + a [^id]: line) where natural.
- Python MUST use the v2 API above. Realistic, correct, runnable-looking code.
- End the prose with "## Co dalej" (pl) / "## What is next" (en) that mentions the runnable code in sandbox/${ch.sandbox}.
- LANGUAGE: natural, idiomatic Polish and English. NO em dashes anywhere (use a normal hyphen or rewrite). Vary sentence length. No AI filler ("w dzisiejszym świecie", "delve", "crucial", "moreover"). Write like a sharp human engineer.
- quiz.ts MUST match the reference type exactly: \`import type { ChapterQuiz } from "@/content/quiz-types";\` then \`export const quiz: ChapterQuiz = { questions: [...] }\` with EXACTLY 4 questions, each { prompt: {pl,en}, options: [{text:{pl,en}}, x4], answer: <index>, explanation: {pl,en} }.
- Match the reference length (substantial but focused, roughly 120-180 lines of MDX).

Return a one-line confirmation with the three paths written.`;
}

function sandboxPrompt(ch) {
  return `You are writing ONE runnable Pydantic AI example project for a uv workspace. It accompanies tutorial chapter ${ch.num} (${ch.enTitle}).

STEP 1 - Read the reference project and shared helper to learn the EXACT conventions:
- ${REPO}/sandbox/02-agenty/pyproject.toml
- ${REPO}/sandbox/02-agenty/main.py
- ${REPO}/sandbox/02-agenty/smoke_test.py
- ${REPO}/sandbox/02-agenty/README.md
- ${REPO}/sandbox/shared/src/pai_sandbox_shared/__init__.py
- ${REPO}/sandbox/pyproject.toml   (for the strict Ruff rules you must satisfy)

STEP 2 - Optionally ground the API by reading docs:
  npx ctx7@latest docs /pydantic/pydantic-ai "${ch.query}"

${API}

STEP 3 - Write EXACTLY these four files into ${REPO}/sandbox/${ch.sandbox}/ :
- pyproject.toml   (name "ch${String(ch.num).padStart(2, "0")}-${ch.slug}", same shape as the reference: depends on pydantic-ai and pai-sandbox-shared; add extra deps ONLY if needed, e.g. fastapi+httpx for chapter 15, pydantic-settings for 14, logfire for 12, pydantic-graph for 10)
- main.py          (a focused, correct demo of this chapter's feature; reuse \`from pai_sandbox_shared import ollama_model\`; for tool-using chapters pass a tool-capable model like ollama_model("qwen3-coder:480b"))
- smoke_test.py    (pytest; skip-if-no-key pattern from the reference using \`from pai_sandbox_shared import load_env, ollama_model\` and \`load_env()\` at top; for chapters 11/13/14/15 prefer an OFFLINE test using TestModel / plain Pydantic so it passes without the network)
- README.md        (Polish, like the reference, linking the chapter)

HARD REQUIREMENTS:
- Code MUST pass strict Ruff (rules "ALL" minus a small ignore list - see sandbox/pyproject.toml) and basedpyright standard. That means: full type annotations, \`from __future__ import annotations\`, module + function docstrings, no unused imports, prefer pathlib, no shadowing.
- Use the v2 Pydantic AI API above. Correct, realistic code.
- main.py guarded with \`if __name__ == "__main__":\`. Do NOT mix run_sync inside an already-running event loop (call run_sync at top level, use await run() inside async functions).
- NO em dashes in comments/docstrings. Natural English in code, Polish in README.

Return a one-line confirmation with the four paths written.`;
}

const FILES_SCHEMA = {
  type: "object",
  properties: {
    slug: { type: "string" },
    files: { type: "array", items: { type: "string" } },
    notes: { type: "string" },
  },
  required: ["slug", "files"],
  additionalProperties: false,
};

phase("Chapters");
log(`Authoring ${CHAPTERS.length} chapters (PL+EN+quiz)...`);
const chapterResults = await parallel(
  CHAPTERS.map((ch) => () =>
    agent(chapterPrompt(ch), {
      label: `chapter:${ch.slug}`,
      phase: "Chapters",
      schema: FILES_SCHEMA,
    }),
  ),
);

phase("Sandbox");
log(`Authoring ${CHAPTERS.length} sandbox projects...`);
const sandboxResults = await parallel(
  CHAPTERS.map((ch) => () =>
    agent(sandboxPrompt(ch), {
      label: `sandbox:${ch.sandbox}`,
      phase: "Sandbox",
      schema: FILES_SCHEMA,
    }),
  ),
);

const okChapters = chapterResults.filter(Boolean).length;
const okSandbox = sandboxResults.filter(Boolean).length;
log(`Done: ${okChapters}/${CHAPTERS.length} chapters, ${okSandbox}/${CHAPTERS.length} sandbox projects.`);

return {
  chapters: chapterResults.filter(Boolean),
  sandbox: sandboxResults.filter(Boolean),
};
