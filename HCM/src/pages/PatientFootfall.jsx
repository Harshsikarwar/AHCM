import { useEffect, useState } from "react";
import { supabase } from "../supabase/supabase";
import DailyPatientCount from "../components/DailyPatientCount/DailyPatientCount";
import ChartCard from "../components/ChartCard/ChartCard";
import PatientRecords from "../components/PatientRecords/PatientRecords";
import "../styles/patientfootfall.css";

const weeklyOptions = {
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
      title: {
        display: true,
        text: "Patients",
      },
    },
    x: {
      title: {
        display: true,
        text: "Days",
      },
    },
  },
};

const monthlyOptions = {
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
      title: {
        display: true,
        text: "Patients",
      },
    },
    x: {
      title: {
        display: true,
        text: "Months",
      },
    },
  },
};

export default function PatientFootfall() {
  const [weeklyPatientData, setWeeklyPatientData] = useState({
    labels: [],
    datasets: [],
  });

  const [monthlyPatientData, setMonthlyPatientData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    fetchChartData();
  }, []);

  const fetchChartData = async () => {
    const { data, error } = await supabase
      .from("patient_footfall")
      .select("entry_date,total_patients")
      .order("entry_date", { ascending: true });

    if (error) return;

    const weekly = data.slice(-7);

    setWeeklyPatientData({
      labels: weekly.map((item) =>
        new Date(item.entry_date).toLocaleDateString("en-US", {
          weekday: "short",
        })
      ),
      datasets: [
        {
          label: "Patient Footfall",
          data: weekly.map((item) => item.total_patients),
          borderColor: "#f97316",
          backgroundColor: "rgba(249,115,22,0.18)",
          fill: true,
          tension: 0.4,
          pointRadius: 5,
          pointHoverRadius: 7,
          pointBackgroundColor: "#f97316",
        },
      ],
    });

    const months = Array(12).fill(0);

    data.forEach((item) => {
      const month = new Date(item.entry_date).getMonth();
      months[month] += item.total_patients;
    });

    setMonthlyPatientData({
      labels: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      datasets: [
        {
          label: "Patient Footfall",
          data: months,
          borderColor: "#dc2626",
          backgroundColor: "rgba(220,38,38,0.15)",
          fill: true,
          tension: 0.35,
          pointRadius: 4,
          pointHoverRadius: 6,
          pointBackgroundColor: "#dc2626",
        },
      ],
    });
  };

  return (
    <>
      <div className="PFCard2">
        <DailyPatientCount />
      </div>

      <div className="PFCard2">
        <PatientRecords />
      </div>

      <div className="PFCard">
        <ChartCard
          title="Weekly Patient Footfall"
          subtitle="Patients visited this week"
          type="line"
          data={weeklyPatientData}
          options={weeklyOptions}
        />

        <ChartCard
          title="Monthly Patient Footfall"
          subtitle="Patient visits throughout the year"
          type="line"
          data={monthlyPatientData}
          options={monthlyOptions}
        />
      </div>
    </>
  );
}