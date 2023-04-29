import api from "../../axiosConfig";

import { useAccessToken } from "../../store/useAccessTokenState";

import useInput from "../../hooks/useInput";
import style from "../../styles/Login.module.scss";
import Button from "../Button";
import Input from "../Input";
import { useState } from "react";

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
  // const accessToken = useAccessToken((state) => state.accessToken);

  const [errorText, setErrorText] = useState(false);

  const allInputValuesReset = () => {
    email.reset();
    password.reset();
  };

  const setRefreshToken = (refreshToken: string) => {
    localStorage.setItem("refreshToken", refreshToken);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const res: LoginResponse = await api.post("/api/auth/login", {
        email: "test2@test.com",
        password: "222222",
      });
      if (res.status === 200) {
        setErrorText(false);
        const resAccessToken = res.data.accessToken;
        const resRefreshToken = res.data.refreshToken;

        // 각 위치에 토큰 저장
        useAccessToken.getState().setAccessToken(resAccessToken);
        setRefreshToken(resRefreshToken);
        allInputValuesReset();
      }
    } catch (error) {
      console.log((error as Error).message, "401에러임");
      password.reset();
      setErrorText(true);
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
