// src/components/features/EditAppointmentModal.jsx
/**
 * Edit modal for a single appointment entry.
 * The form is a separate inner component keyed by the entry id, so it is
 * re-initialised with the selected entry's values every time the modal opens.
 * It calls onSave(updatedEntry); the parent page performs the API request.
 */
import { useState } from "react";
import ErrorMessage from "../ui/ErrorMessage";
import Modal from "../ui/Modal";
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
    <Modal isOpen onClose={onClose} title="Edit appointment">

        {error && <ErrorMessage message={error} />}

        <form className="feature-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <label htmlFor="edit-appointment-modal-appointment-type">Type</label>
            <input
              id="edit-appointment-modal-appointment-type"
              type="text"
              name="appointment_type"
              value={form.appointment_type}
              onChange={handleChange}
              disabled={saving}
              required
            />
          </div>
          <div className="form-row">
            <label htmlFor="edit-appointment-modal-description">Description</label>
            <textarea
              id="edit-appointment-modal-description"
              name="description"
              value={form.description}
              onChange={handleChange}
              disabled={saving}
            />
          </div>
          <div className="form-row">
            <label htmlFor="edit-appointment-modal-appointment-datetime">Date & Time</label>
            <input
              id="edit-appointment-modal-appointment-datetime"
              type="datetime-local"
              name="appointment_datetime"
              value={form.appointment_datetime}
              onChange={handleChange}
              disabled={saving}
              required
            />
          </div>

          <div className="modal__actions">
            <button className="btn btn--primary" type="submit" disabled={saving}>
              {saving ? "Saving..." : "Save"}
            </button>
            <button className="btn btn--ghost" type="button" onClick={onClose} disabled={saving}>
              Cancel
            </button>
          </div>
        </form>
    </Modal>
  );
}
