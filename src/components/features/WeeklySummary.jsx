import { useActivities } from '../../context/ActivityContext';
import { useSleep } from '../../context/SleepContext';
import { useMeditations } from '../../context/MeditationContext';
import { useHydration } from '../../context/HydrationContext';
import { useAppointments } from '../../context/AppointmentContext';

export default function WeeklySummary() {
  const { activities } = useActivities();
  const { sleep } = useSleep();
  const { meditations } = useMeditations();
  const { hydration } = useHydration();
  const { appointments } = useAppointments();

  const now = new Date();
  const weekAgo = new Date();
  weekAgo.setDate(now.getDate() - 7);

  function isThisWeek(dateStr) {
    const d = new Date(dateStr);
    return d >= weekAgo && d <= now;
  }

  const weeklyActivities = activities.filter(a => isThisWeek(a.date));
  const weeklySleep = sleep.filter(s => isThisWeek(s.date));
  const weeklyMeditation = meditations.filter(m => isThisWeek(m.date));
  const weeklyHydration = hydration.filter(h => isThisWeek(h.date));
  const weeklyAppointments = appointments.filter(a => isThisWeek(a.date));

  const totalSleepHours = weeklySleep.reduce((sum, s) => sum + Number(s.totalHours), 0);
  const totalMeditationMinutes = weeklyMeditation.reduce((sum, m) => sum + Number(m.duration), 0);
  const totalHydrationLiters = weeklyHydration.reduce((sum, h) => sum + Number(h.liters), 0);

  return (
    <div className="progress-card">
      <h3>This Week’s Summary</h3>

      <p><strong>Activities logged:</strong> {weeklyActivities.length}</p>
      <p><strong>Total sleep:</strong> {totalSleepHours.toFixed(1)} hrs</p>
      <p><strong>Meditation:</strong> {totalMeditationMinutes} mins</p>
      <p><strong>Hydration:</strong> {totalHydrationLiters} L</p>
      <p><strong>Appointments:</strong> {weeklyAppointments.length}</p>
    </div>
  );
}
