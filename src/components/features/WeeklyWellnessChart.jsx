import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer
} from "recharts";

export default function WeeklyWellnessChart({ data }) {
  return (
    <div className="chart-card themed-chart">
      <h3>Weekly Wellness Overview</h3>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
          
          {/* Soft grid lines matching your grey palette */}
          <CartesianGrid stroke="#D4D4D4" strokeDasharray="3 3" />

          {/* Axis labels matching your text-dark */}
          <XAxis
            dataKey="day"
            stroke="var(--text-dark)"
            tick={{ fill: "var(--text-dark)", fontSize: 12 }}
          />

          <YAxis
            stroke="var(--text-dark)"
            tick={{ fill: "var(--text-dark)", fontSize: 12 }}
          />

          {/* Tooltip styled like your cards */}
          <Tooltip
            contentStyle={{
              backgroundColor: "var(--bg-card)",
              border: "1px solid var(--grey-medium)",
              borderRadius: "var(--radius)",
              color: "var(--text-dark)",
              boxShadow: "0 3px 10px rgba(0,0,0,0.12)"
            }}
            itemStyle={{ color: "var(--text-dark)" }}
            labelStyle={{ color: "var(--accent)" }}
          />

          {/* Legend styled to match your text */}
          <Legend wrapperStyle={{ color: "var(--text-dark)", paddingTop: "10px" }} />

          {/* Bars themed to your palette */}
          <Bar dataKey="sleep" fill="#FF8A00" name="Sleep (hrs)" />        {/* Accent */}
          <Bar dataKey="meditation" fill="#68a541" name="Meditation (min)" /> /* Text-light */
          <Bar dataKey="activity" fill="#372d5e" name="Activity (min)" />     /* Grey-medium */
          <Bar dataKey="hydration" fill="#2A2A2A" name="Hydration (L)" />     /* Text-dark */
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
