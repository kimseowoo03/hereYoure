import style from "../../styles/UserHome.module.scss";
import UserInfoFixModal from "../../modals/UserInfoFixModal";
import { Fragment } from "react";
import useUIState from "../../store/useUIState";

const UserHome = () => {
  const {editModalOpen, setEditModalOpen} = useUIState();

  return (
    <Fragment>
      {editModalOpen&&<UserInfoFixModal />}
      <div className={style.layout}>
        <div className={style.content}>
          <div className={style["user-info"]}>
            <h1>
              김서우님, 반가워요!
              <img src="/images/handIcon.png" alt="handIcon" />
            </h1>
            <button onClick={setEditModalOpen} className={style["user-edit-button"]}>정보 수정</button>
          </div>
          <div className={style["work-room-list"]}>
            <div className={style.info}>
              <h2>근무방 목록</h2>
              <button>근무방 등록</button>
            </div>
            <div className={style["list-layout"]}>
              <p className={style["no-workroom"]}>등록된 근무방이 없습니다.</p>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default UserHome;
