/**
 * Dashboard stat cards: this week's total for each module, with progress
 * towards the weekly goal set on the Profile page. Each card links to its
 * module page.
 */
import { Link } from "react-router-dom";
import Icon from "../ui/Icon";
import { MODULES, round1 } from "../../utils/modules";

export default function ProgressDashboard({ stats }) {
  return (
    <div className="stat-grid">
      {stats.map(({ key, value, goal }) => {
        const m = MODULES[key];
        const pct = goal > 0 ? Math.min(Math.round((value / goal) * 100), 100) : null;
        return (
          <Link key={key} to={m.path} className="card stat-card" style={{ "--tile-color": m.color }}>
            <div className="stat-card__top">
              <span className="tile-icon"><Icon name={m.icon} size={20} /></span>
              <span className="stat-card__label">{m.label}</span>
            </div>
            <p className="stat">
              {round1(value)}
              <span className="stat__unit">{m.unit}</span>
            </p>
            <div className="goal__track goal__track--thin" aria-hidden="true">
              <div className="goal__fill" style={{ width: `${pct || 0}%`, background: m.color }} />
            </div>
            <p className="muted small">
              {pct === null ? "No weekly goal set" : `${pct}% of ${round1(goal)} ${m.unit} goal`}
            </p>
          </Link>
        );
      })}
    </div>
  );
}
