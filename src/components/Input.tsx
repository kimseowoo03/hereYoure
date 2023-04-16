import { InputEvent } from "../hooks/useInput";
import style from "../styles/Input.module.scss";

interface InputProps {
  label?: string;
  type: "text" | "email" | "password";
  value: string | number;
  placeholder: string;
  onChange: (event: InputEvent) => void;
  autoComplete: "off";
}

const Input = ({ label, type, value, placeholder, onChange, autoComplete }: InputProps) => {
  return (
    <div className={style["form-input"]}>
      <label>{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        autoComplete={autoComplete}
      />
    </div>
  );
};

export default Input;
