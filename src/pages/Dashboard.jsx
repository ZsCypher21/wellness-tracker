import { Link } from "react-router-dom";
import ProgressDashboard from "../components/features/ProgressDashboard";
import WeeklyWellnessChart from "../components/features/WeeklyWellnessChart";
import PageHeader from "../components/layout/PageHeader";

import { useAuth } from "../context/AuthContext";
import { useProfile } from "../context/ProfileContext";
import { useSleep } from "../context/SleepContext";
import { useHydration } from "../context/HydrationContext";
import { useMeditation } from "../context/MeditationContext";
import { useActivities } from "../context/ActivityContext";
import { useAppointments } from "../context/AppointmentContext";

import Loading from "../components/ui/Loading";
import ErrorMessage from "../components/ui/ErrorMessage";
import Icon from "../components/ui/Icon";
import { parseLocalDate } from "../utils/date";
import { MODULES } from "../utils/modules";

function greeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 18) return "Good afternoon";
  return "Good evening";
}

// Sum one field per day for the last 7 days (oldest first)
function buildWeek(sources) {
  const start = new Date();
  start.setHours(0, 0, 0, 0);
  start.setDate(start.getDate() - 6);

  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    const row = {
      day: d.toLocaleDateString("en-AU", { weekday: "short" }),
      label: d.toLocaleDateString("en-AU", { weekday: "long", day: "numeric", month: "short" }),
    };
    for (const [key, list, dateField, valueField] of sources) {
      row[key] = list
        .filter((e) => parseLocalDate(e[dateField])?.toDateString() === d.toDateString())
        .reduce((sum, e) => sum + Number(e[valueField] || 0), 0);
    }
    return row;
  });
}

export default function Dashboard() {
  const { user } = useAuth();
  const { profile, loading: profileLoading, error: profileError } = useProfile();
  const { sleepEntries, weeklySleepHours, loading: l1, error: e1 } = useSleep();
  const { hydrationData, weeklyHydrationLiters, loading: l2, error: e2 } = useHydration();
  const { meditations, weeklyMeditationMinutes, loading: l3, error: e3 } = useMeditation();
  const { activities, weeklyActivityMinutes, loading: l4, error: e4 } = useActivities();
  const { upcoming = [] } = useAppointments() || {};

  const firstLoad = (profileLoading || l1 || l2 || l3 || l4) && !profile;
  if (firstLoad) return <Loading label="Loading your dashboard…" />;

  const anyError = profileError || e1 || e2 || e3 || e4;

  const stats = [
    { key: "activity", value: weeklyActivityMinutes, goal: Number(profile?.activity_goal) || 0 },
    { key: "sleep", value: weeklySleepHours, goal: Number(profile?.sleep_goal) || 0 },
    { key: "hydration", value: weeklyHydrationLiters, goal: Number(profile?.hydration_goal) || 0 },
    { key: "meditation", value: weeklyMeditationMinutes, goal: Number(profile?.meditation_goal) || 0 },
  ];

  const week = buildWeek([
    ["activity", activities, "activity_date", "duration_minutes"],
    ["sleep", sleepEntries, "sleep_date", "hours_slept"],
    ["hydration", hydrationData, "hydration_date", "liters"],
    ["meditation", meditations, "meditation_date", "duration_minutes"],
  ]);

  const series = ["activity", "sleep", "hydration", "meditation"].map((key) => ({
    dataKey: key,
    title: MODULES[key].label,
    unit: MODULES[key].unit,
    color: MODULES[key].color,
  }));

  const next = upcoming[0];
  const firstName = (profile?.name || user?.name || "").split(" ")[0];

  return (
    <div className="page">
      <PageHeader
        title={`${greeting()}${firstName ? `, ${firstName}` : ""}`}
        subtitle={new Date().toLocaleDateString("en-AU", { weekday: "long", day: "numeric", month: "long" }) + " · here’s your week so far"}
        actions={
          <Link className="btn btn--ghost" to="/progress">
            <Icon name="progress" size={18} /> View progress
          </Link>
        }
      />

      {anyError && <ErrorMessage message={anyError} />}

      <ProgressDashboard stats={stats} />

      <div className="dashboard-row">
        <WeeklyWellnessChart data={week} series={series} />

        <section className="card next-appt" aria-label="Next appointment" style={{ "--tile-color": MODULES.appointments.color }}>
          <div className="card__header">
            <h2 className="card__title">Next appointment</h2>
            <span className="tile-icon"><Icon name="appointments" size={18} /></span>
          </div>

          {next ? (
            <>
              <p className="next-appt__date">
                {new Date(next.appointment_datetime).toLocaleDateString("en-AU", { weekday: "long", day: "numeric", month: "long" })}
              </p>
              <p className="next-appt__time">
                <Icon name="clock" size={16} />
                {new Date(next.appointment_datetime).toLocaleTimeString("en-AU", { hour: "numeric", minute: "2-digit" })}
              </p>
              <p className="next-appt__type">{next.appointment_type}</p>
              {next.description && <p className="muted">{next.description}</p>}
              {upcoming.length > 1 && <p className="muted small">+{upcoming.length - 1} more upcoming</p>}
            </>
          ) : (
            <p className="muted">No upcoming appointments.</p>
          )}

          <Link className="link next-appt__link" to="/appointments">
            Manage appointments <Icon name="arrowRight" size={16} />
          </Link>
        </section>
      </div>
    </div>
  );
}
