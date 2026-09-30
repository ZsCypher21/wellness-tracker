import { useState } from "react";

export default function HistoryItem({ item, onEdit, onDelete, renderContent }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="history-item">
      {/* Left side: activity content */}
      <div className="history-main">
        {renderContent(item)}
      </div>

      {/* Right side: hamburger + menu */}
      <div className="history-actions">
        <button
          className="icon-button"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="hamburger-line" />
          <span className="hamburger-line" />
          <span className="hamburger-line" />
        </button>

        {menuOpen && (
          <div className="history-menu">
            <button
              className="btn"
              onClick={() => {
                setMenuOpen(false);
                onEdit(item);
              }}
            >
              Edit
            </button>

            <button
              className="btn"
              style={{ backgroundColor: "#b00020", color: "white" }}
              onClick={() => {
                setMenuOpen(false);
                onDelete(item);
              }}
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
