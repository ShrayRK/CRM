import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import { useCRM } from "../context/CRMContext";

export const Home = () => {
  const {
    leads,
    loading,
    leadsError,
    agentsError,
  } = useCRM();

  const [selectedStatus, setSelectedStatus] = useState("");

  const handleStatusFilter = (status) => {
    setSelectedStatus(status);
  };

  const clearFilter = () => setSelectedStatus("");

  const filteredLeads = selectedStatus
    ? leads.filter((lead) => lead.status === selectedStatus)
    : leads;

  if (loading) return <div className="home__state">Loading...</div>;
  if (leadsError || agentsError)
    return (
      <div className="home__state">
        Error: {leadsError || agentsError}
      </div>
    );

  return (
    <div className="home">
      <header className="home__header">
        <h2>Anvaya CRM</h2>
      </header>

      <div className="home__body">
        <aside className="home__sidebar">
          <h3>Navigation</h3>
          <ul>
            <li><Link to="/leads">Leads</Link></li>
            <li><Link to="/sales">Sales</Link></li>
            <li><Link to="/agents">Agents</Link></li>
            <li><Link to="/reports">Reports</Link></li>
            <li><Link to="/settings">Settings</Link></li>
          </ul>
        </aside>
        <main className="home__main">
          <section className="dashboard-card">
            <header className="dashboard-card__header">
              <h3>
                Leads {selectedStatus && `( ${selectedStatus} )`}
              </h3>
            </header>

            <div className="dashboard-card__content">
              {filteredLeads.length ? (
                <ul className="home__lead-list">
                  {filteredLeads.slice(0, 6).map((lead) => (
                    <li key={lead._id}>
                      <Link to={`/leads/${lead.name}`}>
                        {lead.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="muted">No leads available</p>
              )}
            </div>

            <footer className="dashboard-card__footer">
              <span>
                {selectedStatus
                  ? `${filteredLeads.length} / ${leads.length}`
                  : `Total: ${leads.length}`}
              </span>
            </footer>
          </section>

          <section className="dashboard-card">
            <header className="dashboard-card__header">
              <h3>Lead Status</h3>
            </header>
            <div className="dashboard-card__content home__stats">
              {["New", "Contacted", "Qualified", "Priority", "Closed"].map(
                (status) => (
                  <div key={status} className="home__stat">
                    <span>{status}</span>
                    <strong>
                      {leads.filter((l) => l.status === status).length}
                    </strong>
                  </div>
                )
              )}
            </div>
          </section>

          <section className="dashboard-card">
            <header className="dashboard-card__header">
              <h3>Quick Actions</h3>
            </header>
            <div className="dashboard-card__content">
              <div className="home__actions">
                {["New", "Contacted", "Qualified", "Priority", "Closed"].map(
                  (status) => (
                    <button
                      key={status}
                      onClick={() => handleStatusFilter(status)}
                    >
                      {status}
                    </button>
                  )
                )}
                  <br /><br />
                <button className="outline" onClick={clearFilter}>
                  Clear Filter
                </button>
                  <br /><br />
                <Link className="primary-link" to="/addLead">
                  + Add Lead
                </Link>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};
