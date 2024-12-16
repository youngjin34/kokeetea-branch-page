import { Link } from "react-router-dom";
import style from "./ManageBranch.module.css";
import { useState } from "react";

function ManageBranch() {
  const [search, setSearch] = useState("");

  // 더미 데이터 정의
  const branches = [
    {
      id: 1,
      email: "branch1@coketi.com",
      branchName: "구로 본점",
      address: "서울시 구로구",
      phone: "02-1234-5678",
    },
    {
      id: 2,
      email: "branch2@coketi.com",
      branchName: "여의도점",
      address: "서울시 영등포구",
      phone: "051-9876-5432",
    },
    {
      id: 3,
      email: "branch3@coketi.com",
      branchName: "강남점",
      address: "서울시 강남구",
      phone: "02-3456-7890",
    },
    {
      id: 4,
      email: "branch4@coketi.com",
      branchName: "신도림점",
      address: "서울시 영등포구",
      phone: "02-3456-7890",
    },
    {
      id: 5,
      email: "branch5@coketi.com",
      branchName: "왕십리점",
      address: "서울시 성동구",
      phone: "02-3456-7890",
    },
  ];

  const onChangeSearch = (event) => {
    setSearch(event.target.value);
  };

  const getFilteredBranch = () => {
    if (search === "") {
      return branches;
    }

    return branches.filter((branch) => branch.branchName.includes(search));
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
        />
      </div>
      <div className={style.branchCards}>
        {filteredBranch.map((branch) => (
          <Link key={branch.id} to={`/branch/${branch.id}`}>
            <div className={style.branchCard}>
              <h2>{branch.branchName}</h2>
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
