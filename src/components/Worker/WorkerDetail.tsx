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

const WORKER_HISTORY_DATA:IWORKER_HISTORY[] = [
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
              <h1>인터라켓PC</h1>
              <button className={style["user-edit-button"]}>정보 수정</button>
            </div>
            <WorkerInfoCards />
          </section>
          <section>
            <div>
              <h2>근무정보</h2>
              <div>날짜 드롭다운</div>
            </div>
            <div>
              <div>
                <div>
                  <p>전체선택</p>
                  <button>삭제</button>
                </div>
                <button>근무등록</button>
              </div>
              <div>
                <p>근무날짜</p>
                <p>근무시간</p>
                <p>근무시급</p>
                <p>대리출근</p>
              </div>
              <ul>
                {WORKER_HISTORY_DATA.map((history) => {
                  return (
                    <HistoryCard {...history} />
                  );
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
