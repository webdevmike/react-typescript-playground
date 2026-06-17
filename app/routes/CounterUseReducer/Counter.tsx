import React, { useReducer } from "react";

type State = { count: number };
type Action =
  | { type: "increment" }
  | { type: "decrement" }
  | { type: "set-count"; payload: number };

const initialState: State = { count: 0 };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    case "set-count":
      return { count: action.payload };
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: "increment" })}>Increment</button>
      <button onClick={() => dispatch({ type: "decrement" })}>Decrement</button>
      <button onClick={() => dispatch({ type: "set-count", payload: 3 })}>
        Set Count
      </button>
    </div>
  );
}

export default Counter;
