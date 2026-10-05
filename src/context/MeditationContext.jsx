// src/context/MeditationContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import { getJson, postJson } from "../services/api";
import { useAuth } from "./AuthContext";

const MeditationContext = createContext();

export function MeditationProvider({ children }) {
  const { token } = useAuth();

  const [meditations, setMeditations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // ---------------------------------------------------------
  // LOAD RECENT MEDITATION ENTRIES
  // ---------------------------------------------------------
  async function loadRecent(tokenArg = token) {
    if (!tokenArg) return;

    try {
      setLoading(true);
      setError(null);

      const data = await getJson("/meditation/recent", tokenArg);
      setMeditations(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message || "Failed to load recent meditation entries.");
    } finally {
      setLoading(false);
    }
  }

  // ---------------------------------------------------------
  // LOAD FULL MEDITATION HISTORY
  // ---------------------------------------------------------
  async function loadHistory(tokenArg = token) {
    if (!tokenArg) return;

    try {
      setLoading(true);
      setError(null);

      const data = await getJson("/meditation/history", tokenArg);
      setMeditations(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message || "Failed to load meditation history.");
    } finally {
      setLoading(false);
    }
  }

  // ---------------------------------------------------------
  // ADD NEW MEDITATION ENTRY
  // ---------------------------------------------------------
  async function addMeditation({ type, duration, date }) {
    if (!token) return;

    try {
      setLoading(true);
      setError(null);

      const res = await postJson(
        "/meditation/add",
        {
          meditation_type: type,
          duration_minutes: duration,
          meditation_date: date,
        },
        token
      );

      await loadRecent();
      return res;
    } catch (err) {
      setError(err.message || "Failed to add meditation entry.");
    } finally {
      setLoading(false);
    }
  }

  // ---------------------------------------------------------
  // WEEKLY TOTAL CALCULATION
  // ---------------------------------------------------------
  const weeklyMeditationMinutes = (() => {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    return meditations
      .filter(entry => new Date(entry.meditation_date) >= sevenDaysAgo)
      .reduce((sum, entry) => sum + Number(entry.duration_minutes || 0), 0);
  })();

  // ---------------------------------------------------------
  // AUTO LOAD RECENT ON LOGIN
  // ---------------------------------------------------------
  useEffect(() => {
    if (token) loadRecent();
  }, [token]);

  return (
    <MeditationContext.Provider
      value={{
        meditations,
        loading,
        error,
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

export function useMeditation() {
  return useContext(MeditationContext);
}
