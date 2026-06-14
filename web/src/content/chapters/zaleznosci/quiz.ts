import type { ChapterQuiz } from "@/content/quiz-types";

export const quiz: ChapterQuiz = {
  questions: [
    {
      prompt: {
        pl: "Co robi parametr deps_type przekazany do agenta?",
        en: "What does the deps_type parameter passed to an agent do?",
      },
      options: [
        {
          text: {
            pl: "Ustala typ zależności, czyli kontrakt obiektu wstrzykiwanego przy każdym uruchomieniu",
            en: "Sets the dependencies type, the contract for the object injected on every run",
          },
        },
        {
          text: {
            pl: "Od razu tworzy instancję zależności i zapisuje ją globalnie",
            en: "Immediately creates a dependencies instance and stores it globally",
          },
        },
        {
          text: {
            pl: "Wybiera model, z którego korzysta agent",
            en: "Picks the model the agent uses",
          },
        },
        {
          text: {
            pl: "Wymusza, by wynik agenta był typu dataclass",
            en: "Forces the agent's output to be a dataclass",
          },
        },
      ],
      answer: 0,
      explanation: {
        pl: "deps_type to parametr czysto typowy: ustala kontrakt, a samą instancję podajesz dopiero przy run lub run_sync.",
        en: "deps_type is a purely typing parameter: it sets the contract, and you pass the instance later at run or run_sync.",
      },
    },
    {
      prompt: {
        pl: "Jak narzędzie sięga po wstrzyknięte zależności?",
        en: "How does a tool reach the injected dependencies?",
      },
      options: [
        {
          text: {
            pl: "Przez ctx.deps z argumentu RunContext",
            en: "Through ctx.deps from the RunContext argument",
          },
        },
        {
          text: {
            pl: "Przez zmienną globalną importowaną z modułu",
            en: "Through a global variable imported from the module",
          },
        },
        {
          text: {
            pl: "Przez argument o nazwie deps wstrzykiwany do każdej funkcji",
            en: "Through an argument named deps injected into every function",
          },
        },
        {
          text: {
            pl: "Przez odczyt zmiennych środowiskowych",
            en: "By reading environment variables",
          },
        },
      ],
      answer: 0,
      explanation: {
        pl: "Pierwszy argument narzędzia to RunContext[Deps], a przez ctx.deps dostajesz dokładnie wstrzyknięty obiekt.",
        en: "A tool's first argument is RunContext[Deps], and ctx.deps gives back exactly the injected object.",
      },
    },
    {
      prompt: {
        pl: "Dlaczego zależności trzymane w deps ułatwiają testowanie?",
        en: "Why do dependencies kept in deps make testing easier?",
      },
      options: [
        {
          text: {
            pl: "Bo agent.override pozwala podmienić deps i model tylko na czas bloku with",
            en: "Because agent.override lets you swap deps and the model only for a with block",
          },
        },
        {
          text: {
            pl: "Bo deps automatycznie wyłącza wszystkie narzędzia w teście",
            en: "Because deps automatically disables every tool during a test",
          },
        },
        {
          text: {
            pl: "Bo deps zapisuje odpowiedzi modelu w pliku cache",
            en: "Because deps stores model responses in a cache file",
          },
        },
        {
          text: {
            pl: "Bo deps szyfruje klucz API przed wysłaniem do modelu",
            en: "Because deps encrypts the API key before sending it to the model",
          },
        },
      ],
      answer: 0,
      explanation: {
        pl: "Podmieniasz prawdziwego klienta na atrapę i model na TestModel, więc test jest deterministyczny i bez sieci.",
        en: "You swap the real client for a fake and the model for TestModel, so the test is deterministic and offline.",
      },
    },
    {
      prompt: {
        pl: "Co najlepiej trzymać w obiekcie deps?",
        en: "What is best kept in the deps object?",
      },
      options: [
        {
          text: {
            pl: "Zasoby, które chcesz móc podmienić: klientów sieciowych, połączenia z bazą, zegary",
            en: "Resources you want to swap: network clients, database connections, clocks",
          },
        },
        {
          text: {
            pl: "Treść finalnej odpowiedzi, którą model ma zwrócić",
            en: "The final answer text the model should return",
          },
        },
        {
          text: {
            pl: "Pełną historię wszystkich dotychczasowych rozmów",
            en: "The full history of every past conversation",
          },
        },
        {
          text: {
            pl: "Wagi modelu językowego pobrane z dysku",
            en: "The language model weights loaded from disk",
          },
        },
      ],
      answer: 0,
      explanation: {
        pl: "W deps trzymasz wymienialne zasoby; czyste stałe konfiguracyjne mogą zostać w samych instrukcjach.",
        en: "Put swappable resources in deps; plain configuration constants can stay in the instructions themselves.",
      },
    },
  ],
};
