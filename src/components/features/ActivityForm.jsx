/**
 * ActivityForm.jsx
 * ---------------------------------------------------------
 * Form for adding a new activity entry.
 *
 * Responsibilities:
 * - Manage local form state.
 * - Submit a new activity to ActivityContext.
 * - Show loading + error states.
 * - Disable submit button while saving.
 */

import { useState } from "react";
import { useActivities } from "../../context/ActivityContext";
import ErrorMessage from "../ui/ErrorMessage";
import { toInputDate } from "../../utils/date";

export default function ActivityForm({ onSubmit }) {
  const { addActivity, loading, error } = useActivities();

  const [form, setForm] = useState({
    type: "",
    duration: "",
    date: toInputDate(),
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const res = await addActivity(form);
    // only close the modal if the save worked; otherwise the error stays visible
    if (res) onSubmit();
  }

  return (
    <form className="feature-form" onSubmit={handleSubmit}>
      {error && <ErrorMessage message={error} />}

      <div className="form-row">
        <label htmlFor="activity-form-type">Activity Type</label>
        <input
          id="activity-form-type"
          name="type"
          value={form.type}
          onChange={handleChange}
          disabled={loading}
          required
        />
      </div>

      <div className="form-row">
        <label htmlFor="activity-form-duration">Duration (mins)</label>
        <input
          id="activity-form-duration"
          type="number"
          min="1"
          name="duration"
          value={form.duration}
          onChange={handleChange}
          disabled={loading}
          required
        />
      </div>

      <div className="form-row">
        <label htmlFor="activity-form-date">Date</label>
        <input
          id="activity-form-date"
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          disabled={loading}
          required
        />
      </div>

      <div className="btn-center">
        <button className="btn btn--primary btn--block" type="submit" disabled={loading}>
          {loading ? "Saving…" : "Save entry"}
        </button>
      </div>
    </form>
  );
}
