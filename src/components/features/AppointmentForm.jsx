// src/components/features/AppointmentForm.jsx
import { useState } from "react";
import { useAppointments } from "../../context/AppointmentContext";

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
      {error && <ErrorMessage message={error} />}


      <div className="form-row">
        <label htmlFor="appointment-form-appointment-type">Type</label>
        <input
          id="appointment-form-appointment-type"
          name="appointment_type"
          value={form.appointment_type}
          onChange={handleChange}
          disabled={loading}
          required
        />
      </div>

      <div className="form-row">
        <label htmlFor="appointment-form-description">Description</label>
        <textarea
          id="appointment-form-description"
          name="description"
          value={form.description}
          onChange={handleChange}
          disabled={loading}
        />
      </div>

      <div className="form-row">
        <label htmlFor="appointment-form-appointment-datetime">Date & Time</label>
        <input
          id="appointment-form-appointment-datetime"
          type="datetime-local"
          name="appointment_datetime"
          value={form.appointment_datetime}
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
