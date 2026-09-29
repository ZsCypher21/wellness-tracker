import { useEffect } from "react";
import { useActivities } from "../../context/ActivityContext";
import { useAuth } from "../../context/AuthContext";
import { Navigate } from "react-router-dom";

export default function ActivitiesHistory() {
  const { token } = useAuth();
  const { activities, loading, loadHistory } = useActivities();

  useEffect(() => {
    if (token) loadHistory();
  }, [token]);

  if (!token) return <Navigate to="/login" />;

  return (
    <div className="page">
      <div className="page__content">
        <h2>Activity History</h2>

        {loading && <p>Loading...</p>}

        <ul className="activity-list">
          {activities.map((a) => (
            <li key={a.id} className="activity-item">
              <strong>{a.activity_type}</strong> — {a.duration_minutes} mins
              <br />
              <small>{a.activity_date}</small>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
