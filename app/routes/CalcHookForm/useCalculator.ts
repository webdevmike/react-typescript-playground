import { useState } from "react";

export const operators = ["add", "subtract"] as const;

export type Operator = (typeof operators)[number];

export default function useCalculator() {
  const [result, setResult] = useState(0);

  const accumulateResult = (num: number, operator: Operator): void => {
    setResult((prev) => {
      return operator === "add" ? prev + num : prev - num;
    });
  };

  return { result, accumulateResult };
}
