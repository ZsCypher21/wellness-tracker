/**
 * Note:
 * - This component follows the same structure and behaviour
 *   as SleepHistory and MeditationHistory.
 * - The only differences are the dataset (hydrationData)
 *   and the displayed fields (liters + date).
 *
 * Responsibilities:
 * - Retrieve all hydration entries from HydrationContext.
 * - Display them newest → oldest using a reversed list.
 */

import { useHydration } from "../../context/HydrationContext";

export default function HydrationHistory() {
  // Access global hydration data
  const { hydrationData } = useHydration();

  // Reverse order → newest first (same pattern as other history pages)
  const sorted = [...hydrationData].reverse();

  return (
    <div className="page">
      <div className="page__content">
        <h2>Hydration History</h2>

        {/* Full hydration history list */}
        <ul className="hydration-list">
          {sorted.map((h) => (
            <li key={h.id} className="hydration-item">
              <strong>{h.liters} L</strong>
              <br />
              <small>{h.date}</small>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
