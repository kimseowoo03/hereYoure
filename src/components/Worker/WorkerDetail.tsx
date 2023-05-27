import { Fragment, useEffect, useState } from "react";
import style from "../../styles/Worker/WorkerDetail.module.scss";
import HistoryCard from "./HistoryCard";
import WorkerInfoCards from "./WorkerInfoCards";
import api from "../../axiosConfig";
import { useAccessToken } from "../../store/useAccessTokenState";
import { useParams } from "react-router-dom";
import DateDropdown from "./DateDropdown";
import useUIState from "../../store/useUIState";
import WorkerInfoFixModal from "../../modals/WokerInfoFixModal";
import { IWORKER_DATA } from "../WrokRoom/WorkRoomDetail";
import { EmptyDataContainer } from "../UI/EmptyDataContainer";

export interface IWORKER_HISTORY {
  date: string;
  startTime: string;
  endTime: string;
  wage: string;
  cover: number;
  workerId: number;
}

const WORKER_HISTORY_DATA: IWORKER_HISTORY[] = [
  {
    date: "2023-05-17",
    startTime: "11:00",
    endTime: "16:30",
    wage: "9620",
    cover: 0,
    workerId: 1,
  },
  {
    date: "2023-05-17",
    startTime: "11:00",
    endTime: "16:30",
    wage: "9620",
    cover: 0,
    workerId: 1,
  },
  {
    date: "2023-05-17",
    startTime: "11:00",
    endTime: "16:30",
    wage: "9620",
    cover: 0,
    workerId: 1,
  },
  {
    date: "2023-05-17",
    startTime: "11:00",
    endTime: "16:30",
    wage: "9620",
    cover: 0,
    workerId: 1,
  },
  {
    date: "2023-05-17",
    startTime: "11:00",
    endTime: "16:30",
    wage: "9620",
    cover: 0,
    workerId: 1,
  },
  {
    date: "2023-05-17",
    startTime: "11:00",
    endTime: "16:30",
    wage: "9620",
    cover: 0,
    workerId: 1,
  },
  {
    date: "2023-05-17",
    startTime: "11:00",
    endTime: "16:30",
    wage: "9620",
    cover: 0,
    workerId: 1,
  },
  {
    date: "2023-05-17",
    startTime: "11:00",
    endTime: "16:30",
    wage: "9620",
    cover: 0,
    workerId: 1,
  },
];

const WorkerDetail = () => {
  const { workerid } = useParams();
  const { accessToken, setAccessToken } = useAccessToken();
  const [userInfoData, setUserInfoData] = useState<IWORKER_DATA>({} as IWORKER_DATA);
  const [userHistoryData, setUserHistoryData] = useState<IWORKER_HISTORY[]>();

  const { workerInfoFixModalOpen, setWorkerInfoFixModalOpen } = useUIState();

  useEffect(() => {
    const WokerDetailData = async () => {
      try {
        //근무자 상세데이터 조회
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
        const res = await api.get(`/worker?id=${workerid}&month=${"5"}`, config);
        if(res.data.result){
          const { worker, histories } = res.data.data;
          console.log(worker)
          setUserInfoData(worker)
          setUserHistoryData(histories)
        }
      } catch (error) {}
    };
    WokerDetailData();
  }, [accessToken, setAccessToken, workerid]);

  return (
    <Fragment>
      {workerInfoFixModalOpen && <WorkerInfoFixModal {...userInfoData} />}
      <div className={style.layout}>
        <div className={style.content}>
          <div className={style.breadcrum}>
            <p>
              근무방 목록 {">"} 인터라켓PC{">"} 근무정보
            </p>
          </div>
          <article>
            <section>
              <div className={style["worker-info"]}>
                <h1>
                  <span>{userInfoData ? userInfoData.name : "..."}</span>님
                  근무정보
                </h1>
                <button
                  className={style["user-edit-button"]}
                  onClick={setWorkerInfoFixModalOpen}
                >
                  정보 수정
                </button>
              </div>
              <WorkerInfoCards {...userInfoData} />
            </section>
            <section>
              <div className={style["work-info"]}>
                <h2>근무정보</h2>
                <DateDropdown />
              </div>
              <div className={style["work-content"]}>
                <div className={style["work-header"]}>
                  <div>
                    <p>전체선택</p>
                    <button className={style["work-delete-button"]}>
                      삭제
                    </button>
                  </div>
                  <button className={style["work-register-button"]}>
                    근무등록
                  </button>
                </div>
                <div className={style["work-list-info"]}>
                  <p>근무날짜</p>
                  <p>근무시간</p>
                  <p>시급</p>
                  <p>대리출근</p>
                </div>
                <ul className={style["work-list-contnet"]}>
                  {userHistoryData &&
                    (userHistoryData.length === 0 ? (
                      <EmptyDataContainer message="등록된 근무정보가 없습니다." />
                    ) : (
                      userHistoryData.map((history, index) => {
                        return <HistoryCard key={index} {...history} />;
                      })
                    ))}
                </ul>
              </div>
            </section>
          </article>
        </div>
      </div>
    </Fragment>
  );
};
export default WorkerDetail;
