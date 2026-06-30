import { type Todo } from "./types";
import { useTodoActions } from "./TodoContext";

export default function Task({ todo }: { todo: Todo }) {
  const actions = useTodoActions();
  return (
    <li>
      <span>{todo.name}</span>
      <button type="button" onClick={() => actions.deleteTodo(todo.id)}>
        Delete
      </button>
    </li>
  );
}
