import type { ChapterQuiz } from "@/content/quiz-types";

export const quiz: ChapterQuiz = {
  questions: [
    {
      prompt: {
        pl: "Na czym polega delegacja agentów?",
        en: "What does agent delegation mean?",
      },
      options: [
        {
          text: {
            pl: "Agent w trakcie działania wywołuje narzędzie, które uruchamia drugiego agenta",
            en: "An agent, mid-run, calls a tool that runs a second agent",
          },
        },
        {
          text: {
            pl: "Dwa agenty dzielą się tym samym kluczem API",
            en: "Two agents share the same API key",
          },
        },
        {
          text: {
            pl: "Agent kopiuje swoje instrukcje do innego agenta",
            en: "An agent copies its instructions into another agent",
          },
        },
        {
          text: {
            pl: "Model sam tworzy nowego agenta w czasie generowania",
            en: "The model creates a new agent during generation on its own",
          },
        },
      ],
      answer: 0,
      explanation: {
        pl: "Agent nadrzędny przez narzędzie uruchamia agenta podrzędnego, a wynik składa w ostateczną odpowiedź.",
        en: "The parent agent runs a delegate agent through a tool and folds the result into a final answer.",
      },
    },
    {
      prompt: {
        pl: "Dlaczego do agenta podrzędnego przekazujesz usage=ctx.usage?",
        en: "Why do you pass usage=ctx.usage to the delegate agent?",
      },
      options: [
        {
          text: {
            pl: "Aby zużycie tokenów liczyło się wspólnie i limity obejmowały całe drzewo wywołań",
            en: "So token usage is counted together and limits cover the whole call tree",
          },
        },
        {
          text: {
            pl: "Aby agent podrzędny używał tego samego modelu",
            en: "So the delegate agent uses the same model",
          },
        },
        {
          text: {
            pl: "Aby przyspieszyć odpowiedź modelu",
            en: "To make the model respond faster",
          },
        },
        {
          text: {
            pl: "Jest to wymagane, inaczej agent się nie uruchomi",
            en: "It is required, otherwise the agent will not run",
          },
        },
      ],
      answer: 0,
      explanation: {
        pl: "UsageLimits działa na całe drzewo, więc bez przekazania usage zliczanie tokenów byłoby niekompletne.",
        en: "UsageLimits applies across the whole tree, so without passing usage the token accounting would be incomplete.",
      },
    },
    {
      prompt: {
        pl: "Co zwraca metoda run węzła w pydantic_graph, aby zatrzymać graf?",
        en: "What does a node's run method return in pydantic_graph to stop the graph?",
      },
      options: [
        {
          text: { pl: "Obiekt End", en: "An End object" },
        },
        {
          text: { pl: "Wartość None", en: "The value None" },
        },
        {
          text: { pl: "Wyjątek StopGraph", en: "A StopGraph exception" },
        },
        {
          text: { pl: "Pusty słownik", en: "An empty dictionary" },
        },
      ],
      answer: 0,
      explanation: {
        pl: "Run zwraca albo następny węzeł, aby kontynuować, albo End, aby zakończyć graf wynikiem.",
        en: "run returns either the next node to continue, or End to finish the graph with a result.",
      },
    },
    {
      prompt: {
        pl: "Co daje trwałe wykonanie (durable execution)?",
        en: "What does durable execution give you?",
      },
      options: [
        {
          text: {
            pl: "Po awarii przepływ wznawia się od ostatniego ukończonego kroku, nie od zera",
            en: "After a failure the flow resumes from the last completed step, not from scratch",
          },
        },
        {
          text: {
            pl: "Trwale buforuje odpowiedzi modelu, by nie wołać API ponownie",
            en: "It permanently caches model replies so the API is never called again",
          },
        },
        {
          text: {
            pl: "Szyfruje stan grafu na dysku",
            en: "It encrypts the graph state on disk",
          },
        },
        {
          text: {
            pl: "Uruchamia wszystkie węzły grafu równolegle",
            en: "It runs all graph nodes in parallel",
          },
        },
      ],
      answer: 0,
      explanation: {
        pl: "Silniki takie jak DBOS i Temporal zapisują każdy krok, więc przepływ można wznowić po awarii.",
        en: "Engines like DBOS and Temporal record each step, so the flow can resume after a crash.",
      },
    },
  ],
};
