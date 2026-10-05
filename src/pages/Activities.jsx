import { useState, useEffect } from "react";
import { useActivities } from "../context/ActivityContext";
import { useAuth } from "../context/AuthContext";
import Modal from "../components/ui/Modal";
import ActivityForm from "../components/features/ActivityForm";
import EditActivityModal from "../components/features/EditActivityModal";
import HistoryItem from "../components/common/HistoryItem";
import Loading from "../components/ui/Loading";
import ErrorMessage from "../components/ui/ErrorMessage";
import { Navigate } from "react-router-dom";
import { putJson, deleteJson } from "../services/api";

export default function Activities() {
  const { token } = useAuth();
  const { activities, loading, error, loadRecent } = useActivities();

  const [showAdd, setShowAdd] = useState(false);
  const [editing, setEditing] = useState(null);
  const [editOpen, setEditOpen] = useState(false);

  useEffect(() => {
    if (token) loadRecent();
  }, [token]);

  if (!token) return <Navigate to="/login" />;

  const recent = [...activities].slice(0, 5);

  async function handleSave(updated) {
    await putJson(`/activities/${updated.id}`, updated, token);
    loadRecent();
    setEditOpen(false);
    setEditing(null);
  }

  async function handleDelete(item) {
    await deleteJson(`/activities/${item.id}`, token);
    loadRecent();
  }

  return (
    <div className="page">
      <div className="page__content">
        <h2>Activities</h2>

        {loading && <Loading />}
        {error && <ErrorMessage message={error} />}

        {!loading && !error && recent.length === 0 && (
          <p className="empty-state">No activities recorded yet.</p>
        )}

        <ul className="activity-list">
          {recent.map((a) => (
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

        <div className="btn-center" style={{ gap: "1rem" }}>
          <button className="btn-primary" onClick={() => setShowAdd(true)}>
            Add Activity
          </button>

          <button className="btn" onClick={() => (window.location.href = "/activities/history")}>
            History
          </button>
        </div>

        <Modal isOpen={showAdd} onClose={() => setShowAdd(false)}>
          <h3>Add Activity</h3>
          <ActivityForm onSubmit={() => setShowAdd(false)} />
        </Modal>

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
