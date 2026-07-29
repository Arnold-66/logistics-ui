// roles/inlandTransporter/InlandTransporterDeliveryDetails.jsx
import React, { useState, useContext, useEffect } from 'react';
import { ThemeContext } from '../../context/themeContext';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft, Truck, Package, MapPin, Calendar, Clock, User, Building,
  Phone, Mail, FileText, Download, Edit, CheckCircle, AlertCircle,
  Navigation, Printer, CheckSquare, X, Users, ClipboardList,
  AlertTriangle, Eye, Save, TrendingUp, PhoneCall, Star, Award
} from 'lucide-react';

const InlandTransporterDeliveryDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { darkMode } = useContext(ThemeContext);
  const [loading, setLoading] = useState(true);
  const [delivery, setDelivery] = useState(null);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [statusUpdate, setStatusUpdate] = useState({
    status: '',
    notes: '',
    location: '',
    date: ''
  });

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
    indigo: '#6366f1',
    orange: '#f97316',
  };

  const isDark = darkMode

  useEffect(() => {
    setTimeout(() => {
      setDelivery({
        id: id || 'DLV-2026-001',
        deliveryNo: 'DLV-001',
        orderNo: 'DO-12345',
        companyName: 'ImportFlow Logistics',
        companyAddress: 'Plot 123, Industrial Area, Kampala, Uganda',
        contactPerson: 'John Mukasa',
        contactPhone: '+256 700 123456',
        contactEmail: 'john@importflow.com',
        consignee: 'Global Importers Inc',
        consigneeAddress: 'Nairobi, Kenya',
        consigneeContact: 'Jane Smith',
        consigneePhone: '+254 722 123456',
        consigneeEmail: 'jane@globalimporters.com',
        deliveryAddress: 'Plot 123, Industrial Area, Kampala, Uganda',
        truckDetails: {
          plateNo: 'UAB 1234',
          driverName: 'Robert Ssali',
          driverPhone: '+256 700 123456',
          truckType: '40ft Flatbed',
          capacity: '25 tons'
        },
        scheduledDate: '2026-08-12 14:30',
        actualDate: '2026-08-12 13:45',
        status: 'Completed',
        priority: 'High',
        cargoDescription: 'Electronics and Machinery',
        declaredValue: '450,000,000 UGX',
        signature: 'John Doe',
        deliveryNotes: 'Goods received in good condition',
        rating: 5,
        distance: '380 km',
        route: 'Kampala → Mombasa',
        estimatedDuration: '2 days',
        trackingHistory: [
          { date: '2026-08-12 08:00', location: 'Kampala Warehouse', status: 'Pickup Complete' },
          { date: '2026-08-12 10:30', location: 'Kampala - Jinja Highway', status: 'In Transit' },
          { date: '2026-08-12 13:45', location: 'Kampala', status: 'Delivered' }
        ],
        documents: [
          { name: 'Delivery Order', type: 'PDF', size: '1.8 MB' },
          { name: 'Proof of Delivery', type: 'PDF', size: '2.1 MB' },
          { name: 'Waybill', type: 'PDF', size: '1.2 MB' }
        ]
      });
      setLoading(false);
    }, 500);
  }, [id]);

  const getStatusBadge = (status) => {
    const statusMap = {
      'Scheduled': { bg: colors.teal + '20', color: colors.teal, icon: Calendar },
      'In Progress': { bg: colors.warning + '20', color: colors.warning, icon: Clock },
      'Completed': { bg: colors.success + '20', color: colors.success, icon: CheckCircle },
      'Delayed': { bg: colors.danger + '20', color: colors.danger, icon: AlertCircle }
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

  const renderStars = (rating) => {
    if (!rating) return null;
    return (
      <div className="flex gap-0.5">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="w-4 h-4 fill-current" style={{ color: i < rating ? colors.primary : '#d1d5db' }} />
        ))}
      </div>
    );
  };

  const handleEditClick = () => {
    navigate(`/inland-transporter/delivery/edit/${delivery.id}`);
  };

  const handleStatusUpdateClick = () => {
    setStatusUpdate({
      status: delivery.status,
      notes: '',
      location: '',
      date: new Date().toISOString().split('T')[0]
    });
    setShowStatusModal(true);
  };

  const handleSaveStatusUpdate = () => {
    if (!statusUpdate.status) {
      alert('Please select a status');
      return;
    }

    const updatedDelivery = { ...delivery };
    updatedDelivery.status = statusUpdate.status;
    updatedDelivery.lastUpdate = 'Just now';

    const trackingEntry = {
      date: `${statusUpdate.date || new Date().toISOString().split('T')[0]} ${new Date().toLocaleTimeString()}`,
      location: statusUpdate.location || delivery.deliveryAddress || 'N/A',
      status: statusUpdate.status,
      notes: statusUpdate.notes || 'Status updated'
    };

    if (!updatedDelivery.trackingHistory) {
      updatedDelivery.trackingHistory = [];
    }
    updatedDelivery.trackingHistory.push(trackingEntry);

    setDelivery(updatedDelivery);
    setShowStatusModal(false);
    setStatusUpdate({
      status: '',
      notes: '',
      location: '',
      date: ''
    });
  };

  const handleStartDelivery = () => {
    const updatedDelivery = { ...delivery };
    updatedDelivery.status = 'In Progress';
    updatedDelivery.lastUpdate = 'Just now';

    const trackingEntry = {
      date: `${new Date().toISOString().split('T')[0]} ${new Date().toLocaleTimeString()}`,
      location: delivery.deliveryAddress || 'N/A',
      status: 'In Progress',
      notes: 'Delivery started'
    };

    if (!updatedDelivery.trackingHistory) {
      updatedDelivery.trackingHistory = [];
    }
    updatedDelivery.trackingHistory.push(trackingEntry);

    setDelivery(updatedDelivery);
  };

  const handleCompleteDelivery = () => {
    const updatedDelivery = { ...delivery };
    updatedDelivery.status = 'Completed';
    updatedDelivery.actualDate = new Date().toISOString();
    updatedDelivery.lastUpdate = 'Just now';

    const trackingEntry = {
      date: `${new Date().toISOString().split('T')[0]} ${new Date().toLocaleTimeString()}`,
      location: delivery.deliveryAddress || 'N/A',
      status: 'Completed',
      notes: 'Delivery completed'
    };

    if (!updatedDelivery.trackingHistory) {
      updatedDelivery.trackingHistory = [];
    }
    updatedDelivery.trackingHistory.push(trackingEntry);

    setDelivery(updatedDelivery);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: isDark ? '#1a1a2e' : '#f8fafc' }}>
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto" style={{ borderColor: colors.primary }}></div>
      </div>
    );
  }

  const statusStyle = getStatusBadge(delivery.status);
  const priorityStyle = getPriorityBadge(delivery.priority);
  const StatusIcon = statusStyle.icon;

  return (
    <div className="min-h-screen w-full p-4 md:p-6" style={{ backgroundColor: isDark ? '#1a1a2e' : '#f8fafc' }}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => navigate('/inland-transporter/deliveries')}
            className="p-2 rounded-lg transition-colors hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <ArrowLeft className={`w-5 h-5 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
          </button>
          <div>
            <h1 className={`text-2xl md:text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Delivery Details
            </h1>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              {delivery.deliveryNo} • Order: {delivery.orderNo}
            </p>
          </div>
          <div className="ml-auto flex gap-2">
            <button 
              onClick={handleStatusUpdateClick}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:shadow-lg"
              style={{ backgroundColor: colors.success, color: 'white' }}
            >
              <TrendingUp className="w-4 h-4" />
              Update Status
            </button>
            <button 
              onClick={handleEditClick}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:shadow-lg"
              style={{ backgroundColor: colors.primary, color: 'white' }}
            >
              <Edit className="w-4 h-4" />
              Edit
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
            <div className={`w-full max-w-md rounded-lg shadow-xl p-6 ${
              isDark ? 'bg-gray-800' : 'bg-white'
            }`}>
              <div className="flex items-center justify-between mb-4">
                <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Update Status
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
                    Delivery: {delivery.deliveryNo}
                  </label>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    {delivery.companyName} → {delivery.consignee}
                  </p>
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    New Status *
                  </label>
                  <select
                    value={statusUpdate.status}
                    onChange={(e) => setStatusUpdate({ ...statusUpdate, status: e.target.value })}
                    className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                      isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                    }`}
                    style={{ focusRingColor: colors.primary }}
                  >
                    <option value="">Select Status</option>
                    <option value="Scheduled">Scheduled</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                    <option value="Delayed">Delayed</option>
                  </select>
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Location
                  </label>
                  <input
                    type="text"
                    value={statusUpdate.location}
                    onChange={(e) => setStatusUpdate({ ...statusUpdate, location: e.target.value })}
                    placeholder="Current location"
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
                    value={statusUpdate.date}
                    onChange={(e) => setStatusUpdate({ ...statusUpdate, date: e.target.value })}
                    className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                      isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                    }`}
                    style={{ focusRingColor: colors.primary }}
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Notes
                  </label>
                  <textarea
                    value={statusUpdate.notes}
                    onChange={(e) => setStatusUpdate({ ...statusUpdate, notes: e.target.value })}
                    placeholder="Additional notes about the status update..."
                    rows="3"
                    className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                      isDark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900'
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
                    onClick={handleSaveStatusUpdate}
                    className="flex-1 px-4 py-2 rounded-lg text-sm font-medium text-white transition-all duration-200 hover:shadow-lg"
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
              {delivery.status}
            </span>
            <span className={`text-sm px-3 py-1 rounded-full`}
              style={{ backgroundColor: priorityStyle.bg, color: priorityStyle.color }}>
              {delivery.priority} Priority
            </span>
            <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              Scheduled: {delivery.scheduledDate}
            </span>
            {delivery.actualDate && (
              <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                Actual: {delivery.actualDate}
              </span>
            )}
            {delivery.rating && (
              <div className="flex items-center gap-1">
                {renderStars(delivery.rating)}
              </div>
            )}
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
                  <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{delivery.companyName}</p>
                </div>
                <div>
                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Address</p>
                  <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{delivery.companyAddress}</p>
                </div>
                <div>
                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Contact Person</p>
                  <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{delivery.contactPerson}</p>
                </div>
                <div>
                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Contact Details</p>
                  <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{delivery.contactPhone} • {delivery.contactEmail}</p>
                </div>
              </div>
            </div>

            {/* Consignee & Delivery */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-sm'}`}>
                <h3 className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  <User className="w-5 h-5 inline mr-2" style={{ color: colors.primary }} />
                  Consignee
                </h3>
                <div className="space-y-2">
                  <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{delivery.consignee}</p>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{delivery.consigneeAddress}</p>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{delivery.consigneeContact}</p>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{delivery.consigneePhone} • {delivery.consigneeEmail}</p>
                </div>
              </div>

              <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-sm'}`}>
                <h3 className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  <MapPin className="w-5 h-5 inline mr-2" style={{ color: colors.primary }} />
                  Delivery Details
                </h3>
                <div className="space-y-2">
                  <div>
                    <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Delivery Address</p>
                    <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{delivery.deliveryAddress}</p>
                  </div>
                  <div>
                    <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Order Reference</p>
                    <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{delivery.orderNo}</p>
                  </div>
                  <div>
                    <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Distance</p>
                    <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{delivery.distance}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Truck Details */}
            <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-sm'}`}>
              <h3 className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                <Truck className="w-5 h-5 inline mr-2" style={{ color: colors.primary }} />
                Truck Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>License Plate</p>
                  <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{delivery.truckDetails.plateNo}</p>
                </div>
                <div>
                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Truck Type</p>
                  <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{delivery.truckDetails.truckType}</p>
                </div>
                <div>
                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Driver Name</p>
                  <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{delivery.truckDetails.driverName}</p>
                </div>
                <div>
                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Driver Phone</p>
                  <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{delivery.truckDetails.driverPhone}</p>
                </div>
                <div>
                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Capacity</p>
                  <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{delivery.truckDetails.capacity}</p>
                </div>
              </div>
            </div>

            {/* Cargo Details */}
            <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-sm'}`}>
              <h3 className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                <Package className="w-5 h-5 inline mr-2" style={{ color: colors.primary }} />
                Cargo Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Description</p>
                  <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{delivery.cargoDescription}</p>
                </div>
                <div>
                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Declared Value</p>
                  <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{delivery.declaredValue}</p>
                </div>
                <div>
                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Route</p>
                  <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{delivery.route}</p>
                </div>
                <div>
                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Estimated Duration</p>
                  <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{delivery.estimatedDuration}</p>
                </div>
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
                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Scheduled Date</p>
                  <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{delivery.scheduledDate}</p>
                </div>
                <div>
                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Distance</p>
                  <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{delivery.distance}</p>
                </div>
                <div>
                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Route</p>
                  <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{delivery.route}</p>
                </div>
                {delivery.signature && (
                  <div>
                    <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Signature</p>
                    <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{delivery.signature}</p>
                  </div>
                )}
                {delivery.rating && (
                  <div>
                    <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Rating</p>
                    {renderStars(delivery.rating)}
                  </div>
                )}
                {delivery.deliveryNotes && (
                  <div>
                    <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Notes</p>
                    <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{delivery.deliveryNotes}</p>
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
                {delivery.status === 'Scheduled' && (
                  <button 
                    onClick={handleStartDelivery}
                    className="w-full flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white transition-all duration-200 hover:shadow-lg"
                    style={{ backgroundColor: colors.success }}
                  >
                    <Truck className="w-4 h-4" />
                    Start Delivery
                  </button>
                )}
                {delivery.status === 'In Progress' && (
                  <button 
                    onClick={handleCompleteDelivery}
                    className="w-full flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white transition-all duration-200 hover:shadow-lg"
                    style={{ backgroundColor: colors.success }}
                  >
                    <CheckCircle className="w-4 h-4" />
                    Complete Delivery
                  </button>
                )}
                <button 
                  onClick={handleStatusUpdateClick}
                  className="w-full flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white transition-all duration-200 hover:shadow-lg"
                  style={{ backgroundColor: colors.info }}
                >
                  <TrendingUp className="w-4 h-4" />
                  Update Status
                </button>
                <button 
                  onClick={handleEditClick}
                  className="w-full flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white transition-all duration-200 hover:shadow-lg"
                  style={{ backgroundColor: colors.primary }}
                >
                  <Edit className="w-4 h-4" />
                  Edit Delivery
                </button>
                <button className="w-full flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border transition-all duration-200"
                  style={{ borderColor: colors.primary, color: colors.primary }}>
                  <FileText className="w-4 h-4" />
                  View Documents
                </button>
                <button className="w-full flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border transition-all duration-200"
                  style={{ borderColor: colors.primary, color: colors.primary }}>
                  <Download className="w-4 h-4" />
                  Download All
                </button>
              </div>
            </div>

            {/* Tracking History */}
            <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-sm'}`}>
              <h3 className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                <Clock className="w-5 h-5 inline mr-2" style={{ color: colors.primary }} />
                Tracking History
              </h3>
              <div className="space-y-3 max-h-60 overflow-y-auto">
                {delivery.trackingHistory.map((track, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="flex flex-col items-center">
                      <div className="w-2 h-2 rounded-full mt-1.5" style={{ backgroundColor: colors.primary }}></div>
                      {index < delivery.trackingHistory.length - 1 && (
                        <div className="w-0.5 h-6" style={{ backgroundColor: colors.primary + '40' }}></div>
                      )}
                    </div>
                    <div>
                      <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {track.status}
                      </p>
                      <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        {track.location}
                      </p>
                      <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                        {track.date}
                      </p>
                      {track.notes && (
                        <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'} italic`}>
                          {track.notes}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Documents */}
            <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-sm'}`}>
              <h3 className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                <FileText className="w-5 h-5 inline mr-2" style={{ color: colors.primary }} />
                Documents
              </h3>
              <div className="space-y-2">
                {delivery.documents.map((doc, index) => (
                  <div key={index} className={`flex items-center justify-between p-2 rounded ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4" style={{ color: colors.primary }} />
                      <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{doc.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{doc.size}</span>
                      <button className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                        <Download className="w-3 h-3" style={{ color: colors.primary }} />
                      </button>
                      <button className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                        <Eye className="w-3 h-3" style={{ color: colors.primary }} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InlandTransporterDeliveryDetails;