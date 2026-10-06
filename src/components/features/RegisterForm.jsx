// src/components/features/RegisterForm.jsx
import { useState } from "react";
import { postJson } from "../../services/api";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

import ErrorMessage from "../ui/ErrorMessage";

export default function RegisterForm({ onSuccess }) {
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { login } = useAuth();
  const navigate = useNavigate();

  async function submit(e) {
    e.preventDefault();
    setError(null);

    if (password !== confirm) {
      setError("Passwords do not match");
      return;
    }

    const full_name = `${first_name} ${last_name}`.trim();

    try {
      setLoading(true);

      const res = await postJson("/auth/register", {
        full_name,
        email,
        password
      });

      if (res.token) {
        login(res.token, res.user);
        onSuccess();
        navigate("/dashboard");
      } else {
        setError(res.message || "Registration failed");
      }
    } catch (err) {
      setError(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={submit} className="feature-form">

      {error && <ErrorMessage message={error} />}


      <div className="form-row">
        <label htmlFor="register-form-first-name">First Name</label>
        <input
          id="register-form-first-name"
          value={first_name}
          onChange={(e) => setFirstName(e.target.value)}
          disabled={loading}
        />
      </div>

      <div className="form-row">
        <label htmlFor="register-form-last-name">Last Name</label>
        <input
          id="register-form-last-name"
          value={last_name}
          onChange={(e) => setLastName(e.target.value)}
          disabled={loading}
        />
      </div>

      <div className="form-row">
        <label htmlFor="register-form-email">Email</label>
        <input
          id="register-form-email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
        />
      </div>

      <div className="form-row">
        <label htmlFor="register-form-password">Password</label>
        <input
          id="register-form-password"
          type="password"
          autoComplete="new-password"
          minLength={6}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
        />
      </div>

      <div className="form-row">
        <label htmlFor="register-form-confirm">Confirm Password</label>
        <input
          id="register-form-confirm"
          type="password"
          autoComplete="new-password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          disabled={loading}
        />
      </div>

      <div className="btn-center">
        <button className="btn btn--primary btn--block" type="submit" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>
      </div>
    </form>
  );
}
