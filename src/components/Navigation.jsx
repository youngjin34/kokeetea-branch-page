import { Link } from "react-router-dom";
import { useState } from "react";
import style from "./Navigation.module.css";

function Navigation() {
  const [activeDropdown, setActiveDropdown] = useState(null);

  const handleMouseEnter = (menu) => {
    setActiveDropdown(menu);
  };

  const handleMouseLeave = () => {
    setActiveDropdown(null);
  };

  return (
    <div className={style.Navigation}>
      {/* 매출 */}
      <div
        className={style.nav}
        onMouseEnter={() => handleMouseEnter("sales")}
        onMouseLeave={handleMouseLeave}
      >
        <div>매출</div>
        {activeDropdown === "sales" && (
          <div className={style.dropdown}>
            <Link to="/sales_statistics">매출 통계</Link>
            <Link to="/daily_statistics">일별 통계</Link>
            <Link to="/monthly_statistics">월별 통계</Link>
            <Link to="/sales_list">매출 목록</Link>
          </div>
        )}
      </div>

      {/* 재고 */}
      <div
        className={style.nav}
        onMouseEnter={() => handleMouseEnter("stock")}
        onMouseLeave={handleMouseLeave}
      >
        <div>재고</div>
        {activeDropdown === "stock" && (
          <div className={style.dropdown}>
            <Link to="/manage_stock">재고 관리</Link>
            <Link to="/manage_order">발주 관리</Link>
          </div>
        )}
      </div>

      {/* 지점 */}
      <div
        className={style.nav}
        onMouseEnter={() => handleMouseEnter("branch")}
        onMouseLeave={handleMouseLeave}
      >
        <div>지점</div>
        {activeDropdown === "branch" && (
          <div className={style.dropdown}>
            <Link to="/manage_branch">지점 관리</Link>
            <Link to="/manage_staff">직원 관리</Link>
          </div>
        )}
      </div>
      <div className={style.login_btn}>
        <Link to="/login">
          <span className="material-symbols-outlined">login</span>
        </Link>
      </div>
    </div>
  );
}

export default Navigation;
