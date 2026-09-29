import { useState, useEffect } from "react";
import { useHydration } from "../context/HydrationContext";
import { useAuth } from "../context/AuthContext";
import Modal from "../components/ui/Modal";
import HydrationForm from "../components/features/HydrationForm";
import { Navigate } from "react-router-dom";

export default function Hydration() {
  const { token } = useAuth();
  const { hydrationData, loading, loadRecent } = useHydration();
  const [showAdd, setShowAdd] = useState(false);

  useEffect(() => {
    if (token) loadRecent();
  }, [token]);

  if (!token) return <Navigate to="/login" />;

  const recent = [...hydrationData].slice(0, 5);

  return (
    <div className="page">
      <div className="page__content">
        <h2>Hydration</h2>

        {loading && <p>Loading...</p>}

        <ul className="hydration-list">
          {recent.map((h) => (
            <li key={h.id} className="hydration-item">
              <strong>{h.liters} L</strong>
              <br />
              <small>{h.hydration_date}</small>
            </li>
          ))}
        </ul>

        <div className="btn-center" style={{ gap: "1rem" }}>
          <button className="btn-primary" onClick={() => setShowAdd(true)}>
            Add Hydration
          </button>

          <button
            className="btn"
            onClick={() => (window.location.href = "/hydration/history")}
          >
            History
          </button>
        </div>

        <Modal isOpen={showAdd} onClose={() => setShowAdd(false)}>
          <h3>Add Hydration</h3>
          <HydrationForm onSubmit={() => setShowAdd(false)} />
        </Modal>
      </div>
    </div>
  );
}
