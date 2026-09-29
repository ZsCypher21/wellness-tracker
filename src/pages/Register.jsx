import { useState } from "react";
import { postJson } from "../services/api";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState(null);

  const { setToken, setUser } = useAuth();
  const navigate = useNavigate();

  async function submit(e) {
    e.preventDefault();
    setError(null);

    if (password !== confirm) {
      setError("Passwords do not match");
      return;
    }

    const res = await postJson("/auth/register", {
      first_name,
      last_name,
      email,
      password
    });

    if (res.token) {
      setToken(res.token);
      setUser(res.user);
      navigate("/dashboard");
    } else {
      setError(res.message || "Registration failed");
    }
  }

  return (
    <div className="auth-page">
      <h2>Create Account</h2>

      <form onSubmit={submit} className="auth-form">
        <label>First Name</label>
        <input
          value={first_name}
          onChange={(e) => setFirstName(e.target.value)}
        />

        <label>Last Name</label>
        <input
          value={last_name}
          onChange={(e) => setLastName(e.target.value)}
        />

        <label>Email</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} />

        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <label>Confirm Password</label>
        <input
          type="password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
        />

        {error && <p className="error-text">{error}</p>}

        <button className="btn-primary" type="submit">
          Register
        </button>
      </form>
    </div>
  );
}
