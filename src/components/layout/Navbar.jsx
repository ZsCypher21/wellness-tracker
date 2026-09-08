/**
 * Top navigation bar for the Wellness Tracker.
 *
 * Notes:
 * - Similar structural pattern to Sidebar (UI-only component).
 * - Unique logic: controls sidebar visibility + shows user info
 *   when authenticated.
 *
 * Responsibilities:
 * - Toggle the sidebar open/closed.
 * - Display the app brand.
 * - Show logged-in user + logout button.
 * - Render a blurred overlay when the sidebar is open.
 */

import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import Sidebar from "./Sidebar";

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const [open, setOpen] = useState(false);

  return (
    <>
      <nav className="navbar">

        {/* LEFT GROUP: Menu button + brand name */}
        <div className="navbar-left">
          <button
            className="menu-btn"
            onClick={() => setOpen(true)}
          >
            ☰
          </button>

          <div className="navbar__brand">
            Wellness Tracker
          </div>
        </div>

        {/* RIGHT GROUP: User email + logout (only when authenticated) */}
        {isAuthenticated && user && (
          <div className="navbar__user">
            <span className="navbar__username">{user.email}</span>
            <button className="logout-btn" onClick={logout}>Logout</button>
          </div>
        )}
      </nav>

      {/* Slide-in sidebar */}
      <Sidebar isOpen={open} onClose={() => setOpen(false)} />

      {/* Overlay that closes the sidebar when clicked */}
      {open && (
        <div
          className="sidebar-overlay active"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  );
}
