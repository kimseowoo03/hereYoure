import style from "../../styles/Worker/OverTimePayItem.module.scss";
import { ReactComponent as DropdownIcon } from "../../assets/dropdown.svg";
import { ReactComponent as DropupIcon } from "../../assets/dropup.svg";

interface IOverTimePayProps {
  overHourTime: boolean;
  setOverHourTime: (overHourTime: boolean) => void;
  overHourTimeValue: string;
  handleOverTimeHourClick: (index: number) => void;
  overMinuteTime: boolean;
  setOverMinuteTime: (overMinutetime: boolean) => void;
  overMinuteTimeValue: string;
  handleOverTimeMinuteClick: (value: number) => void;
}

const OverTimePayItem = ({
  overHourTime,
  setOverHourTime,
  overHourTimeValue,
  handleOverTimeHourClick,
  overMinuteTime,
  setOverMinuteTime,
  overMinuteTimeValue,
  handleOverTimeMinuteClick,
}: IOverTimePayProps) => {
  return (
    <div className={style.content}>
      <p>(연장 근무 시간 x 계약시급) x 1.5</p>
      <div className={style["time-content"]}>
        <p>연장시간</p>
        <div>
          <div className={style["time_dropdown"]}>
            <button onClick={() => setOverHourTime(!overHourTime)}>
              <span>{overHourTimeValue}</span>
              {overHourTime ? <DropupIcon /> : <DropdownIcon />}
            </button>
            {overHourTime && (
              <ul className={style["time_list"]}>
                {Array.from({ length: 23 }, (_, index) => (
                  <li
                    onClick={() => handleOverTimeHourClick(index)}
                    key={index}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </li>
                ))}
              </ul>
            )}
          </div>
          시간
          <div className={style["time_dropdown"]}>
            <button onClick={() => setOverMinuteTime(!overMinuteTime)}>
              <span>{overMinuteTimeValue}</span>
              {overMinuteTime ? <DropupIcon /> : <DropdownIcon />}
            </button>
            {overMinuteTime && (
              <ul className={style["time_list"]}>
                {[10, 20, 30, 40, 50].map((value, index) => (
                  <li
                    onClick={() => handleOverTimeMinuteClick(value)}
                    key={index}
                  >
                    {String(value).padStart(2, "0")}
                  </li>
                ))}
              </ul>
            )}
          </div>
          분
        </div>
      </div>
    </div>
  );
};

export default OverTimePayItem;
