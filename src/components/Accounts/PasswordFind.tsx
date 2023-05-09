import { useNavigate } from "react-router-dom";
import { useState } from "react";

import useInput from "../../hooks/useInput";
import Input from "../Input";
import style from "../../styles/PasswordFind.module.scss";
import Button from "../Button";
import useAuthState from "../../store/useAuthState";

import { emailAuth, checkEmailCode } from "../../utils/emailAuth";

const PasswordFind = () => {
  const navigate = useNavigate();
  const { setEmailAuth } = useAuthState();
  const email = useInput("");
  const emailVerificationNumber = useInput("");

  const [counter, setCounter] = useState(300);
  const [viewCounter, setViewCounter] = useState(false);
  const [isEmailAuthed, setIsEmailAuthed] = useState(false);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

  const [isEmailCodeAuthed, setIsEmailCodeAuthed] = useState(false);
  const [viewEmailCodeAuthed, setViewEmailCodeAuthed] = useState(false);

  const minutes = Math.floor(counter / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (counter % 60).toString().padStart(2, "0");

  const handleClick = () => {
    navigate("/login");
  };

  const handleEmailAuthCheckEmailCodeBlur = async () => {
    const verificationNumber = emailVerificationNumber.value.toString();
    const emailValue = email.value.toString();

    if (verificationNumber.length < 6) {
      setIsEmailCodeAuthed(false);
      return;
    }

    const result = await checkEmailCode(emailValue, verificationNumber);

    setViewEmailCodeAuthed(true);
    setIsEmailAuthed(false);

    if (result?.result) {
      if (intervalId) {
        clearInterval(intervalId);
      }
      setIsEmailCodeAuthed(true);
    } else {
      setIsEmailCodeAuthed(false);
    }
  };

  const isValidEmail = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const handleEmailAuthClick = async () => {
    //이메일 유효성
    if (!isValidEmail(email.value.toString())) {
      return alert("유효한 이메일 주소를 입력해주세요.");
    }

    // 비동기 이메일 인증 작업 수행
    await emailAuth(email.value.toString());

    //인증요청 문구 노출
    setIsEmailAuthed(true);

    //기존 실행되는 interval 중단하고 카운터 초기화
    if (intervalId) {
      clearInterval(intervalId);
      setCounter(300);
    }

    // 새로운 interval을 시작
    setViewCounter(true);

    const newIntervalId = setInterval(() => {
      setCounter((prevCounter) => {
        if (prevCounter === 1) {
          clearInterval(newIntervalId);
        }
        return prevCounter - 1;
      });
    }, 1000);

    //새로운 interval 업데이트
    setIntervalId(newIntervalId);
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
            <button
              type="button"
              onClick={handleEmailAuthClick}
              className={style["inner-button"]}
            >
              인증번호 받기
            </button>
            <Input
              type={"text"}
              label={""}
              value={emailVerificationNumber.value}
              placeholder={"인증번호 6자리 입력"}
              onChange={emailVerificationNumber.onChange}
              autoComplete={"off"}
              maxLength={6}
              onBlur={handleEmailAuthCheckEmailCodeBlur}
            >
              <span
                className={
                  viewCounter ? style["auth-timer"] : style["display-none"]
                }
              >
                {minutes}:{seconds}
              </span>
            </Input>
            {viewEmailCodeAuthed && (
              <p
                className={
                  isEmailCodeAuthed
                    ? style["emailCodeAuth-message-true"]
                    : style["emailCodeAuth-message-false"]
                }
              >
                {isEmailCodeAuthed && "인증이 완료되었습니다."}
                {!isEmailCodeAuthed && "인증번호를 다시 확인해주세요."}
              </p>
            )}
            {isEmailAuthed && (
              <p className={style["emailAuth-message"]}>
                인증번호가 오지 않으면 입력하신 정보가 정확한지 확인하여 주세요.
              </p>
            )}
            <div className={style["button-div"]}>
              <Button
                children={"취소"}
                type={"button"}
                isCancel={true}
                onClick={handleClick}
              />
              <Button
                disabled={!isEmailCodeAuthed}
                children={"다음"}
                type={"button"}
                onClick={setEmailAuth}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PasswordFind;
