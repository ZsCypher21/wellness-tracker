import PageHeader from "./PageHeader";

// Wrapper used by pages that only need a title and content area
export default function PageContainer({ title, subtitle, icon, color, actions, children }) {
  return (
    <div className="page">
      <PageHeader title={title} subtitle={subtitle} icon={icon} color={color} actions={actions} />
      {children}
    </div>
  );
}
