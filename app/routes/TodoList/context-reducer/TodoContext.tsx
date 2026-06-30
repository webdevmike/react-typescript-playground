import { useContext, createContext, useReducer, type ReactNode } from "react";
import { type Todo, type ReducerActions } from "./types";

let nextId = 0;

const INITIAL_TODOS: Todo[] = [
  {
    id: nextId++,
    name: "walk the dog",
  },
  {
    id: nextId++,
    name: "wash the car",
  },
  {
    id: nextId++,
    name: "play with the kids",
  },
];

type TodoActions = {
  addTodo: (newTask: string) => void;
  deleteTodo: (todoId: number) => void;
};

const TodoStateContext = createContext<Todo[] | undefined>(undefined);
const TodoActionsContext = createContext<TodoActions | undefined>(undefined);

export function TodoProvider({ children }: { children: ReactNode }) {
  const [tasks, dispatch] = useReducer(reducer, INITIAL_TODOS);

  const actions: TodoActions = {
    addTodo: (newTask) => {
      dispatch({ type: "ADD", payload: newTask });
    },
    deleteTodo: (todoId) => {
      dispatch({ type: "DELETE", payload: todoId });
    },
  };
  return (
    <TodoStateContext value={tasks}>
      <TodoActionsContext value={actions}>{children}</TodoActionsContext>
    </TodoStateContext>
  );
}

export function useTodoState(): Todo[] {
  const context = useContext(TodoStateContext);
  if (context === undefined) {
    throw new Error("TodoStateContext is undefined");
  }
  return context;
}

export function useTodoActions(): TodoActions {
  const context = useContext(TodoActionsContext);
  if (context === undefined) {
    throw new Error("TodoActionsContext is undefined");
  }
  return context;
}

const reducer = (state: Todo[], actions: ReducerActions): Todo[] => {
  switch (actions.type) {
    case "ADD": {
      return [
        ...state,
        {
          id: nextId++,
          name: actions.payload,
        },
      ];
    }
    case "DELETE": {
      return state.filter((todo) => todo.id !== actions.payload);
    }
  }
};
