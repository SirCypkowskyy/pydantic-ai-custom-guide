import type { ChapterQuiz } from "@/content/quiz-types";

export const quiz: ChapterQuiz = {
  questions: [
    {
      prompt: {
        pl: "Czym BaseSettings różni się od zwykłego modelu Pydantic?",
        en: "How does BaseSettings differ from a plain Pydantic model?",
      },
      options: [
        {
          text: {
            pl: "Automatycznie czyta wartości pól ze zmiennych środowiskowych, pliku .env i katalogu sekretów",
            en: "It automatically reads field values from environment variables, the .env file, and a secrets directory",
          },
        },
        {
          text: {
            pl: "Szyfruje wszystkie pola w pamięci",
            en: "It encrypts all fields in memory",
          },
        },
        {
          text: {
            pl: "Działa tylko z bazami danych",
            en: "It works only with databases",
          },
        },
        {
          text: {
            pl: "Nie waliduje typów pól",
            en: "It does not validate field types",
          },
        },
      ],
      answer: 0,
      explanation: {
        pl: "BaseSettings traktuje środowisko uruchomieniowe jako kolejne źródło danych i składa z nich zwalidowany obiekt.",
        en: "BaseSettings treats the runtime environment as another data source and assembles a validated object from it.",
      },
    },
    {
      prompt: {
        pl: "Które źródło ma najwyższy priorytet przy tworzeniu Settings?",
        en: "Which source has the highest priority when creating Settings?",
      },
      options: [
        {
          text: {
            pl: "Argumenty przekazane wprost do konstruktora",
            en: "Arguments passed straight to the constructor",
          },
        },
        { text: { pl: "Plik .env", en: "The .env file" } },
        { text: { pl: "Wartości domyślne pól", en: "Field defaults" } },
        { text: { pl: "Katalog sekretów", en: "The secrets directory" } },
      ],
      answer: 0,
      explanation: {
        pl: "Wcześniejsze źródło wygrywa: argument konstruktora nadpisuje zmienną środowiskową, ta nadpisuje .env, a na końcu są wartości domyślne.",
        en: "An earlier source wins: a constructor argument overrides an environment variable, which overrides .env, with defaults last.",
      },
    },
    {
      prompt: {
        pl: "Po której klasie powinien dziedziczyć model zagnieżdżony, na przykład DatabaseSettings?",
        en: "Which class should a nested model such as DatabaseSettings inherit from?",
      },
      options: [
        {
          text: {
            pl: "BaseModel, bo środowisko czyta za niego klasa nadrzędna przez env_nested_delimiter",
            en: "BaseModel, because the parent class reads the environment for it via env_nested_delimiter",
          },
        },
        {
          text: {
            pl: "BaseSettings, żeby samodzielnie czytał środowisko",
            en: "BaseSettings, so it reads the environment on its own",
          },
        },
        { text: { pl: "dict, dla wygody", en: "dict, for convenience" } },
        {
          text: {
            pl: "Nie może być zagnieżdżony w ogóle",
            en: "It cannot be nested at all",
          },
        },
      ],
      answer: 0,
      explanation: {
        pl: "Model zagnieżdżony dziedziczy po BaseModel, a klasa nadrzędna mapuje na niego zmienne typu DATABASE__HOST przez delimiter.",
        en: "A nested model inherits from BaseModel, and the parent maps variables like DATABASE__HOST onto it through the delimiter.",
      },
    },
    {
      prompt: {
        pl: "Jak bezpiecznie odczytać prawdziwą wartość pola typu SecretStr?",
        en: "How do you safely read the real value of a SecretStr field?",
      },
      options: [
        {
          text: {
            pl: "Wywołać get_secret_value() tam, gdzie wartość jest naprawdę potrzebna",
            en: "Call get_secret_value() where the value is actually needed",
          },
        },
        {
          text: {
            pl: "Wypisać pole przez print, które pokazuje pełny sekret",
            en: "Print the field, which shows the full secret",
          },
        },
        {
          text: {
            pl: "Rzutować je na int",
            en: "Cast it to int",
          },
        },
        {
          text: {
            pl: "SecretStr nigdy nie pozwala odczytać wartości",
            en: "SecretStr never lets you read the value",
          },
        },
      ],
      answer: 0,
      explanation: {
        pl: "Reprezentacja SecretStr to gwiazdki, co chroni przed wyciekiem w logach. Prawdziwą wartość odsłaniasz świadomie metodą get_secret_value().",
        en: "SecretStr renders as asterisks, which guards against leaks in logs. You reveal the real value deliberately with get_secret_value().",
      },
    },
  ],
};
