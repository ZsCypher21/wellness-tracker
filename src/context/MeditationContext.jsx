// src/context/MeditationContext.jsx
import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { getJson, postJson } from "../services/api";
import { useAuth } from "./AuthContext";
import { isWithinLastWeek } from "../utils/date";

const MeditationContext = createContext();

export function MeditationProvider({ children }) {
  const { token } = useAuth();

  const [meditations, setMeditations] = useState([]);
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

      const data = await getJson("/meditation/history", tokenArg);
      setMeditations(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message || "Failed to load meditation entries.");
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
  async function addMeditation({ duration, date }) {
    if (!token) return null;

    try {
      setLoading(true);
      setError(null);

      const res = await postJson(
        "/meditation/add",
        {
          duration_minutes: Number(duration),
          meditation_date: date,
        },
        token
      );

      await loadHistory();
      return res;
    } catch (err) {
      setError(err.message || "Failed to add meditation entry.");
      return null;
    } finally {
      setLoading(false);
    }
  }

  // ---------------------------------------------------------
  // WEEKLY TOTAL (today + previous 6 days)
  // ---------------------------------------------------------
  const weeklyMeditationMinutes = meditations
    .filter((entry) => isWithinLastWeek(entry.meditation_date))
    .reduce((sum, entry) => sum + Number(entry.duration_minutes || 0), 0);

  // ---------------------------------------------------------
  // AUTO LOAD ON LOGIN / CLEAR ON LOGOUT
  // ---------------------------------------------------------
  // Fetching data when the user logs in is a legitimate effect.
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    if (token) {
      loadHistory(token);
    } else {
      setMeditations([]);
      setError(null);
    }
  }, [token, loadHistory]);
  /* eslint-enable react-hooks/set-state-in-effect */

  return (
    <MeditationContext.Provider
      value={{
        meditations,
        loading,
        error,
        clearError: () => setError(null),
        loadRecent,
        loadHistory,
        addMeditation,
        weeklyMeditationMinutes,
      }}
    >
      {children}
    </MeditationContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useMeditation() {
  return useContext(MeditationContext);
}
