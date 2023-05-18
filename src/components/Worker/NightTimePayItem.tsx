import { UseInputReturn } from "../../hooks/useInput";
import {ReactComponent as DrodownIcon} from "../../assets/dropdown.svg"
import style from "../../styles/Worker/NightTimePayItem.module.scss";
interface INighttimePayItemProps {
  startTime: UseInputReturn;
  endTime: UseInputReturn;
  onNightPaytimeBlur: () => void;
}

const NightTimePayItem = ({
  startTime,
  endTime,
  onNightPaytimeBlur,
}: INighttimePayItemProps) => {

  return (
    <div className={style.content}>
      <p>(야간 근무 시간 x 계약시급) x 1.5</p>
      <div className={style["custom-time-input"]}>
        <p>시작시간</p>
        <input
          type="time"
          name="startTime"
          value={startTime.value || "22:00"}
          onChange={startTime.onChange}
          onBlur={onNightPaytimeBlur}
        />
      </div>
      <div className={style["custom-time-input"]}>
        <p>종료시간</p>
        <input
          type="time"
          name="endTime"
          value={endTime.value || "06:00"}
          onChange={endTime.onChange}
          onBlur={onNightPaytimeBlur}
        />
      </div>
    </div>
  );
};

export default NightTimePayItem;
