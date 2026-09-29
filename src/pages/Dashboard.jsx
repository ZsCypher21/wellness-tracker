<<<<<<< HEAD
import ProgressDashboard from '../components/features/ProgressDashboard';

export default function Dashboard() {
  return (
    <div className="dashboard-page">
      <h2 className="dashboard-title">Dashboard</h2>

      <div className="dashboard-grid">
        <ProgressDashboard />
      </div>
    </div>
  );
}
=======
/**
 * Responsibilities:
 * - Provide a clean landing page after login.
 * - Display high‑level wellness metrics using ProgressDashboard.
 * - Use dashboard-specific layout classes for spacing and grid structure.
 *
 * Architecture:
 * - Acts as the authenticated "home" page.
 * - Uses a simple wrapper + grid layout to keep the dashboard flexible.
 * - ProgressDashboard handles all metric calculations and card rendering.
 */

import ProgressDashboard from '../components/features/ProgressDashboard';

export default function Dashboard() {
  return (
    <div className="dashboard-page">
      {/* Page title */}
      <h2 className="dashboard-title">Dashboard</h2>

      {/* Responsive grid container for dashboard cards */}
      <div className="dashboard-grid">
        <ProgressDashboard />
      </div>
    </div>
  );
}
>>>>>>> c2d5a7186b0cd3d7657a3ffe8873d7665b9f319d
