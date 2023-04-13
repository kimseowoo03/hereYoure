import style from "../styles/Header.module.scss"
const Header = () => {
  return (
    <header className={style.header}>
      <nav className={style.nav}>
        <div className={style.logo}>
          <a href="/"><img src="/images/logo.png" alt="Logo" /></a>
        </div>
        <div className={style.loginBtn}>
          <a href="/login"><button>로그인</button></a>
        </div>
      </nav>
    </header>
  )
}

export default Header;