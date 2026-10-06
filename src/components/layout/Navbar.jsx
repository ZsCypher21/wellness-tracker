import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Icon from "../ui/Icon";

// Initials for the avatar chip, e.g. "Prasana Shrestha" -> "PS"
function initials(name = "") {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("") || "?";
}

export default function Navbar({ onToggleSidebar }) {
  const { user, token, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <header className="topbar">
      <div className="topbar__left">
        {token && (
          <button className="icon-btn topbar__menu" onClick={onToggleSidebar} aria-label="Open menu">
            <Icon name="menu" size={22} />
          </button>
        )}

        <Link to="/dashboard" className="brand">
          <span className="brand__mark"><Icon name="leaf" size={18} strokeWidth={2.2} /></span>
          <span className="brand__name">Wellness Tracker</span>
        </Link>
      </div>

      {token && user && (
        <div className="topbar__right">
          <Link to="/profile" className="user-chip" title="View profile">
            <span className="avatar" aria-hidden="true">{initials(user.name)}</span>
            <span className="user-chip__name">{user.name || "Profile"}</span>
          </Link>

          <button className="btn btn--ghost btn--sm" onClick={handleLogout}>
            <Icon name="logout" size={18} />
            <span className="hide-sm">Log out</span>
          </button>
        </div>
      )}
    </header>
  );
}
