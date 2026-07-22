import { useAppointments } from '../../context/AppointmentContext';

export default function AppointmentList() {
  const { appointments, loading, deleteAppointment } = useAppointments();

  if (loading) return <p>Loading appointments...</p>;

  const upcoming = appointments.filter((a) => {
    const now = new Date();
    const appointmentDate = new Date(`${a.date} ${a.time}`);
    return appointmentDate >= now;
  });

  if (upcoming.length === 0)
    return <p>No upcoming appointments.</p>;

  return (
    <ul className="appointment-list">
      {upcoming.map((a) => (
        <li key={a.id} className="appointment-item">
          <div>
            <strong>{a.type}</strong>
            <br />
            {a.date} — {a.time}
            {a.notes && <p>{a.notes}</p>}
          </div>

          <button
            className="delete-btn"
            onClick={() => deleteAppointment(a.id)}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}
