import { Link } from "react-router-dom";
import { IWORKROOM_DATA } from "./UserHome";
import style from "../../styles/user/WorkRoomCard.module.scss";
import {ReactComponent as NextIcon} from "../../assets/next-icon.svg";

const WorkRoomCard = (props: IWORKROOM_DATA) => {
  const MAX_NAME_LENGTH = 15;
  let title = props.title;
  if (props.title.length > MAX_NAME_LENGTH) {
    title = props.title.substring(0, MAX_NAME_LENGTH) + "...";
  }

  return (
    <li className={style.content}>
      <div className={style["include-box"]}>
        {props.night_pay && <div>주휴수당</div>}
        {props.overtime_pay && <div>연휴수당</div>}
        {props.night_pay && <div>야근수당</div>}
      </div>
      <p>{title}</p>
      <div className={style.button}>
        <Link to={`/workroom/${props.id}`}>
        <NextIcon />
        </Link>
      </div>
    </li>
  );
};

export default WorkRoomCard;
