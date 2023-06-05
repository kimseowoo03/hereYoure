import { AxiosError } from "axios";
import CryptoJS from "crypto-js";

import Button from "../components/Button";
import Input from "../components/Input";
import useInput from "../hooks/useInput";
import BaseModal from "./BaseModal";

import style from "../styles/modals/UserInfoFixModal.module.scss";
import useUIState from "../store/useUIState";
import api from "../axiosConfig";
import { useAccessToken } from "../store/useAccessTokenState";
import { IUserInfo } from "../components/User/UserHome";
import { useState } from "react";

interface IUserInfoEditData {
  name?: string;
  password?: string;
  newPassword?: string;
}

const UserInfoFixModal = ({ email: userEmail, name: userName }: IUserInfo) => {
  const { accessToken } = useAccessToken();

  const [errorText, setErrorText] = useState(false);

  const { setEditModalOpen } = useUIState();
  const name = useInput(userName);
  const password = useInput("");
  const newPassword = useInput("");

  const handleNewPasswordBlur = () => {
    const trimmedPassword = newPassword.value.toString().trim();
    let reg =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,16}$/;
    if (!trimmedPassword || !reg.test(trimmedPassword)) {
      newPassword.checkVaild(false);
      newPassword.onBlurTouch(true);
      console.log("//");
    } else if (trimmedPassword) {
      newPassword.checkVaild(true);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const passwordValue = password.value.toString();
    const NewPasswordValue = newPassword.value.toString();

    const encryptedPassword = CryptoJS.SHA256(passwordValue).toString();
    const encryptedNewPassword = CryptoJS.SHA256(NewPasswordValue).toString();

    try {
      const data: IUserInfoEditData = {};

      if (userName !== name.value) {
        data.name = String(name.value);
      }
      if (password.value && newPassword.inputVaild) {
        data.password = encryptedPassword;
        data.newPassword = encryptedNewPassword;
        console.log(password.value, encryptedPassword);
      }

      const config = {
        headers: { Authorization: `Bearer ${accessToken}` },
      };

      const res = await api.post("/user/changeUser", data, config);
      if (res.data.result) {
        setEditModalOpen();
        window.location.reload();
      }
      setErrorText(false);
    } catch (error) {
      const err = error as AxiosError;
      if (!err.response) {
        console.log("response가 없습니다.");
      } else if (err.response.status === 401) {
        console.log("401에러입니다.", err);
        setErrorText(true);
        password.onBlurTouch(false);
        password.reset();
        newPassword.reset();
      } else {
        console.log(err);
      }
    }
  };

  return (
    <BaseModal>
      <div className={style.content}>
        <h2>정보수정</h2>
        <form onSubmit={handleSubmit} className={style.form}>
          <div className={style["form-content"]}>
            <Input
              label={"이름"}
              value={name.value}
              onChange={name.onChange}
              type={"text"}
              autoComplete={"off"}
              placeholder={"이름 입력"}
            />
            <div className={style["readonly-email-layout"]}>
              <p>이메일</p>
              <div>
                <p>{userEmail}</p>
                <span>인증완료</span>
              </div>
            </div>
            <Input
              label={"비밀번호"}
              value={password.value}
              onChange={password.onChange}
              type={"password"}
              autoComplete={"off"}
              placeholder={"기존 비밀번호"}
              onBlur={() => password.onBlurTouch(true)}
            />
            {errorText && !password.inputTouched && (
              <p className={style.alert}>기존 비밀번호가 틀렸습니다.</p>
            )}
            <Input
              label={""}
              value={newPassword.value}
              onChange={newPassword.onChange}
              type={"password"}
              autoComplete={"off"}
              placeholder={"새 비밀번호 입력"}
              onBlur={handleNewPasswordBlur}
            />
            {newPassword.inputTouched && !newPassword.inputVaild && (
              <p className={style.alert}>
                8~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요..
              </p>
            )}
          </div>
          <div className={style["button-div"]}>
            <Button
              children={"취소"}
              type={"button"}
              isCancel={true}
              onClick={setEditModalOpen}
            />
            <Button children={"변경하기"} type={"submit"} />
          </div>
        </form>
        <div onClick={setEditModalOpen} className={style["cancel-icon"]}>
          <img src="/images/cancel.png" alt="cancle-icon" />
        </div>
      </div>
    </BaseModal>
  );
};

export default UserInfoFixModal;
