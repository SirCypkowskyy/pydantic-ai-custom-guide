import type { ChapterQuiz } from "@/content/quiz-types";

export const quiz: ChapterQuiz = {
  questions: [
    {
      prompt: {
        pl: "Po co używać TestModel zamiast prawdziwego modelu w testach jednostkowych?",
        en: "Why use TestModel instead of a real model in unit tests?",
      },
      options: [
        {
          text: {
            pl: "Działa lokalnie, bez sieci i klucza, dając szybkie i deterministyczne testy",
            en: "It runs locally with no network or key, giving fast and deterministic tests",
          },
        },
        {
          text: {
            pl: "Zwraca lepsze odpowiedzi niż prawdziwy model",
            en: "It returns better answers than a real model",
          },
        },
        {
          text: {
            pl: "Automatycznie wdraża agenta na produkcję",
            en: "It automatically deploys the agent to production",
          },
        },
        {
          text: {
            pl: "Szyfruje klucz API przed wysłaniem zapytania",
            en: "It encrypts the API key before sending the request",
          },
        },
      ],
      answer: 0,
      explanation: {
        pl: "TestModel nie wychodzi do sieci i woła wszystkie narzędzia, więc testy są tanie i powtarzalne.",
        en: "TestModel never hits the network and calls every tool, so tests are cheap and repeatable.",
      },
    },
    {
      prompt: {
        pl: "Jak podmienić model agenta na atrapę tylko na czas testu?",
        en: "How do you swap an agent's model for a stub only during a test?",
      },
      options: [
        {
          text: {
            pl: "agent.override(model=...) w bloku with",
            en: "agent.override(model=...) inside a with block",
          },
        },
        {
          text: {
            pl: "Nadpisać atrybut agent.model na stałe globalnie",
            en: "Permanently overwrite the global agent.model attribute",
          },
        },
        {
          text: {
            pl: "Stworzyć drugiego agenta i skopiować instrukcje ręcznie",
            en: "Create a second agent and copy the instructions by hand",
          },
        },
        {
          text: {
            pl: "Ustawić zmienną środowiskową PYDANTIC_TEST",
            en: "Set a PYDANTIC_TEST environment variable",
          },
        },
      ],
      answer: 0,
      explanation: {
        pl: "override podmienia model tylko w obrębie bloku with, więc kod produkcyjny zostaje nietknięty.",
        en: "override swaps the model only within the with block, leaving production code untouched.",
      },
    },
    {
      prompt: {
        pl: "Kiedy sięgniesz po FunctionModel zamiast TestModel?",
        en: "When would you reach for FunctionModel instead of TestModel?",
      },
      options: [
        {
          text: {
            pl: "Gdy chcesz sam zdecydować, co model odpowie albo jakie narzędzie zawoła",
            en: "When you want to decide exactly what the model replies or which tool it calls",
          },
        },
        {
          text: {
            pl: "Gdy potrzebujesz połączenia z prawdziwym API",
            en: "When you need a connection to the real API",
          },
        },
        {
          text: {
            pl: "Gdy chcesz pominąć wszystkie narzędzia agenta",
            en: "When you want to skip all of the agent's tools",
          },
        },
        {
          text: {
            pl: "Gdy zależy ci wyłącznie na szybkości, nie na zachowaniu",
            en: "When you care only about speed, not behavior",
          },
        },
      ],
      answer: 0,
      explanation: {
        pl: "FunctionModel pozwala napisać funkcję, która z otrzymanych wiadomości buduje konkretną odpowiedź modelu.",
        en: "FunctionModel lets you write a function that builds a specific model response from the messages it receives.",
      },
    },
    {
      prompt: {
        pl: "Czym jest Dataset w pakiecie pydantic-evals?",
        en: "What is a Dataset in the pydantic-evals package?",
      },
      options: [
        {
          text: {
            pl: "Zbiór przypadków (Case) z ewaluatorami, uruchamiany na funkcji lub agencie",
            en: "A set of cases (Case) with evaluators, run against a function or agent",
          },
        },
        {
          text: {
            pl: "Tabela w bazie danych do logowania zapytań",
            en: "A database table for logging requests",
          },
        },
        {
          text: {
            pl: "Lista kluczy API do rotacji między dostawcami",
            en: "A list of API keys to rotate between providers",
          },
        },
        {
          text: {
            pl: "Zamiennik TestModel do testów jednostkowych",
            en: "A replacement for TestModel in unit tests",
          },
        },
      ],
      answer: 0,
      explanation: {
        pl: "Dataset łączy przypadki z ewaluatorami, a evaluate_sync przepuszcza przez nie wyniki i zwraca raport.",
        en: "A Dataset combines cases with evaluators, and evaluate_sync runs results through them and returns a report.",
      },
    },
  ],
};
