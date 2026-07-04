import React from "react";
import StatusCard from "../components/StatusCard/StatusCard";
import ChartCard from "../components/ChartCard/ChartCard";
import RecentActivity from "../components/RecentActivity/RecentActivity";
import AIRecommendation from "../components/AIRecommendation/AIRecommendation";
import Alerts from "../components/Alerts/Alerts";
import "../styles/dashboard.css";
import {
  FaHospital,
  FaUser,
  FaBed,
  FaExclamationTriangle,
  FaPills,
  FaFlask,
  FaUserMd,
} from "react-icons/fa";
import WelcomeCard from "../components/WelcomeCard/WelcomeCard";

export default function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const role = user.role || "";

  const isDistrictAdmin = role === "DISTRICT_ADMIN";
  const isCenterAdmin = role === "CENTER_ADMIN";
  const isDoctor = role === "DOCTOR";
  const isPharmacist = role === "PHARMACIST";
  const isLabTechnician = role === "LAB_TECHNICIAN";
  const isDataEntry = role === "DATA_ENTRY_OPERATOR";

  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May"],
    datasets: [
      {
        label: "Patients",
        data: [20, 35, 40, 55, 70],
        borderColor: "#f97316",
        backgroundColor: "rgba(249,115,22,.2)",
      },
    ],
  };

  const bedOccupancyData = {
    labels: ["Occupied Beds", "Available Beds"],
    datasets: [
      {
        data: [186, 64],
        backgroundColor: ["#f97316", "#dc2626"],
        borderWidth: 0,
        hoverOffset: 8,
      },
    ],
  };

  const bedOccupancyOptions = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "70%",
    plugins: {
      legend: {
        position: "bottom",
      },
    },
  };

  return (
    <>
      <WelcomeCard />

      <div style={{ marginBottom: "20px" }}>
        <h1>Dashboard</h1>
      </div>

      <div style={{ marginBottom: "10px" }}>
        <h3>Quick Statistics</h3>
      </div>

      <div className="TotalCard" style={{ display: "flex", gap: "10px" }}>
        {(isDistrictAdmin || isCenterAdmin) && (
          <>
            <StatusCard title="Total Centers" icon={<FaHospital />} value={10} />
            <StatusCard title="Patients" icon={<FaUser />} value={500} />
            <StatusCard title="Beds" icon={<FaBed />} value={600} />
            <StatusCard
              title="Alerts"
              icon={<FaExclamationTriangle />}
              value={150}
            />
          </>
        )}

        {isDoctor && (
          <>
            <StatusCard title="Today's Patients" icon={<FaUser />} value={42} />
            <StatusCard title="Available Beds" icon={<FaBed />} value={18} />
          </>
        )}

        {isPharmacist && (
          <>
            <StatusCard title="Medicines" icon={<FaPills />} value={125} />
            <StatusCard
              title="Low Stock"
              icon={<FaExclamationTriangle />}
              value={8}
            />
          </>
        )}

        {isLabTechnician && (
          <>
            <StatusCard title="Available Tests" icon={<FaFlask />} value={26} />
            <StatusCard
              title="Low Kits"
              icon={<FaExclamationTriangle />}
              value={3}
            />
          </>
        )}

        {isDataEntry && (
          <>
            <StatusCard title="Today's Patients" icon={<FaUser />} value={500} />
            <StatusCard title="Occupied Beds" icon={<FaBed />} value={186} />
          </>
        )}
      </div>

      {(isDistrictAdmin || isCenterAdmin) && (
        <>
          <div className="Card">
            <ChartCard title="Patients Trend" type="bar" data={data} />
            <ChartCard
              title="Bed Occupancy"
              subtitle="Current Bed Availability"
              type="doughnut"
              data={bedOccupancyData}
              options={bedOccupancyOptions}
            />
          </div>

          <div className="Card">
            <AIRecommendation />
          </div>
        </>
      )}

      {(isDoctor || isDataEntry) && (
        <div className="Card">
          <ChartCard title="Patients Trend" type="bar" data={data} />
        </div>
      )}

      {(isPharmacist || isLabTechnician) && (
        <div className="Card">
          <Alerts />
        </div>
      )}

      <div className="Card">
        <RecentActivity />
      </div>

      {(isDistrictAdmin ||
        isCenterAdmin ||
        isPharmacist ||
        isLabTechnician) && (
        <div className="Card">
          <Alerts />
        </div>
      )}
    </>
  );
}