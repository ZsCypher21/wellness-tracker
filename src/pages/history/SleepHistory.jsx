// src/pages/history/SleepHistory.jsx
import { useEffect, useState } from "react";
import { useSleep } from "../../context/SleepContext";
import { useAuth } from "../../context/AuthContext";
import { Navigate, useNavigate } from "react-router-dom";

import HistoryItem from "../../components/common/HistoryItem";
import EditSleepModal from "../../components/features/EditSleepModal";

import Loading from "../../components/ui/Loading";
import ErrorMessage from "../../components/ui/ErrorMessage";

import { putJson, deleteJson } from "../../services/api";
import { formatDate } from "../../utils/date";

export default function SleepHistory() {
  const { isAuthenticated, token } = useAuth();
  const { sleepEntries, loading, error, loadHistory } = useSleep();

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
    await putJson(`/sleep/${updated.id}`, updated, token);
    await loadHistory(token);
    setEditOpen(false);
    setEditing(null);
  }

  async function handleDelete(item) {
    if (!window.confirm("Delete this entry?")) return;
    try {
      setActionError(null);
      await deleteJson(`/sleep/${item.id}`, token);
      await loadHistory(token);
    } catch (err) {
      setActionError(err.message || "Failed to delete entry.");
    }
  }

  return (
    <div className="page">
      <div className="page__content">
        <h2>Sleep History</h2>

        {loading && <Loading />}
        {error && <ErrorMessage message={error} />}
        {actionError && <ErrorMessage message={actionError} />}

        {!loading && !error && sleepEntries.length === 0 && (
          <p className="empty-state">No sleep entries yet.</p>
        )}

        <ul className="activity-list">
          {sleepEntries.map((entry) => (
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
                  <strong>{item.hours_slept} hours</strong>
                  <br />
                  <small>{formatDate(item.sleep_date)}</small>
                </>
              )}
            />
          ))}
        </ul>

        <div className="btn-center" style={{ marginTop: "2rem" }}>
          <button className="btn" onClick={() => navigate("/sleep")}>
            ← Back
          </button>
        </div>

        <EditSleepModal
          open={editOpen}
          sleep={editing}
          onSave={handleSave}
          onClose={() => setEditOpen(false)}
        />
      </div>
    </div>
  );
}
