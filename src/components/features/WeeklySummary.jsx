/**
 * Compact weekly overview used inside the Progress Dashboard.
 *
 * Notes:
 * - Pulls from all 5 wellness contexts.
 * - Uses the same 7‑day filtering logic as ProgressDashboard.
 * - Displays only totals (not averages or detailed metrics).
 *
 * Responsibilities:
 * - Filter each dataset to include only entries from the past 7 days.
 * - Compute weekly totals for sleep, meditation, hydration, activities,
 *   and appointments.
 * - Render a simple summary card for quick weekly insight.
 */

import { useActivities } from '../../context/ActivityContext';
import { useSleep } from '../../context/SleepContext';
import { useMeditation } from "../../context/MeditationContext";
import { useHydration } from '../../context/HydrationContext';
import { useAppointments } from '../../context/AppointmentContext';

export default function WeeklySummary() {
  // Safe defaults prevent crashes during initial render
  const { activities = [] } = useActivities();
  const { sleepData = [] } = useSleep();
  const { meditations = [] } = useMeditation();
  const { hydrationData = [] } = useHydration();
  const { appointments = [] } = useAppointments();

  // Determine the 7‑day window
  const now = new Date();
  const weekAgo = new Date();
  weekAgo.setDate(now.getDate() - 7);

  /**
   * Check if a given date falls within the last 7 days.
   * Shared logic across all datasets.
   */
  function isThisWeek(dateStr) {
    const d = new Date(dateStr);
    return d >= weekAgo && d <= now;
  }

  // Weekly filtered datasets
  const weeklyActivities = activities.filter(a => isThisWeek(a.date));
  const weeklySleep = sleepData.filter(s => isThisWeek(s.date));
  const weeklyMeditation = meditations.filter(m => isThisWeek(m.date));
  const weeklyHydration = hydrationData.filter(h => isThisWeek(h.date));
  const weeklyAppointments = appointments.filter(a => isThisWeek(a.date));

  /**
   * Weekly totals
   * ---------------------------------------------------------
   * - Sleep: total hours
   * - Meditation: total minutes
   * - Hydration: total liters
   * - Activities: count
   * - Appointments: count
   */
  const totalSleepHours = weeklySleep.reduce(
    (sum, s) => sum + Number(s.totalHours),
    0
  );

  const totalMeditationMinutes = weeklyMeditation.reduce(
    (sum, m) => sum + Number(m.duration),
    0
  );

  const totalHydrationLiters = weeklyHydration.reduce(
    (sum, h) => sum + Number(h.liters),
    0
  );

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
