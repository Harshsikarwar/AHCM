import "./StatusCard.css";

const StatusCard = ({
  title,
  value,
  icon,
  color = "#f97316",
  change,
}) => {
  return (
    <div className="status-card">

      <div
        className="status-icon"
        style={{ backgroundColor: color }}
      >
        {icon}
      </div>

      <div className="status-content">

        <h4>{title}</h4>

        <h2>{value}</h2>

        {change && (
          <span className="status-change">
            {change}
          </span>
        )}

      </div>

    </div>
  );
};

export default StatusCard;