// src/context/SleepContext.jsx
import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { getJson, postJson } from "../services/api";
import { useAuth } from "./AuthContext";
import { isWithinLastWeek } from "../utils/date";

const SleepContext = createContext();

export function SleepProvider({ children }) {
  const { token } = useAuth();

  const [sleepEntries, setSleepEntries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // ---------------------------------------------------------
  // LOAD ENTRIES
  // Always loads the full history (newest first). Pages show the first 5 as
  // "recent", and the weekly totals need every entry from the last 7 days -
  // using only the last 5 entries made the dashboard totals too low.
  // ---------------------------------------------------------
  const loadHistory = useCallback(async (tokenArg = token) => {
    if (!tokenArg) return;

    try {
      setLoading(true);
      setError(null);

      const data = await getJson("/sleep/history", tokenArg);
      setSleepEntries(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message || "Failed to load sleep entries.");
    } finally {
      setLoading(false);
    }
  }, [token]);

  const loadRecent = loadHistory;

  // ---------------------------------------------------------
  // ADD NEW ENTRY
  // Returns the server response on success, or null on failure (the error
  // is stored in `error` so the form can display it).
  // ---------------------------------------------------------
  async function addSleep({ date, hours }) {
    if (!token) return null;

    try {
      setLoading(true);
      setError(null);

      const res = await postJson(
        "/sleep/add",
        {
          sleep_date: date,
          hours_slept: Number(hours),
        },
        token
      );

      await loadHistory();
      return res;
    } catch (err) {
      setError(err.message || "Failed to add sleep entry.");
      return null;
    } finally {
      setLoading(false);
    }
  }

  // ---------------------------------------------------------
  // WEEKLY TOTAL (today + previous 6 days)
  // ---------------------------------------------------------
  const weeklySleepHours = sleepEntries
    .filter((entry) => isWithinLastWeek(entry.sleep_date))
    .reduce((sum, entry) => sum + Number(entry.hours_slept || 0), 0);

  // ---------------------------------------------------------
  // AUTO LOAD ON LOGIN / CLEAR ON LOGOUT
  // ---------------------------------------------------------
  // Fetching data when the user logs in is a legitimate effect.
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    if (token) {
      loadHistory(token);
    } else {
      setSleepEntries([]);
      setError(null);
    }
  }, [token, loadHistory]);
  /* eslint-enable react-hooks/set-state-in-effect */

  return (
    <SleepContext.Provider
      value={{
        sleepEntries,
        loading,
        error,
        clearError: () => setError(null),
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

// eslint-disable-next-line react-refresh/only-export-components
export function useSleep() {
  return useContext(SleepContext);
}
