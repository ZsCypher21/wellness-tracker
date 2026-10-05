// avoid showing floating-point noise like 2.3000000000000003
const round = (n) => Math.round(Number(n || 0) * 10) / 10;

export default function ProgressBar({ label, value = 0, target = 0 }) {
  const percentage =
    target > 0 ? Math.min((value / target) * 100, 100) : 0;

  let color = "var(--color-danger)";
  if (percentage >= 80) color = "var(--color-success)";
  else if (percentage >= 40) color = "var(--color-warning)";

  return (
    <div className="progress-bar-wrapper">
      <div className="progress-bar-header">
        <span className="progress-label">{label}</span>
        <span className="progress-value">{round(value)} / {round(target)}</span>
      </div>

      <div
        className="progress-bar-container"
        title={`${round(value)} / ${round(target)}`}
      >
        <div
          className="progress-bar-fill"
          style={{
            width: `${percentage}%`,
            backgroundColor: color,
          }}
        ></div>
      </div>
    </div>
  );
}
