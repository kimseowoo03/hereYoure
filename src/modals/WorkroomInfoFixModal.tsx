import { useEffect, useState } from "react";
import { AxiosError } from "axios";
import useInput from "../hooks/useInput";
import useUIState from "../store/useUIState";
import CryptoJS from "crypto-js";
import api from "../axiosConfig";
import { useAccessToken } from "../store/useAccessTokenState";
import WorkroomModal from "./WorkroomModal";
import { useParams } from "react-router-dom";
import { IWORKROOM_DATA } from "../components/User/UserHome";

const WORKROOMDETAILDATA: IWORKROOM_DATA = {
  id: 10,
  title: "근무방1",
  tax: 3.3,
  weekly_pay: 0,
  overtime_pay: 1,
  night_pay: 1,
};

const WorkroomInfoFixModal = () => {
  const { workroom } = useParams();

  const [taxSelect, setTaxSelect] = useState(false);

  const [taxSelectedValue, setTaxSelectedValue] = useState("");

  const [weeklyInclude, setWeeklyInclude] = useState(
    WORKROOMDETAILDATA.weekly_pay !== 0
  );
  const [overtimeInclude, setOvertimeInclude] = useState(
    WORKROOMDETAILDATA.overtime_pay !== 0
  );
  const [nightInclude, setNightInclude] = useState(
    WORKROOMDETAILDATA.night_pay !== 0
  );

  const WorkRoomName = useInput(WORKROOMDETAILDATA.title);

  const WorkRoomPassword = useInput("");

  const { accessToken } = useAccessToken();

  const { setWorkroomEditModalOpen } = useUIState();

  useEffect(() => {
    switch (WORKROOMDETAILDATA.tax) {
      case 3.3:
        setTaxSelectedValue("개인사업자 3.3%");
        break;
      case 9.4:
        setTaxSelectedValue("4대보험 9.4%");
        break;
      case 0.0:
        setTaxSelectedValue("적용안함 0.0%");
        break;
      default:
        break;
    }
    const config = {
      headers: { Authorization: `Bearer ${accessToken}` },
    };
    const fetchWorkroomData = async () => {
      try {
        //근무방 상세데이터 조회
        // const res = await api.get(`/workroom/detail?id=${workroom}`, config)
      } catch (error) {
        console.log(error);
      }
    };
    fetchWorkroomData();
  }, []);

  const isFormValid = true;

  const WorkRoomNameBlur = () => {
    if (!WorkRoomName.value.toString().trim()) {
      WorkRoomName.checkVaild(false);
      WorkRoomName.onBlurTouch(true);
    } else {
      WorkRoomName.checkVaild(true);
    }
  };

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
    const trimmedPassword = WorkRoomPassword.value.toString().trim();
    let reg = /^(?=.*[a-z])(?=.*\d)[a-zA-Z\d]{10,}$/;

    if (!trimmedPassword || !reg.test(trimmedPassword)) {
      WorkRoomPassword.checkVaild(false);
      WorkRoomPassword.onBlurTouch(true);
    } else {
      WorkRoomPassword.checkVaild(true);
    }
  };

  const handleFormSubmit = async () => {
    const regex = /\d+\.\d+/g;
    const taxSelectedValueNumber = Number(
      taxSelectedValue.match(regex)?.toString()
    );

    const passwordValue = WorkRoomPassword.value.toString();

    const encryptedPassword = CryptoJS.SHA256(passwordValue).toString();

    //이전 값과 비교해 달라진 것만 changedData 넣기
    const data: IWORKROOM_DATA = {
      id: workroom !== undefined ? parseInt(workroom) : undefined,
      title: String(WorkRoomName.value),
      password: encryptedPassword,
      tax: taxSelectedValueNumber,
      weekly_pay: weeklyInclude ? 1 : 0,
      overtime_pay: overtimeInclude ? 1 : 0,
      night_pay: nightInclude ? 1 : 0,
    };

    const changedData: Partial<IWORKROOM_DATA> = {};

    for (const key in WORKROOMDETAILDATA) {
      if (
        WORKROOMDETAILDATA.hasOwnProperty(key) &&
        WORKROOMDETAILDATA[key] !== data[key]
      ) {
        changedData[key] = data[key];
      }
    }

    console.log(changedData);
    const config = {
      headers: { Authorization: `Bearer ${accessToken}` },
    };

    try {
      //근무방 수정 API 작업
    } catch (error) {
      const err = error as AxiosError;
      if (!err.response) {
        console.log("response가 없습니다.");
      } else {
        console.log(err);
        console.warn(`error: ${err.message}`);
      }
    }
  };

  const workroomModalProps = {
    workroom_title: "근무방 수정",
    handleFormSubmit,
    WorkRoomName,
    WorkRoomNameBlur,
    WorkRoomPassword,
    handleWorkRoomPasswordBlur,
    taxSelectedValue,
    taxSelect,
    setTaxSelect,
    handleTaxSelectedClick,
    handleRadioChange,
    weeklyInclude,
    overtimeInclude,
    nightInclude,
    setModalOpen: setWorkroomEditModalOpen,
    isFormValid,
    submitButtomName: "변경하기",
  };

  return <WorkroomModal {...workroomModalProps} />;
};

export default WorkroomInfoFixModal;
