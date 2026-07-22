import { useHydration } from '../../context/HydrationContext';

export default function HydrationList() {
  const { hydrationData, loading, deleteHydration } = useHydration();

  if (loading) return <p>Loading hydration logs...</p>;

  if (hydrationData.length === 0)
    return <p>No hydration logs yet.</p>;

  return (
    <ul className="hydration-list">
      {hydrationData.map((h) => (
        <li key={h.id} className="hydration-item">
          <div>
            <strong>{h.date}</strong>
            <br />
            {h.liters} L consumed
            {h.notes && <p>{h.notes}</p>}
          </div>

          <button
            className="delete-btn"
            onClick={() => deleteHydration(h.id)}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}
