// src/components/features/AppointmentForm.jsx
import { useState } from "react";
import { useAppointments } from "../../context/AppointmentContext";

export default function AppointmentForm({ onSubmit }) {
  const { addAppointment } = useAppointments();

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
    await addAppointment(form);
    onSubmit();
  }

  return (
    <form className="feature-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <label>Type</label>
        <input
          name="appointment_type"
          value={form.appointment_type}
          onChange={handleChange}
        />
      </div>

      <div className="form-row">
        <label>Description</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
        />
      </div>

      <div className="form-row">
        <label>Date & Time</label>
        <input
          type="datetime-local"
          name="appointment_datetime"
          value={form.appointment_datetime}
          onChange={handleChange}
        />
      </div>

      <div className="btn-center">
        <button className="btn-primary" type="submit">Add</button>
      </div>
    </form>
  );
}
