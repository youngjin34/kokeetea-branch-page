import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import style from "./Navigation.module.css";

import { AuthContext } from "./AuthContext";

function Navigation() {
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  const [branchName, setBranchName] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const name = sessionStorage.getItem("branch_name");
    if (name) setBranchName(name); // branch_name 가져오기
  }, [isAuthenticated]); // 로그인 상태가 변경될 때마다 갱신

  const handleLogout = () => {
    sessionStorage.removeItem("token"); // 토큰 제거
    sessionStorage.removeItem("branch_name"); // branch_name 제거
    setIsAuthenticated(false); // 상태 초기화
    setShowDropdown(false); // 드롭다운 닫기
    navigate("/login"); // 로그인 페이지로 이동
  };

  const handleDropdownToggle = () => {
    setShowDropdown(!showDropdown); // 드롭다운 토글
  };

  const handleMouseEnter = (menu) => {
    if (!isAuthenticated) return; // 로그인 상태가 아니면 동작하지 않음
    setActiveDropdown(menu);
  };

  const handleMouseLeave = () => {
    if (!isAuthenticated) return; // 로그인 상태가 아니면 동작하지 않음
    setActiveDropdown(null);
  };

  const [activeDropdown, setActiveDropdown] = useState(null);

  return (
    <div className={style.Navigation}>
      {/* 로그인 상태에 관계 없이 매출, 재고, 지점 항목은 보임 */}
      <div
        className={style.nav}
        onMouseEnter={() => handleMouseEnter("sales")}
        onMouseLeave={handleMouseLeave}
      >
        <div>매출</div>
        {isAuthenticated && activeDropdown === "sales" && (
          <div className={style.dropdown}>
            <Link to="/sales_statistics">매출 통계</Link>
            <Link to="/daily_statistics">일별 통계</Link>
            <Link to="/monthly_statistics">월별 통계</Link>
            <Link to="/sales_list">매출 목록</Link>
          </div>
        )}
      </div>
      <div
        className={style.nav}
        onMouseEnter={() => handleMouseEnter("stock")}
        onMouseLeave={handleMouseLeave}
      >
        <div>재고</div>
        {isAuthenticated && activeDropdown === "stock" && (
          <div className={style.dropdown}>
            <Link to="/manage_stock">재고 관리</Link>
            <Link to="/manage_order">발주 관리</Link>
          </div>
        )}
      </div>
      <div
        className={style.nav}
        onMouseEnter={() => handleMouseEnter("branch")}
        onMouseLeave={handleMouseLeave}
      >
        <div>지점</div>
        {isAuthenticated && activeDropdown === "branch" && (
          <div className={style.dropdown}>
            <Link to="/manage_branch">지점 관리</Link>
            <Link to="/manage_staff">직원 관리</Link>
          </div>
        )}
      </div>

      {/* 로그인/로그아웃 버튼 */}
      <div className={style.login_btn}>
        {isAuthenticated && branchName && (
          <span className={style.branch_name} onClick={handleDropdownToggle}>
            안녕하세요, {branchName}님!
          </span>
        )}
        {showDropdown && isAuthenticated && (
          <div className={style.dropdownMenu}>
            <button onClick={handleLogout}>로그아웃</button>
          </div>
        )}
        {!isAuthenticated ? (
          <button onClick={() => navigate("/login")}>로그인</button>
        ) : null}
      </div>
    </div>
  );
}

export default Navigation;
