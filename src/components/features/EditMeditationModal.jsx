import { useState } from "react";
import { useMeditation } from "../../context/MeditationContext";
import Loading from "../ui/Loading";
import ErrorMessage from "../ui/ErrorMessage";

export default function EditMeditationModal({ open, meditation, onSave, onClose }) {
  const { updateMeditation, loading, error } = useMeditation();

  const [form, setForm] = useState({
    meditation_type: meditation?.meditation_type || "",
    duration_minutes: meditation?.duration_minutes || "",
    meditation_date: meditation?.meditation_date || "",
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    await updateMeditation(meditation.id, form);
    onSave();
  }

  if (!open) return null;

  return (
    <div className="modal">
      <div className="modal__content">
        <h3>Edit Meditation</h3>

        {error && <ErrorMessage message={error} />}
        {loading && <Loading />}

        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <label>Type</label>
            <input
              name="meditation_type"
              value={form.meditation_type}
              onChange={handleChange}
              disabled={loading}
            />
          </div>

          <div className="form-row">
            <label>Duration (mins)</label>
            <input
              name="duration_minutes"
              value={form.duration_minutes}
              onChange={handleChange}
              disabled={loading}
            />
          </div>

          <div className="form-row">
            <label>Date</label>
            <input
              type="date"
              name="meditation_date"
              value={form.meditation_date}
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
