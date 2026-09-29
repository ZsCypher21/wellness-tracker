import { createContext, useContext, useState, useEffect } from "react";
import { getJson, postJson } from "../services/api";
import { useAuth } from "./AuthContext";

const MeditationContext = createContext();

export function MeditationProvider({ children }) {
  const { token } = useAuth();
  const [meditationData, setMeditationData] = useState([]);
  const [loading, setLoading] = useState(false);

  async function loadRecent() {
    if (!token) return;
    setLoading(true);
    const data = await getJson("/meditation/recent", token);
    setMeditationData(data || []);
    setLoading(false);
  }

  async function loadHistory() {
    if (!token) return;
    setLoading(true);
    const data = await getJson("/meditation/history", token);
    setMeditationData(data || []);
    setLoading(false);
  }

  async function addMeditation({ date, duration }) {
    if (!token) return;

    const res = await postJson(
      "/meditation/add",
      {
        meditation_date: date,
        duration_minutes: duration
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
    <MeditationContext.Provider
      value={{ meditationData, loading, loadRecent, loadHistory, addMeditation }}
    >
      {children}
    </MeditationContext.Provider>
  );
}

export function useMeditation() {
  return useContext(MeditationContext);
}
