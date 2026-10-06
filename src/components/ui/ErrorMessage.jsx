import Icon from "./Icon";

export default function ErrorMessage({ message }) {
  return (
    <div className="alert alert--error" role="alert">
      <Icon name="alert" size={18} />
      <span>{message || "Something went wrong."}</span>
    </div>
  );
}
