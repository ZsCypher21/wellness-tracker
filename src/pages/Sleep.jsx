<<<<<<< HEAD
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
=======
/**
 *
 * Responsibilities:
 * - Display the user's most recent sleep logs (latest 5 entries).
 * - Provide buttons for adding new sleep entries and viewing full history.
 * - Use a modal window to show the SleepForm for adding new logs.
 * - Retrieve shared sleep data from SleepContext.
 *
 * This page demonstrates:
 * - Context-based state consumption
 * - Local UI state (modal visibility)
 * - Sorting and slicing data for a clean dashboard-style preview
 * - Reusable UI components (Modal, SleepForm)
 */

import { useState } from "react";
import { useSleep } from "../context/SleepContext";
import Modal from "../components/ui/Modal";
import SleepForm from "../components/features/SleepForm";

export default function Sleep() {
  // Access global sleep data from SleepContext
  const { sleepData } = useSleep();

  // Local state controlling visibility of the "Add Sleep" modal
  const [showAdd, setShowAdd] = useState(false);

  /**
   * Sort sleep entries by date (newest → oldest).
   * Spread operator ensures we do not mutate context state.
   */
  const sorted = [...sleepData].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  // Show only the 5 most recent entries on the main page
  const recent = sorted.slice(0, 5);

  return (
    <div className="page">
      <div className="page__content">
        <h2>Sleep</h2>

        {/* Recent sleep logs preview */}
        <ul className="sleep-list">
          {recent.map((s) => (
            <li key={s.id} className="sleep-item">
              <strong>{s.totalHours} hrs</strong>
              <br />
              <small>{s.date}</small>
            </li>
          ))}
        </ul>

        {/* Action buttons: Add Sleep + View History */}
        <div className="btn-center" style={{ gap: "1rem" }}>
          {/* Open modal */}
          <button className="btn-primary" onClick={() => setShowAdd(true)}>
            Add Sleep
          </button>

          {/* Navigate to full history page */}
          <button
            className="btn"
            onClick={() => (window.location.href = "/sleep/history")}
          >
            History
          </button>
        </div>

        {/* Modal for adding new sleep entry */}
        <Modal isOpen={showAdd} onClose={() => setShowAdd(false)}>
          <h3>Add Sleep</h3>

          {/* SleepForm handles validation + submission */}
          <SleepForm onSubmit={() => setShowAdd(false)} />
        </Modal>
      </div>
    </div>
  );
}
>>>>>>> c2d5a7186b0cd3d7657a3ffe8873d7665b9f319d
