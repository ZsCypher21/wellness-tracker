export default function Footer() {
  return (
    <footer className="footer" aria-label="Site footer">
      © {new Date().getFullYear()} Wellness Tracker · Built with React, Express &amp; PostgreSQL
    </footer>
  );
}
