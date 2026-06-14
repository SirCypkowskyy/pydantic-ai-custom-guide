import type { ChapterQuiz } from "@/content/quiz-types";

export const quiz: ChapterQuiz = {
  questions: [
    {
      prompt: {
        pl: "Co dzieje się z result.output, gdy podasz output_type jako model Pydantic?",
        en: "What happens to result.output when you pass a Pydantic model as output_type?",
      },
      options: [
        {
          text: {
            pl: "Staje się otypowaną instancją tego modelu zamiast zwykłego tekstu",
            en: "It becomes a typed instance of that model instead of plain text",
          },
        },
        {
          text: {
            pl: "Nadal jest stringiem, który trzeba ręcznie sparsować",
            en: "It is still a string you must parse by hand",
          },
        },
        {
          text: {
            pl: "Zwraca słownik bez żadnej walidacji",
            en: "It returns a dict with no validation at all",
          },
        },
        {
          text: {
            pl: "Zgłasza wyjątek, bo agenty zwracają tylko tekst",
            en: "It raises an exception, because agents only return text",
          },
        },
      ],
      answer: 0,
      explanation: {
        pl: "Schemat JSON modelu steruje odpowiedzią, a ta sama definicja waliduje wynik i daje otypowany obiekt.",
        en: "The model's JSON schema drives the response, and the same definition validates the result into a typed object.",
      },
    },
    {
      prompt: {
        pl: "Kiedy w output validatorze warto podnieść ModelRetry?",
        en: "When should you raise ModelRetry inside an output validator?",
      },
      options: [
        {
          text: {
            pl: "Gdy błąd da się naprawić, np. zła nazwa albo wartość spoza zakresu",
            en: "When the error is fixable, e.g. a wrong name or an out-of-range value",
          },
        },
        {
          text: {
            pl: "Przy każdej awarii, w tym przy padzie bazy danych",
            en: "On any failure, including a database outage",
          },
        },
        {
          text: {
            pl: "Tylko gdy chcesz całkiem zatrzymać uruchomienie",
            en: "Only when you want to stop the run entirely",
          },
        },
        {
          text: {
            pl: "Nigdy, bo validator nie może wpływać na model",
            en: "Never, because a validator cannot influence the model",
          },
        },
      ],
      answer: 0,
      explanation: {
        pl: "ModelRetry odsyła komunikat do modelu, więc ma sens tylko przy błędach, które model potrafi poprawić.",
        en: "ModelRetry sends the message back to the model, so it only helps for errors the model can correct.",
      },
    },
    {
      prompt: {
        pl: "Czym różni się tryb NativeOutput od PromptedOutput?",
        en: "How does NativeOutput differ from PromptedOutput?",
      },
      options: [
        {
          text: {
            pl: "NativeOutput używa natywnego structured output dostawcy, PromptedOutput wstrzykuje schemat do promptu",
            en: "NativeOutput uses the provider's native structured output, PromptedOutput injects the schema into the prompt",
          },
        },
        {
          text: {
            pl: "NativeOutput działa tylko offline, PromptedOutput tylko online",
            en: "NativeOutput works only offline, PromptedOutput only online",
          },
        },
        {
          text: {
            pl: "Oba zmieniają typ wyniku na string",
            en: "Both change the output type to a string",
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
        pl: "Marker zmienia tylko mechanizm wymuszania struktury, a nie sam typ wyniku.",
        en: "The marker changes only the mechanism for enforcing structure, not the output type itself.",
      },
    },
    {
      prompt: {
        pl: "Co możesz przekazać do output_type, gdy agent może zwrócić jedną z kilku odpowiedzi?",
        en: "What can you pass to output_type when an agent might return one of several answers?",
      },
      options: [
        {
          text: {
            pl: "Listę typów lub unię, np. [Sukces, Blad]",
            en: "A list of types or a union, e.g. [Success, Failure]",
          },
        },
        {
          text: {
            pl: "Tylko jeden model, inaczej agent się nie uruchomi",
            en: "Only a single model, otherwise the agent will not run",
          },
        },
        {
          text: {
            pl: "Surowy schemat JSON jako string",
            en: "A raw JSON schema as a string",
          },
        },
        {
          text: {
            pl: "Wyłącznie typ str, bo unie nie są wspierane",
            en: "Only the str type, because unions are not supported",
          },
        },
      ],
      answer: 0,
      explanation: {
        pl: "Model sam wybiera pasujący wariant, a ty rozróżniasz wynik przez isinstance.",
        en: "The model picks the matching variant, and you tell the result apart with isinstance.",
      },
    },
  ],
};
