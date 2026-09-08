/**
 * Displays current + past meditation entries using the shared Tabs component.
 *
 * Notes:
 * - Same structure as ActivityList, SleepList, HydrationList, AppointmentList.
 * - Unique detail: meditation entries include a "type" + "duration".
 * - Midnight normalization ensures today's entries are treated correctly.
 *
 * Responsibilities:
 * - Retrieve meditation entries from MeditationContext.
 * - Split them into current vs history based on today's date.
 * - Switch between lists using the reusable <Tabs /> component.
 */

import { useState } from "react";
import { useMeditation } from "../../context/MeditationContext";
import Tabs from "../ui/Tabs";

export default function MeditationList() {
  const { meditations } = useMeditation();
  const [tab, setTab] = useState("current");

  // Normalize today's date to midnight to avoid time-based misclassification
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  /**
   * Filter meditation entries:
   * - current: today or future
   * - history: strictly before today
   *
   * Same logic used across all feature list components.
   */
  const current = meditations.filter(m => new Date(m.date) >= today);
  const history = meditations.filter(m => new Date(m.date) < today);

  return (
    <div>
      <h3>Meditation</h3>

      {/* Tab switcher (Current | History) */}
      <Tabs onChange={setTab} />

      {/* Render the correct list based on active tab */}
      <ul className="meditation-list">
        {(tab === "current" ? current : history).map((m) => (
          <li key={m.id} className="meditation-item">
            <div>
              <strong>{m.type}</strong> — {m.duration} mins
              <br />
              <small>{m.date}</small>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
