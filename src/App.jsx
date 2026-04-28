import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header.jsx";
import AgentsList from "./pages/AgentsList.jsx";
import AgentDetails from "./pages/AgentDetails.jsx";

export default function App() {
  return (
    <div className="app-shell">
      <Header />
      <main className="container">
        <Routes>
          <Route path="/" element={<Navigate to="/agents" replace />} />
          <Route path="/agents" element={<AgentsList />} />
          <Route path="/agents/:agentId" element={<AgentDetails />} />
          <Route path="*" element={<div style={{ padding: 24 }}>Not found</div>} />
        </Routes>
      </main>
    </div>
  );
}