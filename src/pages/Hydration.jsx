import { useState, useEffect } from "react";
import { useHydration } from "../context/HydrationContext";
import { useAuth } from "../context/AuthContext";
import Modal from "../components/ui/Modal";
import HydrationForm from "../components/features/HydrationForm";
import EditHydrationModal from "../components/features/EditHydrationModal";
import HistoryItem from "../components/common/HistoryItem";
import Loading from "../components/ui/Loading";
import ErrorMessage from "../components/ui/ErrorMessage";
import { Navigate, useNavigate } from "react-router-dom";
import { putJson, deleteJson } from "../services/api";
import { formatDate } from "../utils/date";
import { formatLiters } from "../utils/format";

export default function Hydration() {
  const { token } = useAuth();
  const { hydrationData, loading, error, loadRecent } = useHydration();
  const navigate = useNavigate();

  const [showAdd, setShowAdd] = useState(false);
  const [editing, setEditing] = useState(null);
  const [editOpen, setEditOpen] = useState(false);
  const [actionError, setActionError] = useState(null);

  useEffect(() => {
    if (token) loadRecent();
  }, [token, loadRecent]);

  if (!token) return <Navigate to="/login" replace />;

  // newest 5 entries (API returns newest first)
  const recent = hydrationData.slice(0, 5);

  // Throws on failure so the edit modal can show the error
  async function handleSave(updated) {
    await putJson(`/hydration/${updated.id}`, updated, token);
    await loadRecent();
    setEditOpen(false);
    setEditing(null);
  }

  async function handleDelete(item) {
    if (!window.confirm("Delete this entry?")) return;
    try {
      setActionError(null);
      await deleteJson(`/hydration/${item.id}`, token);
      await loadRecent();
    } catch (err) {
      setActionError(err.message || "Failed to delete entry.");
    }
  }

  return (
    <div className="page">
      <div className="page__content">
        <h2>Hydration</h2>

        {loading && <Loading />}
        {error && <ErrorMessage message={error} />}
        {actionError && <ErrorMessage message={actionError} />}

        {!loading && !error && recent.length === 0 && (
          <p className="empty-state">No hydration entries yet.</p>
        )}

        <ul className="activity-list">
          {recent.map((entry) => (
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

        <div className="btn-center" style={{ gap: "1rem" }}>
          <button className="btn-primary" onClick={() => setShowAdd(true)}>
            Add Hydration
          </button>

          <button className="btn" onClick={() => navigate("/hydration/history")}>
            History
          </button>
        </div>

        <Modal isOpen={showAdd} onClose={() => setShowAdd(false)}>
          <h3>Add Hydration</h3>
          <HydrationForm onSubmit={() => setShowAdd(false)} />
        </Modal>

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
