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
] satisfies RouteConfig;
