<<<<<<< HEAD
/**
 * Form for adding a new sleep entry.
 *
 * Notes:
 * - Follows the same structure as ActivityForm, HydrationForm,
 *   MeditationForm, and AppointmentForm.
 * - Only the fields differ (totalHours, date).
 *
 * Responsibilities:
 * - Manage local form state.
 * - Submit a new sleep entry to SleepContext.
 * - Notify the parent component via onSubmit() so it can close
 *   modals or refresh lists.
 */

import { useState } from "react";
import { useSleep } from "../../context/SleepContext";

export default function SleepForm({ onSubmit }) {
  const { addSleep } = useSleep();

  // Local form state for sleep fields
  const [form, setForm] = useState({
    totalHours: "",
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
   * Submit the new sleep entry.
   * - Prevent default form submission.
   * - Add the sleep record to global context.
   * - Trigger parent callback (usually closes modal).
   */
  function handleSubmit(e) {
    e.preventDefault();
    addSleep(form);
    onSubmit();
  }

  return (
    <form className="feature-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <label>Total Hours</label>
        <input
          name="totalHours"
          value={form.totalHours}
          onChange={handleChange}
        />
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
 * Form for adding a new sleep entry.
 *
 * Notes:
 * - Follows the same structure as ActivityForm, HydrationForm,
 *   MeditationForm, and AppointmentForm.
 * - Only the fields differ (totalHours, date).
 *
 * Responsibilities:
 * - Manage local form state.
 * - Submit a new sleep entry to SleepContext.
 * - Notify the parent component via onSubmit() so it can close
 *   modals or refresh lists.
 */

import { useState } from "react";
import { useSleep } from "../../context/SleepContext";

export default function SleepForm({ onSubmit }) {
  const { addSleep } = useSleep();

  // Local form state for sleep fields
  const [form, setForm] = useState({
    totalHours: "",
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
   * Submit the new sleep entry.
   * - Prevent default form submission.
   * - Add the sleep record to global context.
   * - Trigger parent callback (usually closes modal).
   */
  function handleSubmit(e) {
    e.preventDefault();
    addSleep(form);
    onSubmit();
  }

  return (
    <form className="feature-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <label>Total Hours</label>
        <input
          name="totalHours"
          value={form.totalHours}
          onChange={handleChange}
        />
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
