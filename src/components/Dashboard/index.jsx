import { useNavigate } from "react-router-dom";
import "./index.css"; // Import the CSS file

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Wexa's Quiz</h1>
      <p className="dashboard-subtitle">
        Test your knowledge and have fun with our interactive quiz!
      </p>
      <button className="start-quiz-button" onClick={() => navigate("/quiz")}>
        Start Quiz
      </button>
    </div>
  );
};

export default Dashboard;
