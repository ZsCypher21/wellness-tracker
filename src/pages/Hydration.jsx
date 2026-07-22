import PageContainer from '../components/layout/PageContainer';
import HydrationForm from '../components/features/HydrationForm';
import HydrationList from '../components/features/HydrationList';

export default function Hydration() {
  return (
    <PageContainer title="Hydration">
      <HydrationForm />
      <HydrationList />
    </PageContainer>
  );
}