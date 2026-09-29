<<<<<<< HEAD
/**
 * Displays current + past activities using the shared Tabs component.
 *
 * Notes:
 * - Follows the same pattern used in SleepList, HydrationList,
 *   MeditationList, and AppointmentList.
 * - The only unique logic is the date-based filtering:
 *     • "current" = today or future
 *     • "history" = past dates
 *
 * Responsibilities:
 * - Retrieve activities from ActivityContext.
 * - Split them into current vs history based on date.
 * - Switch between lists using the reusable <Tabs /> component.
 */

import { useState } from "react";
import { useActivities } from "../../context/ActivityContext";
import Tabs from "../ui/Tabs";

export default function ActivityList() {
  const { activities } = useActivities();
  const [tab, setTab] = useState("current");

  // Today's date used for filtering
  const today = new Date();

  /**
   * Filter activities:
   * - current: today or future
   * - history: strictly before today
   *
   * Same logic used across all feature list components.
   */
  const current = activities.filter(a => new Date(a.date) >= today);
  const history = activities.filter(a => new Date(a.date) < today);

  return (
    <div>
      <h3>Activities</h3>

      {/* Tab switcher (Current | History) */}
      <Tabs onChange={setTab} />

      {/* Render the correct list based on active tab */}
      <ul className="activity-list">
        {(tab === "current" ? current : history).map((a) => (
          <li key={a.id} className="activity-item">
            <div>
              <strong>{a.type}</strong> — {a.duration} mins
              <br />
              <small>{a.date}</small>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
=======
/**
 * Displays current + past activities using the shared Tabs component.
 *
 * Notes:
 * - Follows the same pattern used in SleepList, HydrationList,
 *   MeditationList, and AppointmentList.
 * - The only unique logic is the date-based filtering:
 *     • "current" = today or future
 *     • "history" = past dates
 *
 * Responsibilities:
 * - Retrieve activities from ActivityContext.
 * - Split them into current vs history based on date.
 * - Switch between lists using the reusable <Tabs /> component.
 */

import { useState } from "react";
import { useActivities } from "../../context/ActivityContext";
import Tabs from "../ui/Tabs";

export default function ActivityList() {
  const { activities } = useActivities();
  const [tab, setTab] = useState("current");

  // Today's date used for filtering
  const today = new Date();

  /**
   * Filter activities:
   * - current: today or future
   * - history: strictly before today
   *
   * Same logic used across all feature list components.
   */
  const current = activities.filter(a => new Date(a.date) >= today);
  const history = activities.filter(a => new Date(a.date) < today);

  return (
    <div>
      <h3>Activities</h3>

      {/* Tab switcher (Current | History) */}
      <Tabs onChange={setTab} />

      {/* Render the correct list based on active tab */}
      <ul className="activity-list">
        {(tab === "current" ? current : history).map((a) => (
          <li key={a.id} className="activity-item">
            <div>
              <strong>{a.type}</strong> — {a.duration} mins
              <br />
              <small>{a.date}</small>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
>>>>>>> c2d5a7186b0cd3d7657a3ffe8873d7665b9f319d
