import { useState } from "react";
import { AxiosError } from "axios";
import useInput from "../hooks/useInput";
import HistoryModal from "./HistoryModal";
import useUIState from "../store/useUIState";
import api from "../axiosConfig";
import { useAccessToken } from "../store/useAccessTokenState";
import { IWORKER_HISTORY } from "../components/Worker/WorkerDetail";
import { formatDate } from "../utils/formatDate";
import { config } from "process";

interface IHistoryInfoFixModalProps extends IWORKER_HISTORY {
  wokerId: number;
}

const HistoryInfoFixModal = ({
  wokerId,
  id,
  date: currentDate,
  startTime: currentStartTime,
  endTime: currentEndTime,
  wage: currentWage,
  cover,
}: IHistoryInfoFixModalProps) => {
  const isoDate = formatDate(currentDate);
  const date = useInput(isoDate);
  const wage = useInput(currentWage);
  const startTime = useInput(currentStartTime);
  const endTime = useInput(currentEndTime);
  const [deputyWorkInclude, setDeputyWorkInclude] = useState(cover !== 0);

  const { setHistoryInfoFixModalOpen } = useUIState();

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
    console.log("변경클릭");
    try {
      const data = {
        id: id,
        date: date.value !== isoDate ? date.value : undefined,
        startTime:
          startTime.value !== currentStartTime ? startTime.value : undefined,
        endTime: endTime.value !== currentEndTime ? endTime.value : undefined,
        wage: wage.value !== currentWage ? wage.value : undefined,
        cover: deputyWorkInclude
          ? 1
          : 0 !== cover
          ? deputyWorkInclude
            ? 1
            : 0
          : undefined,
        workerId: wokerId,
      };

      const filteredData = {
        ...Object.fromEntries(
          Object.entries(data).filter(([key, value]) => value !== undefined)
        ),
      };

      const isDataEmpty =
        Object.keys(filteredData).filter(
          (key) => key !== "id" && key !== "workerId"
        ).length === 0;
      if (isDataEmpty) {
        return alert("수정된 데이터가 없습니다.");
      }

      const config = {
        headers: { Authorization: `Bearer ${accessToken}` },
      };
      console.log(filteredData);

      const res = await api.put("/history", filteredData, config);
      if (res.data.result) {
        setHistoryInfoFixModalOpen();
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
    date.value.toString().trim() !== "" &&
    wage.value.toString().trim() !== "" &&
    startTime.value.toString().trim() !== "" &&
    endTime.value.toString().trim() !== "";

  const HistoryModalProps = {
    title: "근무 수정",
    date,
    wage,
    startTime,
    endTime,
    submitButtonName: "변경하기",
    include: deputyWorkInclude,
    isFormVaild,
    HistoryDateBlur,
    HistoryTimeBlur,
    handlerWageBlur,
    handleRadioChange: handlerDeputyWorkIncludeChange,
    handlerSubmit,
    cancelModalState: setHistoryInfoFixModalOpen,
  };
  return <HistoryModal {...HistoryModalProps} />;
};

export default HistoryInfoFixModal;
