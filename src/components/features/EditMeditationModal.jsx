import { useState, useEffect } from "react";
import Modal from "../ui/Modal";

export default function EditMeditationModal({ open, meditation, onSave, onClose }) {
  const [meditation_type, setType] = useState("");
  const [duration_minutes, setDuration] = useState("");
  const [meditation_date, setDate] = useState("");

  useEffect(() => {
    if (meditation) {
      setType(meditation.meditation_type || "");
      setDuration(meditation.duration_minutes || "");
      setDate(meditation.meditation_date || "");
    }
  }, [meditation]);

  function handleSubmit(e) {
    e.preventDefault();
    onSave({
      ...meditation,
      meditation_type,
      duration_minutes,
      meditation_date,
    });
  }

  return (
    <Modal isOpen={open} onClose={onClose}>
      <form onSubmit={handleSubmit} className="feature-form">
        <h3>Edit Meditation Entry</h3>

        <div className="form-row">
          <label>Meditation Type</label>
          <input
            value={meditation_type}
            onChange={(e) => setType(e.target.value)}
          />
        </div>

        <div className="form-row">
          <label>Duration (minutes)</label>
          <input
            type="number"
            value={duration_minutes}
            onChange={(e) => setDuration(e.target.value)}
          />
        </div>

        <div className="form-row">
          <label>Date</label>
          <input
            type="date"
            value={meditation_date}
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
