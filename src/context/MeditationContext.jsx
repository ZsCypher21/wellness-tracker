<<<<<<< HEAD
import { createContext, useContext, useState, useEffect } from "react";
import { getJson, postJson } from "../services/api";
import { useAuth } from "./AuthContext";

const MeditationContext = createContext();

export function MeditationProvider({ children }) {
  const { token } = useAuth();
  const [meditationData, setMeditationData] = useState([]);
  const [loading, setLoading] = useState(false);

  async function loadRecent() {
    if (!token) return;
    setLoading(true);
    const data = await getJson("/meditation/recent", token);
    setMeditationData(data || []);
    setLoading(false);
  }

  async function loadHistory() {
    if (!token) return;
    setLoading(true);
    const data = await getJson("/meditation/history", token);
    setMeditationData(data || []);
    setLoading(false);
  }

  async function addMeditation({ date, duration }) {
    if (!token) return;

    const res = await postJson(
      "/meditation/add",
      {
        meditation_date: date,
        duration_minutes: duration
      },
      token
    );

    await loadRecent();
    return res;
  }

  useEffect(() => {
    if (token) loadRecent();
  }, [token]);

  return (
    <MeditationContext.Provider
      value={{ meditationData, loading, loadRecent, loadHistory, addMeditation }}
    >
      {children}
    </MeditationContext.Provider>
  );
}

export function useMeditation() {
  return useContext(MeditationContext);
}
=======
/**
 * Global state container for all meditation entries.
 *
 * Notes:
 * - Follows the same provider + persistence pattern used in
 *   HydrationContext, SleepContext, ActivityContext, and AppointmentContext.
 * - Meditation entries follow the shape:
 *     { id, duration, date }
 *
 * Responsibilities:
 * - Load saved meditation data from localStorage on mount.
 * - Persist updates back to localStorage.
 * - Provide addMeditation() and deleteMeditation() to all components.
 */

import { createContext, useContext, useEffect, useState } from "react";

const MeditationContext = createContext();

export function MeditationProvider({ children }) {
  const [meditations, setMeditations] = useState([]);

  /**
   * Load saved meditation logs from localStorage.
   * Same persistence pattern used across all wellness contexts.
   */
  useEffect(() => {
    const saved = localStorage.getItem("meditations");
    if (saved) {
      setMeditations(JSON.parse(saved));
    }
  }, []);

  /**
   * Persist meditation logs whenever they change.
   * Guard prevents writing an empty array on initial render.
   */
  useEffect(() => {
    if (meditations.length > 0) {
      localStorage.setItem("meditations", JSON.stringify(meditations));
    }
  }, [meditations]);

  /**
   * Add a new meditation entry.
   * Uses Date.now() for a simple unique id (consistent across contexts).
   */
  function addMeditation(entry) {
    setMeditations(prev => [...prev, { id: Date.now(), ...entry }]);
  }

  /**
   * Delete a meditation entry by id.
   * Same deletion pattern used across all CRUD-based contexts.
   */
  function deleteMeditation(id) {
    setMeditations(prev => prev.filter(m => m.id !== id));
  }

  return (
    <MeditationContext.Provider
      value={{ meditations, addMeditation, deleteMeditation }}
    >
      {children}
    </MeditationContext.Provider>
  );
}

/**
 * Custom hook for consuming MeditationContext.
 * Matches naming conventions used across all other context hooks.
 */
export function useMeditation() {
  return useContext(MeditationContext);
}
>>>>>>> c2d5a7186b0cd3d7657a3ffe8873d7665b9f319d
