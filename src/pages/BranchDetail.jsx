import { useParams } from "react-router-dom";

import style from "./BranchDetail.module.css";

function BranchDetail() {
  // 여기서 받아온 id를 사용해서 DB에서 해당 id에 맞는 branch를 가져와서 정보를 띄워야함
  // 지금은 그냥 같은 더미 데이터를 넣어서 표현함
  const { id } = useParams();

  // 더미 데이터 정의
  const branches = [
    {
      id: 1,
      email: "branch1@kokeetea.com",
      branchName: "구로 본점",
      address: "서울시 구로구",
      phone: "02-1234-5678",
    },
    {
      id: 2,
      email: "branch2@kokeetea.com",
      branchName: "여의도점",
      address: "서울시 영등포구",
      phone: "051-9876-5432",
    },
    {
      id: 3,
      email: "branch3@kokeetea.com",
      branchName: "강남점",
      address: "서울시 강남구",
      phone: "02-3456-7890",
    },
    {
      id: 4,
      email: "branch4@kokeetea.com",
      branchName: "신도림점",
      address: "서울시 영등포구",
      phone: "02-3456-7890",
    },
    {
      id: 5,
      email: "branch5@kokeetea.com",
      branchName: "왕십리점",
      address: "서울시 성동구",
      phone: "02-3456-7890",
    },
  ];

  // 해당 id에 맞는 지점 찾기
  const branch = branches.find((branch) => branch.id === parseInt(id));

  if (!branch) {
    return <div>지점 정보를 찾을 수 없습니다.</div>;
  }

  return (
    <div className={style.BranchDetail}>
      <h1>{branch.branchName} 상세보기</h1>
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
  );
}

export default BranchDetail;
