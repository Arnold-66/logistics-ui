// roles/exporter/ExporterFreightBookingDetails.jsx (updated with tracking)
import React, { useState, useContext, useEffect } from 'react';
import { ThemeContext } from '../../context/themeContext';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft, Package, Ship, Container, Calendar, Clock, MapPin,
  User, Building, Phone, Mail, FileText, Download, Truck,
  Anchor, Globe, Flag, CheckCircle, AlertCircle, CreditCard,
  History, Navigation, ChevronRight, BookOpen, Users
} from 'lucide-react';

const ExporterFreightBookingDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { darkMode } = useContext(ThemeContext);
  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState(null);
  const [trackingHistory, setTrackingHistory] = useState([]);

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
    setTimeout(() => {
      setBooking({
        id: id || 'FRT-2026-001',
        bookingNo: 'BKG-12345678',
        blNo: 'BL-2026-001',
        exporter: 'ImportFlow Ltd',
        exporterAddress: 'Kampala, Uganda',
        exporterContact: 'John Doe',
        exporterPhone: '+256 700 789012',
        exporterEmail: 'john.doe@importflow.com',
        consignee: 'Global Importers Inc',
        consigneeAddress: 'Nairobi, Kenya',
        consigneeContact: 'Jane Smith',
        consigneePhone: '+254 722 123456',
        consigneeEmail: 'jane@globalimporters.com',
        forwardingAgent: 'East Africa Logistics',
        vessel: 'MV Star Express',
        vesselSCAC: 'STAR',
        voyage: 'SE-2026-078',
        portOfLoading: 'Kampala, Uganda',
        portOfDischarge: 'Port of Mombasa',
        placeOfDelivery: 'Nairobi, Kenya',
        typeOfMovement: 'FCL',
        containers: [
          { id: 'MSKU-458921', size: '20ft', packages: 450, weight: '12.5 tons', sealNo: 'SEAL-001' },
          { id: 'MSKU-458922', size: '40ft', packages: 320, weight: '4.5 tons', sealNo: 'SEAL-002' }
        ],
        status: 'In Transit',
        declaredValue: '749,484,375 UGX',
        shippingDate: '2026-07-25',
        eta: '2026-08-12 14:30',
        finalDelivery: 'Kampala, Uganda',
        submittedDate: '2026-07-20',
        lastUpdate: '2 hours ago',
        priority: 'High',
        countryOfOrigin: 'Uganda'
      });

      setTrackingHistory([
        {
          id: 'TRK-001',
          status: 'Booking Confirmed',
          location: 'Online',
          description: 'Booking confirmed by freight forwarder',
          date: '2026-07-20',
          time: '10:30 AM',
          updatedBy: 'Freight Forwarder'
        },
        {
          id: 'TRK-002',
          status: 'Container Loaded',
          location: 'Kampala Warehouse',
          description: 'Container loaded with cargo',
          date: '2026-07-25',
          time: '09:00 AM',
          updatedBy: 'Freight Forwarder'
        },
        {
          id: 'TRK-003',
          status: 'In Transit',
          location: 'Indian Ocean',
          description: 'Vessel departed from port',
          date: '2026-07-26',
          time: '14:30 PM',
          updatedBy: 'Freight Forwarder'
        },
        {
          id: 'TRK-004',
          status: 'Arrived at Port',
          location: 'Port of Mombasa',
          description: 'Vessel arrived at destination port',
          date: '2026-08-12',
          time: '14:30 PM',
          updatedBy: 'Freight Forwarder'
        }
      ]);
      setLoading(false);
    }, 500);
  }, [id]);

  const getStatusBadge = (status) => {
    const statusMap = {
      'Pending Approval': { bg: colors.warning + '20', color: colors.warning, icon: Clock },
      'Pending Documentation': { bg: colors.warning + '20', color: colors.warning, icon: FileText },
      'In Transit': { bg: colors.info + '20', color: colors.info, icon: Ship },
      'In Customs': { bg: colors.orange + '20', color: colors.orange, icon: AlertCircle },
      'Delivered': { bg: colors.success + '20', color: colors.success, icon: CheckCircle },
      'Container Loaded': { bg: colors.teal + '20', color: colors.teal, icon: Container },
      'Arrived at Port': { bg: colors.info + '20', color: colors.info, icon: Anchor },
      'Customs Cleared': { bg: colors.success + '20', color: colors.success, icon: CheckCircle },
      'Booking Confirmed': { bg: colors.primary + '20', color: colors.primary, icon: CheckCircle }
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
            onClick={() => navigate('/freight-bookings')}
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
            <span className="text-sm text-green-500 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse inline-block"></span>
              Live Tracking
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

            {/* Consignee */}
            <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-sm'}`}>
              <h3 className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                <Building className="w-5 h-5 inline mr-2" style={{ color: colors.primary }} />
                Consignee
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
                </div>
                <div>
                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Port of Discharge</p>
                  <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{booking?.portOfDischarge}</p>
                </div>
                <div>
                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Type of Movement</p>
                  <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{booking?.typeOfMovement}</p>
                </div>
                <div>
                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Country of Origin</p>
                  <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{booking?.countryOfOrigin}</p>
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
                <History className="w-5 h-5 inline mr-2" style={{ color: colors.primary }} />
                Tracking History
              </h3>
              <div className="space-y-3 max-h-80 overflow-y-auto pr-2">
                {trackingHistory.map((track, index) => {
                  const trackStatus = getStatusBadge(track.status);
                  const TrackIcon = trackStatus.icon;
                  return (
                    <div key={track.id} className={`p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                      <div className="flex items-start gap-3">
                        <div className="mt-1">
                          <div className={`w-2 h-2 rounded-full`} style={{ backgroundColor: trackStatus.color }}></div>
                          {index < trackingHistory.length - 1 && (
                            <div className="w-0.5 h-6 mx-auto" style={{ backgroundColor: isDark ? '#4b5563' : '#d1d5db' }}></div>
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                              {track.status}
                            </p>
                            <span className={`text-xs px-2 py-0.5 rounded-full flex items-center gap-1`}
                              style={{ backgroundColor: trackStatus.bg, color: trackStatus.color }}>
                              <TrackIcon className="w-3 h-3" />
                              {track.status}
                            </span>
                          </div>
                          <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                            {track.location} • {track.date} at {track.time}
                          </p>
                          <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                            {track.description}
                          </p>
                          <p className={`text-[10px] ${isDark ? 'text-gray-600' : 'text-gray-400'}`}>
                            Updated by: {track.updatedBy}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
                {trackingHistory.length === 0 && (
                  <div className="text-center py-4">
                    <Clock className="w-8 h-8 mx-auto mb-2 opacity-50" style={{ color: isDark ? '#4b5563' : '#9ca3af' }} />
                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      No tracking history yet
                    </p>
                  </div>
                )}
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
                  <Navigation className="w-4 h-4" />
                  Track Shipment
                </button>
                <button className="w-full flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border transition-all duration-200"
                  style={{ borderColor: colors.primary, color: colors.primary }}>
                  <Users className="w-4 h-4" />
                  Contact Freight Forwarder
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExporterFreightBookingDetails;