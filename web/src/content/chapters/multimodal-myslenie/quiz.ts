import type { ChapterQuiz } from "@/content/quiz-types";

export const quiz: ChapterQuiz = {
  questions: [
    {
      prompt: {
        pl: "Jak przekazać do uruchomienia obraz razem z tekstem?",
        en: "How do you pass an image together with text into a run?",
      },
      options: [
        {
          text: {
            pl: "Przekazując listę, która miesza tekst i obiekt treści, np. ImageUrl",
            en: "By passing a list that mixes text and a content object such as ImageUrl",
          },
        },
        {
          text: {
            pl: "Wklejając adres obrazu do stringa instrukcji",
            en: "By pasting the image URL into the instructions string",
          },
        },
        {
          text: {
            pl: "Obrazy trzeba wysyłać osobnym uruchomieniem niż tekst",
            en: "Images must be sent in a separate run from the text",
          },
        },
        {
          text: {
            pl: "Przez parametr deps agenta",
            en: "Through the agent's deps parameter",
          },
        },
      ],
      answer: 0,
      explanation: {
        pl: "Zamiast pojedynczego stringa przekazujesz listę elementów, którą model odbiera jako jedno zapytanie użytkownika.",
        en: "Instead of a single string you pass a list of items, which the model receives as one user prompt.",
      },
    },
    {
      prompt: {
        pl: "Czym różni się typ ...Url od BinaryContent?",
        en: "How does a ...Url type differ from BinaryContent?",
      },
      options: [
        {
          text: {
            pl: "Przy ...Url Pydantic AI domyślnie wysyła adres, a BinaryContent zawsze wysyła surowe bajty z pamięci",
            en: "With a ...Url, Pydantic AI sends the address by default, while BinaryContent always sends raw bytes from memory",
          },
        },
        {
          text: {
            pl: "BinaryContent działa tylko z obrazami",
            en: "BinaryContent works only with images",
          },
        },
        {
          text: {
            pl: "...Url jest szybszy, bo nie używa typu MIME",
            en: "...Url is faster because it does not use a MIME type",
          },
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
        pl: "Przy typie URL plik pobiera zwykle dostawca po swojej stronie; BinaryContent przenosi dane, które masz lokalnie.",
        en: "With a URL type the provider usually downloads the file on its side; BinaryContent carries the data you hold locally.",
      },
    },
    {
      prompt: {
        pl: "Który zestaw poziomów przyjmuje pole effort w Thinking?",
        en: "Which set of levels does the effort field on Thinking accept?",
      },
      options: [
        {
          text: {
            pl: "minimal, low, medium, high, xhigh (oraz True/False)",
            en: "minimal, low, medium, high, xhigh (plus True/False)",
          },
        },
        {
          text: {
            pl: "fast, normal, slow",
            en: "fast, normal, slow",
          },
        },
        {
          text: {
            pl: "od 1 do 10",
            en: "1 through 10",
          },
        },
        {
          text: {
            pl: "Tylko on i off",
            en: "Only on and off",
          },
        },
      ],
      answer: 0,
      explanation: {
        pl: "Niewspierane poziomy są mapowane na najbliższą dostępną wartość u danego dostawcy.",
        en: "Unsupported levels are mapped to the closest available value for the given provider.",
      },
    },
    {
      prompt: {
        pl: "Jak odczytać rozumowanie modelu z odpowiedzi?",
        en: "How do you read the model's reasoning from the response?",
      },
      options: [
        {
          text: {
            pl: "Szukając obiektów ThinkingPart wśród części wiadomości z uruchomienia",
            en: "By looking for ThinkingPart objects among the message parts of the run",
          },
        },
        {
          text: {
            pl: "Rozumowanie jest zawsze doklejone do result.output",
            en: "Reasoning is always appended to result.output",
          },
        },
        {
          text: {
            pl: "Trzeba ponownie uruchomić agenta z flagą debug",
            en: "You must rerun the agent with a debug flag",
          },
        },
        {
          text: {
            pl: "Rozumowanie nigdy nie jest dostępne dla kodu",
            en: "Reasoning is never available to your code",
          },
        },
      ],
      answer: 0,
      explanation: {
        pl: "Rozumowanie wraca jako osobne części ThinkingPart, oddzielone od finalnego tekstu; u niektórych dostawców surowa treść jest w provider_details.",
        en: "Reasoning comes back as separate ThinkingPart parts, distinct from the final text; for some providers the raw content sits in provider_details.",
      },
    },
  ],
};
