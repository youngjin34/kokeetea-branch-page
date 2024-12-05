import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { PolarArea } from "react-chartjs-2";
import style from "./MonthlyBestMenu.module.css";

// Chart.js 요소 등록
ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

function MonthlyBestMenu() {
  // Chart 데이터와 설정
  const data = {
    labels: [
      "나비의 꿈",
      "샌프란시스코의 장미",
      "삼다수",
      "브라운슈카 밀크티",
      "말차 라떼",
    ],
    datasets: [
      {
        label: "월간 판매량",
        data: [11, 16, 7, 3, 14],
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(75, 192, 192)",
          "rgb(255, 205, 86)",
          "rgb(201, 203, 207)",
          "rgb(54, 162, 235)",
        ],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
  };

  return (
    <div className={style.chartContainer}>
      <h3>월간 베스트 메뉴 TOP 5</h3>
      <PolarArea data={data} options={options} />
    </div>
  );
}

export default MonthlyBestMenu;
