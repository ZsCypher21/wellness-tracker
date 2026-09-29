/**
 * Simple rule‑based recommendation engine for the Progress page.
 *
 * Notes:
 * - This component does not compute metrics; it only checks
 *   dataset lengths and displays helpful nudges.
 * - Each recommendation is intentionally lightweight and easy
 *   to expand later (e.g., adding thresholds or more categories).
 *
 * Responsibilities:
 * - Retrieve all wellness datasets from their contexts.
 * - Display personalized suggestions based on weekly activity levels.
 * - Provide gentle guidance without enforcing strict goals.
 */

import { useActivities } from '../../context/ActivityContext';
import { useSleep } from '../../context/SleepContext';
import { useMeditation } from "../../context/MeditationContext";
import { useHydration } from '../../context/HydrationContext';
import { useAppointments } from '../../context/AppointmentContext';

export default function Recommendations() {
  // Safe defaults ensure the component never crashes on initial render
  const { activities = [] } = useActivities();
  const { sleepData = [] } = useSleep();
  const { meditations = [] } = useMeditation();
  const { hydrationData = [] } = useHydration();
  const { appointments = [] } = useAppointments();

  return (
    <div className="progress-card">
      <h3>Personalized Recommendations</h3>

      {/* Sleep: fewer than 7 entries suggests inconsistency */}
      {sleepData.length < 7 && (
        <p>Try to improve your sleep routine — aim for consistent hours.</p>
      )}

      {/* Hydration: fewer than 7 entries suggests low intake tracking */}
      {hydrationData.length < 7 && (
        <p>Increase your water intake — small, frequent hydration helps.</p>
      )}

      {/* Meditation: fewer than 7 entries suggests low mindfulness activity */}
      {meditations.length < 7 && (
        <p>Consider adding short meditation sessions to reduce stress.</p>
      )}

      {/* Activities: fewer than 3 entries suggests low physical movement */}
      {activities.length < 3 && (
        <p>Boost your activity levels — even light exercise makes a difference.</p>
      )}

      {/* Appointments: none logged this week */}
      {appointments.length === 0 && (
        <p>No appointments this week — check if any follow-ups are needed.</p>
      )}
    </div>
  );
}
