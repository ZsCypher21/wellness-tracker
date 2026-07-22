import { useAppointments } from '../../context/AppointmentContext';

export default function AppointmentHistoryList() {
  const { appointments, loading } = useAppointments();

  if (loading) return <p>Loading history...</p>;

  const past = appointments.filter((a) => {
    const now = new Date();
    const appointmentDate = new Date(`${a.date} ${a.time}`);
    return appointmentDate < now;
  });

  if (past.length === 0)
    return <p>No past appointments.</p>;

  return (
    <ul className="appointment-list">
      {past.map((a) => (
        <li key={a.id} className="appointment-item">
          <div>
            <strong>{a.type}</strong>
            <br />
            {a.date} — {a.time}
            {a.notes && <p>{a.notes}</p>}
          </div>
        </li>
      ))}
    </ul>
  );
}
