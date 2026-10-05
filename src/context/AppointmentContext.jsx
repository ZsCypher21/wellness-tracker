// src/context/AppointmentContext.jsx
import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { getJson, postJson, putJson, deleteJson } from "../services/api";
import { useAuth } from "./AuthContext";
import { localDateTimeToIso } from "../utils/date";

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
  const loadUpcoming = useCallback(async () => {
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
  }, [token]);

  // ---------------------------------------------------------
  // LOAD PAST APPOINTMENTS
  // ---------------------------------------------------------
  const loadPast = useCallback(async () => {
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
  }, [token]);

  // ---------------------------------------------------------
  // ADD NEW APPOINTMENT
  // The form gives local time ("2026-10-06T14:30"); send it as a UTC ISO
  // string so the server stores the correct moment regardless of timezone.
  // Returns the response on success, null on failure.
  // ---------------------------------------------------------
  async function addAppointment({ appointment_type, description, appointment_datetime }) {
    if (!token) return null;

    try {
      setLoading(true);
      setError(null);

      const res = await postJson(
        "/appointments/add",
        {
          appointment_type,
          description,
          appointment_datetime: localDateTimeToIso(appointment_datetime),
        },
        token
      );

      await Promise.all([loadUpcoming(), loadPast()]);
      return res;
    } catch (err) {
      setError(err.message || "Failed to add appointment.");
      return null;
    } finally {
      setLoading(false);
    }
  }

  // ---------------------------------------------------------
  // UPDATE APPOINTMENT (returns true on success)
  // ---------------------------------------------------------
  async function updateAppointment(id, updated) {
    if (!token) return false;

    try {
      setLoading(true);
      setError(null);

      await putJson(
        `/appointments/${id}`,
        {
          appointment_type: updated.appointment_type,
          description: updated.description,
          appointment_datetime: localDateTimeToIso(updated.appointment_datetime),
        },
        token
      );

      await Promise.all([loadUpcoming(), loadPast()]);
      return true;
    } catch (err) {
      setError(err.message || "Failed to update appointment.");
      return false;
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

      await Promise.all([loadUpcoming(), loadPast()]);
    } catch (err) {
      setError(err.message || "Failed to delete appointment.");
    } finally {
      setLoading(false);
    }
  }

  // ---------------------------------------------------------
  // AUTO LOAD ON LOGIN / CLEAR ON LOGOUT
  // ---------------------------------------------------------
  // Fetching data when the user logs in is a legitimate effect.
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    if (token) {
      loadUpcoming();
      loadPast();
    } else {
      setUpcoming([]);
      setPast([]);
      setError(null);
    }
  }, [token, loadUpcoming, loadPast]);
  /* eslint-enable react-hooks/set-state-in-effect */

  return (
    <AppointmentContext.Provider
      value={{
        upcoming,
        past,
        // all appointments, used by the Progress page
        appointments: [...upcoming, ...past],
        loading,
        error,
        clearError: () => setError(null),
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

// eslint-disable-next-line react-refresh/only-export-components
export function useAppointments() {
  return useContext(AppointmentContext);
}
