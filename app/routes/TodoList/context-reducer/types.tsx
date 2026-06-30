export type Todo = {
  id: number;
  name: string;
};

export type ReducerActions =
  | {
      type: "ADD";
      payload: string;
    }
  | {
      type: "DELETE";
      payload: number;
    };
