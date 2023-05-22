import { useState } from "react";
import { AxiosError } from "axios";
import useInput from "../hooks/useInput";
import useUIState from "../store/useUIState";
import CryptoJS from "crypto-js";
import api from "../axiosConfig";
import { useAccessToken } from "../store/useAccessTokenState";
import WorkroomModal from "./WorkroomModal";

const WorkRoomRegisterModal = () => {
  const [taxSelect, setTaxSelect] = useState(false);
  const [taxSelectedValue, setTaxSelectedValue] = useState("");

  const [weeklyInclude, setWeeklyInclude] = useState(false);
  const [overtimeInclude, setOvertimeInclude] = useState(false);
  const [nightInclude, setNightInclude] = useState(false);

  const WorkRoomName = useInput("");
  const WorkRoomPassword = useInput("");

  const { accessToken } = useAccessToken();

  const { setRegisterModalOpen } = useUIState();

  const isFormValid =
    WorkRoomName.inputVaild &&
    WorkRoomPassword.inputVaild &&
    typeof taxSelectedValue === "string" &&
    taxSelectedValue.length > 0;

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

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const regex = /\d+\.\d+/g;
    const taxSelectedValueNumber = Number(
      taxSelectedValue.match(regex)?.toString()
    );

    const passwordValue = WorkRoomPassword.value.toString();
    const secretKey = process.env.REACT_APP_SECRET_KEY || "default_secret_key";

    const encryptedPassword = CryptoJS.AES.encrypt(
      passwordValue,
      secretKey
    ).toString();

    const data = {
      title: WorkRoomName.value,
      password: encryptedPassword,
      tax: taxSelectedValueNumber,
      weekly_pay: weeklyInclude,
      overtime_pay: overtimeInclude,
      night_pay: nightInclude,
    };

    const config = {
      headers: { Authorization: `Bearer ${accessToken}` },
    };

    try {
      const res = await api.post("/workroom", data, config);
      console.log(res, "성공");

      setRegisterModalOpen();
      window.location.reload();
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
    workroom_title: "근무방 등록",
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
    setModalOpen: setRegisterModalOpen,
    isFormValid,
    submitButtomName: "등록하기",
  };

  return <WorkroomModal {...workroomModalProps} />;
};

export default WorkRoomRegisterModal;
