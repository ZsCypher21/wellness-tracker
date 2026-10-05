import { useState } from "react";
import { useHydration } from "../../context/HydrationContext";
import Loading from "../ui/Loading";
import ErrorMessage from "../ui/ErrorMessage";
import { formatLiters } from "../../utils/format";

export default function EditHydrationModal({ open, hydration, onSave, onClose }) {
  const { updateHydration, loading, error } = useHydration();

  const [form, setForm] = useState({
    liters: hydration?.liters || "",
    hydration_date: hydration?.hydration_date || "",
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    await updateHydration(hydration.id, form);
    onSave();
  }

  if (!open) return null;

  return (
    <div className="modal">
      <div className="modal__content">
        <h3>Edit Hydration</h3>

        {error && <ErrorMessage message={error} />}
        {loading && <Loading />}

        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <label>Liters</label>
            <input
              name="liters"
              value={form.liters}
              onChange={handleChange}
              disabled={loading}
            />
            <small>Preview: {formatLiters(form.liters)} L</small>
          </div>

          <div className="form-row">
            <label>Date</label>
            <input
              type="date"
              name="hydration_date"
              value={form.hydration_date}
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
