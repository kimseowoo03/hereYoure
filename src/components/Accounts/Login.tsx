import useInput from "../../hooks/useInput";
import style from "../../styles/Login.module.scss";
import Button from "../Button";
import Input from "../Input";

const Login = () => {
  const email = useInput("");
  const password = useInput("");

  const allInputValuesReset = () => {
    email.reset();
    password.reset();
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(email.value, password.value);
    allInputValuesReset();
  };

  return (
    <div className={style.layout}>
      <div className={style.content}>
        <h1>로그인</h1>
        <form onSubmit={handleSubmit} className={style.form}>
          <Input label={"로그인"} type={"email"} value={email.value} placeholder={"이메일 입력"} onChange={email.onChange} autoComplete={"off"}/>
          <Input label={"비밀번호"} type={"password"} value={password.value} placeholder={"비밀번호 입력"} onChange={password.onChange} autoComplete={"off"}/>
          <Button type={"submit"} children={"로그인"} />
          <p>
            히어유얼은 처음이신가요?<a href="/signup">회원가입</a>
          </p>
        </form>
        <a href="/" >비밀번호 찾기</a>
      </div>
    </div>
  );
};

export default Login;
