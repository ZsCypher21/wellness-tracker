<<<<<<< HEAD
import { useEffect } from "react";
import { useAppointments } from "../../context/AppointmentContext";
import { useAuth } from "../../context/AuthContext";
import { Navigate } from "react-router-dom";

export default function AppointmentsHistory() {
  const { token } = useAuth();
  const { past, loading, loadPast } = useAppointments();

  useEffect(() => {
    if (token) loadPast();
  }, [token]);

  if (!token) return <Navigate to="/login" />;

  return (
    <div className="page">
      <div className="page__content">
        <h2>Past Appointments</h2>

        {loading && <p>Loading...</p>}

        <ul className="appointment-list">
          {past.map((a) => (
            <li key={a.id} className="appointment-item">
              <strong>{a.appointment_type}</strong>
              <br />
              {a.description && <small>{a.description}</small>}
              <br />
              <small>{new Date(a.appointment_datetime).toLocaleString()}</small>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
=======
/**
 * Note:
 * - Structure is similar to SleepHistory, MeditationHistory,
 *   and HydrationHistory (list view, reversed/sorted data).
 * - The key difference: appointments require date filtering
 *   because only *past* entries should appear here.
 *
 * Responsibilities:
 * - Retrieve all appointments from AppointmentContext.
 * - Sort them chronologically using YYYY-MM-DD string comparison.
 * - Filter out only past appointments (date < today).
 */

import { useAppointments } from "../../context/AppointmentContext";

export default function AppointmentsHistory() {
  // Access global appointment data
  const { appointments } = useAppointments();

  // Today formatted as YYYY-MM-DD (avoids timezone issues)
  const todayStr = new Date().toISOString().split("T")[0];

  // Sort chronologically using safe string comparison
  const sorted = [...appointments].sort(
    (a, b) => a.date.localeCompare(b.date)
  );

  // Select only past appointments (unique to this history page)
  const past = sorted.filter(a => a.date < todayStr);

  return (
    <div className="page">
      <div className="page__content">
        <h2>Past Appointments</h2>

        {/* Empty state */}
        {past.length === 0 && <p>No past appointments.</p>}

        {/* Past appointments list */}
        <ul className="appointment-list">
          {past.map((a) => (
            <li key={a.id} className="appointment-item">
              <strong>{a.title}</strong>
              <br />
              <small>{a.date}</small>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
>>>>>>> c2d5a7186b0cd3d7657a3ffe8873d7665b9f319d
