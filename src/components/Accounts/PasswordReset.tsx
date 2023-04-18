import { useState } from "react";
import { useNavigate } from "react-router-dom";

import useInput from "../../hooks/useInput";
import Input from "../Input";
import style from "../../styles/PasswordFind.module.scss";
import Button from "../Button";

const PasswordReset = () => {
  const navigate = useNavigate();
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const newPassword = useInput("");
  const confirmNewPassword = useInput("");

  const  handleConfirmPasswordBlur = () => {
    setPasswordMatch(newPassword.value === confirmNewPassword.value)
  }

  const  handlePasswordBlur = () => {
    let reg = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,16}$/
    setIsPasswordValid(reg.test(newPassword.value.toString()))
  }

  const handleClick = () => {
    navigate('/login')
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
              placeholder={"이메일 입력"}
              autoComplete={"off"}
              onBlur={handlePasswordBlur}
            />
            {!isPasswordValid && <p className={style.alert}>8~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요.</p>}
            <Input
              type={"password"}
              label={"새 비밀번호 확인"}
              value={confirmNewPassword.value}
              placeholder={"인증번호 6자리 입력"}
              onChange={confirmNewPassword.onChange}
              autoComplete={"off"}
              onBlur={handleConfirmPasswordBlur}
            />
            {!passwordMatch && <p className={style.alert}>비밀번호가 일치하지 않습니다.</p>}
            <div className={style["button-div"]}>
              <Button children={"취소"} type={"button"} isCancel={true} onClick={handleClick}/>
              <Button children={"변경하기"} type={"button"} />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PasswordReset;
