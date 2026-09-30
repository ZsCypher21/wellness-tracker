import { createContext, useContext, useState, useEffect } from "react";
import { getJson, postJson } from "../services/api";
import { useAuth } from "./AuthContext";

const MeditationContext = createContext();

export function MeditationProvider({ children }) {
  const { token } = useAuth();
  const [meditations, setMeditations] = useState([]);
  const [loading, setLoading] = useState(false);

  async function loadRecent(tokenArg = token) {
    if (!tokenArg) return;
    setLoading(true);
    const data = await getJson("/meditation/recent", tokenArg);
    setMeditations(Array.isArray(data) ? data : []);
    setLoading(false);
  }

  async function loadHistory(tokenArg = token) {
    if (!tokenArg) return;
    setLoading(true);
    const data = await getJson("/meditation/history", tokenArg);
    setMeditations(Array.isArray(data) ? data : []);
    setLoading(false);
  }

  async function addMeditation({ type, duration, date }) {
    if (!token) return;

    const res = await postJson(
      "/meditation/add",
      {
        meditation_type: type,
        duration_minutes: duration,
        meditation_date: date
      },
      token
    );

    await loadRecent();
    return res;
  }

  // ⭐ WEEKLY TOTAL CALCULATION
  const weeklyMeditationMinutes = (() => {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    return meditations
      .filter(entry => new Date(entry.meditation_date) >= sevenDaysAgo)
      .reduce((sum, entry) => sum + Number(entry.duration_minutes || 0), 0);
  })();

  useEffect(() => {
    if (token) loadRecent();
  }, [token]);

  return (
    <MeditationContext.Provider
      value={{
        meditations,
        loading,
        loadRecent,
        loadHistory,
        addMeditation,
        weeklyMeditationMinutes
      }}
    >
      {children}
    </MeditationContext.Provider>
  );
}

export function useMeditation() {
  return useContext(MeditationContext);
}
