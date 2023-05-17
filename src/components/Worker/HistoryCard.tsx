import style from "../../styles/Worker/HistoryCard.module.scss"
import { IWORKER_HISTORY } from "./WorkerDetail";

const HistoryCard = ({date, startTime, endTime, wage, cover}:IWORKER_HISTORY) => {
  return (
    <li>
      <div>
        <input type="checkbox" />
      </div>
      <p>{date}</p>
      <p>
        {startTime} - {endTime}
      </p>
      <p>{wage}</p>
      <p>{cover}</p>
      <button>수정</button>
    </li>
  );
};

export default HistoryCard;