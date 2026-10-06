// src/components/features/EditMeditationModal.jsx
/**
 * Edit modal for a single meditation entry.
 * The form is a separate inner component keyed by the entry id, so it is
 * re-initialised with the selected entry's values every time the modal opens.
 * It calls onSave(updatedEntry); the parent page performs the API request.
 */
import { useState } from "react";
import ErrorMessage from "../ui/ErrorMessage";
import Modal from "../ui/Modal";

export default function EditMeditationModal({ open, meditation, onSave, onClose }) {
  if (!open || !meditation) return null;
  return <EditForm key={meditation.id} item={meditation} onSave={onSave} onClose={onClose} />;
}

function EditForm({ item, onSave, onClose }) {
  const [form, setForm] = useState({
    duration_minutes: item.duration_minutes ?? "",
    meditation_date: String(item.meditation_date ?? "").slice(0, 10),
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
    <Modal isOpen onClose={onClose} title="Edit meditation">

        {error && <ErrorMessage message={error} />}

        <form className="feature-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <label htmlFor="edit-meditation-modal-duration-minutes">Duration (mins)</label>
            <input
              id="edit-meditation-modal-duration-minutes"
              type="number"
              name="duration_minutes"
              value={form.duration_minutes}
              onChange={handleChange}
              disabled={saving}
              min="1"
              required
            />
          </div>
          <div className="form-row">
            <label htmlFor="edit-meditation-modal-meditation-date">Date</label>
            <input
              id="edit-meditation-modal-meditation-date"
              type="date"
              name="meditation_date"
              value={form.meditation_date}
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
