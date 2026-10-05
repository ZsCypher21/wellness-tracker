export default function ErrorMessage({ message }) {
  return (
    <div style={{
      background: "#ffe6e6",
      border: "1px solid #ffb3b3",
      padding: "1rem",
      borderRadius: "var(--radius)",
      color: "#b30000",
      marginBottom: "1rem"
    }}>
      {message || "Something went wrong."}
    </div>
  );
}
