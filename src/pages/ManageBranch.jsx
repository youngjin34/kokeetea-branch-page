import { Link } from "react-router-dom";
import style from "./ManageBranch.module.css";
import { useState } from "react";

function ManageBranch() {
  const [search, setSearch] = useState("");

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
          placeholder="지점명을 입력하세요."
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
