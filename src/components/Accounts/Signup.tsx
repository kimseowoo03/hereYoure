import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import style from "../../styles/Signup.module.scss";
import useInput from "../../hooks/useInput";
import Input from "../Input";
import Button from "../Button";
import { emailAuth, checkEmailCode } from "../../utils/emailAuth";
import api from "../../axiosConfig";

const Signup = () => {
  const navigate = useNavigate();

  const [counter, setCounter] = useState(300);
  const [viewCounter, setViewCounter] = useState(false);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

  const minutes = Math.floor(counter / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (counter % 60).toString().padStart(2, "0");

  const [isEmailAuthed, setIsEmailAuthed] = useState(false);
  const [viewEmailCodeAuthed, setViewEmailCodeAuthed] = useState(false);
  const [isEmailCodeAuthed, setIsEmailCodeAuthed] = useState(false);

  const [isChecked, setIsChecked] = useState(false);
  const [isTermsChecked, setIsTermsChecked] = useState(false);
  const [isPrivacyChecked, setIsPrivacyChecked] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(false);

  const name = useInput("");
  const email = useInput("");
  const emailVerificationNumber = useInput("");
  const password = useInput("");
  const confirmPassword = useInput("");

  const isFormValid =
    name.inputVaild &&
    isEmailCodeAuthed &&
    password.inputVaild &&
    confirmPassword.inputVaild &&
    passwordMatch &&
    isTermsChecked &&
    isPrivacyChecked;

  const handlerNameBlur = () => {
    if (!name.value.toString().trim()) {
      name.checkVaild(false);
      name.onBlurTouch(true);
    } else {
      name.checkVaild(true);
    }
  };

  const allInputValuesReset = () => {
    name.reset();
    email.reset();
    emailVerificationNumber.reset();
    password.reset();
    confirmPassword.reset();
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

  const handleEmailAuthClick = async () => {
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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = {
      name: name.value,
      email: email.value,
      password: password.value,
    };

    try {
      const res = await api.post("/user/register", data);
      if (res.data.result) {
        alert("회원가입 완료");
        navigate("/login");
        allInputValuesReset();
      }
    } catch (error) {
      const err = error as AxiosError;
      if (!err.response) {
        console.log("response가 없습니다.");
      } else {
        console.warn(`error: ${err.message}`);
      }
    }
  };

  const handleConfirmPasswordBlur = () => {
    if (!confirmPassword.value.toString().trim()) {
      confirmPassword.onBlurTouch(true);
      confirmPassword.checkVaild(false);
      setPasswordMatch(password.value === confirmPassword.value);
    } else {
      setPasswordMatch(password.value === confirmPassword.value);
      confirmPassword.checkVaild(true);
    }
  };

  const handlePasswordBlur = () => {
    const trimmedPassword = password.value.toString().trim();
    let reg =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,16}$/;
    if (!trimmedPassword || !reg.test(trimmedPassword)) {
      password.checkVaild(false);
      password.onBlurTouch(true);
      setPasswordMatch(password.value === confirmPassword.value);
    } else if (trimmedPassword) {
      password.checkVaild(true);
      setPasswordMatch(password.value === confirmPassword.value);
    }
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
              onBlur={handlerNameBlur}
            />
            {name.inputTouched && !name.inputVaild && (
              <p className={style.alert}>이름을 입력해주세요.</p>
            )}
            <Input
              type={"email"}
              label={"이메일"}
              value={email.value}
              placeholder={"이메일 입력"}
              onChange={email.onChange}
              autoComplete={"off"}
            >
              <button
                type="button"
                onClick={handleEmailAuthClick}
                className={style["inner-button"]}
              >
                인증번호 받기
              </button>
            </Input>
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
                이미 가입된 이메일인 경우, 인증번호를 받을 수 없습니다.
                <br />
                인증번호가 오지 않으면 입력하신 정보가 정확한지 확인하여 주세요.
              </p>
            )}
            <Input
              type={isChecked ? "text" : "password"}
              label={"비밀번호"}
              value={password.value}
              placeholder={"비밀번호 입력"}
              onChange={password.onChange}
              autoComplete={"off"}
              onBlur={handlePasswordBlur}
            />
            {password.inputTouched && !password.inputVaild && (
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
            {confirmPassword.inputTouched && !passwordMatch && (
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
            <div className={style["terms-and-privacy"]}>
              <div className={style.agree}>
                <input
                  type="checkbox"
                  checked={isTermsChecked}
                  onChange={() => {
                    setIsTermsChecked(!isTermsChecked);
                  }}
                />
                <span>서비스이용 약관 동의 (필수) </span>
                <a href="https://hereyoure.notion.site/c965eee420a646a0ad8be2dbabde9167">
                  보기
                </a>
              </div>
              <div className={style.agree}>
                <input
                  type="checkbox"
                  checked={isPrivacyChecked}
                  onChange={() => {
                    setIsPrivacyChecked(!isPrivacyChecked);
                  }}
                />
                <span>개인정보 수집 및 이용 동의 (필수) </span>
                <a href="https://hereyoure.notion.site/9f396b1cefe54044af82d64546a8c533">
                  보기
                </a>
              </div>
            </div>
            <Button
              disabled={!isFormValid}
              children={"회원가입"}
              type={"submit"}
            />
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
