<<<<<<< HEAD
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
=======
/**
 * Note:
 * - Structure and behaviour match SleepHistory, MeditationHistory,
 *   and HydrationHistory (simple reversed list of all entries).
 * - Only the dataset (activities) and displayed fields differ.
 *
 * Responsibilities:
 * - Retrieve all activity entries from ActivityContext.
 * - Display them newest → oldest using a reversed array.
 */

import { useActivities } from "../../context/ActivityContext";

export default function ActivitiesHistory() {
  // Access global activity data
  const { activities } = useActivities();

  // Reverse order → newest first (same pattern as other history pages)
  const sorted = [...activities].reverse();

  return (
    <div className="page">
      <div className="page__content">
        <h2>Activity History</h2>

        {/* Full activity history list */}
        <ul className="activity-list">
          {sorted.map((a) => (
            <li key={a.id} className="activity-item">
              <strong>{a.type}</strong> — {a.duration} mins
              <br />
              <small>{a.date}</small>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
>>>>>>> c2d5a7186b0cd3d7657a3ffe8873d7665b9f319d
