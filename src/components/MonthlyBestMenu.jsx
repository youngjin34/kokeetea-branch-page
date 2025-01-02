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

function MonthlyBestMenu({ top5 }) {
  // 데이터가 없는 경우 처리
  if (!Array.isArray(top5) || top5.length === 0) {
    return <div>Loading Top5 Menu Data...</div>;
  }

  // 데이터 매핑
  const labels = top5.map((item) => item.item_name); // 메뉴 이름
  const dataValues = top5.map((item) => item.total_sold); // 판매량

  const data = {
    labels: labels,
    datasets: [
      {
        label: "월간 판매량",
        data: dataValues,
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
