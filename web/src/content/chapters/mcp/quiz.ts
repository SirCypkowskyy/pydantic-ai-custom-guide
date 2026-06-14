import type { ChapterQuiz } from "@/content/quiz-types";

export const quiz: ChapterQuiz = {
  questions: [
    {
      prompt: {
        pl: "Jak podłączasz serwer MCP do agenta w Pydantic AI?",
        en: "How do you connect an MCP server to an agent in Pydantic AI?",
      },
      options: [
        {
          text: {
            pl: "Przez parametr toolsets=[...] na agencie",
            en: "Through the toolsets=[...] parameter on the agent",
          },
        },
        {
          text: {
            pl: "Przez parametr instructions=...",
            en: "Through the instructions=... parameter",
          },
        },
        {
          text: {
            pl: "Kopiując kod serwera do funkcji agenta",
            en: "By copying the server code into the agent function",
          },
        },
        {
          text: {
            pl: "Serwerów MCP nie da się podłączyć do agenta",
            en: "MCP servers cannot be connected to an agent",
          },
        },
      ],
      answer: 0,
      explanation: {
        pl: "Serwer MCP jest toolsetem i przekazujesz go przez toolsets=[...]. Dla modelu jego narzędzia wyglądają jak zwykłe narzędzia agenta.",
        en: "An MCP server is a toolset and you pass it through toolsets=[...]. To the model its tools look like ordinary agent tools.",
      },
    },
    {
      prompt: {
        pl: "Której klasy użyjesz, gdy serwer MCP ma być uruchomiony lokalnie jako podproces?",
        en: "Which class do you use when the MCP server should run locally as a subprocess?",
      },
      options: [
        { text: { pl: "MCPServerStdio", en: "MCPServerStdio" } },
        { text: { pl: "MCPServerStreamableHTTP", en: "MCPServerStreamableHTTP" } },
        { text: { pl: "RunContext", en: "RunContext" } },
        { text: { pl: "OpenAIProvider", en: "OpenAIProvider" } },
      ],
      answer: 0,
      explanation: {
        pl: "MCPServerStdio startuje serwer jako podproces i rozmawia z nim przez stdin i stdout. MCPServerStreamableHTTP łączy się z usługą zdalną pod adresem URL.",
        en: "MCPServerStdio starts the server as a subprocess and talks to it over stdin and stdout. MCPServerStreamableHTTP connects to a remote service at a URL.",
      },
    },
    {
      prompt: {
        pl: "Dlaczego uruchomienie agenta z serwerem MCP owija się w async with agent?",
        en: "Why is an agent run with an MCP server wrapped in async with agent?",
      },
      options: [
        {
          text: {
            pl: "Bo ten blok zarządza cyklem życia serwera: otwiera i zamyka połączenie",
            en: "Because that block manages the server lifecycle: it opens and closes the connection",
          },
        },
        {
          text: {
            pl: "Bo bez niego model odpowiada szybciej",
            en: "Because without it the model replies faster",
          },
        },
        {
          text: {
            pl: "Bo async with szyfruje klucz API",
            en: "Because async with encrypts the API key",
          },
        },
        {
          text: {
            pl: "To tylko kwestia stylu, nie ma znaczenia",
            en: "It is only a matter of style and makes no difference",
          },
        },
      ],
      answer: 0,
      explanation: {
        pl: "Bez kontekstu async with serwer MCP nie wystartuje i agent.run nie znajdzie żadnych narzędzi.",
        en: "Without the async with context the MCP server never starts and agent.run finds no tools.",
      },
    },
    {
      prompt: {
        pl: "Jaki warunek musi spełniać model, żeby korzystać z narzędzi MCP?",
        en: "What must be true of the model for it to use MCP tools?",
      },
      options: [
        {
          text: {
            pl: "Musi obsługiwać wywołania narzędzi (tool calling)",
            en: "It must support tool calling",
          },
        },
        {
          text: {
            pl: "Musi pochodzić wyłącznie od OpenAI",
            en: "It must come only from OpenAI",
          },
        },
        {
          text: {
            pl: "Musi działać lokalnie na tej samej maszynie co serwer",
            en: "It must run locally on the same machine as the server",
          },
        },
        {
          text: {
            pl: "Musi mieć wyłączone strumieniowanie",
            en: "It must have streaming disabled",
          },
        },
      ],
      answer: 0,
      explanation: {
        pl: "Model bez wsparcia dla tool calling zignoruje dostępny zestaw narzędzi i odpowie samym tekstem.",
        en: "A model without tool calling support will ignore the available toolset and answer with plain text only.",
      },
    },
  ],
};
