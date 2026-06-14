# Pydantic AI tutorial — documentation coverage gap report

This report audits how completely our 16-chapter Pydantic AI tutorial
(`web/src/content/chapters/<slug>/pl.mdx`, indexed by `web/src/content/curriculum.ts`)
covers the official Pydantic AI documentation, using the page index at
<https://pydantic.dev/docs/ai/llms.txt> as the source of truth (fetched 2026-06-14).

**How to read this:** each row classifies a docs page as **COVERED** (taught adequately
in some chapter), **PARTIAL** (mentioned but shallow or missing key sub-topics), or
**MISSING** (no coverage). The "What is missing" column names the specific APIs/sub-topics
absent from our material.

**Two structural notes up front:**

1. **All `docs` URLs in `curriculum.ts` are stale.** The official docs were reorganized
   into nested sections. Our links (e.g. `${AI}/agents`, `${AI}/tools`, `${AI}/mcp`,
   `${AI}/output`, `${AI}/testing`, `${AI}/logfire`) now 404 or redirect. The real paths are
   `${AI}/core-concepts/agent`, `${AI}/tools-toolsets/tools`, `${AI}/mcp/client`,
   `${AI}/core-concepts/output`, `${AI}/guides/testing`, `${AI}/integrations/logfire`, etc.
   **Every chapter's `docs` array needs its URLs updated.**
2. A whole new top-level concept — **Capabilities** — now sits at the center of the docs
   (the primary extension point, with the **Harness** package and **Code Mode** built on it).
   We do not mention it anywhere.

Our chapter slugs: `instalacja, agenty, modele, structured-output, narzedzia, zaleznosci,
wiadomosci-historia, streaming, mcp, multi-agent, testy-ewaluacje, logfire-observability,
pydantic-walidacja, pydantic-settings, fastapi-integracja, asystent-jak-claude`.

---

## Overview

| Topic | Source URL | Status | What is missing |
|---|---|---|---|
| Installation | https://pydantic.dev/docs/ai/overview/install/index.md | COVERED | `instalacja` covers uv, slim vs full, providers, env vars. Fine. |
| Getting Help | https://pydantic.dev/docs/ai/overview/help/index.md | MISSING | Low priority (links to Slack/GitHub). |
| Troubleshooting | https://pydantic.dev/docs/ai/overview/troubleshooting/index.md | MISSING | Common errors (event loop already running, API key issues, Jupyter `nest_asyncio`). Worth a short appendix. |
| Pydantic AI Gateway | https://pydantic.dev/docs/ai/overview/gateway/index.md | MISSING | Unified gateway/proxy: one `PYDANTIC_AI_GATEWAY_API_KEY`, `gateway/<format>:<model>` model ids, BYOK, per-project/user spend limits, routing groups/failover. Relevant to our `modele` chapter. |
| Coding Agent Skills | https://pydantic.dev/docs/ai/overview/coding-agent-skills/index.md | MISSING | "Skills" = on-demand instruction packages; Claude Code plugin, agentskills.io (cross-agent), library-skills.io, `pydantic/skills` repo. Note: our capstone is titled "asystent jak Claude" and mentions "skills/plugins" loosely but does **not** cover the actual `SkillsToolset`/skills standard. |

---

## Core Concepts

| Topic | Source URL | Status | What is missing |
|---|---|---|---|
| Agents | https://pydantic.dev/docs/ai/core-concepts/agent/index.md | PARTIAL | `agenty` covers `run`/`run_sync`/`run_stream`/`run_stream_events`, instructions vs system_prompt, dynamic instructions, `RunContext`. **Missing:** `agent.iter()` and iterating the graph (`UserPromptNode`, `ModelRequestNode`, `CallToolsNode`, `End`, manual `.next()`); `end_strategy`; reflection/self-correction & retry budgets (`ctx.retry`); `UsageLimits` (lives only in multi-agent ch.); `UnexpectedModelBehavior` + `capture_run_messages()` (only in testing ch.); `max_concurrency`/`ConcurrencyLimit`; run metadata; `conversation_id`. |
| Agent Specs | https://pydantic.dev/docs/ai/core-concepts/agent-spec/index.md | MISSING | Declarative YAML/JSON agent definitions, `Agent.from_file()` / `Agent.from_spec()`. Not mentioned anywhere. |
| Capabilities | https://pydantic.dev/docs/ai/core-concepts/capabilities/index.md | MISSING | **Major gap.** The whole capabilities model: `Capability`/`AbstractCapability`, `capabilities=` parameter, on-demand (`load_capability`) capabilities, native capabilities (`Thinking`, `WebSearch`, `WebFetch`, `ImageGeneration`, `MCP`, `ToolSearch`, `PrepareTools`, `Hooks`, `ProcessHistory`, `ThreadExecutor`…), building custom capabilities. Cross-cuts tools, hooks, instructions, model settings. |
| Dependencies | https://pydantic.dev/docs/ai/core-concepts/dependencies/index.md | COVERED | `zaleznosci` covers `deps_type`, dataclass deps, `ctx.deps` in instructions/tools/validators, async deps, `agent.override()`, `ALLOW_MODEL_REQUESTS`. Solid. |
| Direct Model Requests | https://pydantic.dev/docs/ai/core-concepts/direct/index.md | MISSING | `direct.model_request` / `model_request_sync` / `model_request_stream(_sync)`, low-level `ToolDefinition` calls, when to use direct vs Agent. Not mentioned. |
| Hooks | https://pydantic.dev/docs/ai/core-concepts/hooks/index.md | MISSING | **Major gap.** Entire hooks system: `before_run`/`after_run`/`wrap_run`/`run_error`; node hooks; `before/after_model_request`; `before/after_tool_validate`, `before/after_tool_execute`; output-validate/process hooks; `prepare_tools`/`prepare_output_tools`; `event` per-event hook; `Hooks(...)` capability + `@hooks.on.*` decorators. |
| Messages & history | https://pydantic.dev/docs/ai/core-concepts/message-history/index.md | PARTIAL | `wiadomosci-historia` covers message/part types, `all_messages`/`new_messages`, `message_history`, `ModelMessagesTypeAdapter` serialization. **Missing:** history processors taught properly (`ProcessHistory`/`history_processors` — only name-dropped) incl. summarizing/trimming/token-aware filtering with `RunContext`; `conversation_id` & `run_id` correlation; injecting messages mid-run (`RunContext.enqueue()`, `AgentRun.enqueue()`, `'asap'`/`'when_idle'`); `all_messages_json`/`new_messages_json`. |
| Output | https://pydantic.dev/docs/ai/core-concepts/output/index.md | PARTIAL | `structured-output` covers `output_type`, `ToolOutput`/`NativeOutput`/`PromptedOutput`, `output_validator`, unions, `ModelRetry`/`retries`. **Missing:** **output functions** (callable output handlers); `TextOutput` marker; **custom JSON schema** / `StructuredDict()`; `validation_context`; **image output** (`BinaryImage`); **optional output** (allowing `None`); stream `cancel()`. |

---

## Models & Providers

| Topic | Source URL | Status | What is missing |
|---|---|---|---|
| Models Overview | https://pydantic.dev/docs/ai/models/overview/index.md | PARTIAL | `modele` covers `provider:model` ids, `ModelSettings` (temperature/max_tokens), `FallbackModel` + per-model settings, OpenAI-compatible (`OpenAIChatModel`/`OpenAIProvider`, Ollama). **Missing:** **Profiles** concept; custom models (`Model` ABC, `StreamedResponse`); HTTP client lifecycle / custom `http_client`; HTTP concurrency limits (`ConcurrencyLimitedModel`, `ConcurrencyLimit`, shared limits); response-based fallback (`FinishReason`, native-tool-failure fallback, combining handlers); error types (`ModelAPIError`, `ModelHTTPError`, `FallbackExceptionGroup`). |
| Per-provider pages (Anthropic, Bedrock, Cerebras, Cohere, Google, Groq, HuggingFace, Mistral, Ollama, OpenAI, OpenRouter, Outlines, xAI) | https://pydantic.dev/docs/ai/models/openai/index.md (+ siblings) | PARTIAL | We teach the **Ollama Cloud + OpenAI-compatible pattern** and list other providers conceptually. Acceptable for a tutorial — per-provider auth nuances (Bedrock IAM, Vertex/Google, OpenRouter, xAI, HuggingFace, Outlines structured-gen) are not covered, but summarizing as one row is fine per scope. |

---

## Tools & Toolsets

| Topic | Source URL | Status | What is missing |
|---|---|---|---|
| Function Tools | https://pydantic.dev/docs/ai/tools-toolsets/tools/index.md | COVERED | `narzedzia` covers `@agent.tool`/`@agent.tool_plain`, docstring formats, type-hint validation, `ModelRetry` for logic errors, RunContext. Good baseline. |
| Advanced Tool Features | https://pydantic.dev/docs/ai/tools-toolsets/tools-advanced/index.md | MISSING | **Major gap.** Rich tool returns (`ToolReturn`, `BinaryContent`, content/metadata split); custom tool schema (`Tool.from_schema()`); **dynamic tools** (`prepare`/`ToolPrepareFunc`, `prepare_tools`/`ToolsPrepareFunc`, `ToolDefinition` filtering); **tool choice** (`'auto'`/`'none'`/`'required'`/name lists, `ToolOrOutput`); per-tool/per-toolset/agent retry config (`Tool(max_retries=)`, `Agent(retries=)`, `RetryPromptPart`); **tool timeout**; `args_validator`; **parallel/sequential tool execution** (`sequential`, `parallel_tool_call_execution_mode()`, `ThreadExecutor`/`using_thread_executor()`, `UsageLimits(tool_calls_limit=)`); **Tool Search** (`defer_loading=True`, `ToolSearch` capability). |
| Toolsets | https://pydantic.dev/docs/ai/tools-toolsets/toolsets/index.md | PARTIAL | Capstone (`asystent-jak-claude`) uses `FunctionToolset` + `@toolset.tool`. **Missing:** the toolset algebra — `CombinedToolset`, `.filtered()`/`FilteredToolset`, `.prefixed()`/`PrefixedToolset`, `.renamed()`/`RenamedToolset`, `.prepared()`/`PreparedToolset`, `.approval_required()`, `.defer_loading()`, `.with_metadata()`; toolset instructions; `ExternalToolset`; building a custom toolset (`AbstractToolset`, `for_run`/`for_run_step` lifecycle); per-run toolsets & `@agent.toolset`. |
| Common Tools | https://pydantic.dev/docs/ai/tools-toolsets/common-tools/index.md | MISSING | `duckduckgo_search_tool`, `tavily_search_tool` (install extras, params). Easy practical win. |
| Native Tools | https://pydantic.dev/docs/ai/tools-toolsets/native-tools/index.md | MISSING | Provider-executed builtin tools: `WebSearchTool`, `WebFetchTool`, `CodeExecutionTool`, `ImageGenerationTool`, `MemoryTool`, `XSearchTool`, `FileSearchTool`, `MCPServerTool`; provider support matrix; dynamic enable via `NativeTool`/`RunContext`. |
| Deferred Tools | https://pydantic.dev/docs/ai/tools-toolsets/deferred-tools/index.md | PARTIAL | Capstone covers **HITL approval** path well (`DeferredToolRequests`, `DeferredToolResults`, `ApprovalRequired`, `requires_approval`, `ToolDenied`, `ctx.tool_call_approved`). **Missing:** **external tool execution** (`CallDeferred`, results mapping); inline resolution via `HandleDeferredToolCalls` capability; `RunContext.tool_call_metadata`. |
| Third-Party Tools | https://pydantic.dev/docs/ai/tools-toolsets/third-party-tools/index.md | MISSING | LangChain toolset, ACI, MCP-as-toolset, other ecosystem integrations. Low/medium priority. |

---

## Advanced Features

| Topic | Source URL | Status | What is missing |
|---|---|---|---|
| Image/Audio/Video/Document Input | https://pydantic.dev/docs/ai/advanced-features/input/index.md | MISSING | **Notable gap for a "Claude-like assistant" course.** Multimodal input: `ImageUrl`, `AudioUrl`, `VideoUrl`, `DocumentUrl`, `BinaryContent`, `TextContent`; `UploadedFile` provider file storage; `force_download` URL handling; per-model format support. |
| HTTP Request Retries | https://pydantic.dev/docs/ai/advanced-features/retries/index.md | MISSING | tenacity-based transport: `AsyncTenacityTransport`/`TenacityTransport`, `RetryConfig`, `wait_retry_after()` (Retry-After header), `wait_exponential()`, rate-limit/network resilience. Distinct from `ModelRetry`; production-relevant. |
| Thinking | https://pydantic.dev/docs/ai/advanced-features/thinking/index.md | MISSING | Reasoning models: `Thinking()` capability + `effort` levels (`minimal`→`xhigh`), `ThinkingPart` in responses, per-provider config (`anthropic_thinking`, `google_thinking_config`, etc.). Highly relevant given course uses Claude/Anthropic. |

---

## Guides

| Topic | Source URL | Status | What is missing |
|---|---|---|---|
| Testing | https://pydantic.dev/docs/ai/guides/testing/index.md | COVERED | `testy-ewaluacje` covers `TestModel`, `agent.override`, `FunctionModel`/`AgentInfo`, `capture_run_messages()`, `ALLOW_MODEL_REQUESTS`. Good. |
| Multi-Agent Patterns | https://pydantic.dev/docs/ai/guides/multi-agent-applications/index.md | COVERED | `multi-agent` covers agent delegation (`usage=ctx.usage`), `UsageLimits`, programmatic hand-off. Adequate for the patterns guide. |
| Embeddings | https://pydantic.dev/docs/ai/guides/embeddings/index.md | MISSING | **Whole feature missing.** `Embedder`, `embed_query`/`embed_documents`, `EmbeddingResult`/`EmbeddingSettings`, provider models (OpenAI/Google/Cohere/VoyageAI/Bedrock/SentenceTransformers), `count_tokens`, `TestEmbeddingModel`, two-stage retrieval/reranking, custom `EmbeddingModel`. Core to RAG. |
| Web Chat UI | https://pydantic.dev/docs/ai/guides/web/index.md | MISSING | `Agent.to_web()` / `clai web` dev UI: `models`/`capabilities`/`instructions`/`html_source` params, reserved routes. Quick to add. |
| Extensibility | https://pydantic.dev/docs/ai/guides/extensibility/index.md | MISSING | Building & publishing capability packages (`pydantic-ai-` prefix, serialization), custom toolsets (`AbstractToolset`/`WrapperToolset`), custom models (`Model`), custom agents (`AbstractAgent`/`WrapperAgent`), Harness. Advanced; pairs with Capabilities chapter. |

---

## MCP

| Topic | Source URL | Status | What is missing |
|---|---|---|---|
| Client | https://pydantic.dev/docs/ai/mcp/client/index.md | PARTIAL | `mcp` covers `MCPServerStdio`, `MCPServerStreamableHTTP`, `tool_prefix`, multiple servers, `async with agent`. **Missing:** `MCPServerSSE`; `load_mcp_servers()` (JSON config); `process_tool_call` customization; server instructions (`include_instructions`); tool metadata/filtering; background tasks (`TaskConfig`); resources (`list_resources`/`read_resource`); custom TLS/`http_client`; `client_info`; **MCP sampling** (`sampling_model`); **elicitation** (`elicitation_callback`). |
| Server | https://pydantic.dev/docs/ai/mcp/server/index.md | MISSING | **Building** an MCP server that wraps a Pydantic AI agent (`FastMCP`, `@server.tool()`), and **sampling** back to the client (`MCPSamplingModel`, `sampling_callback`). Our `mcp` chapter is client-only by its own admission. |
| FastMCP Client | https://pydantic.dev/docs/ai/mcp/fastmcp-client/index.md | MISSING | `FastMCPToolset` (in-process FastMCP servers, HTTP/SSE, scripts, `StdioTransport`, JSON config). |
| MCP Overview | https://pydantic.dev/docs/ai/mcp/overview/index.md | PARTIAL | Conceptual intro is covered in our `mcp` chapter; sub-pages above are the gaps. |

---

## Harness

| Topic | Source URL | Status | What is missing |
|---|---|---|---|
| Overview | https://pydantic.dev/docs/ai/harness/overview/index.md | MISSING | The Harness package: "batteries" capability library separate from core, fall-up pattern, what lives where (memory, guardrails, filesystem, code execution, multi-agent orchestration). |
| Code Mode | https://pydantic.dev/docs/ai/harness/code-mode/index.md | MISSING | `CodeMode()` capability — wraps tools into one `run_code` tool run in the Monty sandbox; model writes Python with loops/`asyncio.gather` to batch tool calls; selective sandboxing, REPL state, observability. Very relevant to a "coding assistant" capstone. |

---

## Evals

| Topic | Source URL | Status | What is missing |
|---|---|---|---|
| Evals Overview / Core Concepts / Quick Start | https://pydantic.dev/docs/ai/evals/evals/index.md · https://pydantic.dev/docs/ai/evals/getting-started/core-concepts/index.md · https://pydantic.dev/docs/ai/evals/getting-started/quick-start/index.md | PARTIAL | `testy-ewaluacje` covers `Case`, `Dataset`, `evaluate_sync`, custom `Evaluator`/`EvaluatorContext`, `IsInstance`, `LLMJudge`. Good intro. **Missing across the rest of the Evals section below.** |
| Evaluators Overview | https://pydantic.dev/docs/ai/evals/evaluators/overview/index.md | PARTIAL | Taxonomy of evaluator kinds not laid out. |
| Built-in Evaluators | https://pydantic.dev/docs/ai/evals/evaluators/built-in/index.md | PARTIAL | Only `IsInstance`/`LLMJudge` shown; full built-in set (equality, contains, span/cost/duration assertions, etc.) missing. |
| Custom Evaluators | https://pydantic.dev/docs/ai/evals/evaluators/custom/index.md | COVERED | Custom `Evaluator` pattern is taught. |
| LLM Judge | https://pydantic.dev/docs/ai/evals/evaluators/llm-judge/index.md | COVERED | `LLMJudge` + `rubric` taught, with cost/stability caveats. |
| Report Evaluators | https://pydantic.dev/docs/ai/evals/evaluators/report-evaluators/index.md | MISSING | Experiment-wide analyses (confusion matrices, PR curves), `ReportEvaluator`, `EvaluationReport`. |
| Span-Based Evaluators | https://pydantic.dev/docs/ai/evals/evaluators/span-based/index.md | MISSING | Asserting over OTel spans (tool was called, token budget, latency). |
| Framework Integrations | https://pydantic.dev/docs/ai/evals/evaluators/framework-integrations/index.md | MISSING | Third-party evaluator integrations. |
| Simple Validation example | https://pydantic.dev/docs/ai/evals/examples/simple-validation/index.md | PARTIAL | Conceptually similar to our example. |
| Concurrency & Performance | https://pydantic.dev/docs/ai/evals/how-to/concurrency/index.md | MISSING | Parallel eval execution / `max_concurrency`. |
| Dataset Management | https://pydantic.dev/docs/ai/evals/how-to/dataset-management/index.md | MISSING | Building/persisting datasets, generation from agents. |
| Dataset Serialization | https://pydantic.dev/docs/ai/evals/how-to/dataset-serialization/index.md | MISSING | YAML/JSON dataset round-tripping. |
| Case Lifecycle Hooks | https://pydantic.dev/docs/ai/evals/how-to/lifecycle/index.md | MISSING | Per-case setup/teardown hooks. |
| Logfire Integration (evals) | https://pydantic.dev/docs/ai/evals/how-to/logfire-integration/index.md | MISSING | Sending eval results to Logfire. |
| Metrics & Attributes | https://pydantic.dev/docs/ai/evals/how-to/metrics-attributes/index.md | MISSING | Recording custom metrics/attributes in cases. |
| Multi-Run Evaluation | https://pydantic.dev/docs/ai/evals/how-to/multi-run/index.md | MISSING | Running each case N times for variance. |
| Retry Strategies (evals) | https://pydantic.dev/docs/ai/evals/how-to/retry-strategies/index.md | MISSING | Retrying flaky cases. |
| Online Evaluation | https://pydantic.dev/docs/ai/evals/online-evaluation/index.md | MISSING | Evaluating live production traffic. |

---

## Pydantic Graph

| Topic | Source URL | Status | What is missing |
|---|---|---|---|
| Graph Overview | https://pydantic.dev/docs/ai/graph/graph/index.md | PARTIAL | `multi-agent` introduces `BaseNode`, `GraphRunContext`, `End`, `Graph`, serializable state. Decent basics. |
| Graph Builder: Getting Started / Steps / Decisions / Joins & Reducers / Parallel | https://pydantic.dev/docs/ai/graph/builder/index.md (+ steps, decisions, joins, parallel) | MISSING | The newer **graph builder** API (`graph_builder`): `Steps`, `Decisions`, `Joins & Reducers`, `Parallel Execution`. None covered — our chapter uses the older `BaseNode` style only. |

---

## Integrations

| Topic | Source URL | Status | What is missing |
|---|---|---|---|
| Logfire (Debugging & Monitoring) | https://pydantic.dev/docs/ai/integrations/logfire/index.md | COVERED | `logfire-observability` covers `logfire.configure`, `instrument_pydantic_ai`, OTel/spans, `instrument_httpx`, OTLP export, `send_to_logfire=False`, PII. Solid. |
| Durable Execution Overview | https://pydantic.dev/docs/ai/integrations/durable_execution/overview/index.md | PARTIAL | `multi-agent` covers durable execution via **DBOS only** (`DBOSAgent`, `DBOSConfig`). **Missing:** the overview framing + the other 3 officially-supported backends: **Temporal**, **Prefect**, **Restate**; streaming/MCP/HITL under durability. |
| Temporal / Prefect / Restate | .../temporal/index.md · .../prefect/index.md · .../restate/index.md | MISSING | Per-backend integration (only DBOS is shown). |
| DBOS | https://pydantic.dev/docs/ai/integrations/durable_execution/dbos/index.md | PARTIAL | Introduced but not deeply (determinism rules, workflow/step decorators). |
| CLI (clai) | https://pydantic.dev/docs/ai/integrations/cli/index.md | MISSING | The `clai` command-line agent (incl. `clai web`). |
| A2A (Agent2Agent) | https://pydantic.dev/docs/ai/integrations/a2a/index.md | MISSING | `to_a2a()` / fasta2a server for agent-to-agent protocol. |
| UI Overview / AG-UI / Vercel AI | https://pydantic.dev/docs/ai/integrations/ui/overview/index.md (+ ag-ui, vercel-ai) | MISSING | `UIAdapter` family (`AGUIAdapter`, `VercelAIAdapter`), `dispatch_request`/`run_stream`/`encode_stream`, `StateDeps`. Our FastAPI chapter name-drops `pydantic_ai.ui`/SSE but does not teach the adapters. |

---

## Pydantic ecosystem (validation / settings)

| Topic | Source URL | Status | What is missing |
|---|---|---|---|
| Pydantic validation | https://pydantic.dev/docs/validation | COVERED | `pydantic-walidacja` covers BaseModel, Field constraints, `@field_validator`/`@model_validator` (before/after), `@computed_field`, dump/validate (json), `TypeAdapter`. Thorough. (Minor: custom serializers / `ConfigDict` options not covered — out of AI-docs scope.) |
| pydantic-settings | https://pydantic.dev/docs/validation/concepts/pydantic_settings | COVERED | `pydantic-settings` covers `BaseSettings`, `SettingsConfigDict`, `.env`, `SecretStr`, source priority, nested + `env_nested_delimiter`. Good. |

---

## API Reference & Project pages

The `https://pydantic.dev/docs/ai/api/*` reference pages and `project/*` (changelog,
contributing, version policy) pages are reference material, not tutorial targets; treated as
out of scope (N/A) rather than gaps. Examples pages (Bank Support, Weather Agent, RAG,
SQL Gen, Chat App, Flight Booking, etc.) are illustrative; our chapters teach equivalent
patterns inline, so they are not scored individually.

---

## Recommended new chapters / sections (ranked by importance)

1. **Capabilities & Hooks** — *new chapter.* The single biggest conceptual gap. The docs now
   center on capabilities as the primary extension point, and hooks are the lifecycle backbone.
   Draws from: `core-concepts/capabilities`, `core-concepts/hooks`, `guides/extensibility`.

2. **Advanced tools** — *new chapter or major expansion of `narzedzia`.* Dynamic tools/`prepare`,
   tool choice, rich returns (`ToolReturn`), per-tool retries & timeouts, parallel vs sequential
   execution, tool search. Draws from: `tools-toolsets/tools-advanced`,
   `tools-toolsets/toolsets` (the toolset algebra), `tools-toolsets/native-tools`,
   `tools-toolsets/common-tools`.

3. **Multimodal input & Thinking** — *new chapter.* Images/audio/video/documents as input plus
   reasoning/thinking config — both highly relevant to a Claude-style assistant.
   Draws from: `advanced-features/input`, `advanced-features/thinking`.

4. **Expand `mcp` to cover Server + Sampling + FastMCP** — currently client-only.
   Draws from: `mcp/server`, `mcp/client` (sampling/elicitation/SSE/config loading),
   `mcp/fastmcp-client`.

5. **Production patterns: HTTP retries, Gateway, model profiles/concurrency, response-based
   fallback** — *expand `modele` + `logfire-observability`.*
   Draws from: `advanced-features/retries`, `overview/gateway`, `models/overview`.

6. **Embeddings & RAG** — *new chapter.* Whole feature absent; foundational for retrieval.
   Draws from: `guides/embeddings` (+ `examples/.../rag`).

7. **Deepen Evals** — *expand `testy-ewaluacje`.* Built-in/report/span-based evaluators,
   dataset management & serialization, multi-run, online evaluation, eval-Logfire integration.
   Draws from the whole `evals/*` tree (see Evals table).

8. **Deepen Output & Messages** — *expand `structured-output` and `wiadomosci-historia`.*
   Output functions, custom JSON schema, optional/image output, validation context; history
   processors (summarize/trim), `conversation_id`, mid-run message injection.
   Draws from: `core-concepts/output`, `core-concepts/message-history`.

9. **Durable execution beyond DBOS + Harness/Code Mode** — *expand `multi-agent`.* Add Temporal/
   Prefect/Restate framing and the Harness/Code Mode story (very relevant to a coding assistant).
   Draws from: `integrations/durable_execution/overview` (+ temporal/prefect/restate),
   `harness/overview`, `harness/code-mode`.

10. **UI integrations & Web Chat UI & CLI** — *expand `fastapi-integracja`.* AG-UI / Vercel AI
    adapters, `Agent.to_web()`, `clai`. Draws from: `integrations/ui/*`, `guides/web`,
    `integrations/cli`.

11. **Agent fundamentals fill-ins** — *expand `agenty`.* `agent.iter()`/graph nodes,
    `UsageLimits`, `UnexpectedModelBehavior`/`capture_run_messages`, reflection/retry budgets,
    Agent Specs (`from_file`), Direct model requests. Draws from: `core-concepts/agent`,
    `core-concepts/agent-spec`, `core-concepts/direct`.

12. **Housekeeping (do first):** update every stale `docs` URL in `curriculum.ts` to the new
    nested paths, and add a short **Troubleshooting** appendix (`overview/troubleshooting`).
