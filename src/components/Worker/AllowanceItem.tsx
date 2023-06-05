import style from "../../styles/Worker/AllowanceItem.module.scss";

interface IAllowanceItemProps {
  label: string;
  text: string;
  notText: string;
  name: string;
  handleRadioChange: (event:React.ChangeEvent<HTMLInputElement>) => void
  include: boolean;
  children?: React.ReactNode;
}

const AllowanceItem = ({ label, text, notText, name, include, handleRadioChange, children }: IAllowanceItemProps) => {
  return (
    <div className={style.allowance}>
      <label>{label}</label>
      <div className={style.radio}>
        <input type="radio" name={name} value="not-include" onChange={handleRadioChange} checked={include === false}/>
        {notText}
        <input type="radio" name={name} value="include" onChange={handleRadioChange} checked={include === true}/>
        {text}
      </div>
      {include && children}
    </div>
  )
};

export default AllowanceItem;