import { useState, useEffect } from "react";
import { useSleep } from "../context/SleepContext";
import { useAuth } from "../context/AuthContext";
import Modal from "../components/ui/Modal";
import SleepForm from "../components/features/SleepForm";
import EditSleepModal from "../components/features/EditSleepModal";
import HistoryItem from "../components/common/HistoryItem";
import Loading from "../components/ui/Loading";
import ErrorMessage from "../components/ui/ErrorMessage";
import { Navigate } from "react-router-dom";
import { putJson, deleteJson } from "../services/api";

export default function Sleep() {
  const { token } = useAuth();
  const { sleepEntries, loading, error, loadRecent } = useSleep();

  const [showAdd, setShowAdd] = useState(false);
  const [editing, setEditing] = useState(null);
  const [editOpen, setEditOpen] = useState(false);

  useEffect(() => {
    if (token) loadRecent();
  }, [token]);

  if (!token) return <Navigate to="/login" />;

  const recent = [...sleepEntries].slice(0, 5);

  async function handleSave(updated) {
    await putJson(`/sleep/${updated.id}`, updated, token);
    loadRecent();
    setEditOpen(false);
    setEditing(null);
  }

  async function handleDelete(item) {
    await deleteJson(`/sleep/${item.id}`, token);
    loadRecent();
  }

  return (
    <div className="page">
      <div className="page__content">
        <h2>Sleep</h2>

        {loading && <Loading />}
        {error && <ErrorMessage message={error} />}

        {!loading && !error && recent.length === 0 && (
          <p className="empty-state">No sleep entries yet.</p>
        )}

        <ul className="activity-list">
          {recent.map((s) => (
            <HistoryItem
              key={s.id}
              item={s}
              onEdit={(item) => {
                setEditing(item);
                setEditOpen(true);
              }}
              onDelete={handleDelete}
              renderContent={(item) => (
                <>
                  <strong>{item.hours_slept} hours</strong>
                  <br />
                  <small>{item.sleep_date}</small>
                </>
              )}
            />
          ))}
        </ul>

        <div className="btn-center" style={{ gap: "1rem" }}>
          <button className="btn-primary" onClick={() => setShowAdd(true)}>
            Add Sleep Entry
          </button>

          <button className="btn" onClick={() => (window.location.href = "/sleep/history")}>
            History
          </button>
        </div>

        <Modal isOpen={showAdd} onClose={() => setShowAdd(false)}>
          <h3>Add Sleep Entry</h3>
          <SleepForm onSubmit={() => setShowAdd(false)} />
        </Modal>

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
