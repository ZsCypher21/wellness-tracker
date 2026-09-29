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
