import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { AxiosError } from "axios";
import style from "../../styles/WorkRoom/WorkRoom.module.scss";
import { useAccessToken } from "../../store/useAccessTokenState";
import api from "../../axiosConfig";
import WorkerCard from "./WorkerCard";

export interface IWORKER_DATA {
  id: number;
  name: string;
  age: number;
  gender: string;
  phoneNumber: string;
  accountNumber?: string;
  bank?: string;
  wage?: string;
  createAt?: string;
}

const WORKERDATA:IWORKER_DATA[] = [
  {
    id: 1,
    name: "김서우",
    age: 21,
    gender: "여",
    phoneNumber: "01012345611",
  },
  {
    id: 2,
    name: "김서우",
    age: 21,
    gender: "여",
    phoneNumber: "01012345611",
  },
  {
    id: 3,
    name: "김서우",
    age: 21,
    gender: "여",
    phoneNumber: "01012345611",
  },
  {
    id: 4,
    name: "김서우",
    age: 21,
    gender: "여",
    phoneNumber: "01012345611",
  },
];

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
              {WORKERDATA.map((worker) => {
                return (
                  <WorkerCard
                    key={worker.id}
                    name={worker.name}
                    id={worker.id}
                    age={worker.age}
                    gender={worker.gender}
                    phoneNumber={worker.phoneNumber}
                  />
                );
              })}
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