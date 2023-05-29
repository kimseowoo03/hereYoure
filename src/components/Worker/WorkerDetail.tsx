import { Fragment, useEffect, useState } from "react";
import { AxiosError } from "axios";
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
import HistoryRegisterModal from "../../modals/HistoryRegisterModal";

export interface IWORKER_HISTORY {
  date: string;
  startTime: string;
  endTime: string;
  wage: string;
  cover: number;
  workerId: number;
}

const WorkerDetail = () => {
  const { workerid } = useParams();
  const { accessToken, setAccessToken } = useAccessToken();
  const [userInfoData, setUserInfoData] = useState<IWORKER_DATA>({} as IWORKER_DATA);
  const [userHistoryData, setUserHistoryData] = useState<IWORKER_HISTORY[]>();

  const { workerInfoFixModalOpen, setWorkerInfoFixModalOpen, historyRegisterModalOpen, setHistoryRegisterModalOpen } = useUIState();

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
        const res = await api.get(
          `/worker?id=${workerid}&month=${"5"}`,
          config
        );
        if (res.data.result) {
          const { worker, histories } = res.data.data;
          console.log(worker);
          setUserInfoData(worker);
          setUserHistoryData(histories);
        }
      } catch (error) {
        const err = error as AxiosError;
        if (!err.response) {
          console.log("response가 없습니다.");
        } else {
          console.warn(`error: ${err.message}`);
        }
      }
    };
    WokerDetailData();
  }, [accessToken, setAccessToken, workerid]);

  return (
    <Fragment>
      {workerInfoFixModalOpen && <WorkerInfoFixModal {...userInfoData} />}
      {historyRegisterModalOpen && userInfoData.wage !== undefined && (
        <HistoryRegisterModal wage={userInfoData.wage} id={userInfoData.id}/>
      )}
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
                  <button
                    className={style["work-register-button"]}
                    onClick={setHistoryRegisterModalOpen}
                  >
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
