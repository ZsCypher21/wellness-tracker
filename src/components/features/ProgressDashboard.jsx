/**
 * Weekly progress overview combining all wellness categories.
 *
 * Notes:
 * - This is the most data-heavy UI component.
 * - Pulls from 5 contexts: Sleep, Hydration, Meditation,
 *   Activities, Appointments.
 * - Uses a shared "isThisWeek" filter to compute weekly metrics.
 *
 * Responsibilities:
 * - Filter each dataset to only include entries from the past 7 days.
 * - Compute summary metrics (avg sleep, total hydration, etc.).
 * - Render a grid of metric cards + the WeeklySummary component.
 */

import WeeklySummary from "./WeeklySummary";
import { useSleep } from "../../context/SleepContext";
import { useHydration } from "../../context/HydrationContext";
import { useMeditation } from "../../context/MeditationContext";
import { useActivities } from "../../context/ActivityContext";
import { useAppointments } from "../../context/AppointmentContext";

export default function ProgressDashboard() {
  // Safe defaults prevent crashes during initial render
  const { sleepData = [] } = useSleep() || {};
  const { hydrationData = [] } = useHydration() || {};
  const { meditations = [] } = useMeditation() || {};
  const { activities = [] } = useActivities() || {};
  const { appointments = [] } = useAppointments() || {};

  // Determine the 7‑day window
  const now = new Date();
  const weekAgo = new Date();
  weekAgo.setDate(now.getDate() - 7);

  /**
   * Check if a given date falls within the last 7 days.
   * Used across all datasets for consistent weekly filtering.
   */
  function isThisWeek(dateStr) {
    const d = new Date(dateStr);
    return d >= weekAgo && d <= now;
  }

  // Weekly filtered datasets
  const weeklySleep = sleepData.filter(s => isThisWeek(s.date));
  const weeklyHydration = hydrationData.filter(h => isThisWeek(h.date));
  const weeklyMeditation = meditations.filter(m => isThisWeek(m.date));
  const weeklyActivities = activities.filter(a => isThisWeek(a.date));
  const weeklyAppointments = appointments.filter(a => isThisWeek(a.date));

  /**
   * Weekly metrics
   * ---------------------------------------------------------
   * Each metric uses simple aggregation:
   * - Sleep: average hours/night
   * - Hydration: total liters
   * - Meditation: total minutes
   * - Activities: count
   * - Appointments: count
   */

  const avgSleep =
    weeklySleep.length > 0
      ? (
          weeklySleep.reduce((sum, s) => sum + Number(s.totalHours), 0) /
          weeklySleep.length
        ).toFixed(1)
      : 0;

  const totalHydration = weeklyHydration.reduce(
    (sum, h) => sum + Number(h.liters),
    0
  );

  const totalMeditation = weeklyMeditation.reduce(
    (sum, m) => sum + Number(m.duration),
    0
  );

  return (
    <div className="dashboard-content">
      {/* High-level weekly summary card */}
      <WeeklySummary />

      {/* Grid of metric cards */}
      <div className="dashboard-grid">

        <div className="dashboard-card metric-sleep">
          <h3>Average Sleep</h3>
          <p>{avgSleep} hrs/night</p>
        </div>

        <div className="dashboard-card metric-hydration">
          <h3>Total Hydration</h3>
          <p>{totalHydration} L this week</p>
        </div>

        <div className="dashboard-card metric-meditation">
          <h3>Meditation Minutes</h3>
          <p>{totalMeditation} mins</p>
        </div>

        <div className="dashboard-card metric-activities">
          <h3>Activities Logged</h3>
          <p>{weeklyActivities.length} activities</p>
        </div>

        <div className="dashboard-card metric-appointments">
          <h3>Appointments</h3>
          <p>{weeklyAppointments.length} attended</p>
        </div>

      </div>
    </div>
  );
}
