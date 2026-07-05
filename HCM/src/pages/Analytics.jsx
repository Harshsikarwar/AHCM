import StatusCard from "../components/StatusCard/StatusCard";
import ChartCard from "../components/ChartCard/ChartCard";
import StockPrediction from "../components/StockPrediction/StockPrediction";
import HealthCenterPerformance from "../components/HealthCenterPerformance/HealthCenterPerformance";
import { supabase } from "../supabase/supabase";
import {
  FaHospital,
  FaUser,
  FaBed,
  FaExclamationTriangle,
  FaPills,
  FaFlask,
  FaUserMd,
} from "react-icons/fa";
import { useState, useEffect } from "react";
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

export default function Analytics(){
    const emptyDataset = {
        labels: [],
        datasets: [
            {
            label: "",
            data: [],
            },
        ],
    };

    const [weeklyPatientData, setWeeklyPatientData] = useState(emptyDataset);
    const [monthlyPatientData, setMonthlyPatientData] = useState(emptyDataset);
    
      useEffect(() => {
        fetchChartData();
      }, []);
    
    const fetchChartData = async () => {
        try {
            const { data, error } = await supabase
            .from("patient_footfall")
            .select("entry_date,total_patients")
            .order("entry_date", { ascending: true });

            if (error) {
            console.error(error);
            return;
            }

            if (!data || data.length === 0) {
            setWeeklyPatientData(emptyDataset);
            setMonthlyPatientData(emptyDataset);
            return;
            }

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
                backgroundColor: "rgba(249,115,22,.18)",
                fill: true,
                tension: 0.4,
                pointRadius: 5,
                pointHoverRadius: 7,
                pointBackgroundColor: "#f97316",
                },
            ],
            });

            const monthlyTotals = Array(12).fill(0);

            data.forEach((item) => {
            const month = new Date(item.entry_date).getMonth();
            monthlyTotals[month] += item.total_patients;
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
                data: monthlyTotals,
                borderColor: "#dc2626",
                backgroundColor: "rgba(220,38,38,.15)",
                fill: true,
                tension: 0.35,
                pointRadius: 4,
                pointHoverRadius: 6,
                pointBackgroundColor: "#dc2626",
                },
            ],
            });
        } catch (err) {
            console.error(err);
        }
        };

    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const role = user.role || "";

    const isDistrictAdmin = role === "DISTRICT_ADMIN";
    const isCenterAdmin = role === "CENTER_ADMIN";
    const isDoctor = role === "DOCTOR";
    const isPharmacist = role === "PHARMACIST";
    const isLabTechnician = role === "LAB_TECHNICIAN";
    const isDataEntry = role === "DATA_ENTRY_OPERATOR";
    return(
        <>
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

        <div className="PFCard">
            <HealthCenterPerformance/>
        </div>
        
        <div>
            <StockPrediction/>
        </div>
        </>
    )
}