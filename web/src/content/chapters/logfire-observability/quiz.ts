import type { ChapterQuiz } from "@/content/quiz-types";

export const quiz: ChapterQuiz = {
  questions: [
    {
      prompt: {
        pl: "Które dwa wywołania włączają śledzenie agentów w Logfire?",
        en: "Which two calls turn on tracing for agents in Logfire?",
      },
      options: [
        {
          text: {
            pl: "logfire.configure() oraz logfire.instrument_pydantic_ai()",
            en: "logfire.configure() and logfire.instrument_pydantic_ai()",
          },
        },
        {
          text: {
            pl: "agent.trace() oraz agent.export()",
            en: "agent.trace() and agent.export()",
          },
        },
        {
          text: {
            pl: "logfire.start() oraz agent.run_sync()",
            en: "logfire.start() and agent.run_sync()",
          },
        },
        {
          text: {
            pl: "print() oraz logging.basicConfig()",
            en: "print() and logging.basicConfig()",
          },
        },
      ],
      answer: 0,
      explanation: {
        pl: "configure() ustawia SDK, a instrument_pydantic_ai() instrumentuje każdego agenta utworzonego od tego miejsca.",
        en: "configure() sets up the SDK, and instrument_pydantic_ai() instruments every agent created from that point on.",
      },
    },
    {
      prompt: {
        pl: "Co w aplikacjach na bazie LLM jest realnym kosztem, który warto śledzić na poziomie spana?",
        en: "In LLM applications, what is the real cost worth tracking at the span level?",
      },
      options: [
        { text: { pl: "Zużycie tokenów", en: "Token usage" } },
        { text: { pl: "Liczba plików w repozytorium", en: "The number of files in the repo" } },
        { text: { pl: "Rozmiar bundla frontendu", en: "The frontend bundle size" } },
        { text: { pl: "Liczba linii kodu", en: "The number of lines of code" } },
      ],
      answer: 0,
      explanation: {
        pl: "Każde uruchomienie agenta to tokeny, czyli pieniądze, dlatego śledzenie ich na poziomie spana jest tak cenne.",
        en: "Every agent run means tokens, which is money, so tracking them at the span level is so valuable.",
      },
    },
    {
      prompt: {
        pl: "Jak wysłać ślady do innego backendu niż chmura Logfire?",
        en: "How do you send traces to a backend other than the Logfire cloud?",
      },
      options: [
        {
          text: {
            pl: "Ustawić endpoint OTLP i wywołać logfire.configure(send_to_logfire=False)",
            en: "Set the OTLP endpoint and call logfire.configure(send_to_logfire=False)",
          },
        },
        {
          text: {
            pl: "Nie da się, Logfire działa tylko z własną chmurą",
            en: "You cannot, Logfire only works with its own cloud",
          },
        },
        {
          text: {
            pl: "Trzeba przepisać agenta na czysty OpenTelemetry bez Logfire",
            en: "You must rewrite the agent in raw OpenTelemetry without Logfire",
          },
        },
        {
          text: {
            pl: "Wystarczy usunąć pakiet logfire z zależności",
            en: "Just remove the logfire package from the dependencies",
          },
        },
      ],
      answer: 0,
      explanation: {
        pl: "Logfire opiera się na OpenTelemetry, więc po wyłączeniu wysyłki do chmury ślady lecą do dowolnego zgodnego kolektora OTLP.",
        en: "Logfire is built on OpenTelemetry, so once cloud sending is off, traces go to any compatible OTLP collector.",
      },
    },
    {
      prompt: {
        pl: "Co dzieje się ze śledzeniem, gdy logfire jest zainstalowany, ale instrumentacja nie jest włączona?",
        en: "What happens to tracing when logfire is installed but instrumentation is not enabled?",
      },
      options: [
        {
          text: {
            pl: "Narzut jest praktycznie zerowy i nic nie jest wysyłane",
            en: "Overhead is virtually zero and nothing is sent",
          },
        },
        {
          text: {
            pl: "Agent przestaje działać do czasu konfiguracji",
            en: "The agent stops working until it is configured",
          },
        },
        {
          text: {
            pl: "Wszystkie ślady i tak są wysyłane do chmury",
            en: "All traces are sent to the cloud anyway",
          },
        },
        {
          text: {
            pl: "Każde uruchomienie zwalnia dwukrotnie",
            en: "Every run becomes twice as slow",
          },
        },
      ],
      answer: 0,
      explanation: {
        pl: "Wsparcie dla Logfire jest opcjonalne: bez włączonej instrumentacji narzut jest minimalny i nic nigdzie nie wychodzi.",
        en: "Logfire support is optional: with instrumentation off, overhead is minimal and nothing leaves your machine.",
      },
    },
  ],
};
