// avoid showing floating-point noise like 2.3000000000000003
const round = (n) => Math.round(Number(n || 0) * 10) / 10;

/**
 * Goal progress bar. The bar uses the module colour; reaching the goal adds
 * a "Goal met" label so the state isn't shown by colour alone.
 */
export default function ProgressBar({ label, value = 0, target = 0, unit = "", color = "var(--brand)" }) {
  const percentage = target > 0 ? Math.min((value / target) * 100, 100) : 0;
  const met = target > 0 && value >= target;

  return (
    <div className="goal">
      <div className="goal__header">
        <span className="goal__label">
          <span className="dot" style={{ background: color }} aria-hidden="true" />
          {label}
        </span>
        <span className="goal__value">
          <strong>{round(value)}</strong> / {target > 0 ? `${round(target)} ${unit}` : "no goal set"}
          {met && <span className="badge badge--success">Goal met</span>}
        </span>
      </div>

      <div
        className="goal__track"
        role="progressbar"
        aria-label={label}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(percentage)}
        title={`${Math.round(percentage)}% of weekly goal`}
      >
        <div className="goal__fill" style={{ width: `${percentage}%`, background: color }} />
      </div>
    </div>
  );
}
