import { useState } from "react";

export default function Tabs({ onChange }) {
  const [active, setActive] = useState("current");

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
