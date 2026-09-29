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
