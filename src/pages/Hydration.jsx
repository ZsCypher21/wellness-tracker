/**
 *
 * Responsibilities:
 * - Display the user's most recent hydration logs (latest 5).
 * - Provide actions to add new hydration entries and view full history.
 * - Use a modal window to show HydrationForm for adding entries.
 * - Retrieve shared hydration data from HydrationContext.
 *
 * Demonstrates:
 * - Context-based state consumption
 * - Local UI state (modal visibility)
 * - Sorting and slicing data for a dashboard-style preview
 * - Reusable UI components (Modal, HydrationForm)
 */

import { useState } from "react";
import { useHydration } from "../context/HydrationContext";
import Modal from "../components/ui/Modal";
import HydrationForm from "../components/features/HydrationForm";

export default function Hydration() {
  // Access global hydration data from HydrationContext
  const { hydrationData } = useHydration();

  // Local state controlling visibility of the "Add Hydration" modal
  const [showAdd, setShowAdd] = useState(false);

  /**
   * Sort hydration entries by date (newest → oldest).
   * Spread operator ensures we do not mutate context state.
   */
  const sorted = [...hydrationData].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  // Show only the 5 most recent entries on the main page
  const recent = sorted.slice(0, 5);

  return (
    <div className="page">
      <div className="page__content">
        <h2>Hydration</h2>

        {/* Recent hydration logs preview */}
        <ul className="hydration-list">
          {recent.map((h) => (
            <li key={h.id} className="hydration-item">
              <strong>{h.liters} L</strong>
              <br />
              <small>{h.date}</small>
            </li>
          ))}
        </ul>

        {/* Action buttons: Add Hydration + View History */}
        <div className="btn-center" style={{ gap: "1rem" }}>
          {/* Open modal */}
          <button className="btn-primary" onClick={() => setShowAdd(true)}>
            Add Hydration
          </button>

          {/* Navigate to full history page */}
          <button
            className="btn"
            onClick={() => (window.location.href = "/hydration/history")}
          >
            History
          </button>
        </div>

        {/* Modal for adding new hydration entry */}
        <Modal isOpen={showAdd} onClose={() => setShowAdd(false)}>
          <h3>Add Hydration</h3>

          {/* HydrationForm handles validation + submission */}
          <HydrationForm onSubmit={() => setShowAdd(false)} />
        </Modal>
      </div>
    </div>
  );
}
