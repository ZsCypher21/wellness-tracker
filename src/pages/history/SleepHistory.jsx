import { useEffect, useState } from "react";
import { useSleep } from "../../context/SleepContext";
import { useAuth } from "../../context/AuthContext";
import { Navigate, useNavigate } from "react-router-dom";
import HistoryItem from "../../components/common/HistoryItem";
import EditSleepModal from "../../components/features/EditSleepModal";
import { putJson, deleteJson } from "../../services/api";

export default function SleepHistory() {
  const { isAuthenticated, token } = useAuth();
  const { sleepEntries, loading, loadHistory } = useSleep();

  const [editing, setEditing] = useState(null);
  const [editOpen, setEditOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (token) loadHistory(token);
  }, [token]);

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  async function handleSave(updated) {
    await putJson(`/sleep/${updated.id}`, updated, token);
    loadHistory(token);
    setEditOpen(false);
    setEditing(null);
  }

  async function handleDelete(item) {
    await deleteJson(`/sleep/${item.id}`, token);
    loadHistory(token);
  }

  return (
    <div className="page">
      <div className="page__content">
        <h2>Sleep History</h2>

        {loading && <p>Loading...</p>}

        <ul className="activity-list">
          {sleepEntries.map((s) => (
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

        {/* Bottom back button */}
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
