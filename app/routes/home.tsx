import type { Route } from "./+types/home";
import { Link } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "React TypeScript Playground" },
    { name: "description", content: "Welcome to React TypeScript Playground!" },
  ];
}

export default function Home() {
  return (
    <>
      <h1>React TypeScript Playground</h1>
      <ul>
        <li>
          <Link to="/job-board">Job Board</Link>
        </li>
        <li>
          <Link to="/table-pagination">Table Pagination</Link>
        </li>
        <li>
          <Link to="/form-with-validation">Form with Validation</Link>
        </li>
        <li>
          <Link to="/theme-provider">Theme Provider (Context API)</Link>
        </li>
        <li>
          <Link to="/transfer-list">Transfer List</Link>
        </li>
        <li>
          <Link to="/use-fetch">Use Fetch Hook</Link>
        </li>
      </ul>
    </>
  );
}
