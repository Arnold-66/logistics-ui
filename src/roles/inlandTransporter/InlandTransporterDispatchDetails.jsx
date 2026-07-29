// roles/inlandTransporter/InlandTransporterDispatchDetails.jsx
import React, { useState, useContext, useEffect } from 'react';
import { ThemeContext } from '../../context/themeContext';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft, Truck, Package, MapPin, Calendar, Clock, User, Building,
  Phone, Mail, FileText, Download, Edit, CheckCircle, AlertCircle,
  Navigation, Printer, CheckSquare, X, Users, ClipboardList,
  AlertTriangle, Eye, Save, TrendingUp, PhoneCall
} from 'lucide-react';

const InlandTransporterDispatchDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { darkMode } = useContext(ThemeContext);
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState(null);
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
      setOrder({
        id: id || 'DO-2026-001',
        orderNo: 'DO-12345',
        companyName: 'ImportFlow Logistics',
        businessAddress: 'Plot 123, Industrial Area, Kampala, Uganda',
        contactPerson: 'John Mukasa',
        contactPhone: '+256 700 123456',
        contactEmail: 'john@importflow.com',
        dispatchDate: '2026-08-10',
        deliveryOrder: 'DLV-001',
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
        eta: '2026-08-12 14:30',
        actualArrival: null,
        status: 'In Transit',
        priority: 'High',
        cargoDescription: 'Electronics and Machinery',
        declaredValue: '450,000,000 UGX',
        submittedDate: '2026-08-08',
        lastUpdate: '2 hours ago',
        route: 'Kampala → Mombasa',
        distance: '380 km',
        estimatedDuration: '2 days',
        tracking: [
          { date: '2026-08-08 08:00', location: 'Kampala Warehouse', status: 'Pickup Complete' },
          { date: '2026-08-08 10:30', location: 'Kampala - Jinja Highway', status: 'In Transit' },
          { date: '2026-08-09 14:00', location: 'Jinja', status: 'In Transit' },
          { date: '2026-08-10 09:00', location: 'Busia Border', status: 'In Transit' }
        ],
        documents: [
          { name: 'Dispatch Order', type: 'PDF', size: '2.4 MB' },
          { name: 'Delivery Order', type: 'PDF', size: '1.8 MB' },
          { name: 'Waybill', type: 'PDF', size: '1.2 MB' }
        ]
      });
      setLoading(false);
    }, 500);
  }, [id]);

  const getStatusBadge = (status) => {
    const statusMap = {
      'Pending Dispatch': { bg: colors.warning + '20', color: colors.warning, icon: Clock },
      'In Transit': { bg: colors.info + '20', color: colors.info, icon: Truck },
      'Scheduled': { bg: colors.teal + '20', color: colors.teal, icon: Calendar },
      'Delivered': { bg: colors.success + '20', color: colors.success, icon: CheckCircle },
      'Delayed': { bg: colors.danger + '20', color: colors.danger, icon: AlertCircle },
      'Completed': { bg: colors.success + '20', color: colors.success, icon: CheckCircle }
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

  const handleEditClick = () => {
    navigate(`/inland-transporter/dispatch/edit/${order.id}`);
  };

  const handleStatusUpdateClick = () => {
    setStatusUpdate({
      status: order.status,
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

    const updatedOrder = { ...order };
    updatedOrder.status = statusUpdate.status;
    updatedOrder.lastUpdate = 'Just now';

    const trackingEntry = {
      date: `${statusUpdate.date || new Date().toISOString().split('T')[0]} ${new Date().toLocaleTimeString()}`,
      location: statusUpdate.location || order.deliveryAddress || 'N/A',
      status: statusUpdate.status,
      notes: statusUpdate.notes || 'Status updated'
    };

    if (!updatedOrder.tracking) {
      updatedOrder.tracking = [];
    }
    updatedOrder.tracking.push(trackingEntry);

    setOrder(updatedOrder);
    setShowStatusModal(false);
    setStatusUpdate({
      status: '',
      notes: '',
      location: '',
      date: ''
    });
  };

  const handleStartDispatch = () => {
    const updatedOrder = { ...order };
    updatedOrder.status = 'In Transit';
    updatedOrder.lastUpdate = 'Just now';

    const trackingEntry = {
      date: `${new Date().toISOString().split('T')[0]} ${new Date().toLocaleTimeString()}`,
      location: order.deliveryAddress || 'N/A',
      status: 'In Transit',
      notes: 'Dispatch started'
    };

    if (!updatedOrder.tracking) {
      updatedOrder.tracking = [];
    }
    updatedOrder.tracking.push(trackingEntry);

    setOrder(updatedOrder);
  };

  const handleMarkDelivered = () => {
    const updatedOrder = { ...order };
    updatedOrder.status = 'Delivered';
    updatedOrder.actualArrival = new Date().toISOString();
    updatedOrder.lastUpdate = 'Just now';

    const trackingEntry = {
      date: `${new Date().toISOString().split('T')[0]} ${new Date().toLocaleTimeString()}`,
      location: order.deliveryAddress || 'N/A',
      status: 'Delivered',
      notes: 'Delivery completed'
    };

    if (!updatedOrder.tracking) {
      updatedOrder.tracking = [];
    }
    updatedOrder.tracking.push(trackingEntry);

    setOrder(updatedOrder);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: isDark ? '#1a1a2e' : '#f8fafc' }}>
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto" style={{ borderColor: colors.primary }}></div>
      </div>
    );
  }

  const statusStyle = getStatusBadge(order.status);
  const priorityStyle = getPriorityBadge(order.priority);
  const StatusIcon = statusStyle.icon;

  return (
    <div className="min-h-screen w-full p-4 md:p-6" style={{ backgroundColor: isDark ? '#1a1a2e' : '#f8fafc' }}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => navigate('/inland-transporter/dispatch-orders')}
            className="p-2 rounded-lg transition-colors hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <ArrowLeft className={`w-5 h-5 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
          </button>
          <div>
            <h1 className={`text-2xl md:text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Dispatch Order Details
            </h1>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              {order.orderNo} • {order.companyName}
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
                    Order: {order.orderNo}
                  </label>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    {order.companyName} → {order.consignee}
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
                    <option value="Pending Dispatch">Pending Dispatch</option>
                    <option value="In Transit">In Transit</option>
                    <option value="Delayed">Delayed</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Completed">Completed</option>
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
              {order.status}
            </span>
            <span className={`text-sm px-3 py-1 rounded-full`}
              style={{ backgroundColor: priorityStyle.bg, color: priorityStyle.color }}>
              {order.priority}
            </span>
            <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              Submitted: {order.submittedDate}
            </span>
            <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              Last Updated: {order.lastUpdate}
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
                  <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{order.companyName}</p>
                </div>
                <div>
                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Business Address</p>
                  <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{order.businessAddress}</p>
                </div>
                <div>
                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Contact Person</p>
                  <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{order.contactPerson}</p>
                </div>
                <div>
                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Contact Details</p>
                  <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{order.contactPhone} • {order.contactEmail}</p>
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
                  <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{order.consignee}</p>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{order.consigneeAddress}</p>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{order.consigneeContact}</p>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{order.consigneePhone} • {order.consigneeEmail}</p>
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
                    <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{order.deliveryAddress}</p>
                  </div>
                  <div>
                    <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Delivery Order</p>
                    <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{order.deliveryOrder}</p>
                  </div>
                  <div>
                    <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Dispatch Date</p>
                    <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{order.dispatchDate}</p>
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
                  <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{order.truckDetails.plateNo}</p>
                </div>
                <div>
                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Truck Type</p>
                  <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{order.truckDetails.truckType}</p>
                </div>
                <div>
                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Driver Name</p>
                  <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{order.truckDetails.driverName}</p>
                </div>
                <div>
                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Driver Phone</p>
                  <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{order.truckDetails.driverPhone}</p>
                </div>
                <div>
                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Capacity</p>
                  <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{order.truckDetails.capacity}</p>
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
                  <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{order.cargoDescription}</p>
                </div>
                <div>
                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Declared Value</p>
                  <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{order.declaredValue}</p>
                </div>
                <div>
                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Route</p>
                  <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{order.route}</p>
                </div>
                <div>
                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Distance</p>
                  <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{order.distance}</p>
                </div>
                <div>
                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Estimated Duration</p>
                  <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{order.estimatedDuration}</p>
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
                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>ETA</p>
                  <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{order.eta}</p>
                </div>
                <div>
                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Distance</p>
                  <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{order.distance}</p>
                </div>
                <div>
                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Route</p>
                  <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{order.route}</p>
                </div>
                <div>
                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Dispatch Date</p>
                  <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{order.dispatchDate}</p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-sm'}`}>
              <h3 className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Actions
              </h3>
              <div className="space-y-2">
                {order.status === 'Pending Dispatch' && (
                  <button 
                    onClick={handleStartDispatch}
                    className="w-full flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white transition-all duration-200 hover:shadow-lg"
                    style={{ backgroundColor: colors.success }}
                  >
                    <CheckSquare className="w-4 h-4" />
                    Start Dispatch
                  </button>
                )}
                {order.status === 'In Transit' && (
                  <button 
                    onClick={handleMarkDelivered}
                    className="w-full flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white transition-all duration-200 hover:shadow-lg"
                    style={{ backgroundColor: colors.success }}
                  >
                    <CheckCircle className="w-4 h-4" />
                    Mark as Delivered
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
                  Edit Order
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

            {/* Tracking */}
            <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-sm'}`}>
              <h3 className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                <Clock className="w-5 h-5 inline mr-2" style={{ color: colors.primary }} />
                Tracking History
              </h3>
              <div className="space-y-3 max-h-60 overflow-y-auto">
                {order.tracking.map((track, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="flex flex-col items-center">
                      <div className="w-2 h-2 rounded-full mt-1.5" style={{ backgroundColor: colors.primary }}></div>
                      {index < order.tracking.length - 1 && (
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
                {order.documents.map((doc, index) => (
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

export default InlandTransporterDispatchDetails;