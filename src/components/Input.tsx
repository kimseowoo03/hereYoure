import { InputEvent } from "../hooks/useInput";
import style from "../styles/Input.module.scss";

interface InputProps {
  label?: string;
  type: "text" | "email" | "password";
  value: string;
  placeholder: string;
  onChange: (event: InputEvent) => void;
  autoComplete?: "current-password" | "workRoom-name" | "user-email";
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
