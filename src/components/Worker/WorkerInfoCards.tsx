import style from "../../styles/Worker/WorkerInfoCards.module.scss";

const WorkerInfoCards = () => {
  return (
    <div className={style["worker-info-cards"]}>
      <div>급여액</div>
      <div>근무자정보</div>
      <div>급여상세설정</div>
    </div>
  );
};

export default WorkerInfoCards;
