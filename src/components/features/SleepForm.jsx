import { useState } from 'react';
import { useSleep } from '../../context/SleepContext';

export default function SleepForm() {
  const { addSleep } = useSleep();

  const [form, setForm] = useState({
    sleepTime: '',
    wakeTime: '',
    date: ''
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function calculateHours(sleepTime, wakeTime) {
    const [sH, sM] = sleepTime.split(':').map(Number);
    const [wH, wM] = wakeTime.split(':').map(Number);

    let start = sH * 60 + sM;
    let end = wH * 60 + wM;

    if (end < start) end += 24 * 60; // handle overnight sleep

    return ((end - start) / 60).toFixed(1);
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!form.sleepTime || !form.wakeTime || !form.date) {
      alert('Please fill in all fields.');
      return;
    }

    const totalHours = calculateHours(form.sleepTime, form.wakeTime);

    addSleep({
      sleepTime: form.sleepTime,
      wakeTime: form.wakeTime,
      totalHours,
      date: form.date
    });

    setForm({ sleepTime: '', wakeTime: '', date: '' });
  }

  return (
    <form className="feature-form" onSubmit={handleSubmit}>
      <h3>Add Sleep Entry</h3>

      <input
        name="sleepTime"
        type="time"
        value={form.sleepTime}
        onChange={handleChange}
      />

      <input
        name="wakeTime"
        type="time"
        value={form.wakeTime}
        onChange={handleChange}
      />

      <input
        name="date"
        type="date"
        value={form.date}
        onChange={handleChange}
      />

      <button type="submit">Add Sleep</button>
    </form>
  );
}
