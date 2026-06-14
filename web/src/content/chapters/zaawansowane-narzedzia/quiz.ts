import type { ChapterQuiz } from "@/content/quiz-types";

export const quiz: ChapterQuiz = {
  questions: [
    {
      prompt: {
        pl: "Co oznacza zwrócenie None z funkcji prepare narzędzia?",
        en: "What does returning None from a tool's prepare function mean?",
      },
      options: [
        {
          text: {
            pl: "Narzędzie nie jest udostępniane modelowi na tym kroku",
            en: "The tool is not exposed to the model for that step",
          },
        },
        {
          text: {
            pl: "Narzędzie jest wywoływane natychmiast bez argumentów",
            en: "The tool is invoked immediately with no arguments",
          },
        },
        {
          text: {
            pl: "Definicja narzędzia zostaje zapisana w pamięci podręcznej",
            en: "The tool definition gets cached in memory",
          },
        },
        {
          text: {
            pl: "Agent kończy cały przebieg błędem",
            en: "The agent ends the whole run with an error",
          },
        },
      ],
      answer: 0,
      explanation: {
        pl: "prepare działa na każdym kroku; zwrócenie None pomija narzędzie, a ten sam lub zmieniony ToolDefinition je udostępnia.",
        en: "prepare runs at each step; returning None omits the tool, while the same or a modified ToolDefinition exposes it.",
      },
    },
    {
      prompt: {
        pl: "Dlaczego nie ustawisz tool_choice='required' statycznie na całe uruchomienie agenta?",
        en: "Why can't you set tool_choice='required' statically for a whole agent run?",
      },
      options: [
        {
          text: {
            pl: "Wyklucza narzędzia wyniku, więc agent nie zwróciłby ostatecznej odpowiedzi",
            en: "It excludes output tools, so the agent could not produce a final answer",
          },
        },
        {
          text: {
            pl: "Działa tylko z modelami Anthropic",
            en: "It works only with Anthropic models",
          },
        },
        {
          text: {
            pl: "Wyłącza strumieniowanie wyników",
            en: "It disables streaming of results",
          },
        },
        {
          text: {
            pl: "Wymaga zainstalowania dodatkowej grupy pakietów",
            en: "It requires installing an extra package group",
          },
        },
      ],
      answer: 0,
      explanation: {
        pl: "required i lista nazw wykluczają narzędzia wyniku, więc agent.run() zgłasza błąd; zmieniaj tę wartość per krok przez capability.",
        en: "required and a list of names exclude output tools, so agent.run() raises an error; vary it per step via a capability.",
      },
    },
    {
      prompt: {
        pl: "Które pole obiektu ToolReturn nie jest wysyłane do modelu?",
        en: "Which field of a ToolReturn object is not sent to the model?",
      },
      options: [
        { text: { pl: "metadata", en: "metadata" } },
        { text: { pl: "return_value", en: "return_value" } },
        { text: { pl: "content", en: "content" } },
        { text: { pl: "Wszystkie trzy trafiają do modelu", en: "All three reach the model" } },
      ],
      answer: 0,
      explanation: {
        pl: "metadata zostaje po stronie aplikacji do logów i debugowania, podczas gdy return_value i content trafiają do modelu.",
        en: "metadata stays on the application side for logging and debugging, while return_value and content reach the model.",
      },
    },
    {
      prompt: {
        pl: "Czym różni się WebSearchTool od duckduckgo_search_tool?",
        en: "How does WebSearchTool differ from duckduckgo_search_tool?",
      },
      options: [
        {
          text: {
            pl: "WebSearchTool wykonuje dostawca (capabilities), a duckduckgo_search_tool wykonuje Pydantic AI (tools)",
            en: "WebSearchTool is provider-executed (capabilities), while duckduckgo_search_tool is executed by Pydantic AI (tools)",
          },
        },
        {
          text: {
            pl: "Oba wymagają klucza API Tavily",
            en: "Both require a Tavily API key",
          },
        },
        {
          text: {
            pl: "duckduckgo_search_tool działa tylko z modelami OpenAI",
            en: "duckduckgo_search_tool works only with OpenAI models",
          },
        },
        {
          text: {
            pl: "WebSearchTool nie wymaga żadnego wsparcia od dostawcy",
            en: "WebSearchTool needs no support from the provider",
          },
        },
      ],
      answer: 0,
      explanation: {
        pl: "WebSearchTool owijasz w NativeTool i wykonuje go dostawca; duckduckgo_search_tool to zwykłe narzędzie funkcyjne działające u każdego dostawcy.",
        en: "You wrap WebSearchTool in NativeTool and the provider runs it; duckduckgo_search_tool is a regular function tool that works with any provider.",
      },
    },
  ],
};
