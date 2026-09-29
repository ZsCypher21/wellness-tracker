<<<<<<< HEAD
import { useState, useEffect } from "react";
import { useMeditation } from "../context/MeditationContext";
import { useAuth } from "../context/AuthContext";
import Modal from "../components/ui/Modal";
import MeditationForm from "../components/features/MeditationForm";
import { Navigate } from "react-router-dom";

export default function Meditation() {
  const { token } = useAuth();
  const { meditationData, loading, loadRecent } = useMeditation();
  const [showAdd, setShowAdd] = useState(false);

  useEffect(() => {
    if (token) loadRecent();
  }, [token]);

  if (!token) return <Navigate to="/login" />;

  const recent = [...meditationData].slice(0, 5);

  return (
    <div className="page">
      <div className="page__content">
        <h2>Meditation</h2>

        {loading && <p>Loading...</p>}

        <ul className="meditation-list">
          {recent.map((m) => (
            <li key={m.id} className="meditation-item">
              <strong>{m.duration_minutes} mins</strong>
              <br />
              <small>{m.meditation_date}</small>
            </li>
          ))}
        </ul>

        <div className="btn-center" style={{ gap: "1rem" }}>
          <button className="btn-primary" onClick={() => setShowAdd(true)}>
            Add Meditation
          </button>

          <button
            className="btn"
            onClick={() => (window.location.href = "/meditation/history")}
          >
            History
          </button>
        </div>

        <Modal isOpen={showAdd} onClose={() => setShowAdd(false)}>
          <h3>Add Meditation</h3>
          <MeditationForm onSubmit={() => setShowAdd(false)} />
        </Modal>
      </div>
    </div>
  );
}
=======
/**
 *
 * Responsibilities:
 * - Display the user's most recent meditation sessions (latest 5).
 * - Provide actions to add new meditation logs and view full history.
 * - Use a modal window to show MeditationForm for adding entries.
 * - Retrieve shared meditation data from MeditationContext.
 *
 * Demonstrates:
 * - Context-based state consumption
 * - Local UI state (modal visibility)
 * - Sorting and slicing data for a dashboard-style preview
 * - Reusable UI components (Modal, MeditationForm)
 */

import { useState } from "react";
import { useMeditation } from "../context/MeditationContext";
import Modal from "../components/ui/Modal";
import MeditationForm from "../components/features/MeditationForm";

export default function Meditation() {
  // Access global meditation data from MeditationContext
  const { meditations } = useMeditation();

  // Local state controlling visibility of the "Add Meditation" modal
  const [showAdd, setShowAdd] = useState(false);

  /**
   * Sort meditation entries by date (newest → oldest).
   * Spread operator ensures we do not mutate context state.
   */
  const sorted = [...meditations].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  // Show only the 5 most recent entries on the main page
  const recent = sorted.slice(0, 5);

  return (
    <div className="page">
      <div className="page__content">
        <h2>Meditation</h2>

        {/* Recent meditation logs preview */}
        <ul className="meditation-list">
          {recent.map((m) => (
            <li key={m.id} className="meditation-item">
              <strong>{m.duration} mins</strong>
              <br />
              <small>{m.date}</small>
            </li>
          ))}
        </ul>

        {/* Action buttons: Add Meditation + View History */}
        <div className="btn-center" style={{ gap: "1rem" }}>
          {/* Open modal */}
          <button className="btn-primary" onClick={() => setShowAdd(true)}>
            Add Meditation
          </button>

          {/* Navigate to full history page */}
          <button
            className="btn"
            onClick={() => (window.location.href = "/meditation/history")}
          >
            History
          </button>
        </div>

        {/* Modal for adding new meditation entry */}
        <Modal isOpen={showAdd} onClose={() => setShowAdd(false)}>
          <h3>Add Meditation</h3>

          {/* MeditationForm handles validation + submission */}
          <MeditationForm onSubmit={() => setShowAdd(false)} />
        </Modal>
      </div>
    </div>
  );
}
>>>>>>> c2d5a7186b0cd3d7657a3ffe8873d7665b9f319d
