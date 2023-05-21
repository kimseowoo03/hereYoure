import style from "../../styles/user/UserHome.module.scss";
import UserInfoFixModal from "../../modals/UserInfoFixModal";
import { Fragment, useEffect, useState } from "react";
import useUIState from "../../store/useUIState";
import WorkRoomRegisterModal from "../../modals/WorkRoomRegisterModal";
import WorkRoomCard from "./WorkRoomCard";

import { AxiosError } from "axios";
import api from "../../axiosConfig";

import { useAccessToken } from "../../store/useAccessTokenState";

export interface IWORKROOM_DATA {
  id?: number;
  title: string;
  tax?: number;
  password?: string;
  weekly_pay: number;
  overtime_pay: number;
  night_pay: number;
  [key: string]: string | number | undefined;
}

export interface IUserInfo {
  email: string;
  id?: number;
  name: string;
}

const UserHome = () => {
  const { editModalOpen, setEditModalOpen } = useUIState();
  const { registerModalOpen, setRegisterModalOpen } = useUIState();

  const [userInfo, setUserInfo] = useState<IUserInfo>();
  const [workrooms, setWorkrooms] = useState<IWORKROOM_DATA[]>([]);

  const { accessToken, setAccessToken } = useAccessToken();

  useEffect(() => {
    const WorkRoomData = async () => {
      try {
        //access token 확인
        if (!accessToken) {
          const storedAccessToken = localStorage.getItem("accessToken");
          if (storedAccessToken) {
            setAccessToken(storedAccessToken);
          } else {
            return;
          }
        }
        if (accessToken) {
          const res = await api.get("/workroom", {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
          setUserInfo(res.data.data.user);
          setWorkrooms(res.data.data.workrooms);
        }
      } catch (error) {
        const err = error as AxiosError;
        if (!err.response) {
          console.warn("response가 없습니다.");
        } else {
          console.warn(`error: ${err.message}`);
        }
      }
    };
    WorkRoomData();
  }, [accessToken, setAccessToken]);

  return (
    <Fragment>
      {editModalOpen && userInfo && <UserInfoFixModal {...userInfo} />}
      {registerModalOpen && <WorkRoomRegisterModal />}
      <div className={style.layout}>
        <div className={style.content}>
          <div className={style["user-info"]}>
            <h1>
              {userInfo ? `${userInfo.name}님, 반가워요!` : "로딩 중..."}
              <img src="/images/handIcon.png" alt="handIcon" />
            </h1>
            <button
              onClick={setEditModalOpen}
              className={style["user-edit-button"]}
            >
              정보 수정
            </button>
          </div>
          <div className={style["work-room-list"]}>
            <div className={style.info}>
              <h2>근무방 목록</h2>
              <button onClick={setRegisterModalOpen}>근무방 등록</button>
            </div>
            <div className={style["list-container"]}>
              <ul>
                {workrooms.map((workRoom) => {
                  return (
                    <WorkRoomCard
                      key={workRoom.id}
                      id={workRoom.id}
                      title={workRoom.title}
                      weekly_pay={workRoom.weekly_pay}
                      overtime_pay={workRoom.overtime_pay}
                      night_pay={workRoom.night_pay}
                    />
                  );
                })}
              </ul>
              {workrooms.length === 0 && (
                <p className={style["no-workroom"]}>
                  등록된 근무방이 없습니다.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default UserHome;
