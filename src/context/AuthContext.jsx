import { createContext, useContext, useState, useEffect, useCallback } from "react";

const AuthContext = createContext(null);

function readSavedSession() {
  try {
    const savedUser = localStorage.getItem("user");
    const savedToken = localStorage.getItem("token");
    if (savedUser && savedToken) {
      return { user: JSON.parse(savedUser), token: savedToken };
    }
  } catch {
    // corrupted storage - fall through to logged-out state
  }
  return { user: null, token: null };
}

export function AuthProvider({ children }) {
  // Restore session from localStorage synchronously, so protected pages
  // don't redirect to /login on refresh before the session is read.
  const [session] = useState(readSavedSession);
  const [token, setToken] = useState(session.token);
  const [user, setUser] = useState(session.user);
  const loading = false;

  function login(tokenValue, userData) {
    localStorage.setItem("token", tokenValue);
    localStorage.setItem("user", JSON.stringify(userData));
    setToken(tokenValue);
    setUser(userData);
  }

  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  }, []);

  // Keep the stored user in sync (e.g. after editing the name on the profile page)
  function updateUser(fields) {
    setUser((prev) => {
      const next = { ...(prev || {}), ...fields };
      localStorage.setItem("user", JSON.stringify(next));
      return next;
    });
  }

  // api.js fires this when the server rejects the token (expired/invalid)
  useEffect(() => {
    window.addEventListener("auth:logout", logout);
    return () => window.removeEventListener("auth:logout", logout);
  }, [logout]);

  const isAuthenticated = !!token;

  const value = {
    token,
    setToken,
    user,
    setUser,
    updateUser,
    loading,
    login,
    logout,
    isAuthenticated,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  return useContext(AuthContext);
}
