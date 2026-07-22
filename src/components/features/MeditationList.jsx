import { useMeditations } from '../../context/MeditationContext';

export default function MeditationList() {
  const { meditations, loading, deleteMeditation } = useMeditations();

  if (loading) return <p>Loading meditation sessions...</p>;

  if (meditations.length === 0)
    return <p>No meditation sessions logged yet.</p>;

  return (
    <ul className="meditation-list">
      {meditations.map((m) => (
        <li key={m.id} className="meditation-item">
          <div>
            <strong>{m.type}</strong> — {m.duration} mins  
            <br />
            <small>{m.date}</small>
            {m.notes && <p>{m.notes}</p>}
          </div>

          <button
            className="delete-btn"
            onClick={() => deleteMeditation(m.id)}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}
