<<<<<<< HEAD
/**
 * Displays ONLY past appointments.
 *
 * Notes:
 * - Unlike ActivityList or SleepList, appointments include both
 *   date AND time, so we must merge them before comparison.
 * - Uses the same "past = before now" logic as AppointmentsHistory.jsx.
 *
 * Responsibilities:
 * - Retrieve appointments from AppointmentContext.
 * - Combine date + time into a single Date object.
 * - Filter out only past appointments.
 * - Render a simple list with optional notes.
 */

import { useAppointments } from '../../context/AppointmentContext';

export default function AppointmentHistoryList() {
  const { appointments, loading } = useAppointments();

  // Show loading state while AppointmentContext restores localStorage
  if (loading) return <p>Loading history...</p>;

  /**
   * Filter past appointments.
   * - Convert "YYYY-MM-DD HH:mm" into a real Date object.
   * - Compare against current time.
   */
  const past = appointments.filter((a) => {
    const now = new Date();
    const appointmentDate = new Date(`${a.date} ${a.time}`);
    return appointmentDate < now;
  });

  // No past appointments
  if (past.length === 0)
    return <p>No past appointments.</p>;

  return (
    <ul className="appointment-list">
      {past.map((a) => (
        <li key={a.id} className="appointment-item">
          <div>
            <strong>{a.type}</strong>
            <br />
            {a.date} — {a.time}

            {/* Optional notes field */}
            {a.notes && <p>{a.notes}</p>}
          </div>
        </li>
      ))}
    </ul>
  );
}
=======
/**
 * Displays ONLY past appointments.
 *
 * Notes:
 * - Unlike ActivityList or SleepList, appointments include both
 *   date AND time, so we must merge them before comparison.
 * - Uses the same "past = before now" logic as AppointmentsHistory.jsx.
 *
 * Responsibilities:
 * - Retrieve appointments from AppointmentContext.
 * - Combine date + time into a single Date object.
 * - Filter out only past appointments.
 * - Render a simple list with optional notes.
 */

import { useAppointments } from '../../context/AppointmentContext';

export default function AppointmentHistoryList() {
  const { appointments, loading } = useAppointments();

  // Show loading state while AppointmentContext restores localStorage
  if (loading) return <p>Loading history...</p>;

  /**
   * Filter past appointments.
   * - Convert "YYYY-MM-DD HH:mm" into a real Date object.
   * - Compare against current time.
   */
  const past = appointments.filter((a) => {
    const now = new Date();
    const appointmentDate = new Date(`${a.date} ${a.time}`);
    return appointmentDate < now;
  });

  // No past appointments
  if (past.length === 0)
    return <p>No past appointments.</p>;

  return (
    <ul className="appointment-list">
      {past.map((a) => (
        <li key={a.id} className="appointment-item">
          <div>
            <strong>{a.type}</strong>
            <br />
            {a.date} — {a.time}

            {/* Optional notes field */}
            {a.notes && <p>{a.notes}</p>}
          </div>
        </li>
      ))}
    </ul>
  );
}
>>>>>>> c2d5a7186b0cd3d7657a3ffe8873d7665b9f319d
