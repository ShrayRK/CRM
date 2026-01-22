import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useCRM } from "../context/CRMContext";
import "./EditLead.css";

const EditLead = () => {
  const { name } = useParams();
  const navigate = useNavigate();
  const { leads, agents, updateLead } = useCRM();

  const lead = leads.find((l) => l.name === name);

  const [formData, setFormData] = useState({
    name: "",
    status: "",
    source: "",
    salesAgentId: "",
    timeToClose: "",
    priority: "",
  });

  useEffect(() => {
    if (lead) {
      setFormData({
        name: lead.name,
        status: lead.status,
        source: lead.source,
        salesAgentId: lead.salesAgentId?._id || "",
        timeToClose: lead.timeToClose,
        priority: lead.priority,
      });
    }
  }, [lead]);

  if (!lead) return <p>Lead not found</p>;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateLead(lead._id, formData);
    navigate(`/leads/${lead.name}`);
  };

  return (
    <div className="edit-lead-page">
      <header className="edit-lead-header">
        <h2>Edit Lead</h2>
      </header>

        <div className="edit-lead-body">
          <aside className="edit-lead-sidebar">
            <h3>Navigation</h3>
            <ul>
              <li><Link to="/">Dashboard</Link></li>
              <li><Link to={`/leads/${lead.name}`}>Lead</Link></li>
            </ul>
          </aside>
               <main className="edit-lead-main">
        <section className="edit-lead-card">
          <header className="edit-lead-card-header">
            <h3>Lead Details</h3>
          </header>

          <form onSubmit={handleSubmit}>
            <div className="field">
              <label>Name</label>
              <input name="name" value={formData.name} onChange={handleChange} />
            </div>

            <div className="field">
              <label>Status</label>
              <select name="status" value={formData.status} onChange={handleChange}>
                <option>New</option>
                <option>Contacted</option>
                <option>Qualified</option>
                <option>Closed</option>
              </select>
            </div>

            <div className="field">
              <label>Source</label>
              <select name="source" value={formData.source} onChange={handleChange}>
                <option>Website</option>
                <option>Referral</option>
                <option>Cold Call</option>
                <option>Advertisement</option>
                <option>Email</option>
                <option>Other</option>
              </select>
            </div>

            <div className="field">
              <label>Sales Agent</label>
              <select
                name="salesAgentId"
                value={formData.salesAgentId}
                onChange={handleChange}
              >
                <option value="">Unassigned</option>
                {agents.map((agent) => (
                  <option key={agent._id} value={agent._id}>
                    {agent.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="field">
              <label>Priority</label>
              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
              >
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </select>
            </div>

            <div className="field">
              <label>Time to Close</label>
              <input
                type="number"
                name="timeToClose"
                value={formData.timeToClose}
                onChange={handleChange}
              />
            </div>

            <button type="submit">Update Lead</button>
          </form>
        </section>
      </main>
        </div>
    </div>
  );
};

export default EditLead;
