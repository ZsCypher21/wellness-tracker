// src/components/features/EditAppointmentModal.jsx
/**
 * Edit modal for a single appointment entry.
 * The form is a separate inner component keyed by the entry id, so it is
 * re-initialised with the selected entry's values every time the modal opens.
 * It calls onSave(updatedEntry); the parent page performs the API request.
 */
import { useState } from "react";
import Loading from "../ui/Loading";
import ErrorMessage from "../ui/ErrorMessage";
import { toInputDateTime } from "../../utils/date";

export default function EditAppointmentModal({ open, appointment, onSave, onClose }) {
  if (!open || !appointment) return null;
  return <EditForm key={appointment.id} item={appointment} onSave={onSave} onClose={onClose} />;
}

function EditForm({ item, onSave, onClose }) {
  const [form, setForm] = useState({
    appointment_type: item.appointment_type ?? "",
    description: item.description ?? "",
    appointment_datetime: toInputDateTime(item.appointment_datetime),
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setSaving(true);
    try {
      await onSave({ ...item, ...form });
    } catch (err) {
      setError(err.message || "Failed to save changes.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="modal-overlay">
      <div className="modal-window">
        <h3>Edit Appointment</h3>

        {error && <ErrorMessage message={error} />}
        {saving && <Loading />}

        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <label>Type</label>
            <input
              type="text"
              name="appointment_type"
              value={form.appointment_type}
              onChange={handleChange}
              disabled={saving}
              required
            />
          </div>
          <div className="form-row">
            <label>Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              disabled={saving}
            />
          </div>
          <div className="form-row">
            <label>Date & Time</label>
            <input
              type="datetime-local"
              name="appointment_datetime"
              value={form.appointment_datetime}
              onChange={handleChange}
              disabled={saving}
              required
            />
          </div>

          <div className="modal__actions">
            <button className="btn-primary" type="submit" disabled={saving}>
              {saving ? "Saving..." : "Save"}
            </button>
            <button className="btn" type="button" onClick={onClose} disabled={saving}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
