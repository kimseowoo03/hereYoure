import { useMemo } from "react";
import { Link } from "react-router-dom";
import { IWORKROOM_DATA } from "./UserHome";
import style from "../../styles/user/WorkRoomCard.module.scss";
import { ReactComponent as NextIcon } from "../../assets/next-icon.svg";

const MAX_NAME_LENGTH = 15;

const WorkRoomCard = ({title:workroomName, weekly_pay, overtime_pay, night_pay, id }: IWORKROOM_DATA) => {
  const title = useMemo(() => {
    if (workroomName.length > MAX_NAME_LENGTH) {
      return workroomName.substring(0, MAX_NAME_LENGTH) + "...";
    }
    return workroomName;
  }, [workroomName]);

  return (
    <li className={style.content}>
      <div className={style["include-box"]}>
        {weekly_pay !== 0 && <div>주휴수당</div>}
        {overtime_pay !== 0 && <div>연장수당</div>}
        {night_pay !== 0 && <div>야근수당</div>}
      </div>
      <p>{title}</p>
      <div className={style.button}>
        <Link to={`/mypage/${id}`}>
          <NextIcon />
        </Link>
      </div>
    </li>
  );
};

export default WorkRoomCard;
