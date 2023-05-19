import style from "../../styles/Worker/WorkerDetail.module.scss";
import HistoryCard from "./HistoryCard";
import WorkerInfoCards from "./WorkerInfoCards";

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
  return (
    <div className={style.layout}>
      <div className={style.content}>
        <div className={style.breadcrum}>
          <p>
            근무방 목록 {">"} 인터라켓PC{">"}근무정보
          </p>
        </div>
        <article>
          <section>
            <div className={style["worker-info"]}>
              <h1>
                <span>김서우</span>님 근무정보
              </h1>
              <button className={style["user-edit-button"]}>정보 수정</button>
            </div>
            <WorkerInfoCards />
          </section>
          <section>
            <div className={style["work-info"]}>
              <h2>근무정보</h2>
              <div>날짜 드롭다운</div>
            </div>
            <div className={style["work-content"]}>
              <div className={style["work-header"]}>
                <div>
                  <p>전체선택</p>
                  <button className={style["work-delete-button"]}>삭제</button>
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
                {WORKER_HISTORY_DATA.map((history, index) => {
                  return <HistoryCard key={index} {...history} />;
                })}
              </ul>
            </div>
          </section>
        </article>
      </div>
    </div>
  );
};
export default WorkerDetail;
