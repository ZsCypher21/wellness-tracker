import { useState, useEffect } from "react";
import Modal from "../ui/Modal";

export default function EditHydrationModal({ open, hydration, onSave, onClose }) {
  const [liters, setLiters] = useState("");
  const [hydration_date, setDate] = useState("");

  useEffect(() => {
    if (hydration) {
      setLiters(hydration.liters || "");
      setDate(hydration.hydration_date || "");
    }
  }, [hydration]);

  function handleSubmit(e) {
    e.preventDefault();
    onSave({
      ...hydration,
      liters,
      hydration_date,
    });
  }

  return (
    <Modal isOpen={open} onClose={onClose}>
      <form onSubmit={handleSubmit} className="feature-form">
        <h3>Edit Hydration Entry</h3>

        <div className="form-row">
          <label>Liters</label>
          <input
            type="number"
            value={liters}
            onChange={(e) => setLiters(e.target.value)}
          />
        </div>

        <div className="form-row">
          <label>Date</label>
          <input
            type="date"
            value={hydration_date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <button className="btn-primary" type="submit">
          Save Changes
        </button>
      </form>
    </Modal>
  );
}
