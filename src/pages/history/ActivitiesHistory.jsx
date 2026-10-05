// src/pages/history/ActivitiesHistory.jsx
import { useEffect, useState } from "react";
import { useActivities } from "../../context/ActivityContext";
import { useAuth } from "../../context/AuthContext";
import { Navigate, useNavigate } from "react-router-dom";

import HistoryItem from "../../components/common/HistoryItem";
import EditActivityModal from "../../components/features/EditActivityModal";

import Loading from "../../components/ui/Loading";
import ErrorMessage from "../../components/ui/ErrorMessage";

import { putJson, deleteJson } from "../../services/api";
import { formatDate } from "../../utils/date";

export default function ActivitiesHistory() {
  const { isAuthenticated, token } = useAuth();
  const { activities, loading, error, loadHistory } = useActivities();

  const [editing, setEditing] = useState(null);
  const [editOpen, setEditOpen] = useState(false);
  const [actionError, setActionError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (token) loadHistory(token);
  }, [token, loadHistory]);

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  // Throws on failure so the edit modal can show the error
  async function handleSave(updated) {
    await putJson(`/activities/${updated.id}`, updated, token);
    await loadHistory(token);
    setEditOpen(false);
    setEditing(null);
  }

  async function handleDelete(item) {
    if (!window.confirm("Delete this entry?")) return;
    try {
      setActionError(null);
      await deleteJson(`/activities/${item.id}`, token);
      await loadHistory(token);
    } catch (err) {
      setActionError(err.message || "Failed to delete entry.");
    }
  }

  return (
    <div className="page">
      <div className="page__content">
        <h2>Activity History</h2>

        {loading && <Loading />}
        {error && <ErrorMessage message={error} />}
        {actionError && <ErrorMessage message={actionError} />}

        {!loading && !error && activities.length === 0 && (
          <p className="empty-state">No activity entries yet.</p>
        )}

        <ul className="activity-list">
          {activities.map((entry) => (
            <HistoryItem
              key={entry.id}
              item={entry}
              onEdit={(item) => {
                setEditing(item);
                setEditOpen(true);
              }}
              onDelete={handleDelete}
              renderContent={(item) => (
                <>
                  <strong>{item.activity_type}</strong> — {item.duration_minutes} mins
                  <br />
                  <small>{formatDate(item.activity_date)}</small>
                </>
              )}
            />
          ))}
        </ul>

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
