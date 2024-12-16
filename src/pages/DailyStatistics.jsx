import React, { useEffect, useRef, useState } from "react";
import { getElementAtEvent, Line } from "react-chartjs-2";
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
  "2024-12-01",
  "2024-12-02",
  "2024-12-03",
  "2024-12-04",
  "2024-12-05",
  "2024-12-06",
  "2024-12-07",
  "2024-12-08",
  "2024-12-09",
  "2024-12-10",
  "2024-12-11",
  "2024-12-12",
];

// 날짜별 매출 요약 데이터 (예시)
const dailySummary = {
  "2024-12-01": { topProduct: "아메리카노", peakTime: "3pm ~ 5pm" },
  "2024-12-02": { topProduct: "카페라떼", peakTime: "1pm ~ 3pm" },
  "2024-12-03": { topProduct: "카푸치노", peakTime: "4pm ~ 6pm" },
  "2024-12-04": { topProduct: "모카", peakTime: "2pm ~ 4pm" },
  "2024-12-05": { topProduct: "아메리카노", peakTime: "5pm ~ 7pm" },
  "2024-12-06": { topProduct: "에스프레소", peakTime: "6pm ~ 8pm" },
  "2024-12-07": { topProduct: "아메리카노", peakTime: "10am ~ 12pm" },
  "2024-12-08": { topProduct: "카페라떼", peakTime: "12pm ~ 2pm" },
  "2024-12-09": { topProduct: "아메리카노", peakTime: "2pm ~ 4pm" },
  "2024-12-10": { topProduct: "모카", peakTime: "3pm ~ 5pm" },
  "2024-12-11": { topProduct: "카푸치노", peakTime: "1pm ~ 3pm" },
  "2024-12-12": { topProduct: "에스프레소", peakTime: "5pm ~ 7pm" },
};

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
  const [topProduct, setTopProduct] = useState("아메리카노"); // 기본 제품
  const [peakTime, setPeakTime] = useState("3pm ~ 5pm"); // 기본 피크 시간대
  const [animationClass, setAnimationClass] = useState(""); // 애니메이션 클래스 추가

  const chartRef = useRef();

  // 해당 날짜에 대한 매출 요약 업데이트
  const handleClick = (event) => {
    const chart = chartRef.current;

    if (chart) {
      const elements = getElementAtEvent(chart, event);

      if (elements.length > 0) {
        const index = elements[0].index;
        const date = dates[index];

        setSelectedDate(date);
        setTotalSalesToday(dailySales[index]);

        // 해당 날짜의 데이터로 상태 업데이트
        setTopProduct(dailySummary[date]?.topProduct || "정보 없음");
        setPeakTime(dailySummary[date]?.peakTime || "정보 없음");

        // 애니메이션 클래스 업데이트 (fadeIn과 slideIn을 동시에 적용)
        setAnimationClass(`${style.fadeIn} ${style.slideIn}`);

        // 애니메이션 클래스 초기화 (애니메이션 반복을 위한 설정)
        setTimeout(() => setAnimationClass(""), 1500);
      }
    }
  };

  return (
    <div className={style.DailyStatistics}>
      <h2>일별 매출 및 성장률</h2>
      <Line
        style={{ cursor: "pointer" }}
        ref={chartRef}
        data={salesData}
        options={options}
        height={400}
        width={800}
        onClick={handleClick} // 클릭 이벤트 핸들러 연결
      />

      <div className={`${style.salesSummary} ${animationClass}`}>
        <h3>{selectedDate} 매출 요약</h3>
        <p>
          <span>⭐ 총 매출:</span> {totalSalesToday}원
        </p>
        <p>
          <span>☕ 가장 많이 팔린 제품:</span> {topProduct}
        </p>
        <p>
          <span>🕑 피크 시간대:</span> {peakTime}
        </p>
      </div>
    </div>
  );
}

export default DailySalesGrowthChart;
