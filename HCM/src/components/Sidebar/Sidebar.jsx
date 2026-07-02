import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Auth from "../../auth/auth";
import "./Sidebar.css";

import {
  FaBars,
  FaTimes,
  FaTachometerAlt,
  FaHospital,
  FaPills,
  FaUserMd,
  FaFlask,
  FaBed,
  FaChartLine,
  FaRobot,
  FaExclamationTriangle,
  FaUsers,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const closeSidebar = () => setOpen(false);

  const handleLogout = async () => {
    const { error } = await Auth.logout();

    if (error) {
      alert(error.message);
      return;
    }

    navigate("/login", { replace: true });
  };

  return (
    <>
      <button
        className="menu-toggle"
        onClick={() => setOpen(!open)}
      >
        {open ? <FaTimes /> : <FaBars />}
      </button>

      {open && (
        <div
          className="sidebar-overlay"
          onClick={closeSidebar}
        />
      )}

      <aside className={`sidebar ${open ? "show" : ""}`}>
        <div className="sidebar-logo">
          <span className="logo-icon">🏥</span>
          <h2>Health Center</h2>
        </div>

        <nav className="sidebar-menu">
          <NavLink to="/" onClick={closeSidebar}>
            <FaTachometerAlt />
            <span>Dashboard</span>
          </NavLink>

          <NavLink to="/centres" onClick={closeSidebar}>
            <FaHospital />
            <span>Health Centres</span>
          </NavLink>

          <NavLink to="/medicines" onClick={closeSidebar}>
            <FaPills />
            <span>Medicines</span>
          </NavLink>

          <NavLink to="/doctors" onClick={closeSidebar}>
            <FaUserMd />
            <span>Doctors</span>
          </NavLink>

          <NavLink to="/laboratory" onClick={closeSidebar}>
            <FaFlask />
            <span>Laboratory</span>
          </NavLink>

          <NavLink to="/beds" onClick={closeSidebar}>
            <FaBed />
            <span>Beds</span>
          </NavLink>

          <NavLink to="/analytics" onClick={closeSidebar}>
            <FaChartLine />
            <span>Analytics</span>
          </NavLink>

          <NavLink to="/ai-insights" onClick={closeSidebar}>
            <FaRobot />
            <span>AI Insights</span>
          </NavLink>

          <NavLink to="/alerts" onClick={closeSidebar}>
            <FaExclamationTriangle />
            <span>Alerts</span>
          </NavLink>

          <NavLink to="/users" onClick={closeSidebar}>
            <FaUsers />
            <span>Users</span>
          </NavLink>
        </nav>

        <div className="sidebar-bottom">
          <NavLink to="/settings" onClick={closeSidebar}>
            <FaCog />
            <span>Settings</span>
          </NavLink>

          <button
            className="logout-btn"
            onClick={handleLogout}
          >
            <FaSignOutAlt />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;