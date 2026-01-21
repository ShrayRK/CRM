import React from "react";
import { useCRM } from "../context/CRMContext";
import { Link } from "react-router-dom";
import "./LeadSettings.css";

const LeadSettings = () => {
  const {
    leads = [],
    agents = [],
    deleteLead,
    deleteAgent,
    loading,
    actionLoading
  } = useCRM();

  if (loading) return <div className="lead-settings__state">Loading...</div>;

  return (
    <div className="lead-settings">
      <header className="lead-settings__header">
        <h2>Settings</h2>
      </header>

      <div className="lead-settings__body">
        <aside className="lead-settings__sidebar">
          <h3>Navigation</h3>
          <ul>
            <li><Link to="/">Dashboard</Link></li>
            <li><Link to="/leads">Leads</Link></li>
            <li><Link to="/agents">Agents</Link></li>
          </ul>
        </aside>

        <main className="lead-settings__main">
          <section className="settings-card">
            <header className="settings-card__header">
              <h3>All Leads</h3>
            </header>

            <div className="settings-card__content">
              {leads.length === 0 ? (
                <p className="muted">No leads available</p>
              ) : (
                leads.map((lead) => (
                  <div key={lead._id} className="settings-item">
                    <div>
                      <strong>{lead.name}</strong>
                      <div className="muted">{lead.status}</div>
                    </div>

                    <button
                      disabled={actionLoading}
                      onClick={() => deleteLead(lead._id)}
                    >
                      Delete
                    </button>
                  </div>
                ))
              )}
            </div>
          </section>

          <section className="settings-card">
            <header className="settings-card__header">
              <h3>All Agents</h3>
            </header>

            <div className="settings-card__content">
              {agents.length === 0 ? (
                <p className="muted">No agents available</p>
              ) : (
                agents.map((agent) => (
                  <div key={agent._id} className="settings-item">
                    <strong>{agent.name}</strong>

                    <button
                      disabled={actionLoading}
                      onClick={() => deleteAgent(agent._id)}
                    >
                      Delete
                    </button>
                  </div>
                ))
              )}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default LeadSettings;
