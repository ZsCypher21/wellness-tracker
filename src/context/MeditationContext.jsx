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
