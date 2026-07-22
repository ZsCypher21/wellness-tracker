import PageContainer from '../components/layout/PageContainer';
import SleepForm from '../components/features/SleepForm';
import SleepList from '../components/features/SleepList';

export default function Sleep() {
  return (
    <PageContainer title="Sleep">
      <SleepForm />
      <SleepList />
    </PageContainer>
  );
}
