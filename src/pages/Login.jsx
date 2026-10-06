import { useState } from "react";
import { postJson } from "../services/api";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Navigate } from "react-router-dom";
import Modal from "../components/ui/Modal";
import RegisterForm from "../components/features/RegisterForm";
import ErrorMessage from "../components/ui/ErrorMessage";
import Icon from "../components/ui/Icon";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const [showRegister, setShowRegister] = useState(false);

  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Already logged in (e.g. visiting "/" with a saved session) -> go to the dashboard
  if (isAuthenticated) return <Navigate to="/dashboard" replace />;

  async function submit(e) {
    e.preventDefault();
    setError(null);

    try {
      setLoading(true);

      const res = await postJson("/auth/login", { email, password });

      if (res.token) {
        login(res.token, res.user);
        navigate("/dashboard", { replace: true });
      } else {
        setError(res.message || "Login failed");
      }
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  const features = [
    ["activity", "Activity, sleep, water and meditation in one place"],
    ["target", "Weekly goals with progress you can see"],
    ["appointments", "Upcoming health appointments at a glance"],
  ];

  return (
    <div className="auth">
      <aside className="auth__brand">
        <div className="brand brand--light">
          <span className="brand__mark"><Icon name="leaf" size={18} strokeWidth={2.2} /></span>
          <span className="brand__name">Wellness Tracker</span>
        </div>
        <h1 className="auth__headline">Your daily wellbeing, all in one place.</h1>
        <ul className="auth__features">
          {features.map(([icon, text]) => (
            <li key={text}>
              <span className="auth__feature-icon"><Icon name={icon} size={18} /></span>
              {text}
            </li>
          ))}
        </ul>
      </aside>

      <main className="auth__panel">
        <div className="auth-card">
          <h2 className="auth-title">Welcome back</h2>
          <p className="muted">Log in to continue tracking your wellness.</p>

          {error && <ErrorMessage message={error} />}

          <form onSubmit={submit} className="feature-form">
            <div className="form-row">
              <label htmlFor="login-email">Email</label>
              <input
                id="login-email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                disabled={loading}
              />
            </div>

            <div className="form-row">
              <label htmlFor="login-password">Password</label>
              <input
                id="login-password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                disabled={loading}
              />
            </div>

            <button className="btn btn--primary btn--block btn--lg" type="submit" disabled={loading}>
              {loading ? "Logging in…" : "Log in"}
            </button>
          </form>

          <p className="auth__switch">
            New here?{" "}
            <button className="link-btn" type="button" onClick={() => setShowRegister(true)} disabled={loading}>
              Create an account
            </button>
          </p>
        </div>
      </main>

      <Modal isOpen={showRegister} onClose={() => setShowRegister(false)} title="Create your account">
        <RegisterForm onSuccess={() => setShowRegister(false)} />
      </Modal>
    </div>
  );
}
