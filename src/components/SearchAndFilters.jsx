import { PHASES } from "../data/agents";

export default function SearchAndFilters({ phase, setPhase, query, setQuery }) {
  return (
    <>
      <div className="searchbar">
        <select
          value={phase}
          onChange={(e) => setPhase(e.target.value)}
          aria-label="Phase filter"
        >
          {PHASES.map(p => <option key={p} value={p}>{p}</option>)}
        </select>
        <input
          type="search"
          placeholder="Search agents by name, description, phase, or tag…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search agents"
        />
      </div>

      <div style={{ marginTop: 12 }}>
        <div className="chips" role="tablist" aria-label="Phase chips">
          {PHASES.map(p => (
            <button
              key={p}
              className={`chip ${phase === p ? "active" : ""}`}
              onClick={() => setPhase(p)}
              role="tab"
              aria-selected={phase === p}
            >
              {p}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}