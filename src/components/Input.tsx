import { InputChangeEvent } from "../hooks/useInput";
import style from "../styles/Input.module.scss";

interface InputProps {
  label?: string;
  type: "text" | "email" | "password" | "number" | "date" | "time";
  value: string | number;
  maxLength?: number;
  placeholder: string;
  onChange: (event: InputChangeEvent) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  autoComplete: "off";
  children?: React.ReactNode;
}

const Input = ({ label, type, value, placeholder, onChange, autoComplete, maxLength, onBlur, children }: InputProps) => {
  return (
    <div className={style["form-input"]}>
      <label>{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        autoComplete={autoComplete}
        maxLength={maxLength}
        onBlur={onBlur}
      />
      {children}
    </div>
  );
};

export default Input;
