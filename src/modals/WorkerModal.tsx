import BaseModal from "./BaseModal";
import style from "../styles/modals/WorkerRegisterModal.module.scss";
import Button from "../components/Button";

import { ReactComponent as CancelIcon } from "../assets/cancel.svg";
import Input from "../components/Input";
import { UseInputReturn } from "../hooks/useInput";

interface IWorkerModalProps {
  modalTitle: string;
  name: UseInputReturn;
  age: UseInputReturn;
  gender: boolean;
  password: UseInputReturn;
  phoneNumber: UseInputReturn;
  bankInfo: UseInputReturn;
  wage: UseInputReturn;
  isFormValid: boolean;
  submitButtonName: string;
  handlerNameBlur: () => void;
  handlerAgeBlur: () => void;
  handlerPasswordBlur: () => void;
  handlerPhoneNumberBlur: () => void;
  handlerBankBlur: () => void;
  handlerWageBlur: () => void;
  handleGenderClick: (selectedGender: string) => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  cancelModalState: () => void;
}

const WorkerModal = ({
  modalTitle,
  name,
  age,
  gender,
  password,
  phoneNumber,
  bankInfo,
  wage,
  isFormValid,
  submitButtonName,
  handlerNameBlur,
  handlerAgeBlur,
  handlerPasswordBlur,
  handlerPhoneNumberBlur,
  handlerBankBlur,
  handlerWageBlur,
  handleGenderClick,
  handleSubmit,
  cancelModalState,
}: IWorkerModalProps) => {
  return (
    <BaseModal>
      <div className={style.content}>
        <h2>{modalTitle}</h2>
        <form className={style.form} onSubmit={handleSubmit}>
          <div className={style["form-content"]}>
            <Input
              type={"text"}
              label={"이름"}
              value={name.value}
              onChange={name.onChange}
              placeholder={"근무자 이름 입력"}
              autoComplete={"off"}
              onBlur={handlerNameBlur}
            />
            {name.inputTouched && !name.inputVaild && (
              <p className={style.alert}>이름을 입력해주세요.</p>
            )}
            <div className={style["age-gender-box"]}>
              <Input
                type={"text"}
                label={"나이"}
                value={age.value}
                onChange={age.onChange}
                placeholder={"ex) 24"}
                autoComplete={"off"}
                onBlur={handlerAgeBlur}
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
              {age.inputTouched && !age.inputVaild && (
                <p className={style.alert}>{age.errorText}</p>
              )}
            </div>
            <Input
              type={"text"}
              label={"전용 숫자 비밀번호"}
              value={password.value}
              onChange={password.onChange}
              placeholder={"4자리"}
              autoComplete={"off"}
              maxLength={4}
              onBlur={handlerPasswordBlur}
            />
            {password.inputTouched && !password.inputVaild && (
              <p className={style.alert}>{password.errorText}</p>
            )}
            <Input
              type={"text"}
              label={"전화번호"}
              value={phoneNumber.value}
              onChange={phoneNumber.onChange}
              placeholder={"숫자 번호만 입력해주세요"}
              autoComplete={"off"}
              maxLength={11}
              onBlur={handlerPhoneNumberBlur}
            />
            {phoneNumber.inputTouched && !phoneNumber.inputVaild && (
              <p className={style.alert}>{phoneNumber.errorText}</p>
            )}
            <Input
              type={"text"}
              label={"은행과 계좌번호"}
              value={bankInfo.value}
              onChange={bankInfo.onChange}
              placeholder={"ex) 근무자은행 1234567890912"}
              autoComplete={"off"}
              onBlur={handlerBankBlur}
            />
            {bankInfo.inputTouched && !bankInfo.inputVaild && (
              <p className={style.alert}>{bankInfo.errorText}</p>
            )}
            <Input
              type={"text"}
              label={"시급"}
              value={wage.value}
              onChange={wage.onChange}
              placeholder={"9620"}
              autoComplete={"off"}
              onBlur={handlerWageBlur}
            />
            {wage.inputTouched && !wage.inputVaild && (
              <p className={style.alert}>{wage.errorText}</p>
            )}
          </div>
          <div className={style["button-div"]}>
            <Button
              children={"취소"}
              type={"button"}
              isCancel={true}
              onClick={cancelModalState}
            />
            <Button
              children={submitButtonName}
              type={"submit"}
              disabled={!isFormValid}
            />
          </div>
        </form>
        <div onClick={cancelModalState} className={style["cancel-icon"]}>
          <CancelIcon />
        </div>
      </div>
    </BaseModal>
  );
};

export default WorkerModal;
