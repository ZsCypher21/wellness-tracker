import { useState, useEffect } from "react";
import Modal from "../ui/Modal";

export default function EditSleepModal({ open, sleep, onSave, onClose }) {
  const [hours_slept, setHours] = useState("");
  const [sleep_date, setDate] = useState("");

  useEffect(() => {
    if (sleep) {
      setHours(sleep.hours_slept || "");
      setDate(sleep.sleep_date || "");
    }
  }, [sleep]);

  function handleSubmit(e) {
    e.preventDefault();
    onSave({
      ...sleep,
      hours_slept,
      sleep_date,
    });
  }

  return (
    <Modal isOpen={open} onClose={onClose}>
      <form onSubmit={handleSubmit} className="feature-form">
        <h3>Edit Sleep Entry</h3>

        <div className="form-row">
          <label>Hours Slept</label>
          <input
            type="number"
            value={hours_slept}
            onChange={(e) => setHours(e.target.value)}
          />
        </div>

        <div className="form-row">
          <label>Date</label>
          <input
            type="date"
            value={sleep_date}
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
