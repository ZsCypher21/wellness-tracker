<<<<<<< HEAD
import { createContext, useContext, useState, useEffect } from "react";
import { getJson, postJson } from "../services/api";
import { useAuth } from "./AuthContext";

const HydrationContext = createContext();

export function HydrationProvider({ children }) {
  const { token } = useAuth();
  const [hydrationData, setHydrationData] = useState([]);
  const [loading, setLoading] = useState(false);

  async function loadRecent() {
    if (!token) return;
    setLoading(true);
    const data = await getJson("/hydration/recent", token);
    setHydrationData(data || []);
    setLoading(false);
  }

  async function loadHistory() {
    if (!token) return;
    setLoading(true);
    const data = await getJson("/hydration/history", token);
    setHydrationData(data || []);
    setLoading(false);
  }

  async function addHydration({ date, liters }) {
    if (!token) return;

    const res = await postJson(
      "/hydration/add",
      {
        hydration_date: date,
        liters
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
    <HydrationContext.Provider
      value={{ hydrationData, loading, loadRecent, loadHistory, addHydration }}
    >
      {children}
    </HydrationContext.Provider>
  );
}

export function useHydration() {
  return useContext(HydrationContext);
}
=======
/**
 * Global state container for all hydration entries.
 *
 * Notes:
 * - Follows the same provider + persistence pattern used in
 *   ActivityContext, SleepContext, MeditationContext, and AppointmentContext.
 * - Hydration entries follow the shape:
 *     { id, liters, date }
 *
 * Responsibilities:
 * - Load saved hydration data from localStorage on mount.
 * - Persist updates back to localStorage.
 * - Provide addHydration() and deleteHydration() to all components.
 */

import { createContext, useContext, useEffect, useState } from "react";

const HydrationContext = createContext();

export function HydrationProvider({ children }) {
  const [hydrationData, setHydrationData] = useState([]);

  /**
   * Load saved hydration logs from localStorage.
   * Same pattern used across all contexts that support persistence.
   */
  useEffect(() => {
    const saved = localStorage.getItem("hydrationData");
    if (saved) {
      setHydrationData(JSON.parse(saved));
    }
  }, []);

  /**
   * Persist hydration logs whenever they change.
   * Guard prevents writing an empty array on initial render.
   */
  useEffect(() => {
    if (hydrationData.length > 0) {
      localStorage.setItem("hydrationData", JSON.stringify(hydrationData));
    }
  }, [hydrationData]);

  /**
   * Add a new hydration entry.
   * Uses Date.now() for a simple unique id (consistent across contexts).
   */
  function addHydration(entry) {
    setHydrationData(prev => [...prev, { id: Date.now(), ...entry }]);
  }

  /**
   * Delete a hydration entry by id.
   * Same deletion pattern used across all CRUD-based contexts.
   */
  function deleteHydration(id) {
    setHydrationData(prev => prev.filter(h => h.id !== id));
  }

  return (
    <HydrationContext.Provider
      value={{ hydrationData, addHydration, deleteHydration }}
    >
      {children}
    </HydrationContext.Provider>
  );
}

/**
 * Custom hook for consuming HydrationContext.
 * Matches naming conventions used across all other context hooks.
 */
export function useHydration() {
  return useContext(HydrationContext);
}
>>>>>>> c2d5a7186b0cd3d7657a3ffe8873d7665b9f319d
