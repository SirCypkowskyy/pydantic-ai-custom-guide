import type { ChapterQuiz } from "@/content/quiz-types";

export const quiz: ChapterQuiz = {
  questions: [
    {
      prompt: {
        pl: "Dlaczego run_stream() używasz w bloku async with?",
        en: "Why do you use run_stream() inside an async with block?",
      },
      options: [
        {
          text: {
            pl: "Połączenie z modelem jest otwarte tylko w bloku, a po wyjściu wynik jest finalizowany",
            en: "The connection to the model stays open only inside the block, and the result is finalized on exit",
          },
        },
        {
          text: {
            pl: "Bez tego agent użyje modelu synchronicznego",
            en: "Without it the agent would use a synchronous model",
          },
        },
        {
          text: {
            pl: "async with jest wymagany przez każdą metodę agenta",
            en: "async with is required by every agent method",
          },
        },
        {
          text: {
            pl: "To jedyny sposób przekazania instructions",
            en: "It is the only way to pass instructions",
          },
        },
      ],
      answer: 0,
      explanation: {
        pl: "Strumień żyje tylko w bloku; po wyjściu request zostaje domknięty, więc obiektu response nie wynosi się na zewnątrz.",
        en: "The stream lives only inside the block; on exit the request is closed, so you do not carry the response object out.",
      },
    },
    {
      prompt: {
        pl: "Co domyślnie zwraca kolejny fragment z stream_text()?",
        en: "What does each fragment from stream_text() return by default?",
      },
      options: [
        {
          text: {
            pl: "Cały dotychczasowy tekst, narastająco",
            en: "The whole accumulated text so far",
          },
        },
        {
          text: {
            pl: "Tylko nowe znaki od ostatniego fragmentu",
            en: "Only the new characters since the last fragment",
          },
        },
        {
          text: { pl: "Pojedynczy token jako liczbę", en: "A single token as a number" },
        },
        {
          text: { pl: "Gotowy model Pydantic", en: "A finished Pydantic model" },
        },
      ],
      answer: 0,
      explanation: {
        pl: "Domyślnie fragment to cały tekst do tej pory; po same przyrosty sięgasz przez stream_text(delta=True).",
        en: "By default a fragment is the full text so far; for raw increments use stream_text(delta=True).",
      },
    },
    {
      prompt: {
        pl: "Na czym polega walidacja częściowa przy strumieniowaniu ustrukturyzowanego wyniku?",
        en: "What does partial validation do when streaming structured output?",
      },
      options: [
        {
          text: {
            pl: "Toleruje brakujące pola podczas strumienia, a pełną walidację robi na końcu",
            en: "It tolerates missing fields during the stream and runs full validation at the end",
          },
        },
        {
          text: {
            pl: "Trwale wyłącza walidację dla całego agenta",
            en: "It permanently disables validation for the whole agent",
          },
        },
        {
          text: {
            pl: "Sprawdza tylko typ pierwszego pola",
            en: "It checks only the type of the first field",
          },
        },
        {
          text: {
            pl: "Zamienia wynik na zwykły tekst",
            en: "It converts the output to plain text",
          },
        },
      ],
      answer: 0,
      explanation: {
        pl: "Pośrednie obiekty mogą być niepełne, ale ostateczny wynik przechodzi pełną walidację.",
        en: "Intermediate objects may be incomplete, but the final result still goes through full validation.",
      },
    },
    {
      prompt: {
        pl: "Po co służy flaga ctx.partial_output?",
        en: "What is the ctx.partial_output flag for?",
      },
      options: [
        {
          text: {
            pl: "By pomijać efekty uboczne dla wersji pośrednich i wykonać je tylko dla wyniku końcowego",
            en: "To skip side effects for intermediate versions and run them only for the final result",
          },
        },
        {
          text: {
            pl: "By wymusić tryb synchroniczny",
            en: "To force synchronous mode",
          },
        },
        {
          text: {
            pl: "By policzyć liczbę tokenów wejściowych",
            en: "To count the number of input tokens",
          },
        },
        {
          text: {
            pl: "By wybrać model dostawcy",
            en: "To pick the provider model",
          },
        },
      ],
      answer: 0,
      explanation: {
        pl: "Walidator i funkcja wyjścia są wołane wielokrotnie; partial_output jest True dla wersji pośrednich i False dla ostatecznej.",
        en: "The validator and output function run many times; partial_output is True for intermediate versions and False for the final one.",
      },
    },
  ],
};
