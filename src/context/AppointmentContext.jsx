import { createContext, useContext, useEffect, useState } from 'react';
import { api } from '../services/api';

const AppointmentContext = createContext();

export function AppointmentProvider({ children }) {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getAppointments().then((data) => {
      setAppointments(data);
      setLoading(false);
    });
  }, []);

  function addAppointment(appointment) {
    setAppointments((prev) => [...prev, { id: Date.now(), ...appointment }]);
  }

  function deleteAppointment(id) {
    setAppointments((prev) => prev.filter((a) => a.id !== id));
  }

  return (
    <AppointmentContext.Provider value={{ appointments, loading, addAppointment, deleteAppointment }}>
      {children}
    </AppointmentContext.Provider>
  );
}

export function useAppointments() {
  return useContext(AppointmentContext);
}
