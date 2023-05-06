import style from "../styles/Button.module.scss";

interface ButtonProps {
  disabled?: boolean;
  children: string;
  type: "button" | "submit";
  isCancel?: boolean;
  onClick?: () => void
}

const Button = ({disabled, children, type, isCancel, onClick }: ButtonProps) => {
  return (
    <button disabled={disabled} className={isCancel?style["cancel-button"]:style.button} type={type} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
