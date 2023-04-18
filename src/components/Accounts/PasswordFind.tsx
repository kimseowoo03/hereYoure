import { useNavigate } from "react-router-dom";

import useInput from "../../hooks/useInput";
import Input from "../Input";
import style from "../../styles/PasswordFind.module.scss";
import Button from "../Button";
import useAuthState from "../../store/useAuthState";

const PasswordFind = () => {
  const navigate = useNavigate();
  const {setEmailAuth} = useAuthState();
  const email = useInput("");
  const emailVerificationNumber = useInput("");

  const handleClick = () => {
    navigate('/login')
  };

  return (
    <div className={style.layout}>
      <div className={style.content}>
        <h1>비밀번호 찾기</h1>
        <p>히어유얼에서 이메일 인증으로 본인 확인을 진행합니다.</p>
        <div className={style["content-border"]}>
          <form className={style.form}>
            <Input
              type={"email"}
              label={"이메일"}
              value={email.value}
              onChange={email.onChange}
              placeholder={"이메일 입력"}
              autoComplete={"off"}
            />
            <a href="/" className={style["inner-button"]}>
              인증번호 받기
            </a>
            <Input
              type={"number"}
              label={""}
              value={emailVerificationNumber.value}
              placeholder={"인증번호 6자리 입력"}
              onChange={emailVerificationNumber.onChange}
              autoComplete={"off"}
              max={"6"}
            />
            <p>
              이미 가입된 이메일인 경우, 인증번호를 받을 수 없습니다.
              <br />
              인증번호가 오지 않으면 입력하신 정보가 정확한지 확인하여 주세요.
            </p>
            <div className={style["button-div"]}>
              <Button children={"취소"} type={"button"} isCancel={true} onClick={handleClick}/>
              <Button children={"다음"} type={"button"} onClick={setEmailAuth}/>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PasswordFind;
