import { useParams } from "react-router-dom";
import BaseModal from "./BaseModal";
import style from "../styles/modals/WorkerRegisterModal.module.scss";
import Button from "../components/Button";
import useUIState from "../store/useUIState";
import { AxiosError } from "axios";

import { ReactComponent as CancelIcon } from "../assets/cancel.svg";
import Input from "../components/Input";
import useInput from "../hooks/useInput";
import { useState } from "react";
import api from "../axiosConfig";
import { useAccessToken } from "../store/useAccessTokenState";

const WorkerRegisterModal = () => {
  const { workroom } = useParams();
  const { setWorkerRegisterModalOpen } = useUIState();
  const { accessToken } = useAccessToken();

  const name = useInput("");
  const age = useInput("");
  const [gender, setGender] = useState(false);
  const password = useInput("");
  const phoneNumber = useInput("");
  const bankInfo = useInput("");
  const wage = useInput("");

  const isFormValid =
    name.inputVaild &&
    age.inputVaild &&
    password.inputVaild &&
    phoneNumber.inputVaild &&
    bankInfo.inputVaild &&
    wage.inputVaild;

  const handlerNameBlur = () => {
    if (!name.value.toString().trim()) {
      name.checkVaild(false);
      name.onBlurTouch(true);
    } else {
      name.checkVaild(true);
    }
  };

  const handlerAgeBlur = () => {
    const ageValue = age.value.toString().trim();

    if (!ageValue) {
      age.setErrorMessage("나이를 입력해주세요");
    } else if (!/^\d+$/.test(ageValue) || Number(ageValue) < 0) {
      age.setErrorMessage("0 이상의 숫자만 입력해주세요");
    } else {
      age.checkVaild(true);
      return;
    }

    age.checkVaild(false);
    age.onBlurTouch(true);
  };

  const handlerPasswordBlur = () => {
    const accountNumberValue = password.value.toString().trim();

    if (!accountNumberValue) {
      password.setErrorMessage("비밀번호를 입력해주세요");
    } else if (
      !/^\d+$/.test(accountNumberValue) ||
      accountNumberValue.length !== 4
    ) {
      password.setErrorMessage("숫자 4자리를 입력해주세요.");
    } else {
      password.checkVaild(true);
      return;
    }

    password.checkVaild(false);
    password.onBlurTouch(true);
  };

  const handlerPhoneNumberBlur = () => {
    const phoneNumberValue = phoneNumber.value.toString().trim();
    if (!phoneNumberValue) {
      phoneNumber.setErrorMessage("전화번호를 입력해주세요.");
    } else if (
      !/^\d+$/.test(phoneNumberValue) ||
      phoneNumberValue.length !== 11
    ) {
      phoneNumber.setErrorMessage("숫자 11자리를 입력해주세요.");
    } else {
      phoneNumber.checkVaild(true);
      return;
    }

    phoneNumber.checkVaild(false);
    phoneNumber.onBlurTouch(true);
  };

  const handlerBankBlur = () => {
    const trimmedBankInfo = bankInfo.value.toString().trim();
    bankInfo.onBlurTouch(true);

    if (!trimmedBankInfo) {
      bankInfo.setErrorMessage("은행과 계좌번호를 입력해주세요.");
      bankInfo.checkVaild(false);
      return;
    }

    const parts = trimmedBankInfo.split(" ");

    if (parts.length === 1) {
      bankInfo.checkVaild(false);
      bankInfo.setErrorMessage("띄어쓰기가 필요합니다.");
      return;
    }

    const [bankName, accountNumber] = parts;

    if (!/^\d+$/.test(accountNumber)) {
      bankInfo.checkVaild(false);
      bankInfo.setErrorMessage("계좌번호는 숫자로만 구성해주세요.");
      return;
    }
    bankInfo.checkVaild(true);
  };

  const handlerWageBlur = () => {
    const wageValue = wage.value.toString().trim();
    if (!wageValue) {
      wage.setErrorMessage("시급을 입력해주세요.");
    } else if (!/^\d+$/.test(wageValue)) {
      wage.setErrorMessage("숫자로만 입력해주세요.");
    } else {
      wage.checkVaild(true);
      return;
    }

    wage.checkVaild(false);
    wage.onBlurTouch(true);
  };

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
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const [bankName, accountNumber] = bankInfo.value.toString().split(" ");
    try {
      const data = {
        name: name.value,
        age: Number(age.value),
        gender: gender ? "female" : "male",
        phoneNumber: phoneNumber.value,
        password: password.value,
        accountNumber: accountNumber,
        bank: bankName,
        wage: wage.value,
        workroomId: workroom,
      };

      const config = {
        headers: { Authorization: `Bearer ${accessToken}` },
      };

      const res = await api.post("/worker", data, config);

      if (res.data.result) {
        window.location.reload();
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

  return (
    <BaseModal>
      <div className={style.content}>
        <h2>근무자 등록</h2>
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
              onClick={setWorkerRegisterModalOpen}
            />
            <Button
              children={"등록하기"}
              type={"submit"}
              disabled={!isFormValid}
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
