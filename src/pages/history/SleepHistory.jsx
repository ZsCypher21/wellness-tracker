<<<<<<< HEAD
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
=======
/**
 *
 * Responsibilities:
 * - Display ALL sleep entries recorded by the user.
 * - Present entries in reverse chronological order (newest first).
 * - Retrieve shared sleep data from SleepContext.
 * Design Notes:
 * - Uses a simple list layout for readability.
 * - History pages intentionally avoid modals or forms to keep
 *   the focus on reviewing past data.
 */

import { useSleep } from "../../context/SleepContext";

export default function SleepHistory() {
  // Access global sleep data from SleepContext
  const { sleepData } = useSleep();

  /**
   * Reverse the array to show newest → oldest.
   * sleepData is not mutated because we spread into a new array.
   */
  const sorted = [...sleepData].reverse();

  return (
    <div className="page">
      <div className="page__content">
        <h2>Sleep History</h2>

        {/* Full sleep history list */}
        <ul className="sleep-list">
          {sorted.map((s) => (
            <li key={s.id} className="sleep-item">
              <strong>{s.totalHours} hrs</strong>
              <br />
              <small>{s.date}</small>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
>>>>>>> c2d5a7186b0cd3d7657a3ffe8873d7665b9f319d
