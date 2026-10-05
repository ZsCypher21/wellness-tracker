// src/pages/history/MeditationHistory.jsx
import { useEffect, useState } from "react";
import { useMeditation } from "../../context/MeditationContext";
import { useAuth } from "../../context/AuthContext";
import { Navigate, useNavigate } from "react-router-dom";

import HistoryItem from "../../components/common/HistoryItem";
import EditMeditationModal from "../../components/features/EditMeditationModal";

import Loading from "../../components/ui/Loading";
import ErrorMessage from "../../components/ui/ErrorMessage";

import { putJson, deleteJson } from "../../services/api";
import { formatDate } from "../../utils/date";

export default function MeditationHistory() {
  const { isAuthenticated, token } = useAuth();
  const { meditations, loading, error, loadHistory } = useMeditation();

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
    await putJson(`/meditation/${updated.id}`, updated, token);
    await loadHistory(token);
    setEditOpen(false);
    setEditing(null);
  }

  async function handleDelete(item) {
    if (!window.confirm("Delete this entry?")) return;
    try {
      setActionError(null);
      await deleteJson(`/meditation/${item.id}`, token);
      await loadHistory(token);
    } catch (err) {
      setActionError(err.message || "Failed to delete entry.");
    }
  }

  return (
    <div className="page">
      <div className="page__content">
        <h2>Meditation History</h2>

        {loading && <Loading />}
        {error && <ErrorMessage message={error} />}
        {actionError && <ErrorMessage message={actionError} />}

        {!loading && !error && meditations.length === 0 && (
          <p className="empty-state">No meditation entries yet.</p>
        )}

        <ul className="activity-list">
          {meditations.map((entry) => (
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
                  <strong>Meditation</strong> — {item.duration_minutes} mins
                  <br />
                  <small>{formatDate(item.meditation_date)}</small>
                </>
              )}
            />
          ))}
        </ul>

        <div className="btn-center" style={{ marginTop: "2rem" }}>
          <button className="btn" onClick={() => navigate("/meditation")}>
            ← Back
          </button>
        </div>

        <EditMeditationModal
          open={editOpen}
          meditation={editing}
          onSave={handleSave}
          onClose={() => setEditOpen(false)}
        />
      </div>
    </div>
  );
}
