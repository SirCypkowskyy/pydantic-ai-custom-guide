import type { ChapterQuiz } from "@/content/quiz-types";

export const quiz: ChapterQuiz = {
  questions: [
    {
      prompt: {
        pl: "Gdzie powinieneś utworzyć obiekt Agent w aplikacji FastAPI?",
        en: "Where should you create the Agent object in a FastAPI app?",
      },
      options: [
        {
          text: {
            pl: "Raz, na poziomie modułu, i współdzielić go między żądaniami",
            en: "Once, at module level, and share it across requests",
          },
        },
        {
          text: {
            pl: "Wewnątrz każdej funkcji obsługującej żądanie",
            en: "Inside each request handler",
          },
        },
        {
          text: {
            pl: "W osobnym wątku dla każdego klienta",
            en: "In a separate thread for every client",
          },
        },
        {
          text: {
            pl: "W zależności FastAPI tworzonej na każde żądanie",
            en: "In a FastAPI dependency rebuilt on every request",
          },
        },
      ],
      answer: 0,
      explanation: {
        pl: "Agent jest bezstanowy względem pojedynczego uruchomienia, więc jedna instancja obsługuje wiele równoległych żądań bez kolizji.",
        en: "The agent is stateless per run, so a single instance handles many concurrent requests without stepping on itself.",
      },
    },
    {
      prompt: {
        pl: "Której metody agenta użyjesz w asynchronicznym endpoincie FastAPI?",
        en: "Which agent method do you use in an async FastAPI endpoint?",
      },
      options: [
        { text: { pl: "await agent.run(...)", en: "await agent.run(...)" } },
        { text: { pl: "agent.run_sync(...)", en: "agent.run_sync(...)" } },
        {
          text: {
            pl: "agent.run_blocking(...)",
            en: "agent.run_blocking(...)",
          },
        },
        { text: { pl: "Agent.call(...)", en: "Agent.call(...)" } },
      ],
      answer: 0,
      explanation: {
        pl: "run_sync() zablokowałoby pętlę zdarzeń i wstrzymało inne żądania, dlatego w funkcji async używasz await agent.run(...).",
        en: "run_sync() would block the event loop and stall other requests, so in an async function you use await agent.run(...).",
      },
    },
    {
      prompt: {
        pl: "Po co przy strumieniowaniu owijamy run_stream w async with?",
        en: "Why do we wrap run_stream in async with when streaming?",
      },
      options: [
        {
          text: {
            pl: "run_stream to menedżer kontekstu, który porządnie zamyka połączenie z modelem nawet przy błędzie",
            en: "run_stream is a context manager that closes the model connection cleanly even on error",
          },
        },
        {
          text: {
            pl: "Bez tego StreamingResponse zwróci JSON zamiast tekstu",
            en: "Without it StreamingResponse returns JSON instead of text",
          },
        },
        {
          text: {
            pl: "Async with cache'uje odpowiedź modelu na dysku",
            en: "async with caches the model reply on disk",
          },
        },
        {
          text: {
            pl: "To jedyny sposób, żeby ustawić media_type",
            en: "It is the only way to set the media_type",
          },
        },
      ],
      answer: 0,
      explanation: {
        pl: "run_stream() jest menedżerem kontekstu, więc async with gwarantuje czyste zamknięcie strumienia niezależnie od błędów.",
        en: "run_stream() is a context manager, so async with guarantees the stream closes cleanly regardless of errors.",
      },
    },
    {
      prompt: {
        pl: "Jak przetestować endpoint offline, bez wywoływania prawdziwego modelu?",
        en: "How do you test the endpoint offline, without calling a real model?",
      },
      options: [
        {
          text: {
            pl: "TestClient z FastAPI plus agent.override(model=TestModel())",
            en: "FastAPI's TestClient plus agent.override(model=TestModel())",
          },
        },
        {
          text: {
            pl: "Ustawić pusty klucz API w zmiennej środowiskowej",
            en: "Set an empty API key in an environment variable",
          },
        },
        {
          text: {
            pl: "Zamockować bibliotekę requests ręcznie",
            en: "Manually mock the requests library",
          },
        },
        {
          text: {
            pl: "Uruchomić prawdziwy serwer na localhost i odpytać go",
            en: "Run a real server on localhost and query it",
          },
        },
      ],
      answer: 0,
      explanation: {
        pl: "TestClient wysyła żądania bez serwera, a override(model=TestModel()) podmienia model na atrapę, która nie wychodzi do sieci i dobiera wynik pasujący do output_type.",
        en: "TestClient sends requests without a server, and override(model=TestModel()) swaps in a fake that never hits the network and picks a result matching output_type.",
      },
    },
  ],
};
