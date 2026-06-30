import { useState } from "react";

let nextId = 0;

type Todo = {
  id: number;
  name: string;
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

export default function TodoList() {
  const [todos, setTodos] = useState(INITIAL_TODOS);
  const [newTodo, setNewTodo] = useState("");

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    setTodos((prev) => [
      ...prev,
      {
        id: nextId++,
        name: newTodo,
      },
    ]);

    setNewTodo("");
  };

  const handleDeleteTask = (todoId: number) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== todoId));
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
