// src/pages/history/HydrationHistory.jsx
import { useEffect, useState } from "react";
import { useHydration } from "../../context/HydrationContext";
import { useAuth } from "../../context/AuthContext";
import { Navigate, useNavigate } from "react-router-dom";

import HistoryItem from "../../components/common/HistoryItem";
import EditHydrationModal from "../../components/features/EditHydrationModal";

import Loading from "../../components/ui/Loading";
import ErrorMessage from "../../components/ui/ErrorMessage";

import { putJson, deleteJson } from "../../services/api";
import { formatDate } from "../../utils/date";
import { formatLiters } from "../../utils/format";

export default function HydrationHistory() {
  const { isAuthenticated, token } = useAuth();
  const { hydrationData, loading, error, loadHistory } = useHydration();

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
    await putJson(`/hydration/${updated.id}`, updated, token);
    await loadHistory(token);
    setEditOpen(false);
    setEditing(null);
  }

  async function handleDelete(item) {
    if (!window.confirm("Delete this entry?")) return;
    try {
      setActionError(null);
      await deleteJson(`/hydration/${item.id}`, token);
      await loadHistory(token);
    } catch (err) {
      setActionError(err.message || "Failed to delete entry.");
    }
  }

  return (
    <div className="page">
      <div className="page__content">
        <h2>Hydration History</h2>

        {loading && <Loading />}
        {error && <ErrorMessage message={error} />}
        {actionError && <ErrorMessage message={actionError} />}

        {!loading && !error && hydrationData.length === 0 && (
          <p className="empty-state">No hydration entries yet.</p>
        )}

        <ul className="activity-list">
          {hydrationData.map((entry) => (
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
                  <strong>{formatLiters(item.liters)} L</strong>
                  <br />
                  <small>{formatDate(item.hydration_date)}</small>
                </>
              )}
            />
          ))}
        </ul>

        <div className="btn-center" style={{ marginTop: "2rem" }}>
          <button className="btn" onClick={() => navigate("/hydration")}>
            ← Back
          </button>
        </div>

        <EditHydrationModal
          open={editOpen}
          hydration={editing}
          onSave={handleSave}
          onClose={() => setEditOpen(false)}
        />
      </div>
    </div>
  );
}
