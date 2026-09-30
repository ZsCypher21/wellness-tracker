// src/context/AppointmentContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import { getJson, postJson, putJson, deleteJson } from "../services/api";
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
    setUpcoming(Array.isArray(data) ? data : []);
    setLoading(false);
  }

  async function loadPast() {
    if (!token) return;
    setLoading(true);
    const data = await getJson("/appointments/past", token);
    setPast(Array.isArray(data) ? data : []);
    setLoading(false);
  }

  async function addAppointment({ appointment_type, description, appointment_datetime }) {
    const res = await postJson(
      "/appointments/add",
      { appointment_type, description, appointment_datetime },
      token
    );
    await loadUpcoming();
    return res;
  }

  async function updateAppointment(id, updated) {
    await putJson(`/appointments/${id}`, updated, token);
    await loadUpcoming();
    await loadPast();
  }

  async function deleteAppointment(id) {
    await deleteJson(`/appointments/${id}`, token);
    await loadUpcoming();
    await loadPast();
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
        addAppointment,
        updateAppointment,
        deleteAppointment,
      }}
    >
      {children}
    </AppointmentContext.Provider>
  );
}

export function useAppointments() {
  return useContext(AppointmentContext);
}
