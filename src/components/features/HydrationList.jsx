/**
 * Displays current + past hydration entries using the shared Tabs component.
 *
 * Notes:
 * - Follows the same pattern used in ActivityList, SleepList,
 *   MeditationList, and AppointmentList.
 * - Unique additions:
 *     • Delete button for removing entries.
 *     • Optional notes field displayed when present.
 *
 * Responsibilities:
 * - Retrieve hydration entries from HydrationContext.
 * - Split them into current vs history based on today's date.
 * - Allow users to delete individual hydration records.
 * - Switch between lists using the reusable <Tabs /> component.
 */

import { useState } from "react";
import { useHydration } from "../../context/HydrationContext";
import Tabs from "../ui/Tabs";

export default function HydrationList() {
  const { hydration, deleteHydration } = useHydration();
  const [tab, setTab] = useState("current");

  // Today's date used for filtering
  const today = new Date();

  /**
   * Filter hydration entries:
   * - current: today or future
   * - history: strictly before today
   *
   * Same logic used across all feature list components.
   */
  const current = hydration.filter(h => new Date(h.date) >= today);
  const history = hydration.filter(h => new Date(h.date) < today);

  return (
    <div>
      <h3>Hydration</h3>

      {/* Tab switcher (Current | History) */}
      <Tabs onChange={setTab} />

      {/* Render the correct list based on active tab */}
      <ul className="hydration-list">
        {(tab === "current" ? current : history).map((h) => (
          <li key={h.id} className="hydration-item">
            <div>
              <strong>{h.liters} L consumed</strong>
              <br />
              <small>{h.date}</small>

              {/* Optional notes field */}
              {h.notes && (
                <p style={{ marginTop: "0.5rem" }}>
                  Notes: {h.notes}
                </p>
              )}
            </div>

            {/* Delete hydration entry */}
            <button
              className="delete-btn"
              onClick={() => deleteHydration(h.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
