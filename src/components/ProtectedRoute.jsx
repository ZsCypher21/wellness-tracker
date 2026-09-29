<<<<<<< HEAD
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { token, loading } = useAuth();

  if (loading) {
    return null; // or a loading spinner
  }

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
=======
/**
 * Route guard for authenticated pages.
 *
 * Notes:
 * - This component is unique compared to the other context-based files
 *   because it controls *navigation flow*, not data storage.
 * - It relies on AuthContext to determine whether the user may access
 *   the requested route.
 *
 * Responsibilities:
 * - Show a loading state while auth restoration is happening.
 * - Redirect unauthenticated users to the login page.
 * - Render the protected children only when authenticated.
 */

import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();

  /**
   * While AuthContext is restoring user + token from localStorage,
   * we temporarily block rendering to avoid flashing protected content.
   */
  if (loading) {
    return <div>Loading...</div>;
  }

  /**
   * If the user is not authenticated, redirect them to /login.
   * `replace` prevents adding the protected route to browser history.
   */
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Authenticated → allow access to the protected component
  return children;
}
>>>>>>> c2d5a7186b0cd3d7657a3ffe8873d7665b9f319d
