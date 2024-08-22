import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const UserDashboard = () => {
  const loggedInUserJSON = localStorage.getItem("loggedInUser");
  const [userId, setUserId] = useState(JSON.parse(loggedInUserJSON)?.userid);
  useEffect(() => {
    setUserId(JSON.parse(loggedInUserJSON)?.userid);
  }, [loggedInUserJSON]);

  const navigate = useNavigate();
  const handleSubmitSadhana = () => {
    navigate("/sadhana-form");
  };

  const handleCheckReport = () => {
    navigate(`/show-my-report/${userId}`);
  };
  return (
    <>
      <button onClick={() => handleSubmitSadhana()}>Submit Sadhana</button>
      <button onClick={() => handleCheckReport()}>Show my report</button>
    </>
  );
};

export default UserDashboard;
