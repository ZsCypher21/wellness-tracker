/**
 * Reusable tab switcher used across multiple list components.
 *
 * Notes:
 * - Very small component, so comments focus only on the unique logic.
 * - Parent components control the actual filtering; Tabs only reports
 *   which tab is active via onChange().
 *
 * Responsibilities:
 * - Track the currently active tab locally.
 * - Notify parent components when the user switches tabs.
 */

import { useState } from "react";

export default function Tabs({ onChange }) {
  // Local UI state for which tab is active
  const [active, setActive] = useState("current");

  /**
   * Switch the active tab and notify the parent.
   * Parent components (SleepList, HydrationList, etc.) handle filtering.
   */
  function switchTab(tab) {
    setActive(tab);
    onChange(tab);
  }

  return (
    <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
      <button
        onClick={() => switchTab("current")}
        className={active === "current" ? "tab-active" : "tab"}
      >
        Current
      </button>

      <button
        onClick={() => switchTab("history")}
        className={active === "history" ? "tab-active" : "tab"}
      >
        History
      </button>
    </div>
  );
}
