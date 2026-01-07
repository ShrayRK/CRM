import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Home.css";
import { useCRM } from "../context/CRMContext";

export const Home = () => {

  const {
    leads,
    agents,
    loading,
    leadsError,
    agentsLoading,
    agentsError,
  } = useCRM();

  const [selectedStatus, setSelectedStatus] = useState("");

  const navigate = useNavigate();

  const handleStatusFilter = (status) => {
    // navigate(`/leads/status/${status}`);
    setSelectedStatus(status);
  };

  const clearFilter = () => setSelectedStatus("");

  const filteredLeads = selectedStatus 
  ? leads.filter((lead) => lead.status === selectedStatus)
  : leads;

  if (loading) return <div style={{ color: "white", padding: "20px" }}>Loading...</div>;
  if (leadsError || agentsError) return <div style={{ color: "white", padding: "20px" }}>Error: {leadsError || agentsError}</div>;

  return (
    <div className="crm-container">

      <header className="crm-header">
        Anvaya CRM Dashboard
      </header>

      <aside className="crm-sidebar">
        <h3>Sidebar</h3>
        <ul>
          <li><Link to="/leads">Leads</Link></li>
          <li><Link to="/sales">Sales</Link></li>
          <li><Link to="/agents">Agents</Link></li>
          <li><Link to="/reports">Reports</Link></li>
          <li><Link to="/settings">Settings</Link></li>
        </ul>
      </aside>

      <main className="crm-main">

        <section className="crm-box1">
          <h3>Main Board</h3>
        </section>

        <section className="crm-box">
          <h3>Leads {selectedStatus && `(Status: ${selectedStatus})`}</h3>
          {leads?.length > 0 ? (
            <ul className="lead-list-inline">
              {filteredLeads.slice(0, 5).map((lead) => (
                <li key={lead._id}>
                  <Link to={`/leads/${lead.name}`} className="lead-link">
                    {lead.name}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p>No leads available</p>
          )}

          <p style={{ marginTop: "40px", marginBottom: "0%", fontSize: "20px" }}>{selectedStatus ? 
          `Showing: ${filteredLeads.length} / ${leads.length}` : `Total Leads: ${leads.length}`}</p>
        </section>

        <section className="crm-box">
          <h3>Lead Status</h3>
          <p>New: {leads.filter(l => l.status === "New").length} Leads  </p>
          <p>Contacted: {leads.filter(l => l.status === "Contacted").length} Leads</p>
          <p>Qualified: {leads.filter(l => l.status === "Qualified").length} Leads</p>
          <p>Priority: {leads.filter(l => l.status === "Priority").length} Leads</p>
          <p>Closed: {leads.filter(l => l.status === "Closed").length} Leads</p>
        </section>

        <section className="crm-box">
          <h3>Quick Filters</h3>
          <p>By status</p>

          <button onClick={() => handleStatusFilter("New")}>New</button>
          <button onClick={() => handleStatusFilter("Contacted")}>Contacted</button>
          <button onClick={() => handleStatusFilter("Qualified")}>Qualified</button>
          <button onClick={() => handleStatusFilter("Priority")}>Priority</button>
          <button onClick={() => handleStatusFilter("Closed")}>Closed</button>
          <br /><br />
          <button onClick={clearFilter}>Clear Filter</button>
          <br /><br />
          <Link to="/addLead" className="add-lead-link">Add Lead</Link>
        </section>

      </main>

    </div>
  );
};
