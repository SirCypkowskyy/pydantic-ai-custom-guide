import type { ChapterQuiz } from "@/content/quiz-types";

export const quiz: ChapterQuiz = {
  questions: [
    {
      prompt: {
        pl: "Jak w Pydantic AI reprezentuje się umiejętność lub wtyczkę agenta?",
        en: "How is an agent skill or plugin represented in Pydantic AI?",
      },
      options: [
        { text: { pl: "Jako zestaw narzędzi (toolset)", en: "As a toolset" } },
        { text: { pl: "Jako osobny proces systemowy", en: "As a separate system process" } },
        { text: { pl: "Jako dodatkowy model językowy", en: "As an extra language model" } },
        { text: { pl: "Jako wpis w bazie danych", en: "As a database record" } },
      ],
      answer: 0,
      explanation: {
        pl: "Umiejętności to zestawy narzędzi przekazywane w parametrze toolsets, więc włączasz je jak wtyczki.",
        en: "Skills are toolsets passed via the toolsets parameter, so you switch them on like plugins.",
      },
    },
    {
      prompt: {
        pl: "Jak podłączasz serwer MCP do agenta?",
        en: "How do you connect an MCP server to an agent?",
      },
      options: [
        {
          text: {
            pl: "Dodajesz go do listy toolsets agenta",
            en: "You add it to the agent's toolsets list",
          },
        },
        { text: { pl: "Kopiujesz jego kod do agenta", en: "You copy its code into the agent" } },
        {
          text: {
            pl: "Tylko przez zmienną środowiskową",
            en: "Only through an environment variable",
          },
        },
        { text: { pl: "Nie da się tego zrobić", en: "It cannot be done" } },
      ],
      answer: 0,
      explanation: {
        pl: "Z punktu widzenia agenta serwer MCP to kolejny zestaw narzędzi na liście toolsets.",
        en: "From the agent's point of view an MCP server is just another toolset in the toolsets list.",
      },
    },
    {
      prompt: {
        pl: "Co zwraca agent, gdy chce wykonać narzędzie wymagające zgody?",
        en: "What does the agent return when it wants to run a tool that requires approval?",
      },
      options: [
        { text: { pl: "Obiekt DeferredToolRequests", en: "A DeferredToolRequests object" } },
        { text: { pl: "Wyjątek, który kończy program", en: "An exception that ends the program" } },
        { text: { pl: "Pusty łańcuch znaków", en: "An empty string" } },
        { text: { pl: "Od razu wykonuje narzędzie", en: "It runs the tool immediately" } },
      ],
      answer: 0,
      explanation: {
        pl: "Wynikiem jest DeferredToolRequests z listą próśb o zgodę, a wykonanie czeka na decyzję.",
        en: "The output is a DeferredToolRequests with a list of approval requests, and execution waits for a decision.",
      },
    },
    {
      prompt: {
        pl: "Jak wznawiasz uruchomienie po decyzji człowieka?",
        en: "How do you resume the run after the human decision?",
      },
      options: [
        {
          text: {
            pl: "Przekazujesz message_history i deferred_tool_results do kolejnego uruchomienia",
            en: "You pass message_history and deferred_tool_results to the next run",
          },
        },
        {
          text: {
            pl: "Tworzysz zupełnie nowego agenta od zera",
            en: "You create a brand new agent from scratch",
          },
        },
        { text: { pl: "Restartujesz proces Pythona", en: "You restart the Python process" } },
        {
          text: {
            pl: "Czekasz, aż agent sam spróbuje ponownie",
            en: "You wait for the agent to retry on its own",
          },
        },
      ],
      answer: 0,
      explanation: {
        pl: "Wznawiasz, podając tę samą historię wiadomości oraz DeferredToolResults z decyzjami akceptacji.",
        en: "You resume by passing the same message history and a DeferredToolResults with the approval decisions.",
      },
    },
  ],
};
