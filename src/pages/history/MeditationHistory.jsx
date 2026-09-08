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
