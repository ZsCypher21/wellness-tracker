import { useState, useEffect } from "react";
import { useMeditation } from "../context/MeditationContext";
import { useAuth } from "../context/AuthContext";
import Modal from "../components/ui/Modal";
import MeditationForm from "../components/features/MeditationForm";
import EditMeditationModal from "../components/features/EditMeditationModal";
import HistoryItem from "../components/common/HistoryItem";
import Loading from "../components/ui/Loading";
import ErrorMessage from "../components/ui/ErrorMessage";
import { Navigate, useNavigate } from "react-router-dom";
import { putJson, deleteJson } from "../services/api";
import { formatDate } from "../utils/date";

export default function Meditation() {
  const { token } = useAuth();
  const { meditations, loading, error, loadRecent } = useMeditation();
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
  const recent = meditations.slice(0, 5);

  // Throws on failure so the edit modal can show the error
  async function handleSave(updated) {
    await putJson(`/meditation/${updated.id}`, updated, token);
    await loadRecent();
    setEditOpen(false);
    setEditing(null);
  }

  async function handleDelete(item) {
    if (!window.confirm("Delete this entry?")) return;
    try {
      setActionError(null);
      await deleteJson(`/meditation/${item.id}`, token);
      await loadRecent();
    } catch (err) {
      setActionError(err.message || "Failed to delete entry.");
    }
  }

  return (
    <div className="page">
      <div className="page__content">
        <h2>Meditation</h2>

        {loading && <Loading />}
        {error && <ErrorMessage message={error} />}
        {actionError && <ErrorMessage message={actionError} />}

        {!loading && !error && recent.length === 0 && (
          <p className="empty-state">No meditation sessions yet.</p>
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
                  <strong>Meditation</strong> — {item.duration_minutes} mins
                  <br />
                  <small>{formatDate(item.meditation_date)}</small>
                </>
              )}
            />
          ))}
        </ul>

        <div className="btn-center" style={{ gap: "1rem" }}>
          <button className="btn-primary" onClick={() => setShowAdd(true)}>
            Add Meditation
          </button>

          <button className="btn" onClick={() => navigate("/meditation/history")}>
            History
          </button>
        </div>

        <Modal isOpen={showAdd} onClose={() => setShowAdd(false)}>
          <h3>Add Meditation</h3>
          <MeditationForm onSubmit={() => setShowAdd(false)} />
        </Modal>

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
