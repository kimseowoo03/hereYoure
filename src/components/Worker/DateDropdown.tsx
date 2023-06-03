import { useState, memo, useEffect } from "react";
import style from "../../styles/modals/DateDropdown.module.scss";
import { ReactComponent as DropdownIcon } from "../../assets/dropdown.svg";
import { ReactComponent as DropupIcon } from "../../assets/dropup.svg";
import { IWORKER_HISTORY } from "./WorkerDetail";
import useUIState from "../../store/useUIState";

interface IDateDropdownProps {
  workDates: IWORKER_HISTORY[];
}

const DateDropdown: React.FC<IDateDropdownProps> = ({ workDates }) => {
  const [isDropdownOpen, SetIsDropdownOpen] = useState(false);
  const { dateSelected, setDateSelected } = useUIState();
  const months = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
  ];

  const handleMonthClick = (month: string) => {
    setDateSelected(month);
    SetIsDropdownOpen(!isDropdownOpen);
  };
  return (
    <div className={style.content}>
      <div
        className={style["selected-date"]}
        onClick={() => SetIsDropdownOpen(!isDropdownOpen)}
      >
        <span>{dateSelected}월</span>
        {isDropdownOpen ? <DropupIcon /> : <DropdownIcon />}
      </div>
      <div className={style["date-list"]}>
        {isDropdownOpen && (
          <ul>
            {months.map((month, index) => {
              return (
                <li onClick={() => handleMonthClick(month)} key={index}>
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

export default memo(DateDropdown);
