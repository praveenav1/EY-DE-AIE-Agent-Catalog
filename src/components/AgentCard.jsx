import { Link } from "react-router-dom";

export default function AgentCard({ agent }) {
  return (
    <article className="card">
      <img className="thumb" src={agent.img} alt="" />
      <div className="card-body">
        <span className="badge">{agent.phase}</span>
        <h3 style={{ marginTop: 8 }}>{agent.name}</h3>
        <p>{agent.short}</p>

        <div style={{ marginTop: 10 }}>
          <Link className="btn small" to={`/agents/${agent.id}`}>
            Learn More →
          </Link>
        </div>
      </div>
    </article>
  );
}
``