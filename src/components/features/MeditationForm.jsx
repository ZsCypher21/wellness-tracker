// src/components/features/MeditationForm.jsx
/**
 * MeditationForm.jsx
 * ---------------------------------------------------------
 * Form for adding a new meditation entry.
 *
 * Responsibilities:
 * - Manage local form state.
 * - Submit a new meditation entry to MeditationContext.
 * - Show loading + error states.
 * - Disable submit button while saving.
 */

import { useState } from "react";
import { useMeditation } from "../../context/MeditationContext";

import ErrorMessage from "../ui/ErrorMessage";
import { toInputDate } from "../../utils/date";

export default function MeditationForm({ onSubmit }) {
  const { addMeditation, loading, error } = useMeditation();

  const [form, setForm] = useState({
    duration: "",
    date: toInputDate(),
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const res = await addMeditation(form);
    // only close the modal if the save worked; otherwise the error stays visible
    if (res) onSubmit();
  }

  return (
    <form className="feature-form" onSubmit={handleSubmit}>
      {error && <ErrorMessage message={error} />}


      <div className="form-row">
        <label htmlFor="meditation-form-duration">Duration (mins)</label>
        <input
          id="meditation-form-duration"
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
        <label htmlFor="meditation-form-date">Date</label>
        <input
          id="meditation-form-date"
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
