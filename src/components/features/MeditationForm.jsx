<<<<<<< HEAD
/**
 * Form for adding a new meditation entry.
 *
 * Notes:
 * - Follows the same structure as ActivityForm, SleepForm,
 *   HydrationForm, and AppointmentForm.
 * - Only the fields differ (duration, date).
 *
 * Responsibilities:
 * - Manage local form state.
 * - Submit a new meditation entry to MeditationContext.
 * - Notify the parent component via onSubmit() so it can close
 *   modals or refresh lists.
 */

import { useState } from "react";
import { useMeditation } from "../../context/MeditationContext";

export default function MeditationForm({ onSubmit }) {
  const { addMeditation } = useMeditation();

  // Local form state for meditation fields
  const [form, setForm] = useState({
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
   * Submit the new meditation entry.
   * - Prevent default form submission.
   * - Add the meditation record to global context.
   * - Trigger parent callback (usually closes modal).
   */
  function handleSubmit(e) {
    e.preventDefault();
    addMeditation(form);
    onSubmit();
  }

  return (
    <form className="feature-form" onSubmit={handleSubmit}>
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
 * Form for adding a new meditation entry.
 *
 * Notes:
 * - Follows the same structure as ActivityForm, SleepForm,
 *   HydrationForm, and AppointmentForm.
 * - Only the fields differ (duration, date).
 *
 * Responsibilities:
 * - Manage local form state.
 * - Submit a new meditation entry to MeditationContext.
 * - Notify the parent component via onSubmit() so it can close
 *   modals or refresh lists.
 */

import { useState } from "react";
import { useMeditation } from "../../context/MeditationContext";

export default function MeditationForm({ onSubmit }) {
  const { addMeditation } = useMeditation();

  // Local form state for meditation fields
  const [form, setForm] = useState({
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
   * Submit the new meditation entry.
   * - Prevent default form submission.
   * - Add the meditation record to global context.
   * - Trigger parent callback (usually closes modal).
   */
  function handleSubmit(e) {
    e.preventDefault();
    addMeditation(form);
    onSubmit();
  }

  return (
    <form className="feature-form" onSubmit={handleSubmit}>
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
