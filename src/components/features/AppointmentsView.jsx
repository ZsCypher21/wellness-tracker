/**
 * Upcoming (default) or past appointments, with add / edit / delete.
 */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useAppointments } from "../../context/AppointmentContext";
import { MODULES } from "../../utils/modules";

import PageHeader from "../layout/PageHeader";
import Modal from "../ui/Modal";
import Icon from "../ui/Icon";
import Loading from "../ui/Loading";
import ErrorMessage from "../ui/ErrorMessage";
import EmptyState from "../ui/EmptyState";
import HistoryItem from "../common/HistoryItem";
import AppointmentForm from "./AppointmentForm";
import EditAppointmentModal from "./EditAppointmentModal";

const meta = MODULES.appointments;

function DateBadge({ value }) {
  const d = new Date(value);
  return (
    <span className="date-badge" aria-hidden="true">
      <span className="date-badge__month">{d.toLocaleDateString("en-AU", { month: "short" })}</span>
      <span className="date-badge__day">{d.getDate()}</span>
    </span>
  );
}

export default function AppointmentsView({ past = false }) {
  const { token } = useAuth();
  const store = useAppointments();
  const { loading, error, loadUpcoming, loadPast, updateAppointment, deleteAppointment } = store;
  const list = past ? store.past : store.upcoming;

  const [showAdd, setShowAdd] = useState(false);
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    if (!token) return;
    if (past) loadPast();
    else loadUpcoming();
  }, [token, past, loadPast, loadUpcoming]);

  const addButton = (
    <button className="btn btn--primary" onClick={() => setShowAdd(true)}>
      <Icon name="plus" size={18} /> Add appointment
    </button>
  );

  return (
    <div className="page">
      <PageHeader
        title={past ? "Past appointments" : "Appointments"}
        subtitle={past ? "Appointments that have already happened." : "Keep track of upcoming health visits."}
        icon={meta.icon}
        color={meta.color}
        actions={
          <>
            {past ? (
              <Link className="btn btn--ghost" to="/appointments"><Icon name="arrowLeft" size={18} /> Upcoming</Link>
            ) : (
              <Link className="btn btn--ghost" to="/appointments/history"><Icon name="history" size={18} /> Past</Link>
            )}
            {addButton}
          </>
        }
      />

      {error && <ErrorMessage message={error} />}

      <section className="card">
        <div className="card__header">
          <h2 className="card__title">{past ? "Past" : "Upcoming"}</h2>
          <span className="muted small">{list.length} {list.length === 1 ? "appointment" : "appointments"}</span>
        </div>

        {loading && list.length === 0 && <Loading />}

        {!loading && !error && list.length === 0 && (
          <EmptyState
            icon="appointments"
            color={meta.color}
            title={past ? "No past appointments" : "No upcoming appointments"}
            text={past ? undefined : "Add your next check-up or health visit."}
            action={past ? undefined : addButton}
          />
        )}

        {list.length > 0 && (
          <ul className="entry-list">
            {list.map((a) => (
              <HistoryItem
                key={a.id}
                item={a}
                onEdit={setEditing}
                onDelete={(item) => {
                  if (window.confirm("Delete this appointment?")) deleteAppointment(item.id);
                }}
                renderContent={(item) => (
                  <div className="appt">
                    <DateBadge value={item.appointment_datetime} />
                    <div>
                      <p className="entry__title">{item.appointment_type}</p>
                      <p className="entry__meta">
                        {new Date(item.appointment_datetime).toLocaleString("en-AU", {
                          weekday: "short", day: "numeric", month: "short", hour: "numeric", minute: "2-digit",
                        })}
                        {item.description && ` · ${item.description}`}
                      </p>
                    </div>
                  </div>
                )}
              />
            ))}
          </ul>
        )}
      </section>

      <Modal isOpen={showAdd} onClose={() => setShowAdd(false)} title="Add appointment">
        <AppointmentForm onSubmit={() => setShowAdd(false)} />
      </Modal>

      <EditAppointmentModal
        open={!!editing}
        appointment={editing}
        onSave={async (updated) => {
          const ok = await updateAppointment(updated.id, updated);
          if (!ok) throw new Error("Failed to update appointment.");
          setEditing(null);
        }}
        onClose={() => setEditing(null)}
      />
    </div>
  );
}
