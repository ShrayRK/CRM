import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCRM } from "../context/CRMContext";
import "./AddAgent.css";
import { toast } from "react-toastify";

export const AddAgent = () => {
  const { createAgent, agentsError } = useCRM();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.name || !formData.email) {
      return toast.error("Please fill all the fields");
    }

    try {
      setLoading(true);
      await createAgent(formData);
      setFormData({ name: "", email: "" });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-agent-page">
      <div className="add-agent-container">
        <header className="add-agent-header">
          Add Sales Agent
        </header>

        <aside className="add-agent-sidebar">
          <Link to="/" className="add-agent-sidebar-link">
            ← Back to Dashboard
          </Link>

          <Link to="/agents" className="add-agent-sidebar-link">
             ← Back to Agents
          </Link>
        </aside>

        <main className="add-agent-main">
          <section className="add-agent-box">
            <h3>Agent Details</h3>

            <form className="add-agent-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Agent Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter agent name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Email ID</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter agent email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              {agentsError && (
                <p className="form-error">{agentsError}</p>
              )}

              <button
                className="submit-btn"
                type="submit"
                disabled={loading}
              >
                {loading ? "Saving..." : "Add Agent"}
              </button>
            </form>
          </section>
        </main>
      </div>
    </div>
  );
};
