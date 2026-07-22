import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar" aria-label="Main navigation">
      <div className="navbar__brand">Wellness Tracker</div>

      <ul className="navbar__links" role="menubar">
        <li role="none">
          <NavLink role="menuitem" to="/" end>
            Dashboard
          </NavLink>
        </li>

        <li role="none">
          <NavLink role="menuitem" to="/activities">
            Activities
          </NavLink>
        </li>

        <li role="none">
          <NavLink role="menuitem" to="/sleep">
            Sleep
          </NavLink>
        </li>

        <li role="none">
          <NavLink role="menuitem" to="/meditation">
            Meditation
          </NavLink>
        </li>

        <li role="none">
          <NavLink role="menuitem" to="/hydration">
            Hydration
          </NavLink>
        </li>

        <li role="none">
          <NavLink role="menuitem" to="/appointments">
            Appointments
          </NavLink>
        </li>

        <li role="none">
          <NavLink role="menuitem" to="/progress">
            Progress
          </NavLink>
        </li>

        <li role="none">
          <NavLink role="menuitem" to="/settings">
            Settings
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
