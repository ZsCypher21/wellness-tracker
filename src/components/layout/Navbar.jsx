import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Navbar({ onToggleSidebar }) {
  const { user, token, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <nav className="navbar">
      <div className="navbar-left">
        {/* Hamburger menu (matches .menu-btn in your CSS) */}
        {token && (
          <button className="menu-btn" onClick={onToggleSidebar}>
            ☰
          </button>
        )}

        {/* Brand (matches .navbar__brand) */}
        <Link to="/dashboard" className="navbar__brand">
          Wellness Tracker
        </Link>
      </div>

      <div className="navbar-right">
        {/* User + Logout (matches .navbar__user, .navbar__username, .logout-btn) */}
        {token && user && (
          <div className="navbar__user">
            <span className="navbar__username">{user.full_name}</span>
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
