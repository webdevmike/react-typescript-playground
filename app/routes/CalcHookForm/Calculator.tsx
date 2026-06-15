import { useState, useRef } from "react";
import styles from "./Calculator.module.css";
import useCalculator, { operators, type Operator } from "./useCalculator";

export default function Calculator() {
  const { result, accumulateResult } = useCalculator();
  const operatorRef = useRef<HTMLSelectElement>(null);
  const [num, setNum] = useState("");

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (num === "") {
      alert("enter a number!");
      return;
    }

    if (operatorRef.current === null || operatorRef.current.value === "") {
      alert("choose operator!");
      return;
    }

    accumulateResult(Number(num), operatorRef.current.value as Operator);
  };

  return (
    <div className={styles.wrapper}>
      <form onSubmit={handleSubmit}>
        <div className={styles.row}>
          <label htmlFor="num">Number</label>
          <input
            id="num"
            type="number"
            value={num}
            onChange={(e) => setNum(e.target.value)}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="operator">Operator</label>
          <select id="operator" ref={operatorRef}>
            <option value="">Choose</option>
            {operators.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.row}>
          <button type="submit">Submit</button>
        </div>
      </form>
      <div className={styles.result}>{result}</div>
    </div>
  );
}
