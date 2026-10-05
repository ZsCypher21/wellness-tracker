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

export default function ActivitiesHistory() {
  const { isAuthenticated, token } = useAuth();
  const {
    activities,
    loading,
    error,
    loadHistory
  } = useActivities();

  const [editing, setEditing] = useState(null);
  const [editOpen, setEditOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (token) loadHistory(token);
  }, [token]);

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  // ⭐ Handle save
  async function handleSave(updated) {
    try {
      await putJson(`/activities/${updated.id}`, updated, token);
      await loadHistory(token);
      setEditOpen(false);
      setEditing(null);
    } catch (err) {
      console.error("Failed to update activity:", err);
    }
  }

  // ⭐ Handle delete
  async function handleDelete(item) {
    try {
      await deleteJson(`/activities/${item.id}`, token);
      await loadHistory(token);
    } catch (err) {
      console.error("Failed to delete activity:", err);
    }
  }

  return (
    <div className="page">
      <div className="page__content">
        <h2>Activity History</h2>

        {/* ⭐ Loading */}
        {loading && <Loading />}

        {/* ⭐ Error */}
        {error && <ErrorMessage message={error} />}

        {/* ⭐ Empty State */}
        {!loading && !error && activities.length === 0 && (
          <p className="empty-state">No activity entries yet.</p>
        )}

        {/* ⭐ List */}
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

        {/* ⭐ Back button */}
        <div className="btn-center" style={{ marginTop: "2rem" }}>
          <button className="btn" onClick={() => navigate("/activities")}>
            ← Back
          </button>
        </div>

        {/* ⭐ Edit Modal */}
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
