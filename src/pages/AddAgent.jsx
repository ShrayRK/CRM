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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email) {
      return toast.error("Please fill all the fields");
    }

    try {
      setLoading(true);
      await createAgent(formData);
      toast.success("Agent added successfully");
      setFormData({ name: "", email: "" });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-agent">
      <header className="add-agent__header">
        <h2>Add Sales Agent</h2>
      </header>

      <div className="add-agent__body">
        <aside className="home__sidebar">
          <h3>Navigation</h3>
          <ul>
            <li><Link to="/">Dashboard</Link></li>
            <li><Link to="/agents">Agents</Link></li>
          </ul>
        </aside>
        <main className="add-agent__main">
        <section className="dashboard-card add-agent__card">
          <header className="dashboard-card__header">
            <h3>Agent Details</h3>
          </header>

          <div className="dashboard-card__content">
            <form className="add-agent__form" onSubmit={handleSubmit}>
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

              <button type="submit" disabled={loading}>
                {loading ? "Saving..." : "Add Agent"}
              </button>
            </form>
          </div>
        </section>
      </main>
      </div>
    </div>
  );
};
