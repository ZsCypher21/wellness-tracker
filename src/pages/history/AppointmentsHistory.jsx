// src/pages/history/AppointmentsHistory.jsx
import { useEffect, useState } from "react";
import { useAppointments } from "../../context/AppointmentContext";
import { useAuth } from "../../context/AuthContext";
import { Navigate, useNavigate } from "react-router-dom";
import HistoryItem from "../../components/common/HistoryItem";
import EditAppointmentModal from "../../components/features/EditAppointmentModal";

export default function AppointmentsHistory() {
  const { isAuthenticated, token } = useAuth();
  const { past, loading, loadPast, updateAppointment, deleteAppointment } = useAppointments();

  const [editing, setEditing] = useState(null);
  const [editOpen, setEditOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (token) loadPast();
  }, [token]);

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  return (
    <div className="page">
      <div className="page__content">
        <h2>Past Appointments</h2>

        {loading && <p>Loading...</p>}

        <ul className="appointment-list">
          {past.map((a) => (
            <HistoryItem
              key={a.id}
              item={a}
              onEdit={() => {
                setEditing(a);
                setEditOpen(true);
              }}
              onDelete={() => deleteAppointment(a.id)}
              renderContent={(item) => (
                <>
                  <strong>{item.appointment_type}</strong>
                  <br />
                  {item.description && <small>{item.description}</small>}
                  <br />
                  <small>{new Date(item.appointment_datetime).toLocaleString()}</small>
                </>
              )}
            />
          ))}
        </ul>

        <div className="btn-center" style={{ marginTop: "2rem" }}>
          <button className="btn" onClick={() => navigate("/appointments")}>
            ← Back
          </button>
        </div>

        <EditAppointmentModal
          open={editOpen}
          appointment={editing}
          onSave={(updated) => {
            updateAppointment(editing.id, updated);
            setEditOpen(false);
          }}
          onClose={() => setEditOpen(false)}
        />
      </div>
    </div>
  );
}
