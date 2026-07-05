import { useEffect, useState } from "react";
import {
  FaUsers,
  FaChartLine,
  FaCalendarAlt,
  FaArrowUp,
  FaArrowDown,
  FaRobot,
  FaExclamationTriangle,
  FaSyncAlt,
  FaCheckCircle,
} from "react-icons/fa";
import "./PatientFootfallPrediction.css";

const PatientFootfallPrediction = () => {
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchPrediction = async () => {
    setLoading(true);
    setError("");

    try {
        const response = await fetch(
        "https://mysite-ngn3.onrender.com/api/ai_features/patientfootfall/"
        );

        if (!response.ok) {
        throw new Error("Unable to fetch prediction.");
        }

        const data = await response.json();

        if (data.success) {
        setPrediction(data.analysis);
        } else {
        throw new Error("Prediction not available.");
        }
    } catch (err) {
        setError(err.message);
    }

    setLoading(false);
    };

  useEffect(() => {
    fetchPrediction();
  }, []);

  const riskClass = (risk) => {
    switch (risk?.toLowerCase()) {
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
    <div className="patient-prediction">

      <div className="prediction-header">

        <div>

          <h2>AI Patient Footfall Prediction</h2>

          <p>
            AI generated prediction for upcoming patient traffic.
          </p>

        </div>

        <button
          className="refresh-btn"
          onClick={fetchPrediction}
        >
          <FaSyncAlt />
          Refresh
        </button>

      </div>

      {loading && (
        <div className="prediction-loading">
          Loading prediction...
        </div>
      )}

      {!loading && error && (
        <div className="prediction-error">
          {error}
        </div>
      )}

      {!loading && !error && prediction && (

        <>

          <div className="summary-card">

            <div className="summary-left">

              <FaRobot className="summary-icon" />

              <div>

                <h3>AI Summary</h3>

                <p>{prediction.summary}</p>

              </div>

            </div>

            <span
              className={`risk-badge ${riskClass(
                prediction.risk_level
              )}`}
            >
              {prediction.risk_level} Risk
            </span>

          </div>

          <div className="prediction-grid">

            <div className="info-card">

              <FaChartLine />

              <h4>Overall Trend</h4>

              <p>{prediction.overall_patient_trend}</p>

            </div>

            <div className="info-card">

              <FaCalendarAlt />

              <h4>Peak Day</h4>

              <p>{prediction.peak_day}</p>

            </div>

            <div className="info-card">

              <FaArrowUp />

              <h4>Highest Patients</h4>

              <h3>{prediction.highest_patient_count}</h3>

            </div>

            <div className="info-card">

              <FaArrowDown />

              <h4>Lowest Patients</h4>

              <h3>{prediction.lowest_patient_count}</h3>

            </div>

            <div className="info-card">

              <FaUsers />

              <h4>Average Daily Patients</h4>

              <h3>{prediction.average_daily_patients}</h3>

            </div>

            <div className="info-card forecast">

              <FaChartLine />

              <h4>Forecast Next Day</h4>

              <h2>{prediction.forecast_next_day}</h2>

            </div>

          </div>

          <div className="recommendation-card">

            <div className="recommendation-title">

              <FaExclamationTriangle />

              <h3>AI Recommendations</h3>

            </div>

            <div className="recommendation-list">

              {prediction.recommendations.map(
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

export default PatientFootfallPrediction;