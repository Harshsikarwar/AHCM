import { useEffect, useMemo, useState } from "react";
import {
  FaSearch,
  FaExclamationTriangle,
  FaCapsules,
  FaClock,
  FaSyncAlt,
} from "react-icons/fa";
import "./StockPrediction.css";

const API_URL = "http://localhost:8000/api/ai_features/stockprediction/";

const StockPrediction = () => {
  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [riskFilter, setRiskFilter] = useState("");
  const [sortBy, setSortBy] = useState("risk");

  useEffect(() => {
    fetchPredictions();
  }, []);

  const fetchPredictions = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error("Failed to fetch stock prediction.");
      }

      const data = await response.json();
      setPredictions(data);
    } catch (err) {
      setError(err.message);
    }

    setLoading(false);
  };

  const filteredData = useMemo(() => {
    let data = [...predictions];

    if (search) {
      data = data.filter((item) =>
        item.medicine_name
          ?.toLowerCase()
          .includes(search.toLowerCase())
      );
    }

    if (riskFilter) {
      data = data.filter(
        (item) => item.risk_level === riskFilter
      );
    }

    switch (sortBy) {
      case "stock":
        data.sort(
          (a, b) => a.current_stock - b.current_stock
        );
        break;

      case "days":
        data.sort(
          (a, b) =>
            a.estimated_days_left -
            b.estimated_days_left
        );
        break;

      case "medicine":
        data.sort((a, b) =>
          a.medicine_name.localeCompare(
            b.medicine_name
          )
        );
        break;

      case "risk":
        const order = {
          Critical: 1,
          High: 2,
          Medium: 3,
          Low: 4,
        };

        data.sort(
          (a, b) =>
            order[a.risk_level] -
            order[b.risk_level]
        );
        break;

      default:
        break;
    }

    return data;
  }, [predictions, search, riskFilter, sortBy]);

  return (
    <div className="stock-prediction">

      <div className="prediction-header">

        <div>

          <h2>AI Stock Prediction</h2>

          <p>
            Medicines predicted to require replenishment
          </p>

        </div>

        <button
          className="refresh-btn"
          onClick={fetchPredictions}
        >
          <FaSyncAlt />
          Refresh
        </button>

      </div>

      <div className="prediction-filters">

        <div className="search-box">

          <FaSearch />

          <input
            type="text"
            placeholder="Search medicine..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

        </div>

        <select
          value={riskFilter}
          onChange={(e) =>
            setRiskFilter(e.target.value)
          }
        >
          <option value="">All Risk Levels</option>
          <option value="Critical">Critical</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>

        <select
          value={sortBy}
          onChange={(e) =>
            setSortBy(e.target.value)
          }
        >
          <option value="risk">
            Sort by Risk
          </option>

          <option value="days">
            Sort by Days Left
          </option>

          <option value="stock">
            Sort by Current Stock
          </option>

          <option value="medicine">
            Sort by Medicine
          </option>

        </select>

      </div>

      {loading && (
        <div className="loading-card">
          Loading predictions...
        </div>
      )}

      {error && (
        <div className="error-card">
          {error}
        </div>
      )}

      {!loading &&
        !error &&
        filteredData.length === 0 && (
          <div className="empty-card">
            No predictions found.
          </div>
        )}

      <div className="prediction-grid">

        {filteredData.map((item, index) => (

          <div
            className="prediction-card"
            key={item.medicine_id || index}
          >

            <div className="prediction-top">

              <div className="medicine">

                <FaCapsules />

                <h3>
                  {item.medicine_name}
                </h3>

              </div>

              <span
                className={`risk ${item.risk_level
                  ?.toLowerCase()
                  .replace(" ", "-")}`}
              >
                <FaExclamationTriangle />
                {item.risk_level}
              </span>

            </div>

            <div className="prediction-body">

              <div className="info">

                <span>Current Stock</span>

                <strong>
                  {item.available_quantity}
                </strong>

              </div>

              <div className="info">

                <span>Minimum Stock</span>

                <strong>
                  {item.minimum_stock}
                </strong>

              </div>

              <div className="info">

                <span>Estimated Days Left</span>

                <strong>
                  <FaClock />
                  {" "}
                  {item.estimated_days_left}
                </strong>

              </div>

            </div>

            <div className="recommendation">

              <h4>
                Recommendation
              </h4>

              <p>
                {item.recommendation}
              </p>

            </div>

            <div className="prediction-footer">

              <small>

                Last Updated

                {" "}

                {new Date(
                  item.last_updated
                ).toLocaleString()}

              </small>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
};

export default StockPrediction;