import { useState, useMemo, useCallback, memo } from "react";
import styles from "./UndoableCounter.module.css";

type Result = {
  id: number;
  op: string;
  old: number;
  new: number;
};

type HistoryAction = "undo" | "redo" | "reset";

type Operator = "/2" | "-1" | "+1" | "x2";

let nextId = 0;

export default function UndoableCounter() {
  const [results, setResults] = useState<Result[]>([]);
  const [currentResultIndex, setCurrentResultIndex] = useState(0);

  const currentValue = results[currentResultIndex]?.new ?? 0;

  const resultsToDisplay = useMemo(
    () => results.slice(currentResultIndex),
    [results, currentResultIndex],
  );

  const handleOperation = useCallback(
    (operator: Operator, currVal: number) => {
      setResults((prev) => {
        let newVal: number;
        switch (operator) {
          case "/2":
            newVal = currVal / 2;
            break;
          case "-1":
            newVal = currVal - 1;
            break;
          case "+1":
            newVal = currVal + 1;
            break;
          case "x2":
            newVal = currVal * 2;
            break;
          default:
            throw new Error("no match");
        }
        const newResult = {
          id: nextId++,
          op: operator,
          old: currVal,
          new: newVal,
        };
        const newPrev = prev.slice(currentResultIndex);
        return [newResult, ...newPrev];
      });
      setCurrentResultIndex(0);
    },
    [currentResultIndex],
  );

  const handleHistory = useCallback((action: HistoryAction) => {
    switch (action) {
      case "undo":
        setCurrentResultIndex((prev) => prev + 1);
        break;
      case "redo":
        setCurrentResultIndex((prev) => prev - 1);
        break;
      case "reset":
        setCurrentResultIndex(0);
        setResults([]);
        break;
      default:
        throw new Error("no match");
    }
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.row}>
        <button
          type="button"
          onClick={() => handleHistory("undo")}
          disabled={resultsToDisplay.length === 0}
        >
          Undo
        </button>
        <button
          type="button"
          onClick={() => handleHistory("redo")}
          disabled={currentResultIndex === 0}
        >
          Redo
        </button>
        <button
          type="button"
          onClick={() => handleHistory("reset")}
          disabled={results.length === 0}
        >
          Reset
        </button>
      </div>
      <div className={styles.row}>
        <button
          type="button"
          onClick={() => handleOperation("/2", currentValue)}
        >
          /2
        </button>
        <button
          type="button"
          onClick={() => handleOperation("-1", currentValue)}
        >
          -1
        </button>
        <div>{currentValue}</div>
        <button
          type="button"
          onClick={() => handleOperation("+1", currentValue)}
        >
          +1
        </button>
        <button
          type="button"
          onClick={() => handleOperation("x2", currentValue)}
        >
          x2
        </button>
      </div>
      <Table resultsToDisplay={resultsToDisplay} />
    </div>
  );
}

const Table = memo(({ resultsToDisplay }: { resultsToDisplay: Result[] }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Op</th>
          <th>Old</th>
          <th>New</th>
        </tr>
      </thead>
      <tbody>
        {resultsToDisplay.map((item) => (
          <TableRow key={item.id} item={item} />
        ))}
      </tbody>
    </table>
  );
});

function TableRow({ item }: { item: Result }) {
  return (
    <tr>
      <td>{item.op}</td>
      <td>{item.old}</td>
      <td>{item.new}</td>
    </tr>
  );
}
