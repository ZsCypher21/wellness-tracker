<<<<<<< HEAD
/**
 * Slide‑in navigation menu for the Wellness Tracker.
 *
 * Notes:
 * - This component is purely UI/UX (no data logic).
 * - Visibility is controlled by the parent via `isOpen`.
 * - Uses a simple translateX animation instead of conditional rendering,
 *   allowing smooth transitions.
 *
 * Responsibilities:
 * - Show/hide the sidebar based on `isOpen`.
 * - Provide navigation links to all major app sections.
 * - Close automatically when a link is clicked.
 */

import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Sidebar({ isOpen, onClose }) {
  const { user } = useAuth(); // Currently unused, but available for future personalization

  return (
    <div
      className="sidebar"
      style={{
        // Slide-in animation: off-screen when closed, visible when open
        transform: isOpen ? "translateX(0)" : "translateX(-100%)",
      }}
    >
      <div className="sidebar-header">
        <h3>Menu</h3>

        {/* Close button delegates control back to the parent */}
        <button className="sidebar-close" onClick={onClose}>✕</button>
      </div>

      {/* Navigation links — clicking closes the sidebar */}
      <ul className="sidebar-links">
        <li><Link to="/dashboard" onClick={onClose}>Dashboard</Link></li>
        <li><Link to="/activities" onClick={onClose}>Activities</Link></li>
        <li><Link to="/sleep" onClick={onClose}>Sleep</Link></li>
        <li><Link to="/meditation" onClick={onClose}>Meditation</Link></li>
        <li><Link to="/hydration" onClick={onClose}>Hydration</Link></li>
        <li><Link to="/appointments" onClick={onClose}>Appointments</Link></li>
        <li><Link to="/progress" onClick={onClose}>Progress</Link></li>
      </ul>
    </div>
  );
}
=======
/**
 * Slide‑in navigation menu for the Wellness Tracker.
 *
 * Notes:
 * - This component is purely UI/UX (no data logic).
 * - Visibility is controlled by the parent via `isOpen`.
 * - Uses a simple translateX animation instead of conditional rendering,
 *   allowing smooth transitions.
 *
 * Responsibilities:
 * - Show/hide the sidebar based on `isOpen`.
 * - Provide navigation links to all major app sections.
 * - Close automatically when a link is clicked.
 */

import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Sidebar({ isOpen, onClose }) {
  const { user } = useAuth(); // Currently unused, but available for future personalization

  return (
    <div
      className="sidebar"
      style={{
        // Slide-in animation: off-screen when closed, visible when open
        transform: isOpen ? "translateX(0)" : "translateX(-100%)",
      }}
    >
      <div className="sidebar-header">
        <h3>Menu</h3>

        {/* Close button delegates control back to the parent */}
        <button className="sidebar-close" onClick={onClose}>✕</button>
      </div>

      {/* Navigation links — clicking closes the sidebar */}
      <ul className="sidebar-links">
        <li><Link to="/dashboard" onClick={onClose}>Dashboard</Link></li>
        <li><Link to="/activities" onClick={onClose}>Activities</Link></li>
        <li><Link to="/sleep" onClick={onClose}>Sleep</Link></li>
        <li><Link to="/meditation" onClick={onClose}>Meditation</Link></li>
        <li><Link to="/hydration" onClick={onClose}>Hydration</Link></li>
        <li><Link to="/appointments" onClick={onClose}>Appointments</Link></li>
        <li><Link to="/progress" onClick={onClose}>Progress</Link></li>
      </ul>
    </div>
  );
}
>>>>>>> c2d5a7186b0cd3d7657a3ffe8873d7665b9f319d
