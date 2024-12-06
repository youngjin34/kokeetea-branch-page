import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import style from "./DailyStatistics.module.css"; // CSS 모듈 import

// chart.js 구성 요소 등록
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// 더미 데이터 (일별 매출)
const dailySales = [
  500, 600, 550, 700, 750, 800, 850, 900, 950, 1000, 1100, 1200,
];

// 날짜들
const dates = [
  "2023-01-01",
  "2023-01-02",
  "2023-01-03",
  "2023-01-04",
  "2023-01-05",
  "2023-01-06",
  "2023-01-07",
  "2023-01-08",
  "2023-01-09",
  "2023-01-10",
  "2023-01-11",
  "2023-01-12",
];

// 평균 매출
const averageSales =
  dailySales.reduce((acc, val) => acc + val, 0) / dailySales.length;

// 매출 증감율 계산
const calculateSalesGrowth = (sales) => {
  let growthRates = [0]; // 첫 번째 날은 성장률 0
  for (let i = 1; i < sales.length; i++) {
    const growthRate = ((sales[i] - sales[i - 1]) / sales[i - 1]) * 100;
    growthRates.push(growthRate);
  }
  return growthRates;
};

// 매출 증감율 데이터 계산
const salesGrowth = calculateSalesGrowth(dailySales);

// 더미 데이터 (매출 및 증감율)
const salesData = {
  labels: dates,
  datasets: [
    {
      label: "매출",
      data: dailySales,
      borderColor: "rgba(75, 192, 192, 1)",
      backgroundColor: "rgba(75, 192, 192, 0.2)",
      yAxisID: "y1",
      type: "bar",
    },
    {
      label: "성장률",
      data: salesGrowth,
      borderColor: "rgba(255, 99, 132, 1)",
      backgroundColor: "rgba(255, 99, 132, 0.2)",
      yAxisID: "y2",
      type: "line",
    },
    {
      label: "평균 매출",
      data: Array(dailySales.length).fill(averageSales),
      borderColor: "rgba(153, 102, 255, 1)",
      backgroundColor: "rgba(153, 102, 255, 0.2)",
      borderDash: [5, 5],
      yAxisID: "y1",
      type: "line",
    },
  ],
};

const options = {
  responsive: true,
  scales: {
    y1: {
      beginAtZero: true,
      position: "left", // 매출은 왼쪽 축
    },
    y2: {
      beginAtZero: true,
      position: "right", // 성장률은 오른쪽 축
    },
  },
};

function DailySalesGrowthChart() {
  // 매출 요약 정보를 상태로 관리
  const [selectedDate, setSelectedDate] = useState(dates[dates.length - 1]); // 기본적으로 마지막 날짜
  const [totalSalesToday, setTotalSalesToday] = useState(
    dailySales[dailySales.length - 1]
  ); // 오늘의 매출

  // 해당 날짜에 대한 매출 요약 업데이트
  const handleClick = (event) => {
    const chart = event.chart;
    const elements = chart.getElementsAtEventForMode(
      event,
      "nearest",
      { intersect: true },
      false
    );
    if (elements.length) {
      const index = elements[0].index; // 클릭된 막대의 인덱스
      const date = dates[index]; // 클릭된 날짜
      setSelectedDate(date);
      setTotalSalesToday(dailySales[index]);
    }
  };

  return (
    <div>
      <h2>일별 매출 및 성장률</h2>
      <Line
        data={salesData}
        options={options}
        height={400}
        width={800}
        onClick={handleClick}
      />

      <div className={style.salesSummary}>
        <h3>{selectedDate} 매출 요약</h3>
        <p>
          <span>총 매출:</span> {totalSalesToday}원
        </p>
        <p>
          <span>가장 많이 팔린 제품:</span> 아메리카노
        </p>
        <p>
          <span>피크 시간대:</span> 3pm ~ 5pm
        </p>
      </div>
    </div>
  );
}

export default DailySalesGrowthChart;
