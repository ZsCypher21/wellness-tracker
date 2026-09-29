import { useState, useEffect } from "react";
import { useSleep } from "../context/SleepContext";
import { useAuth } from "../context/AuthContext";
import Modal from "../components/ui/Modal";
import SleepForm from "../components/features/SleepForm";
import { Navigate } from "react-router-dom";

export default function Sleep() {
  const { token } = useAuth();
  const { sleepData, loading, loadRecent } = useSleep();
  const [showAdd, setShowAdd] = useState(false);

  useEffect(() => {
    if (token) loadRecent();
  }, [token]);

  if (!token) return <Navigate to="/login" />;

  const recent = [...sleepData].slice(0, 5);

  return (
    <div className="page">
      <div className="page__content">
        <h2>Sleep</h2>

        {loading && <p>Loading...</p>}

        <ul className="sleep-list">
          {recent.map((s) => (
            <li key={s.id} className="sleep-item">
              <strong>{s.hours_slept} hrs</strong>
              <br />
              <small>{s.sleep_date}</small>
            </li>
          ))}
        </ul>

        <div className="btn-center" style={{ gap: "1rem" }}>
          <button className="btn-primary" onClick={() => setShowAdd(true)}>
            Add Sleep Entry
          </button>

          <button
            className="btn"
            onClick={() => (window.location.href = "/sleep/history")}
          >
            History
          </button>
        </div>

        <Modal isOpen={showAdd} onClose={() => setShowAdd(false)}>
          <h3>Add Sleep Entry</h3>
          <SleepForm onSubmit={() => setShowAdd(false)} />
        </Modal>
      </div>
    </div>
  );
}
