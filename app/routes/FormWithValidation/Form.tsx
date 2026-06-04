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

export default function Form() {
  const [fields, setFields] = useState<FormFields>({
    name: "",
    shirtSize: "",
    attendanceType: "",
    codeOfConduct: false,
  });
  const [errors, setErrors] = useState<FormErrors>({
    name: "",
    shirtSize: "",
    attendanceType: "",
    codeOfConduct: "",
  });

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formIsValid = validateFields();
    if (formIsValid) {
      alert("success!");
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

    setErrors(newErrors);

    return Object.values(newErrors).every((field) => field.length === 0);
  };

  return (
    <div className={styles.wrapper}>
      <h1>Form with Validation</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={fields.name}
          onChange={handleFieldChange}
        />
        {errors.name && <div className={styles.error}>{errors.name}</div>}
        <button type="submit">Send</button>
      </form>
    </div>
  );
}
