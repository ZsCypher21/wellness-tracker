import { useState } from "react";
import { useActivities } from "../../context/ActivityContext";
import Loading from "../ui/Loading";
import ErrorMessage from "../ui/ErrorMessage";

export default function EditActivityModal({ open, activity, onSave, onClose }) {
  const { updateActivity, loading, error } = useActivities();

  const [form, setForm] = useState({
    activity_type: activity?.activity_type || "",
    duration_minutes: activity?.duration_minutes || "",
    activity_date: activity?.activity_date || "",
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    await updateActivity(activity.id, form);
    onSave();
  }

  if (!open) return null;

  return (
    <div className="modal">
      <div className="modal__content">
        <h3>Edit Activity</h3>

        {error && <ErrorMessage message={error} />}
        {loading && <Loading />}

        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <label>Type</label>
            <input
              name="activity_type"
              value={form.activity_type}
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
              name="activity_date"
              value={form.activity_date}
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
