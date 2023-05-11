import { IWORKER_DATA } from "./WorkRoomDetail";
import style from "../../styles/WorkRoom/WorkerCard.module.scss";

const WorkerCard = ({id, name, age, gender, phoneNumber}:IWORKER_DATA) => {
  return (
    <li className={style.li}>
      <p>{name}</p>
      <p>{age}</p>
      <p>{gender}</p>
      <p>{phoneNumber}</p>
    </li>
  );
};

export default WorkerCard;
