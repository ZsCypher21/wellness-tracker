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

import Loading from "../ui/Loading";
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
      {/* Error */}
      {error && <ErrorMessage message={error} />}

      {/* Loading */}
      {loading && <Loading />}

      <div className="form-row">
        <label>Liters</label>
        <input
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
