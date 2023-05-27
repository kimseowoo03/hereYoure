import { useState, useMemo } from "react";
import useUIState from "../store/useUIState";
import { AxiosError } from "axios";

import useInput from "../hooks/useInput";
import api from "../axiosConfig";
import { useAccessToken } from "../store/useAccessTokenState";
import WorkerModal from "./WorkerModal";
import { IWORKER_DATA } from "../components/WrokRoom/WorkRoomDetail";

const WorkerInfoFixModal: React.FC<IWORKER_DATA> = ({
  id,
  accountNumber: currentAccountNumber,
  name: currentName,
  age: currentAge,
  gender: currentGender,
  wage: currentWage,
  bank: currentBank,
  phoneNumber: currentPhoneNumber,
}) => {
  const formattedGender = useMemo(
    () => (currentGender === "female" ? true : false),
    [currentGender]
  );

  const { setWorkerInfoFixModalOpen } = useUIState();
  const { accessToken } = useAccessToken();

  const name = useInput(currentName);
  const age = useInput(currentAge);
  const [gender, setGender] = useState(formattedGender);
  const password = useInput("");
  const phoneNumber = useInput(currentPhoneNumber);
  const bankInfo = useInput(`${currentBank} ${currentAccountNumber}`);
  const wage = useInput(currentWage ? currentWage : "");

  const isFormValid =
    name.inputVaild &&
    age.inputVaild &&
    password.inputVaild &&
    phoneNumber.inputVaild &&
    bankInfo.inputVaild &&
    wage.inputVaild;

  const handlerNameBlur = () => {
    const trimmedValue = name.value.toString().trim();

    if (!trimmedValue) {
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
    const formattedGender = gender === false ? "male" : "female";

    try {
      const data = {
        id: id,
        name: name.value !== currentName ? name.value : undefined,
        age: age.value !== currentAge ? Number(age.value) : undefined,
        gender:
          formattedGender !== currentGender
            ? gender
              ? "female"
              : "male"
            : undefined,
        phoneNumber:
          phoneNumber.value !== currentPhoneNumber
            ? phoneNumber.value
            : undefined,
        accountNumber:
          accountNumber !== currentAccountNumber ? accountNumber : undefined,
        bank: bankName !== currentBank ? bankName : undefined,
        wage: wage.value !== currentWage ? wage.value : undefined,
      };

      const filteredData = {
        ...Object.fromEntries(
          Object.entries(data).filter(([key, value]) => value !== undefined)
        ),
      };

      const isDataEmpty =
        Object.keys(filteredData).filter((key) => key !== "id").length === 0;
      if (isDataEmpty) {
        return alert("수정된 데이터가 없습니다.");
      }

      const invalidFields = [
        name.inputTouched && !name.inputVaild && "이름",
        age.inputTouched && !age.inputVaild && "나이",
        phoneNumber.inputTouched && !phoneNumber.inputVaild && "전화번호",
        bankInfo.inputTouched && !bankInfo.inputVaild && "은행과 계좌번호",
        wage.inputTouched && !wage.inputVaild && "시급",
      ].filter(Boolean);

      if (invalidFields.length > 0) {
        const fieldNames = invalidFields.join(", ");
        return alert(`${fieldNames}을 올바르게 입력해주세요.`);
      }

      const config = {
        headers: { Authorization: `Bearer ${accessToken}` },
      };

      //API 수정 연동
      const res = await api.put("/worker", filteredData, config);

      if (res.data.result) {
        setWorkerInfoFixModalOpen();
        window.location.reload();
      }
    } catch (error) {
      const err = error as AxiosError;
      if (!err.response) {
        console.warn("response가 없습니다.");
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
