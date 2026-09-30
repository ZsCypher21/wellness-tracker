import { useEffect, useState } from "react";
import { useActivities } from "../../context/ActivityContext";
import { useAuth } from "../../context/AuthContext";
import { Navigate, useNavigate } from "react-router-dom";
import HistoryItem from "../../components/common/HistoryItem";
import EditActivityModal from "../../components/features/EditActivityModal";
import { putJson, deleteJson } from "../../services/api";

export default function ActivitiesHistory() {
  const { isAuthenticated, token } = useAuth();
  const { activities, loading, loadHistory } = useActivities();

  const [editing, setEditing] = useState(null);
  const [editOpen, setEditOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (token) loadHistory(token);
  }, [token]);

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  async function handleSave(updated) {
    await putJson(`/activities/${updated.id}`, updated, token);
    loadHistory(token);
    setEditOpen(false);
    setEditing(null);
  }

  async function handleDelete(item) {
    await deleteJson(`/activities/${item.id}`, token);
    loadHistory(token);
  }

  return (
    <div className="page">
      <div className="page__content">
        <h2>Activity History</h2>

        {loading && <p>Loading...</p>}

        <ul className="activity-list">
          {activities.map((a) => (
            <HistoryItem
              key={a.id}
              item={a}
              onEdit={(item) => {
                setEditing(item);
                setEditOpen(true);
              }}
              onDelete={handleDelete}
              renderContent={(item) => (
                <>
                  <strong>{item.activity_type}</strong> — {item.duration_minutes} mins
                  <br />
                  <small>{item.activity_date}</small>
                </>
              )}
            />
          ))}
        </ul>

        {/* ⭐ Back button moved to bottom and styled like other buttons */}
        <div className="btn-center" style={{ marginTop: "2rem" }}>
          <button className="btn" onClick={() => navigate("/activities")}>
            ← Back
          </button>
        </div>

        <EditActivityModal
          open={editOpen}
          activity={editing}
          onSave={handleSave}
          onClose={() => setEditOpen(false)}
        />
      </div>
    </div>
  );
}
