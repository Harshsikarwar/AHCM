import { useMemo, useState } from "react";
import {
  FaSearch,
  FaFilter,
  FaExclamationTriangle,
  FaCheckCircle,
  FaClock,
  FaEye,
} from "react-icons/fa";
import "../styles/alerts.css";

const Alerts = () => {
  const [search, setSearch] = useState("");
  const [severityFilter, setSeverityFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [sortBy, setSortBy] = useState("latest");

  const [alerts] = useState([
    {
      id: 1,
      title: "Low Medicine Stock",
      message: "Paracetamol stock is below the minimum threshold.",
      centre: "District Hospital",
      severity: "High",
      status: "Pending",
      time: "2026-07-06 09:20",
    },
    {
      id: 2,
      title: "Bed Occupancy High",
      message: "ICU occupancy has reached 95%.",
      centre: "City Health Centre",
      severity: "Medium",
      status: "Pending",
      time: "2026-07-06 08:45",
    },
    {
      id: 3,
      title: "Laboratory Kit Running Low",
      message: "COVID-19 test kits are running low.",
      centre: "Urban PHC",
      severity: "High",
      status: "Resolved",
      time: "2026-07-05 18:30",
    },
    {
      id: 4,
      title: "Doctor Absent",
      message: "Dr. Sharma marked absent today.",
      centre: "Community Health Centre",
      severity: "Low",
      status: "Pending",
      time: "2026-07-05 11:10",
    },
    {
      id: 5,
      title: "Patient Footfall Increased",
      message: "Patient visits increased by 42% today.",
      centre: "District Hospital",
      severity: "Medium",
      status: "Resolved",
      time: "2026-07-04 15:25",
    },
  ]);

  const filteredAlerts = useMemo(() => {
    let data = [...alerts];

    if (search) {
      data = data.filter(
        (item) =>
          item.title
            .toLowerCase()
            .includes(search.toLowerCase()) ||
          item.centre
            .toLowerCase()
            .includes(search.toLowerCase())
      );
    }

    if (severityFilter) {
      data = data.filter(
        (item) => item.severity === severityFilter
      );
    }

    if (statusFilter) {
      data = data.filter(
        (item) => item.status === statusFilter
      );
    }

    if (sortBy === "latest") {
      data.sort(
        (a, b) => new Date(b.time) - new Date(a.time)
      );
    } else {
      data.sort(
        (a, b) => new Date(a.time) - new Date(b.time)
      );
    }

    return data;
  }, [
    alerts,
    search,
    severityFilter,
    statusFilter,
    sortBy,
  ]);

  const severityClass = (severity) => {
    switch (severity) {
      case "High":
        return "high";

      case "Medium":
        return "medium";

      default:
        return "low";
    }
  };

  return (
    <div className="alerts-page">

      <div className="alerts-header">

        <div>

          <h2>Alerts</h2>

          <p>
            Monitor critical notifications across all health centres.
          </p>

        </div>

      </div>

      <div className="alerts-filters">

        <div className="search-box">

          <FaSearch />

          <input
            type="text"
            placeholder="Search alerts..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

        </div>

        <select
          value={severityFilter}
          onChange={(e) =>
            setSeverityFilter(e.target.value)
          }
        >
          <option value="">
            All Severity
          </option>

          <option value="High">
            High
          </option>

          <option value="Medium">
            Medium
          </option>

          <option value="Low">
            Low
          </option>

        </select>

        <select
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(e.target.value)
          }
        >
          <option value="">
            All Status
          </option>

          <option value="Pending">
            Pending
          </option>

          <option value="Resolved">
            Resolved
          </option>

        </select>

        <select
          value={sortBy}
          onChange={(e) =>
            setSortBy(e.target.value)
          }
        >
          <option value="latest">
            Latest
          </option>

          <option value="oldest">
            Oldest
          </option>

        </select>

      </div>

      <div className="alerts-table">

        <table>

          <thead>

            <tr>

              <th>Alert</th>

              <th>Centre</th>

              <th>Severity</th>

              <th>Status</th>

              <th>Time</th>

              <th>Action</th>

            </tr>

          </thead>

          <tbody>

            {filteredAlerts.length === 0 ? (

              <tr>

                <td colSpan="6">
                  No Alerts Found
                </td>

              </tr>

            ) : (

              filteredAlerts.map((alert) => (

                <tr key={alert.id}>

                  <td>

                    <div className="alert-info">

                      <FaExclamationTriangle />

                      <div>

                        <h4>
                          {alert.title}
                        </h4>

                        <p>
                          {alert.message}
                        </p>

                      </div>

                    </div>

                  </td>

                  <td>
                    {alert.centre}
                  </td>

                  <td>

                    <span
                      className={`severity ${severityClass(
                        alert.severity
                      )}`}
                    >
                      {alert.severity}
                    </span>

                  </td>

                  <td>

                    <span
                      className={
                        alert.status === "Resolved"
                          ? "status resolved"
                          : "status pending"
                      }
                    >
                      {alert.status}
                    </span>

                  </td>

                  <td>

                    <div className="alert-time">

                      <FaClock />

                      {new Date(
                        alert.time
                      ).toLocaleString()}

                    </div>

                  </td>

                  <td>

                    <div className="alert-actions">

                      <button className="view-btn">

                        <FaEye />

                        View

                      </button>

                      {alert.status ===
                        "Pending" && (

                        <button className="resolve-btn">

                          <FaCheckCircle />

                          Resolve

                        </button>

                      )}

                    </div>

                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default Alerts;