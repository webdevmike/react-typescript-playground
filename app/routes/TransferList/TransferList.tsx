import { useState } from "react";
import styles from "./TransferList.module.css";

type List = Map<string, boolean>;

const DEFAULT_ITEMS_LEFT = ["HTML", "JavaScript", "CSS", "TypeScript"];
const DEFAULT_ITEMS_RIGHT = ["React", "Angular", "Vue", "Svelte"];

function generateItemMap(items: string[]): List {
  return new Map(items.map((label) => [label, false]));
}

const transferAllItems = (
  itemSrc: List,
  setItemSrc: React.Dispatch<React.SetStateAction<List>>,
  itemDest: List,
  setItemDest: React.Dispatch<React.SetStateAction<List>>,
) => {
  setItemSrc(new Map());
  setItemDest(new Map([...itemDest, ...itemSrc]));
};

const transferItems = (
  itemSrc: List,
  setItemSrc: React.Dispatch<React.SetStateAction<List>>,
  itemDest: List,
  setItemDest: React.Dispatch<React.SetStateAction<List>>,
) => {
  const newItemSrc = new Map(itemSrc);
  const newItemDest = new Map(itemDest);

  itemSrc.forEach((value, key) => {
    if (!value) return;
    newItemSrc.delete(key);
    newItemDest.set(key, false);
  });

  setItemSrc(newItemSrc);
  setItemDest(newItemDest);
};

function ItemList({
  items,
  setItems,
}: {
  items: List;
  setItems: React.Dispatch<React.SetStateAction<List>>;
}) {
  return (
    <>
      {[...items].map(([label, selected]) => (
        <li key={label}>
          <input
            type="checkbox"
            id={label}
            checked={selected}
            onChange={() => {
              const newItems = new Map(items);
              newItems.set(label, !selected);
              setItems(newItems);
            }}
          />
          <label htmlFor={label}>{label}</label>
        </li>
      ))}
    </>
  );
}

export default function App() {
  const [itemsLeft, setItemsLeft] = useState<List>(
    generateItemMap(DEFAULT_ITEMS_LEFT),
  );
  const [itemsRight, setItemsRight] = useState<List>(
    generateItemMap(DEFAULT_ITEMS_RIGHT),
  );

  return (
    <div>
      <div className={styles.wrapper}>
        <div className={styles.list}>
          <ul>
            <ItemList items={itemsLeft} setItems={setItemsLeft} />
          </ul>
        </div>
        <div className={styles.buttons}>
          <button
            onClick={() => {
              transferAllItems(
                itemsRight,
                setItemsRight,
                itemsLeft,
                setItemsLeft,
              );
            }}
          >
            &lt;&lt;
          </button>
          <button
            onClick={() => {
              transferItems(itemsRight, setItemsRight, itemsLeft, setItemsLeft);
            }}
          >
            &lt;
          </button>
          <button
            onClick={() => {
              transferItems(itemsLeft, setItemsLeft, itemsRight, setItemsRight);
            }}
          >
            &gt;
          </button>
          <button
            onClick={() => {
              transferAllItems(
                itemsLeft,
                setItemsLeft,
                itemsRight,
                setItemsRight,
              );
            }}
          >
            &gt;&gt;
          </button>
        </div>
        <div className={styles.list}>
          <ul>
            <ItemList items={itemsRight} setItems={setItemsRight} />
          </ul>
        </div>
      </div>
    </div>
  );
}
