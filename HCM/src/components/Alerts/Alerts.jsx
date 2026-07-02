import "./Alerts.css";
import {
  FaExclamationTriangle,
  FaInfoCircle,
  FaCheckCircle,
  FaClock,
} from "react-icons/fa";

const alerts = [
  {
    id: 1,
    type: "critical",
    title: "ICU Bed Occupancy Critical",
    message: "ICU occupancy has reached 96%. Immediate action is recommended.",
    time: "5 min ago",
    icon: <FaExclamationTriangle />,
  },
  {
    id: 2,
    type: "warning",
    title: "Medicine Stock Running Low",
    message: "Paracetamol stock is below the minimum threshold.",
    time: "20 min ago",
    icon: <FaInfoCircle />,
  },
  {
    id: 3,
    type: "success",
    title: "Backup Completed",
    message: "Daily database backup completed successfully.",
    time: "1 hour ago",
    icon: <FaCheckCircle />,
  },
];

const Alerts = () => {
  return (
    <div className="alerts-card">

      <div className="alerts-header">
        <h3>Alerts</h3>
        <span>{alerts.length} Active</span>
      </div>

      <div className="alerts-list">

        {alerts.map((alert) => (
          <div className={`alert-item ${alert.type}`} key={alert.id}>

            <div className="alert-icon">
              {alert.icon}
            </div>

            <div className="alert-content">
              <h4>{alert.title}</h4>
              <p>{alert.message}</p>

              <div className="alert-time">
                <FaClock />
                <span>{alert.time}</span>
              </div>
            </div>

          </div>
        ))}

      </div>

    </div>
  );
};

export default Alerts;