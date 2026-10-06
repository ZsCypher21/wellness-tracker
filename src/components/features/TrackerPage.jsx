/**
 * TrackerPage.jsx
 * ---------------------------------------------------------
 * Shared page used by Activities, Sleep, Hydration and Meditation, in two
 * modes:
 *  - default: weekly summary + the 5 most recent entries
 *  - history: every entry, newest first
 * Each module passes a config object (see trackers.js), so the four modules
 * share one layout and one set of edit/delete handlers.
 */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useProfile } from "../../context/ProfileContext";
import { putJson, deleteJson } from "../../services/api";
import { relativeDay } from "../../utils/date";
import { MODULES, round1 } from "../../utils/modules";

import PageHeader from "../layout/PageHeader";
import Modal from "../ui/Modal";
import Icon from "../ui/Icon";
import Loading from "../ui/Loading";
import ErrorMessage from "../ui/ErrorMessage";
import EmptyState from "../ui/EmptyState";
import ProgressBar from "../ui/ProgressBar";
import HistoryItem from "../common/HistoryItem";

export default function TrackerPage({ config, history = false }) {
  const { token } = useAuth();
  const { profile } = useProfile() || {};
  const store = config.useStore();
  const items = store[config.itemsKey] || [];
  const { loading, error, loadHistory } = store;
  const meta = MODULES[config.module];

  const [showAdd, setShowAdd] = useState(false);
  const [editing, setEditing] = useState(null);
  const [actionError, setActionError] = useState(null);

  useEffect(() => {
    if (token) loadHistory(token);
  }, [token, loadHistory]);

  const list = history ? items : items.slice(0, 5);
  const weekly = round1(store[config.weeklyKey]);
  const goal = Number(profile?.[config.goalKey]) || 0;

  // Throws on failure so the edit dialog can show the error
  async function handleSave(updated) {
    await putJson(`/${config.apiPath}/${updated.id}`, updated, token);
    await loadHistory(token);
    setEditing(null);
  }

  async function handleDelete(item) {
    if (!window.confirm("Delete this entry? This can't be undone.")) return;
    try {
      setActionError(null);
      await deleteJson(`/${config.apiPath}/${item.id}`, token);
      await loadHistory(token);
    } catch (err) {
      setActionError(err.message || "Failed to delete entry.");
    }
  }

  const addButton = (
    <button className="btn btn--primary" onClick={() => setShowAdd(true)}>
      <Icon name="plus" size={18} /> {config.addLabel}
    </button>
  );

  const Form = config.Form;
  const EditModal = config.EditModal;

  return (
    <div className="page">
      <PageHeader
        title={history ? `${meta.label} history` : config.title}
        subtitle={history ? `All ${items.length} entries, newest first` : config.subtitle}
        icon={meta.icon}
        color={meta.color}
        actions={
          <>
            {history ? (
              <Link className="btn btn--ghost" to={meta.path}>
                <Icon name="arrowLeft" size={18} /> Back
              </Link>
            ) : (
              <Link className="btn btn--ghost" to={`${meta.path}/history`}>
                <Icon name="history" size={18} /> History
              </Link>
            )}
            {addButton}
          </>
        }
      />

      {error && <ErrorMessage message={error} />}
      {actionError && <ErrorMessage message={actionError} />}

      <div className={history ? "" : "tracker-layout"}>
        {!history && (
          <section className="card summary-card" aria-label="This week">
            <p className="eyebrow">This week</p>
            <p className="stat">
              {config.formatTotal ? config.formatTotal(weekly) : weekly}
              <span className="stat__unit">{meta.unit}</span>
            </p>
            <p className="muted">{config.totalLabel}</p>
            <ProgressBar label="Weekly goal" value={weekly} target={goal} unit={meta.unit} color={meta.color} />
            {!goal && (
              <p className="muted small">
                <Link to="/profile">Set a weekly goal</Link> to track your progress.
              </p>
            )}
          </section>
        )}

        <section className="card" aria-label={history ? "All entries" : "Recent entries"}>
          <div className="card__header">
            <h2 className="card__title">{history ? "All entries" : "Recent entries"}</h2>
            {!history && items.length > 5 && (
              <Link className="link" to={`${meta.path}/history`}>
                View all {items.length} <Icon name="arrowRight" size={16} />
              </Link>
            )}
          </div>

          {loading && list.length === 0 && <Loading />}

          {!loading && !error && list.length === 0 && (
            <EmptyState
              icon={meta.icon}
              color={meta.color}
              title={config.emptyTitle}
              text="Your entries will appear here."
              action={addButton}
            />
          )}

          {list.length > 0 && (
            <ul className="entry-list">
              {list.map((entry) => (
                <HistoryItem
                  key={entry.id}
                  item={entry}
                  icon={meta.icon}
                  color={meta.color}
                  onEdit={setEditing}
                  onDelete={handleDelete}
                  renderContent={(item) => (
                    <>
                      <p className="entry__title">{config.primary(item)}</p>
                      <p className="entry__meta">{relativeDay(item[config.dateField])}</p>
                    </>
                  )}
                />
              ))}
            </ul>
          )}
        </section>
      </div>

      <Modal isOpen={showAdd} onClose={() => setShowAdd(false)} title={config.addLabel}>
        <Form onSubmit={() => setShowAdd(false)} />
      </Modal>

      <EditModal
        open={!!editing}
        {...{ [config.editProp]: editing }}
        onSave={handleSave}
        onClose={() => setEditing(null)}
      />
    </div>
  );
}
