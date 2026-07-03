import DailyPatientCount from "../components/DailyPatientCount/DailyPatientCount";
import ChartCard from "../components/ChartCard/ChartCard";
import PatientRecords from "../components/PatientRecords/PatientRecords";
import '../styles/patientfootfall.css';

const weeklyPatientData = {
  labels: [
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
    "Sun",
  ],

  datasets: [
    {
      label: "Patient Footfall",

      data: [145, 162, 158, 184, 205, 198, 176],

      borderColor: "#f97316",

      backgroundColor: "rgba(249,115,22,0.18)",

      fill: true,

      tension: 0.4,

      pointRadius: 5,

      pointHoverRadius: 7,

      pointBackgroundColor: "#f97316",
    },
  ],
};

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

const monthlyPatientData = {
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

      data: [
        4120,
        4350,
        4680,
        4520,
        4865,
        5100,
        5340,
        5210,
        5490,
        5715,
        5900,
        6150,
      ],

      borderColor: "#dc2626",

      backgroundColor: "rgba(220,38,38,0.15)",

      fill: true,

      tension: 0.35,

      pointRadius: 4,

      pointHoverRadius: 6,

      pointBackgroundColor: "#dc2626",
    },
  ],
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

export default function PatientFootfall(){
    return(
        <>
        <div className="PFCard2">
            <DailyPatientCount/>
        </div>

        <div className="PFCard2">
          <PatientRecords/>
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
    )
}