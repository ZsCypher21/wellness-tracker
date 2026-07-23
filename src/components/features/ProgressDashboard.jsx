import WeeklySummary from "./WeeklySummary";
import { useSleep } from "../../context/SleepContext";
import { useHydration } from "../../context/HydrationContext";
import { useMeditations } from "../../context/MeditationContext";
import { useActivities } from "../../context/ActivityContext";
import { useAppointments } from "../../context/AppointmentContext";

export default function ProgressDashboard() {
  const { sleepData = [] } = useSleep() || {};
  const { hydrationData = [] } = useHydration() || {};
  const { meditations = [] } = useMeditations() || {};
  const { activities = [] } = useActivities() || {};
  const { appointments = [] } = useAppointments() || {};

  const now = new Date();
  const weekAgo = new Date();
  weekAgo.setDate(now.getDate() - 7);

  function isThisWeek(dateStr) {
    const d = new Date(dateStr);
    return d >= weekAgo && d <= now;
  }

  const weeklySleep = sleepData.filter(s => isThisWeek(s.date));
  const weeklyHydration = hydrationData.filter(h => isThisWeek(h.date));
  const weeklyMeditation = meditations.filter(m => isThisWeek(m.date));
  const weeklyActivities = activities.filter(a => isThisWeek(a.date));
  const weeklyAppointments = appointments.filter(a => isThisWeek(a.date));

  const avgSleep =
    weeklySleep.length > 0
      ? (weeklySleep.reduce((sum, s) => sum + Number(s.totalHours), 0) /
          weeklySleep.length).toFixed(1)
      : 0;

  const totalHydration = weeklyHydration.reduce(
    (sum, h) => sum + Number(h.liters),
    0
  );

  const totalMeditation = weeklyMeditation.reduce(
    (sum, m) => sum + Number(m.duration),
    0
  );

  return (
    <div className="dashboard">
      <WeeklySummary />

      <div className="dashboard-grid">
        <div className="dashboard-card">
          <h3>Average Sleep</h3>
          <p>{avgSleep} hrs/night</p>
        </div>

        <div className="dashboard-card">
          <h3>Total Hydration</h3>
          <p>{totalHydration} L this week</p>
        </div>

        <div className="dashboard-card">
          <h3>Meditation Minutes</h3>
          <p>{totalMeditation} mins</p>
        </div>

        <div className="dashboard-card">
          <h3>Activities Logged</h3>
          <p>{weeklyActivities.length} activities</p>
        </div>

        <div className="dashboard-card">
          <h3>Appointments</h3>
          <p>{weeklyAppointments.length} attended</p>
        </div>
      </div>
    </div>
  );
}
