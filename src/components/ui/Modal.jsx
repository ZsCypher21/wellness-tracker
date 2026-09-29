<<<<<<< HEAD
/**
 * Simple reusable modal component.
 *
 * Notes:
 * - Very small component, so comments focus only on the core logic.
 * - Modal rendering is controlled entirely by the `isOpen` prop.
 * - Parent components supply the content via `children`.
 *
 * Responsibilities:
 * - Render a modal overlay + window when `isOpen` is true.
 * - Provide a close button that triggers the parent’s onClose().
 */

export default function Modal({ isOpen, onClose, children }) {
  // Do not render anything if the modal is closed
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-window">
        {/* Close button delegates control back to the parent */}
        <button className="modal-close" onClick={onClose}>×</button>

        {/* Modal content supplied by the parent component */}
        {children}
      </div>
    </div>
  );
}
=======
/**
 * Simple reusable modal component.
 *
 * Notes:
 * - Very small component, so comments focus only on the core logic.
 * - Modal rendering is controlled entirely by the `isOpen` prop.
 * - Parent components supply the content via `children`.
 *
 * Responsibilities:
 * - Render a modal overlay + window when `isOpen` is true.
 * - Provide a close button that triggers the parent’s onClose().
 */

export default function Modal({ isOpen, onClose, children }) {
  // Do not render anything if the modal is closed
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-window">
        {/* Close button delegates control back to the parent */}
        <button className="modal-close" onClick={onClose}>×</button>

        {/* Modal content supplied by the parent component */}
        {children}
      </div>
    </div>
  );
}
>>>>>>> c2d5a7186b0cd3d7657a3ffe8873d7665b9f319d
