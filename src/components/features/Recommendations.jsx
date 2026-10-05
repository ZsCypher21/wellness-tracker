/**
 * Simple rule-based recommendations for the Progress page.
 * Compares this week's totals with the goals set on the Profile page
 * (falls back to sensible defaults when no goal is set).
 */
import { useSleep } from "../../context/SleepContext";
import { useMeditation } from "../../context/MeditationContext";
import { useHydration } from "../../context/HydrationContext";
import { useActivities } from "../../context/ActivityContext";
import { useAppointments } from "../../context/AppointmentContext";
import { useProfile } from "../../context/ProfileContext";

export default function Recommendations() {
  const { weeklySleepHours = 0 } = useSleep();
  const { weeklyMeditationMinutes = 0 } = useMeditation();
  const { weeklyHydrationLiters = 0 } = useHydration();
  const { weeklyActivityMinutes = 0 } = useActivities();
  const { upcoming = [] } = useAppointments();
  const { profile } = useProfile();

  // weekly targets: profile goal if set, otherwise a general guideline
  const goals = {
    sleep: profile?.sleep_goal || 49, // 7 hrs x 7 nights
    hydration: profile?.hydration_goal || 14, // 2 L x 7 days
    meditation: profile?.meditation_goal || 70, // 10 mins x 7 days
    activity: profile?.activity_goal || 150, // WHO weekly guideline
  };

  const tips = [];
  if (weeklySleepHours < goals.sleep) {
    tips.push("Try to improve your sleep routine — aim for consistent hours each night.");
  }
  if (weeklyHydrationLiters < goals.hydration) {
    tips.push("Increase your water intake — small, frequent drinks help.");
  }
  if (weeklyMeditationMinutes < goals.meditation) {
    tips.push("Consider adding short meditation sessions to reduce stress.");
  }
  if (weeklyActivityMinutes < goals.activity) {
    tips.push("Boost your activity levels — even light exercise makes a difference.");
  }
  if (upcoming.length === 0) {
    tips.push("No upcoming appointments — check if any check-ups or follow-ups are due.");
  }

  return (
    <div className="progress-card">
      <h3>Personalized Recommendations</h3>
      {tips.length === 0 ? (
        <p>Great work — you're meeting all your weekly goals!</p>
      ) : (
        tips.map((tip) => <p key={tip}>{tip}</p>)
      )}
    </div>
  );
}
