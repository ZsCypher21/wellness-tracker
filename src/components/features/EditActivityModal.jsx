import { useState, useEffect } from "react";
import Modal from "../ui/Modal";

export default function EditActivityModal({ open, activity, onSave, onClose }) {
  const [activity_type, setActivityType] = useState("");
  const [duration_minutes, setDuration] = useState("");
  const [activity_date, setActivityDate] = useState("");

  useEffect(() => {
    if (activity) {
      setActivityType(activity.activity_type || "");
      setDuration(activity.duration_minutes || "");
      setActivityDate(activity.activity_date || "");
    }
  }, [activity]);

  function handleSubmit(e) {
    e.preventDefault();
    onSave({
      ...activity,
      activity_type,
      duration_minutes,
      activity_date,
    });
  }

  return (
    <Modal isOpen={open} onClose={onClose}>
      <form onSubmit={handleSubmit} className="feature-form">
        <h3>Edit Activity</h3>

        <div className="form-row">
          <label>Activity Type</label>
          <input
            value={activity_type}
            onChange={(e) => setActivityType(e.target.value)}
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
            value={activity_date}
            onChange={(e) => setActivityDate(e.target.value)}
          />
        </div>

        <button className="btn-primary" type="submit">
          Save Changes
        </button>
      </form>
    </Modal>
  );
}
