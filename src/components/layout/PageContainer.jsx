export default function PageContainer({ title, children }) {
  return (
    <main className="page">
      <header>
        <h2 className="page__title">{title}</h2>
      </header>
      <section className="page__content">{children}</section>
    </main>
  );
}
