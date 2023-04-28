import { Link } from "react-router-dom";
import { IWORKROOM_DATA } from "./UserHome";
import style from "../../styles/user/WorkRoomCard.module.scss";

const WorkRoomCard = (props: IWORKROOM_DATA) => {
  const MAX_NAME_LENGTH = 15;
  let name = props.name;
  if (props.name.length > MAX_NAME_LENGTH) {
    name = props.name.substring(0, MAX_NAME_LENGTH) + "...";
  }

  return (
    <li className={style.content}>
      <div className={style["include-box"]}>
        {props.nightInclude && <div>주휴수당</div>}
        {props.overtimeInclude && <div>연휴수당</div>}
        {props.weeklyInclude && <div>야근수당</div>}
      </div>
      <p>{name}</p>
      <div className={style.button}>
        <Link to={`/workroom/${props.id}`}>{">"}</Link>
      </div>
    </li>
  );
};

export default WorkRoomCard;
