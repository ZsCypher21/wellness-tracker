import { useState, useEffect } from "react";
import { useActivities } from "../context/ActivityContext";
import { useAuth } from "../context/AuthContext";
import Modal from "../components/ui/Modal";
import ActivityForm from "../components/features/ActivityForm";
import { Navigate } from "react-router-dom";

export default function Activities() {
  const { token } = useAuth();
  const { activities, loading, loadRecent } = useActivities();
  const [showAdd, setShowAdd] = useState(false);

  useEffect(() => {
    if (token) loadRecent();
  }, [token]);

  if (!token) return <Navigate to="/login" />;

  const recent = [...activities].slice(0, 5);

  return (
    <div className="page">
      <div className="page__content">
        <h2>Activities</h2>

        {loading && <p>Loading...</p>}

        <ul className="activity-list">
          {recent.map((a) => (
            <li key={a.id} className="activity-item">
              <strong>{a.activity_type}</strong> — {a.duration_minutes} mins
              <br />
              <small>{a.activity_date}</small>
            </li>
          ))}
        </ul>

        <div className="btn-center" style={{ gap: "1rem" }}>
          <button className="btn-primary" onClick={() => setShowAdd(true)}>
            Add Activity
          </button>

          <button
            className="btn"
            onClick={() => (window.location.href = "/activities/history")}
          >
            History
          </button>
        </div>

        <Modal isOpen={showAdd} onClose={() => setShowAdd(false)}>
          <h3>Add Activity</h3>
          <ActivityForm onSubmit={() => setShowAdd(false)} />
        </Modal>
      </div>
    </div>
  );
}
