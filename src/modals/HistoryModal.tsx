import Input from "../components/Input";
import BaseModal from "./BaseModal";

import style from "../styles/modals/HistoyModal.module.scss";
import { ReactComponent as CancelIcon } from "../assets/cancel.svg";
import useInput, { UseInputReturn } from "../hooks/useInput";
import Button from "../components/Button";
import AllowanceItem from "../components/Worker/AllowanceItem";

interface IHistoryModal {
  title: string;
  date: UseInputReturn;
  wage: UseInputReturn;
  startTime: UseInputReturn;
  endTime: UseInputReturn;
  submitButtonName: string;
  include: boolean;
  isFormVaild: boolean;
  HistoryDateBlur: () => void;
  HistoryTimeBlur: () => void;
  handlerWageBlur: () => void;
  handleRadioChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handlerSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  cancelModalState: () => void;
}

const HistoryModal: React.FC<IHistoryModal> = ({
  title,
  date,
  wage,
  startTime,
  endTime,
  submitButtonName,
  include,
  isFormVaild,
  HistoryDateBlur,
  HistoryTimeBlur,
  handlerWageBlur,
  handleRadioChange,
  handlerSubmit,
  cancelModalState,
}) => {
  

  return (
    <BaseModal>
      <div className={style.content}>
        <h2>{title}</h2>
        <form className={style.form} onSubmit={handlerSubmit}>
          <Input
            type={"date"}
            label={"근무 날짜"}
            value={date.value}
            onChange={date.onChange}
            placeholder={"날짜 선택"}
            autoComplete={"off"}
            onBlur={HistoryDateBlur}
          />
          {date.errorText && !date.inputVaild && (
            <p className={style.alert}>{date.errorText}</p>
          )}
          <div className={style["custom-time"]}>
            <label>근무 시간</label>
            <div className={style["custom-time-input"]}>
              <input
                type="time"
                name="startTime"
                value={startTime.value}
                onChange={startTime.onChange}
                onBlur={HistoryTimeBlur}
              />
              <span>-</span>
              <input
                type="time"
                name="endTime"
                value={endTime.value}
                onChange={endTime.onChange}
                onBlur={HistoryTimeBlur}
              />
            </div>
          </div>
          {startTime.inputTouched &&
              !startTime.inputVaild &&
              endTime.inputTouched &&
              !endTime.inputVaild && (
                <p className={style.alert}>근무 시간을 입력해주세요.</p>
              )}
          <Input
            type="text"
            label="시급"
            value={wage.value}
            onChange={wage.onChange}
            placeholder="시급 입력"
            autoComplete="off"
            onBlur={handlerWageBlur}
          />
          {wage.inputTouched && !wage.inputVaild && (
            <p className={style.alert}>시급을 입력해주세요.</p>
          )}
          <div>
            <AllowanceItem
              handleRadioChange={handleRadioChange}
              include={include}
              name="deputy-work"
              label="대리출근 여부"
              text="출근"
              notText="미출근"
            />
            <p className={style.message}>
              대리출근은 주휴수당에 포함되지 않습니다.
            </p>
          </div>

          <div className={style["button-div"]}>
            <Button
              children={"취소"}
              type={"button"}
              isCancel={true}
              onClick={cancelModalState}
            />
            <Button children={submitButtonName} type={"submit"} disabled={!isFormVaild} />
          </div>
        </form>
        <div className={style["cancel-icon"]} onClick={cancelModalState}>
          <CancelIcon />
        </div>
      </div>
    </BaseModal>
  );
};

export default HistoryModal;
