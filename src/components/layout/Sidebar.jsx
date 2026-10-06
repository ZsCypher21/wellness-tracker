/**
 * Sidebar navigation.
 * - Desktop (>= 1024px): always visible on the left.
 * - Smaller screens: slides in from the left when `isOpen` is true.
 * NavLink highlights the page the user is currently on.
 */
import { NavLink } from "react-router-dom";
import Icon from "../ui/Icon";
import { MODULES } from "../../utils/modules";

const LINKS = [
  { to: "/dashboard", label: "Dashboard", icon: "dashboard" },
  { to: MODULES.activity.path, label: "Activities", icon: "activity", color: MODULES.activity.color },
  { to: MODULES.sleep.path, label: "Sleep", icon: "sleep", color: MODULES.sleep.color },
  { to: MODULES.hydration.path, label: "Hydration", icon: "hydration", color: MODULES.hydration.color },
  { to: MODULES.meditation.path, label: "Meditation", icon: "meditation", color: MODULES.meditation.color },
  { to: MODULES.appointments.path, label: "Appointments", icon: "appointments", color: MODULES.appointments.color },
];

const INSIGHTS = [
  { to: "/progress", label: "Progress", icon: "progress" },
  { to: "/profile", label: "Profile & goals", icon: "profile" },
];

function NavItem({ link, onNavigate }) {
  return (
    <li>
      <NavLink
        to={link.to}
        onClick={onNavigate}
        className={({ isActive }) => `nav-link${isActive ? " nav-link--active" : ""}`}
        style={link.color ? { "--item-color": link.color } : undefined}
      >
        <span className="nav-link__icon"><Icon name={link.icon} size={19} /></span>
        {link.label}
      </NavLink>
    </li>
  );
}

export default function Sidebar({ isOpen, onClose }) {
  return (
    <aside className={`sidebar${isOpen ? " sidebar--open" : ""}`} aria-label="Main navigation">
      <div className="sidebar__header">
        <span className="sidebar__title">Menu</span>
        <button className="icon-btn sidebar__close" onClick={onClose} aria-label="Close menu">
          <Icon name="close" size={20} />
        </button>
      </div>

      <p className="sidebar__section">Track</p>
      <ul className="sidebar__links">
        {LINKS.map((link) => <NavItem key={link.to} link={link} onNavigate={onClose} />)}
      </ul>

      <p className="sidebar__section">Insights</p>
      <ul className="sidebar__links">
        {INSIGHTS.map((link) => <NavItem key={link.to} link={link} onNavigate={onClose} />)}
      </ul>
    </aside>
  );
}
