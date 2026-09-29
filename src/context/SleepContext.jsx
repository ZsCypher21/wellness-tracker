<<<<<<< HEAD
import { createContext, useContext, useState, useEffect } from "react";
import { getJson, postJson } from "../services/api";
import { useAuth } from "./AuthContext";

const SleepContext = createContext();

export function SleepProvider({ children }) {
  const { token } = useAuth();
  const [sleepData, setSleepData] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch last 5 sleep logs
  async function loadRecent() {
    if (!token) return;
    setLoading(true);
    const data = await getJson("/sleep/recent", token);
    setSleepData(data || []);
    setLoading(false);
  }

  // Fetch full sleep history
  async function loadHistory() {
    if (!token) return;
    setLoading(true);
    const data = await getJson("/sleep/history", token);
    setSleepData(data || []);
    setLoading(false);
  }

  // Add new sleep entry
  async function addSleep({ date, hours }) {
    if (!token) return;

    const res = await postJson(
      "/sleep/add",
      {
        sleep_date: date,
        hours_slept: hours
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
    <SleepContext.Provider
      value={{ sleepData, loading, loadRecent, loadHistory, addSleep }}
    >
      {children}
    </SleepContext.Provider>
  );
}

export function useSleep() {
  return useContext(SleepContext);
}
=======
/**
 * Global state container for all sleep entries.
 *
 * Notes:
 * - Follows the same provider + persistence pattern used in
 *   HydrationContext, MeditationContext, ActivityContext,
 *   and AppointmentContext.
 * - Sleep entries follow the shape:
 *     { id, totalHours, date }
 *
 * Responsibilities:
 * - Load saved sleep data from localStorage on mount.
 * - Persist updates back to localStorage.
 * - Provide addSleep() and deleteSleep() to all components.
 */

import { createContext, useContext, useEffect, useState } from "react";

const SleepContext = createContext();

export function SleepProvider({ children }) {
  const [sleepData, setSleepData] = useState([]);

  /**
   * Load saved sleep logs from localStorage.
   * Same persistence pattern used across all wellness contexts.
   */
  useEffect(() => {
    const saved = localStorage.getItem("sleepData");
    if (saved) {
      setSleepData(JSON.parse(saved));
    }
  }, []);

  /**
   * Persist sleep logs whenever they change.
   * Guard prevents writing an empty array on initial render.
   */
  useEffect(() => {
    if (sleepData.length > 0) {
      localStorage.setItem("sleepData", JSON.stringify(sleepData));
    }
  }, [sleepData]);

  /**
   * Add a new sleep entry.
   * Uses Date.now() for a simple unique id (consistent across contexts).
   */
  function addSleep(entry) {
    setSleepData(prev => [...prev, { id: Date.now(), ...entry }]);
  }

  /**
   * Delete a sleep entry by id.
   * Same deletion pattern used across all CRUD-based contexts.
   */
  function deleteSleep(id) {
    setSleepData(prev => prev.filter(s => s.id !== id));
  }

  return (
    <SleepContext.Provider value={{ sleepData, addSleep, deleteSleep }}>
      {children}
    </SleepContext.Provider>
  );
}

/**
 * Custom hook for consuming SleepContext.
 * Matches naming conventions used across all other context hooks.
 */
export function useSleep() {
  return useContext(SleepContext);
}
>>>>>>> c2d5a7186b0cd3d7657a3ffe8873d7665b9f319d
