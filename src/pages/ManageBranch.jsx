import { Link } from "react-router-dom";
import style from "./ManageBranch.module.css";
import { useEffect, useState } from "react";
import axios from "axios";

function ManageBranch() {
  const [search, setSearch] = useState("");
  const [branchList, setBranchList] = useState([]);

  const token = sessionStorage.getItem("token"); // 로컬스토리지에서 token 가져오기

  const onChangeSearch = (event) => {
    setSearch(event.target.value);
  };

  const fetchBranchList = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.get(
        `http://localhost:8080/api/branch/page`,
        config
      );

      // 응답 데이터에서 list만 추출하여 설정
      setBranchList(response.data.list);
    } catch (error) {
      console.error("브랜치 목록 데이터를 가져오지 못했습니다:", error);
    }
  };

  useEffect(() => {
    fetchBranchList();
  }, []);

  const getFilteredBranch = () => {
    if (search === "") {
      return branchList;
    }

    // branch_name으로 검색
    return branchList.filter((branch) => branch.branch_name.includes(search));
  };

  const filteredBranch = getFilteredBranch();

  return (
    <div className={style.ManageBranch}>
      <div className={style.top}>
        <h1 className={style["manage-branch"]}>지점 관리</h1>
        <input
          className={style.search_input}
          type="text"
          value={search}
          onChange={onChangeSearch}
          placeholder="지점명을 입력하세요."
        />
      </div>
      <div className={style.branchCards}>
        {filteredBranch.map((branch) => (
          <Link key={branch.branch_id} to={`/branch/${branch.branch_id}`}>
            <div className={style.branchCard}>
              <h2>{branch.branch_name}</h2>
              <p>
                <strong>이메일:</strong> {branch.email}
              </p>
              <p>
                <strong>주소:</strong> {branch.address}
              </p>
              <p>
                <strong>연락처:</strong> {branch.phone}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default ManageBranch;
