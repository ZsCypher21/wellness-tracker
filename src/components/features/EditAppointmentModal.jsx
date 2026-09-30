import { useState, useEffect } from "react";
import Modal from "../ui/Modal";

function toLocalInputFormat(isoString) {
  if (!isoString) return "";
  const date = new Date(isoString);

  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");

  const hh = String(date.getHours()).padStart(2, "0");
  const min = String(date.getMinutes()).padStart(2, "0");

  return `${yyyy}-${mm}-${dd}T${hh}:${min}`;
}

export default function EditAppointmentModal({ open, appointment, onSave, onClose }) {
  const [form, setForm] = useState({
    appointment_type: "",
    description: "",
    appointment_datetime: "",
  });

  useEffect(() => {
  if (appointment) {
    setForm({
      appointment_type: appointment.appointment_type || "",
      description: appointment.description || "",
      appointment_datetime: toLocalInputFormat(appointment.appointment_datetime),
    });
  }
}, [appointment]);


  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSave(form);
  }

  return (
    <Modal isOpen={open} onClose={onClose}>
      <form className="feature-form" onSubmit={handleSubmit}>
        <h3>Edit Appointment</h3>

        <div className="form-row">
          <label>Type</label>
          <input name="appointment_type" value={form.appointment_type} onChange={handleChange} />
        </div>

        <div className="form-row">
          <label>Description</label>
          <textarea name="description" value={form.description} onChange={handleChange} />
        </div>

        <div className="form-row">
          <label>Date & Time</label>
          <input
            type="datetime-local"
            name="appointment_datetime"
            value={form.appointment_datetime}
            onChange={handleChange}
          />
        </div>

        <button className="btn-primary" type="submit">Save Changes</button>
      </form>
    </Modal>
  );
}
