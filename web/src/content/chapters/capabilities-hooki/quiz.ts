import type { ChapterQuiz } from "@/content/quiz-types";

export const quiz: ChapterQuiz = {
  questions: [
    {
      prompt: {
        pl: "Czym jest capability w Pydantic AI?",
        en: "What is a capability in Pydantic AI?",
      },
      options: [
        {
          text: {
            pl: "Wielokrotnego użytku paczka zachowania: narzędzia, hooki, instrukcje i ustawienia modelu",
            en: "A reusable bundle of behavior: tools, hooks, instructions, and model settings",
          },
        },
        {
          text: {
            pl: "Wyłącznie klucz API przekazywany do modelu",
            en: "Only an API key passed to the model",
          },
        },
        {
          text: {
            pl: "Format pliku do zapisu historii rozmowy",
            en: "A file format for storing conversation history",
          },
        },
        {
          text: {
            pl: "Osobny proces uruchamiany dla każdego narzędzia",
            en: "A separate process spawned for each tool",
          },
        },
      ],
      answer: 0,
      explanation: {
        pl: "Capability wpinasz przez parametr capabilities i może dostarczać dowolną kombinację narzędzi, hooków, instrukcji oraz ustawień modelu.",
        en: "You plug a capability in through the capabilities parameter, and it can provide any combination of tools, hooks, instructions, and model settings.",
      },
    },
    {
      prompt: {
        pl: "Co robi flaga defer_loading=True na capability?",
        en: "What does the defer_loading=True flag on a capability do?",
      },
      options: [
        {
          text: {
            pl: "Zwija ją do wpisu w katalogu, który model wczytuje na żądanie narzędziem load_capability",
            en: "It collapses it to a catalog entry that the model loads on demand via the load_capability tool",
          },
        },
        {
          text: {
            pl: "Wyłącza capability na stałe",
            en: "It disables the capability permanently",
          },
        },
        {
          text: {
            pl: "Wczytuje wszystkie capabilities w każdej turze",
            en: "It loads every capability on every turn",
          },
        },
        {
          text: {
            pl: "Powoduje, że narzędzia są wykonywane w osobnym wątku",
            en: "It makes tools execute in a separate thread",
          },
        },
      ],
      answer: 0,
      explanation: {
        pl: "Paczka zwija się do jednej linii z id i opisem, a wczytanie aktywuje całą paczkę naraz: narzędzia, ustawienia i hooki.",
        en: "The bundle collapses to a single line with its id and description, and loading activates the whole bundle at once: tools, settings, and hooks.",
      },
    },
    {
      prompt: {
        pl: "Którą capability wybierzesz do szybkiego logowania na poziomie aplikacji bez dziedziczenia?",
        en: "Which capability would you pick for quick application-level logging without subclassing?",
      },
      options: [
        {
          text: {
            pl: "Hooks z dekoratorami @hooks.on.*",
            en: "Hooks with the @hooks.on.* decorators",
          },
        },
        {
          text: {
            pl: "AbstractCapability z własną klasą",
            en: "AbstractCapability with a custom class",
          },
        },
        { text: { pl: "WebSearch", en: "WebSearch" } },
        { text: { pl: "ToolSearch", en: "ToolSearch" } },
      ],
      answer: 0,
      explanation: {
        pl: "Hooks to droga do spraw aplikacyjnych jak logowanie czy metryki. AbstractCapability stosujesz, gdy łączysz hooki z narzędziami, instrukcjami lub ustawieniami w pakowalną paczkę.",
        en: "Hooks is the path for application-level concerns like logging or metrics. You use AbstractCapability when you combine hooks with tools, instructions, or settings into a packageable bundle.",
      },
    },
    {
      prompt: {
        pl: "Co może zrobić hook, podnosząc ModelRetry?",
        en: "What can a hook do by raising ModelRetry?",
      },
      options: [
        {
          text: {
            pl: "Poprosić model o ponowienie z własnym komunikatem zwrotnym",
            en: "Ask the model to try again with a custom feedback message",
          },
        },
        {
          text: {
            pl: "Trwale zatrzymać agenta bez żadnej odpowiedzi",
            en: "Permanently stop the agent with no response",
          },
        },
        {
          text: {
            pl: "Zmienić identyfikator modelu na inny dostawcę",
            en: "Change the model identifier to a different provider",
          },
        },
        {
          text: {
            pl: "Wyczyścić całą historię wiadomości",
            en: "Clear the entire message history",
          },
        },
      ],
      answer: 0,
      explanation: {
        pl: "ModelRetry to ta sama mechanika co w funkcjach narzędzi i walidatorach wyniku: lekka walidacja w hooku zamienia się w czytelną informację zwrotną dla modelu.",
        en: "ModelRetry is the same mechanism used in tool functions and output validators: lightweight validation in a hook turns into clear feedback for the model.",
      },
    },
  ],
};
