import { createContext, useContext, useEffect, useState } from 'react';
import { api } from '../services/api';

const MeditationContext = createContext();

export function MeditationProvider({ children }) {
  const [meditations, setMeditations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getMeditation().then((data) => {
      setMeditations(data);
      setLoading(false);
    });
  }, []);

  function addMeditation(meditation) {
    setMeditations((prev) => [...prev, { id: Date.now(), ...meditation }]);
  }

  function deleteMeditation(id) {
    setMeditations((prev) => prev.filter((m) => m.id !== id));
  }

  return (
    <MeditationContext.Provider value={{ meditations, loading, addMeditation, deleteMeditation }}>
      {children}
    </MeditationContext.Provider>
  );
}

export function useMeditations() {
  return useContext(MeditationContext);
}
