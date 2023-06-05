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
import HistoryInfoFixModal from "../../modals/HistoryInfoFixModal";
import WorkerDeleteModal from "../../modals/WorkerDeleteModal";
import HistoryDeleteModal from "../../modals/HistoryDeleteModal";

export interface IWORKER_HISTORY {
  id: number;
  date: string;
  startTime: string;
  endTime: string;
  wage: string;
  cover: number;
  workerId?: number;
}

const WorkerDetail = () => {
  const { workerid } = useParams();
  const { accessToken, setAccessToken } = useAccessToken();
  const [userInfoData, setUserInfoData] = useState<IWORKER_DATA>(
    {} as IWORKER_DATA
  );
  const [userHistoryData, setUserHistoryData] = useState<IWORKER_HISTORY[]>([]);

  const {
    workerInfoFixModalOpen,
    setWorkerInfoFixModalOpen,
    historyRegisterModalOpen,
    setHistoryRegisterModalOpen,
    historyInfoFixModalOpen,
    historyId,
    setWokerDeleteModalOpen,
    wokerDeleteModalOpen,
    historyAllChecked,
    setHistoryAllChecked,
    historyDeleteModalOpen,
    setHistoryDeleteModalOpen,
    historyCheckedArray,
    dateSelected
  } = useUIState();

  const historyObject = userHistoryData.find((item) => item.id === historyId);

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
          `/worker?id=${workerid}&month=${dateSelected}`,
          config
        );
        if (res.data.result) {
          const { worker, histories } = res.data.data;
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
  }, [dateSelected]);

  return (
    <Fragment>
      {workerInfoFixModalOpen && <WorkerInfoFixModal {...userInfoData} />}
      {historyRegisterModalOpen && userInfoData.wage !== undefined && (
        <HistoryRegisterModal wage={userInfoData.wage} id={userInfoData.id} />
      )}
      {wokerDeleteModalOpen && (
        <WorkerDeleteModal id={userInfoData.id} name={userInfoData.name} />
      )}
      {historyInfoFixModalOpen && historyObject !== undefined && (
        <HistoryInfoFixModal wokerId={userInfoData.id} {...historyObject} />
      )}
      {historyDeleteModalOpen && (
        <HistoryDeleteModal wokerId={userInfoData.id} />
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
                {<DateDropdown workDates={userHistoryData} />}
              </div>
              <div className={style["work-content"]}>
                <div className={style["work-header"]}>
                  <div>
                    <input
                      type="checkbox"
                      checked={historyAllChecked}
                      onChange={setHistoryAllChecked}
                    />
                    <p>전체선택</p>
                    {historyCheckedArray.length !== 0 && <button
                      className={style["work-delete-button"]}
                      onClick={setHistoryDeleteModalOpen}
                    >
                      삭제
                    </button>}
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
                  {userHistoryData.length === 0 ? (
                    <EmptyDataContainer message="등록된 근무정보가 없습니다." />
                  ) : (
                    userHistoryData.map((history) => {
                      return <HistoryCard key={history.id} {...history} />;
                    })
                  )}
                </ul>
              </div>
            </section>
          </article>
          <div className={style["worker-del-btn"]}>
            <button onClick={setWokerDeleteModalOpen}>근무자 삭제</button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
export default WorkerDetail;
