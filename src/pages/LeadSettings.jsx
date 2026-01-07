// import React, { useMemo } from "react";
// import { useCRM } from "../context/CRMContext";
// import { Link } from "react-router-dom";
// import "./LeadSettings.css";

// const LeadStatusView = () => {
//   const { leads, agents, filters, setFilters, loading } = useCRM();

//   const statuses = useMemo(() => {
//   const allStatuses = leads.map(lead => lead.status);
//   return [...new Set(allStatuses)];
// }, [leads]);

//   const getAgentName = (agentId) => {
//     const agent = agents.find(a => a._id === agentId?._id);
//     return agent ? agent.name : "Unassigned";
//   };

//   const filteredLeads = useMemo(() => {
//     let result = [...leads];
//     if (filters.salesAgentId) {
//       result = result.filter(
//         lead => lead.salesAgentId?._id === filters.salesAgentId
//       );
//     }
//     return result;
//   }, [leads, filters]);

//   const leadsByStatus = useMemo(() => {
//     return statuses.reduce((acc, status) => {
//       acc[status] = filteredLeads.filter(l => l.status === status);
//       return acc;
//     }, {});
//   }, [statuses, filteredLeads]);

//   if (loading) return <p className="loading">Loading leads...</p>;

//   return (
//     <div className="lead-settings-page">
//       <div className="lead-settings-container">
        
//         <header className="lead-settings-header">
//           Lead Status Overview
//         </header>

//         <aside className="lead-settings-sidebar">
//           <Link to="/" className="sidebar-link">
//             ← Back to Dashboard
//           </Link>

//           <div className="filter-box">
//             <h4>Filter by Agent</h4>
//             <select
//               value={filters.salesAgentId}
//               onChange={(e) =>
//                 setFilters({ ...filters, salesAgentId: e.target.value })
//               }
//             >
//               <option value="">All Agents</option>
//               {agents.map(agent => (
//                 <option key={agent._id} value={agent._id}>
//                   {agent.name}
//                 </option>
//               ))}
//             </select>
//           </div>
//         </aside>

//         <main className="lead-settings-main">
//           <div className="status-grid">
//             {statuses.map(status => (
//               <section key={status} className="status-card">
//                 <h3>{status}</h3>
//                 {leadsByStatus[status].length === 0 ? (
//                   <p className="empty">No leads</p>
//                 ) : (
//                   leadsByStatus[status].map(lead => (
//                     <div key={lead._id} className="lead-item">
//                       <div className="lead-name">{lead.name}</div>
//                       <div className="lead-agent">
//                         Agent: {getAgentName(lead.salesAgentId)}
//                       </div>
//                     </div>
//                   ))
//                 )}
//               </section>
//             ))}
//           </div>
//         </main>

//       </div>
//     </div>
//   );
// };

// export default LeadStatusView;

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

  if (loading) return <div className="settings-loading">Loading...</div>;

  return (
    <div className="settings-container">

      <header className="settings-header">
        Settings
      </header>

      <aside className="settings-sidebar">
        <h3>Navigation</h3>
        <ul>
          <li><Link to="/">Dashboard</Link></li>
          <li><Link to="/leads">Leads</Link></li>
          <li><Link to="/agents">Agents</Link></li>
        </ul>
      </aside>

      <main className="settings-main">

        {/* LEADS */}
        <section className="settings-box">
          <h3>All Leads</h3>

          {leads.length === 0 ? (
            <p className="muted">No leads available</p>
          ) : (
            leads.map(lead => (
              <div key={lead._id} className="settings-row">
                <div>
                  <strong>{lead.name}</strong>
                  <div className="muted">{lead.status}</div>
                </div>

                <button
                  className="settings-btn danger"
                  disabled={actionLoading}
                  onClick={() => deleteLead(lead._id)}
                >
                  Delete
                </button>
              </div>
            ))
          )}
        </section>

        {/* AGENTS */}
        <section className="settings-box">
          <h3>All Agents</h3>

          {agents.length === 0 ? (
            <p className="muted">No agents available</p>
          ) : (
            agents.map(agent => (
              <div key={agent._id} className="settings-row">
                <div>
                  <strong>{agent.name}</strong>
                  <div className="muted">{agent.email}</div>
                </div>

                <button
                  className="settings-btn danger"
                  disabled={actionLoading}
                  onClick={() => deleteAgent(agent._id)}
                >
                  Delete
                </button>
              </div>
            ))
          )}
        </section>

      </main>
    </div>
  );
};

export default LeadSettings;

