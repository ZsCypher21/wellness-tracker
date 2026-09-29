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
