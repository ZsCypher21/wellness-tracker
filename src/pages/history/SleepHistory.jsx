import { useEffect } from "react";
import { useSleep } from "../../context/SleepContext";
import { useAuth } from "../../context/AuthContext";
import { Navigate } from "react-router-dom";

export default function SleepHistory() {
  const { token } = useAuth();
  const { sleepData, loading, loadHistory } = useSleep();

  useEffect(() => {
    if (token) loadHistory();
  }, [token]);

  if (!token) return <Navigate to="/login" />;

  return (
    <div className="page">
      <div className="page__content">
        <h2>Sleep History</h2>

        {loading && <p>Loading...</p>}

        <ul className="sleep-list">
          {sleepData.map((s) => (
            <li key={s.id} className="sleep-item">
              <strong>{s.hours_slept} hrs</strong>
              <br />
              <small>{s.sleep_date}</small>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
