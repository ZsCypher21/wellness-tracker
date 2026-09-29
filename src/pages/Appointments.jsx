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
