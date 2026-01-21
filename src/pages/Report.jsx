import React from "react";
import { Link } from "react-router-dom";
import { useCRM } from "../context/CRMContext";
import LeadsPipelinePie from "../components/LeadsPipelinePie";
import LeadsByAgentBar from "../components/LeadsByAgentBar";
import LeadStatusChart from "../components/LeadStatusChart";
import "./Report.css";

const Reports = () => {
  const { leads, agents, loading } = useCRM();

  if (loading) {
    return <div className="reports-loading">Loading reports...</div>;
  }

  return (
    <div className="reports-page">
      <header className="reports__header">
        <h2>CRM Reports</h2>
      </header>

      <div className="reports__body">
        <aside className="reports__sidebar">
                  <h3>Navigation</h3>
                  <ul>
                    <li><Link to="/">
           Dashboard
        </Link></li>
                  </ul>
                </aside>

        <main className="reports-content">
        <div className="reports-grid">

          <section className="report-card">
            <h3>Total Leads: Closed vs Pipeline</h3>
            <div className="chart-wrapper">
              <LeadsPipelinePie leads={leads} />
            </div>
          </section>

          <section className="report-card">
            <h3>Leads Closed by Sales Agent</h3>
            <div className="chart-wrapper">
              <LeadsByAgentBar leads={leads} agents={agents} />
            </div>
          </section>

          <section className="report-card full-width">
            <h3>Lead Status Distribution</h3>
            <div className="chart-wrapper">
              <LeadStatusChart leads={leads} />
            </div>
          </section>

        </div>
      </main>
      </div>
    </div>
  );
};

export default Reports;
