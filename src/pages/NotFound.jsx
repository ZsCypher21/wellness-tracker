import { Link } from "react-router-dom";
import EmptyState from "../components/ui/EmptyState";

// Shown for any unknown route
export default function NotFound() {
  return (
    <div className="page">
      <div className="card">
        <EmptyState
          icon="alert"
          title="Page not found"
          text="The page you’re looking for doesn’t exist or has moved."
          action={<Link className="btn btn--primary" to="/dashboard">Go to dashboard</Link>}
        />
      </div>
    </div>
  );
}
