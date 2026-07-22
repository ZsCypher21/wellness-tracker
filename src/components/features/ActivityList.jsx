import { useActivities } from '../../context/ActivityContext';

export default function ActivityList() {
  const { activities, loading, deleteActivity } = useActivities();

  if (loading) return <p>Loading activities...</p>;

  if (activities.length === 0)
    return <p>No activities logged yet.</p>;

  return (
    <ul className="activity-list">
      {activities.map((a) => (
        <li key={a.id} className="activity-item">
          <div>
            <strong>{a.type}</strong> — {a.duration} mins  
            <br />
            <small>{a.date}</small>
            {a.notes && <p>{a.notes}</p>}
          </div>

          <button
            className="delete-btn"
            onClick={() => deleteActivity(a.id)}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}
