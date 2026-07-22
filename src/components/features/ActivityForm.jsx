import { useState } from 'react';
import { useActivities } from '../../context/ActivityContext';

export default function ActivityForm() {
  const { addActivity } = useActivities();

  const [form, setForm] = useState({
    type: '',
    duration: '',
    date: '',
    notes: ''
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!form.type || !form.duration || !form.date) {
      alert('Please fill in all required fields.');
      return;
    }

    addActivity({
      type: form.type,
      duration: Number(form.duration),
      date: form.date,
      notes: form.notes
    });

    setForm({ type: '', duration: '', date: '', notes: '' });
  }

  return (
    <form className="feature-form" onSubmit={handleSubmit}>
      <h3>Add Activity</h3>

      <input
        name="type"
        placeholder="Activity type (e.g., Walk)"
        value={form.type}
        onChange={handleChange}
      />

      <input
        name="duration"
        type="number"
        placeholder="Duration (minutes)"
        value={form.duration}
        onChange={handleChange}
      />

      <input
        name="date"
        type="date"
        value={form.date}
        onChange={handleChange}
      />

      <textarea
        name="notes"
        placeholder="Notes (optional)"
        value={form.notes}
        onChange={handleChange}
      />

      <button type="submit">Add Activity</button>
    </form>
  );
}
