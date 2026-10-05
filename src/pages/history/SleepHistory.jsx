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

export default function SleepHistory() {
  const { isAuthenticated, token } = useAuth();
  const {
    sleepEntries,
    loading,
    error,
    loadHistory
  } = useSleep();

  const [editing, setEditing] = useState(null);
  const [editOpen, setEditOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (token) loadHistory(token);
  }, [token]);

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  //  Handle save
  async function handleSave(updated) {
    try {
      await putJson(`/sleep/${updated.id}`, updated, token);
      await loadHistory(token);
      setEditOpen(false);
      setEditing(null);
    } catch (err) {
      console.error("Failed to update sleep entry:", err);
    }
  }

  //  Handle delete
  async function handleDelete(item) {
    try {
      await deleteJson(`/sleep/${item.id}`, token);
      await loadHistory(token);
    } catch (err) {
      console.error("Failed to delete sleep entry:", err);
    }
  }

  return (
    <div className="page">
      <div className="page__content">
        <h2>Sleep History</h2>

        {/*  Loading */}
        {loading && <Loading />}

        {/*  Error */}
        {error && <ErrorMessage message={error} />}

        {/*  Empty State */}
        {!loading && !error && sleepEntries.length === 0 && (
          <p className="empty-state">No sleep entries yet.</p>
        )}

        {/*  List */}
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

        {/*  Back button */}
        <div className="btn-center" style={{ marginTop: "2rem" }}>
          <button className="btn" onClick={() => navigate("/sleep")}>
            ← Back
          </button>
        </div>

        {/*  Edit Modal */}
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
