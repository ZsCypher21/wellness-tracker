<<<<<<< HEAD
import { useState, useEffect } from "react";
import { useAppointments } from "../context/AppointmentContext";
import { useAuth } from "../context/AuthContext";
import Modal from "../components/ui/Modal";
import AppointmentForm from "../components/features/AppointmentForm";
import { Navigate } from "react-router-dom";

export default function Appointments() {
  const { token } = useAuth();
  const { upcoming, loading, loadUpcoming } = useAppointments();
  const [showAdd, setShowAdd] = useState(false);

  useEffect(() => {
    if (token) loadUpcoming();
  }, [token]);

  if (!token) return <Navigate to="/login" />;

  return (
    <div className="page">
      <div className="page__content">
        <h2>Upcoming Appointments</h2>

        {loading && <p>Loading...</p>}

        <ul className="appointment-list">
          {upcoming.map((a) => (
            <li key={a.id} className="appointment-item">
              <strong>{a.appointment_type}</strong>
              <br />
              {a.description && <small>{a.description}</small>}
              <br />
              <small>{new Date(a.appointment_datetime).toLocaleString()}</small>
            </li>
          ))}
        </ul>

        <div className="btn-center" style={{ gap: "1rem" }}>
          <button className="btn-primary" onClick={() => setShowAdd(true)}>
            Add Appointment
          </button>

          <button
            className="btn"
            onClick={() => (window.location.href = "/appointments/history")}
          >
            Past Appointments
          </button>
        </div>

        <Modal isOpen={showAdd} onClose={() => setShowAdd(false)}>
          <h3>Add Appointment</h3>
          <AppointmentForm onSubmit={() => setShowAdd(false)} />
        </Modal>
      </div>
    </div>
  );
}
=======
/**
 *
 * Responsibilities:
 * - Display upcoming appointments (future dates only).
 * - Provide actions to add new appointments and view full history.
 * - Use a modal window to show AppointmentForm for adding entries.
 * - Retrieve shared appointment data from AppointmentContext.
 *
 * Key Design Notes:
 * - Uses YYYY-MM-DD string comparison for date sorting/filtering.
 *   This avoids timezone issues and ensures consistent behaviour.
 * - Shows only upcoming appointments to keep the page focused.
 * - Full history is accessible via a separate page.
 */

import { useState } from "react";
import { useAppointments } from "../context/AppointmentContext";
import Modal from "../components/ui/Modal";
import AppointmentForm from "../components/features/AppointmentForm";

export default function Appointments() {
  // Access global appointment data from AppointmentContext
  const { appointments } = useAppointments();

  // Local state controlling visibility of the "Add Appointment" modal
  const [showAdd, setShowAdd] = useState(false);

  /**
   * Today formatted as YYYY-MM-DD.
   * Splitting the ISO string avoids timezone offsets and ensures
   * consistent comparison with stored appointment dates.
   */
  const todayStr = new Date().toISOString().split("T")[0];

  /**
   * Sort appointments by date (ascending).
   * localeCompare works safely because dates are stored as
   * YYYY-MM-DD strings, which sort lexicographically.
   */
  const sorted = [...appointments].sort(
    (a, b) => a.date.localeCompare(b.date)
  );

  // Filter upcoming appointments (today or later)
  const upcoming = sorted.filter(a => a.date >= todayStr);

  return (
    <div className="page">
      <div className="page__content">
        <h2>Upcoming Appointments</h2>

        {/* Empty state message */}
        {upcoming.length === 0 && <p>No upcoming appointments.</p>}

        {/* Upcoming appointments list */}
        <ul className="appointment-list">
          {upcoming.map((a) => (
            <li key={a.id} className="appointment-item">
              <strong>{a.title}</strong>
              <br />
              <small>{a.date}</small>
            </li>
          ))}
        </ul>

        {/* Action buttons: Add Appointment + View History */}
        <div className="btn-center" style={{ gap: "1rem" }}>
          {/* Open modal */}
          <button className="btn-primary" onClick={() => setShowAdd(true)}>
            Add Appointment
          </button>

          {/* Navigate to full history page */}
          <button
            className="btn"
            onClick={() => (window.location.href = "/appointments/history")}
          >
            History
          </button>
        </div>

        {/* Modal for adding new appointment */}
        <Modal isOpen={showAdd} onClose={() => setShowAdd(false)}>
          <h3>Add Appointment</h3>

          {/* AppointmentForm handles validation + submission */}
          <AppointmentForm onSubmit={() => setShowAdd(false)} />
        </Modal>
      </div>
    </div>
  );
}
>>>>>>> c2d5a7186b0cd3d7657a3ffe8873d7665b9f319d
