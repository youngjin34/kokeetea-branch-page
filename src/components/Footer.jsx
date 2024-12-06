import style from "./Footer.module.css";

function Footer() {
  return (
    <div className={style.Footer}>
      <div className={`${style.divider} ${style.div_transparent}`}></div>

      <div className={style.img}>
        <img src="/images/footer1.png" alt="Footer 1" />
        <img src="/images/footer2.png" alt="Footer 2" />
        <img src="/images/footer3.png" alt="Footer 3" />
        <img src="/images/footer4.png" alt="Footer 4" />
      </div>
    </div>
  );
}

export default Footer;
