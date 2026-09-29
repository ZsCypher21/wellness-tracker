import { useEffect } from "react";
import { useHydration } from "../../context/HydrationContext";
import { useAuth } from "../../context/AuthContext";
import { Navigate } from "react-router-dom";

export default function HydrationHistory() {
  const { token } = useAuth();
  const { hydrationData, loading, loadHistory } = useHydration();

  useEffect(() => {
    if (token) loadHistory();
  }, [token]);

  if (!token) return <Navigate to="/login" />;

  return (
    <div className="page">
      <div className="page__content">
        <h2>Hydration History</h2>

        {loading && <p>Loading...</p>}

        <ul className="hydration-list">
          {hydrationData.map((h) => (
            <li key={h.id} className="hydration-item">
              <strong>{h.liters} L</strong>
              <br />
              <small>{h.hydration_date}</small>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
