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
