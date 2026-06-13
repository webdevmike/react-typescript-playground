import { useState } from "react";
import styles from "./Form.module.css";

type ShirtSize = "S" | "M" | "L";

type AttendanceType = "In Person" | "Virtual";

type FormFields = {
  name: string;
  shirtSize: ShirtSize | "";
  attendanceType: AttendanceType | "";
  codeOfConduct: boolean;
};

type FormErrors = Record<keyof FormFields, string>;

const INITIAL_FIELDS: FormFields = {
  name: "",
  shirtSize: "",
  attendanceType: "",
  codeOfConduct: false,
};

const INITIAL_ERRORS: FormErrors = {
  name: "",
  shirtSize: "",
  attendanceType: "",
  codeOfConduct: "",
};

export default function Form() {
  const [fields, setFields] = useState<FormFields>(INITIAL_FIELDS);
  const [errors, setErrors] = useState<FormErrors>(INITIAL_ERRORS);
  const [submitInProgress, setSubmitInProgress] = useState(false);

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setSubmitInProgress(true);
      const formIsValid = validateFields();
      if (formIsValid) {
        alert("success!");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitInProgress(false);
    }
  };

  const handleFieldChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value, type } = e.target;
    const checked = type === "checkbox" ? e.target.checked : null;

    setFields((prev) => ({
      ...prev,
      [name]: checked ?? value,
    }));

    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateFields = (): boolean => {
    const newErrors: FormErrors = {
      name: "",
      shirtSize: "",
      attendanceType: "",
      codeOfConduct: "",
    };

    if (fields.name === "") {
      newErrors.name = "Name is required";
    }

    if (fields.shirtSize === "") {
      newErrors.shirtSize = "Shirt size is required";
    }

    if (fields.attendanceType === "") {
      newErrors.attendanceType = "Attendance type is required";
    }

    if (fields.codeOfConduct === false) {
      newErrors.codeOfConduct =
        "You must agree to abide by our code of conduct";
    }

    setErrors(newErrors);

    return Object.values(newErrors).every((field) => field.length === 0);
  };

  return (
    <div className={styles.wrapper}>
      <h1>Form with Validation</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.row}>
          <label htmlFor="name">Name:</label>
          <div className={styles.fieldInput}>
            <input
              type="text"
              id="name"
              name="name"
              value={fields.name}
              onChange={handleFieldChange}
            />
            {errors.name && <div className={styles.error}>{errors.name}</div>}
          </div>
        </div>
        <div className={styles.row}>
          <label htmlFor="shirt-size">Shirt Size:</label>
          <div className={styles.fieldInput}>
            <select
              name="shirtSize"
              id="shirt-size"
              value={fields.shirtSize}
              onChange={handleFieldChange}
            >
              <option value="">Select a size</option>
              <option value="S">Small</option>
              <option value="M">Medium</option>
              <option value="L">Large</option>
            </select>
            {errors.shirtSize && (
              <div className={styles.error}>{errors.shirtSize}</div>
            )}
          </div>
        </div>
        <fieldset>
          <legend>Attendance Type:</legend>
          <div className={styles.row}>
            <div className={styles.radioInput}>
              <input
                type="radio"
                value="In Person"
                id="in-person"
                name="attendanceType"
                checked={fields.attendanceType === "In Person"}
                onChange={handleFieldChange}
              />
              <label htmlFor="in-person">In Person</label>
            </div>
            <div className={styles.radioInput}>
              <input
                type="radio"
                value="Virtual"
                id="virtual"
                name="attendanceType"
                checked={fields.attendanceType === "Virtual"}
                onChange={handleFieldChange}
              />
              <label htmlFor="virtual">Virtual</label>
            </div>
          </div>
          {errors.attendanceType && (
            <div className={styles.error}>{errors.attendanceType}</div>
          )}
        </fieldset>
        <div className={styles.row}>
          <input
            type="checkbox"
            id="code-of-conduct"
            name="codeOfConduct"
            checked={fields.codeOfConduct}
            onChange={handleFieldChange}
          />
          <div className={styles.fieldInput}>
            <label htmlFor="code-of-conduct">
              I agree to the code of conduct
            </label>
            {errors.codeOfConduct && (
              <div className={styles.error}>{errors.codeOfConduct}</div>
            )}
          </div>
        </div>
        <div className={styles.buttons}>
          <button type="submit" disabled={submitInProgress}>
            Send
          </button>
          <button
            type="button"
            onClick={() => {
              setFields(INITIAL_FIELDS);
              setErrors(INITIAL_ERRORS);
            }}
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
}
