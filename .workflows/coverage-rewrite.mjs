export const meta = {
  name: "coverage-rewrite",
  description: "Add 4 new advanced chapters (+sandbox) and expand 7 existing chapters to close documentation coverage gaps",
  phases: [
    { title: "NewChapters", detail: "4 new chapters: pl.mdx, en.mdx, quiz.ts" },
    { title: "NewSandbox", detail: "4 new runnable uv projects" },
    { title: "Expand", detail: "append sections to 7 existing chapters" },
  ],
};

const REPO = "/home/cyprian/Documents/GitHub/pydantic-ai-learning-materials";
const DOCS = "https://pydantic.dev/docs/ai";

const API = `
Pydantic AI v2 API anchors (verify against the fetched docs, do not invent):
- Agent("openai:gpt-5.2", instructions=..., deps_type=..., output_type=..., toolsets=[...], capabilities=[...]). Prefer instructions over system_prompt.
- Runs: run_sync(), await run(), run_stream(), run_stream_events(); result.output, result.all_messages().
- RunContext[Deps]; @agent.tool / @agent.tool_plain; FunctionToolset + @toolset.tool.
- OpenAI-compatible provider: from pydantic_ai.models.openai import OpenAIChatModel; from pydantic_ai.providers.openai import OpenAIProvider.
`;

// ---- Helpers for prompts ------------------------------------------------------

function fetchLine(urls) {
  return urls.map((u) => `  curl -s ${u}/index.md`).join("\n");
}

function newChapterPrompt(ch) {
  return `Author ONE new chapter of a bilingual (Polish default, English) Pydantic AI tutorial. Quality bar: react.dev/learn.

STEP 1 - Read the reference chapter to learn the EXACT MDX format and components:
- ${REPO}/web/src/content/chapters/agenty/pl.mdx
- ${REPO}/web/src/content/chapters/agenty/en.mdx
- ${REPO}/web/src/content/chapters/agenty/quiz.ts
- ${REPO}/web/src/components/mdx/mdx-components.tsx

STEP 2 - Read the CURRENT official docs for accuracy (these are authoritative; the API is new, do not guess). Run and read each:
${fetchLine(ch.docs)}
If a fetch fails, also try: npx ctx7@latest docs /pydantic/pydantic-ai "${ch.query}"

${API}

STEP 3 - Write EXACTLY three files (use Write):
- ${REPO}/web/src/content/chapters/${ch.slug}/pl.mdx
- ${REPO}/web/src/content/chapters/${ch.slug}/en.mdx
- ${REPO}/web/src/content/chapters/${ch.slug}/quiz.ts

CHAPTER ${ch.num}: ${ch.titlePl} / ${ch.titleEn}
Must teach (accurately, from the fetched docs): ${ch.points}

HARD REQUIREMENTS:
- MDX body starts with 1-2 intro paragraphs, then "## " (h2) sections. NEVER h1.
- Components auto-injected (no imports): <Callout kind="note|tip|warning|danger|key">, <RunFlow title=".." nodes={[{kind:"user|agent|tool|model|output",label,detail}]} />, <Mermaid caption=".." chart={\`flowchart TD ...\`} />, <Term definition="..">term</Term>.
- MERMAID SAFETY: node labels must NOT contain parentheses, colons, or quotes inside [..]; if you need them, wrap the whole label in double quotes, e.g. A["run(x)"]. Keep diagrams simple and meaningful (no trivial 1-2 node graphs).
- At least one Callout, at least one \`\`\`python block with correct v2 code, and at least one diagram.
- End prose with "## Co dalej" / "## What is next" mentioning sandbox/${ch.sandbox}.
- LANGUAGE: natural Polish and English. NO em dashes. Vary sentence length. No AI filler.
- quiz.ts: \`import type { ChapterQuiz } from "@/content/quiz-types";\` then \`export const quiz: ChapterQuiz = { questions: [...] }\` with EXACTLY 4 questions (prompt {pl,en}, 4 options each {text:{pl,en}}, answer index, explanation {pl,en}).

Return one line listing the three paths written.`;
}

function newSandboxPrompt(ch) {
  return `Write ONE runnable Pydantic AI example for chapter ${ch.num} (${ch.titleEn}) in a uv workspace.

STEP 1 - Read the conventions:
- ${REPO}/sandbox/02-agenty/pyproject.toml, main.py, smoke_test.py
- ${REPO}/sandbox/shared/src/pai_sandbox_shared/__init__.py  (ollama_model, load_env, load_main)
- ${REPO}/sandbox/pyproject.toml  (strict Ruff rules you MUST satisfy)

STEP 2 - Ground the API by fetching the docs:
${fetchLine(ch.docs)}

${API}

STEP 3 - Write into ${REPO}/sandbox/${ch.sandbox}/ EXACTLY these files:
- pyproject.toml (name "ch${String(ch.num).padStart(2, "0")}-${ch.slug}", deps pydantic-ai + pai-sandbox-shared; add extras only if needed)
- main.py (focused, correct demo; \`from pai_sandbox_shared import ollama_model\`; ${ch.modelHint})
- smoke_test.py (pytest; prefer an OFFLINE test using TestModel / TestEmbeddingModel / plain asserts so it passes with no API key; if it must be live, use the skip-if-no-key pattern with \`from pai_sandbox_shared import load_env\` + \`load_env()\`; if you import the project's own main.py, use \`from pai_sandbox_shared import load_main\` then \`_m = load_main(__file__)\`)
- README.md (ENGLISH, like sandbox/02-agenty but translated to English)
- README.pl.md (the same content in Polish)

HARD REQUIREMENTS:
- MUST pass strict Ruff ("ALL" minus the ignore list in sandbox/pyproject.toml) and basedpyright standard: full type annotations, \`from __future__ import annotations\`, module + function docstrings (imperative mood), no unused imports, pathlib.
- Correct v2 API from the fetched docs. main.py guarded by \`if __name__ == "__main__":\`; never call run_sync inside a running event loop.
- NO em dashes in comments/docstrings.

Return one line listing the files written.`;
}

function expandPrompt(ex) {
  return `Expand an EXISTING chapter of our bilingual Pydantic AI tutorial by APPENDING new sections. Do not rewrite or delete existing content.

STEP 1 - Read the existing chapter (both languages) and the components reference:
- ${REPO}/web/src/content/chapters/${ex.slug}/pl.mdx
- ${REPO}/web/src/content/chapters/${ex.slug}/en.mdx
- ${REPO}/web/src/components/mdx/mdx-components.tsx

STEP 2 - Read the CURRENT docs for the new material (authoritative):
${fetchLine(ex.docs)}

${API}

STEP 3 - Using the Edit tool, INSERT new "## " sections into BOTH pl.mdx and en.mdx, placed IMMEDIATELY BEFORE the existing final section ("## Co dalej" in pl.mdx, "## What is next" in en.mdx). Keep all existing content unchanged.

New material to add (accurately, from the fetched docs): ${ex.add}

HARD REQUIREMENTS:
- Add 2-4 new h2 sections per language with real explanation and at least one correct \`\`\`python block; add a Callout and, where it helps, a <RunFlow> or <Mermaid> (mermaid labels must not contain raw parentheses/colons inside [..]; quote them as A["x(y)"]).
- Match the existing chapter's voice and component usage exactly. Natural Polish/English. NO em dashes. No AI filler.
- The pl.mdx additions are Polish; the en.mdx additions are English (mirror the same content).
- Do NOT touch quiz.ts or any sandbox files.

Return one line confirming both files were edited and which sections you added.`;
}

// ---- Data ---------------------------------------------------------------------

const NEW_CHAPTERS = [
  {
    slug: "capabilities-hooki", num: 16, sandbox: "16-capabilities-hooki",
    titlePl: "Capabilities i hooki", titleEn: "Capabilities & hooks",
    docs: [`${DOCS}/core-concepts/capabilities`, `${DOCS}/core-concepts/hooks`],
    query: "capabilities, Capability, capabilities= parameter, native capabilities Thinking WebSearch, load_capability, Hooks capability, before_run after_run wrap_run, before/after tool execute hooks",
    points: "the capabilities model (Capability, the capabilities= parameter, on-demand load_capability, native capabilities like Thinking/WebSearch/MCP/ToolSearch); building a custom capability; the Hooks system (Hooks(...) capability + before_run/after_run/wrap_run/run_error, model-request hooks, tool-execute hooks, @hooks.on.* decorators).",
    modelHint: "use ollama_model(\"qwen3-coder:480b\") if the demo needs tool calling",
  },
  {
    slug: "zaawansowane-narzedzia", num: 17, sandbox: "17-zaawansowane-narzedzia",
    titlePl: "Zaawansowane narzędzia i toolsety", titleEn: "Advanced tools & toolsets",
    docs: [`${DOCS}/tools-toolsets/tools-advanced`, `${DOCS}/tools-toolsets/toolsets`, `${DOCS}/tools-toolsets/native-tools`, `${DOCS}/tools-toolsets/common-tools`],
    query: "advanced tools prepare dynamic tools, tool choice, ToolReturn rich returns, parallel tool execution, toolset algebra FilteredToolset PrefixedToolset CombinedToolset, native tools WebSearchTool CodeExecutionTool, duckduckgo tavily",
    points: "dynamic tools via prepare/ToolPrepareFunc and prepare_tools; tool choice ('auto'/'none'/'required'); rich returns (ToolReturn, BinaryContent, content vs metadata); per-tool retries and timeouts; parallel vs sequential tool execution; the toolset algebra (CombinedToolset, .filtered()/.prefixed()/.renamed()/.prepared()/.approval_required()); native provider-executed tools (WebSearchTool, CodeExecutionTool); common tools (duckduckgo_search_tool, tavily_search_tool).",
    modelHint: "use ollama_model(\"qwen3-coder:480b\") (tool calling required)",
  },
  {
    slug: "multimodal-myslenie", num: 18, sandbox: "18-multimodal-myslenie",
    titlePl: "Multimodal i myślenie", titleEn: "Multimodal input & thinking",
    docs: [`${DOCS}/advanced-features/input`, `${DOCS}/advanced-features/thinking`],
    query: "multimodal input ImageUrl AudioUrl VideoUrl DocumentUrl BinaryContent, thinking reasoning Thinking capability effort levels ThinkingPart",
    points: "multimodal input (ImageUrl, AudioUrl, VideoUrl, DocumentUrl, BinaryContent, TextContent) and how to pass it in a run; per-model format support; the Thinking() capability with effort levels (minimal..xhigh), ThinkingPart in responses, per-provider thinking config.",
    modelHint: "for a vision demo use ollama_model(\"qwen3-vl:235b-instruct\"); keep the smoke test offline with TestModel",
  },
  {
    slug: "embeddingi-rag", num: 19, sandbox: "19-embeddingi-rag",
    titlePl: "Embeddingi i RAG", titleEn: "Embeddings & RAG",
    docs: [`${DOCS}/guides/embeddings`],
    query: "embeddings Embedder embed_query embed_documents EmbeddingResult EmbeddingSettings, TestEmbeddingModel, RAG retrieval reranking two-stage",
    points: "the Embedder API (embed_query/embed_documents, EmbeddingResult/EmbeddingSettings, count_tokens), provider embedding models, building a small RAG (embed documents, retrieve by cosine similarity, optional reranking), and TestEmbeddingModel for offline testing.",
    modelHint: "embeddings may not be available on Ollama Cloud; make the smoke test OFFLINE using TestEmbeddingModel, and in main.py guard real calls clearly",
  },
];

const EXPANSIONS = [
  {
    slug: "agenty",
    docs: [`${DOCS}/core-concepts/agent`, `${DOCS}/core-concepts/agent-spec`, `${DOCS}/core-concepts/direct`],
    add: "iterating a run with agent.iter() and the graph nodes (UserPromptNode, ModelRequestNode, CallToolsNode, End) incl. manual .next(); UsageLimits and usage tracking; UnexpectedModelBehavior + capture_run_messages(); Agent Specs (declarative agents, Agent.from_file/from_spec); Direct model requests (direct.model_request / model_request_sync) and when to use them instead of an Agent.",
  },
  {
    slug: "structured-output",
    docs: [`${DOCS}/core-concepts/output`],
    add: "output functions (callable output handlers); the TextOutput marker; custom JSON schema via StructuredDict(); validation_context; optional output (allowing None); image output (BinaryImage); cancelling a structured stream.",
  },
  {
    slug: "wiadomosci-historia",
    docs: [`${DOCS}/core-concepts/message-history`],
    add: "history processors taught properly (history_processors / ProcessHistory: summarizing, trimming, token-aware filtering using RunContext); conversation_id and run_id correlation; injecting messages mid-run (RunContext.enqueue / AgentRun.enqueue, 'asap' vs 'when_idle'); all_messages_json / new_messages_json.",
  },
  {
    slug: "mcp",
    docs: [`${DOCS}/mcp/server`, `${DOCS}/mcp/client`, `${DOCS}/mcp/fastmcp-client`],
    add: "BUILDING an MCP server that wraps a Pydantic AI agent (FastMCP, @server.tool); MCP sampling (server calls back to the client model, MCPSamplingModel / sampling_model); FastMCP client (FastMCPToolset); MCPServerSSE and load_mcp_servers() JSON config; elicitation (elicitation_callback). Note our existing sections cover the stdio/HTTP client basics, so build on them.",
  },
  {
    slug: "modele",
    docs: [`${DOCS}/advanced-features/retries`, `${DOCS}/overview/gateway`, `${DOCS}/models/overview`],
    add: "HTTP request retries with the tenacity transport (AsyncTenacityTransport, RetryConfig, wait_retry_after for Retry-After, wait_exponential) - distinct from ModelRetry; the Pydantic AI Gateway (PYDANTIC_AI_GATEWAY_API_KEY, gateway/<format>:<model> ids, BYOK, spend limits); model profiles and HTTP concurrency limits (ConcurrencyLimitedModel, ConcurrencyLimit); response-based fallback (FinishReason).",
  },
  {
    slug: "testy-ewaluacje",
    docs: [`${DOCS}/evals/evaluators/built-in`, `${DOCS}/evals/evaluators/report-evaluators`, `${DOCS}/evals/evaluators/span-based`, `${DOCS}/evals/how-to/dataset-management`],
    add: "the wider built-in evaluator set beyond IsInstance/LLMJudge; report evaluators (experiment-wide analyses, confusion matrices); span-based evaluators (asserting over OTel spans: tool was called, latency, token budget); dataset management and serialization (building/persisting datasets, YAML/JSON round-trip); multi-run evaluation for variance; a word on online evaluation of production traffic.",
  },
  {
    slug: "multi-agent",
    docs: [`${DOCS}/integrations/durable_execution/overview`, `${DOCS}/harness/code-mode`, `${DOCS}/graph/builder`],
    add: "durable execution beyond DBOS: the overview framing and the other backends (Temporal, Prefect, Restate); the Harness package and Code Mode (CodeMode() capability that wraps tools into one run_code tool in a sandbox so the model writes Python to batch calls); the newer graph builder API (GraphBuilder with Steps, Decisions, Joins & Reducers, Parallel execution) versus the BaseNode style we already showed.",
  },
];

// ---- Run ----------------------------------------------------------------------

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

phase("NewChapters");
log(`Authoring ${NEW_CHAPTERS.length} new chapters...`);
const chapterResults = await parallel(
  NEW_CHAPTERS.map((ch) => () =>
    agent(newChapterPrompt(ch), { label: `chapter:${ch.slug}`, phase: "NewChapters", schema: FILES_SCHEMA }),
  ),
);

phase("NewSandbox");
log(`Authoring ${NEW_CHAPTERS.length} new sandbox projects...`);
const sandboxResults = await parallel(
  NEW_CHAPTERS.map((ch) => () =>
    agent(newSandboxPrompt(ch), { label: `sandbox:${ch.sandbox}`, phase: "NewSandbox", schema: FILES_SCHEMA }),
  ),
);

phase("Expand");
log(`Expanding ${EXPANSIONS.length} existing chapters...`);
const expandResults = await parallel(
  EXPANSIONS.map((ex) => () =>
    agent(expandPrompt(ex), { label: `expand:${ex.slug}`, phase: "Expand", schema: FILES_SCHEMA }),
  ),
);

log(
  `Done: ${chapterResults.filter(Boolean).length}/${NEW_CHAPTERS.length} chapters, ` +
    `${sandboxResults.filter(Boolean).length}/${NEW_CHAPTERS.length} sandbox, ` +
    `${expandResults.filter(Boolean).length}/${EXPANSIONS.length} expansions.`,
);

return {
  chapters: chapterResults.filter(Boolean),
  sandbox: sandboxResults.filter(Boolean),
  expansions: expandResults.filter(Boolean),
};
