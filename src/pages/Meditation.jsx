import { useState, useEffect } from "react";
import { useMeditation } from "../context/MeditationContext";
import { useAuth } from "../context/AuthContext";
import Modal from "../components/ui/Modal";
import MeditationForm from "../components/features/MeditationForm";
import { Navigate } from "react-router-dom";

export default function Meditation() {
  const { token } = useAuth();
  const { meditationData, loading, loadRecent } = useMeditation();
  const [showAdd, setShowAdd] = useState(false);

  useEffect(() => {
    if (token) loadRecent();
  }, [token]);

  if (!token) return <Navigate to="/login" />;

  const recent = [...meditationData].slice(0, 5);

  return (
    <div className="page">
      <div className="page__content">
        <h2>Meditation</h2>

        {loading && <p>Loading...</p>}

        <ul className="meditation-list">
          {recent.map((m) => (
            <li key={m.id} className="meditation-item">
              <strong>{m.duration_minutes} mins</strong>
              <br />
              <small>{m.meditation_date}</small>
            </li>
          ))}
        </ul>

        <div className="btn-center" style={{ gap: "1rem" }}>
          <button className="btn-primary" onClick={() => setShowAdd(true)}>
            Add Meditation
          </button>

          <button
            className="btn"
            onClick={() => (window.location.href = "/meditation/history")}
          >
            History
          </button>
        </div>

        <Modal isOpen={showAdd} onClose={() => setShowAdd(false)}>
          <h3>Add Meditation</h3>
          <MeditationForm onSubmit={() => setShowAdd(false)} />
        </Modal>
      </div>
    </div>
  );
}
