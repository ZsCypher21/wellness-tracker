import { useEffect, useState } from "react";
import { useMeditation } from "../../context/MeditationContext";
import { useAuth } from "../../context/AuthContext";
import { Navigate, useNavigate } from "react-router-dom";
import HistoryItem from "../../components/common/HistoryItem";
import EditMeditationModal from "../../components/features/EditMeditationModal";
import { putJson, deleteJson } from "../../services/api";

export default function MeditationHistory() {
  const { isAuthenticated, token } = useAuth();
  const { meditations, loading, loadHistory } = useMeditation();

  const [editing, setEditing] = useState(null);
  const [editOpen, setEditOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (token) loadHistory(token);
  }, [token]);

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  async function handleSave(updated) {
    await putJson(`/meditation/${updated.id}`, updated, token);
    loadHistory(token);
    setEditOpen(false);
    setEditing(null);
  }

  async function handleDelete(item) {
    await deleteJson(`/meditation/${item.id}`, token);
    loadHistory(token);
  }

  return (
    <div className="page">
      <div className="page__content">
        <h2>Meditation History</h2>

        {loading && <p>Loading...</p>}

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

        {/* Bottom back button */}
        <div className="btn-center" style={{ marginTop: "2rem" }}>
          <button className="btn" onClick={() => navigate("/meditation")}>
            ← Back
          </button>
        </div>

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
