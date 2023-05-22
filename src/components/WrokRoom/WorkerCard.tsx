import { Link, useParams } from 'react-router-dom';
import { IWORKER_DATA } from "./WorkRoomDetail";
import style from "../../styles/WorkRoom/WorkerCard.module.scss";
import { ReactComponent as NextIcon } from "../../assets/next-icon.svg";

const WorkerCard = ({ id, name, age, gender, phoneNumber }: IWORKER_DATA) => {
  const {workroom} = useParams();

  return (
    <Link to={`/mypage/${workroom}/${id}`}>
    <li className={style.li}>
        <p>{name}</p>
        <div className={style["next-icon"]}>
          <NextIcon />
        </div>
        <p>{age}</p>
        <p>{gender === "female" ? "여" : "남"}</p>
        <p>{phoneNumber}</p>
    </li>
    </Link>
  );
};

export default WorkerCard;
