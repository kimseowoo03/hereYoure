import { useState } from "react";
import { AxiosError } from "axios";
import useInput from "../hooks/useInput";
import HistoryModal from "./HistoryModal";
import useUIState from "../store/useUIState";
import api from "../axiosConfig";
import { useAccessToken } from "../store/useAccessTokenState";

interface IHistoryRegisterModalProps {
  id: number;
  wage: string;
}

const HistoryRegisterModal = ({
  wage: userWage,
  id,
}: IHistoryRegisterModalProps) => {
  const date = useInput("");
  const wage = useInput(userWage);
  const startTime = useInput("");
  const endTime = useInput("");
  const [deputyWorkInclude, setDeputyWorkInclude] = useState(false);

  const { setHistoryRegisterModalOpen } = useUIState();

  const { accessToken } = useAccessToken();

  const HistoryDateBlur = () => {
    const inputDate = new Date(date.value);
    if (isNaN(inputDate.getTime())) {
      date.setErrorMessage("유효하지 않은 날짜입니다.");
      date.checkVaild(false);
    } else {
      date.checkVaild(true);
    }
  };

  const handlerWageBlur = () => {
    const wageValue = wage.value.toString().trim();
    if (!wageValue) {
      wage.checkVaild(false);
      wage.onBlurTouch(true);
    } else {
      wage.checkVaild(true);
    }
  };

  const HistoryTimeBlur = () => {
    const timePattern = /^(?:[01]\d|2[0-3]):[0-5]\d$/;
    //시작 시간이랑 끝난 시간 빈값이면 안됨
    if (
      !timePattern.test(String(startTime.value)) ||
      !timePattern.test(String(endTime.value))
    ) {
      // 유효하지 않은 시간
      startTime.onBlurTouch(true);
      endTime.onBlurTouch(true);
      startTime.checkVaild(false);
      endTime.checkVaild(false);
    } else {
      // 유효한 시간
      startTime.checkVaild(true);
      endTime.checkVaild(true);
    }
  };

  const handlerSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const data = {
        date: date.value,
        startTime: startTime.value,
        endTime: endTime.value,
        wage: wage.value,
        cover: deputyWorkInclude ? 1 : 0,
        workerId: id,
      };

      const config = {
        headers: { Authorization: `Bearer ${accessToken}` },
      };
      const res = await api.post("/history", data, config);
      if (res.status) {
        setHistoryRegisterModalOpen();
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

  const handlerDeputyWorkIncludeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setDeputyWorkInclude(value === "include");
  };

  const isFormVaild =
    date.inputVaild &&
    wage.value.toString().trim() !== "" &&
    startTime.inputVaild &&
    endTime.inputVaild;

  const HistoryModalProps = {
    title: "근무 등록",
    date,
    wage,
    startTime,
    endTime,
    submitButtonName: "등록하기",
    include: deputyWorkInclude,
    isFormVaild,
    HistoryDateBlur,
    HistoryTimeBlur,
    handlerWageBlur,
    handleRadioChange: handlerDeputyWorkIncludeChange,
    handlerSubmit,
    cancelModalState: setHistoryRegisterModalOpen,
  };
  return <HistoryModal {...HistoryModalProps} />;
};

export default HistoryRegisterModal;
