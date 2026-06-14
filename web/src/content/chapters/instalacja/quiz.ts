import type { ChapterQuiz } from "@/content/quiz-types";

export const quiz: ChapterQuiz = {
  questions: [
    {
      prompt: {
        pl: "Które polecenie dodaje Pydantic AI do projektu zarządzanego przez uv?",
        en: "Which command adds Pydantic AI to a uv-managed project?",
      },
      options: [
        { text: { pl: "uv add pydantic-ai", en: "uv add pydantic-ai" } },
        { text: { pl: "uv run pydantic-ai", en: "uv run pydantic-ai" } },
        { text: { pl: "pydantic-ai install", en: "pydantic-ai install" } },
        { text: { pl: "uv get pydantic-ai", en: "uv get pydantic-ai" } },
      ],
      answer: 0,
      explanation: {
        pl: "uv add zapisuje zależność w pyproject.toml i instaluje ją w izolowanym środowisku projektu.",
        en: "uv add records the dependency in pyproject.toml and installs it into the project's isolated environment.",
      },
    },
    {
      prompt: {
        pl: "Co oznacza część przed dwukropkiem w identyfikatorze openai:gpt-5.2?",
        en: "What does the part before the colon in openai:gpt-5.2 mean?",
      },
      options: [
        {
          text: {
            pl: "Dostawcę, czyli usługę udostępniającą model przez API",
            en: "The provider, the service that serves the model over an API",
          },
        },
        {
          text: {
            pl: "Wersję biblioteki pydantic-ai",
            en: "The version of the pydantic-ai library",
          },
        },
        {
          text: { pl: "Nazwę pliku z kluczem API", en: "The name of the file holding the API key" },
        },
        {
          text: { pl: "Region serwera", en: "The server region" },
        },
      ],
      answer: 0,
      explanation: {
        pl: "Na podstawie prefiksu dostawcy Pydantic AI wie, do którego API się odezwać i jakiej zmiennej środowiskowej szukać.",
        en: "From the provider prefix Pydantic AI knows which API to call and which environment variable to look for.",
      },
    },
    {
      prompt: {
        pl: "Z jakiej zmiennej środowiskowej domyślnie czytany jest klucz dla modeli OpenAI?",
        en: "Which environment variable holds the key for OpenAI models by default?",
      },
      options: [
        { text: { pl: "OPENAI_API_KEY", en: "OPENAI_API_KEY" } },
        { text: { pl: "PYDANTIC_AI_KEY", en: "PYDANTIC_AI_KEY" } },
        { text: { pl: "OPENAI_TOKEN", en: "OPENAI_TOKEN" } },
        { text: { pl: "MODEL_SECRET", en: "MODEL_SECRET" } },
      ],
      answer: 0,
      explanation: {
        pl: "Klucz ustawiasz w zmiennej OPENAI_API_KEY w tej samej sesji terminala, w której uruchamiasz skrypt.",
        en: "You set the key in OPENAI_API_KEY in the same terminal session where you run the script.",
      },
    },
    {
      prompt: {
        pl: "Skąd odczytasz tekst odpowiedzi po wywołaniu agent.run_sync(...)?",
        en: "Where do you read the response text after calling agent.run_sync(...)?",
      },
      options: [
        { text: { pl: "result.output", en: "result.output" } },
        { text: { pl: "result.text()", en: "result.text()" } },
        { text: { pl: "result.response.body", en: "result.response.body" } },
        { text: { pl: "result[0]", en: "result[0]" } },
      ],
      answer: 0,
      explanation: {
        pl: "run_sync zwraca obiekt wyniku, a sam tekst odpowiedzi znajdziesz w polu result.output.",
        en: "run_sync returns a result object, and the response text itself is in the result.output field.",
      },
    },
  ],
};
