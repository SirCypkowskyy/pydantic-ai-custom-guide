import type { ChapterQuiz } from "@/content/quiz-types";

export const quiz: ChapterQuiz = {
  questions: [
    {
      prompt: {
        pl: "Które dwa protokoły strumienia zdarzeń UI wspiera natywnie Pydantic AI?",
        en: "Which two UI event stream protocols does Pydantic AI natively support?",
      },
      options: [
        {
          text: { pl: "AG-UI i Vercel AI Data Stream", en: "AG-UI and the Vercel AI Data Stream" },
        },
        { text: { pl: "GraphQL i gRPC", en: "GraphQL and gRPC" } },
        { text: { pl: "WebSocket i MQTT", en: "WebSocket and MQTT" } },
        { text: { pl: "REST i SOAP", en: "REST and SOAP" } },
      ],
      answer: 0,
      explanation: {
        pl: "Obie integracje to podklasy UIAdapter: AGUIAdapter i VercelAIAdapter.",
        en: "Both integrations are UIAdapter subclasses: AGUIAdapter and VercelAIAdapter.",
      },
    },
    {
      prompt: {
        pl: "Jak najprościej obsłużyć żądanie w endpointcie FastAPI?",
        en: "What is the simplest way to handle a request in a FastAPI endpoint?",
      },
      options: [
        {
          text: {
            pl: "await VercelAIAdapter.dispatch_request(request, agent=agent)",
            en: "await VercelAIAdapter.dispatch_request(request, agent=agent)",
          },
        },
        {
          text: { pl: "Ręczne parsowanie ciała żądania", en: "Manually parsing the request body" },
        },
        {
          text: { pl: "Uruchomienie agenta przez run_sync", en: "Running the agent with run_sync" },
        },
        { text: { pl: "Zwrócenie zwykłego JSON-a", en: "Returning a plain JSON object" } },
      ],
      answer: 0,
      explanation: {
        pl: "dispatch_request() obsługuje całe żądanie i zwraca strumieniową odpowiedź zdarzeń protokołu.",
        en: "dispatch_request() handles the whole request and returns a streaming response of protocol events.",
      },
    },
    {
      prompt: {
        pl: "Czego użyjesz we frontendzie Next.js z adapterem Vercel AI?",
        en: "What would you use in a Next.js frontend with the Vercel AI adapter?",
      },
      options: [
        { text: { pl: "Hooka useChat z AI SDK UI", en: "The useChat hook from AI SDK UI" } },
        { text: { pl: "Biblioteki jQuery", en: "The jQuery library" } },
        { text: { pl: "Własnego klienta WebSocket", en: "A custom WebSocket client" } },
        { text: { pl: "Serwera MCP", en: "An MCP server" } },
      ],
      answer: 0,
      explanation: {
        pl: "Adapter strumieniuje w formacie, który useChat rozumie bez dodatkowej konfiguracji.",
        en: "The adapter streams in a format that useChat understands with no extra configuration.",
      },
    },
    {
      prompt: {
        pl: "Jak SPA odbiera strumień zdarzeń z backendu?",
        en: "How does a SPA receive the event stream from the backend?",
      },
      options: [
        {
          text: {
            pl: "Czyta SSE zwykłym fetch; backend koduje strumień przez encode_stream()",
            en: "It reads SSE with a plain fetch; the backend encodes the stream via encode_stream()",
          },
        },
        {
          text: {
            pl: "Pobiera całość jednym żądaniem GET",
            en: "It downloads everything in one GET request",
          },
        },
        { text: { pl: "Odpytuje bazę danych co sekundę", en: "It polls a database every second" } },
        {
          text: {
            pl: "Importuje agenta bezpośrednio do JavaScriptu",
            en: "It imports the agent directly into JavaScript",
          },
        },
      ],
      answer: 0,
      explanation: {
        pl: "Adapter oddaje zdarzenia jako SSE (encode_stream), a SPA czyta strumień przez fetch.",
        en: "The adapter emits events as SSE (encode_stream), and the SPA reads the stream with fetch.",
      },
    },
  ],
};
