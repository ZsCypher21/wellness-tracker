/**
 * Weekly totals for the Progress page (today + previous 6 days).
 * Uses the real API field names (activity_date, hours_slept, liters, ...).
 */
import { useActivities } from "../../context/ActivityContext";
import { useSleep } from "../../context/SleepContext";
import { useMeditation } from "../../context/MeditationContext";
import { useHydration } from "../../context/HydrationContext";
import { useAppointments } from "../../context/AppointmentContext";
import { formatLiters } from "../../utils/format";
import { isWithinLastWeek, toInputDate } from "../../utils/date";

export default function WeeklySummary() {
  const { activities = [] } = useActivities();
  const { sleepEntries = [], weeklySleepHours = 0 } = useSleep();
  const { weeklyMeditationMinutes = 0 } = useMeditation();
  const { weeklyHydrationLiters = 0 } = useHydration();
  const { appointments = [] } = useAppointments();

  const weeklyActivities = activities.filter((a) => isWithinLastWeek(a.activity_date));
  const weeklySleepNights = sleepEntries.filter((s) => isWithinLastWeek(s.sleep_date)).length;
  const weeklyAppointments = appointments.filter((a) =>
    a.appointment_datetime && isWithinLastWeek(toInputDate(new Date(a.appointment_datetime)))
  );

  return (
    <div className="progress-card">
      <h3>This Week’s Summary</h3>

      <p><strong>Activities logged:</strong> {weeklyActivities.length}</p>
      <p>
        <strong>Total sleep:</strong> {weeklySleepHours.toFixed(1)} hrs
        {weeklySleepNights > 0 && ` (avg ${(weeklySleepHours / weeklySleepNights).toFixed(1)} hrs/night)`}
      </p>
      <p><strong>Meditation:</strong> {weeklyMeditationMinutes} mins</p>
      <p><strong>Hydration:</strong> {formatLiters(weeklyHydrationLiters)} L</p>
      <p><strong>Appointments:</strong> {weeklyAppointments.length}</p>
    </div>
  );
}
