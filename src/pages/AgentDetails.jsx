import { Link, useParams } from "react-router-dom";
import Tabs from "../components/Tabs.jsx";
import Breadcrumb from "../components/Breadcrumb.jsx";
import Tag from "../components/Tag.jsx";
import MetricCard from "../components/MetricCard.jsx";
import { AGENTS, fakeDemoRun } from "../data/agents.js";
import { useMemo, useState } from "react";
import VideoEmbed from "../components/VideoEmbed.jsx";

export default function AgentDetails() {
  const { agentId } = useParams();
  const agent = useMemo(() => AGENTS.find(a => a.id === agentId), [agentId]);

  const [prompt, setPrompt] = useState("Generating accessibility compliance reports for UI screens");
  const [files, setFiles] = useState([]);
  const [running, setRunning] = useState(false);
  const [result, setResult] = useState(null);
  const [logs, setLogs] = useState([]);

  if (!agent) return <div style={{ padding: 24 }}>Agent not found.</div>;

  function onFilesSelected(e) {
    setFiles(Array.from(e.target.files || []));
  }

  async function runDemo() {
    setRunning(true);
    setResult(null);
    setLogs(["Agent Orchestration, Planning, Task Execution"]);
    const out = await fakeDemoRun(prompt);
    setResult(out);
    setRunning(false);
  }

  const tabs = [
    {
      label: "Functionality",
      content: (
        <div className="grid-two">
          <div className="section">
            <h4>Capabilities</h4>
            <ul>
              {agent.capabilities.map((c) => <li key={c}>{c}</li>)}
            </ul>
          </div>
          <div className="section">
            <h4>Skills</h4>
            <ul>
              {agent.skills.map((s) => <li key={s}>{s}</li>)}
            </ul>
          </div>
          <div className="section">
            <h4>Examples</h4>
            <ul>
              {agent.examples.map((e) => <li key={e}>{e}</li>)}
            </ul>
          </div>
          <div className="footer-actions">
            <span className="btn ghost small">Docker Image</span>
            <span className="btn ghost small">API Link</span>
          </div>
        </div>
      )
    },
    {
      label: "Tech Spec",
      content: (
        <div className="grid-two">
          <div className="section">
            <h4>Technologies</h4>
            <div>
              {agent.tech.technologies.map(t => <Tag key={t}>{t}</Tag>)}
            </div>
          </div>
          <div className="section">
            <h4>Integrations</h4>
            <div>{agent.tech.integrations.map(t => <Tag key={t}>{t}</Tag>)}</div>
          </div>
          <div className="section">
            <h4>Platform/ToolName</h4>
            <div><Tag>{agent.tech.platform}</Tag></div>
          </div>

          <div className="section" style={{ gridColumn: "1 / -1" }}>
            <h4>Performance</h4>
            <div className="metrics">
              {agent.metrics[0].items.map(m => <MetricCard key={m} title={m} />)}
            </div>
          </div>

          <div className="section" style={{ gridColumn: "1 / -1" }}>
            <h4>Accuracy</h4>
            <div className="metrics">
              {agent.metrics[1].items.map(m => <MetricCard key={m} title={m} />)}
            </div>
          </div>

          <div className="section" style={{ gridColumn: "1 / -1" }}>
            <h4>Cost and Observability</h4>
            <div className="metrics">
              {agent.metrics[2].items.map(m => <MetricCard key={m} title={m} />)}
            </div>
          </div>

          <div className="footer-actions">
            <span className="btn ghost small">Docker Image</span>
            <span className="btn ghost small">API Link</span>
          </div>
        </div>
      )
    },
    {
      label: "Demo",
      content: (
        <div className="grid-two">
          <div className="section">
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
              <h4>Selected Agents</h4>
              <span className="badge">1 Selected</span>
            </div>
            <div className="card" style={{ marginTop: 8 }}>
              <div className="card-body" style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span className="badge">{agent.phase}</span>
                <div style={{ fontWeight: 700 }}>{agent.name}</div>
                <span style={{ marginLeft: "auto", fontSize: 12, color: "#16a34a" }}>Active</span>
              </div>
            </div>

            <div className="section" style={{ marginTop: 12 }}>
              <h4>Agent Orchestration, Planning, Task Execution</h4>
              <div style={{ color: "#64748b", fontSize: 13 }}>
                {logs.length ? "Logs available" : "No logs to display"}
              </div>
            </div>
          </div>

<div className="section" style={{ paddingTop: 12 }}>
  <h4 style={{ marginBottom: 8 }}>Video Demo</h4>
  <VideoEmbed
    url={agent.demoVideoUrl}   // set a valid, embeddable URL in data/agents.js
    autoplay={false}
    muted={true}
    loop={false}
    controls={true}
    useNoCookie={false}        // try true if corporate policy blocks regular YouTube
  />
</div>

          <div className="section">
            <h4>Prompt</h4>
            <textarea
              rows={5}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              style={{ width: "100%", resize: "vertical", padding: 10, borderRadius: 8, border: "1px solid #e5e7eb" }}
              aria-label="Demo prompt"
              placeholder="Example: Generating accessibility compliance reports for UI screens"
            />

            <div style={{ marginTop: 12 }}>
              <h4>Upload Files</h4>
              <label className="upload">
                <div>Drag and drop or click to upload</div>
                <input type="file" multiple onChange={onFilesSelected} style={{ display: "none" }} />
              </label>
              {files.length ? (
                <ul style={{ marginTop: 8, fontSize: 13 }}>
                  {files.map(f => <li key={f.name} className="mono">{f.name} ({Math.round(f.size/1024)} KB)</li>)}
                </ul>
              ) : null}
            </div>

            <button className="btn primary" style={{ width: "100%", marginTop: 12 }} onClick={runDemo} disabled={running}>
              {running ? "Running…" : "Run Demo"}
            </button>

            <div style={{ marginTop: 12 }}>
              <h4>Results</h4>
              {!result ? <div className="result" style={{ opacity: .7 }}>Results will appear here after processing</div> :
                <div className="result">
                  <div><strong>{result.summary}</strong></div>
                  <ul>{result.details.map((d,i)=> <li key={i}>{d}</li>)}</ul>
                  <div>Score: {(result.score*100).toFixed(0)}%</div>
                </div>}
            </div>

            <div className="footer-actions">
              <span className="btn ghost small">Docker Image</span>
              <span className="btn ghost small">API Link</span>
            </div>
          </div>
        </div>
      )
    },
    {
      label: "Agent Skill",
      content: (
        <div className="grid-two">
          <div className="section" style={{ gridColumn: "1 / -1" }}>
            <h4>Agent Skills Details</h4>
            <div className="row" style={{ marginTop: 8 }}>
              <a href={agent.skillDetails.downloadUrl} className="btn small" onClick={(e)=>e.preventDefault()}>
                ⬇ Download Bundle
              </a>
            </div>
            <div style={{ marginTop: 12, display: "grid", gap: 10 }}>
              {agent.skillDetails.fields.map(([field, desc]) => (
                <div key={field} className="card">
                  <div className="card-body">
                    <div style={{ fontWeight: 700, marginBottom: 4 }}>{field}</div>
                    <div style={{ whiteSpace: "pre-wrap" }}>{desc}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="footer-actions">
              <span className="btn ghost small">Docker Image</span>
              <span className="btn ghost small">API Link</span>
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <div>
      <Breadcrumb phase={agent.phase} />
      <div className="card" style={{ marginTop: 8 }}>
        <div className="card-body">
          <div className="badge" style={{ marginBottom: 6 }}>{agent.phase}</div>
          <h2 className="page-title" style={{ margin: 0 }}>{agent.name}</h2>
          <div className="page-sub" style={{ marginBottom: 0 }}>
            This agent will monitor the Azure Data Factory Pipeline in real time and notify with root cause and next steps with self healing in standard errors.
          </div>
        </div>
      </div>

      <div style={{ marginTop: 12 }}>
        <Tabs tabs={tabs} initial={0} />
      </div>
    </div>
  );
}