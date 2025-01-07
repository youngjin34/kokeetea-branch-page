import React, { useState, useEffect } from "react";
import axios from "axios";
import SalesGraph from "../components/SalesGraph";
import style from "./SalesStatistics.module.css";
import MonthlyBestMenu from "../components/MonthlyBestMenu";
import SalesGrowthChart from "../components/SalesGrowthChart";

// 본점에서 로그인 했을 때 지점 총 매출 그래프 있어야 합니다..!!
function SalesStatistics() {
  const [selectedData, setSelectedData] = useState("daily"); // 기본값은 '일간 총 매출액'
  const [salesData, setSalesData] = useState(null); // 매출 데이터 상태
  const [branchCount, setBranchCount] = useState(0); // 지점 수 상태
  const [top5, setTop5] = useState([]);
  const [monthlySales, setMonthlySales] = useState();

  const token = sessionStorage.getItem("token"); // 로컬스토리지에서 token 가져오기
  // const branchId = sessionStorage.getItem("branch_id");

  const handleCardClick = (dataType) => {
    setSelectedData(dataType); // 클릭된 카드를 기반으로 데이터 유형을 설정
  };

  // 매출 데이터를 가져오는 함수
  const fetchSalesData = async () => {
    try {
      let response;
      const period = selectedData; // selectedData에 따라 period 설정
      const range = "7"; // 예시로 7일을 설정, 필요에 따라 동적으로 변경 가능

      // Authorization 헤더에 Bearer 토큰 추가
      const config = {
        headers: {
          Authorization: `Bearer ${token}`, // Bearer token 추가
        },
      };

      // if (period === "daily") {
      //   response = await axios.get(
      //     `http://localhost:8080/api/admin/sales?period=daily`,
      //     config
      //   );
      //   console.log(response);
      // } else if (period === "weekly") {
      //   response = await axios.get(
      //     "http://localhost:8080/api/admin/sales?period=weekly",
      //     config
      //   );
      // } else if (period === "monthly") {
      //   response = await axios.get(
      //     "http://localhost:8080/api/admin/sales?period=monthly",
      //     config
      //   );
      // }

      response = await axios.get(
        "http://localhost:8080/api/admin/sales?period=monthly&range=all",
        config
      );

      console.log(response.data);

      if (response.status === 200) {
        setSalesData(response.data); // 데이터를 받아서 상태에 저장
      }
    } catch (error) {
      console.error("Error fetching sales data", error);
    }
  };

  // 지점 수를 가져오는 함수
  const fetchBranchCount = async () => {
    try {
      // Authorization 헤더에 Bearer 토큰 추가
      const config = {
        headers: {
          Authorization: `Bearer ${token}`, // Bearer token 추가
        },
      };

      const response = await axios.get(
        "http://localhost:8080/api/admin/branch-count",
        config
      );

      if (response.status === 200) {
        setBranchCount(response.data); // 지점 수 받아오기
      }
    } catch (error) {
      console.error("Error fetching branch count", error);
    }
  };

  // top5 메뉴 가져오는 함수
  const fetchTop5 = async () => {
    try {
      // Authorization 헤더에 Bearer 토큰 추가
      const config = {
        headers: {
          Authorization: `Bearer ${token}`, // Bearer token 추가
        },
      };

      const response = await axios.get(
        "http://localhost:8080/api/admin/top5",
        config
      );

      if (response.status === 200) {
        setTop5(response.data);
      }
    } catch (error) {
      console.error("Error fetching branch count", error);
    }
  };

  // 월별 매출량
  const fetchMonthlySales = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`, // Bearer 토큰 추가
        },
      };

      const branchId = sessionStorage.getItem("branch_id");

      const response = await axios.get(
        `http://localhost:8080/api/branch/${branchId}/sales?period=monthly`,
        config
      );

      // 월별 데이터 구조 확인
      console.log("Monthly Sales Data:", response.data);

      // 데이터를 필요한 형태로 변환
      const formattedData = response.data.map((item) => ({
        month: item.month,
        totalSales: item.total,
      }));

      setMonthlySales(formattedData);
    } catch (error) {
      console.error("월별 매출 데이터를 가져오지 못했습니다:", error);
    }
  };

  // 컴포넌트가 마운트될 때 한 번 실행
  useEffect(() => {
    fetchSalesData();
    fetchBranchCount();
    fetchTop5();
    fetchMonthlySales();
  }, [selectedData]); // selectedData가 변경될 때마다 실행

  return (
    <div className={style.SalesStatistics}>
      <div>
        <div
          className={`${style.card} ${style.card_1}`}
          onClick={() => handleCardClick("daily")}
        >
          <span>일간 총 매출액</span>
          <span>{salesData ? `${salesData.dailyTotal}원` : "Loading..."}</span>
        </div>
        <div
          className={`${style.card} ${style.card_1}`}
          onClick={() => handleCardClick("weekly")}
        >
          <span>주간 총 매출액</span>
          <span>{salesData ? `${salesData.weeklyTotal}원` : "Loading..."}</span>
        </div>
        <div
          className={`${style.card} ${style.card_1}`}
          onClick={() => handleCardClick("monthly")}
        >
          <span>월간 총 매출액</span>
          <span>
            {salesData ? `${salesData.monthlyTotal}원` : "Loading..."}
          </span>
        </div>
        <div className={`${style.card} ${style.card_1}`}>
          <span>전체 지점 수</span>
          <span>{branchCount}</span>
        </div>
      </div>
      <div className={style.chart}>
        <SalesGraph selectedData={selectedData} />
        <MonthlyBestMenu top5={top5} />
      </div>
      <div>
        <SalesGrowthChart />
      </div>
    </div>
  );
}

export default SalesStatistics;
