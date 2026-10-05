// src/pages/history/MeditationHistory.jsx
import { useEffect, useState } from "react";
import { useMeditation } from "../../context/MeditationContext";
import { useAuth } from "../../context/AuthContext";
import { Navigate, useNavigate } from "react-router-dom";

import HistoryItem from "../../components/common/HistoryItem";
import EditMeditationModal from "../../components/features/EditMeditationModal";

import Loading from "../../components/ui/Loading";
import ErrorMessage from "../../components/ui/ErrorMessage";

import { putJson, deleteJson } from "../../services/api";

export default function MeditationHistory() {
  const { isAuthenticated, token } = useAuth();
  const {
    meditations,
    loading,
    error,
    loadHistory
  } = useMeditation();

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
      await putJson(`/meditation/${updated.id}`, updated, token);
      await loadHistory(token);
      setEditOpen(false);
      setEditing(null);
    } catch (err) {
      console.error("Failed to update meditation entry:", err);
    }
  }

  //  Handle delete
  async function handleDelete(item) {
    try {
      await deleteJson(`/meditation/${item.id}`, token);
      await loadHistory(token);
    } catch (err) {
      console.error("Failed to delete meditation entry:", err);
    }
  }

  return (
    <div className="page">
      <div className="page__content">
        <h2>Meditation History</h2>

        {/*  Loading */}
        {loading && <Loading />}

        {/* Error */}
        {error && <ErrorMessage message={error} />}

        {/*  Empty State */}
        {!loading && !error && meditations.length === 0 && (
          <p className="empty-state">No meditation entries yet.</p>
        )}

        {/*  List */}
        <ul className="activity-list">
          {meditations.map((m) => (
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

        {/*  Back button */}
        <div className="btn-center" style={{ marginTop: "2rem" }}>
          <button className="btn" onClick={() => navigate("/meditation")}>
            ← Back
          </button>
        </div>

        {/*  Edit Modal */}
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
