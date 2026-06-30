import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("transfer-list", "routes/TransferList/TransferList.tsx"),
  route("theme-provider", "routes/Theme/Theme.tsx"),
  route("job-board", "routes/JobBoard/JobBoard.tsx"),
  route("use-fetch", "routes/UseFetch/UseFetch.tsx"),
  route("table-pagination", "routes/TablePagination/Table.tsx"),
  route("form-with-validation", "routes/FormWithValidation/Form.tsx"),
  route("calc-hook-form", "routes/CalcHookForm/CalcForm.tsx"),
  route("undoable-counter", "routes/UndoableCounter/UndoableCounter.tsx"),
  route("counter-use-reducer", "routes/CounterUseReducer/Counter.tsx"),
  route("todo-use-state", "routes/TodoList/use-state/TodoList.tsx"),
  route("todo-use-reducer", "routes/TodoList/use-reducer/TodoList.tsx"),
  route("todo-context-reducer", "routes/TodoList/context-reducer/TodoPage.tsx"),
] satisfies RouteConfig;
