import "./WelcomeCard.css";
import { FaUserCircle } from "react-icons/fa";

const WelcomeCard = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="welcome-card">

      <div className="welcome-left">

        <div className="welcome-avatar">
          <FaUserCircle />
        </div>

        <div>

          <h3>
            Welcome back,
            <span> {user?.full_name || "User"} 👋</span>
          </h3>

          <p>
            Have a great day! Here's what's happening across your Health Center
            Management System.
          </p>

        </div>

      </div>

      <div className="welcome-right">

        <div className="user-info">

          <span className="info-title">
            Logged in as
          </span>

          <h4>
            {user?.full_name || "-"}
          </h4>

          <span className="role-badge">
            {user?.role?.replaceAll("_", " ")}
          </span>

        </div>

      </div>

    </div>
  );
};

export default WelcomeCard;