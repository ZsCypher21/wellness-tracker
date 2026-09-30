// src/pages/Appointments.jsx
import { useState, useEffect } from "react";
import { useAppointments } from "../context/AppointmentContext";
import { useAuth } from "../context/AuthContext";
import Modal from "../components/ui/Modal";
import AppointmentForm from "../components/features/AppointmentForm";
import EditAppointmentModal from "../components/features/EditAppointmentModal";
import HistoryItem from "../components/common/HistoryItem";
import { Navigate } from "react-router-dom";

export default function Appointments() {
  const { token } = useAuth();
  const { upcoming, loading, loadUpcoming, updateAppointment, deleteAppointment } = useAppointments();

  const [showAdd, setShowAdd] = useState(false);
  const [editing, setEditing] = useState(null);
  const [editOpen, setEditOpen] = useState(false);

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
