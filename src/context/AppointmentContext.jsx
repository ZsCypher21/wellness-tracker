<<<<<<< HEAD
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
=======
/**
 * Global state container for all appointment entries.
 *
 * Notes:
 * - Follows the same structure as ActivityContext, SleepContext,
 *   HydrationContext, and MeditationContext.
 * - Includes localStorage persistence so appointments remain
 *   available across page reloads.
 * - Appointment objects follow the shape:
 *     { id, title, date }
 *
 * Responsibilities:
 * - Load saved appointments from localStorage on mount.
 * - Persist updates back to localStorage.
 * - Provide addAppointment() and deleteAppointment() to all components.
 */

import { createContext, useContext, useEffect, useState } from "react";

const AppointmentContext = createContext();

export function AppointmentProvider({ children }) {
  const [appointments, setAppointments] = useState([]);

  /**
   * Load saved appointments from localStorage.
   * Same persistence pattern used across other contexts.
   */
  useEffect(() => {
    const saved = localStorage.getItem("appointments");
    if (saved) {
      setAppointments(JSON.parse(saved));
    }
  }, []);

  /**
   * Persist appointments whenever they change.
   * Guard prevents writing an empty array on initial render.
   */
  useEffect(() => {
    if (appointments.length > 0) {
      localStorage.setItem("appointments", JSON.stringify(appointments));
    }
  }, [appointments]);

  /**
   * Add a new appointment.
   * Uses Date.now() for a simple unique id (consistent across contexts).
   */
  function addAppointment(entry) {
    setAppointments(prev => [...prev, { id: Date.now(), ...entry }]);
  }

  /**
   * Delete an appointment by id.
   * Same deletion pattern used in all other CRUD-based contexts.
   */
  function deleteAppointment(id) {
    setAppointments(prev => prev.filter(a => a.id !== id));
  }

  return (
    <AppointmentContext.Provider
      value={{ appointments, addAppointment, deleteAppointment }}
    >
      {children}
    </AppointmentContext.Provider>
  );
}

/**
 * Custom hook for consuming the AppointmentContext.
 * Matches the naming and usage pattern of all other context hooks.
 */
export function useAppointments() {
  return useContext(AppointmentContext);
}
>>>>>>> c2d5a7186b0cd3d7657a3ffe8873d7665b9f319d
