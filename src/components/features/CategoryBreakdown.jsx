/**
 * Breakdown of logged activities by type (count + total minutes).
 */
import { useActivities } from "../../context/ActivityContext";

export default function CategoryBreakdown() {
  const { activities = [] } = useActivities();

  const byType = {};
  activities.forEach((a) => {
    // normalise "running" / "Running " into one category
    const raw = (a.activity_type || "Other").trim();
    const key = raw.charAt(0).toUpperCase() + raw.slice(1).toLowerCase();
    if (!byType[key]) byType[key] = { count: 0, minutes: 0 };
    byType[key].count += 1;
    byType[key].minutes += Number(a.duration_minutes || 0);
  });

  const rows = Object.entries(byType).sort((a, b) => b[1].minutes - a[1].minutes);

  return (
    <div className="progress-card">
      <h3>Category Breakdown</h3>

      <h4>Activities</h4>
      {rows.length === 0 && <p>No activities logged.</p>}
      {rows.map(([type, { count, minutes }]) => (
        <p key={type}>
          {type}: {count} {count === 1 ? "session" : "sessions"}, {minutes} mins
        </p>
      ))}
    </div>
  );
}
