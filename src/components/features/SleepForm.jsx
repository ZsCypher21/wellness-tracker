// src/components/features/SleepForm.jsx
/**
 * SleepForm.jsx
 * ---------------------------------------------------------
 * Form for adding a new sleep entry.
 *
 * Responsibilities:
 * - Manage local form state.
 * - Submit a new sleep entry to SleepContext.
 * - Show loading + error states.
 * - Disable submit button while saving.
 */

import { useState } from "react";
import { useSleep } from "../../context/SleepContext";

import ErrorMessage from "../ui/ErrorMessage";
import { toInputDate } from "../../utils/date";

export default function SleepForm({ onSubmit }) {
  const { addSleep, loading, error } = useSleep();

  const [form, setForm] = useState({
    hours: "",
    date: toInputDate(),
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const res = await addSleep(form);
    // only close the modal if the save worked; otherwise the error stays visible
    if (res) onSubmit();
  }

  return (
    <form className="feature-form" onSubmit={handleSubmit}>
      {error && <ErrorMessage message={error} />}


      <div className="form-row">
        <label htmlFor="sleep-form-hours">Hours Slept</label>
        <input
          id="sleep-form-hours"
          type="number"
          min="0.5"
          max="24"
          step="0.5"
          name="hours"
          value={form.hours}
          onChange={handleChange}
          disabled={loading}
          required
        />
      </div>

      <div className="form-row">
        <label htmlFor="sleep-form-date">Date</label>
        <input
          id="sleep-form-date"
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
