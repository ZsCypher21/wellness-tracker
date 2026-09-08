/**
 * Displays current + past sleep entries using the shared Tabs component.
 *
 * Notes:
 * - Same structure as ActivityList, HydrationList, MeditationList,
 *   and AppointmentList.
 * - Unique additions:
 *     • Delete button for removing sleep entries.
 *     • Optional notes field displayed when present.
 *
 * Responsibilities:
 * - Retrieve sleep entries from SleepContext.
 * - Split them into current vs history based on today's date.
 * - Allow users to delete individual sleep records.
 * - Switch between lists using the reusable <Tabs /> component.
 */

import { useState } from "react";
import { useSleep } from "../../context/SleepContext";
import Tabs from "../ui/Tabs";

export default function SleepList() {
  const { sleep, deleteSleep } = useSleep();
  const [tab, setTab] = useState("current");

  // Today's date used for filtering
  const today = new Date();

  /**
   * Filter sleep entries:
   * - current: today or future
   * - history: strictly before today
   *
   * Same logic used across all feature list components.
   */
  const current = sleep.filter(s => new Date(s.date) >= today);
  const history = sleep.filter(s => new Date(s.date) < today);

  return (
    <div>
      <h3>Sleep</h3>

      {/* Tab switcher (Current | History) */}
      <Tabs onChange={setTab} />

      {/* Render the correct list based on active tab */}
      <ul className="sleep-list">
        {(tab === "current" ? current : history).map((s) => (
          <li key={s.id} className="sleep-item">
            <div>
              <strong>{s.totalHours} hours slept</strong>
              <br />
              <small>{s.date}</small>

              {/* Optional notes field */}
              {s.notes && (
                <p style={{ marginTop: "0.5rem" }}>
                  Notes: {s.notes}
                </p>
              )}
            </div>

            {/* Delete sleep entry */}
            <button
              className="delete-btn"
              onClick={() => deleteSleep(s.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
