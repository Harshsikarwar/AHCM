import React from "react";
import StatusCard from "../components/StatusCard/StatusCard";
import ChartCard from "../components/ChartCard/ChartCard";
import RecentActivity from "../components/RecentActivity/RecentActivity"
import AIRecommendation from "../components/AIRecommendation/AIRecommendation"
import Alerts from "../components/Alerts/Alerts"
import '../styles/dashboard.css';
import {FaHospital, FaUser, FaBed, FaExclamationTriangle} from "react-icons/fa";
export default function Dashboard(){
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

            backgroundColor: [
                "#f97316",
                "#dc2626",
            ],

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
    return(
        <>
            <div style={{marginBottom:"20px"}}><h1>Dashboard</h1></div>
            <div style={{marginBottom:"10px"}}><h3>Quick Statistics</h3></div>
            <div className="TotalCard" style={{display:"flex", gap:"10px"}}>
                <StatusCard title={"Total Centers"} icon={<FaHospital/>} value={10}/>
                <StatusCard title={"Patients"} icon={<FaUser/>} value={500}/>
                <StatusCard title={"Beds"} icon={<FaBed/>} value={600}/>
                <StatusCard title={"Alerts"} icon={<FaExclamationTriangle/>} value={150}/>
            </div>
            <div className="Card">
                <ChartCard title={"Patients Trend"} type={"bar"} data={data}/>
                <ChartCard
                title="Bed Occupancy"
                subtitle="Current Bed Availability"
                type="doughnut"
                data={bedOccupancyData}
                options={bedOccupancyOptions}
                />
            </div>
            <div className="Card">
                <AIRecommendation/>
            </div>
            <div className="Card">
                <RecentActivity />
            </div>
            <div className="Card">
                <Alerts/>
            </div>
        </>
    )
}