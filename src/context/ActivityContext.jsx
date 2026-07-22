import { createContext, useContext, useEffect, useState } from 'react';
import { api } from '../services/api';

const ActivityContext = createContext();

export function ActivityProvider({ children }) {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getActivities().then((data) => {
      setActivities(data);
      setLoading(false);
    });
  }, []);

  function addActivity(activity) {
    setActivities((prev) => [...prev, { id: Date.now(), ...activity }]);
  }

  function deleteActivity(id) {
    setActivities((prev) => prev.filter((a) => a.id !== id));
  }

  return (
    <ActivityContext.Provider value={{ activities, loading, addActivity, deleteActivity }}>
      {children}
    </ActivityContext.Provider>
  );
}

export function useActivities() {
  return useContext(ActivityContext);
}
