import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CRMProvider } from './context/CRMContext';
import { ToastContainer } from 'react-toastify';

import { Home } from "./pages/Home";
import { LeadDetails } from "./pages/LeadDetails";
import { Lead } from "./pages/Lead";
import { Agent } from "./pages/Agent";
import { AddAgent } from './pages/AddAgent';
import { AddLead } from './pages/AddLead';
import Reports from './pages/Report';
import SalesAgentView from './pages/Sales';
import LeadStatusView from './pages/LeadSettings';
import FilteredLeads from './pages/LeadByStatus';
import EditLead from './pages/EditLead';

function App() {
  return (
    <div className="App" style={{ backgroundColor: 'black', minHeight: '100vh', color: 'white' }}>
      <CRMProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="leads/:name" element={<LeadDetails />} />
            <Route path="leads" element={<Lead />} />
            <Route path="agents" element={< Agent />} />
            <Route path="addAgent" element={<AddAgent />} />
            <Route path="addLead" element={<AddLead />} />
            <Route path="reports" element={<Reports />} />
            <Route path="sales" element={<SalesAgentView />} />
            <Route path="settings" element={<LeadStatusView />} />
            <Route path="/leads/status/:status" element={<FilteredLeads />} />
            <Route path="/leads/:name/edit" element={<EditLead />} /> 
          </Routes>
          <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        pauseOnHover
      />
        </Router>
      </CRMProvider>
    </div>
  )
}

export default App
