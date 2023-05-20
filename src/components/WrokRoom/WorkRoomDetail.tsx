import { Fragment, useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";

import { AxiosError } from "axios";
import style from "../../styles/WorkRoom/WorkRoom.module.scss";
import { useAccessToken } from "../../store/useAccessTokenState";
import api from "../../axiosConfig";
import WorkerCard from "./WorkerCard";
import useUIState from "../../store/useUIState";
import WorkerRegisterModal from "../../modals/WorkerRegisterModal";
import WorkroomInfoFixModal from "../../modals/WorkroomInfoFixModal";
import { EmptyDataContainer } from "../UI/EmptyDataContainer";

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

interface IWorkRoomDetail_Data {
  id: number;
  title: string;
  tax: number;
  weeklyPay: number;
  overtimePay: number;
  nightPay: number;
  workers: IWORKER_DATA[];
}

const WorkRoomDetail = () => {
  const { workroom } = useParams();
  const [workroomDetailData, setWorkroomDetailData] =
    useState<IWorkRoomDetail_Data>();

  const workroomName = useMemo(
    () => workroomDetailData?.title || "...",
    [workroomDetailData]
  );
  const weeklyPay = useMemo(
    () => workroomDetailData?.weeklyPay || 0,
    [workroomDetailData]
  );
  const overtimePay = useMemo(
    () => workroomDetailData?.overtimePay || 0,
    [workroomDetailData]
  );
  const nightPay = useMemo(
    () => workroomDetailData?.nightPay || 0,
    [workroomDetailData]
  );

  const {
    workerRegisterModalOpen,
    setWorkerRegisterModalOpen,
    workroomEditModalOpen,
    setWorkroomEditModalOpen,
  } = useUIState();

  const { accessToken, setAccessToken } = useAccessToken();
  useEffect(() => {
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

        const res = await api.get(`/workroom/detail?id=${workroom}`, config);
        if (res.data.result) {
          setWorkroomDetailData(res.data.data);
        }
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
  }, [accessToken, setAccessToken, workroom]);

  return (
    <Fragment>
      {workerRegisterModalOpen && <WorkerRegisterModal />}
      {workroomEditModalOpen && <WorkroomInfoFixModal />}
      <div className={style.layout}>
        <div className={style.content}>
          <div className={style.breadcrum}>
            <p>
              근무방 목록 {">"} {workroomName}
            </p>
          </div>
          <div className={style["workroom-info-contnent"]}>
            <div className={style["include-box"]}>
              {weeklyPay === 1 && <div>주휴수당</div>}
              {overtimePay === 1 && <div>연장수당</div>}
              {nightPay === 1 && <div>야간수당</div>}
            </div>
            <div className={style["workroom-info"]}>
              <h1>{workroomName}</h1>
              <button
                className={style["user-edit-button"]}
                onClick={setWorkroomEditModalOpen}
              >
                정보 수정
              </button>
            </div>
          </div>
          <div className={style["worker-list"]}>
            <div className={style.info}>
              <div>
                <h2>근무자 목록</h2>
                <p>근무자 선택후, 근무자의 정보를 자세히 보실 수 있습니다.</p>
              </div>
              <button onClick={setWorkerRegisterModalOpen}>근무자 등록</button>
            </div>
            <div className={style["list-info"]}>
              <p>이름</p>
              <p>나이</p>
              <p>성별</p>
              <p>전화번호</p>
            </div>
            <div className={style.list}>
              <ul>
                {workroomDetailData &&
                  (workroomDetailData.workers.length === 0 ? (
                    <EmptyDataContainer message="등록된 근무자가 없습니다."/>
                  ) : (
                    workroomDetailData.workers.map((worker) => (
                      <WorkerCard
                        key={worker.id}
                        name={worker.name}
                        id={worker.id}
                        age={worker.age}
                        gender={worker.gender}
                        phoneNumber={worker.phoneNumber}
                      />
                    ))
                  ))}
              </ul>
            </div>
          </div>
          <div className={style["workroom-del-btn"]}>
            <button>근무방 삭제</button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default WorkRoomDetail;
