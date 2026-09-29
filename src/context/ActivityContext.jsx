import { createContext, useContext, useState, useEffect } from "react";
import { getJson, postJson } from "../services/api";
import { useAuth } from "./AuthContext";

const ActivityContext = createContext();

export function ActivityProvider({ children }) {
  const { token } = useAuth();
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch last 5 activities
  async function loadRecent() {
    if (!token) return;
    setLoading(true);
    const data = await getJson("/activities/recent", token);
    setActivities(data || []);
    setLoading(false);
  }

  // Fetch full history
  async function loadHistory() {
    if (!token) return;
    setLoading(true);
    const data = await getJson("/activities/history", token);
    setActivities(data || []);
    setLoading(false);
  }

  // Add new activity
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

    // Refresh recent list
    await loadRecent();
    return res;
  }

  // Load recent on login
  useEffect(() => {
    if (token) loadRecent();
  }, [token]);

  return (
    <ActivityContext.Provider
      value={{ activities, loading, loadRecent, loadHistory, addActivity }}
    >
      {children}
    </ActivityContext.Provider>
  );
}

export function useActivities() {
  return useContext(ActivityContext);
}
