import { useState } from 'react';
import { useHydration } from '../../context/HydrationContext';

export default function HydrationForm() {
  const { addHydration } = useHydration();

  const [form, setForm] = useState({
    liters: '',
    date: '',
    notes: ''
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!form.liters || !form.date) {
      alert('Please fill in all required fields.');
      return;
    }

    addHydration({
      liters: Number(form.liters),
      date: form.date,
      notes: form.notes
    });

    setForm({ liters: '', date: '', notes: '' });
  }

  return (
    <form className="feature-form" onSubmit={handleSubmit}>
      <h3>Add Hydration Log</h3>

      <input
        name="liters"
        type="number"
        step="0.1"
        placeholder="Liters consumed"
        value={form.liters}
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

      <button type="submit">Add Hydration</button>
    </form>
  );
}
