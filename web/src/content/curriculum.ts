import type { Language } from "@/i18n";

export type Difficulty = "intro" | "intermediate" | "advanced";

export interface DocLink {
  label: string;
  url: string;
}

export interface Chapter {
  /** Stable order, also used as the displayed chapter number. */
  order: number;
  slug: string;
  /** Lucide icon name kept as a string; the sidebar maps it to a component. */
  icon: string;
  difficulty: Difficulty;
  minutes: number;
  partId: string;
  title: Record<Language, string>;
  summary: Record<Language, string>;
  /** Source documentation pages this chapter draws from. */
  docs: DocLink[];
  /** Matching project folder under /sandbox, if any. */
  sandbox?: string;
}

export interface CoursePart {
  id: string;
  title: Record<Language, string>;
}

export const parts: CoursePart[] = [
  { id: "basics", title: { pl: "Podstawy", en: "Basics" } },
  { id: "flow", title: { pl: "Przepływ i komunikacja", en: "Flow & communication" } },
  { id: "production", title: { pl: "Produkcja", en: "Production" } },
  { id: "ecosystem", title: { pl: "Ekosystem Pydantic", en: "Pydantic ecosystem" } },
];

const AI = "https://pydantic.dev/docs/ai";

export const chapters: Chapter[] = [
  {
    order: 1,
    slug: "instalacja",
    icon: "Rocket",
    difficulty: "intro",
    minutes: 8,
    partId: "basics",
    title: { pl: "Instalacja i pierwszy agent", en: "Install & first agent" },
    summary: {
      pl: "Postaw środowisko z uv, zainstaluj pydantic-ai i uruchom pierwszego agenta w kilka minut.",
      en: "Set up an environment with uv, install pydantic-ai, and run your first agent in minutes.",
    },
    docs: [
      { label: "Installation", url: `${AI}/install` },
      { label: "Overview", url: `${AI}/overview` },
    ],
    sandbox: "01-instalacja",
  },
  {
    order: 2,
    slug: "agenty",
    icon: "Bot",
    difficulty: "intro",
    minutes: 16,
    partId: "basics",
    title: { pl: "Agenty", en: "Agents" },
    summary: {
      pl: "Czym jest Agent, jak go konfigurować, system prompty, uruchomienia sync, async i strumieniowe.",
      en: "What an Agent is, how to configure it, system prompts, and sync, async, and streaming runs.",
    },
    docs: [{ label: "Agents", url: `${AI}/agents` }],
    sandbox: "02-agenty",
  },
  {
    order: 3,
    slug: "modele",
    icon: "Layers",
    difficulty: "intro",
    minutes: 18,
    partId: "basics",
    title: { pl: "Modele i dostawcy", en: "Models & providers" },
    summary: {
      pl: "Podłącz różnych dostawców modeli, w tym Ollama Cloud, i poznaj ustawienia oraz fallbacki.",
      en: "Connect different model providers including Ollama Cloud, and learn settings and fallbacks.",
    },
    docs: [
      { label: "Models", url: `${AI}/models` },
      { label: "OpenAI-compatible", url: `${AI}/models/openai` },
    ],
    sandbox: "03-modele",
  },
  {
    order: 4,
    slug: "structured-output",
    icon: "Braces",
    difficulty: "intermediate",
    minutes: 17,
    partId: "basics",
    title: { pl: "Typowane wyjścia", en: "Structured output" },
    summary: {
      pl: "Zmuś model do zwracania danych zgodnych z modelem Pydantic. Walidacja, retry i tryby wyjścia.",
      en: "Make the model return data that matches a Pydantic model. Validation, retries, and output modes.",
    },
    docs: [{ label: "Output", url: `${AI}/output` }],
    sandbox: "04-structured-output",
  },
  {
    order: 5,
    slug: "narzedzia",
    icon: "Wrench",
    difficulty: "intermediate",
    minutes: 20,
    partId: "basics",
    title: { pl: "Narzędzia i wywołania funkcji", en: "Tools & function calling" },
    summary: {
      pl: "Daj agentowi narzędzia: rejestracja, walidacja argumentów, kontekst i obsługa błędów narzędzi.",
      en: "Give the agent tools: registration, argument validation, context, and tool error handling.",
    },
    docs: [{ label: "Tools", url: `${AI}/tools` }],
    sandbox: "05-narzedzia",
  },
  {
    order: 6,
    slug: "zaleznosci",
    icon: "Boxes",
    difficulty: "intermediate",
    minutes: 15,
    partId: "basics",
    title: { pl: "Zależności (DI)", en: "Dependencies (DI)" },
    summary: {
      pl: "System wstrzykiwania zależności w pydantic-ai: typowany kontekst, zasoby i testowalność.",
      en: "The dependency injection system in pydantic-ai: typed context, resources, and testability.",
    },
    docs: [{ label: "Dependencies", url: `${AI}/dependencies` }],
    sandbox: "06-zaleznosci",
  },
  {
    order: 7,
    slug: "wiadomosci-historia",
    icon: "MessagesSquare",
    difficulty: "intermediate",
    minutes: 16,
    partId: "flow",
    title: { pl: "Wiadomości i historia", en: "Messages & history" },
    summary: {
      pl: "Struktura wiadomości, prowadzenie rozmowy wielokrotnej i przekazywanie historii między uruchomieniami.",
      en: "Message structure, multi-turn conversations, and passing history between runs.",
    },
    docs: [{ label: "Messages", url: `${AI}/message-history` }],
    sandbox: "07-wiadomosci-historia",
  },
  {
    order: 8,
    slug: "streaming",
    icon: "Radio",
    difficulty: "advanced",
    minutes: 18,
    partId: "flow",
    title: { pl: "Strumieniowanie", en: "Streaming" },
    summary: {
      pl: "Strumieniuj tekst i ustrukturyzowane wyjście w czasie rzeczywistym, z walidacją częściową.",
      en: "Stream text and structured output in real time, with partial validation.",
    },
    docs: [{ label: "Streaming", url: `${AI}/output#streaming` }],
    sandbox: "08-streaming",
  },
  {
    order: 9,
    slug: "mcp",
    icon: "Plug",
    difficulty: "advanced",
    minutes: 19,
    partId: "flow",
    title: { pl: "MCP (Model Context Protocol)", en: "MCP (Model Context Protocol)" },
    summary: {
      pl: "Podłącz agenta do serwerów MCP, korzystaj z zewnętrznych narzędzi i zasobów przez standard.",
      en: "Connect the agent to MCP servers and use external tools and resources through the standard.",
    },
    docs: [{ label: "MCP", url: `${AI}/mcp` }],
    sandbox: "09-mcp",
  },
  {
    order: 10,
    slug: "multi-agent",
    icon: "Workflow",
    difficulty: "advanced",
    minutes: 24,
    partId: "flow",
    title: { pl: "Multi-agent i grafy", en: "Multi-agent & graphs" },
    summary: {
      pl: "Łącz agentów, buduj grafy z pydantic-graph i poznaj trwałe wykonanie (durable execution).",
      en: "Compose agents, build graphs with pydantic-graph, and learn durable execution.",
    },
    docs: [
      { label: "Multi-agent", url: `${AI}/multi-agent-applications` },
      { label: "Graphs", url: `${AI}/graph` },
    ],
    sandbox: "10-multi-agent",
  },
  {
    order: 11,
    slug: "testy-ewaluacje",
    icon: "FlaskConical",
    difficulty: "advanced",
    minutes: 20,
    partId: "production",
    title: { pl: "Testy i ewaluacje", en: "Testing & evals" },
    summary: {
      pl: "Testuj agentów bez wydawania pieniędzy na model i mierz jakość z pydantic-evals.",
      en: "Test agents without spending on the model, and measure quality with pydantic-evals.",
    },
    docs: [
      { label: "Testing", url: `${AI}/testing` },
      { label: "Evals", url: `${AI}/evals` },
    ],
    sandbox: "11-testy-ewaluacje",
  },
  {
    order: 12,
    slug: "logfire-observability",
    icon: "Activity",
    difficulty: "advanced",
    minutes: 17,
    partId: "production",
    title: { pl: "Obserwowalność z Logfire", en: "Observability with Logfire" },
    summary: {
      pl: "Podłącz Logfire i OpenTelemetry, śledź uruchomienia agenta i przygotuj wdrożenie.",
      en: "Wire up Logfire and OpenTelemetry, trace agent runs, and prepare for deployment.",
    },
    docs: [{ label: "Logfire / debugging", url: `${AI}/logfire` }],
    sandbox: "12-logfire-observability",
  },
  {
    order: 13,
    slug: "pydantic-walidacja",
    icon: "ShieldCheck",
    difficulty: "intro",
    minutes: 22,
    partId: "ecosystem",
    title: { pl: "Pydantic: walidacja u podstaw", en: "Pydantic: validation at the core" },
    summary: {
      pl: "Fundament całej biblioteki: BaseModel, typy, walidatory, serializacja i TypeAdapter.",
      en: "The foundation of the whole library: BaseModel, types, validators, serialization, and TypeAdapter.",
    },
    docs: [
      { label: "Pydantic docs", url: "https://pydantic.dev/docs/validation" },
      { label: "llms-full.txt", url: "https://pydantic.dev/docs/validation/latest/llms-full.txt" },
    ],
    sandbox: "13-pydantic-walidacja",
  },
  {
    order: 14,
    slug: "pydantic-settings",
    icon: "Settings2",
    difficulty: "intermediate",
    minutes: 14,
    partId: "ecosystem",
    title: { pl: "pydantic-settings", en: "pydantic-settings" },
    summary: {
      pl: "Typowana konfiguracja aplikacji: zmienne środowiskowe, pliki .env i źródła ustawień.",
      en: "Typed application configuration: environment variables, .env files, and settings sources.",
    },
    docs: [
      { label: "Settings", url: "https://pydantic.dev/docs/validation/concepts/pydantic_settings" },
    ],
    sandbox: "14-pydantic-settings",
  },
  {
    order: 15,
    slug: "fastapi-integracja",
    icon: "Server",
    difficulty: "advanced",
    minutes: 21,
    partId: "ecosystem",
    title: { pl: "Integracja z FastAPI", en: "FastAPI integration" },
    summary: {
      pl: "Wystaw agenta przez API: walidacja żądań, modele odpowiedzi i strumieniowanie w FastAPI.",
      en: "Expose an agent through an API: request validation, response models, and streaming in FastAPI.",
    },
    docs: [
      { label: "FastAPI", url: "https://fastapi.tiangolo.com" },
      { label: "Pydantic AI", url: `${AI}/overview` },
    ],
    sandbox: "15-fastapi-integracja",
  },
];

export const chaptersBySlug: Record<string, Chapter> = Object.fromEntries(
  chapters.map((c) => [c.slug, c]),
);

export function chapterNeighbours(slug: string): { prev?: Chapter; next?: Chapter } {
  const index = chapters.findIndex((c) => c.slug === slug);
  if (index === -1) return {};
  return {
    prev: index > 0 ? chapters[index - 1] : undefined,
    next: index < chapters.length - 1 ? chapters[index + 1] : undefined,
  };
}
