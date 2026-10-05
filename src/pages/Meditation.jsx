import { useState, useEffect } from "react";
import { useMeditation } from "../context/MeditationContext";
import { useAuth } from "../context/AuthContext";
import Modal from "../components/ui/Modal";
import MeditationForm from "../components/features/MeditationForm";
import EditMeditationModal from "../components/features/EditMeditationModal";
import HistoryItem from "../components/common/HistoryItem";
import Loading from "../components/ui/Loading";
import ErrorMessage from "../components/ui/ErrorMessage";
import { Navigate } from "react-router-dom";
import { putJson, deleteJson } from "../services/api";

export default function Meditation() {
  const { token } = useAuth();
  const { meditations, loading, error, loadRecent } = useMeditation();

  const [showAdd, setShowAdd] = useState(false);
  const [editing, setEditing] = useState(null);
  const [editOpen, setEditOpen] = useState(false);

  useEffect(() => {
    if (token) loadRecent();
  }, [token]);

  if (!token) return <Navigate to="/login" />;

  const recent = [...meditations].slice(0, 5);

  async function handleSave(updated) {
    await putJson(`/meditation/${updated.id}`, updated, token);
    loadRecent();
    setEditOpen(false);
    setEditing(null);
  }

  async function handleDelete(item) {
    await deleteJson(`/meditation/${item.id}`, token);
    loadRecent();
  }

  return (
    <div className="page">
      <div className="page__content">
        <h2>Meditation</h2>

        {loading && <Loading />}
        {error && <ErrorMessage message={error} />}

        {!loading && !error && recent.length === 0 && (
          <p className="empty-state">No meditation sessions yet.</p>
        )}

        <ul className="activity-list">
          {recent.map((m) => (
            <HistoryItem
              key={m.id}
              item={m}
              onEdit={(item) => {
                setEditing(item);
                setEditOpen(true);
              }}
              onDelete={handleDelete}
              renderContent={(item) => (
                <>
                  <strong>{item.meditation_type}</strong> — {item.duration_minutes} mins
                  <br />
                  <small>{item.meditation_date}</small>
                </>
              )}
            />
          ))}
        </ul>

        <div className="btn-center" style={{ gap: "1rem" }}>
          <button className="btn-primary" onClick={() => setShowAdd(true)}>
            Add Meditation
          </button>

          <button className="btn" onClick={() => (window.location.href = "/meditation/history")}>
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
