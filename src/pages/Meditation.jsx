import PageContainer from '../components/layout/PageContainer';
import MeditationForm from '../components/features/MeditationForm';
import MeditationList from '../components/features/MeditationList';

export default function Meditation() {
  return (
    <PageContainer title="Meditation">
      <MeditationForm />
      <MeditationList />
    </PageContainer>
  );
}
