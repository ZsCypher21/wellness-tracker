import PageContainer from '../components/layout/PageContainer';
import AppointmentForm from '../components/features/AppointmentForm';
import AppointmentList from '../components/features/AppointmentList';

export default function Appointments() {
  return (
    <PageContainer title="Appointments">
      <AppointmentForm />
      <AppointmentList />
    </PageContainer>
  );
}
