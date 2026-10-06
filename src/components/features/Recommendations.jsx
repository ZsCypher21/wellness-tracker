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
import { MODULES } from "../../utils/modules";
import Icon from "../ui/Icon";

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

  const checks = [
    { key: "sleep", ok: weeklySleepHours >= goals.sleep,
      tip: "Try to improve your sleep routine — aim for consistent hours each night.",
      done: "You're meeting your sleep goal." },
    { key: "hydration", ok: weeklyHydrationLiters >= goals.hydration,
      tip: "Increase your water intake — small, frequent drinks help.",
      done: "You're drinking enough water this week." },
    { key: "meditation", ok: weeklyMeditationMinutes >= goals.meditation,
      tip: "Consider adding short meditation sessions to reduce stress.",
      done: "Great mindfulness habit this week." },
    { key: "activity", ok: weeklyActivityMinutes >= goals.activity,
      tip: "Boost your activity levels — even light exercise makes a difference.",
      done: "You've hit your activity goal." },
    { key: "appointments", ok: upcoming.length > 0,
      tip: "No upcoming appointments — check if any check-ups or follow-ups are due.",
      done: `You have ${upcoming.length} upcoming ${upcoming.length === 1 ? "appointment" : "appointments"}.` },
  ];

  return (
    <section className="card">
      <div className="card__header">
        <h2 className="card__title">Recommendations</h2>
        <span className="muted small">Based on your weekly goals</span>
      </div>
      <ul className="reco-list">
        {checks.map((c) => (
          <li key={c.key} className="reco" style={{ "--tile-color": MODULES[c.key].color }}>
            <span className={`reco__status ${c.ok ? "reco__status--ok" : ""}`} aria-label={c.ok ? "On track" : "Needs attention"}>
              <Icon name={c.ok ? "check" : MODULES[c.key].icon} size={16} />
            </span>
            <span>{c.ok ? c.done : c.tip}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
