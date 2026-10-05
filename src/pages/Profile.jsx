import { useState, useEffect } from "react";
import { useProfile } from "../context/ProfileContext";
import { useAuth } from "../context/AuthContext";
import Loading from "../components/ui/Loading";
import ErrorMessage from "../components/ui/ErrorMessage";
import { Navigate } from "react-router-dom";

export default function Profile() {
  const { isAuthenticated } = useAuth();
  const { profile, loading, error, updateProfile } = useProfile();

  const [form, setForm] = useState({
    name: "",
    bio: "",
    sleep_goal: 0,
    hydration_goal: 0,
    meditation_goal: 0,
    activity_goal: 0,
  });

  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    if (profile) {
      setForm({
        name: profile.name || "",
        bio: profile.bio || "",
        sleep_goal: profile.sleep_goal || 0,
        hydration_goal: profile.hydration_goal || 0,
        meditation_goal: profile.meditation_goal || 0,
        activity_goal: profile.activity_goal || 0,
      });
    }
  }, [profile]);

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} />;

  if (!profile) {
    return <p className="empty-state">No profile data found.</p>;
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    await updateProfile(form);
    setEditMode(false);
  }

  return (
    <div className="page">
      <div className="page__content">
        <h2>Your Profile</h2>

        {/* READ MODE */}
        {!editMode && (
          <div className="progress-card">
            <h3>Personal Information</h3>

            <p><strong>Name:</strong> {profile.name}</p>
            <p><strong>Email:</strong> {profile.email}</p>
            <p><strong>Bio:</strong> {profile.bio || "No bio added yet."}</p>

            <h3 style={{ marginTop: "20px" }}>Weekly Goals</h3>
            <p><strong>Sleep:</strong> {profile.sleep_goal} hrs/week</p>
            <p><strong>Hydration:</strong> {profile.hydration_goal} L/week</p>
            <p><strong>Meditation:</strong> {profile.meditation_goal} mins/week</p>
            <p><strong>Activity:</strong> {profile.activity_goal} mins/week</p>

            <div className="btn-center">
              <button className="btn-primary" onClick={() => setEditMode(true)}>
                Edit Profile
              </button>
            </div>
          </div>
        )}

        {/* EDIT MODE */}
        {editMode && (
          <form className="feature-form" onSubmit={handleSubmit}>
            <div className="progress-card">
              <h3>Edit Personal Information</h3>

              <div className="form-row">
                <label>Name</label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                />
              </div>

              <div className="form-row">
                <label>Email</label>
                <input
                  value={profile.email}
                  readOnly
                  style={{ opacity: 0.6 }}
                />
              </div>

              <div className="form-row">
                <label>Bio</label>
                <textarea
                  name="bio"
                  value={form.bio}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="progress-card">
              <h3>Edit Weekly Goals</h3>

              <div className="form-row">
                <label>Sleep Goal (hours/week)</label>
                <input
                  type="number"
                  name="sleep_goal"
                  value={form.sleep_goal}
                  onChange={handleChange}
                />
              </div>

              <div className="form-row">
                <label>Hydration Goal (liters/week)</label>
                <input
                  type="number"
                  name="hydration_goal"
                  value={form.hydration_goal}
                  onChange={handleChange}
                />
              </div>

              <div className="form-row">
                <label>Meditation Goal (minutes/week)</label>
                <input
                  type="number"
                  name="meditation_goal"
                  value={form.meditation_goal}
                  onChange={handleChange}
                />
              </div>

              <div className="form-row">
                <label>Activity Goal (minutes/week)</label>
                <input
                  type="number"
                  name="activity_goal"
                  value={form.activity_goal}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="btn-center">
              <button className="btn-primary" type="submit">
                Save Changes
              </button>

              <button
                className="btn-secondary"
                type="button"
                onClick={() => setEditMode(false)}
                style={{ marginLeft: "10px" }}
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
