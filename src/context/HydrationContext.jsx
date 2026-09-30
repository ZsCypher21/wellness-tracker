import { createContext, useContext, useState, useEffect } from "react";
import { getJson, postJson } from "../services/api";
import { useAuth } from "./AuthContext";

const HydrationContext = createContext();

export function HydrationProvider({ children }) {
  const { token } = useAuth();
  const [hydrationData, setHydrationData] = useState([]);
  const [loading, setLoading] = useState(false);

  async function loadRecent() {
    if (!token) return;
    setLoading(true);
    const data = await getJson("/hydration/recent", token);
    setHydrationData(Array.isArray(data) ? data : []);
    setLoading(false);
  }

  async function loadHistory(tokenArg = token) {
    if (!tokenArg) return;
    setLoading(true);
    const data = await getJson("/hydration/history", tokenArg);
    setHydrationData(Array.isArray(data) ? data : []);
    setLoading(false);
  }

  async function addHydration({ date, liters }) {
    if (!token) return;

    const res = await postJson(
      "/hydration/add",
      {
        hydration_date: date,
        liters
      },
      token
    );

    await loadRecent();
    return res;
  }

  // ⭐ WEEKLY TOTAL CALCULATION
  const weeklyHydrationLiters = (() => {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    return hydrationData
      .filter(entry => new Date(entry.hydration_date) >= sevenDaysAgo)
      .reduce((sum, entry) => sum + Number(entry.liters || 0), 0);
  })();

  useEffect(() => {
    if (token) loadRecent();
  }, [token]);

  return (
    <HydrationContext.Provider
      value={{
        hydrationData,
        loading,
        loadRecent,
        loadHistory,
        addHydration,
        weeklyHydrationLiters
      }}
    >
      {children}
    </HydrationContext.Provider>
  );
}

export function useHydration() {
  return useContext(HydrationContext);
}
