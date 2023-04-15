import style from "../styles/Header.module.scss";
const Header = () => {
  return (
    <header className={style.header}>
      <nav className={style.nav}>
        <div className={style.logo}>
          <a href="/">
            <img src="/images/logo.png" alt="Logo" />
          </a>
        </div>
        <div className={style["login-btn"]}>
          <a href="/login">로그인</a>
        </div>
      </nav>
    </header>
  );
};

export default Header;
