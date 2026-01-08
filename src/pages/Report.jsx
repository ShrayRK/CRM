import React from "react";
import { Link } from "react-router-dom";
import { useCRM } from "../context/CRMContext";
import LeadsPipelinePie from "../components/LeadsPipelinePie";
import LeadsByAgentBar from "../components/LeadsByAgentBar";
import LeadStatusChart from "../components/LeadStatusChart";
import "./Report.css";

const Reports = () => {
  const { leads, agents, loading } = useCRM();

  if (loading) return <p className="loading">Loading reports...</p>;

  return (
    <div className="reports-page">
      <div className="reports-container">
        <div className="reports-header">
          CRM Reports
        </div>

        <aside className="reports-sidebar">
          <Link to="/" className="reports-sidebar-link">
            ← Back to Dashboard
          </Link>
        </aside>

        <main className="reports-main">
          <div className="report-grid">
            <div className="report-card">
              <h3>Total Leads: Closed vs Pipeline</h3>
              <LeadsPipelinePie leads={leads} />
            </div>

            <div className="report-card">
              <h3>Leads Closed by Sales Agent</h3>
               <div className="chart-wrapper">
                    <LeadsByAgentBar leads={leads} agents={agents} />
               </div>
            </div>

            <div className="report-card">
              <h3>Lead Status Distribution</h3>
              <LeadStatusChart leads={leads} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Reports;