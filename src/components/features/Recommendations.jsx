import { useActivities } from '../../context/ActivityContext';
import { useSleep } from '../../context/SleepContext';
import { useMeditations } from '../../context/MeditationContext';
import { useHydration } from '../../context/HydrationContext';

export default function Recommendations() {
  const { activities } = useActivities();
  const { sleepData } = useSleep();
  const { meditations } = useMeditations();
  const { hydrationData } = useHydration();

  const recs = [];

  // Activity balance
  if (activities.length > 0 && meditations.length === 0) {
    recs.push("Try adding a short meditation session to balance your wellbeing.");
  }

  if (meditations.length > 0 && activities.length === 0) {
    recs.push("Consider adding light physical activity this week.");
  }

  // Sleep
  const avgSleep = sleepData.length
    ? sleepData.reduce((sum, s) => sum + Number(s.totalHours), 0) / sleepData.length
    : 0;

  if (avgSleep < 7) {
    recs.push("Your sleep average is low — aim for at least 7 hours tonight.");
  }

  // Hydration
  const avgHydration = hydrationData.length
    ? hydrationData.reduce((sum, h) => sum + Number(h.liters), 0) / hydrationData.length
    : 0;

  if (avgHydration < 2) {
    recs.push("Hydration is low — try drinking an extra glass of water today.");
  }

  if (recs.length === 0) {
    recs.push("You're doing great! Keep maintaining your wellbeing habits.");
  }

  return (
    <div className="progress-card">
      <h3>Recommendations</h3>
      {recs.map((r, i) => (
        <p key={i}>• {r}</p>
      ))}
    </div>
  );
}
