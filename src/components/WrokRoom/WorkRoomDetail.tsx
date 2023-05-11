import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { AxiosError } from "axios";
import style from "../../styles/WorkRoom/WorkRoom.module.scss";
import { useAccessToken } from "../../store/useAccessTokenState";
import api from "../../axiosConfig";

const WorkRoomDetail = () => {
  const { workroom } = useParams();
  
  const {accessToken, setAccessToken} = useAccessToken()
  useEffect(()=> {
    const WorkRoomDetailData = async () => {
      try {
        //access token 확인
        if (!accessToken) {
          const storedAccessToken = localStorage.getItem("accessToken");
          if (storedAccessToken) {
            setAccessToken(storedAccessToken);
          }
        }

        const config = {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        };

        const res = await api.get(`/workroom/detail?id=${workroom}`, config)
        console.log(res);
      } catch (error) {
        const err = error as AxiosError;
        if (!err.response) {
          console.log("response가 없습니다.");
        } else {
          console.log(err);
          console.warn(`error: ${err.message}`);
        }
      }
    };
    WorkRoomDetailData();
  })
  return (
    <div className={style.layout}>
      <div className={style.content}>
        <div className={style.breadcrum}>
          <p>근무방 목록 {">"} 인터라켓PC</p>
        </div>
        <div className={style["workroom-info-contnent"]}>
          <div className={style["include-box"]}>
            <div>주휴수당</div>
            {/* {props.nightInclude && <div>주휴수당</div>}
          {props.overtimeInclude && <div>연휴수당</div>}
          {props.weeklyInclude && <div>야근수당</div>} */}
          </div>
          <div className={style["workroom-info"]}>
            <h1>인터라켓PC</h1>
            <button className={style["user-edit-button"]}>정보 수정</button>
          </div>
        </div>
        <div className={style["worker-list"]}>
          <div className={style.info}>
            <div>
              <h2>근무자 목록</h2>
              <p>근무자 선택후, 근무자의 정보를 자세히 보실 수 있습니다.</p>
            </div>
            <button>근무자 등록</button>
          </div>
          <div className={style["list-info"]}>
            <p>이름</p>
            <p>나이</p>
            <p>성별</p>
            <p>전화번호</p>
          </div>
          <div className={style.list}>
            <ul>
              <li>
                <p>김서우</p>
                <p>21세</p>
                <p>여</p>
                <p>010-1234-5678</p>
              </li>
              <li>
                <p>이름</p>
                <p>나이</p>
                <p>성별</p>
                <p>전화번호</p>
              </li>
              <li>
                <p>이름</p>
                <p>나이</p>
                <p>성별</p>
                <p>전화번호</p>
              </li>
              <li>
                <p>이름</p>
                <p>나이</p>
                <p>성별</p>
                <p>전화번호</p>
              </li>
            </ul>
          </div>
        </div>
        <div className={style["workroom-del-btn"]}>
          <button>근무방 삭제</button>
        </div>
      </div>
    </div>
  );
};

export default WorkRoomDetail;
