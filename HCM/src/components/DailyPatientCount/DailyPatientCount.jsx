import { useEffect, useState } from "react";
import { supabase } from "../../supabase/supabase";
import "./DailyPatientCount.css";
import ChartCard from "../ChartCard/ChartCard";
import { FaUserInjured, FaArrowUp } from "react-icons/fa";

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
  const [loading, setLoading] = useState(true);
  const [todayPatients, setTodayPatients] = useState(0);
  const [growth, setGrowth] = useState(0);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    fetchPatientData();
  }, []);

  const fetchPatientData = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from("patient_footfall")
      .select("*")
      .order("entry_date", { ascending: true });

    if (!error && data) {
      const lastSeven = data.slice(-7);

      const labels = lastSeven.map((item) =>
        new Date(item.entry_date).toLocaleDateString("en-US", {
          weekday: "short",
        })
      );

      const patients = lastSeven.map((item) => item.total_patients);

      setChartData({
        labels,
        datasets: [
          {
            label: "Patients",
            data: patients,
            borderColor: "#f97316",
            backgroundColor: "rgba(249,115,22,.18)",
            fill: true,
            tension: 0.4,
            pointRadius: 4,
            pointBackgroundColor: "#f97316",
          },
        ],
      });

      const today = lastSeven[lastSeven.length - 1]?.total_patients || 0;
      const yesterday = lastSeven[lastSeven.length - 2]?.total_patients || 0;

      setTodayPatients(today);

      if (yesterday > 0) {
        setGrowth((((today - yesterday) / yesterday) * 100).toFixed(1));
      } else {
        setGrowth(0);
      }
    }

    setLoading(false);
  };

  return (
    <div className="patient-count-card">
      <div className="patient-summary">
        <div className="summary-icon">
          <FaUserInjured />
        </div>

        <div>
          <h2>{loading ? "--" : todayPatients}</h2>
          <p>Today's Patients</p>
        </div>

        {!loading && (
          <div className="growth">
            <FaArrowUp />
            <span>{growth}%</span>
          </div>
        )}
      </div>

      {loading ? (
        <div className="chart-loading">Loading...</div>
      ) : chartData.labels.length === 0 ? (
        <div className="chart-loading">No patient data available.</div>
      ) : (
        <ChartCard
          title="Daily Patient Count"
          subtitle="Patients Registered This Week"
          type="line"
          data={chartData}
          options={options}
        />
      )}
    </div>
  );
};

export default DailyPatientCount;