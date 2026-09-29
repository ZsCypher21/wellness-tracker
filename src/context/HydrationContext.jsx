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
    setHydrationData(data || []);
    setLoading(false);
  }

  async function loadHistory() {
    if (!token) return;
    setLoading(true);
    const data = await getJson("/hydration/history", token);
    setHydrationData(data || []);
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

  useEffect(() => {
    if (token) loadRecent();
  }, [token]);

  return (
    <HydrationContext.Provider
      value={{ hydrationData, loading, loadRecent, loadHistory, addHydration }}
    >
      {children}
    </HydrationContext.Provider>
  );
}

export function useHydration() {
  return useContext(HydrationContext);
}
