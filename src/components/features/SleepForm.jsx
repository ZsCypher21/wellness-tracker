/**
 * SleepForm.jsx
 * ---------------------------------------------------------
 * Form for adding a new sleep entry.
 *
 * Notes:
 * - Matches backend field names (sleep_date, hours_slept)
 * - Matches SleepContext addSleep({ date, hours })
 * - Uses consistent styling with all other feature forms
 *
 * Responsibilities:
 * - Manage local form state
 * - Submit a new sleep entry to SleepContext
 * - Notify parent component via onSubmit() to close modal
 */

import { useState } from "react";
import { useSleep } from "../../context/SleepContext";

export default function SleepForm({ onSubmit }) {
  const { addSleep } = useSleep();

  // Local form state for sleep fields
  const [form, setForm] = useState({
    date: "",
    hours: "",
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
  async function handleSubmit(e) {
    e.preventDefault();

    if (!form.date || !form.hours) {
      alert("Please fill in all fields");
      return;
    }

    await addSleep(form);
    onSubmit();
  }

  return (
    <form className="feature-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <label>Hours Slept</label>
        <input
          type="number"
          name="hours"
          value={form.hours}
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
