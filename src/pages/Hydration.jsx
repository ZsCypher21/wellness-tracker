import { useState, useEffect } from "react";
import { useHydration } from "../context/HydrationContext";
import { useAuth } from "../context/AuthContext";
import Modal from "../components/ui/Modal";
import HydrationForm from "../components/features/HydrationForm";
import EditHydrationModal from "../components/features/EditHydrationModal";
import HistoryItem from "../components/common/HistoryItem";
import { Navigate } from "react-router-dom";
import { putJson, deleteJson } from "../services/api";

export default function Hydration() {
  const { token } = useAuth();
  const { hydrationData, loading, loadRecent } = useHydration();

  const [showAdd, setShowAdd] = useState(false);
  const [editing, setEditing] = useState(null);
  const [editOpen, setEditOpen] = useState(false);

  useEffect(() => {
    if (token) loadRecent();
  }, [token]);

  if (!token) return <Navigate to="/login" />;

  const recent = [...hydrationData].slice(0, 5);

  async function handleSave(updated) {
    await putJson(`/hydration/${updated.id}`, updated, token);
    loadRecent();
    setEditOpen(false);
    setEditing(null);
  }

  async function handleDelete(item) {
    await deleteJson(`/hydration/${item.id}`, token);
    loadRecent();
  }

  return (
    <div className="page">
      <div className="page__content">
        <h2>Hydration</h2>

        {loading && <p>Loading...</p>}

        <ul className="activity-list">
          {recent.map((h) => (
            <HistoryItem
              key={h.id}
              item={h}
              onEdit={(item) => {
                setEditing(item);
                setEditOpen(true);
              }}
              onDelete={handleDelete}
              renderContent={(item) => (
                <>
                  <strong>{item.liters} L</strong>
                  <br />
                  <small>{item.hydration_date}</small>
                </>
              )}
            />
          ))}
        </ul>

        <div className="btn-center" style={{ gap: "1rem" }}>
          <button className="btn-primary" onClick={() => setShowAdd(true)}>
            Add Hydration
          </button>

          <button className="btn" onClick={() => (window.location.href = "/hydration/history")}>
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
