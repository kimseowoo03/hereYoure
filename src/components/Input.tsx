import { InputChangeEvent } from "../hooks/useInput";
import style from "../styles/Input.module.scss";

interface InputProps {
  label?: string;
  type: "text" | "email" | "password"| "number";
  value: string | number;
  max?: string;
  placeholder: string;
  onChange: (event: InputChangeEvent) => void;
  onBlur? : (event: React.FocusEvent<HTMLInputElement>) => void;
  autoComplete: "off";
}

const Input = ({ label, type, value, placeholder, onChange, autoComplete, max, onBlur }: InputProps) => {
  return (
    <div className={style["form-input"]}>
      <label>{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        autoComplete={autoComplete}
        max={max}
        onBlur={onBlur}
      />
    </div>
  );
};

export default Input;
