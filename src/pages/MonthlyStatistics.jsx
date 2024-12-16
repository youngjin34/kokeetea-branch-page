import React from "react";
import { Line, Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
  ArcElement,
} from "chart.js";
import style from "./MonthlyStatistics.module.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
  ArcElement
);

function MonthlyStatistics() {
  // 더미 데이터
  const lineData = {
    labels: ["1월", "2월", "3월", "4월", "5월", "6월"], // 월
    datasets: [
      {
        label: "월간 매출 (백만 원)", // 실제 매출
        data: [50, 60, 70, 80, 100, 120],
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderWidth: 2,
      },
      {
        label: "목표 매출 (백만 원)", // 목표 매출
        data: [55, 65, 75, 85, 105, 125], // 예시로 목표 매출 설정
        borderColor: "rgba(255, 99, 132, 1)", // 목표 매출 선 색상
        backgroundColor: "rgba(255, 99, 132, 0.2)", // 목표 매출 선 배경 색상
        borderWidth: 2,
        borderDash: [5, 5], // 목표 매출 선을 점선으로 표현
      },
    ],
  };

  const couponData = {
    labels: ["쿠폰 사용", "쿠폰 미사용"],
    datasets: [
      {
        label: "고객 비율",
        data: [60, 40], // 예시로 60% 고객이 쿠폰을 사용했다고 가정
        backgroundColor: ["rgba(75, 192, 192, 0.5)", "rgba(255, 99, 132, 0.5)"],
        borderWidth: 1,
      },
    ],
  };

  const couponSalesData = {
    labels: ["쿠폰 사용", "쿠폰 미사용"],
    datasets: [
      {
        label: "매출(백만 원)",
        data: [500, 1200], // 쿠폰 사용 매출과 미사용 매출 예시
        backgroundColor: ["rgba(75, 192, 192, 0.5)", "rgba(255, 99, 132, 0.5)"],
        borderWidth: 1,
      },
    ],
  };

  const dummyData = {
    goal: 90000000, // 목표 매출
    actual: 76500000, // 실제 매출
    lastMonth: 65000000, // 지난 달 매출
    customerSources: {
      socialMedia: 45, // 소셜 미디어 비율
      search: 30, // 온라인 검색 비율
      offline: 25, // 오프라인 비율
    },
    asp: {
      current: 12800, // 현재 평균 구매 단가
      previous: 12075, // 지난달 평균 구매 단가
    },
    nextMonthPrediction: 88000000, // 다음 달 예상 매출
  };

  // 계산된 데이터
  const goalAchievementRate = Math.round(
    (dummyData.actual / dummyData.goal) * 100
  );
  const growthRate = Math.round(
    ((dummyData.actual - dummyData.lastMonth) / dummyData.lastMonth) * 100
  );

  return (
    <div className={style.MonthlyStatistics}>
      <h2>월별 통계</h2>
      <div className={style.chartContainer}>
        <div className={style.chart}>
          <h3>월간 매출 추이</h3>
          <Line data={lineData} />
        </div>

        <div className={style.summary}>
          <div>
            <strong>월별 목표 달성률:</strong> {goalAchievementRate}%{" "}
            <span
              style={{ color: goalAchievementRate >= 100 ? "green" : "red" }}
            >
              (목표: {dummyData.goal.toLocaleString()}원 / 실제:{" "}
              {dummyData.actual.toLocaleString()}원)
            </span>
          </div>
          <div>
            <strong>전월 대비 매출 성장률:</strong>{" "}
            <span style={{ color: growthRate >= 0 ? "green" : "red" }}>
              {growthRate > 0 ? `+${growthRate}%` : `${growthRate}%`}
            </span>{" "}
            (전월: {dummyData.lastMonth.toLocaleString()}원 → 이번 달:{" "}
            {dummyData.actual.toLocaleString()}원)
          </div>
          <div>
            <strong>매출 목표와 실제 매출 비교:</strong>{" "}
            <span
              style={{
                color: goalAchievementRate >= 100 ? "green" : "red",
              }}
            >
              목표 매출을 {goalAchievementRate >= 100 ? "초과 달성" : "미달성"}
            </span>
          </div>
        </div>
      </div>

      {/* 쿠폰 사용 비율과 매출 비교 차트 */}
      <div
        className={style.chartContainer}
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: "50px",
          margin: "20px",
          marginTop: "50px",
        }}
      >
        <div className={style.chart}>
          <h3>쿠폰 사용 비율</h3>
          <Pie
            data={couponData}
            style={{ padding: "20px", width: "100px", height: "50px" }}
          />
        </div>

        <div className={style.chart}>
          <h3>쿠폰 사용 매출 비교</h3>
          <Bar data={couponSalesData} />
        </div>
      </div>
    </div>
  );
}

export default MonthlyStatistics;
