export default function Tag({ children }) {
  return (
    <span style={{
      display: "inline-block",
      padding: "6px 10px",
      borderRadius: 999,
      background: "#eef2f6",
      border: "1px solid #e3e8ef",
      color: "#334155",
      fontSize: 12,
      marginRight: 6,
      marginBottom: 6
    }}>
      {children}
    </span>
  );
}