import React from "react";
import { Link } from "react-router-dom";
import "./Lead.css";
import { useCRM } from "../context/CRMContext";

export const Lead = () => {
  const { leads, loading, leadsError } = useCRM();

  if (loading) return <div className="lead__state">Loading...</div>;
  if (leadsError) return <div className="lead__state">Error: {leadsError}</div>;

  return (
    <div className="lead">
      <header className="lead__header">
        <h2>All Leads</h2>
      </header>

      <div className="lead__body">
        <aside className="lead__sidebar">
          <h3>Navigation</h3>
          <ul>
            <li>
              <Link to="/"> Dashboard</Link>
            </li>
            <li>
              <Link to="/addLead">+ Add Lead</Link>
            </li>
          </ul>
        </aside>

        <main className="lead__main">
          <section className="dashboard-card">
            <header className="dashboard-card__header">
              <h3>Lead Overview</h3>
            </header>

            <div className="dashboard-card__content">
              <p>Total Leads: {leads.length}</p>
            </div>
          </section>

          <section className="dashboard-card lead__list-card">
            <header className="dashboard-card__header">
              <h3>Leads</h3>
            </header>

            <div className="dashboard-card__content">
              {leads.length > 0 ? (
                <ul className="lead__list">
                  {leads.map((lead) => (
                    <li key={lead._id} className="lead__item">
                      <Link
                        className="lead__name"
                        to={`/leads/${lead.name}`}
                      >
                        {lead.name}
                      </Link>

                      <span className="lead__meta">
                        {lead.status} •{" "}
                        {lead.salesAgentId?.name || "Unassigned"}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="muted">No leads available.</p>
              )}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};
