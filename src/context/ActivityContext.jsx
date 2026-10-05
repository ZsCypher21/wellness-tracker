// src/context/ActivityContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import { getJson, postJson } from "../services/api";
import { useAuth } from "./AuthContext";

const ActivityContext = createContext();

export function ActivityProvider({ children }) {
  const { token } = useAuth();

  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // ---------------------------------------------------------
  // LOAD RECENT ACTIVITIES
  // ---------------------------------------------------------
  async function loadRecent() {
    if (!token) return;

    try {
      setLoading(true);
      setError(null);

      const data = await getJson("/activities/recent", token);
      setActivities(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message || "Failed to load recent activities.");
    } finally {
      setLoading(false);
    }
  }

  // ---------------------------------------------------------
  // LOAD FULL ACTIVITY HISTORY
  // ---------------------------------------------------------
  async function loadHistory(tokenArg = token) {
    if (!tokenArg) return;

    try {
      setLoading(true);
      setError(null);

      const data = await getJson("/activities/history", tokenArg);
      setActivities(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message || "Failed to load activity history.");
    } finally {
      setLoading(false);
    }
  }

  // ---------------------------------------------------------
  // ADD NEW ACTIVITY ENTRY
  // ---------------------------------------------------------
  async function addActivity({ type, duration, date }) {
    if (!token) return;

    try {
      setLoading(true);
      setError(null);

      const res = await postJson(
        "/activities/add",
        {
          activity_type: type,
          duration_minutes: duration,
          activity_date: date,
        },
        token
      );

      await loadRecent();
      return res;
    } catch (err) {
      setError(err.message || "Failed to add activity entry.");
    } finally {
      setLoading(false);
    }
  }

  // ---------------------------------------------------------
  // WEEKLY TOTAL CALCULATION
  // ---------------------------------------------------------
  const weeklyActivityMinutes = (() => {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    return activities
      .filter(entry => new Date(entry.activity_date) >= sevenDaysAgo)
      .reduce((sum, entry) => sum + Number(entry.duration_minutes || 0), 0);
  })();

  // ---------------------------------------------------------
  // AUTO LOAD RECENT ON LOGIN
  // ---------------------------------------------------------
  useEffect(() => {
    if (token) loadRecent();
  }, [token]);

  return (
    <ActivityContext.Provider
      value={{
        activities,
        loading,
        error,
        loadRecent,
        loadHistory,
        addActivity,
        weeklyActivityMinutes,
      }}
    >
      {children}
    </ActivityContext.Provider>
  );
}

export function useActivities() {
  return useContext(ActivityContext);
}
