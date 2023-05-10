import { Link } from "react-router-dom";

import { useAccessToken } from "../store/useAccessTokenState";

import style from "../styles/Header.module.scss";
const Header = () => {
  const { accessToken, setAccessToken } = useAccessToken();

  return (
    <header className={style.header}>
      <nav className={style.nav}>
        <div className={style.logo}>
          <a href="/">
            <img src="/images/logo.png" alt="Logo" />
          </a>
        </div>
        <div className={style["login-btn"]}>
          {accessToken ? (
            <Link to="/" onClick={() => setAccessToken("")}>
              로그아웃
            </Link>
          ) : (
            <Link to="/login">로그인</Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
