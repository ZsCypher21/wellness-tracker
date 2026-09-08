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
