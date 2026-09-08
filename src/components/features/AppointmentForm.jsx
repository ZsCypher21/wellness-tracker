/**
 * Form for adding a new appointment entry.
 *
 * Notes:
 * - Follows the same structure as ActivityForm, SleepForm,
 *   HydrationForm, and MeditationForm.
 * - Only the fields differ (title, date).
 *
 * Responsibilities:
 * - Manage local form state.
 * - Submit a new appointment to AppointmentContext.
 * - Notify the parent component via onSubmit() so it can close
 *   modals or refresh lists.
 */

import { useState } from "react";
import { useAppointments } from "../../context/AppointmentContext";

export default function AppointmentForm({ onSubmit }) {
  const { addAppointment } = useAppointments();

  // Local form state for appointment fields
  const [form, setForm] = useState({
    title: "",
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
   * Submit the new appointment.
   * - Prevent default form submission.
   * - Add the appointment to global context.
   * - Trigger parent callback (usually closes modal).
   */
  function handleSubmit(e) {
    e.preventDefault();
    addAppointment(form);
    onSubmit();
  }

  return (
    <form className="feature-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <label>Title</label>
        <input name="title" value={form.title} onChange={handleChange} />
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
