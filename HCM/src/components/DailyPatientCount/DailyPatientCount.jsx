import "./DailyPatientCount.css";
import ChartCard from "../ChartCard/ChartCard";
import { FaUserInjured, FaArrowUp } from "react-icons/fa";

const chartData = {
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],

  datasets: [
    {
      label: "Patients",

      data: [120, 145, 132, 168, 180, 160, 195],

      borderColor: "#f97316",

      backgroundColor: "rgba(249,115,22,.18)",

      fill: true,

      tension: 0.4,

      pointRadius: 4,

      pointBackgroundColor: "#f97316",
    },
  ],
};

const options = {
  responsive: true,

  maintainAspectRatio: false,

  plugins: {
    legend: {
      display: false,
    },
  },

  scales: {
    y: {
      beginAtZero: true,
    },
  },
};

const DailyPatientCount = () => {
  return (
    <div className="patient-count-card">

      <div className="patient-summary">

        <div className="summary-icon">
          <FaUserInjured />
        </div>

        <div>

          <h2>195</h2>

          <p>Today's Patients</p>

        </div>

        <div className="growth">

          <FaArrowUp />

          <span>8.2%</span>

        </div>

      </div>

      <ChartCard
        title="Daily Patient Count"
        subtitle="Patients Registered This Week"
        type="line"
        data={chartData}
        options={options}
      />

    </div>
  );
};

export default DailyPatientCount;