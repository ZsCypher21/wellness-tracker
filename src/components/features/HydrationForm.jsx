/**
 * Form for adding a new hydration entry.
 *
 * Notes:
 * - Follows the same structure as ActivityForm, SleepForm,
 *   MeditationForm, and AppointmentForm.
 * - Only the fields differ (liters, date).
 *
 * Responsibilities:
 * - Manage local form state.
 * - Submit a new hydration entry to HydrationContext.
 * - Notify the parent component via onSubmit() so it can close
 *   modals or refresh lists.
 */

import { useState } from "react";
import { useHydration } from "../../context/HydrationContext";

export default function HydrationForm({ onSubmit }) {
  const { addHydration } = useHydration();

  // Local form state for hydration fields
  const [form, setForm] = useState({
    liters: "",
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
   * Submit the new hydration entry.
   * - Prevent default form submission.
   * - Add the hydration record to global context.
   * - Trigger parent callback (usually closes modal).
   */
  function handleSubmit(e) {
    e.preventDefault();
    addHydration(form);
    onSubmit();
  }

  return (
    <form className="feature-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <label>Liters</label>
        <input name="liters" value={form.liters} onChange={handleChange} />
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
