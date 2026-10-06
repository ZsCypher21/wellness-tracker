// src/components/features/EditHydrationModal.jsx
/**
 * Edit modal for a single hydration entry.
 * The form is a separate inner component keyed by the entry id, so it is
 * re-initialised with the selected entry's values every time the modal opens.
 * It calls onSave(updatedEntry); the parent page performs the API request.
 */
import { useState } from "react";
import ErrorMessage from "../ui/ErrorMessage";
import Modal from "../ui/Modal";
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
    <Modal isOpen onClose={onClose} title="Edit hydration">

        {error && <ErrorMessage message={error} />}

        <form className="feature-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <label htmlFor="edit-hydration-modal-liters">Liters</label>
            <input
              id="edit-hydration-modal-liters"
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
            <label htmlFor="edit-hydration-modal-hydration-date">Date</label>
            <input
              id="edit-hydration-modal-hydration-date"
              type="date"
              name="hydration_date"
              value={form.hydration_date}
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
