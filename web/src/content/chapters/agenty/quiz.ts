import type { ChapterQuiz } from "@/content/quiz-types";

export const quiz: ChapterQuiz = {
  questions: [
    {
      prompt: {
        pl: "Czym jest obiekt Agent w Pydantic AI?",
        en: "What is the Agent object in Pydantic AI?",
      },
      options: [
        {
          text: {
            pl: "Pojedynczy obiekt spinający model, instrukcje, narzędzia i typ wyniku",
            en: "A single object that ties a model, instructions, tools, and an output type together",
          },
        },
        {
          text: {
            pl: "Funkcja, którą trzeba tworzyć od nowa przy każdym zapytaniu",
            en: "A function you must recreate for every request",
          },
        },
        {
          text: {
            pl: "Wyłącznie klient HTTP do API modelu",
            en: "Only an HTTP client for the model API",
          },
        },
        {
          text: { pl: "Baza danych na historię rozmów", en: "A database for conversation history" },
        },
      ],
      answer: 0,
      explanation: {
        pl: "Agent zwykle tworzysz raz, jako stałą na poziomie modułu, i używasz przez całe życie programu.",
        en: "You usually create an Agent once, as a module-level constant, and use it for the lifetime of the program.",
      },
    },
    {
      prompt: {
        pl: "Której metody użyjesz w zwykłym synchronicznym skrypcie?",
        en: "Which method would you use in a plain synchronous script?",
      },
      options: [
        { text: { pl: "run_sync()", en: "run_sync()" } },
        { text: { pl: "run()", en: "run()" } },
        { text: { pl: "run_stream()", en: "run_stream()" } },
        { text: { pl: "run_stream_events()", en: "run_stream_events()" } },
      ],
      answer: 0,
      explanation: {
        pl: "run_sync() zwraca gotowy wynik bez potrzeby pętli zdarzeń asyncio.",
        en: "run_sync() returns a finished result without needing an asyncio event loop.",
      },
    },
    {
      prompt: {
        pl: "Czym instructions różnią się od system_prompt?",
        en: "How do instructions differ from a system prompt?",
      },
      options: [
        {
          text: {
            pl: "Instructions nie trafiają do historii wiadomości przekazywanej między uruchomieniami",
            en: "Instructions are not added to the message history passed between runs",
          },
        },
        {
          text: {
            pl: "Instructions działają tylko z modelami OpenAI",
            en: "Instructions work only with OpenAI models",
          },
        },
        {
          text: { pl: "system_prompt jest szybszy", en: "A system prompt is faster" },
        },
        {
          text: {
            pl: "Nie ma między nimi żadnej różnicy",
            en: "There is no difference between them",
          },
        },
      ],
      answer: 0,
      explanation: {
        pl: "Dlatego instructions to domyślny i zalecany wybór w rozmowach wieloturowych.",
        en: "That is why instructions are the default and recommended choice for multi-turn conversations.",
      },
    },
    {
      prompt: {
        pl: "Do czego służy RunContext w dynamicznych instrukcjach i narzędziach?",
        en: "What is RunContext used for in dynamic instructions and tools?",
      },
      options: [
        {
          text: {
            pl: "Daje dostęp do zależności przez ctx.deps i danych o uruchomieniu",
            en: "It gives access to dependencies through ctx.deps and run information",
          },
        },
        {
          text: {
            pl: "Kompiluje model do kodu maszynowego",
            en: "It compiles the model to machine code",
          },
        },
        {
          text: { pl: "Zastępuje instrukcje agenta", en: "It replaces the agent's instructions" },
        },
        { text: { pl: "Przechowuje klucz API", en: "It stores the API key" } },
      ],
      answer: 0,
      explanation: {
        pl: "Przez ctx.deps wstrzykujesz typowane zależności, co czyni agenty testowalnymi.",
        en: "Through ctx.deps you inject typed dependencies, which makes agents testable.",
      },
    },
  ],
};
