/**
 * Responsibilities:
 * - Display the user's most recent physical activities (latest 5).
 * - Provide actions to add new activity logs and view full history.
 * - Use a modal window to show ActivityForm for adding entries.
 * - Retrieve shared activity data from ActivityContext.
 *
 * Demonstrates:
 * - Context-based state consumption
 * - Local UI state (modal visibility)
 * - Sorting and slicing data for a dashboard-style preview
 * - Reusable UI components (Modal, ActivityForm)
 */

import { useState } from "react";
import { useActivities } from "../context/ActivityContext";
import Modal from "../components/ui/Modal";
import ActivityForm from "../components/features/ActivityForm";

export default function Activities() {
  // Access global activity data from ActivityContext
  const { activities } = useActivities();

  // Local state controlling visibility of the "Add Activity" modal
  const [showAdd, setShowAdd] = useState(false);

  /**
   * Sort activity entries by date (newest → oldest).
   * Spread operator ensures we do not mutate context state.
   */
  const sorted = [...activities].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  // Show only the 5 most recent entries on the main page
  const recent = sorted.slice(0, 5);

  return (
    <div className="page">
      <div className="page__content">
        <h2>Activities</h2>

        {/* Recent activity logs preview */}
        <ul className="activity-list">
          {recent.map((a) => (
            <li key={a.id} className="activity-item">
              <strong>{a.type}</strong> — {a.duration} mins
              <br />
              <small>{a.date}</small>
            </li>
          ))}
        </ul>

        {/* Action buttons: Add Activity + View History */}
        <div className="btn-center" style={{ gap: "1rem" }}>
          {/* Open modal */}
          <button className="btn-primary" onClick={() => setShowAdd(true)}>
            Add Activity
          </button>

          {/* Navigate to full history page */}
          <button
            className="btn"
            onClick={() => (window.location.href = "/activities/history")}
          >
            History
          </button>
        </div>

        {/* Modal for adding new activity entry */}
        <Modal isOpen={showAdd} onClose={() => setShowAdd(false)}>
          <h3>Add Activity</h3>

          {/* ActivityForm handles validation + submission */}
          <ActivityForm onSubmit={() => setShowAdd(false)} />
        </Modal>
      </div>
    </div>
  );
}
