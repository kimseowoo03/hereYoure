import { useMemo } from "react";
import style from "../../styles/Worker/HistoryCard.module.scss"
import { IWORKER_HISTORY } from "./WorkerDetail";

const HistoryCard = ({date, startTime, endTime, wage, cover}:IWORKER_HISTORY) => {
  const formattedDate = useMemo(() => {
    const week = ['일', '월', '화', '수', '목', '금', '토'];
    const dayOfWeek = week[new Date(date).getDay()];
    const parts = date.split("-");
    const month = parts[1];
    const day = parts[2];
    return `${month}월 ${day}일 (${dayOfWeek})`;
  }, [date]);

  return (
    <li className={style.li}>
      <div>
        <input type="checkbox" />
      </div>
      <p>{formattedDate}</p>
      <p>
        {startTime} - {endTime} (4시간 30분)
      </p>
      <p>{wage}</p>
      <p>{cover}</p>
      <button className={style["work-edit-button"]}>수정</button>
    </li>
  );
};

export default HistoryCard;