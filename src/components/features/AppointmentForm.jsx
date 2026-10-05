// src/components/features/AppointmentForm.jsx
import { useState } from "react";
import { useAppointments } from "../../context/AppointmentContext";

import Loading from "../ui/Loading";
import ErrorMessage from "../ui/ErrorMessage";

export default function AppointmentForm({ onSubmit }) {
  const { addAppointment, loading, error } = useAppointments();

  const [form, setForm] = useState({
    appointment_type: "",
    description: "",
    appointment_datetime: "",
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const res = await addAppointment(form);
    // only close the modal if the save worked; otherwise the error stays visible
    if (res) onSubmit();
  }

  return (
    <form className="feature-form" onSubmit={handleSubmit}>
      {/* ⭐ Error */}
      {error && <ErrorMessage message={error} />}

      {/* ⭐ Loading */}
      {loading && <Loading />}

      <div className="form-row">
        <label>Type</label>
        <input
          name="appointment_type"
          value={form.appointment_type}
          onChange={handleChange}
          disabled={loading}
          required
        />
      </div>

      <div className="form-row">
        <label>Description</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          disabled={loading}
        />
      </div>

      <div className="form-row">
        <label>Date & Time</label>
        <input
          type="datetime-local"
          name="appointment_datetime"
          value={form.appointment_datetime}
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
