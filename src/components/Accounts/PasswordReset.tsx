import { useState } from "react";
import { useNavigate } from "react-router-dom";

import CryptoJS from "crypto-js";

import useInput from "../../hooks/useInput";
import Input from "../Input";
import style from "../../styles/PasswordFind.module.scss";
import Button from "../Button";
import useAuthState from "../../store/useAuthState";
import api from "../../axiosConfig";
import { AxiosError } from "axios";

const PasswordReset = () => {
  const navigate = useNavigate();
  const [passwordMatch, setPasswordMatch] = useState(false);

  const { userEmail } = useAuthState();

  const newPassword = useInput("");
  const confirmNewPassword = useInput("");

  const handleConfirmPasswordBlur = () => {
    if (!confirmNewPassword.value.toString().trim()) {
      confirmNewPassword.onBlurTouch(true);
      setPasswordMatch(newPassword.value === confirmNewPassword.value);
    } else {
      confirmNewPassword.onBlurTouch(true);
      setPasswordMatch(newPassword.value === confirmNewPassword.value);
    }
  };

  const handlePasswordBlur = () => {
    const trimmedPassword = newPassword.value.toString().trim();
    let reg =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,16}$/;
    if (!trimmedPassword || !reg.test(trimmedPassword)) {
      newPassword.onBlurTouch(true);
      newPassword.checkVaild(false);
      setPasswordMatch(newPassword.value === confirmNewPassword.value);
    } else if (trimmedPassword) {
      newPassword.checkVaild(true);
      setPasswordMatch(newPassword.value === confirmNewPassword.value);
    }
  };

  const handlePasswordReset = async () => {
    const passwordValue = newPassword.value.toString();
    const secretKey = process.env.REACT_APP_SECRET_KEY || "default_secret_key";

    const encryptedPassword = CryptoJS.AES.encrypt(
      passwordValue,
      secretKey
    ).toString();

    const data = {
      email: userEmail,
      password: encryptedPassword,
    };
    try {
      //비밀번호 재설정 api
      const res = await api.put("/user/changePassword", data);

      if (res.data.result) {
        alert("비밀번호 재설정 완료");
        navigate("/login");
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

  const handleClick = () => {
    navigate("/login");
  };

  return (
    <div className={style.layout}>
      <div className={style.content}>
        <h1>비밀번호 재설정</h1>
        <p>회원님의 비밀번호를 다시 설정해주세요.</p>
        <div className={style["content-border"]}>
          <form className={style.form}>
            <Input
              type={"password"}
              label={"새 비밀번호"}
              value={newPassword.value}
              onChange={newPassword.onChange}
              placeholder={"새 비밀번호 입력"}
              autoComplete={"off"}
              onBlur={handlePasswordBlur}
            />
            {newPassword.inputTouched && !newPassword.inputVaild && (
              <p className={style.alert}>
                8~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요.
              </p>
            )}
            <Input
              type={"password"}
              label={"새 비밀번호 확인"}
              value={confirmNewPassword.value}
              placeholder={"새 비밀번호 확인 입력"}
              onChange={confirmNewPassword.onChange}
              autoComplete={"off"}
              onBlur={handleConfirmPasswordBlur}
            />
            {confirmNewPassword.inputTouched && !passwordMatch && (
              <p className={style.alert}>비밀번호가 일치하지 않습니다.</p>
            )}
            <div className={style["button-div"]}>
              <Button
                children={"취소"}
                type={"button"}
                isCancel={true}
                onClick={handleClick}
              />
              <Button
                disabled={!passwordMatch}
                children={"변경하기"}
                type={"button"}
                onClick={handlePasswordReset}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PasswordReset;
