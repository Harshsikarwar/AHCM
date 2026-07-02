import "./RecentActivity.css";
import {
  FaUserPlus,
  FaPills,
  FaUserMd,
  FaExclamationTriangle,
  FaFlask,
  FaRobot,
} from "react-icons/fa";

const activities = [
  {
    id: 1,
    icon: <FaUserPlus />,
    title: "New Patient Registered",
    description: "Rahul Sharma registered at City Health Centre",
    time: "5 min ago",
    color: "#f97316",
  },
  {
    id: 2,
    icon: <FaPills />,
    title: "Medicine Stock Updated",
    description: "Paracetamol stock increased by 500 units",
    time: "18 min ago",
    color: "#ef4444",
  },
  {
    id: 3,
    icon: <FaUserMd />,
    title: "Doctor Assigned",
    description: "Dr. Priya Singh assigned to Emergency Ward",
    time: "35 min ago",
    color: "#fb923c",
  },
  {
    id: 4,
    icon: <FaFlask />,
    title: "Lab Report Completed",
    description: "15 laboratory reports were uploaded",
    time: "1 hour ago",
    color: "#dc2626",
  },
  {
    id: 5,
    icon: <FaRobot />,
    title: "AI Prediction",
    description: "Possible medicine shortage detected",
    time: "2 hours ago",
    color: "#ea580c",
  },
  {
    id: 6,
    icon: <FaExclamationTriangle />,
    title: "Emergency Alert",
    description: "ICU bed occupancy exceeded 90%",
    time: "3 hours ago",
    color: "#b91c1c",
  },
];

const RecentActivity = () => {
  return (
    <div className="recent-activity">
      <div className="activity-header">
        <h3>Recent Activity</h3>
        <button>View All</button>
      </div>

      <div className="activity-list">
        {activities.map((activity) => (
          <div className="activity-item" key={activity.id}>
            <div
              className="activity-icon"
              style={{ background: activity.color }}
            >
              {activity.icon}
            </div>

            <div className="activity-content">
              <h4>{activity.title}</h4>
              <p>{activity.description}</p>
            </div>

            <span className="activity-time">
              {activity.time}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivity;