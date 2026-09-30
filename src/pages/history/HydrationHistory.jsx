import { useEffect, useState } from "react";
import { useHydration } from "../../context/HydrationContext";
import { useAuth } from "../../context/AuthContext";
import { Navigate, useNavigate } from "react-router-dom";
import HistoryItem from "../../components/common/HistoryItem";
import EditHydrationModal from "../../components/features/EditHydrationModal";
import { putJson, deleteJson } from "../../services/api";

export default function HydrationHistory() {
  const { isAuthenticated, token } = useAuth();
  const { hydrationData, loading, loadHistory } = useHydration();

  const [editing, setEditing] = useState(null);
  const [editOpen, setEditOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (token) loadHistory(token);
  }, [token]);

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  async function handleSave(updated) {
    await putJson(`/hydration/${updated.id}`, updated, token);
    loadHistory(token);
    setEditOpen(false);
    setEditing(null);
  }

  async function handleDelete(item) {
    await deleteJson(`/hydration/${item.id}`, token);
    loadHistory(token);
  }

  return (
    <div className="page">
      <div className="page__content">
        <h2>Hydration History</h2>

        {loading && <p>Loading...</p>}

        <ul className="activity-list">
          {hydrationData.map((h) => (
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

        {/* Bottom back button */}
        <div className="btn-center" style={{ marginTop: "2rem" }}>
          <button className="btn" onClick={() => navigate("/hydration")}>
            ← Back
          </button>
        </div>

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
