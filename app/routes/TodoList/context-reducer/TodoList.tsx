import { useState } from "react";
import Task from "./Task";
import { useTodoState, useTodoActions } from "./TodoContext";

export default function TodoList() {
  const todos = useTodoState();
  const actions = useTodoActions();
  const [newTodo, setNewTodo] = useState("");

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    actions.addTodo(newTodo);
    setNewTodo("");
  };
  return (
    <>
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
          <Task key={todo.id} todo={todo} />
        ))}
      </ul>
    </>
  );
}
