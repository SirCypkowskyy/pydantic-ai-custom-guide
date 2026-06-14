import type { ChapterQuiz } from "@/content/quiz-types";

export const quiz: ChapterQuiz = {
  questions: [
    {
      prompt: {
        pl: "Kiedy użyjesz @agent.tool zamiast @agent.tool_plain?",
        en: "When would you use @agent.tool instead of @agent.tool_plain?",
      },
      options: [
        {
          text: {
            pl: "Gdy narzędzie potrzebuje RunContext, na przykład dostępu do ctx.deps",
            en: "When the tool needs RunContext, for example access to ctx.deps",
          },
        },
        {
          text: {
            pl: "Gdy narzędzie zwraca tekst zamiast liczby",
            en: "When the tool returns text instead of a number",
          },
        },
        {
          text: {
            pl: "Gdy chcesz, by model wykonał kod bez walidacji",
            en: "When you want the model to run code without validation",
          },
        },
        {
          text: {
            pl: "Gdy narzędzie nie ma docstringa",
            en: "When the tool has no docstring",
          },
        },
      ],
      answer: 0,
      explanation: {
        pl: "@agent.tool przyjmuje RunContext jako pierwszy argument; @agent.tool_plain go nie potrzebuje.",
        en: "@agent.tool takes RunContext as its first argument; @agent.tool_plain does not need it.",
      },
    },
    {
      prompt: {
        pl: "Skąd model bierze opis narzędzia?",
        en: "Where does the model get a tool's description from?",
      },
      options: [
        {
          text: {
            pl: "Z docstringa funkcji oraz opisów parametrów w nim zawartych",
            en: "From the function's docstring and the parameter descriptions inside it",
          },
        },
        {
          text: { pl: "Z nazwy zmiennej agenta", en: "From the agent variable's name" },
        },
        {
          text: {
            pl: "Z osobnego pliku konfiguracyjnego JSON",
            en: "From a separate JSON configuration file",
          },
        },
        {
          text: {
            pl: "Model sam zgaduje na podstawie nazwy funkcji",
            en: "The model just guesses from the function name",
          },
        },
      ],
      answer: 0,
      explanation: {
        pl: "Pydantic AI buduje schemat z sygnatury i docstringa, w tym z opisów parametrów w formatach Google, NumPy czy Sphinx.",
        en: "Pydantic AI builds the schema from the signature and docstring, including parameter descriptions in Google, NumPy, or Sphinx formats.",
      },
    },
    {
      prompt: {
        pl: "Jak walidują się argumenty narzędzia?",
        en: "How are a tool's arguments validated?",
      },
      options: [
        {
          text: {
            pl: "Z podpowiedzi typów, tak samo jak pola modelu Pydantic",
            en: "From the type hints, the same way as fields on a Pydantic model",
          },
        },
        {
          text: {
            pl: "Musisz napisać ręcznie instrukcje if w treści funkcji",
            en: "You must hand-write if statements in the function body",
          },
        },
        {
          text: {
            pl: "Walidacji nie ma, model zawsze przysyła poprawne dane",
            en: "There is no validation, the model always sends correct data",
          },
        },
        {
          text: {
            pl: "Tylko dla narzędzi @agent.tool, nie dla tool_plain",
            en: "Only for @agent.tool tools, not for tool_plain",
          },
        },
      ],
      answer: 0,
      explanation: {
        pl: "Podpowiedzi typów stają się schematem; niezgodne argumenty wracają do modelu jako błąd walidacji do poprawienia.",
        en: "The type hints become a schema; mismatched arguments go back to the model as a validation error to fix.",
      },
    },
    {
      prompt: {
        pl: "Do czego służy ModelRetry?",
        en: "What is ModelRetry used for?",
      },
      options: [
        {
          text: {
            pl: "Do zasygnalizowania modelowi, by spróbował ponownie z lepszymi argumentami",
            en: "To signal the model to try again with better arguments",
          },
        },
        {
          text: {
            pl: "Do restartu całej aplikacji po awarii",
            en: "To restart the whole application after a crash",
          },
        },
        {
          text: {
            pl: "Do nieskończonego ponawiania, dopóki nie pojawi się wynik",
            en: "To retry endlessly until a result appears",
          },
        },
        {
          text: {
            pl: "Do przyspieszenia odpowiedzi modelu",
            en: "To speed up the model's response",
          },
        },
      ],
      answer: 0,
      explanation: {
        pl: "Podnosisz ModelRetry przy błędach do naprawienia; wiadomość wraca do modelu, a liczba prób jest ograniczona.",
        en: "You raise ModelRetry for recoverable errors; the message goes back to the model, and the number of attempts is bounded.",
      },
    },
  ],
};
