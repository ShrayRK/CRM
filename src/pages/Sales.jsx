import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { useCRM } from "../context/CRMContext";
import "./Sales.css";

const SalesAgentView = () => {
  const { leads, agents, filters, setFilters, loading } = useCRM();

  const filteredLeads = useMemo(() => {
    let result = [...leads];

    if (filters.salesAgentId) {
      result = result.filter(
        (lead) => lead.salesAgentId?._id === filters.salesAgentId
      );
    }

    if (filters.status) {
      result = result.filter((lead) => lead.status === filters.status);
    }

    if (filters.priority) {
      result = result.filter((lead) => lead.priority === filters.priority);
    }

    if (filters.sort === "timeToCloseAsc") {
      result = [...result].sort((a, b) => a.timeToClose - b.timeToClose);
    }

    if (filters.sort === "timeToCloseDes") {
      result = [...result].sort((a, b) => b.timeToClose - a.timeToClose);
    }

    return result;
  }, [leads, filters]);

  if (loading) return <div className="sales__state">Loading...</div>;

  return (
    <div className="sales">
      <header className="sales__header">
        <h2>Sales View</h2>
      </header>

      <div className="sales__body">
        <aside className="sales__sidebar">
          <h3>Filters</h3>

         <ul>
          <li>
             <Link to="/">
             Dashboard
          </Link>
          </li>
         </ul>

          <div className="sales__filter">
            <label>Sales Agent</label>
            <select
              value={filters.salesAgentId}
              onChange={(e) =>
                setFilters({ ...filters, salesAgentId: e.target.value })
              }
            >
              <option value="">All Agents</option>
              {agents.map((agent) => (
                <option key={agent._id} value={agent._id}>
                  {agent.name}
                </option>
              ))}
            </select>
          </div>

          <div className="sales__filter">
            <label>Status</label>
            <select
              value={filters.status}
              onChange={(e) =>
                setFilters({ ...filters, status: e.target.value })
              }
            >
              <option value="">All</option>
              <option value="New">New</option>
              <option value="Contacted">Contacted</option>
              <option value="Qualified">Qualified</option>
              <option value="Priority">Priority</option>
              <option value="Closed">Closed</option>
            </select>
          </div>

          <div className="sales__filter">
            <label>Priority</label>
            <select
              value={filters.priority}
              onChange={(e) =>
                setFilters({ ...filters, priority: e.target.value })
              }
            >
              <option value="">All</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>

          <div className="sales__filter">
            <label>Sort By</label>
            <select
              value={filters.sort}
              onChange={(e) =>
                setFilters({ ...filters, sort: e.target.value })
              }
            >
              <option value="">None</option>
              <option value="timeToCloseAsc">Time to Close ↑</option>
              <option value="timeToCloseDes">Time to Close ↓</option>
            </select>
          </div>
        </aside>

        <main className="sales__main">
          <section className="dashboard-card sales__list-card">
            <header className="dashboard-card__header">
              <h3>
                Leads
                {filters.salesAgentId &&
                  ` — ${
                    agents.find(
                      (a) => a._id === filters.salesAgentId
                    )?.name
                  }`}
              </h3>
            </header>

            <div className="dashboard-card__content">
              {filteredLeads.length === 0 ? (
                <p className="muted">No leads found</p>
              ) : (
                <ul className="sales__list">
                  {filteredLeads.map((lead, index) => (
                    <li key={lead._id} className="sales__item">
                      <div className="sales__title">
                        Lead {index + 1} — {lead.name}
                      </div>

                      <div className="sales__meta">
                        <span>Status: {lead.status}</span>
                        <span>Priority: {lead.priority}</span>
                        <span>Source: {lead.source}</span>
                        <span>
                          Agent:{" "}
                          {lead.salesAgentId?.name || "Unassigned"}
                        </span>
                        <span>
                          Time to Close: {lead.timeToClose} days
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default SalesAgentView;
