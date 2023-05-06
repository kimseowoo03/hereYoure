import { useState } from "react";

import api from "../../axiosConfig";
import { AxiosError } from "axios";

import useInput from "../../hooks/useInput";
import style from "../../styles/Login.module.scss";
import Button from "../Button";
import Input from "../Input";

interface LoginResponse {
  status: number;
  data: {
    result: boolean;
    refreshToken: string;
    accessToken: string;
  };
}

const Login = () => {
  const email = useInput("");
  const password = useInput("");

  const [errorText, setErrorText] = useState(false);

  const allInputValuesReset = () => {
    email.reset();
    password.reset();
  };

  const saveTokensToLocalStorage = (refreshToken: string, accessToken: string) => {
    localStorage.setItem("refreshToken", refreshToken);
    localStorage.setItem("accessToken", accessToken)
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      console.log("요청")
      const res: LoginResponse = await api.post("/auth/login", {
        email: "test2@test.com",
        password: "222222",
      });
      console.log(res)
      
      if (res.status === 200) {
        setErrorText(false);
        const resAccessToken = res.data.accessToken;
        const resRefreshToken = res.data.refreshToken;

        // 로컬에 토큰 저장
        saveTokensToLocalStorage(resRefreshToken, resAccessToken);

        allInputValuesReset();
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

  return (
    <div className={style.layout}>
      <div className={style.content}>
        <h1>로그인</h1>
        <form onSubmit={handleSubmit} className={style.form}>
          <Input
            label={"로그인"}
            type={"email"}
            value={email.value}
            placeholder={"이메일 입력"}
            onChange={email.onChange}
            autoComplete={"off"}
          />
          <Input
            label={"비밀번호"}
            type={"password"}
            value={password.value}
            placeholder={"비밀번호 입력"}
            onChange={password.onChange}
            autoComplete={"off"}
          />
          {errorText && (
            <p className={style.alert}>
              이메일또는 비밀번호를 잘못 입력했습니다.
              <br /> 입력하신 내용을 다시 확인해주세요
            </p>
          )}
          <Button type={"submit"} children={"로그인"} />
          <p>
            히어유얼은 처음이신가요?<a href="/signup">회원가입</a>
          </p>
        </form>
        <a href="/login/passwordfind">비밀번호 찾기</a>
      </div>
    </div>
  );
};

export default Login;
