import { useMemo, useState } from "react";
import SearchAndFilters from "../components/SearchAndFilters.jsx";
import AgentCard from "../components/AgentCard.jsx";
import { AGENTS } from "../data/agents.js";

export default function AgentsList() {
  const [phase, setPhase] = useState("All Phases");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return AGENTS.filter(a => {
      if (phase !== "All Phases" && a.phase !== phase) return false;
      if (!q) return true;
      return (
        a.name.toLowerCase().includes(q) ||
        a.short.toLowerCase().includes(q) ||
        a.phase.toLowerCase().includes(q)
      );
    });
  }, [phase, query]);

  return (
    <div>
      <h1 className="page-title">EY D&A DE AI agents</h1>
      <p className="page-sub">
        Explore our comprehensive collection of AI agents designed to enhance every phase of the data engineering lifecycle.
      </p>

      <SearchAndFilters phase={phase} setPhase={setPhase} query={query} setQuery={setQuery} />

      <div style={{ marginTop: 18 }}>
        <div className="agent-grid">
          {filtered.map(agent => <AgentCard key={agent.id} agent={agent} />)}
        </div>
      </div>
    </div>
  );
}