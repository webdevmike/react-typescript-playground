import { TodoProvider } from "./TodoContext";
import TodoList from "./TodoList";

export default function TodoPage() {
  return (
    <TodoProvider>
      <TodoList />
    </TodoProvider>
  );
}
