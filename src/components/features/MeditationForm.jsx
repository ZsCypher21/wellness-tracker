import { useState } from 'react';
import { useMeditations } from '../../context/MeditationContext';

export default function MeditationForm() {
  const { addMeditation } = useMeditations();

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

    addMeditation({
      type: form.type,
      duration: Number(form.duration),
      date: form.date,
      notes: form.notes
    });

    setForm({ type: '', duration: '', date: '', notes: '' });
  }

  return (
    <form className="feature-form" onSubmit={handleSubmit}>
      <h3>Add Meditation Session</h3>

      <input
        name="type"
        placeholder="Type (e.g., Mindfulness)"
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

      <button type="submit">Add Meditation</button>
    </form>
  );
}
