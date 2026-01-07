import React, { createContext, useState, useContext } from 'react';
import useFetch from '../useFetch';
import { toast } from "react-toastify";

const CRMContext = createContext();

export const useCRM = () => useContext(CRMContext);

export const CRMProvider = ({ children }) => {
  const [actionLoading, setActionLoading] = useState(false);
  const [filters, setFilters] = useState({
    salesAgentId: '',
    status: '',
    source: '',
    priority: '',
    tags: [],
  });

  const {
    data: leads,
    loading: leadsLoading,
    error: leadsError,
    refetch: refetchLeads,      
  } = useFetch('https://crm-backend-blush-ten.vercel.app/leads',[]);

  const {
    data: agents,
    loading: agentsLoading,
    error: agentsError,
    refetch: refetchAgents,      
  } = useFetch('https://crm-backend-blush-ten.vercel.app/agents',[]);

  const getCommentsByLead = async (leadId) => {
    try {
      const res = await fetch (
        `https://crm-backend-blush-ten.vercel.app/leads/${leadId}/comments`
      );
      return await res.json();
    } catch (error) {
      console.error("Error fetching comments, error");
      return [];
    }
  };

  const addComment = async (leadId, commentData) => {
    try {
      setActionLoading(true);
      await fetch(
        `https://crm-backend-blush-ten.vercel.app/leads/${leadId}/comments`,
        {
          method: "POST",
          headers: {"Content-Type" : "application/json"},
          body: JSON.stringify(commentData),
        }
      );
    } catch (error) {
      console.error("Error adding comment", error);
      throw error;
    } finally {
      setActionLoading(false);
    }
  };

const deleteComment = async (commentId) => {
  try {
    setActionLoading(true);
    await fetch(
      `https://crm-backend-blush-ten.vercel.app/comments/${commentId}`,
      {
        method: "DELETE",
      }
    );
  } catch (error) {
    console.error("Error deleting comment", error);
    throw error;
  } finally {
    setActionLoading(false);
  }
};


  const createLead = async (leadData) => {
    try {
      setActionLoading(true);

      const res = await fetch(
        'https://crm-backend-blush-ten.vercel.app/leads', 
        {
           method: 'POST',
           headers: {
              'Content-Type': 'application/json',
           },
           body: JSON.stringify(leadData),
        });

        if (!res.ok) {
           throw new Error("Failed to create lead");
          }

     toast.success("Lead created successfully!");
     refetchLeads();
    } catch (error) {
     console.log('Error creating lead:',error);
     toast.error("Failed to create lead.")
     throw error;
    } finally {
     setActionLoading(false);
    }
  };

  const updateLead = async (id, leadData) => {
    try {
     setActionLoading(true);
     await fetch(`https://crm-backend-blush-ten.vercel.app/leads/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(leadData),
     });
     toast.success("Lead updated successfully!");
     refetchLeads();
    } catch (error) {
      console.error('Error updating lead:', error);
      throw error;
    } finally {
     setActionLoading(false);
    }   
  };

  const deleteLead = async (id) => {
    try {
      setActionLoading(true);
      await fetch(`https://crm-backend-blush-ten.vercel.app/leads/${id}`, {
        method: 'DELETE',
      });
      toast.success("Lead deleted successfully!");
      refetchLeads();
    } catch (error) {
      console.error('Error deleting lead:', error);
      throw error;
    } finally {
      setActionLoading(false);
    }
  };

  const createAgent = async (agentData) => {
    try {
      await fetch('https://crm-backend-blush-ten.vercel.app/agents', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(agentData),
      });
      toast.success("Agent created successfully!");
      refetchAgents();
    } catch (error) {
      console.error('Error creating agent:', error);
      throw error;
    }finally {
      setActionLoading(false);
    }
  };
  
      const deleteAgent = async (id) => {
    try {
      setActionLoading(true);
      const res = await fetch(`https://crm-backend-blush-ten.vercel.app/agents/${id}`, {
        method: 'DELETE',
      });
      console.log(id);
      const text = await res.text();
      let data;
      try {
        data = text ? JSON.parse(text) : {};
      } catch {
        data = {};
      }
      if(!res.ok){
        toast.error(data.error || "Agent not found.");
        return;
      }
      
      console.log(deleteAgent);
      toast.success("Agent deleted successfully!");
      refetchAgents();
    } catch (error) {
      toast.error("Failed to delte agent");
      console.error('Error deleting agent:', error);
    } finally {
      setActionLoading(false);
    }
  };

  const value = {
    leads: Array.isArray(leads) ? leads : [],
    agents: Array.isArray(agents) ? agents : [], 
    loading: leadsLoading || agentsLoading || actionLoading,
    filters,
    setFilters,
    createLead,
    updateLead,
    deleteLead,
    createAgent,
    deleteAgent,
    getCommentsByLead,
    addComment,
    deleteComment,
    leadsError,
    agentsError
  };

  return <CRMContext.Provider value={value}>{children}</CRMContext.Provider>;
};

export default CRMProvider;