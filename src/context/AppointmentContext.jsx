import { createContext, useContext, useState, useEffect } from "react";
import { getJson, postJson } from "../services/api";
import { useAuth } from "./AuthContext";

const AppointmentContext = createContext();

export function AppointmentProvider({ children }) {
  const { token } = useAuth();
  const [upcoming, setUpcoming] = useState([]);
  const [past, setPast] = useState([]);
  const [loading, setLoading] = useState(false);

  async function loadUpcoming() {
    if (!token) return;
    setLoading(true);
    const data = await getJson("/appointments/upcoming", token);
    setUpcoming(data || []);
    setLoading(false);
  }

  async function loadPast() {
    if (!token) return;
    setLoading(true);
    const data = await getJson("/appointments/past", token);
    setPast(data || []);
    setLoading(false);
  }

  async function addAppointment({ type, description, datetime }) {
    if (!token) return;

    const res = await postJson(
      "/appointments/add",
      {
        appointment_type: type,
        description,
        appointment_datetime: datetime
      },
      token
    );

    await loadUpcoming();
    return res;
  }

  useEffect(() => {
    if (token) loadUpcoming();
  }, [token]);

  return (
    <AppointmentContext.Provider
      value={{
        upcoming,
        past,
        loading,
        loadUpcoming,
        loadPast,
        addAppointment
      }}
    >
      {children}
    </AppointmentContext.Provider>
  );
}

export function useAppointments() {
  return useContext(AppointmentContext);
}
