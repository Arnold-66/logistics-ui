// roles/freightForwarder/FreightForwarderBookingDetails.jsx
import React, { useState, useContext, useEffect } from 'react';
import { ThemeContext } from '../../context/themeContext';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft, Package, Ship, Container, Calendar, Clock, MapPin,
  User, Building, Phone, Mail, FileText, Download, Edit, Truck,
  Anchor, Globe, Flag, CheckCircle, AlertCircle, CreditCard,
  Plus, X, Save, Navigation, History, ChevronRight, Play
} from 'lucide-react';

const FreightForwarderBookingDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { darkMode } = useContext(ThemeContext);
  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState(null);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [newStatus, setNewStatus] = useState({
    status: '',
    location: '',
    description: '',
    date: ''
  });
  const [statusHistory, setStatusHistory] = useState([]);

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

  // Handle edit navigation
  const handleEdit = () => {
    navigate(`/freight-forwarder/booking/edit/${id}`);
  };

  // Handle status update
  const handleStatusUpdate = () => {
    const newTrackingEntry = {
      id: `TRK-${Date.now()}`,
      status: newStatus.status,
      location: newStatus.location || 'N/A',
      description: newStatus.description || 'Status updated',
      date: newStatus.date || new Date().toISOString().split('T')[0],
      time: new Date().toLocaleTimeString(),
      updatedBy: 'Freight Forwarder'
    };

    setStatusHistory([newTrackingEntry, ...statusHistory]);
    setBooking(prev => ({
      ...prev,
      status: newStatus.status,
      lastUpdate: 'Just now'
    }));
    setShowStatusModal(false);
    setNewStatus({ status: '', location: '', description: '', date: '' });
  };

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const bookingData = {
        id: id || 'FRT-2026-001',
        bookingNo: 'BKG-12345678',
        blNo: 'BL-2026-001',
        companyName: 'ImportFlow Logistics',
        businessAddress: 'Plot 123, Industrial Area, Kampala, Uganda',
        contactPerson: 'John Mukasa',
        contactPhone: '+256 700 123456',
        contactEmail: 'john@importflow.com',
        shipper: 'ImportFlow Ltd',
        shipperAddress: 'Kampala, Uganda',
        shipperContact: 'John Doe',
        shipperPhone: '+256 700 789012',
        shipperEmail: 'john.doe@importflow.com',
        consignee: 'Global Importers Inc',
        consigneeAddress: 'Nairobi, Kenya',
        consigneeContact: 'Jane Smith',
        consigneePhone: '+254 722 123456',
        consigneeEmail: 'jane@globalimporters.com',
        forwardingAgent: 'East Africa Logistics',
        notifyParty: 'Uganda Shipping Agency',
        pointOfOrigin: 'Kampala',
        countryOfOrigin: 'Uganda',
        preCarriageBy: 'Truck',
        placeOfReceipt: 'Kampala Warehouse',
        vessel: 'MV Star Express',
        vesselSCAC: 'STAR',
        voyage: 'SE-2026-078',
        countryFlag: 'Uganda',
        portOfLoading: 'Kampala, Uganda',
        loadingPier: 'Main Terminal',
        originalsReleasedAt: 'Kampala Office',
        portOfDischarge: 'Port of Mombasa',
        placeOfDelivery: 'Nairobi, Kenya',
        typeOfMovement: 'FCL',
        declaredValue: '749,484,375 UGX',
        shippingDate: '2026-07-25',
        eta: '2026-08-12 14:30',
        finalDelivery: 'Kampala, Uganda',
        containers: [
          { id: 'MSKU-458921', size: '20ft', packages: 450, weight: '12.5 tons', sealNo: 'SEAL-001' },
          { id: 'MSKU-458922', size: '40ft', packages: 320, weight: '4.5 tons', sealNo: 'SEAL-002' }
        ],
        status: 'In Transit',
        submittedDate: '2026-07-20',
        lastUpdate: '2 hours ago',
        priority: 'High'
      };
      setBooking(bookingData);
      
      // Sample tracking history
      setStatusHistory([
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
      'Customs Cleared': { bg: colors.success + '20', color: colors.success, icon: CheckCircle }
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
            onClick={() => navigate('/freight-forwarder/bookings')}
            className="p-2 rounded-lg transition-colors hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <ArrowLeft className={`w-5 h-5 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
          </button>
          <div>
            <h1 className={`text-2xl md:text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Booking Details
            </h1>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              {booking?.bookingNo} • {booking?.blNo}
            </p>
          </div>
          <div className="ml-auto flex gap-2">
            <button 
              onClick={() => setShowStatusModal(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white transition-all duration-200 hover:shadow-lg"
              style={{ backgroundColor: colors.success }}
            >
              <Play className="w-4 h-4" />
              Update Status
            </button>
            <button 
              onClick={handleEdit}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:shadow-md"
              style={{ backgroundColor: colors.primary, color: 'white' }}
            >
              <Edit className="w-4 h-4" />
              Edit Booking
            </button>
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border transition-all duration-200"
              style={{ borderColor: colors.primary, color: colors.primary }}>
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
        </div>

        {/* Status Update Modal */}
        {showStatusModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className={`w-full max-w-lg rounded-lg shadow-xl p-6 max-h-[90vh] overflow-y-auto ${
              isDark ? 'bg-gray-800' : 'bg-white'
            }`}>
              <div className="flex items-center justify-between mb-4">
                <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Update Tracking Status
                </h3>
                <button
                  onClick={() => setShowStatusModal(false)}
                  className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <X className={`w-5 h-5 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Status *
                  </label>
                  <select
                    value={newStatus.status}
                    onChange={(e) => setNewStatus({ ...newStatus, status: e.target.value })}
                    className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                      isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                    }`}
                    style={{ focusRingColor: colors.primary }}
                  >
                    <option value="">Select Status</option>
                    <option value="Booking Confirmed">Booking Confirmed</option>
                    <option value="Container Loaded">Container Loaded</option>
                    <option value="In Transit">In Transit</option>
                    <option value="Arrived at Port">Arrived at Port</option>
                    <option value="In Customs">In Customs</option>
                    <option value="Customs Cleared">Customs Cleared</option>
                    <option value="Out for Delivery">Out for Delivery</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Location
                  </label>
                  <input
                    type="text"
                    value={newStatus.location}
                    onChange={(e) => setNewStatus({ ...newStatus, location: e.target.value })}
                    placeholder="e.g., Port of Mombasa"
                    className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                      isDark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900'
                    }`}
                    style={{ focusRingColor: colors.primary }}
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Description
                  </label>
                  <textarea
                    value={newStatus.description}
                    onChange={(e) => setNewStatus({ ...newStatus, description: e.target.value })}
                    placeholder="Add details about the status update..."
                    rows="3"
                    className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                      isDark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900'
                    }`}
                    style={{ focusRingColor: colors.primary }}
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Date
                  </label>
                  <input
                    type="date"
                    value={newStatus.date}
                    onChange={(e) => setNewStatus({ ...newStatus, date: e.target.value })}
                    className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                      isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                    }`}
                    style={{ focusRingColor: colors.primary }}
                  />
                </div>

                <div className="flex gap-2 pt-4 border-t" style={{ borderColor: isDark ? '#374151' : '#e5e7eb' }}>
                  <button
                    onClick={() => setShowStatusModal(false)}
                    className="flex-1 px-4 py-2 rounded-lg text-sm font-medium border transition-all duration-200"
                    style={{ borderColor: colors.primary, color: colors.primary }}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleStatusUpdate}
                    disabled={!newStatus.status}
                    className="flex-1 px-4 py-2 rounded-lg text-sm font-medium text-white transition-all duration-200 hover:shadow-lg disabled:opacity-50"
                    style={{ backgroundColor: colors.primary }}
                  >
                    <Save className="w-4 h-4 inline mr-2" />
                    Update Status
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

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
            {/* Transporter Details */}
            <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-sm'}`}>
              <h3 className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                <Building className="w-5 h-5 inline mr-2" style={{ color: colors.primary }} />
                Transporter Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Company Name</p>
                  <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{booking?.companyName}</p>
                </div>
                <div>
                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Business Address</p>
                  <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{booking?.businessAddress}</p>
                </div>
                <div>
                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Contact Person</p>
                  <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{booking?.contactPerson}</p>
                </div>
                <div>
                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Contact Details</p>
                  <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{booking?.contactPhone} • {booking?.contactEmail}</p>
                </div>
              </div>
            </div>

            {/* Shipper & Consignee */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-sm'}`}>
                <h3 className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  <User className="w-5 h-5 inline mr-2" style={{ color: colors.primary }} />
                  Shipper
                </h3>
                <div className="space-y-2">
                  <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{booking?.shipper}</p>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{booking?.shipperAddress}</p>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{booking?.shipperContact}</p>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{booking?.shipperPhone} • {booking?.shipperEmail}</p>
                </div>
              </div>

              <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-sm'}`}>
                <h3 className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  <Package className="w-5 h-5 inline mr-2" style={{ color: colors.primary }} />
                  Consignee
                </h3>
                <div className="space-y-2">
                  <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{booking?.consignee}</p>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{booking?.consigneeAddress}</p>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{booking?.consigneeContact}</p>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{booking?.consigneePhone} • {booking?.consigneeEmail}</p>
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
                <History className="w-5 h-5 inline mr-2" style={{ color: colors.primary }} />
                Tracking History
              </h3>
              <div className="space-y-3 max-h-80 overflow-y-auto pr-2">
                {statusHistory.map((track, index) => {
                  const trackStatus = getStatusBadge(track.status);
                  const TrackIcon = trackStatus.icon;
                  return (
                    <div key={track.id} className={`p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                      <div className="flex items-start gap-3">
                        <div className="mt-1">
                          <div className={`w-2 h-2 rounded-full`} style={{ backgroundColor: trackStatus.color }}></div>
                          {index < statusHistory.length - 1 && (
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
                {statusHistory.length === 0 && (
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
                <button 
                  onClick={() => setShowStatusModal(true)}
                  className="w-full flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white transition-all duration-200 hover:shadow-lg"
                  style={{ backgroundColor: colors.success }}
                >
                  <Play className="w-4 h-4" />
                  Update Status
                </button>
                <button className="w-full flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white transition-all duration-200 hover:shadow-lg"
                  style={{ backgroundColor: colors.primary }}>
                  <FileText className="w-4 h-4" />
                  View Documents
                </button>
                <button className="w-full flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border transition-all duration-200"
                  style={{ borderColor: colors.primary, color: colors.primary }}>
                  <Download className="w-4 h-4" />
                  Download All
                </button>
                <button 
                  onClick={handleEdit}
                  className="w-full flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:shadow-md"
                  style={{ backgroundColor: colors.primary, color: 'white' }}
                >
                  <Edit className="w-4 h-4" />
                  Edit Booking
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FreightForwarderBookingDetails;