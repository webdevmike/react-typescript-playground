import { useState, useReducer } from "react";

let nextId = 0;

type Todo = {
  id: number;
  name: string;
};

type ReducerActions =
  | {
      type: "ADD";
      payload: string;
    }
  | {
      type: "DELETE";
      payload: number;
    };

const INITIAL_TODOS = [
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

export default function TodoList() {
  const [todos, dispatch] = useReducer(reducer, INITIAL_TODOS);
  const [newTodo, setNewTodo] = useState("");

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch({ type: "ADD", payload: newTodo });
    setNewTodo("");
  };

  const handleDeleteTask = (todoId: number) => {
    dispatch({ type: "DELETE", payload: todoId });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <span>{todo.name}</span>
            <button type="button" onClick={() => handleDeleteTask(todo.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
