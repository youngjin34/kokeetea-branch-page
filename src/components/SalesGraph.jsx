import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import style from "./SalesGraph.module.css";

// Chart.js 구성 요소 등록
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function SalesGraph({ selectedData }) {
  const labels = [
    "1월",
    "2월",
    "3월",
    "4월",
    "5월",
    "6월",
    "7월",
    "8월",
    "9월",
    "10월",
    "11월",
    "12월",
  ];

  let data = {
    labels: labels,
    datasets: [
      {
        data: [65, 59, 80, 81, 56, 55, 40, 65, 59, 80, 81, 56, 55, 40],
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  // selectedData에 따라 다른 데이터를 반환
  if (selectedData === "daily") {
    data = {
      labels: [
        "10시",
        "11시",
        "12시",
        "13시",
        "14시",
        "15시",
        "16시",
        "17시",
        "18시",
        "19시",
        "20시",
        "21시",
      ],
      datasets: [
        {
          label: "일간 총 매출액",
          data: [45, 67, 72, 89, 53, 61, 39, 45, 67, 72, 89, 53, 61, 39],
          fill: false,
          borderColor: "rgb(75, 192, 192)",
          tension: 0.1,
        },
      ],
    };
  } else if (selectedData === "weekly") {
    data = {
      labels: [
        "월요일",
        "화요일",
        "수요일",
        "목요일",
        "금요일",
        "토요일",
        "일요일",
      ],
      datasets: [
        {
          label: "주간 총 매출액",
          data: [95, 80, 120, 130, 100, 110, 85],
          fill: false,
          borderColor: "rgb(153, 102, 255)",
          tension: 0.1,
        },
      ],
    };
  } else if (selectedData === "monthly") {
    data = {
      labels: labels,
      datasets: [
        {
          label: "월간 총 매출액",
          data: [
            450, 670, 720, 890, 530, 610, 390, 450, 670, 720, 890, 530, 610,
            390,
          ],
          fill: false,
          borderColor: "rgb(255, 159, 64)",
          tension: 0.1,
        },
      ],
    };
  }

  return (
    <div
      className={style.sales_graph}
      style={{ width: "100%", height: "380px" }}
    >
      <Line data={data} options={{ responsive: true }} />
    </div>
  );
}

export default SalesGraph;
