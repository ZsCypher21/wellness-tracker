/**
 * Global state container for all activity entries.
 *
 * Notes:
 * - Structure matches the other wellness contexts (Sleep, Hydration, etc.),
 *   but this one includes localStorage persistence.
 * - Activities are stored as an array of objects:
 *     { id, type, duration, date }
 *
 * Responsibilities:
 * - Load saved activities from localStorage on first render.
 * - Persist updates back to localStorage.
 * - Provide addActivity() and deleteActivity() to all components.
 */

import { createContext, useContext, useEffect, useState } from "react";

const ActivityContext = createContext();

export function ActivityProvider({ children }) {
  const [activities, setActivities] = useState([]);

  /**
   * Load saved activities from localStorage on mount.
   * Same pattern used across other contexts that support persistence.
   */
  useEffect(() => {
    const saved = localStorage.getItem("activities");
    if (saved) {
      setActivities(JSON.parse(saved));
    }
  }, []);

  /**
   * Persist activities whenever they change.
   * Guard ensures we don't write an empty array on first render.
   */
  useEffect(() => {
    if (activities.length > 0) {
      localStorage.setItem("activities", JSON.stringify(activities));
    }
  }, [activities]);

  /**
   * Add a new activity.
   * Generates a unique id using Date.now() (consistent with other contexts).
   */
  function addActivity(entry) {
    setActivities(prev => [...prev, { id: Date.now(), ...entry }]);
  }

  /**
   * Delete an activity by id.
   * Same deletion pattern used across all history-based contexts.
   */
  function deleteActivity(id) {
    setActivities(prev => prev.filter(a => a.id !== id));
  }

  return (
    <ActivityContext.Provider value={{ activities, addActivity, deleteActivity }}>
      {children}
    </ActivityContext.Provider>
  );
}

/**
 * Custom hook for consuming the ActivityContext.
 * Matches the pattern used in all other contexts (useSleep, useHydration, etc.).
 */
export function useActivities() {
  return useContext(ActivityContext);
}
