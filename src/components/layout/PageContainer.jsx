/**
 * Shared layout wrapper used by all main pages.
 *
 * Notes:
 * - Very small component, so comments focus only on its purpose.
 * - Provides consistent semantic structure: <main>, <header>, <section>.
 * - All feature pages plug their content into this container.
 *
 * Responsibilities:
 * - Render a page title.
 * - Wrap page content in a consistent layout block.
 */

export default function PageContainer({ title, children }) {
  return (
    <main className="page">
      <header>
        <h2 className="page__title">{title}</h2>
      </header>

      {/* Page-specific content injected by the parent */}
      <section className="page__content">{children}</section>
    </main>
  );
}
