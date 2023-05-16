import BaseModal from "./BaseModal";
import style from "../styles/modals/WorkerRegisterModal.module.scss";
import Button from "../components/Button";
import useUIState from "../store/useUIState";

import { ReactComponent as CancelIcon } from "../assets/cancel.svg";
import Input from "../components/Input";
import useInput from "../hooks/useInput";
import { useState } from "react";

const WorkerRegisterModal = () => {
  const { setWorkerRegisterModalOpen } = useUIState();

  const name = useInput("");
  const age = useInput("");
  const [gender, setGender] = useState(false);
  const accountNumber = useInput("");
  const phoneNumber = useInput("");
  const bank =  useInput("");
  const wage = useInput("");

  //성별 핸들러
  const handleGenderClick = (selectedGender: string) => {
    switch (selectedGender) {
      case "male":
        setGender(false);
        break;   
        case "female":
          setGender(true);
        break;   
      default:
        break;
    }
  }

  return (
    <BaseModal>
      <div className={style.content}>
        <h2>근무자 등록</h2>
        <form className={style.form}>
          <div className={style["form-content"]}>
            <Input
              type={"text"}
              label={"이름"}
              value={name.value}
              onChange={name.onChange}
              placeholder={"근무자 이름 입력"}
              autoComplete={"off"}
            />
            <div className={style["age-gender-box"]}>
              <Input
                type={"number"}
                label={"나이"}
                value={age.value}
                onChange={age.onChange}
                placeholder={"ex) 24"}
                autoComplete={"off"}
                maxLength={2}
              />
              <div className={style["gender-box"]}>
                <div
                  className={gender ? "" : style["selected-gender"]}
                  onClick={() => handleGenderClick("male")}
                >
                  남자
                </div>
                <div
                  className={gender ? style["selected-gender"] : ""}
                  onClick={() => handleGenderClick("female")}
                >
                  여자
                </div>
              </div>
            </div>
            <Input
              type={"number"}
              label={"전용 숫자 비밀번호"}
              value={accountNumber.value}
              onChange={accountNumber.onChange}
              placeholder={"4자리"}
              autoComplete={"off"}
              maxLength={4}
            />
            <Input
              type={"text"}
              label={"전화번호"}
              value={phoneNumber.value}
              onChange={phoneNumber.onChange}
              placeholder={"숫자 번호만 입력해주세요"}
              autoComplete={"off"}
              maxLength={11}
            />
            <Input
              type={"text"}
              label={"은행과 계좌번호"}
              value={bank.value}
              onChange={bank.onChange}
              placeholder={"ex) 근무자은행 1234567890912"}
              autoComplete={"off"}
            />
            <Input
              type={"text"}
              label={"시급"}
              value={wage.value}
              onChange={wage.onChange}
              placeholder={"9620"}
              autoComplete={"off"}
            />
          </div>
          <div className={style["button-div"]}>
            <Button
              children={"취소"}
              type={"button"}
              isCancel={true}
              onClick={setWorkerRegisterModalOpen}
            />
            <Button
              children={"등록하기"}
              type={"submit"}
              // disabled={}
            />
          </div>
        </form>
        <div
          onClick={setWorkerRegisterModalOpen}
          className={style["cancel-icon"]}
        >
          <CancelIcon />
        </div>
      </div>
    </BaseModal>
  );
};

export default WorkerRegisterModal;
