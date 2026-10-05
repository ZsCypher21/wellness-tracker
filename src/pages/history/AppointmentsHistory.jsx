// src/pages/history/AppointmentsHistory.jsx
import { useEffect, useState } from "react";
import { useAppointments } from "../../context/AppointmentContext";
import { useAuth } from "../../context/AuthContext";
import { Navigate, useNavigate } from "react-router-dom";

import HistoryItem from "../../components/common/HistoryItem";
import EditAppointmentModal from "../../components/features/EditAppointmentModal";

import Loading from "../../components/ui/Loading";
import ErrorMessage from "../../components/ui/ErrorMessage";

export default function AppointmentsHistory() {
  const { isAuthenticated, token } = useAuth();
  const {
    past,
    loading,
    error,
    loadPast,
    updateAppointment,
    deleteAppointment
  } = useAppointments();

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

        {/* ⭐ Loading */}
        {loading && <Loading />}

        {/* ⭐ Error */}
        {error && <ErrorMessage message={error} />}

        {/* ⭐ Empty State */}
        {!loading && !error && past.length === 0 && (
          <p className="empty-state">No past appointments yet.</p>
        )}

        {/* ⭐ List */}
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

        {/* ⭐ Back button */}
        <div className="btn-center" style={{ marginTop: "2rem" }}>
          <button className="btn" onClick={() => navigate("/appointments")}>
            ← Back
          </button>
        </div>

        {/* ⭐ Edit Modal */}
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
