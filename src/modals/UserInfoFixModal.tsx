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

const UserInfoFixModal = () => {
  const {accessToken} = useAccessToken();

  const { setEditModalOpen } = useUIState();
  const name = useInput("");
  const password = useInput("");
  const newPassword = useInput("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const passwordValue = password.value.toString();
    const NewPasswordValue = newPassword.value.toString();

    const encryptedPassword = CryptoJS.SHA256(passwordValue).toString();
    const encryptedNewPassword = CryptoJS.SHA256(NewPasswordValue).toString();

    const data = {
      name: name.value,
      password: encryptedPassword,
      newPassword: encryptedNewPassword
    }

    const config = {
      headers: { Authorization: `Bearer ${accessToken}` },
    };

    try {
      const res = await api.post("/user/changeUser",data,  config)
      console.log(res)
    } catch (error) {
      const err = error as AxiosError;
      if (!err.response) {
        console.log("response가 없습니다.");
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
                <p>kimseowoo03@gmail.com</p>
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
            />
            <Input
              label={""}
              value={newPassword.value}
              onChange={newPassword.onChange}
              type={"password"}
              autoComplete={"off"}
              placeholder={"새 비밀번호 입력"}
            />
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
          <img src="/images/cancel.png" />
        </div>
      </div>
    </BaseModal>
  );
};

export default UserInfoFixModal;
