export default function MetricCard({ title, value = "TBD" }) {
  return (
    <div className="metric">
      <div className="label">{title}</div>
      <div className="value">{value}</div>
    </div>
  );
}