import PageContainer from '../components/layout/PageContainer';
import AppointmentHistoryList from '../components/features/AppointmentHistoryList';

export default function AppointmentHistory() {
  return (
    <PageContainer title="Appointment History">
      <AppointmentHistoryList />
    </PageContainer>
  );
}
