import Icon from "./Icon";

// Friendly placeholder shown when a list has no entries yet
export default function EmptyState({ icon = "sparkle", color, title, text, action }) {
  return (
    <div className="empty-state">
      <span className="tile-icon tile-icon--lg" style={{ "--tile-color": color || "var(--brand)" }}>
        <Icon name={icon} size={24} />
      </span>
      <p className="empty-state__title">{title}</p>
      {text && <p className="empty-state__text">{text}</p>}
      {action}
    </div>
  );
}
