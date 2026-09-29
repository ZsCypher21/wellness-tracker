import { useEffect } from "react";
import { useMeditation } from "../../context/MeditationContext";
import { useAuth } from "../../context/AuthContext";
import { Navigate } from "react-router-dom";

export default function MeditationHistory() {
  const { token } = useAuth();
  const { meditationData, loading, loadHistory } = useMeditation();

  useEffect(() => {
    if (token) loadHistory();
  }, [token]);

  if (!token) return <Navigate to="/login" />;

  return (
    <div className="page">
      <div className="page__content">
        <h2>Meditation History</h2>

        {loading && <p>Loading...</p>}

        <ul className="meditation-list">
          {meditationData.map((m) => (
            <li key={m.id} className="meditation-item">
              <strong>{m.duration_minutes} mins</strong>
              <br />
              <small>{m.meditation_date}</small>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
