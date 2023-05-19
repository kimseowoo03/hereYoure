import style from "../../styles/Worker/AllowanceItem.module.scss";

interface IAllowanceItemProps {
  label: string;
  name: string;
  handleRadioChange: (event:React.ChangeEvent<HTMLInputElement>) => void
  include: boolean;
  children: React.ReactNode;
}

const AllowanceItem = ({ label, name, include, handleRadioChange, children }: IAllowanceItemProps) => {
  return (
    <div className={style.allowance}>
      <label>{label}</label>
      <div className={style.radio}>
        <input type="radio" name={name} value="not-include" onChange={handleRadioChange} checked={include === false}/>
        미포함
        <input type="radio" name={name} value="include" onChange={handleRadioChange} checked={include === true}/>
        포함
      </div>
      {include && children}
    </div>
  )
};

export default AllowanceItem;