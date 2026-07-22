export default function PageContainer({ title, children }) {
  return (
    <main className="page">
      {title && <h1 className="page__title">{title}</h1>}
      <section className="page__content">{children}</section>
    </main>
  );
}
