// roles/importer/ImporterFreightBookingDetails.jsx
import React, { useState, useContext, useEffect } from 'react';
import { ThemeContext } from '../../context/themeContext';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft, Package, Ship, Container, Calendar, Clock, MapPin,
  User, Building, Phone, Mail, FileText, Download, Truck,
  Anchor, Globe, Flag, CheckCircle, AlertCircle, CreditCard,
  Users, Box, Layers, Award, FileCheck, ClipboardList
} from 'lucide-react';

const ImporterFreightBookingDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { darkMode } = useContext(ThemeContext);
  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState(null);

  const colors = {
    primary: '#714b67',
    primaryLight: '#8a5f7e',
    primaryDark: '#5a3a52',
    primaryBg: '#f5f0f4',
    primaryBgDark: '#2d1f29',
    success: '#10b981',
    warning: '#f59e0b',
    danger: '#ef4444',
    info: '#3b82f6',
    teal: '#14b8a6',
  };

  const isDark = darkMode

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setBooking({
        id: id || 'FRT-2026-001',
        bookingNo: 'BKG-12345678',
        blNo: 'BL-2026-001',
        // Exporter Details
        exporter: 'ImportFlow Ltd',
        exporterAddress: 'Kampala, Uganda',
        exporterContact: 'John Doe',
        exporterPhone: '+256 700 789012',
        exporterEmail: 'john.doe@importflow.com',
        // Consignee Details (Importer)
        consignee: 'Global Importers Inc',
        consigneeAddress: 'Nairobi, Kenya',
        consigneeContact: 'Jane Smith',
        consigneePhone: '+254 722 123456',
        consigneeEmail: 'jane@globalimporters.com',
        // Forwarding Agent
        forwardingAgent: 'East Africa Logistics',
        forwardingAgentAddress: 'Nairobi, Kenya',
        forwardingAgentContact: 'Peter Ochieng',
        forwardingAgentPhone: '+254 700 123456',
        forwardingAgentEmail: 'peter@eastafricalogistics.com',
        // Notify Party
        notifyParty: 'Uganda Shipping Agency',
        notifyPartyAddress: 'Kampala, Uganda',
        notifyPartyContact: 'Sarah Nambi',
        notifyPartyPhone: '+256 700 789012',
        notifyPartyEmail: 'sarah@ugandashipping.com',
        // Origin
        pointOfOrigin: 'Kampala',
        countryOfOrigin: 'Uganda',
        // Pre-carriage
        preCarriageBy: 'Truck',
        placeOfReceipt: 'Kampala Warehouse',
        // Vessel
        vessel: 'MV Star Express',
        vesselSCAC: 'STAR',
        voyage: 'SE-2026-078',
        countryFlag: 'Uganda',
        // Ports
        portOfLoading: 'Kampala, Uganda',
        loadingPier: 'Main Terminal',
        originalsReleasedAt: 'Kampala Office',
        portOfDischarge: 'Port of Mombasa',
        placeOfDelivery: 'Nairobi, Kenya',
        typeOfMovement: 'FCL',
        // Dates & Value
        declaredValue: '749,484,375 UGX',
        shippingDate: '2026-07-25',
        eta: '2026-08-12 14:30',
        finalDelivery: 'Kampala, Uganda',
        // Status
        status: 'In Transit',
        submittedDate: '2026-07-20',
        lastUpdate: '2 hours ago',
        priority: 'High',
        // Containers
        containers: [
          { id: 'MSKU-458921', size: '20ft', packages: 450, weight: '12.5 tons', sealNo: 'SEAL-001', cargoDesc: 'Electronics and Machinery' },
          { id: 'MSKU-458922', size: '40ft', packages: 320, weight: '4.5 tons', sealNo: 'SEAL-002', cargoDesc: 'Industrial Equipment' }
        ],
        // Tracking
        trackingHistory: [
          { date: '2026-07-20', event: 'Booking Confirmed', location: 'Online', status: 'Completed' },
          { date: '2026-07-25', event: 'Shipment Departed', location: 'Port of Loading', status: 'Completed' },
          { date: '2026-08-12', event: 'Expected Arrival', location: 'Port of Discharge', status: 'Pending' },
          { date: '2026-08-13', event: 'Customs Clearance', location: 'Port of Discharge', status: 'Pending' }
        ],
        // Documents
        documents: [
          { name: 'Bill of Lading', status: 'Uploaded', date: '2026-07-21' },
          { name: 'Commercial Invoice', status: 'Pending', date: '2026-07-22' },
          { name: 'Packing List', status: 'Uploaded', date: '2026-07-23' },
          { name: 'Certificate of Origin', status: 'Pending', date: '2026-07-24' }
        ]
      });
      setLoading(false);
    }, 500);
  }, [id]);

  const getStatusBadge = (status) => {
    const statusMap = {
      'Pending Approval': { bg: colors.warning + '20', color: colors.warning, icon: Clock },
      'In Transit': { bg: colors.info + '20', color: colors.info, icon: Ship },
      'In Customs': { bg: colors.orange + '20', color: colors.orange, icon: AlertCircle },
      'Delivered': { bg: colors.success + '20', color: colors.success, icon: CheckCircle },
      'Pending Documentation': { bg: colors.warning + '20', color: colors.warning, icon: FileText },
      'Completed': { bg: colors.success + '20', color: colors.success, icon: CheckCircle },
      'Pending': { bg: colors.warning + '20', color: colors.warning, icon: Clock }
    };
    return statusMap[status] || { bg: colors.primary + '20', color: colors.primary, icon: Clock };
  };

  const getPriorityBadge = (priority) => {
    const priorityMap = {
      'High': { bg: colors.danger + '20', color: colors.danger },
      'Medium': { bg: colors.warning + '20', color: colors.warning },
      'Low': { bg: colors.success + '20', color: colors.success }
    };
    return priorityMap[priority] || { bg: colors.primary + '20', color: colors.primary };
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: isDark ? '#1a1a2e' : '#f8fafc' }}>
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto" style={{ borderColor: colors.primary }}></div>
      </div>
    );
  }

  const statusStyle = getStatusBadge(booking.status);
  const priorityStyle = getPriorityBadge(booking.priority);
  const StatusIcon = statusStyle.icon;

  return (
    <div className="min-h-screen w-full p-4 md:p-6" style={{ backgroundColor: isDark ? '#1a1a2e' : '#f8fafc' }}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => navigate('/importer/freight-bookings')}
            className="p-2 rounded-lg transition-colors hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <ArrowLeft className={`w-5 h-5 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
          </button>
          <div>
            <h1 className={`text-2xl md:text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Freight Booking Details
            </h1>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              {booking?.bookingNo} • {booking?.blNo}
            </p>
          </div>
          <div className="ml-auto flex gap-2">
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border transition-all duration-200"
              style={{ borderColor: colors.primary, color: colors.primary }}>
              <Download className="w-4 h-4" />
              Export
            </button>
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white transition-all duration-200 hover:shadow-lg"
              style={{ backgroundColor: colors.primary }}>
              <FileText className="w-4 h-4" />
              Documents
            </button>
          </div>
        </div>

        {/* Status */}
        <div className={`p-4 rounded-lg mb-6 ${isDark ? 'bg-gray-800' : 'bg-white shadow-sm'}`}>
          <div className="flex items-center gap-4 flex-wrap">
            <span className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2`}
              style={{ backgroundColor: statusStyle.bg, color: statusStyle.color }}>
              <StatusIcon className="w-4 h-4" />
              {booking?.status}
            </span>
            <span className={`text-sm px-3 py-1 rounded-full`}
              style={{ backgroundColor: priorityStyle.bg, color: priorityStyle.color }}>
              {booking?.priority} Priority
            </span>
            <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              Submitted: {booking?.submittedDate}
            </span>
            <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              Last Updated: {booking?.lastUpdate}
            </span>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Exporter Details */}
            <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-sm'}`}>
              <h3 className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                <User className="w-5 h-5 inline mr-2" style={{ color: colors.primary }} />
                Exporter Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Company Name</p>
                  <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{booking?.exporter}</p>
                </div>
                <div>
                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Address</p>
                  <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{booking?.exporterAddress}</p>
                </div>
                <div>
                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Contact Person</p>
                  <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{booking?.exporterContact}</p>
                </div>
                <div>
                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Contact Details</p>
                  <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{booking?.exporterPhone} • {booking?.exporterEmail}</p>
                </div>
              </div>
            </div>

            {/* Consignee (Importer) */}
            <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-sm'}`}>
              <h3 className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                <Building className="w-5 h-5 inline mr-2" style={{ color: colors.primary }} />
                Consignee (Importer)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Company Name</p>
                  <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{booking?.consignee}</p>
                </div>
                <div>
                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Address</p>
                  <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{booking?.consigneeAddress}</p>
                </div>
                <div>
                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Contact Person</p>
                  <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{booking?.consigneeContact}</p>
                </div>
                <div>
                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Contact Details</p>
                  <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{booking?.consigneePhone} • {booking?.consigneeEmail}</p>
                </div>
              </div>
            </div>

            {/* Vessel & Ports */}
            <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-sm'}`}>
              <h3 className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                <Anchor className="w-5 h-5 inline mr-2" style={{ color: colors.primary }} />
                Vessel & Port Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Vessel</p>
                  <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{booking?.vessel}</p>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>SCAC: {booking?.vesselSCAC}</p>
                </div>
                <div>
                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Voyage</p>
                  <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{booking?.voyage}</p>
                </div>
                <div>
                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Port of Loading</p>
                  <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{booking?.portOfLoading}</p>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Pier: {booking?.loadingPier}</p>
                </div>
                <div>
                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Port of Discharge</p>
                  <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{booking?.portOfDischarge}</p>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Delivery: {booking?.placeOfDelivery}</p>
                </div>
                <div>
                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Type of Movement</p>
                  <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{booking?.typeOfMovement}</p>
                </div>
                <div>
                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Country Flag</p>
                  <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{booking?.countryFlag}</p>
                </div>
              </div>
            </div>

            {/* Containers */}
            <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-sm'}`}>
              <h3 className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                <Container className="w-5 h-5 inline mr-2" style={{ color: colors.primary }} />
                Containers
              </h3>
              <div className="space-y-2">
                {booking?.containers.map((container, index) => (
                  <div key={index} className={`p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          {container.id}
                        </p>
                        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                          {container.size} • {container.packages} packages • {container.weight}
                        </p>
                      </div>
                      <div>
                        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                          Seal: {container.sealNo}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Info */}
            <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-sm'}`}>
              <h3 className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Quick Info
              </h3>
              <div className="space-y-3">
                <div>
                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Declared Value</p>
                  <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{booking?.declaredValue}</p>
                </div>
                <div>
                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Shipping Date</p>
                  <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{booking?.shippingDate}</p>
                </div>
                <div>
                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>ETA</p>
                  <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{booking?.eta}</p>
                </div>
                <div>
                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Final Delivery</p>
                  <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{booking?.finalDelivery}</p>
                </div>
              </div>
            </div>

            {/* Tracking History */}
            <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-sm'}`}>
              <h3 className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                <Clock className="w-5 h-5 inline mr-2" style={{ color: colors.primary }} />
                Tracking History
              </h3>
              <div className="space-y-3">
                {booking?.trackingHistory.map((track, index) => {
                  const trackStatus = getStatusBadge(track.status);
                  const TrackIcon = trackStatus.icon;
                  return (
                    <div key={index} className="flex items-start gap-3">
                      <div className="flex flex-col items-center">
                        <div className="w-2 h-2 rounded-full mt-1.5" style={{ backgroundColor: track.status === 'Completed' ? colors.success : colors.warning }}></div>
                        {index < booking.trackingHistory.length - 1 && (
                          <div className="w-0.5 h-6" style={{ backgroundColor: colors.primary + '40' }}></div>
                        )}
                      </div>
                      <div className="flex-1">
                        <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          {track.event}
                        </p>
                        <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                          {track.location}
                        </p>
                        <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                          {track.date}
                        </p>
                      </div>
                      <span className={`text-xs px-2 py-0.5 rounded-full flex items-center gap-1`}
                        style={{ backgroundColor: trackStatus.bg, color: trackStatus.color }}>
                        <TrackIcon className="w-3 h-3" />
                        {track.status}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Documents Status */}
            <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-sm'}`}>
              <h3 className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                <FileText className="w-5 h-5 inline mr-2" style={{ color: colors.primary }} />
                Documents Status
              </h3>
              <div className="space-y-2">
                {booking?.documents.map((doc, index) => {
                  const docStatus = getStatusBadge(doc.status);
                  const DocIcon = docStatus.icon;
                  return (
                    <div key={index} className={`flex items-center justify-between p-2 rounded ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
                      <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        {doc.name}
                      </span>
                      <span className={`text-xs px-2 py-0.5 rounded-full flex items-center gap-1`}
                        style={{ backgroundColor: docStatus.bg, color: docStatus.color }}>
                        <DocIcon className="w-3 h-3" />
                        {doc.status}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Actions */}
            <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-sm'}`}>
              <h3 className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Actions
              </h3>
              <div className="space-y-2">
                <button className="w-full flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white transition-all duration-200 hover:shadow-lg"
                  style={{ backgroundColor: colors.primary }}>
                  <FileText className="w-4 h-4" />
                  View All Documents
                </button>
                <button className="w-full flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border transition-all duration-200"
                  style={{ borderColor: colors.primary, color: colors.primary }}>
                  <Download className="w-4 h-4" />
                  Download All Documents
                </button>
                <button className="w-full flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border transition-all duration-200"
                  style={{ borderColor: colors.primary, color: colors.primary }}>
                  <ClipboardList className="w-4 h-4" />
                  Track Shipment
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImporterFreightBookingDetails;