// src/components/features/EditHydrationModal.jsx
/**
 * Edit modal for a single hydration entry.
 * The form is a separate inner component keyed by the entry id, so it is
 * re-initialised with the selected entry's values every time the modal opens.
 * It calls onSave(updatedEntry); the parent page performs the API request.
 */
import { useState } from "react";
import Loading from "../ui/Loading";
import ErrorMessage from "../ui/ErrorMessage";
import { formatLiters } from "../../utils/format";

export default function EditHydrationModal({ open, hydration, onSave, onClose }) {
  if (!open || !hydration) return null;
  return <EditForm key={hydration.id} item={hydration} onSave={onSave} onClose={onClose} />;
}

function EditForm({ item, onSave, onClose }) {
  const [form, setForm] = useState({
    liters: item.liters ?? "",
    hydration_date: String(item.hydration_date ?? "").slice(0, 10),
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
        <h3>Edit Hydration</h3>

        {error && <ErrorMessage message={error} />}
        {saving && <Loading />}

        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <label>Liters</label>
            <input
              type="number"
              name="liters"
              value={form.liters}
              onChange={handleChange}
              disabled={saving}
              min="0.1"
              step="0.1"
              required
            />
            {form.liters !== "" && <small>Preview: {formatLiters(form.liters)} L</small>}
          </div>
          <div className="form-row">
            <label>Date</label>
            <input
              type="date"
              name="hydration_date"
              value={form.hydration_date}
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
