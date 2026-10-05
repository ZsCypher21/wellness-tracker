import { useState, useEffect } from "react";
import { useAppointments } from "../context/AppointmentContext";
import { useAuth } from "../context/AuthContext";
import Modal from "../components/ui/Modal";
import AppointmentForm from "../components/features/AppointmentForm";
import EditAppointmentModal from "../components/features/EditAppointmentModal";
import HistoryItem from "../components/common/HistoryItem";
import Loading from "../components/ui/Loading";
import ErrorMessage from "../components/ui/ErrorMessage";
import { Navigate, useNavigate } from "react-router-dom";

export default function Appointments() {
  const { token } = useAuth();
  const { upcoming, loading, error, loadUpcoming, updateAppointment, deleteAppointment } =
    useAppointments();

  const navigate = useNavigate();

  const [showAdd, setShowAdd] = useState(false);
  const [editing, setEditing] = useState(null);
  const [editOpen, setEditOpen] = useState(false);

  useEffect(() => {
    if (token) loadUpcoming();
  }, [token, loadUpcoming]);

  if (!token) return <Navigate to="/login" replace />;

  return (
    <div className="page">
      <div className="page__content">
        <h2>Upcoming Appointments</h2>

        {loading && <Loading />}
        {error && <ErrorMessage message={error} />}

        {!loading && !error && upcoming.length === 0 && (
          <p className="empty-state">No upcoming appointments.</p>
        )}

        <ul className="appointment-list">
          {upcoming.map((a) => (
            <HistoryItem
              key={a.id}
              item={a}
              onEdit={() => {
                setEditing(a);
                setEditOpen(true);
              }}
              onDelete={() => {
                if (window.confirm("Delete this appointment?")) deleteAppointment(a.id);
              }}
              renderContent={(item) => (
                <>
                  <strong>{item.appointment_type}</strong>
                  <br />
                  {item.description && <small>{item.description}</small>}
                  <br />
                  <small>{new Date(item.appointment_datetime).toLocaleString("en-AU", { dateStyle: "medium", timeStyle: "short" })}</small>
                </>
              )}
            />
          ))}
        </ul>

        <div className="btn-center" style={{ gap: "1rem" }}>
          <button className="btn-primary" onClick={() => setShowAdd(true)}>
            Add Appointment
          </button>

          <button className="btn" onClick={() => navigate("/appointments/history")}>
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
          onSave={async (updated) => {
            const ok = await updateAppointment(updated.id, updated);
            if (!ok) throw new Error("Failed to update appointment.");
            setEditOpen(false);
            setEditing(null);
          }}
          onClose={() => setEditOpen(false)}
        />
      </div>
    </div>
  );
}
