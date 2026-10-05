// src/context/HydrationContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import { getJson, postJson } from "../services/api";
import { useAuth } from "./AuthContext";

const HydrationContext = createContext();

export function HydrationProvider({ children }) {
  const { token } = useAuth();

  const [hydrationData, setHydrationData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // ---------------------------------------------------------
  // LOAD RECENT HYDRATION ENTRIES
  // ---------------------------------------------------------
  async function loadRecent() {
    if (!token) return;

    try {
      setLoading(true);
      setError(null);

      const data = await getJson("/hydration/recent", token);
      setHydrationData(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message || "Failed to load recent hydration entries.");
    } finally {
      setLoading(false);
    }
  }

  // ---------------------------------------------------------
  // LOAD FULL HYDRATION HISTORY
  // ---------------------------------------------------------
  async function loadHistory(tokenArg = token) {
    if (!tokenArg) return;

    try {
      setLoading(true);
      setError(null);

      const data = await getJson("/hydration/history", tokenArg);
      setHydrationData(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message || "Failed to load hydration history.");
    } finally {
      setLoading(false);
    }
  }

  // ---------------------------------------------------------
  // ADD NEW HYDRATION ENTRY
  // ---------------------------------------------------------
  async function addHydration({ date, liters }) {
    if (!token) return;

    try {
      setLoading(true);
      setError(null);

      const res = await postJson(
        "/hydration/add",
        {
          hydration_date: date,
          liters,
        },
        token
      );

      await loadRecent();
      return res;
    } catch (err) {
      setError(err.message || "Failed to add hydration entry.");
    } finally {
      setLoading(false);
    }
  }

  // ---------------------------------------------------------
  // WEEKLY TOTAL CALCULATION
  // ---------------------------------------------------------
  const weeklyHydrationLiters = (() => {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    return hydrationData
      .filter(entry => new Date(entry.hydration_date) >= sevenDaysAgo)
      .reduce((sum, entry) => sum + Number(entry.liters || 0), 0);
  })();

  // ---------------------------------------------------------
  // AUTO LOAD RECENT ON LOGIN
  // ---------------------------------------------------------
  useEffect(() => {
    if (token) loadRecent();
  }, [token]);

  return (
    <HydrationContext.Provider
      value={{
        hydrationData,
        loading,
        error,
        loadRecent,
        loadHistory,
        addHydration,
        weeklyHydrationLiters,
      }}
    >
      {children}
    </HydrationContext.Provider>
  );
}

export function useHydration() {
  return useContext(HydrationContext);
}
