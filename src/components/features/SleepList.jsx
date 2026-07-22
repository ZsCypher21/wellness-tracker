import { useSleep } from '../../context/SleepContext';

export default function SleepList() {
  const { sleepData, loading, deleteSleep } = useSleep();

  if (loading) return <p>Loading sleep data...</p>;

  if (sleepData.length === 0)
    return <p>No sleep entries logged yet.</p>;

  return (
    <ul className="sleep-list">
      {sleepData.map((s) => (
        <li key={s.id} className="sleep-item">
          <div>
            <strong>{s.date}</strong>
            <br />
            Bed: {s.sleepTime}  
            <br />
            Wake: {s.wakeTime}
            <br />
            <strong>Total: {s.totalHours} hrs</strong>
          </div>

          <button
            className="delete-btn"
            onClick={() => deleteSleep(s.id)}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}
