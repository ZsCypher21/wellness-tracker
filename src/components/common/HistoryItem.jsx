/**
 * One entry row in a list: coloured icon, main text, date, and a "more"
 * menu with Edit / Delete. The menu closes when clicking elsewhere or
 * pressing Escape.
 */
import { useEffect, useRef, useState } from "react";
import Icon from "../ui/Icon";

export default function HistoryItem({ item, onEdit, onDelete, renderContent, icon, color }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!menuOpen) return undefined;
    const close = (e) => {
      if (e.type === "keydown" ? e.key === "Escape" : !ref.current?.contains(e.target)) setMenuOpen(false);
    };
    document.addEventListener("mousedown", close);
    document.addEventListener("keydown", close);
    return () => {
      document.removeEventListener("mousedown", close);
      document.removeEventListener("keydown", close);
    };
  }, [menuOpen]);

  return (
    <li className="entry">
      {icon && (
        <span className="tile-icon" style={{ "--tile-color": color || "var(--brand)" }}>
          <Icon name={icon} size={18} />
        </span>
      )}

      <div className="entry__main">{renderContent(item)}</div>

      <div className="entry__actions" ref={ref}>
        <button
          className="icon-btn"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label="Edit or delete this entry"
          aria-haspopup="menu"
          aria-expanded={menuOpen}
        >
          <Icon name="more" size={20} />
        </button>

        {menuOpen && (
          <div className="menu" role="menu">
            <button
              role="menuitem"
              className="menu__item"
              onClick={() => {
                setMenuOpen(false);
                onEdit(item);
              }}
            >
              <Icon name="edit" size={16} /> Edit
            </button>
            <button
              role="menuitem"
              className="menu__item menu__item--danger"
              onClick={() => {
                setMenuOpen(false);
                onDelete(item);
              }}
            >
              <Icon name="trash" size={16} /> Delete
            </button>
          </div>
        )}
      </div>
    </li>
  );
}
