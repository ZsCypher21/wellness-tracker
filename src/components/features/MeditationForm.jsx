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

import Loading from "../ui/Loading";
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
      {/*  Error */}
      {error && <ErrorMessage message={error} />}

      {/*  Loading */}
      {loading && <Loading />}

      <div className="form-row">
        <label>Duration (mins)</label>
        <input
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
        <label>Date</label>
        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          disabled={loading}
          required
        />
      </div>

      <div className="btn-center">
        <button className="btn-primary" type="submit" disabled={loading}>
          {loading ? "Saving..." : "Add"}
        </button>
      </div>
    </form>
  );
}
