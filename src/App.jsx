// App.js - Updated with Admin routes
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/themeContext';
import { AuthProvider } from './context/authContext';
import Navbar from './components/Navbar';
import RoleSwitcher from './pages/RoleSwitcher';

// Pages
import Dashboard from './pages/Dashboard';

// Admin Routes
import AdminLayout from './roles/admin/AdminLayout';
import AdminDashboard from './roles/admin/AdminDashboard';
import Users from './roles/admin/Users';
import Roles from './roles/admin/Roles';
import Permissions from './roles/admin/Permissions';
import SystemSettings from './roles/admin/SystemSettings';
import AuditLogs from './roles/admin/AuditLogs';
import Backup from './roles/admin/Backup';

// Role-specific pages - Importer
import ImporterDashboard from './roles/importer/ImporterDashboard';
import ImporterShipments from './roles/importer/ImporterShipments';
import ImporterShipmentDetails from './roles/importer/ImporterShipmentDetails';
import ImporterDocuments from './roles/importer/ImporterDocuments';
import ImporterDocumentDetails from './roles/importer/ImporterDocumentDetails';
import ImporterFleet from './roles/importer/ImporterFleet';
import NewImport from './roles/importer/NewImport';
import ImporterAssignments from './roles/importer/ImporterAssignments';
import ImporterContainers from './roles/importer/ImporterContainers';
import ImporterContainerDetails from './roles/importer/ImporterContainerDetails';
import ImporterFreightBookings from './roles/importer/ImporterFreightBookings';
import ImporterFreightBookingDetails from './roles/importer/ImporterFreightBookingDetails';
import ImporterBookingDocuments from './roles/importer/ImporterBookingDocuments';
import ImporterAssignmentDetails from './roles/importer/ImporterAssignmentDetails';

// Role-specific pages - Exporter
import ExporterDashboard from './roles/exporter/ExporterDashboard';
import ExporterShipments from './roles/exporter/ExporterShipments';
import ExporterShipmentDetails from './roles/exporter/ExporterShipmentDetails';
import ExporterDocuments from './roles/exporter/ExporterDocuments';
import ExporterDocumentDetails from './roles/exporter/ExporterDocumentDetails';
import ExporterFleet from './roles/exporter/ExporterFleet';
import ExporterContainers from './roles/exporter/ExporterContainers';
import ExporterContainerDetails from './roles/exporter/ExporterContainerDetails';
import ExporterFreightBooking from './roles/exporter/ExporterFreightBooking';
import ExporterFreightBookings from './roles/exporter/ExporterFreightBookings';
import ExporterFreightBookingDetails from './roles/exporter/ExporterFreightBookingDetails';
import ExporterFreightBookingEdit from './roles/exporter/ExporterFreightBookingEdit';
import NewExport from './roles/exporter/NewExport';

// Role-specific pages - Clearing Agent
import ClearingAgentDashboard from './roles/clearingAgent/ClearingAgentDashboard';
import ClearingAgentAssignments from './roles/clearingAgent/ClearingAgentAssignments';
import ClearingAgentAssignmentDetails from './roles/clearingAgent/ClearingAgentAssignmentDetails';
import ClearingAgentContainers from './roles/clearingAgent/clearingAgentContainers';
import ClearingAgentDocuments from './roles/clearingAgent/ClearingAgentDocuments';
import ClearingAgentDocumentDetails from './roles/clearingAgent/clearingAgentDocumentDetails';
import ClearingAgentUploadDocument from './roles/clearingAgent/ClearingAgentUploadDocument';

// Role-specific pages - Freight Forwarder
import FreightForwarderDashboard from './roles/freightForwarder/FreightForwarderDashboard';
import FreightForwarderBookings from './roles/freightForwarder/FreightForwarderBookings';
import FreightForwarderBookingDetails from './roles/freightForwarder/FreightForwarderBookingDetails';
import FreightForwarderBookingEdit from './roles/freightForwarder/FreightForwarderBookingEdit';
import FreightForwarderNewBooking from './roles/freightForwarder/FreightForwarderNewBooking';
import FreightForwarderContainers from './roles/freightForwarder/FreightForwarderContainers';
import FreightForwarderDocuments from './roles/freightForwarder/FreightForwarderDocuments';
import FreightForwarderSchedule from './roles/freightForwarder/FreightForwarderSchedule';
import FreightForwarderAnalytics from './roles/freightForwarder/FreightForwarderAnalytics';

// Role-specific pages - Inland Transporter
import InlandTransporterDashboard from './roles/inlandTransporter/InlandTransporterDashboard';
import InlandTransporterDispatchOrders from './roles/inlandTransporter/InlandTransporterDispatchOrders';
import InlandTransporterDispatchDetails from './roles/inlandTransporter/InlandTransporterDispatchDetails';
import InlandTransporterNewDispatch from './roles/inlandTransporter/InlandTransporterNewDispatch';
import InlandTransporterDeliveries from './roles/inlandTransporter/InlandTransporterDeliveries';
import InlandTransporterVehicles from './roles/inlandTransporter/InlandTransporterVehicles';
import InlandTransporterDocuments from './roles/inlandTransporter/InlandTransporterDocuments';
import InlandTransporterAnalytics from './roles/inlandTransporter/InlandTransporterAnalytics';
import InlandTransporterDispatchEdit from './roles/inlandTransporter/InlandTransporterDispatchEdit';
import InlandTransporterNewDelivery from './roles/inlandTransporter/InlandTransporterNewDelivery';
import InlandTransporterDeliveryDetails from './roles/inlandTransporter/InlandTransporterDeliveryDetails';
import InlandTransporterDeliveryEdit from './roles/inlandTransporter/InlandTransporterDeliveryEdit';
import InlandTransporterVehicleDetails from './roles/inlandTransporter/InlandTransporterVehicleDetails';
import InlandTransporterVehicleEdit from './roles/inlandTransporter/InlandTransporterVehicleEdit';
import InlandTransporterVehicleNew from './roles/inlandTransporter/InlandTransporterVehicleNew';
import InlandTransporterDocumentDetails from './roles/inlandTransporter/InlandTransporterDocumentDetails';
import InlandTransporterDocumentEdit from './roles/inlandTransporter/InlandTransporterDocumentEdit';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <div className="min-h-screen">
          <Navbar />
          <div className="pt-16 md:pt-20">
            <Routes>
              {/* Landing Page - Role Switcher */}
              <Route path="/" element={<RoleSwitcher />} />
              <Route path="/dashboard" element={<Dashboard />} />

              {/* Admin Routes */}
              <Route path="/admin" element={<AdminLayout />}>
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="users" element={<Users />} />
                <Route path="roles" element={<Roles />} />
                <Route path="permissions" element={<Permissions />} />
                <Route path="settings" element={<SystemSettings />} />
                <Route path="audit-logs" element={<AuditLogs />} />
                <Route path="backup" element={<Backup />} />
              </Route>

              {/* Importer Routes */}
              <Route path="/importer-dashboard" element={<ImporterDashboard />} />
              <Route path="/importer-shipments" element={<ImporterShipments />} />
              <Route path="/importer-shipments/:id" element={<ImporterShipmentDetails />} />
              <Route path="/importer-documents" element={<ImporterDocuments />} />
              <Route path="/importer-documents/:id" element={<ImporterDocumentDetails />} />
              <Route path="/importer-fleet" element={<ImporterFleet />} />
              <Route path="/importer-fleet/:id" element={<ImporterFleet />} />
              <Route path="/new-import/" element={<NewImport />} />
              <Route path="/importer-assignments" element={<ImporterAssignments />} />
              <Route path="/importer-containers" element={<ImporterContainers />} />
              <Route path="/importer-containers/:id" element={<ImporterContainerDetails />} />
              <Route path="/importer/freight-bookings" element={<ImporterFreightBookings />} />
              <Route path="/importer/freight-booking/:id" element={<ImporterFreightBookingDetails />} />
              <Route path="/importer/freight-booking/:id/documents" element={<ImporterBookingDocuments />} />
              <Route path="/importer/assignment/:id" element={<ImporterAssignmentDetails />} />

              {/* Exporter Routes */}
              <Route path="/exporter-dashboard" element={<ExporterDashboard />} />
              <Route path="/exporter-shipments" element={<ExporterShipments />} />
              <Route path="/exporter-shipments/:id" element={<ExporterShipmentDetails />} />
              <Route path="/exporter-documents" element={<ExporterDocuments />} />
              <Route path="/exporter-documents/:id" element={<ExporterDocumentDetails />} />
              <Route path="/exporter-fleet" element={<ExporterFleet />} />
              <Route path="/exporter-fleet/:id" element={<ExporterFleet />} />
              <Route path="/exporter-containers" element={<ExporterContainers />} />
              <Route path="/exporter-containers/:id" element={<ExporterContainerDetails />} />
              <Route path="/book-freight" element={<ExporterFreightBooking />} />
              <Route path="/freight-bookings" element={<ExporterFreightBookings />} />
              <Route path="/freight-bookings/:id" element={<ExporterFreightBookingDetails />} />
              <Route path="/freight-booking/edit/:id" element={<ExporterFreightBookingEdit />} />
              <Route path="/new-export" element={<NewExport />} />

              {/* Clearing Agent Routes */}
              <Route path="/clearing-agent-dashboard" element={<ClearingAgentDashboard />} />
              <Route path="/clearing-agent-assignments" element={<ClearingAgentAssignments />} />
              <Route path="/clearing-agent/assignment/:id" element={<ClearingAgentAssignmentDetails />} />
              <Route path="/clearing-agent-containers" element={<ClearingAgentContainers />} />
              <Route path="/clearing-agent-documents" element={<ClearingAgentDocuments />} />
              <Route path="/clearing-agent-documents/:id" element={<ClearingAgentDocumentDetails />} />
              <Route path="/clearing-agent-upload" element={<ClearingAgentUploadDocument />} />

              {/* Freight Forwarder Routes */}
              <Route path="/freight-forwarder/dashboard" element={<FreightForwarderDashboard />} />
              <Route path="/freight-forwarder/bookings" element={<FreightForwarderBookings />} />
              <Route path="/freight-forwarder/booking/:id" element={<FreightForwarderBookingDetails />} />
              <Route path="/freight-forwarder/booking/edit/:id" element={<FreightForwarderBookingEdit />} />
              <Route path="/freight-forwarder/booking/new" element={<FreightForwarderNewBooking />} />
              <Route path="/freight-forwarder/containers" element={<FreightForwarderContainers />} />
              <Route path="/freight-forwarder/documents" element={<FreightForwarderDocuments />} />
              <Route path="/freight-forwarder/schedule" element={<FreightForwarderSchedule />} />
              <Route path="/freight-forwarder/analytics" element={<FreightForwarderAnalytics />} />

              {/* Inland Transporter Routes */}
              <Route path="/inland-transporter/dashboard" element={<InlandTransporterDashboard />} />
              <Route path="/inland-transporter/dispatch-orders" element={<InlandTransporterDispatchOrders />} />
              <Route path="/inland-transporter/dispatch/:id" element={<InlandTransporterDispatchDetails />} />
              <Route path="/inland-transporter/dispatch/new" element={<InlandTransporterNewDispatch />} />
              <Route path="/inland-transporter/deliveries" element={<InlandTransporterDeliveries />} />
              <Route path="/inland-transporter/vehicles" element={<InlandTransporterVehicles />} />
              <Route path="/inland-transporter/documents" element={<InlandTransporterDocuments />} />
              <Route path="/inland-transporter/analytics" element={<InlandTransporterAnalytics />} />
              <Route path="/inland-transporter/dispatch/edit/:id" element={<InlandTransporterDispatchEdit />} />
              <Route path="/inland-transporter/delivery/new" element={<InlandTransporterNewDelivery />} />
              <Route path="/inland-transporter/delivery/:id" element={<InlandTransporterDeliveryDetails />} />
              <Route path="/inland-transporter/delivery/edit/:id" element={<InlandTransporterDeliveryEdit />} />
              <Route path="/inland-transporter/vehicle/:id" element={<InlandTransporterVehicleDetails />} />
              <Route path="/inland-transporter/vehicle/edit/:id" element={<InlandTransporterVehicleEdit />} />
              <Route path="/inland-transporter/vehicle/new" element={<InlandTransporterVehicleNew />} />
              <Route path="/inland-transporter/document/:id" element={<InlandTransporterDocumentDetails />} />
              <Route path="/inland-transporter/document/edit/:id" element={<InlandTransporterDocumentEdit />} />
            </Routes>
          </div>
        </div>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;