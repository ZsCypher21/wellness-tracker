/**
 * HydrationForm.jsx
 * ---------------------------------------------------------
 * Form for adding a new hydration entry.
 *
 * Responsibilities:
 * - Manage local form state.
 * - Submit a new hydration entry to HydrationContext.
 * - Show loading + error states.
 * - Disable submit button while saving.
 */

import { useState } from "react";
import { useHydration } from "../../context/HydrationContext";

import ErrorMessage from "../ui/ErrorMessage";
import { toInputDate } from "../../utils/date";

export default function HydrationForm({ onSubmit }) {
  const { addHydration, loading, error } = useHydration();

  const [form, setForm] = useState({
    liters: "",
    date: toInputDate(),
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const res = await addHydration(form);
    // only close the modal if the save worked; otherwise the error stays visible
    if (res) onSubmit();
  }

  return (
    <form className="feature-form" onSubmit={handleSubmit}>
      {error && <ErrorMessage message={error} />}


      <div className="form-row">
        <label htmlFor="hydration-form-liters">Liters</label>
        <input
          id="hydration-form-liters"
          type="number"
          min="0.1"
          step="0.1"
          name="liters"
          value={form.liters}
          onChange={handleChange}
          disabled={loading}
          required
        />
      </div>

      <div className="form-row">
        <label htmlFor="hydration-form-date">Date</label>
        <input
          id="hydration-form-date"
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
