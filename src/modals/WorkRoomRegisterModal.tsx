import { useState } from "react";

import CopyToClipboard from "react-copy-to-clipboard";
import Input from "../components/Input";
import useInput from "../hooks/useInput";
import style from "../styles/modals/WorkRoomRegister.module.scss";
import BaseModal from "./BaseModal";
import Button from "../components/Button";
import useUIState from "../store/useUIState";

const WorkRoomRegisterModal = () => {
  const [taxSelect, setTaxSelect] = useState(false);
  const [taxSelectedValue, setTaxSelectedValue] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [weeklyInclude, setWeeklyInclude] = useState(false);
  const [overtimeInclude, setOvertimeInclude] = useState(false);
  const [nightInclude, setNightInclude] = useState(false);

  const WorkRoomName = useInput("");
  const WorkRoomPassword = useInput("");

  const { setRegisterModalOpen } = useUIState();

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const name = event.target.name;
    switch (name) {
      case "weekly-allowance":
        setWeeklyInclude(value === "include");
        break;
      case "overtime-pay":
        setOvertimeInclude(value === "include");
        break;
      case "night-allowance":
        setNightInclude(value === "include");
        break;
      default:
        break;
    }
  };

  const handleTaxSelectedClick = (
    event: React.MouseEvent<HTMLLIElement, MouseEvent>
  ) => {
    setTaxSelectedValue(event.currentTarget.innerText);
    setTaxSelect(!taxSelect);
  };

  const handleWorkRoomPasswordBlur = () => {
    let reg = /^(?=.*[a-z])(?=.*\d)[a-zA-Z\d]{10,}$/;
    setIsPasswordValid(reg.test(WorkRoomPassword.value.toString()));
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(
      WorkRoomName.value,
      "/",
      WorkRoomPassword.value,
      "/",
      taxSelectedValue,
      "/",
      "수당 여부",
      weeklyInclude,
      overtimeInclude,
      nightInclude
    );
  };
  return (
    <BaseModal>
      <div className={style.content}>
        <h2>근무방 등록</h2>
        <form className={style.form} onSubmit={handleFormSubmit}>
          <Input
            type={"text"}
            label={"근무방 이름"}
            value={WorkRoomName.value}
            onChange={WorkRoomName.onChange}
            placeholder={"근무방 이름 입력"}
            autoComplete={"off"}
          />
          <Input
            type={"text"}
            label={"근무방 비밀번호"}
            value={WorkRoomPassword.value}
            onChange={WorkRoomPassword.onChange}
            placeholder={"근무방에 접속할 때 필요한 비밀번호 입력"}
            autoComplete={"off"}
            onBlur={handleWorkRoomPasswordBlur}
          />
          {!isPasswordValid && (
            <p className={style.alert}>
              10자 이상, 영문 대 소문자, 숫자를 사용하세요.
            </p>
          )}
          <CopyToClipboard
            text={String(WorkRoomPassword.value)}
            onCopy={() =>
              alert(`근무방 비밀번호${WorkRoomPassword.value}가 복사됐습니다.`)
            }
          >
            <button type={"button"} className={style["inner-button"]}>
              복사
            </button>
          </CopyToClipboard>
          <div className={style["tax-content"]}>
            <p>세금</p>
            <div className={style["tax-select-box"]}>
              <button type="button" onClick={() => setTaxSelect(!taxSelect)}>
                {taxSelectedValue.length ? (
                  taxSelectedValue
                ) : (
                  <span>필수 입력</span>
                )}
                <img
                  src={
                    taxSelect ? "/images/upIcon.png" : "/images/downIcon.png"
                  }
                />
              </button>
              <ul className={taxSelect ? style["tax-select-list"] : style.none}>
                <li onClick={handleTaxSelectedClick}>개인사업자 3.3%</li>
                <li onClick={handleTaxSelectedClick}>4대보험 9.4%</li>
                <li onClick={handleTaxSelectedClick}>적용 안함 0.0%</li>
              </ul>
            </div>
          </div>
          <div className={style["allowance-content"]}>
            <div className={style.allowance}>
              <label>주휴수당</label>
              <div className={style.radio}>
                <input
                  type="radio"
                  name="weekly-allowance"
                  value="not-include"
                  onChange={handleRadioChange}
                  checked={weeklyInclude === false}
                />
                미포함
                <input
                  type="radio"
                  name="weekly-allowance"
                  value="include"
                  onChange={handleRadioChange}
                />
                포함
              </div>
              <div
                className={
                  weeklyInclude ? style["description-box"] : style.none
                }
              >
                <p>(1주일 총 일한시간 / 40시간) x 8 x 시급</p>
              </div>
            </div>
            <div className={style.allowance}>
              <label>연장수당</label>
              <div className={style.radio}>
                <input
                  type="radio"
                  name="overtime-pay"
                  value="not-include"
                  onChange={handleRadioChange}
                  checked={overtimeInclude === false}
                />
                미포함
                <input
                  type="radio"
                  name="overtime-pay"
                  value="include"
                  onChange={handleRadioChange}
                />
                포함
              </div>
              <div
                className={
                  overtimeInclude ? style["description-box"] : style.none
                }
              >
                <p>(연장 근무 시간 X 계약시급) x 1.5</p>
              </div>
            </div>
            <div className={style.allowance}>
              <label>야간수당</label>
              <div className={style.radio}>
                <input
                  type="radio"
                  name="night-allowance"
                  value="not-include"
                  onChange={handleRadioChange}
                  checked={nightInclude === false}
                />
                미포함
                <input
                  type="radio"
                  name="night-allowance"
                  value="include"
                  onChange={handleRadioChange}
                />
                포함
              </div>
              <div
                className={nightInclude ? style["description-box"] : style.none}
              >
                <p>(야간 근무 시간 X 계약시급) x 1.5</p>
              </div>
            </div>
          </div>
          <div className={style["button-div"]}>
                <Button
                  children={"취소"}
                  type={"button"}
                  isCancel={true}
                  onClick={setRegisterModalOpen}
                />
                <Button children={"등록하기"} type={"submit"} />
              </div>
        </form>
      </div>
    </BaseModal>
  );
};

export default WorkRoomRegisterModal;
