import { Link } from "react-router-dom";

export default function Breadcrumb({ phase }) {
  return (
    <nav className="breadcrumb" aria-label="Breadcrumb">
      <Link to="/agents">← Back to Agents</Link>
      {phase ? <span> / <span className="badge">{phase}</span></span> : null}
    </nav>
  );
}
