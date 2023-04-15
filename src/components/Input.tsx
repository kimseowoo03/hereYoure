import { InputEvent } from "../hooks/useInput";
import style from "../styles/Input.module.scss";

interface InputProps {
  label?: string;
  type: "text" | "email" | "password";
  value: string;
  placeholder: string;
  onChange: (event: InputEvent) => void;
}

const Input = ({ label, type, value, placeholder, onChange }: InputProps) => {
  return (
    <div className={style["form-input"]}>
      <label>{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default Input;
