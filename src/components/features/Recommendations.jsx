import { useActivities } from '../../context/ActivityContext';
import { useSleep } from '../../context/SleepContext';
import { useMeditations } from '../../context/MeditationContext';
import { useHydration } from '../../context/HydrationContext';
import { useAppointments } from '../../context/AppointmentContext';

export default function Recommendations() {
  const { activities } = useActivities();
  const { sleep } = useSleep();
  const { meditations } = useMeditations();
  const { hydration } = useHydration();
  const { appointments } = useAppointments();

  return (
    <div className="progress-card">
      <h3>Personalized Recommendations</h3>

      {sleep.length < 7 && (
        <p>Try to improve your sleep routine — aim for consistent hours.</p>
      )}

      {hydration.length < 7 && (
        <p>Increase your water intake — small, frequent hydration helps.</p>
      )}

      {meditations.length < 7 && (
        <p>Consider adding short meditation sessions to reduce stress.</p>
      )}

      {activities.length < 3 && (
        <p>Boost your activity levels — even light exercise makes a difference.</p>
      )}

      {appointments.length === 0 && (
        <p>No appointments this week — check if any follow-ups are needed.</p>
      )}
    </div>
  );
}
