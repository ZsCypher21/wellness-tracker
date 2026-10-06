/**
 * Main Progress page for the Wellness Tracker.
 *
 * Responsibilities:
 * - Display a high‑level overview of the user's weekly wellbeing.
 * - Combine multiple analytics components into a single dashboard:
 *      • WeeklySummary      → Aggregated weekly totals
 *      • CategoryBreakdown  → Distribution of activities
 *      • Recommendations     → Smart suggestions based on patterns
 *
 * Now includes:
 * - Loading state
 * - Error state
 * - Empty state when no data exists
 */

import { useSleep } from "../context/SleepContext";
import { useHydration } from "../context/HydrationContext";
import { useMeditation } from "../context/MeditationContext";
import { useActivities } from "../context/ActivityContext";

import PageContainer from "../components/layout/PageContainer";
import WeeklySummary from "../components/features/WeeklySummary";
import CategoryBreakdown from "../components/features/CategoryBreakdown";
import Recommendations from "../components/features/Recommendations";

import Loading from "../components/ui/Loading";
import ErrorMessage from "../components/ui/ErrorMessage";
import EmptyState from "../components/ui/EmptyState";

export default function Progress() {
  // Pull data + loading + error from all contexts
  const { sleepEntries, loading: sleepLoading, error: sleepError } = useSleep();
  const { hydrationData, loading: hydrationLoading, error: hydrationError } = useHydration();
  const { meditations, loading: meditationLoading, error: meditationError } = useMeditation();
  const { activities, loading: activityLoading, error: activityError } = useActivities();

  // Combined loading
  const loading =
    sleepLoading || hydrationLoading || meditationLoading || activityLoading;

  // Combined error
  const error =
    sleepError || hydrationError || meditationError || activityError;

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} />;

  // Empty state: no wellness data at all
  const noData =
    sleepEntries.length === 0 &&
    hydrationData.length === 0 &&
    meditations.length === 0 &&
    activities.length === 0;

  if (noData) {
    return (
      <PageContainer title="Progress" subtitle="Your weekly summary and personalised recommendations." icon="progress">
        <EmptyState title="No wellness data yet" text="Log an activity, sleep, water or meditation entry to see your progress." />
      </PageContainer>
    );
  }

  return (
    <PageContainer title="Progress" subtitle="Your weekly summary and personalised recommendations." icon="progress">
      {/* Weekly totals and key metrics */}
      <WeeklySummary />

      <div className="two-col">
        {/* Breakdown of activities by category */}
        <CategoryBreakdown />

        {/* Personalized suggestions based on user data */}
        <Recommendations />
      </div>
    </PageContainer>
  );
}
