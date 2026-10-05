// src/components/features/EditActivityModal.jsx
/**
 * Edit modal for a single activity entry.
 * The form is a separate inner component keyed by the entry id, so it is
 * re-initialised with the selected entry's values every time the modal opens.
 * It calls onSave(updatedEntry); the parent page performs the API request.
 */
import { useState } from "react";
import Loading from "../ui/Loading";
import ErrorMessage from "../ui/ErrorMessage";

export default function EditActivityModal({ open, activity, onSave, onClose }) {
  if (!open || !activity) return null;
  return <EditForm key={activity.id} item={activity} onSave={onSave} onClose={onClose} />;
}

function EditForm({ item, onSave, onClose }) {
  const [form, setForm] = useState({
    activity_type: item.activity_type ?? "",
    duration_minutes: item.duration_minutes ?? "",
    activity_date: String(item.activity_date ?? "").slice(0, 10),
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
        <h3>Edit Activity</h3>

        {error && <ErrorMessage message={error} />}
        {saving && <Loading />}

        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <label>Type</label>
            <input
              type="text"
              name="activity_type"
              value={form.activity_type}
              onChange={handleChange}
              disabled={saving}
              required
            />
          </div>
          <div className="form-row">
            <label>Duration (mins)</label>
            <input
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
            <label>Date</label>
            <input
              type="date"
              name="activity_date"
              value={form.activity_date}
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
