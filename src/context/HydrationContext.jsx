import { createContext, useContext, useEffect, useState } from 'react';
import { api } from '../services/api';

const HydrationContext = createContext();

export function HydrationProvider({ children }) {
  const [hydration, setHydrationData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getHydration().then((data) => {
      setHydrationData(data);
      setLoading(false);
    });
  }, []);

  function addHydration(entry) {
    setHydrationData((prev) => [...prev, { id: Date.now(), ...entry }]);
  }

  function deleteHydration(id) {
    setHydrationData((prev) => prev.filter((h) => h.id !== id));
  }

  return (
    <HydrationContext.Provider
      value={{ hydration, loading, addHydration, deleteHydration }}
    >
      {children}
    </HydrationContext.Provider>
  );
}

export function useHydration() {
  return useContext(HydrationContext);
}
