import { useState } from "react";
import useInput from "../../hooks/useInput";
import style from "../../styles/Signup.module.scss";
import Input from "../Input";
import Button from "../Button";
import { emailAuth } from "../../utils/emailAuth";

const Signup = () => {
  const [counter, setCounter] = useState(300);
  const [viewCounter, setViewCounter] = useState(false)
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

  const minutes = Math.floor(counter / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (counter % 60).toString().padStart(2, "0");

  const [isChecked, setIsChecked] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);

  const name = useInput("");
  const email = useInput("");
  const emailVerificationNumber = useInput("");
  const password = useInput("");
  const confirmPassword = useInput("");

  const allInputValuesReset = () => {
    name.reset();
    email.reset();
    emailVerificationNumber.reset();
    password.reset();
    confirmPassword.reset();
  };

  const handleEmailAuthClick = async () => {
    // 비동기 이메일 인증 작업 수행
    await emailAuth("kimseowoo03@gmail.com");

    //기존 실행되는 interval 중단하고 카운터 초기화
    if (intervalId) {
      clearInterval(intervalId);
      setCounter(300);
    }

    // 새로운 interval을 시작
    setViewCounter(true);
    const newIntervalId = setInterval(() => {
      setCounter((prevCounter) => prevCounter - 1);

      if (counter === 0) {
        clearInterval(newIntervalId);
      }
    }, 1000);

    //새로운 interval 업데이트
    setIntervalId(newIntervalId);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(name.value, email.value, password.value);
    allInputValuesReset();
  };

  const handleConfirmPasswordBlur = () => {
    setPasswordMatch(password.value === confirmPassword.value);
  };

  const handlePasswordBlur = () => {
    let reg =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,16}$/;
    setIsPasswordValid(reg.test(password.value.toString()));
  };

  return (
    <div className={style.layout}>
      <div className={style.content}>
        <h1>회원가입</h1>
        <p>히어유얼에서 이메일 인증으로 본인 확인을 진행합니다.</p>
        <div className={style["content-border"]}>
          <form className={style.form} onSubmit={handleSubmit}>
            <Input
              type={"text"}
              label={"이름"}
              value={name.value}
              placeholder={"이름 입력"}
              onChange={name.onChange}
              autoComplete={"off"}
            />
            <Input
              type={"email"}
              label={"이메일"}
              value={email.value}
              placeholder={"이메일 입력"}
              onChange={email.onChange}
              autoComplete={"off"}
            ><button
            type="button"
            onClick={handleEmailAuthClick}
            className={style["inner-button"]}
          >
            인증번호 받기
          </button></Input>
            <Input
              type={"number"}
              label={""}
              value={emailVerificationNumber.value}
              placeholder={"인증번호 6자리 입력"}
              onChange={emailVerificationNumber.onChange}
              autoComplete={"off"}
              maxLength={6}
            >
              <span className={viewCounter?style["auth-timer"]:style["display-none"]}>
                {minutes}:{seconds}
              </span>
            </Input>
            <p>
              이미 가입된 이메일인 경우, 인증번호를 받을 수 없습니다.
              <br />
              인증번호가 오지 않으면 입력하신 정보가 정확한지 확인하여 주세요.
            </p>
            <Input
              type={isChecked ? "text" : "password"}
              label={"비밀번호"}
              value={password.value}
              placeholder={"비밀번호 입력"}
              onChange={password.onChange}
              autoComplete={"off"}
              onBlur={handlePasswordBlur}
            />
            {!isPasswordValid && (
              <p className={style.alert}>
                8~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요.
              </p>
            )}
            <Input
              type={isChecked ? "text" : "password"}
              label={"비밀번호 확인"}
              value={confirmPassword.value}
              placeholder={"비밀번호 재입력"}
              onChange={confirmPassword.onChange}
              onBlur={handleConfirmPasswordBlur}
              autoComplete={"off"}
            />
            {!passwordMatch && (
              <p className={style.alert}>비밀번호가 일치하지 않습니다.</p>
            )}
            <div className={style["password-checkbox"]}>
              <input
                type="checkbox"
                checked={isChecked}
                onChange={() => {
                  setIsChecked(!isChecked);
                }}
              />
              <span>비밀번호 표시</span>
            </div>
            <Button children={"회원가입"} type={"submit"} />
            <p>
              히어유얼의 회원인가요?<a href="/login">로그인</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
