/**
 * Consistent page heading: optional coloured icon, title, subtitle and
 * action buttons on the right (they wrap underneath on small screens).
 */
import Icon from "../ui/Icon";

export default function PageHeader({ title, subtitle, icon, color, actions }) {
  return (
    <div className="page-header">
      <div className="page-header__text">
        {icon && (
          <span className="tile-icon tile-icon--lg" style={{ "--tile-color": color || "var(--brand)" }}>
            <Icon name={icon} size={24} />
          </span>
        )}
        <div>
          <h1 className="page-header__title">{title}</h1>
          {subtitle && <p className="page-header__subtitle">{subtitle}</p>}
        </div>
      </div>
      {actions && <div className="page-header__actions">{actions}</div>}
    </div>
  );
}
