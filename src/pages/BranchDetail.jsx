import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import style from "./BranchDetail.module.css";

function BranchDetail() {
  const { id } = useParams(); // URL 파라미터에서 지점 ID 가져오기
  const [branch, setBranch] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = sessionStorage.getItem("token"); // 토큰 가져오기

  useEffect(() => {
    const fetchBranch = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`, // 인증 헤더 추가
          },
        };

        const response = await axios.get(
          `http://localhost:8080/api/branch/${id}`,
          config
        );
        setBranch(response.data); // 데이터 상태 업데이트
      } catch (err) {
        setError("지점 정보를 가져오는 중 문제가 발생했습니다.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBranch();
  }, [id, token]);

  if (loading) {
    return <div>로딩 중...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

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
