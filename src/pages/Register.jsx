import { useState } from "react";
import { postJson } from "../services/api";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Loading from "../components/ui/Loading";
import ErrorMessage from "../components/ui/ErrorMessage";

export default function Register() {
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const [loading, setLoading] = useState(false);
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

    try {
      setLoading(true);

      // FIXED: backend expects full_name
      const full_name = `${first_name} ${last_name}`.trim();

      const res = await postJson("/auth/register", {
        full_name,
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
    } catch (err) {
      setError(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-page">
      <h2>Create Account</h2>

      {error && <ErrorMessage message={error} />}
      {loading && <Loading />}

      <form onSubmit={submit} className="auth-form">
        <label>First Name</label>
        <input
          value={first_name}
          onChange={(e) => setFirstName(e.target.value)}
          disabled={loading}
        />

        <label>Last Name</label>
        <input
          value={last_name}
          onChange={(e) => setLastName(e.target.value)}
          disabled={loading}
        />

        <label>Email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
        />

        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
        />

        <label>Confirm Password</label>
        <input
          type="password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          disabled={loading}
        />

        <button className="btn-primary" type="submit" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
}
