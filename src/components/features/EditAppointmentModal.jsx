import { useState } from "react";
import { useAppointments } from "../../context/AppointmentContext";
import Loading from "../ui/Loading";
import ErrorMessage from "../ui/ErrorMessage";

export default function EditAppointmentModal({ open, appointment, onSave, onClose }) {
  const { updateAppointment, loading, error } = useAppointments();

  const [form, setForm] = useState({
    appointment_type: appointment?.appointment_type || "",
    description: appointment?.description || "",
    appointment_datetime: appointment?.appointment_datetime || "",
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    await updateAppointment(appointment.id, form);
    onSave();
  }

  if (!open) return null;

  return (
    <div className="modal">
      <div className="modal__content">
        <h3>Edit Appointment</h3>

        {error && <ErrorMessage message={error} />}
        {loading && <Loading />}

        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <label>Type</label>
            <input
              name="appointment_type"
              value={form.appointment_type}
              onChange={handleChange}
              disabled={loading}
            />
          </div>

          <div className="form-row">
            <label>Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              disabled={loading}
            />
          </div>

          <div className="form-row">
            <label>Date & Time</label>
            <input
              type="datetime-local"
              name="appointment_datetime"
              value={form.appointment_datetime}
              onChange={handleChange}
              disabled={loading}
            />
          </div>

          <div className="modal__actions">
            <button className="btn-primary" type="submit" disabled={loading}>
              {loading ? "Saving..." : "Save"}
            </button>
            <button className="btn" type="button" onClick={onClose} disabled={loading}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
