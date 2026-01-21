import React from "react";
import { Link } from "react-router-dom";
import { useCRM } from "../context/CRMContext";
import "./Agent.css";

export const Agent = () => {
  const { agents, loading, agentsError } = useCRM();

  if (loading) return <div className="agent__state">Loading...</div>;
  if (agentsError)
    return <div className="agent__state">Error: {agentsError}</div>;

  return (
    <div className="agent">
      <header className="agent__header">
        <h2>Agents</h2>
      </header>

      <div className="agent__body">
        <aside className="agent__sidebar">
          <h3>Navigation</h3>
          <ul>
          <li>
            <Link to="/"> Dashboard</Link>
          </li>
          <li>
            <Link to="/addAgent">+ Add Agents</Link>
          </li>
          </ul>
        </aside>

        <main className="agent__main">
          <section className="dashboard-card">
            <header className="dashboard-card__header">
              <h3>Overview</h3>
            </header>

            <div className="dashboard-card__content">
              <p>Total Agents: <strong>{agents.length}</strong></p>
            </div>
          </section>
          <section className="dashboard-card agent__list-card">
            <header className="dashboard-card__header">
              <h3>All Agents</h3>
            </header>

            <div className="dashboard-card__content">
              {agents.length > 0 ? (
                <ul className="agent__list">
                  {agents.map(agent => (
                    <li key={agent._id} className="agent__list-item">
                      <span className="agent__name">{agent.name}</span>
                      <span className="agent__email">{agent.email}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="muted">No agents found</p>
              )}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};
