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

import Loading from "../ui/Loading";
import ErrorMessage from "../ui/ErrorMessage";

export default function SleepForm({ onSubmit }) {
  const { addSleep, loading, error } = useSleep();

  const [form, setForm] = useState({
    hours: "",
    date: "",
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    await addSleep(form);
    onSubmit();
  }

  return (
    <form className="feature-form" onSubmit={handleSubmit}>
      {/*  Error */}
      {error && <ErrorMessage message={error} />}

      {/*  Loading */}
      {loading && <Loading />}

      <div className="form-row">
        <label>Hours Slept</label>
        <input
          type="number"
          name="hours"
          value={form.hours}
          onChange={handleChange}
          disabled={loading}
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
