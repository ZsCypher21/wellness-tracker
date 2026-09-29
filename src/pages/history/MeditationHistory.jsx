<<<<<<< HEAD
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
=======
/**
 * Note:
 * - This component follows the exact same structure and logic
 *   as SleepHistory (list view, reverse chronological order).
 * - Only the dataset and display fields differ.
 *
 * Responsibilities:
 * - Retrieve all meditation entries from MeditationContext.
 * - Display them newest → oldest using a simple reversed list.
 */

import { useMeditation } from "../../context/MeditationContext";

export default function MeditationHistory() {
  // Access global meditation data
  const { meditations } = useMeditation();

  // Reverse order → newest first (same pattern as SleepHistory)
  const sorted = [...meditations].reverse();

  return (
    <div className="page">
      <div className="page__content">
        <h2>Meditation History</h2>

        {/* Full meditation history list */}
        <ul className="meditation-list">
          {sorted.map((m) => (
            <li key={m.id} className="meditation-item">
              <strong>{m.duration} mins</strong>
              <br />
              <small>{m.date}</small>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
>>>>>>> c2d5a7186b0cd3d7657a3ffe8873d7665b9f319d
