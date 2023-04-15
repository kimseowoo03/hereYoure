import style from "../styles/Button.module.scss";

interface ButtonProps {
  children: string;
  type: "button" | "submit";
}

const Button = ({ children, type }: ButtonProps) => {
  return (
    <button className={style.button} type={type}>
      {children}
    </button>
  );
};

export default Button;
