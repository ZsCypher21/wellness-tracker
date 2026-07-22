import PageContainer from '../components/layout/PageContainer';
import WeeklySummary from '../components/features/WeeklySummary';
import CategoryBreakdown from '../components/features/CategoryBreakdown';
import Recommendations from '../components/features/Recommendations';

export default function Progress() {
  return (
    <PageContainer title="Progress">
      <WeeklySummary />
      <CategoryBreakdown />
      <Recommendations />
    </PageContainer>
  );
}
