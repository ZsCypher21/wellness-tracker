import { createContext, useContext, useState, useEffect } from "react";
import { getJson, postJson } from "../services/api";
import { useAuth } from "./AuthContext";

const SleepContext = createContext();

export function SleepProvider({ children }) {
  const { token } = useAuth();
  const [sleepEntries, setSleepEntries] = useState([]);
  const [loading, setLoading] = useState(false);

  async function loadRecent() {
    if (!token) return;
    setLoading(true);
    const data = await getJson("/sleep/recent", token);
    setSleepEntries(Array.isArray(data) ? data : []);
    setLoading(false);
  }

  async function loadHistory(tokenArg = token) {
    if (!tokenArg) return;
    setLoading(true);
    const data = await getJson("/sleep/history", tokenArg);
    setSleepEntries(Array.isArray(data) ? data : []);
    setLoading(false);
  }

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

  // ⭐ WEEKLY TOTAL CALCULATION
  const weeklySleepHours = (() => {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    return sleepEntries
      .filter(entry => new Date(entry.sleep_date) >= sevenDaysAgo)
      .reduce((sum, entry) => sum + Number(entry.hours_slept || 0), 0);
  })();

  useEffect(() => {
    if (token) loadRecent();
  }, [token]);

  return (
    <SleepContext.Provider
      value={{
        sleepEntries,
        loading,
        loadRecent,
        loadHistory,
        addSleep,
        weeklySleepHours
      }}
    >
      {children}
    </SleepContext.Provider>
  );
}

export function useSleep() {
  return useContext(SleepContext);
}
