/**
 * Displays a summary of activity + meditation categories.
 *
 * Notes:
 * - Unique compared to other progress components because it
 *   *aggregates* data instead of filtering by date.
 * - Uses simple object maps to count occurrences of each category.
 * - Safe defaults (`activities = []`, `meditations = []`) prevent
 *   crashes during initial render or StrictMode double-mount.
 *
 * Responsibilities:
 * - Retrieve activities + meditations from their contexts.
 * - Count how many entries exist per category.
 * - Display a readable breakdown for the Progress dashboard.
 */

import { useActivities } from '../../context/ActivityContext';
import { useMeditation } from '../../context/MeditationContext';

export default function CategoryBreakdown() {
  // Safe defaults ensure .forEach never runs on undefined
  const { activities = [] } = useActivities();
  const { meditations = [] } = useMeditation();

  /**
   * Count activity categories.
   * Example output:
   *   { Running: 3, Yoga: 1, Cycling: 2 }
   */
  const activityTypes = {};
  activities.forEach(a => {
    activityTypes[a.type] = (activityTypes[a.type] || 0) + 1;
  });

  /**
   * Count meditation categories.
   * Example output:
   *   { Mindfulness: 4, Breathing: 2 }
   */
  const meditationTypes = {};
  meditations.forEach(m => {
    meditationTypes[m.type] = (meditationTypes[m.type] || 0) + 1;
  });

  return (
    <div className="progress-card">
      <h3>Category Breakdown</h3>

      {/* Activity categories */}
      <h4>Activities</h4>
      {Object.keys(activityTypes).length === 0 && <p>No activities logged.</p>}
      {Object.entries(activityTypes).map(([type, count]) => (
        <p key={type}>{type}: {count}</p>
      ))}

      {/* Meditation categories */}
      <h4>Meditation</h4>
      {Object.keys(meditationTypes).length === 0 && <p>No meditation logged.</p>}
      {Object.entries(meditationTypes).map(([type, count]) => (
        <p key={type}>{type}: {count}</p>
      ))}
    </div>
  );
}
