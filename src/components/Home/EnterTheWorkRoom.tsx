import style from "../../styles/EnterTheWorkRoom.module.scss";
import useInput from "../../hooks/useInput";

interface IEnterTheWorkRoomData {
  email: string;
  password: string;
}

const EnterTheWorkRoom = () => {
  const workRoomName = useInput("");
  const password = useInput("");

  const allInputValuesReset = () => {
    workRoomName.reset();
    password.reset();
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(workRoomName.value, password.value);
    allInputValuesReset();
  };

  return (
    <div className={style.layout}>
      <div className={style.content}>
        <div className={style["page-header"]}>
          <img src="/images/logo.png" alt="Home-Logo" />
          <h1>근무방 입장하기</h1>
          <p>
            근무방에 입장하면
            <br /> 근무시간과 급여를 <b>한 눈에</b> 보실 수 있습니다.
          </p>
        </div>
        <form className={style.form} onSubmit={handleSubmit}>
          <div className={style["form-input"]}>
            <input
              type="text"
              placeholder="근무방 이름"
              value={workRoomName.value}
              onChange={workRoomName.onChange}
            />
          </div>
          <div className={style["form-input"]}>
            <input
              type="password"
              placeholder="근무방 비밀번호"
              value={password.value}
              onChange={password.onChange}
            />
          </div>
          <button type="submit">입장하기</button>
          <p>
            근무방 입장은 <b>'근로자'</b>에게 맞춰져 있는 서비스입니다.
          </p>
        </form>
        <div className={style["page-footer"]}>
          <p>
            근로자가 아닌 <b>'사업자'</b>로서 근로자를 관리하려면
            <br /> <b>로그인 후 사용</b>해야 합니다.
          </p>
        </div>
      </div>
    </div>
  );
};

export default EnterTheWorkRoom;
