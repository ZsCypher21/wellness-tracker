import { useActivities } from '../../context/ActivityContext';
import { useMeditations } from '../../context/MeditationContext';

export default function CategoryBreakdown() {
  const { activities } = useActivities();
  const { meditations } = useMeditations();

  const activityTypes = {};
  activities.forEach(a => {
    activityTypes[a.type] = (activityTypes[a.type] || 0) + 1;
  });

  const meditationTypes = {};
  meditations.forEach(m => {
    meditationTypes[m.type] = (meditationTypes[m.type] || 0) + 1;
  });

  return (
    <div className="progress-card">
      <h3>Category Breakdown</h3>

      <h4>Activities</h4>
      {Object.keys(activityTypes).length === 0 && <p>No activities logged.</p>}
      {Object.entries(activityTypes).map(([type, count]) => (
        <p key={type}>{type}: {count}</p>
      ))}

      <h4>Meditation</h4>
      {Object.keys(meditationTypes).length === 0 && <p>No meditation logged.</p>}
      {Object.entries(meditationTypes).map(([type, count]) => (
        <p key={type}>{type}: {count}</p>
      ))}
    </div>
  );
}
