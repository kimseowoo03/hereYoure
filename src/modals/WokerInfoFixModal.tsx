import { useParams } from "react-router-dom";
import useUIState from "../store/useUIState";
import { AxiosError } from "axios";

import useInput from "../hooks/useInput";
import { useState } from "react";
import api from "../axiosConfig";
import { useAccessToken } from "../store/useAccessTokenState";
import WorkerModal from "./WorkerModal";

const WorkerInfoFixModal = () => {
  const { workroom } = useParams();
  const { setWorkerInfoFixModalOpen } = useUIState();
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

      //API 수정 연동

      // if (res.data.result) {
        // setWorkerInfoFixModalOpen()
      //   window.location.reload();
      // }
    } catch (error) {
      const err = error as AxiosError;
      if (!err.response) {
        console.log("response가 없습니다.");
      } else {
        console.warn(`error: ${err.message}`);
      }
    }
  };

  const workerModalProps = {
    modalTitle: "근무자 수정",
    name,
    age,
    gender,
    password,
    phoneNumber,
    bankInfo,
    wage,
    isFormValid,
    submitButtonName: "변경하기",
    handlerNameBlur,
    handlerAgeBlur,
    handlerPasswordBlur,
    handlerPhoneNumberBlur,
    handlerBankBlur,
    handlerWageBlur,
    handleGenderClick,
    handleSubmit,
    cancelModalState: setWorkerInfoFixModalOpen,
  };

  return <WorkerModal {...workerModalProps} />;
};

export default WorkerInfoFixModal;
