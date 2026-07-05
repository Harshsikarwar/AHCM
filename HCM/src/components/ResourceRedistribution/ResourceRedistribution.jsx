import { useEffect, useState } from "react";
import {
  FaExchangeAlt,
  FaArrowRight,
  FaWarehouse,
  FaHospital,
  FaBoxes,
  FaExclamationTriangle,
  FaRobot,
  FaCheckCircle,
  FaSyncAlt,
} from "react-icons/fa";
import "./ResourceRedistribution.css";

const ResourceRedistribution = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchRedistribution = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        "http://localhost:8000/api/ai_features/resourceredistribution/"
      );

      if (!response.ok) {
        throw new Error("Unable to fetch AI recommendations.");
      }

      const result = await response.json();

      if (result.success) {
        setData(result.analysis);
      } else {
        throw new Error("No recommendation available.");
      }
    } catch (err) {
      setError(err.message);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchRedistribution();
  }, []);

  const priorityClass = (priority) => {
    switch (priority?.toLowerCase()) {
      case "high":
        return "high";

      case "medium":
        return "medium";

      case "low":
        return "low";

      default:
        return "";
    }
  };

  return (
    <div className="redistribution-page">

      <div className="redistribution-header">

        <div>

          <h2>AI Resource Redistribution</h2>

          <p>
            Smart recommendations for medicine transfer between healthcare
            centres.
          </p>

        </div>

        <button
          className="refresh-btn"
          onClick={fetchRedistribution}
        >
          <FaSyncAlt />
          Refresh
        </button>

      </div>

      {loading && (
        <div className="loading-card">
          Loading recommendations...
        </div>
      )}

      {!loading && error && (
        <div className="loading-card error-card">
          {error}
        </div>
      )}

      {!loading && !error && data && (
        <>

          <div className="summary-card">

            <div className="summary-left">

              <FaRobot className="summary-icon" />

              <div>

                <h3>AI Summary</h3>

                <p>{data.summary}</p>

              </div>

            </div>

            <div className="overall-status">
              {data.overall_status}
            </div>

          </div>

          <div className="redistribution-grid">

            {data.redistributions.length === 0 ? (

              <div className="empty-card">
                No redistribution required.
              </div>

            ) : (

              data.redistributions.map(
                (item, index) => (

                  <div
                    className="redistribution-card"
                    key={index}
                  >

                    <div className="card-top">

                      <div className="medicine">

                        <FaBoxes />

                        <div>

                          <h3>
                            {item.medicine}
                          </h3>

                          <span>
                            Medicine Transfer
                          </span>

                        </div>

                      </div>

                      <span
                        className={`priority ${priorityClass(
                          item.priority
                        )}`}
                      >
                        {item.priority}
                      </span>

                    </div>

                    <div className="transfer">

                      <div className="centre">

                        <FaWarehouse />

                        <div>

                          <label>
                            From Centre
                          </label>

                          <strong>
                            {item.from_centre}
                          </strong>

                        </div>

                      </div>

                      <FaArrowRight className="arrow" />

                      <div className="centre">

                        <FaHospital />

                        <div>

                          <label>
                            To Centre
                          </label>

                          <strong>
                            {item.to_centre}
                          </strong>

                        </div>

                      </div>

                    </div>

                    <div className="stock-info">

                      <div className="stock-box">

                        <span>
                          Available
                        </span>

                        <h3>
                          {item.available_stock}
                        </h3>

                      </div>

                      <div className="stock-box">

                        <span>
                          Required
                        </span>

                        <h3>
                          {item.required_stock}
                        </h3>

                      </div>

                      <div className="stock-box transfer-box">

                        <span>
                          Transfer
                        </span>

                        <h2>
                          {item.recommended_transfer}
                        </h2>

                      </div>

                    </div>

                    <div className="reason">

                      <FaExclamationTriangle />

                      <div>

                        <h4>
                          Reason
                        </h4>

                        <p>
                          {item.reason}
                        </p>

                      </div>

                    </div>

                  </div>

                )
              )

            )}

          </div>

          <div className="recommendation-card">

            <div className="recommendation-title">

              <FaRobot />

              <h3>
                General Recommendations
              </h3>

            </div>

            <div className="recommendation-list">

              {data.general_recommendations.map(
                (item, index) => (

                  <div
                    className="recommendation-item"
                    key={index}
                  >

                    <FaCheckCircle />

                    <span>{item}</span>

                  </div>

                )
              )}

            </div>

          </div>

        </>
      )}

    </div>
  );
};

export default ResourceRedistribution;