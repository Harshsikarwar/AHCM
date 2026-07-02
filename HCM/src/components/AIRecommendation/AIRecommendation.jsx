import "./AIRecommendation.css";
import {
  FaRobot,
  FaArrowRight,
  FaCheckCircle,
} from "react-icons/fa";

const recommendations = [
  {
    id: 1,
    title: "Medicine Shortage Predicted",
    description:
      "Paracetamol stock may run out within the next 5 days. Consider placing a new order.",
    priority: "High",
  },
  {
    id: 2,
    title: "Increase Doctor Availability",
    description:
      "OPD patient load is expected to increase by 18% tomorrow between 10 AM and 2 PM.",
    priority: "Medium",
  },
  {
    id: 3,
    title: "Bed Optimization",
    description:
      "Transfer stable patients from ICU to General Ward to improve bed availability.",
    priority: "Low",
  },
];

const AIRecommendation = () => {
  return (
    <div className="ai-panel">

      <div className="ai-header">
        <div className="ai-title">
          <FaRobot />
          <h3>AI Recommendations</h3>
        </div>

        <button>View Insights</button>
      </div>

      <div className="recommendation-list">
        {recommendations.map((item) => (
          <div className="recommendation-card" key={item.id}>

            <div className="recommendation-top">
              <h4>{item.title}</h4>

              <span
                className={`priority ${item.priority.toLowerCase()}`}
              >
                {item.priority}
              </span>
            </div>

            <p>{item.description}</p>

            <button className="recommend-btn">
              <FaCheckCircle />
              Apply Recommendation
            </button>

          </div>
        ))}
      </div>

      <div className="ai-footer">
        <FaArrowRight />
        <span>Powered by AI Decision Support</span>
      </div>

    </div>
  );
};

export default AIRecommendation;