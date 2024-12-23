import React, { useState } from "react";
import SalesGraph from "../components/SalesGraph";
import style from "./SalesStatistics.module.css";
import MonthlyBestMenu from "../components/MonthlyBestMenu";
import SalesGrowthChart from "../components/SalesGrowthChart";

// 본점에서 로그인 했을 때 지점 총 매출 그래프 있어야 합니다..!!
function Home() {
  const [selectedData, setSelectedData] = useState("daily"); // 기본값은 '일간 총 매출액'

  const handleCardClick = (dataType) => {
    setSelectedData(dataType); // 클릭된 카드를 기반으로 데이터 유형을 설정
  };

  return (
    <div className={style.SalesStatistics}>
      <div>
        <div
          className={`${style.card} ${style.card_1}`}
          onClick={() => handleCardClick("daily")}
        >
          <span>일간 총 매출액</span>
          <span>8,000,000원</span>
        </div>
        <div
          className={`${style.card} ${style.card_1}`}
          onClick={() => handleCardClick("weekly")}
        >
          <span>주간 총 매출액</span>
          <span>40,000,000원</span>
        </div>
        <div
          className={`${style.card} ${style.card_1}`}
          onClick={() => handleCardClick("monthly")}
        >
          <span>월간 총 매출액</span>
          <span>160,000,000원</span>
        </div>
        <div className={`${style.card} ${style.card_1}`}>
          <span>전체 지점 수</span>
          <span>13</span>
        </div>
      </div>
      <div className={style.chart}>
        <SalesGraph selectedData={selectedData} />
        <MonthlyBestMenu />
      </div>
      <div>
        <SalesGrowthChart />
      </div>
    </div>
  );
}

export default Home;
