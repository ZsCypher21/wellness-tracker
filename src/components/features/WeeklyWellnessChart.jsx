/**
 * Weekly overview as four small charts (one per module) instead of one
 * combined chart: hours, minutes and litres have very different scales, so
 * each metric gets its own axis and stays readable.
 */
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

function MiniChart({ title, unit, color, data, dataKey }) {
  const total = Math.round(data.reduce((s, d) => s + d[dataKey], 0) * 10) / 10;
  return (
    <div className="mini-chart">
      <div className="mini-chart__header">
        <span className="goal__label">
          <span className="dot" style={{ background: color }} aria-hidden="true" />
          {title}
        </span>
        <span className="muted small">{total} {unit} total</span>
      </div>
      <ResponsiveContainer width="100%" height={130}>
        <BarChart data={data} margin={{ top: 6, right: 4, left: -22, bottom: 0 }} barCategoryGap="28%">
          <CartesianGrid stroke="var(--border)" strokeDasharray="0" vertical={false} />
          <XAxis dataKey="day" tickLine={false} axisLine={false} tick={{ fill: "var(--text-muted)", fontSize: 11 }} />
          <YAxis tickLine={false} axisLine={false} allowDecimals={false} tickCount={3} width={44} tick={{ fill: "var(--text-muted)", fontSize: 11 }} />
          <Tooltip
            cursor={{ fill: "var(--surface-sunken)" }}
            formatter={(v) => [`${Math.round(v * 10) / 10} ${unit}`, title]}
            labelFormatter={(_, payload) => payload?.[0]?.payload?.label || ""}
            contentStyle={{ borderRadius: 10, border: "1px solid var(--border)", boxShadow: "var(--shadow-md)", fontSize: 13 }}
          />
          <Bar dataKey={dataKey} fill={color} radius={[4, 4, 0, 0]} maxBarSize={26} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default function WeeklyWellnessChart({ data, series }) {
  return (
    <section className="card" aria-label="Last 7 days">
      <div className="card__header">
        <h2 className="card__title">Last 7 days</h2>
        <span className="muted small">Hover a bar for daily detail</span>
      </div>
      <div className="mini-chart-grid">
        {series.map((s) => (
          <MiniChart key={s.dataKey} data={data} {...s} />
        ))}
      </div>
    </section>
  );
}
