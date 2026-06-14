import type { ChapterQuiz } from "@/content/quiz-types";

export const quiz: ChapterQuiz = {
  questions: [
    {
      prompt: {
        pl: "Jaki jest format identyfikatora modelu w stylu string?",
        en: "What is the format of a string-style model identifier?",
      },
      options: [
        {
          text: {
            pl: "dostawca:nazwa, na przykład openai:gpt-5.2",
            en: "provider:name, for example openai:gpt-5.2",
          },
        },
        {
          text: {
            pl: "nazwa@wersja, na przykład gpt-5.2@latest",
            en: "name@version, for example gpt-5.2@latest",
          },
        },
        {
          text: {
            pl: "Pełny URL do endpointu API",
            en: "A full URL to the API endpoint",
          },
        },
        {
          text: {
            pl: "Sama nazwa modelu bez dostawcy",
            en: "Just the model name without a provider",
          },
        },
      ],
      answer: 0,
      explanation: {
        pl: "Pierwsza część to dostawca, druga to nazwa modelu u tego dostawcy. Pydantic AI dobiera klasę i klucz API automatycznie.",
        en: "The first part is the provider, the second is the model name at that provider. Pydantic AI picks the class and API key automatically.",
      },
    },
    {
      prompt: {
        pl: "Co robi FallbackModel?",
        en: "What does FallbackModel do?",
      },
      options: [
        {
          text: {
            pl: "Próbuje kolejnego modelu, gdy poprzedni zwróci błąd",
            en: "Tries the next model when the previous one returns an error",
          },
        },
        {
          text: {
            pl: "Uśrednia odpowiedzi wszystkich podanych modeli",
            en: "Averages the replies from all given models",
          },
        },
        {
          text: {
            pl: "Łapie błędy walidacji w Twoim kodzie",
            en: "Catches validation errors in your own code",
          },
        },
        {
          text: {
            pl: "Tłumaczy odpowiedź na inny język",
            en: "Translates the reply into another language",
          },
        },
      ],
      answer: 0,
      explanation: {
        pl: "Modele próbowane są od lewej do prawej; wygrywa pierwsza udana odpowiedź. To nie ratuje przed błędami w Twoim kodzie.",
        en: "Models are tried left to right; the first successful reply wins. It does not rescue you from bugs in your own code.",
      },
    },
    {
      prompt: {
        pl: "Które dwa ustawienia z ModelSettings stosuje się najczęściej?",
        en: "Which two ModelSettings are used most often?",
      },
      options: [
        {
          text: {
            pl: "temperature i max_tokens",
            en: "temperature and max_tokens",
          },
        },
        {
          text: {
            pl: "base_url i api_key",
            en: "base_url and api_key",
          },
        },
        {
          text: {
            pl: "deps_type i output_type",
            en: "deps_type and output_type",
          },
        },
        {
          text: {
            pl: "instructions i system_prompt",
            en: "instructions and system_prompt",
          },
        },
      ],
      answer: 0,
      explanation: {
        pl: "temperature steruje przewidywalnością, a max_tokens ogranicza długość odpowiedzi. Ustawienia z run_sync mają pierwszeństwo przed tymi z konstruktora.",
        en: "temperature controls predictability and max_tokens bounds the reply length. Settings from run_sync take priority over those from the constructor.",
      },
    },
    {
      prompt: {
        pl: "Jak podłączysz Ollama Cloud, które wystawia API zgodne z OpenAI?",
        en: "How do you connect Ollama Cloud, which exposes an OpenAI-compatible API?",
      },
      options: [
        {
          text: {
            pl: "OpenAIChatModel z OpenAIProvider(base_url='https://ollama.com/v1', api_key=...)",
            en: "OpenAIChatModel with OpenAIProvider(base_url='https://ollama.com/v1', api_key=...)",
          },
        },
        {
          text: {
            pl: "Stringiem ollama:gpt-oss bez żadnej dodatkowej konfiguracji",
            en: "The string ollama:gpt-oss with no extra configuration",
          },
        },
        {
          text: {
            pl: "Przez AnthropicModel z innym kluczem",
            en: "Through AnthropicModel with a different key",
          },
        },
        {
          text: {
            pl: "FallbackModel ustawia base_url samodzielnie",
            en: "FallbackModel sets the base_url on its own",
          },
        },
      ],
      answer: 0,
      explanation: {
        pl: "Dla każdego endpointu zgodnego z OpenAI używasz OpenAIChatModel z jawnie skonfigurowanym OpenAIProvider, podając base_url i api_key.",
        en: "For any OpenAI-compatible endpoint you use OpenAIChatModel with an explicitly configured OpenAIProvider, passing a base_url and api_key.",
      },
    },
  ],
};
