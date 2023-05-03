import style from "../../styles/Home/Footer.module.scss";

const Footer = () => {
  return (
    <div className={style.layout}>
      <div className={style.content}>
        <div className={style.logo}>
          <a href="/">
            <img src="/images/logo-footer.png" alt="Logo" />
          </a>
        </div>
        <div className={style["terms-and-privacy"]}>
          <a href="https://hereyoure.notion.site/c965eee420a646a0ad8be2dbabde9167">
            <p>이용약관</p>
          </a>
          <a href="https://hereyoure.notion.site/9f396b1cefe54044af82d64546a8c533">
            <p>개인정보처리방침</p>
          </a>
        </div>
        <div className={style["footer-contact"]}>
          <p>hereyoure.kr@gmail.com</p>
          <div className={style["instar-icon"]}>
            <a href="/">
              <img src="/images/instarIcon.png" alt="instarIcon" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
