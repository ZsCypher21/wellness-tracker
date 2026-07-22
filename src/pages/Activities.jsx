import PageContainer from '../components/layout/PageContainer';
import ActivityForm from '../components/features/ActivityForm';
import ActivityList from '../components/features/ActivityList';

export default function Activities() {
  return (
    <PageContainer title="Activities">
      <ActivityForm />
      <ActivityList />
    </PageContainer>
  );
}
