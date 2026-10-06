/**
 * Weekly totals for the Progress page (today + previous 6 days).
 */
import { useActivities } from "../../context/ActivityContext";
import { useSleep } from "../../context/SleepContext";
import { useMeditation } from "../../context/MeditationContext";
import { useHydration } from "../../context/HydrationContext";
import { useAppointments } from "../../context/AppointmentContext";
import { formatLiters } from "../../utils/format";
import { isWithinLastWeek, toInputDate } from "../../utils/date";
import { MODULES } from "../../utils/modules";
import Icon from "../ui/Icon";

function Tile({ icon, color, label, value, sub }) {
  return (
    <div className="card summary-tile" style={{ "--tile-color": color }}>
      <span className="tile-icon"><Icon name={icon} size={20} /></span>
      <div>
        <p className="summary-tile__label">{label}</p>
        <p className="summary-tile__value">{value}</p>
        {sub && <p className="muted small">{sub}</p>}
      </div>
    </div>
  );
}

export default function WeeklySummary() {
  const { activities = [], weeklyActivityMinutes = 0 } = useActivities();
  const { sleepEntries = [], weeklySleepHours = 0 } = useSleep();
  const { weeklyMeditationMinutes = 0 } = useMeditation();
  const { weeklyHydrationLiters = 0 } = useHydration();
  const { appointments = [] } = useAppointments();

  const weeklyActivities = activities.filter((a) => isWithinLastWeek(a.activity_date)).length;
  const nights = sleepEntries.filter((s) => isWithinLastWeek(s.sleep_date)).length;
  const weeklyAppointments = appointments.filter(
    (a) => a.appointment_datetime && isWithinLastWeek(toInputDate(new Date(a.appointment_datetime)))
  ).length;

  return (
    <section aria-label="This week's summary">
      <h2 className="section-title">This week</h2>
      <div className="summary-grid">
        <Tile icon="activity" color={MODULES.activity.color} label="Activity"
          value={`${weeklyActivityMinutes} mins`} sub={`${weeklyActivities} ${weeklyActivities === 1 ? "session" : "sessions"}`} />
        <Tile icon="sleep" color={MODULES.sleep.color} label="Sleep"
          value={`${weeklySleepHours.toFixed(1)} hrs`} sub={nights ? `avg ${(weeklySleepHours / nights).toFixed(1)} hrs/night` : "no nights logged"} />
        <Tile icon="hydration" color={MODULES.hydration.color} label="Hydration"
          value={`${formatLiters(weeklyHydrationLiters)} L`} />
        <Tile icon="meditation" color={MODULES.meditation.color} label="Meditation"
          value={`${weeklyMeditationMinutes} mins`} />
        <Tile icon="appointments" color={MODULES.appointments.color} label="Appointments"
          value={weeklyAppointments} sub="in the last 7 days" />
      </div>
    </section>
  );
}
