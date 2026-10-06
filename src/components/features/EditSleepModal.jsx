// src/components/features/EditSleepModal.jsx
/**
 * Edit modal for a single sleep entry.
 * The form is a separate inner component keyed by the entry id, so it is
 * re-initialised with the selected entry's values every time the modal opens.
 * It calls onSave(updatedEntry); the parent page performs the API request.
 */
import { useState } from "react";
import ErrorMessage from "../ui/ErrorMessage";
import Modal from "../ui/Modal";

export default function EditSleepModal({ open, sleep, onSave, onClose }) {
  if (!open || !sleep) return null;
  return <EditForm key={sleep.id} item={sleep} onSave={onSave} onClose={onClose} />;
}

function EditForm({ item, onSave, onClose }) {
  const [form, setForm] = useState({
    hours_slept: item.hours_slept ?? "",
    sleep_date: String(item.sleep_date ?? "").slice(0, 10),
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
    <Modal isOpen onClose={onClose} title="Edit sleep">

        {error && <ErrorMessage message={error} />}

        <form className="feature-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <label htmlFor="edit-sleep-modal-hours-slept">Hours Slept</label>
            <input
              id="edit-sleep-modal-hours-slept"
              type="number"
              name="hours_slept"
              value={form.hours_slept}
              onChange={handleChange}
              disabled={saving}
              min="0.5"
              max="24"
              step="0.5"
              required
            />
          </div>
          <div className="form-row">
            <label htmlFor="edit-sleep-modal-sleep-date">Date</label>
            <input
              id="edit-sleep-modal-sleep-date"
              type="date"
              name="sleep_date"
              value={form.sleep_date}
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
