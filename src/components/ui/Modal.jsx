/**
 * Reusable modal dialog.
 * - Rendered only when `isOpen` is true.
 * - Closes on the X button, the Escape key, or a click on the dim background.
 */
import { useEffect } from "react";
import Icon from "./Icon";

export default function Modal({ isOpen, onClose, title, children }) {
  useEffect(() => {
    if (!isOpen) return undefined;
    const onKey = (e) => e.key === "Escape" && onClose?.();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onMouseDown={(e) => e.target === e.currentTarget && onClose?.()}>
      <div className="modal-window" role="dialog" aria-modal="true" aria-label={title}>
        <div className="modal-window__header">
          {title && <h2 className="modal-window__title">{title}</h2>}
          <button className="icon-btn" onClick={onClose} aria-label="Close">
            <Icon name="close" size={20} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
