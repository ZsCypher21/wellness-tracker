<<<<<<< HEAD
/**
 * Displays upcoming and past appointments using the shared Tabs component.
 *
 * Notes:
 * - Follows the same pattern used in ActivityList, SleepList,
 *   HydrationList, and MeditationList.
 * - Appointments are filtered by date only (time is not used here).
 *
 * Responsibilities:
 * - Retrieve appointments from AppointmentContext.
 * - Split them into upcoming vs past based on today's date.
 * - Switch between lists using the reusable <Tabs /> component.
 */

import { useState } from "react";
import { useAppointments } from "../../context/AppointmentContext";
import Tabs from "../ui/Tabs";

export default function AppointmentList() {
  const { appointments } = useAppointments();
  const [tab, setTab] = useState("current");

  // Current date used for filtering
  const now = new Date();

  /**
   * Filter appointments:
   * - upcoming: today or future
   * - past: strictly before today
   *
   * Same logic used across all feature list components.
   */
  const upcoming = appointments.filter(a => new Date(a.date) >= now);
  const past = appointments.filter(a => new Date(a.date) < now);

  return (
    <div>
      <h3>Appointments</h3>

      {/* Tab switcher (Current | History) */}
      <Tabs onChange={setTab} />

      {/* Render the correct list based on active tab */}
      <ul className="appointment-list">
        {(tab === "current" ? upcoming : past).map((a) => (
          <li key={a.id} className="appointment-item">
            <div>
              <strong>{a.title}</strong>
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
 * Displays upcoming and past appointments using the shared Tabs component.
 *
 * Notes:
 * - Follows the same pattern used in ActivityList, SleepList,
 *   HydrationList, and MeditationList.
 * - Appointments are filtered by date only (time is not used here).
 *
 * Responsibilities:
 * - Retrieve appointments from AppointmentContext.
 * - Split them into upcoming vs past based on today's date.
 * - Switch between lists using the reusable <Tabs /> component.
 */

import { useState } from "react";
import { useAppointments } from "../../context/AppointmentContext";
import Tabs from "../ui/Tabs";

export default function AppointmentList() {
  const { appointments } = useAppointments();
  const [tab, setTab] = useState("current");

  // Current date used for filtering
  const now = new Date();

  /**
   * Filter appointments:
   * - upcoming: today or future
   * - past: strictly before today
   *
   * Same logic used across all feature list components.
   */
  const upcoming = appointments.filter(a => new Date(a.date) >= now);
  const past = appointments.filter(a => new Date(a.date) < now);

  return (
    <div>
      <h3>Appointments</h3>

      {/* Tab switcher (Current | History) */}
      <Tabs onChange={setTab} />

      {/* Render the correct list based on active tab */}
      <ul className="appointment-list">
        {(tab === "current" ? upcoming : past).map((a) => (
          <li key={a.id} className="appointment-item">
            <div>
              <strong>{a.title}</strong>
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
