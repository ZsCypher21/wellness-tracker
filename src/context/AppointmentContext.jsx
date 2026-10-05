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
  const [error, setError] = useState(null);

  // ---------------------------------------------------------
  // LOAD UPCOMING APPOINTMENTS
  // ---------------------------------------------------------
  async function loadUpcoming() {
    if (!token) return;

    try {
      setLoading(true);
      setError(null);

      const data = await getJson("/appointments/upcoming", token);
      setUpcoming(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message || "Failed to load upcoming appointments.");
    } finally {
      setLoading(false);
    }
  }

  // ---------------------------------------------------------
  // LOAD PAST APPOINTMENTS
  // ---------------------------------------------------------
  async function loadPast() {
    if (!token) return;

    try {
      setLoading(true);
      setError(null);

      const data = await getJson("/appointments/past", token);
      setPast(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message || "Failed to load past appointments.");
    } finally {
      setLoading(false);
    }
  }

  // ---------------------------------------------------------
  // ADD NEW APPOINTMENT
  // ---------------------------------------------------------
  async function addAppointment({ appointment_type, description, appointment_datetime }) {
    if (!token) return;

    try {
      setLoading(true);
      setError(null);

      const res = await postJson(
        "/appointments/add",
        { appointment_type, description, appointment_datetime },
        token
      );

      await loadUpcoming();
      return res;
    } catch (err) {
      setError(err.message || "Failed to add appointment.");
    } finally {
      setLoading(false);
    }
  }

  // ---------------------------------------------------------
  // UPDATE APPOINTMENT
  // ---------------------------------------------------------
  async function updateAppointment(id, updated) {
    if (!token) return;

    try {
      setLoading(true);
      setError(null);

      await putJson(`/appointments/${id}`, updated, token);

      await loadUpcoming();
      await loadPast();
    } catch (err) {
      setError(err.message || "Failed to update appointment.");
    } finally {
      setLoading(false);
    }
  }

  // ---------------------------------------------------------
  // DELETE APPOINTMENT
  // ---------------------------------------------------------
  async function deleteAppointment(id) {
    if (!token) return;

    try {
      setLoading(true);
      setError(null);

      await deleteJson(`/appointments/${id}`, token);

      await loadUpcoming();
      await loadPast();
    } catch (err) {
      setError(err.message || "Failed to delete appointment.");
    } finally {
      setLoading(false);
    }
  }

  // ---------------------------------------------------------
  // AUTO LOAD UPCOMING ON LOGIN
  // ---------------------------------------------------------
  useEffect(() => {
    if (token) loadUpcoming();
  }, [token]);

  return (
    <AppointmentContext.Provider
      value={{
        upcoming,
        past,
        loading,
        error,
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
