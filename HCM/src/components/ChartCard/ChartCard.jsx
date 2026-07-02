import "./ChartCard.css";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Line, Bar, Doughnut } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const ChartCard = ({
  title,
  subtitle,
  type = "line",
  data,
  options,
}) => {
  const renderChart = () => {
    switch (type) {
      case "bar":
        return <Bar data={data} options={options} />;

      case "doughnut":
        return <Doughnut data={data} options={options} />;

      default:
        return <Line data={data} options={options} />;
    }
  };

  return (
    <div className="chart-card">
      <div className="chart-card-header">
        <div>
          <h3>{title}</h3>
          <p>{subtitle}</p>
        </div>

        <button className="chart-btn">
          View Report
        </button>
      </div>

      <div className="chart-container">
        {renderChart()}
      </div>
    </div>
  );
};

export default ChartCard;