import React, { useState } from "react";
import { useCRM } from "../context/CRMContext";
import { Link } from "react-router-dom";
import "./AddLead.css";
import { toast } from "react-toastify";

export const AddLead = () => {
  const { agents, createLead, agentsError } = useCRM();

  const [formData, setFormData] = useState({
    name: "",
    source: "Website",
    salesAgentId: "",
    status: "New",
    priority: "Medium",
    timeToClose: "",
    tags: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.salesAgentId || !formData.timeToClose) {
      toast.error("Please fill all the fields");
      return;
    }

    try {
      setLoading(true);
      await createLead({
        ...formData,
        timeToClose: Number(formData.timeToClose),
        tags: formData.tags
          ? formData.tags.split(",").map((t) => t.trim())
          : [],
      });

      setFormData({
        name: "",
        source: "Website",
        salesAgentId: "",
        status: "New",
        priority: "Medium",
        timeToClose: "",
        tags: "",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-lead-page">
      <header className="add-lead-header">
        <h2>Create New Lead</h2>
      </header>

     <div className="add-lead-body">
      <aside className="add-lead-sidebar">
        <h3>Navigation</h3>
        <ul>
          <li><Link to="/">Dashboard</Link></li>
        </ul>
      </aside>
       <main className="add-lead-main">
        <section className="add-lead-card">
          <header className="add-lead-card-header">
            <h3>Lead Details</h3>
          </header>

          <form onSubmit={handleSubmit}>
            <div className="field">
              <label>Lead Name</label>
              <input name="name" value={formData.name} onChange={handleChange} />
            </div>

            <div className="field">
              <label>Lead Source</label>
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
                <option value="">Select Sales Agent</option>
                {agentsError && <option>Error loading agents</option>}
                {agents.map((agent) => (
                  <option key={agent._id} value={agent._id}>
                    {agent.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="field">
              <label>Status</label>
              <select name="status" value={formData.status} onChange={handleChange}>
                <option>New</option>
                <option>Contacted</option>
                <option>Qualified</option>
                <option>Proposal Sent</option>
                <option>Closed</option>
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
              <label>Time to Close (Days)</label>
              <input
                type="number"
                name="timeToClose"
                value={formData.timeToClose}
                onChange={handleChange}
              />
            </div>

            <div className="field">
              <label>Tags</label>
              <input
                name="tags"
                placeholder="Comma separated tags"
                value={formData.tags}
                onChange={handleChange}
              />
            </div>

            <button disabled={loading}>
              {loading ? "Creating..." : "Create Lead"}
            </button>
          </form>
        </section>
      </main>
     </div>
    </div>
  );
};
