import Navigation from "./Navigation";
import { Link } from "react-router-dom";
import style from "./Header.module.css";

function Header() {
  return (
    <div>
      <div className={style.Header}>
        <div className={style.title}>
          <Link to="/">
            <img src="../../public/images/kokeetea_logo.png" />
          </Link>
          <h3>매출/재고/지점 통합관리 서비스</h3>
        </div>
        <div className={style.navigation}>
          <Navigation />
        </div>
      </div>
    </div>
  );
}

export default Header;
