import { useState } from 'react';
import { useAppointments } from '../../context/AppointmentContext';

export default function AppointmentForm() {
  const { addAppointment } = useAppointments();

  const [form, setForm] = useState({
    type: '',
    date: '',
    time: '',
    notes: ''
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!form.type || !form.date || !form.time) {
      alert('Please fill in all required fields.');
      return;
    }

    addAppointment({
      type: form.type,
      date: form.date,
      time: form.time,
      notes: form.notes
    });

    setForm({ type: '', date: '', time: '', notes: '' });
  }

  return (
    <form className="feature-form" onSubmit={handleSubmit}>
      <h3>Save Booking</h3>

      <input
        name="type"
        placeholder="Appointment type (GP, Trainer, etc.)"
        value={form.type}
        onChange={handleChange}
      />

      <input
        name="date"
        type="date"
        value={form.date}
        onChange={handleChange}
      />

      <input
        name="time"
        type="time"
        value={form.time}
        onChange={handleChange}
      />

      <textarea
        name="notes"
        placeholder="Notes (optional)"
        value={form.notes}
        onChange={handleChange}
      />

      <button type="submit">Save Booking</button>
    </form>
  );
}
