/**
 * Global authentication state for the Wellness Tracker.
 *
 * Notes:
 * - Follows the same provider pattern as Activity, Sleep,
 *   Hydration, Meditation, and Appointment contexts.
 * - Includes additional logic unique to authentication:
 *     • token + user restoration
 *     • loading state while checking localStorage
 *     • login/logout functions that manage both user and token
 *
 * Responsibilities:
 * - Restore session from localStorage on startup.
 * - Provide login() and logout() to all components.
 * - Track authentication status and loading state.
 */

import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  /**
   * Restore authentication state from localStorage.
   * Unique to this context: both user AND token must exist
   * before marking the session as authenticated.
   */
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const savedToken = localStorage.getItem("token");

    if (savedUser && savedToken) {
      setUser(JSON.parse(savedUser));
      setIsAuthenticated(true);
    }

    setLoading(false);
  }, []);

  /**
   * login()
   * ---------------------------------------------------------
   * Simulated login function.
   * Stores both user and token in localStorage.
   * Marks the session as authenticated.
   *
   * Mirrors the structure of other context "add" functions,
   * but includes token handling unique to authentication.
   */
  async function login(email, password) {
    if (email && password) {
      const loggedUser = { email };
      const fakeToken = "valid-token"; // Simulated token

      setUser(loggedUser);
      setIsAuthenticated(true);

      localStorage.setItem("user", JSON.stringify(loggedUser));
      localStorage.setItem("token", fakeToken);

      return true;
    }
    return false;
  }

  /**
   * logout()
   * ---------------------------------------------------------
   * Clears user + token and resets authentication state.
   * Same pattern as delete functions in other contexts,
   * but applied to auth-specific fields.
   */
  function logout() {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

/**
 * Custom hook for consuming AuthContext.
 * Matches naming conventions used across all other contexts.
 */
export function useAuth() {
  return useContext(AuthContext);
}
