import { createContext, useContext, useEffect, useState } from 'react';
import { api } from '../services/api';

const SleepContext = createContext();

export function SleepProvider({ children }) {
  const [sleep, setSleepData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getSleep().then((data) => {
      setSleepData(data);
      setLoading(false);
    });
  }, []);

  function addSleep(entry) {
    setSleepData((prev) => [...prev, { id: Date.now(), ...entry }]);
  }

  function deleteSleep(id) {
    setSleepData((prev) => prev.filter((s) => s.id !== id));
  }

  return (
    <SleepContext.Provider value={{ sleep, loading, addSleep, deleteSleep }}>
      {children}
    </SleepContext.Provider>
  );
}

export function useSleep() {
  return useContext(SleepContext);
}
