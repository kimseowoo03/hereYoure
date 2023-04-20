import Button from "../components/Button";
import Input from "../components/Input";
import useInput from "../hooks/useInput";
import BaseModal from "./BaseModal";

import style from "../styles/modals/WorkRoomRegisterModal.module.scss";
import useUIState from "../store/useUIState";

const WorkRoomRegisterModal = () => {
  const {setIsOpen} = useUIState()
  const name = useInput("");
  const password = useInput("");
  const newPassword = useInput("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <BaseModal>
      <div className={style.content}>
        <h2>정보수정</h2>
        <form onSubmit={handleSubmit} className={style.form}>
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
          <div className={style["button-div"]}>
            <Button children={"취소"} type={"button"} isCancel={true} onClick={setIsOpen} />
            <Button children={"변경하기"} type={"submit"} />
          </div>
        </form>
      </div>
    </BaseModal>
  );
};

export default WorkRoomRegisterModal;
