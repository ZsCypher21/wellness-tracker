/**
 * Breakdown of all logged activities by type, as horizontal bars
 * (total minutes), with session counts.
 */
import { useActivities } from "../../context/ActivityContext";
import { MODULES } from "../../utils/modules";

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
  const max = rows.length ? rows[0][1].minutes : 0;

  return (
    <section className="card">
      <div className="card__header">
        <h2 className="card__title">Activity breakdown</h2>
        <span className="muted small">All time, by minutes</span>
      </div>

      {rows.length === 0 && <p className="muted">No activities logged.</p>}

      <ul className="bar-list">
        {rows.map(([type, { count, minutes }]) => (
          <li key={type} className="bar-list__row">
            <div className="bar-list__label">
              <span>{type}</span>
              <span className="muted small">
                {minutes} mins · {count} {count === 1 ? "session" : "sessions"}
              </span>
            </div>
            <div className="goal__track" aria-hidden="true">
              <div className="goal__fill" style={{ width: `${max ? (minutes / max) * 100 : 0}%`, background: MODULES.activity.color }} />
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
