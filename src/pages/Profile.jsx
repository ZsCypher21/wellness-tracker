import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useProfile } from "../context/ProfileContext";
import { useAuth } from "../context/AuthContext";
import Loading from "../components/ui/Loading";
import ErrorMessage from "../components/ui/ErrorMessage";
import PageHeader from "../components/layout/PageHeader";
import Icon from "../components/ui/Icon";
import { MODULES } from "../utils/modules";

const GOALS = [
  { key: "sleep_goal", module: "sleep", label: "Sleep", unit: "hours / week", step: "0.5" },
  { key: "hydration_goal", module: "hydration", label: "Hydration", unit: "litres / week", step: "0.5" },
  { key: "meditation_goal", module: "meditation", label: "Meditation", unit: "minutes / week", step: "5" },
  { key: "activity_goal", module: "activity", label: "Activity", unit: "minutes / week", step: "5" },
];

function initials(name = "") {
  return name.split(" ").filter(Boolean).slice(0, 2).map((p) => p[0].toUpperCase()).join("") || "?";
}

export default function Profile() {
  const { isAuthenticated } = useAuth();
  const { profile, loading, error, updateProfile } = useProfile();

  const [form, setForm] = useState(null);
  const editMode = form !== null;

  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (loading && !profile) return <Loading />;
  if (error && !profile) return <ErrorMessage message={error} />;
  if (!profile) return <p className="muted">No profile data found.</p>;

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  // Copy the current profile into the form when entering edit mode
  function startEditing() {
    setForm({
      name: profile.name || "",
      bio: profile.bio || "",
      sleep_goal: profile.sleep_goal || 0,
      hydration_goal: profile.hydration_goal || 0,
      meditation_goal: profile.meditation_goal || 0,
      activity_goal: profile.activity_goal || 0,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const ok = await updateProfile(form);
    // stay in edit mode if saving failed so changes aren't lost
    if (ok) setForm(null);
  }

  return (
    <div className="page">
      <PageHeader
        title="Profile & goals"
        subtitle="Your details and the weekly targets used on your dashboard."
        actions={
          !editMode && (
            <button className="btn btn--primary" onClick={startEditing}>
              <Icon name="edit" size={18} /> Edit profile
            </button>
          )
        }
      />

      {error && <ErrorMessage message={error} />}

      {!editMode && (
        <div className="profile-grid">
          <section className="card profile-card">
            <span className="avatar avatar--lg" aria-hidden="true">{initials(profile.name)}</span>
            <h2 className="profile-card__name">{profile.name}</h2>
            <p className="muted">{profile.email}</p>
            <p className="profile-card__bio">{profile.bio || "No bio added yet."}</p>
          </section>

          <section className="card">
            <div className="card__header">
              <h2 className="card__title">Weekly goals</h2>
            </div>
            <div className="goal-tiles">
              {GOALS.map((g) => {
                const m = MODULES[g.module];
                return (
                  <div key={g.key} className="goal-tile" style={{ "--tile-color": m.color }}>
                    <span className="tile-icon"><Icon name={m.icon} size={20} /></span>
                    <div>
                      <p className="summary-tile__label">{g.label}</p>
                      <p className="summary-tile__value">{profile[g.key] || 0}</p>
                      <p className="muted small">{g.unit}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      )}

      {editMode && (
        <form className="profile-grid" onSubmit={handleSubmit}>
          <section className="card feature-form">
            <div className="card__header">
              <h2 className="card__title">Personal information</h2>
            </div>

            <div className="form-row">
              <label htmlFor="profile-name">Name</label>
              <input id="profile-name" name="name" value={form.name} onChange={handleChange} required />
            </div>

            <div className="form-row">
              <label htmlFor="profile-email">Email</label>
              <input id="profile-email" value={profile.email} readOnly disabled />
              <small className="muted">Email can't be changed.</small>
            </div>

            <div className="form-row">
              <label htmlFor="profile-bio">Bio</label>
              <textarea id="profile-bio" name="bio" rows={4} value={form.bio} onChange={handleChange}
                placeholder="e.g. Training for a half marathon" />
            </div>
          </section>

          <section className="card feature-form">
            <div className="card__header">
              <h2 className="card__title">Weekly goals</h2>
            </div>

            <div className="form-grid">
              {GOALS.map((g) => (
                <div className="form-row" key={g.key}>
                  <label htmlFor={`profile-${g.key}`}>{g.label} <span className="muted small">({g.unit})</span></label>
                  <input id={`profile-${g.key}`} type="number" min="0" step={g.step}
                    name={g.key} value={form[g.key]} onChange={handleChange} />
                </div>
              ))}
            </div>

            <div className="form-actions">
              <button className="btn btn--ghost" type="button" onClick={() => setForm(null)}>Cancel</button>
              <button className="btn btn--primary" type="submit" disabled={loading}>
                {loading ? "Saving…" : "Save changes"}
              </button>
            </div>
          </section>
        </form>
      )}
    </div>
  );
}
