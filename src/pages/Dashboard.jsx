import ProgressDashboard from "../components/features/ProgressDashboard";

import { useProfile } from "../context/ProfileContext";
import { useSleep } from "../context/SleepContext";
import { useHydration } from "../context/HydrationContext";
import { useMeditation } from "../context/MeditationContext";
import { useActivities } from "../context/ActivityContext";

import ProgressBar from "../components/ui/ProgressBar";
import WeeklyWellnessChart from "../components/features/WeeklyWellnessChart";

export default function Dashboard() {
  const { profile } = useProfile();

  const { sleepEntries, weeklySleepHours } = useSleep();
  const { hydrationData, weeklyHydrationLiters } = useHydration();
  const { meditations, weeklyMeditationMinutes } = useMeditation();
  const { activities, weeklyActivityMinutes } = useActivities();

  // ⭐ Build combined weekly chart data
  function buildWeeklyWellnessData() {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);

    const days = [];

    for (let i = 0; i < 7; i++) {
      const d = new Date(sevenDaysAgo);
      d.setDate(sevenDaysAgo.getDate() + i);

      const dayLabel = d.toLocaleDateString("en-AU", { weekday: "short" });

      const sleep = sleepEntries
        .filter(e => new Date(e.sleep_date).toDateString() === d.toDateString())
        .reduce((sum, e) => sum + Number(e.hours_slept || 0), 0);

      const meditation = meditations
        .filter(e => new Date(e.meditation_date).toDateString() === d.toDateString())
        .reduce((sum, e) => sum + Number(e.duration_minutes || 0), 0);

      const activity = activities
        .filter(e => new Date(e.activity_date).toDateString() === d.toDateString())
        .reduce((sum, e) => sum + Number(e.duration_minutes || 0), 0);

      const hydration = hydrationData
        .filter(e => new Date(e.hydration_date).toDateString() === d.toDateString())
        .reduce((sum, e) => sum + Number(e.liters || 0), 0);

      days.push({
        day: dayLabel,
        sleep,
        meditation,
        activity,
        hydration
      });
    }

    return days;
  }

  const weeklyWellnessData = buildWeeklyWellnessData();

  return (
    <div className="dashboard-page">
      <h2 className="dashboard-title">Dashboard</h2>

     <div className="dashboard-grid">

  <ProgressDashboard />

  <div className="dashboard-row">
    <WeeklyWellnessChart data={weeklyWellnessData} />

    {profile && (
      <div className="progress-card">
        <h3>Weekly Goals Progress</h3>

        <ProgressBar
          label="Sleep"
          value={weeklySleepHours}
          target={profile.sleep_goal}
        />

        <ProgressBar
          label="Hydration"
          value={weeklyHydrationLiters}
          target={profile.hydration_goal}
        />

        <ProgressBar
          label="Meditation"
          value={weeklyMeditationMinutes}
          target={profile.meditation_goal}
        />

        <ProgressBar
          label="Activity"
          value={weeklyActivityMinutes}
          target={profile.activity_goal}
        />
      </div>
    )}
  </div>

</div>

    </div>
  );
}
