/**
 *
 * Purpose:
 * - Provide a simple, friendly 404 message.
 * - Improve user experience by clearly indicating that the
 *   requested page does not exist.
 *
 * Routing:
 * - App.jsx maps all unknown paths ("*") to this component.
 * - Ensures the app handles navigation errors gracefully.
 */

export default function NotFound() {
  return (
    <div style={{ padding: "2rem" }}>
      <h1>404 – Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
    </div>
  );
}
