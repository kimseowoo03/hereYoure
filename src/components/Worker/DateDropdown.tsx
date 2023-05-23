import style from "../../styles/modals/DateDropdown.module.scss";
import { ReactComponent as DropdownIcon } from "../../assets/dropdown.svg";
import { ReactComponent as DropupIcon } from "../../assets/dropup.svg";
import { useState } from "react";
import useInput from "../../hooks/useInput";

const DateDropdown = () => {
  const [isDropdownOpen, SetIsDropdownOpen] = useState(false);
  const selectedDate = useInput("3");

  const workDates = [
    "2023-02-21",
    "2023-02-15",
    "2023-01-15",
    "2023-03-15",
    "2023-04-08",
  ];

  const uniqueMonths = new Set();

  workDates.forEach((date) => {
    const workDate = new Date(date);
    const month = workDate.getMonth() + 1;
    uniqueMonths.add(month);
  });

  const UserHistoryDate = Array.from(uniqueMonths).sort(
    (a, b) => (b as number) - (a as number)
  ) as number[];

  const handleMonthClick = (event: React.MouseEvent<HTMLLIElement>) => {
    const selectedMonth = event.currentTarget.innerText.toString().replace(/\D/g, "");
    selectedDate.setValue(selectedMonth);
    SetIsDropdownOpen(!isDropdownOpen);
  };
  return (
    <div className={style.content}>
      <div
        className={style["selected-date"]}
        onClick={() => SetIsDropdownOpen(!isDropdownOpen)}
      >
        <span>{selectedDate.value}월</span>
        {isDropdownOpen ? <DropupIcon /> : <DropdownIcon />}
      </div>
      <div className={style["date-list"]}>
        {isDropdownOpen && (
          <ul>
            {UserHistoryDate.map((month, index) => {
              return (
                <li onClick={handleMonthClick} key={index}>
                  {month}월
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default DateDropdown;
