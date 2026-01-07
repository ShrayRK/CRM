import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { useCRM } from "../context/CRMContext";
import "./Sales.css";

const SalesAgentView = () => {
  const {
    leads,
    agents,
    filters,
    setFilters,
    loading,
  } = useCRM();

  const filteredLeads = useMemo(() => {
    let result = [...leads];

    if (filters.salesAgentId) {
      result = result.filter(
        lead => lead.salesAgentId?._id === filters.salesAgentId
      );
    }

    if (filters.status) {
      result = result.filter(
        lead => lead.status === filters.status
      );
    }

    if (filters.priority) {
      result = result.filter(
        lead => lead.priority === filters.priority
      );
    }

    if (filters.sort === "timeToCloseAsc") {
      result = [...result].sort(
        (a,b) => a.timeToClose - b.timeToClose
      );
    }

    if (filters.sort === "timeToCloseDes") {
      result = [...result].sort(
        (a,b) =>b.timeToClose - a.timeToClose
      );
    }

    return result;
  }, [leads, filters]);

  if (loading) return <p className="loading">Loading...</p>;

  return (
    <div className="sales-agent-page">
      <aside className="sidebar">
        <h3>Sidebar</h3>

        <Link to="/" className="sales-sidebar-link">
            ← Back to Dashboard
          </Link>

        <div className="filter-group">
          <label>Sales Agent</label>
          <select
            value={filters.salesAgentId}
            onChange={e =>
              setFilters({ ...filters, salesAgentId: e.target.value })
            }
          >
            <option value="">All Agents</option>
            {agents.map(agent => (
              <option key={agent._id} value={agent._id}>
                {agent.name}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label>Status</label>
          <select
            value={filters.status}
            onChange={e =>
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

        <div className="filter-group">
          <label>Priority</label>
          <select
            value={filters.priority}
            onChange={e =>
              setFilters({ ...filters, priority: e.target.value })
            }
          >
            <option value="">All</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Sort By</label>
          <select
            onChange={e =>
              setFilters({ ...filters, sort: e.target.value })
            }
          >
            <option value="">None</option>
            <option value="timeToCloseAsc">Time to Close Ascending</option>
            <option value="timeToCloseDes">Time to Close Descending</option>
          </select>
        </div>
      </aside>

      <main className="agent-content">
        <h2>Leads by Sales Agent</h2>

        {filters.salesAgentId && (
          <h4 className="agent-name">
            Sales Agent:{" "}
            {
              agents.find(a => a._id === filters.salesAgentId)?.name
            }
          </h4>
        )}

        <div className="lead-list">
          {filteredLeads.length === 0 ? (
            <p className="empty">No leads found</p>
          ) : (
            filteredLeads.map((lead, index) => (
              <div key={lead._id} className="lead-card">
                <div>
                  <strong>Lead {index + 1} - {lead.name}</strong>
                </div>
                <div>Status: <span>{lead.status}</span></div>
                <div>Source: {lead.source}</div>
                <div>Priority: {lead.priority}</div>
                <div>Agent: {lead.salesAgentId?.name || "Unassigned"}</div>
                <div>Time to Close: {lead.timeToClose} Days</div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default SalesAgentView;
