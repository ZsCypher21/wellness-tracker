import { createContext, useContext, useState, useEffect } from "react";
import { getJson, postJson } from "../services/api";
import { useAuth } from "./AuthContext";

const ActivityContext = createContext();

export function ActivityProvider({ children }) {
  const { token } = useAuth();
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(false);

  async function loadRecent() {
    if (!token) return;
    setLoading(true);
    const data = await getJson("/activities/recent", token);
    setActivities(Array.isArray(data) ? data : []);
    setLoading(false);
  }

  async function loadHistory(tokenArg = token) {
    if (!tokenArg) return;
    setLoading(true);
    const data = await getJson("/activities/history", tokenArg);
    setActivities(Array.isArray(data) ? data : []);
    setLoading(false);
  }

  async function addActivity({ type, duration, date }) {
    if (!token) return;

    const res = await postJson(
      "/activities/add",
      {
        activity_type: type,
        duration_minutes: duration,
        activity_date: date
      },
      token
    );

    await loadRecent();
    return res;
  }

  // ⭐ WEEKLY TOTAL CALCULATION
  const weeklyActivityMinutes = (() => {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    return activities
      .filter(entry => new Date(entry.activity_date) >= sevenDaysAgo)
      .reduce((sum, entry) => sum + Number(entry.duration_minutes || 0), 0);
  })();

  useEffect(() => {
    if (token) loadRecent();
  }, [token]);

  return (
    <ActivityContext.Provider
      value={{
        activities,
        loading,
        loadRecent,
        loadHistory,
        addActivity,
        weeklyActivityMinutes
      }}
    >
      {children}
    </ActivityContext.Provider>
  );
}

export function useActivities() {
  return useContext(ActivityContext);
}
