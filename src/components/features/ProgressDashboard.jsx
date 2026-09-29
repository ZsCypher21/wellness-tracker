/**
 * Central analytics component for the Wellness Tracker.
 *
 * Responsibilities:
 * - Fetch recent data from all wellness contexts.
 * - Compute high-level metrics (averages, totals, streaks).
 * - Display dashboard cards in a responsive grid.
 */

import { useActivities } from "../../context/ActivityContext";
import { useSleep } from "../../context/SleepContext";
import { useHydration } from "../../context/HydrationContext";
import { useMeditation } from "../../context/MeditationContext";
import { useAppointments } from "../../context/AppointmentContext";

export default function ProgressDashboard() {
  const { activities } = useActivities();
  const { sleepData } = useSleep();
  const { hydrationData } = useHydration();
  const { meditationData } = useMeditation();
  const { upcoming } = useAppointments();

  // ----- Activities -----
  const totalActivityMinutes = activities.reduce(
    (sum, a) => sum + (a.duration_minutes || 0),
    0
  );

  // ----- Sleep -----
  const avgSleep =
    sleepData.length > 0
      ? (
          sleepData.reduce((sum, s) => sum + (s.hours_slept || 0), 0) /
          sleepData.length
        ).toFixed(1)
      : 0;

  // ----- Hydration -----
  const totalHydration = hydrationData.reduce(
    (sum, h) => sum + (h.liters || 0),
    0
  );

  // ----- Meditation -----
  const totalMeditationMinutes = meditationData.reduce(
    (sum, m) => sum + (m.duration_minutes || 0),
    0
  );

  // ----- Appointments -----
  const nextAppointment = upcoming.length > 0 ? upcoming[0] : null;

  return (
    <>
      {/* Activity Summary */}
      <div className="dashboard-card">
        <h3>Activity</h3>
        <p>{totalActivityMinutes} mins logged</p>
      </div>

      {/* Sleep Summary */}
      <div className="dashboard-card">
        <h3>Sleep</h3>
        <p>Avg {avgSleep} hrs/night</p>
      </div>

      {/* Hydration Summary */}
      <div className="dashboard-card">
        <h3>Hydration</h3>
        <p>{totalHydration} L consumed</p>
      </div>

      {/* Meditation Summary */}
      <div className="dashboard-card">
        <h3>Meditation</h3>
        <p>{totalMeditationMinutes} mins total</p>
      </div>

      {/* Upcoming Appointment */}
      <div className="dashboard-card">
        <h3>Next Appointment</h3>
        {nextAppointment ? (
          <>
            <strong>{nextAppointment.appointment_type}</strong>
            <br />
            {nextAppointment.description && (
              <small>{nextAppointment.description}</small>
            )}
            <br />
            <small>
              {new Date(nextAppointment.appointment_datetime).toLocaleString()}
            </small>
          </>
        ) : (
          <p>No upcoming appointments</p>
        )}
      </div>
    </>
  );
}
