import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useCRM } from "../context/CRMContext";
import "./LeadDetails.css";

export const LeadDetails = () => {
  const { name } = useParams();
  const {
    leads,
    agents,
    getCommentsByLead,
    addComment,
    deleteComment,
    deleteLead,
  } = useCRM();

  const lead = leads.find((l) => l.name === name);

  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [selectedAgentId, setSelectedAgentId] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (lead?._id) loadComments();
  }, [lead?._id]);

  const loadComments = async () => {
    const data = await getCommentsByLead(lead._id);
    setComments(data);
  };

  const handleComment = async () => {
    if (!commentText.trim() || !selectedAgentId) return;

    await addComment(lead._id, 
      { author: selectedAgentId, commentText });
    
    setCommentText("");
    loadComments();
  };

  const handleDeleteComment = async (commentId) => {
    if (!lead?._id) return;
    await deleteComment(commentId);
    const updatedComments = await getCommentsByLead(lead._id);
    setComments(updatedComments);
  };

  const handleDeleteLead = async () => {
    if (!lead?._id) return;
    const confirmDelete = window.confirm(
      `Are you sure you want to delete "${lead.name}" ?`
    );
    if (!confirmDelete) return;

    try {
      await deleteLead(lead._id);
      navigate("/");
    } catch (error) {
      console.error("Failed to delete lead", error);
    }
  };

  if (!lead) return <div className="lead-details__state">Lead not found</div>;

  return (
    <div className="lead-details">
      <header className="lead-details__header">
        <h2>Lead Details</h2>
      </header>

      <div className="lead-details__body">
        <aside className="lead-details__sidebar">
          <h3>Navigation</h3>
          <ul>
            <li><Link to="/"> Dashboard</Link></li>
            <li><Link to="/leads">All Leads</Link></li>
            <li><Link to={`/addLead`}>+ Add Lead</Link></li>
          </ul>
        </aside>

        <main className="lead-details__main">
          <section className="dashboard-card">
            <header className="dashboard-card__header">
              <h3>Lead Information</h3>
            </header>
            <div className="dashboard-card__content">
              <div><strong>Name:</strong> {lead.name}</div>
              <div>
                <strong>Sales Agent:</strong>{" "}
                {lead.salesAgentId?.name || "Not assigned"}
              </div>
              <div><strong>Status:</strong> {lead.status}</div>
              <div><strong>Source:</strong> {lead.source}</div>
              <div><strong>Priority:</strong> {lead.priority}</div>
              <div><strong>Time to close:</strong> {lead.timeToClose} days</div>
              <div><strong>Tags:</strong> {lead.tags.join(", ")}</div>

              <Link
                to={`/leads/${lead.name}/edit`}
                className="btn primary"
                style={{ marginTop: "12px", display: "inline-block" }}
              >
                Edit Lead
              </Link>

              <button
                className="btn outline lead-details__delete-lead"
                onClick={handleDeleteLead}
              >
                Delete Lead
              </button>
            </div>
          </section>

          <section className="dashboard-card">
            <header className="dashboard-card__header">
              <h3>Comments</h3>
            </header>
            <div className="dashboard-card__content lead-details__comments">
              {comments.length > 0 ? (
                <ul className="lead-details__comment-list">
                  {comments.map((c) => (
                    <li key={c._id} className="lead-details__comment">
                      <div className="lead-details__comment-meta">
                        {c.author?.name || "Unknown"} •{" "}
                        {new Date(c.createdAt).toLocaleString()}
                      </div>
                      <div className="lead-details__comment-text">
                        {c.commentText}
                      </div>
                      <button
                        className="btn outline lead-details__comment-delete"
                        onClick={() => handleDeleteComment(c._id)}
                      >
                        Delete
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="muted">No comments yet</p>
              )}

              <textarea
                placeholder="Add a new comment..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                className="lead-details__comment-input"
              />

              <div className="lead-details__author">
  <label>Comment Author</label>
  <br />
  <select
    value={selectedAgentId}
    onChange={(e) => setSelectedAgentId(e.target.value)}
  >
    <option value="">Select Sales Agent</option>
    {agents.map((agent) => (
      <option key={agent._id} value={agent._id}>
        {agent.name}
      </option>
    ))}
  </select>
</div>


              <button
                onClick={handleComment}
                className="btn primary lead-details__comment-submit"
                disabled={!selectedAgentId || !commentText.trim()}
              >
                Submit Comment
              </button>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};
