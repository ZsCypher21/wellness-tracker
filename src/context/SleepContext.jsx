// src/context/SleepContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import { getJson, postJson } from "../services/api";
import { useAuth } from "./AuthContext";

const SleepContext = createContext();

export function SleepProvider({ children }) {
  const { token } = useAuth();

  const [sleepEntries, setSleepEntries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // ---------------------------------------------------------
  // LOAD RECENT SLEEP ENTRIES
  // ---------------------------------------------------------
  async function loadRecent() {
    if (!token) return;

    try {
      setLoading(true);
      setError(null);

      const data = await getJson("/sleep/recent", token);
      setSleepEntries(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message || "Failed to load recent sleep entries.");
    } finally {
      setLoading(false);
    }
  }

  // ---------------------------------------------------------
  // LOAD FULL SLEEP HISTORY
  // ---------------------------------------------------------
  async function loadHistory(tokenArg = token) {
    if (!tokenArg) return;

    try {
      setLoading(true);
      setError(null);

      const data = await getJson("/sleep/history", tokenArg);
      setSleepEntries(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message || "Failed to load sleep history.");
    } finally {
      setLoading(false);
    }
  }

  // ---------------------------------------------------------
  // ADD NEW SLEEP ENTRY
  // ---------------------------------------------------------
  async function addSleep({ date, hours }) {
    if (!token) return;

    try {
      setLoading(true);
      setError(null);

      const res = await postJson(
        "/sleep/add",
        {
          sleep_date: date,
          hours_slept: hours,
        },
        token
      );

      await loadRecent();
      return res;
    } catch (err) {
      setError(err.message || "Failed to add sleep entry.");
    } finally {
      setLoading(false);
    }
  }

  // ---------------------------------------------------------
  // WEEKLY TOTAL CALCULATION
  // ---------------------------------------------------------
  const weeklySleepHours = (() => {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    return sleepEntries
      .filter(entry => new Date(entry.sleep_date) >= sevenDaysAgo)
      .reduce((sum, entry) => sum + Number(entry.hours_slept || 0), 0);
  })();

  // ---------------------------------------------------------
  // AUTO LOAD RECENT ON LOGIN
  // ---------------------------------------------------------
  useEffect(() => {
    if (token) loadRecent();
  }, [token]);

  return (
    <SleepContext.Provider
      value={{
        sleepEntries,
        loading,
        error,
        loadRecent,
        loadHistory,
        addSleep,
        weeklySleepHours,
      }}
    >
      {children}
    </SleepContext.Provider>
  );
}

export function useSleep() {
  return useContext(SleepContext);
}
