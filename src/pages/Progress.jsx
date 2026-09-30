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
 * Architecture:
 * - Wrapped inside PageContainer to ensure consistent layout,
 *   spacing, and page title styling across the app.
 */

import PageContainer from '../components/layout/PageContainer';
import WeeklySummary from '../components/features/WeeklySummary';
import CategoryBreakdown from '../components/features/CategoryBreakdown';
import Recommendations from '../components/features/Recommendations';

export default function Progress() {
  return (
    <PageContainer title="Progress">
      {/* Weekly totals and key metrics */}
      <WeeklySummary />

      {/* Breakdown of activities by category */}
      <CategoryBreakdown />

      {/* Personalized suggestions based on user data */}
      <Recommendations />
    </PageContainer>
  );
}
