export default function Header() {
  return (
    <header className="header">
      <div className="header-inner">
        <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
          <div className="brand">EY D&A Agents Catalog</div>
          <div style={{ fontSize: 12, opacity: .8 }}>
            (Artifical Intelligence in Data Engineering lifecycle)
          </div>
        </div>
        <nav className="nav" aria-label="Primary">
          <a style={{ color: "#fff", opacity: .75 }} href="#">Home</a>
          <a style={{ color: "#fff", opacity: .75 }} href="#">Agents</a>
          <a style={{ color: "#fff", opacity: .75 }} href="#">Platform</a>
          <a style={{ color: "#fff", opacity: .75 }} href="#">Prompt Library</a>
          <a style={{ color: "#fff", opacity: .75 }} href="#">Challenges</a>
        </nav>
      </div>
    </header>
  );
}