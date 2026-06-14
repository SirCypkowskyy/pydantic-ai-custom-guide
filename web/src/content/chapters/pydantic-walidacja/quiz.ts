import type { ChapterQuiz } from "@/content/quiz-types";

export const quiz: ChapterQuiz = {
  questions: [
    {
      prompt: {
        pl: "Co generuje Pydantic z deklaracji pól BaseModel?",
        en: "What does Pydantic generate from BaseModel field declarations?",
      },
      options: [
        {
          text: {
            pl: "Realny walidator i serializer, które sprawdzają dane przy każdej instancji",
            en: "A real validator and serializer that check data on every instance",
          },
        },
        {
          text: {
            pl: "Wyłącznie podpowiedzi typów dla edytora, bez sprawdzania w czasie działania",
            en: "Only editor type hints, with no runtime checking",
          },
        },
        {
          text: {
            pl: "Klienta HTTP do wysyłania danych do API",
            en: "An HTTP client for sending data to an API",
          },
        },
        {
          text: { pl: "Migrację bazy danych", en: "A database migration" },
        },
      ],
      answer: 0,
      explanation: {
        pl: "Z adnotacji Pydantic buduje walidator w Rust, który koercjonuje dane lub zgłasza ValidationError.",
        en: "From the annotations Pydantic builds a Rust validator that coerces data or raises ValidationError.",
      },
    },
    {
      prompt: {
        pl: "Jaki wyjątek należy zgłosić wewnątrz field_validator, gdy dane są błędne?",
        en: "Which exception should you raise inside a field_validator when data is invalid?",
      },
      options: [
        { text: { pl: "ValueError", en: "ValueError" } },
        { text: { pl: "ValidationError", en: "ValidationError" } },
        { text: { pl: "TypeError", en: "TypeError" } },
        { text: { pl: "RuntimeError", en: "RuntimeError" } },
      ],
      answer: 0,
      explanation: {
        pl: "Pydantic sam zamienia ValueError na ValidationError z poprawną ścieżką pola.",
        en: "Pydantic converts a ValueError into a ValidationError with the correct field path for you.",
      },
    },
    {
      prompt: {
        pl: "Kiedy użyjesz model_validator zamiast field_validator?",
        en: "When would you use a model_validator instead of a field_validator?",
      },
      options: [
        {
          text: {
            pl: "Gdy reguła zależy od kilku pól naraz",
            en: "When a rule depends on several fields at once",
          },
        },
        {
          text: {
            pl: "Gdy chcesz przyspieszyć serializację",
            en: "When you want to speed up serialization",
          },
        },
        {
          text: {
            pl: "Gdy pole nie ma adnotacji typu",
            en: "When a field has no type annotation",
          },
        },
        {
          text: {
            pl: "Gdy chcesz wyłączyć walidację",
            en: "When you want to disable validation",
          },
        },
      ],
      answer: 0,
      explanation: {
        pl: "model_validator w trybie after dostaje całą zwalidowaną instancję, więc widzi wszystkie pola.",
        en: "An after-mode model_validator receives the whole validated instance, so it sees every field.",
      },
    },
    {
      prompt: {
        pl: "Do czego służy TypeAdapter?",
        en: "What is TypeAdapter for?",
      },
      options: [
        {
          text: {
            pl: "Do walidacji i serializacji dowolnej adnotacji typu bez tworzenia BaseModel",
            en: "To validate and serialize any type annotation without defining a BaseModel",
          },
        },
        {
          text: {
            pl: "Do konwersji modeli Pydantic na klasy SQLAlchemy",
            en: "To convert Pydantic models into SQLAlchemy classes",
          },
        },
        {
          text: {
            pl: "Do automatycznego wywoływania modelu językowego",
            en: "To automatically call a language model",
          },
        },
        {
          text: {
            pl: "Do zarządzania połączeniem z bazą danych",
            en: "To manage a database connection",
          },
        },
      ],
      answer: 0,
      explanation: {
        pl: "TypeAdapter daje validate_python, validate_json i dump_json dla typów takich jak list[int] czy TypedDict.",
        en: "TypeAdapter gives you validate_python, validate_json, and dump_json for types like list[int] or a TypedDict.",
      },
    },
  ],
};
