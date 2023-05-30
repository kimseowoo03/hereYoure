import { useMemo } from "react";
import style from "../../styles/Worker/HistoryCard.module.scss";
import { IWORKER_HISTORY } from "./WorkerDetail";
import { ReactComponent as CircleIcon } from "../../assets/circle.svg";
import { ReactComponent as UnIcon } from "../../assets/Union.svg";
import useUIState from "../../store/useUIState";
import { formatDate } from "../../utils/formatDate";

const HistoryCard = ({
  id,
  date,
  startTime,
  endTime,
  wage,
  cover,
}: IWORKER_HISTORY) => {
  const { setHistoryInfoFixModalOpen, setHistoryId } = useUIState();

  const formattedDate = useMemo(() => {
    const week = ["일", "월", "화", "수", "목", "금", "토"];
    const isoDate = formatDate(date);
    const dayOfWeek = week[new Date(isoDate).getDay()];
    const parts = isoDate.split("-");
    const month = parts[1];
    const day = parts[2];
    return `${month}월 ${day}일 (${dayOfWeek})`;
  }, [date]);

  const totalHours = useMemo(() => {
    const [startHour, startMinute] = startTime.split(":").map(Number);
    const [endHour, endMinute] = endTime.split(":").map(Number);

    const minutesInDay = 24 * 60;
    const startMinutes = startHour * 60 + startMinute;
    const endMinutes = endHour * 60 + endMinute;

    let totalMinutes =
      (endMinutes - startMinutes + minutesInDay) % minutesInDay;

    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return { hours, minutes };
  }, [startTime, endTime]);
  
  const handleEditClick = () => {
    setHistoryInfoFixModalOpen();
    setHistoryId(id);
  };

  return (
    <li className={style.li}>
      <div>
        <input type="checkbox" />
      </div>
      <p>{formattedDate}</p>
      <p>
        {startTime} - {endTime} ({totalHours.hours !== 0 &&`${ totalHours.hours}시간`}{totalHours.minutes !== 0 && ` ${ totalHours.minutes}분`})
      </p>
      <p>{wage}</p>
      <p>{cover === 0 ? <UnIcon /> : <CircleIcon />}</p>
      <button className={style["work-edit-button"]} onClick={handleEditClick}>
        수정
      </button>
    </li>
  );
};

export default HistoryCard;
