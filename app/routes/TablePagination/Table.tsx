import { type ChangeEvent, useState } from "react";
import data from "./data";
import styles from "./Table.module.css";

export default function DataTable() {
  const [usersPerPage, setUsersPerPage] = useState(5);
  const [page, setPage] = useState(1);

  const handleSelectChange = (
    e: ChangeEvent<HTMLSelectElement, HTMLSelectElement>,
  ) => {
    setUsersPerPage(Number(e.target.value));
    setPage(1);
  };

  const handlePrev = () => {
    setPage((prev) => prev - 1);
  };

  const handleNext = () => {
    setPage((prev) => prev + 1);
  };

  const start = (page - 1) * usersPerPage;
  const end = start + usersPerPage;
  const filteredUsers = data.slice(start, end);

  const totalPages = Math.ceil(data.length / usersPerPage);

  const prevDisabled = page === 1;
  const nextDisabled = page === totalPages;

  return (
    <div className={styles.wrapper}>
      <h1>Table Pagination</h1>
      <div className={styles.controls}>
        <select value={usersPerPage} onChange={handleSelectChange}>
          <option value="5">Show 5</option>
          <option value="10">Show 10</option>
          <option value="15">Show 15</option>
        </select>
        <button disabled={prevDisabled} type="button" onClick={handlePrev}>
          Prev
        </button>
        <div>
          Page {page} of {totalPages}
        </div>
        <button disabled={nextDisabled} type="button" onClick={handleNext}>
          Next
        </button>
      </div>
      <table>
        <thead>
          <tr>
            {[
              { label: "ID", key: "id" },
              { label: "Name", key: "name" },
              { label: "Age", key: "age" },
              { label: "Occupation", key: "occupation" },
            ].map(({ label, key }) => (
              <th key={key}>{label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map(({ id, name, age, occupation }) => (
            <tr key={id}>
              <td>{id}</td>
              <td>{name}</td>
              <td>{age}</td>
              <td>{occupation}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
