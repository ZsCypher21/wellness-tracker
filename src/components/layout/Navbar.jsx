import { NavLink } from 'react-router-dom';

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar__brand">Wellness Tracker</div>
      <nav className="navbar__links">
        <NavLink to="/dashboard">Dashboard</NavLink>
        <NavLink to="/activities">Activities</NavLink>
        <NavLink to="/sleep">Sleep</NavLink>
        <NavLink to="/meditation">Meditation</NavLink>
        <NavLink to="/hydration">Hydration</NavLink>
        <NavLink to="/appointments">Appointments</NavLink>
        <NavLink to="/progress">Progress</NavLink>
        <NavLink to="/settings">Settings</NavLink>
      </nav>
    </header>
  );
}
