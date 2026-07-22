import { useState } from "react";
import { useAppointments } from "../../context/AppointmentContext";
import Tabs from "../ui/Tabs";

export default function AppointmentList() {
  const { appointments } = useAppointments();
  const [tab, setTab] = useState("current");

  const now = new Date();

  const upcoming = appointments.filter(a => new Date(a.date) >= now);
  const past = appointments.filter(a => new Date(a.date) < now);

  return (
    <div>
      <h3>Appointments</h3>

      <Tabs onChange={setTab} />

      <ul className="appointment-list">
        {(tab === "current" ? upcoming : past).map((a) => (
          <li key={a.id} className="appointment-item">
            <div>
              <strong>{a.title}</strong>
              <br />
              <small>{a.date}</small>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
