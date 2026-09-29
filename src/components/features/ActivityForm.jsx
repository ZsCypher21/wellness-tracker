<<<<<<< HEAD
/**
 * Form for adding a new activity entry.
 *
 * Notes:
 * - Follows the same structure as SleepForm, HydrationForm,
 *   MeditationForm, and AppointmentForm.
 * - Only the fields differ (type, duration, date).
 *
 * Responsibilities:
 * - Manage local form state.
 * - Submit a new activity to ActivityContext.
 * - Notify the parent component via onSubmit() so it can close
 *   modals, refresh lists, or switch tabs.
 */

import { useState } from "react";
import { useActivities } from "../../context/ActivityContext";

export default function ActivityForm({ onSubmit }) {
  const { addActivity } = useActivities();

  // Local form state for activity fields
  const [form, setForm] = useState({
    type: "",
    duration: "",
    date: "",
  });

  /**
   * Update form state when any input changes.
   * Same pattern used across all feature forms.
   */
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  /**
   * Submit the new activity.
   * - Prevent default form submission.
   * - Add the activity to global context.
   * - Trigger parent callback (usually closes modal).
   */
  function handleSubmit(e) {
    e.preventDefault();
    addActivity(form);
    onSubmit();
  }

  return (
    <form className="feature-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <label>Activity Type</label>
        <input name="type" value={form.type} onChange={handleChange} />
      </div>

      <div className="form-row">
        <label>Duration (mins)</label>
        <input name="duration" value={form.duration} onChange={handleChange} />
      </div>

      <div className="form-row">
        <label>Date</label>
        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
        />
      </div>

      <div className="btn-center">
        <button className="btn-primary" type="submit">Add</button>
      </div>
    </form>
  );
}
=======
/**
 * Form for adding a new activity entry.
 *
 * Notes:
 * - Follows the same structure as SleepForm, HydrationForm,
 *   MeditationForm, and AppointmentForm.
 * - Only the fields differ (type, duration, date).
 *
 * Responsibilities:
 * - Manage local form state.
 * - Submit a new activity to ActivityContext.
 * - Notify the parent component via onSubmit() so it can close
 *   modals, refresh lists, or switch tabs.
 */

import { useState } from "react";
import { useActivities } from "../../context/ActivityContext";

export default function ActivityForm({ onSubmit }) {
  const { addActivity } = useActivities();

  // Local form state for activity fields
  const [form, setForm] = useState({
    type: "",
    duration: "",
    date: "",
  });

  /**
   * Update form state when any input changes.
   * Same pattern used across all feature forms.
   */
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  /**
   * Submit the new activity.
   * - Prevent default form submission.
   * - Add the activity to global context.
   * - Trigger parent callback (usually closes modal).
   */
  function handleSubmit(e) {
    e.preventDefault();
    addActivity(form);
    onSubmit();
  }

  return (
    <form className="feature-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <label>Activity Type</label>
        <input name="type" value={form.type} onChange={handleChange} />
      </div>

      <div className="form-row">
        <label>Duration (mins)</label>
        <input name="duration" value={form.duration} onChange={handleChange} />
      </div>

      <div className="form-row">
        <label>Date</label>
        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
        />
      </div>

      <div className="btn-center">
        <button className="btn-primary" type="submit">Add</button>
      </div>
    </form>
  );
}
>>>>>>> c2d5a7186b0cd3d7657a3ffe8873d7665b9f319d
