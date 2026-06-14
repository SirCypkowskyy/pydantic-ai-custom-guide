import type { ChapterQuiz } from "@/content/quiz-types";

export const quiz: ChapterQuiz = {
  questions: [
    {
      prompt: {
        pl: "Czym różni się all_messages() od new_messages()?",
        en: "How does all_messages() differ from new_messages()?",
      },
      options: [
        {
          text: {
            pl: "all_messages() zwraca całą historię, a new_messages() tylko wiadomości z bieżącego uruchomienia",
            en: "all_messages() returns the entire history, while new_messages() returns only messages from the current run",
          },
        },
        {
          text: {
            pl: "all_messages() działa tylko asynchronicznie",
            en: "all_messages() works only asynchronously",
          },
        },
        {
          text: {
            pl: "new_messages() zwraca wyłącznie tekst odpowiedzi",
            en: "new_messages() returns only the response text",
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
        pl: "all_messages() obejmuje też wiadomości przekazane na wejściu, a new_messages() tylko te powstałe w tym uruchomieniu.",
        en: "all_messages() includes messages passed in as input, while new_messages() holds only those produced in this run.",
      },
    },
    {
      prompt: {
        pl: "Jak sprawić, żeby agent pamiętał poprzednią turę rozmowy?",
        en: "How do you make an agent remember a previous turn of the conversation?",
      },
      options: [
        {
          text: {
            pl: "Przekazać poprzednie wiadomości parametrem message_history",
            en: "Pass the previous messages through the message_history parameter",
          },
        },
        {
          text: {
            pl: "Agent zapamiętuje wszystko automatycznie między uruchomieniami",
            en: "The agent remembers everything automatically between runs",
          },
        },
        {
          text: {
            pl: "Wkleić poprzednią odpowiedź do instructions",
            en: "Paste the previous answer into instructions",
          },
        },
        {
          text: {
            pl: "Użyć osobnego agenta dla każdej tury",
            en: "Use a separate agent for each turn",
          },
        },
      ],
      answer: 0,
      explanation: {
        pl: "Agent jest bezstanowy. Pamięć to lista wiadomości podana w message_history.",
        en: "The agent is stateless. Memory is the list of messages passed in message_history.",
      },
    },
    {
      prompt: {
        pl: "Które części należą zwykle do ModelResponse?",
        en: "Which parts typically belong to a ModelResponse?",
      },
      options: [
        {
          text: {
            pl: "TextPart i ToolCallPart",
            en: "TextPart and ToolCallPart",
          },
        },
        {
          text: {
            pl: "UserPromptPart i SystemPromptPart",
            en: "UserPromptPart and SystemPromptPart",
          },
        },
        {
          text: {
            pl: "Wyłącznie klucz API",
            en: "Only the API key",
          },
        },
        {
          text: {
            pl: "ModelResponse nie ma części",
            en: "A ModelResponse has no parts",
          },
        },
      ],
      answer: 0,
      explanation: {
        pl: "ModelResponse to wiadomość od modelu, więc niesie tekst (TextPart) i ewentualne wywołania narzędzi (ToolCallPart).",
        en: "A ModelResponse is the message from the model, so it carries text (TextPart) and any tool calls (ToolCallPart).",
      },
    },
    {
      prompt: {
        pl: "Czego użyjesz, aby zapisać historię do JSON i odtworzyć ją później?",
        en: "What do you use to serialise the history to JSON and restore it later?",
      },
      options: [
        {
          text: {
            pl: "to_jsonable_python do zapisu i ModelMessagesTypeAdapter.validate_python do odczytu",
            en: "to_jsonable_python to write and ModelMessagesTypeAdapter.validate_python to read",
          },
        },
        {
          text: {
            pl: "str() na liście wiadomości",
            en: "str() on the list of messages",
          },
        },
        {
          text: {
            pl: "pickle, bo wiadomości nie da się zserializować inaczej",
            en: "pickle, because messages cannot be serialised any other way",
          },
        },
        {
          text: {
            pl: "Historię trzeba przepisać ręcznie, nie da się jej zapisać",
            en: "History must be retyped by hand; it cannot be saved",
          },
        },
      ],
      answer: 0,
      explanation: {
        pl: "to_jsonable_python rozkłada wiadomości na obiekty gotowe dla json.dumps, a ModelMessagesTypeAdapter waliduje je z powrotem do ModelMessage.",
        en: "to_jsonable_python breaks messages into objects ready for json.dumps, and ModelMessagesTypeAdapter validates them back into ModelMessage objects.",
      },
    },
  ],
};
