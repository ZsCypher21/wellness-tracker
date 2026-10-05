import { useState } from "react";
import { useSleep } from "../../context/SleepContext";
import Loading from "../ui/Loading";
import ErrorMessage from "../ui/ErrorMessage";

export default function EditSleepModal({ open, sleep, onSave, onClose }) {
  const { updateSleep, loading, error } = useSleep();

  const [form, setForm] = useState({
    hours_slept: sleep?.hours_slept || "",
    sleep_date: sleep?.sleep_date || "",
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    await updateSleep(sleep.id, form);
    onSave();
  }

  if (!open) return null;

  return (
    <div className="modal">
      <div className="modal__content">
        <h3>Edit Sleep</h3>

        {error && <ErrorMessage message={error} />}
        {loading && <Loading />}

        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <label>Hours Slept</label>
            <input
              type="number"
              name="hours_slept"
              value={form.hours_slept}
              onChange={handleChange}
              disabled={loading}
            />
          </div>

          <div className="form-row">
            <label>Date</label>
            <input
              type="date"
              name="sleep_date"
              value={form.sleep_date}
              onChange={handleChange}
              disabled={loading}
            />
          </div>

          <div className="modal__actions">
            <button className="btn-primary" type="submit" disabled={loading}>
              {loading ? "Saving..." : "Save"}
            </button>
            <button className="btn" type="button" onClick={onClose} disabled={loading}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
