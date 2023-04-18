import style from "../styles/Button.module.scss";

interface ButtonProps {
  children: string;
  type: "button" | "submit";
  isCancel?: boolean;
}

const Button = ({ children, type, isCancel }: ButtonProps) => {
  return (
    <button className={isCancel?style["cancel-button"]:style.button} type={type}>
      {children}
    </button>
  );
};

export default Button;
