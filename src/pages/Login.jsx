/**
 *
 * Responsibilities:
 * - Collect user credentials (email + password).
 * - Call the AuthContext login() function to authenticate.
 * - Redirect authenticated users to the dashboard.
 *
 * Architecture:
 * - Uses Page + PageContent layout classes for consistent styling.
 * - Uses feature-form + form-row for unified form design.
 * - Uses React Router's useNavigate for post-login redirection.
 *
 * This page demonstrates:
 * - Controlled form inputs
 * - Context-based authentication
 * - Clean UI structure and reusable styling
 */

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  // Router navigation for redirecting after successful login
  const navigate = useNavigate();

  // Access login() from AuthContext
  const { login } = useAuth();

  // Local form state for controlled inputs
  const [form, setForm] = useState({ email: "", password: "" });

  /**
   * handleChange()
   * ---------------------------------------------------------
   * Updates form state as the user types.
   * Uses computed property names to update the correct field.
   */
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  /**
   * handleSubmit()
   * ---------------------------------------------------------
   * Prevents default form submission.
   * Calls login() from AuthContext.
   * If login succeeds, redirect user to the dashboard.
   */
  async function handleSubmit(e) {
    e.preventDefault();

    const success = await login(form.email, form.password);

    if (success) {
      navigate("/dashboard");   // Redirect after successful login
    }
  }

  return (
    <div className="page">
      <div className="page__content">
        <h2>Login</h2>

        {/* Login form */}
        <form className="feature-form" onSubmit={handleSubmit}>
          
          {/* Email field */}
          <div className="form-row">
            <label>Email</label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Password field */}
          <div className="form-row">
            <label>Password</label>
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          {/* Submit button */}
          <div className="btn-center">
            <button className="btn-primary" type="submit">
              Login
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
