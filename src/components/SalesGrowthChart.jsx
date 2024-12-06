import React from "react";
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

// 매출 데이터 (더미 데이터)
const sales = [
  50000, 55000, 60000, 65000, 70000, 75000, 80000, 85000, 90000, 95000, 100000,
  105000,
];

// 성장률 계산 함수
const calculateGrowthRate = (sales) => {
  let growthRates = [0]; // 첫 번째 달은 성장률 0
  for (let i = 1; i < sales.length; i++) {
    const growthRate = ((sales[i] - sales[i - 1]) / sales[i - 1]) * 100;
    growthRates.push(growthRate);
  }
  return growthRates;
};

// 성장률 데이터 계산
const growthRates = calculateGrowthRate(sales);

// 더미 데이터 (매출 및 성장률)
const salesData = {
  labels: [
    "2024-01",
    "2024-02",
    "2024-03",
    "2024-04",
    "2024-05",
    "2024-06",
    "2024-07",
    "2024-08",
    "2024-09",
    "2024-10",
    "2024-11",
    "2024-12",
  ],
  datasets: [
    {
      label: "매출",
      data: sales,
      borderColor: "rgba(75, 192, 192, 1)",
      backgroundColor: "rgba(75, 192, 192, 0.2)",
      yAxisID: "y1",
      type: "bar",
    },
    {
      label: "성장률",
      data: growthRates,
      borderColor: "rgba(255, 99, 132, 1)",
      backgroundColor: "rgba(255, 99, 132, 0.2)",
      yAxisID: "y2",
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

function SalesGrowthChart() {
  return (
    <div>
      <h2>매출과 성장률 비교</h2>
      <Line data={salesData} options={options} />
    </div>
  );
}

export default SalesGrowthChart;
