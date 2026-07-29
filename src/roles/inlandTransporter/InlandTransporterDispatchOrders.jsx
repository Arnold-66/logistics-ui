// roles/inlandTransporter/InlandTransporterDispatchOrders.jsx
import React, { useState, useContext, useEffect } from 'react';
import {
  Truck, Package, MapPin, Calendar, Clock, Eye, CheckCircle, AlertCircle,
  Search, Filter, Download, RefreshCw, Plus, X, ChevronDown, ChevronUp,
  Users, Building, Phone, Mail, Navigation, AlertTriangle, CheckSquare,
  FileText, Printer, Edit, Trash2, ClipboardList, Save, User, PhoneCall,
  TrendingUp, Award
} from 'lucide-react';
import { ThemeContext } from '../../context/themeContext';
import { useAuth } from '../../context/authContext';
import { useNavigate } from 'react-router-dom';

const InlandTransporterDispatchOrders = () => {
  const navigate = useNavigate();
  const { darkMode } = useContext(ThemeContext);
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [editingOrder, setEditingOrder] = useState(null);
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

  const [dispatchOrders, setDispatchOrders] = useState([
    {
      id: 'DO-2026-001',
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
      status: 'In Transit',
      priority: 'High',
      cargoDescription: 'Electronics and Machinery',
      declaredValue: '450,000,000 UGX',
      submittedDate: '2026-08-08',
      lastUpdate: '2 hours ago',
      route: 'Kampala → Mombasa',
      distance: '380 km',
      estimatedDuration: '2 days',
      trackingHistory: [
        { date: '2026-08-08 08:00', location: 'Kampala Warehouse', status: 'Pickup Complete' },
        { date: '2026-08-08 10:30', location: 'Kampala - Jinja Highway', status: 'In Transit' }
      ]
    },
    {
      id: 'DO-2026-002',
      orderNo: 'DO-12346',
      companyName: 'East Africa Transport',
      businessAddress: 'Plot 45, Industrial Area, Kampala, Uganda',
      contactPerson: 'Peter Habimana',
      contactPhone: '+256 700 234567',
      contactEmail: 'peter@eastafrica.com',
      dispatchDate: '2026-08-12',
      deliveryOrder: 'DLV-002',
      consignee: 'Rwanda Importers Ltd',
      consigneeAddress: 'KG 7 Ave, Kigali, Rwanda',
      consigneePhone: '+250 788 123456',
      consigneeEmail: 'info@rwandaimporters.com',
      deliveryAddress: 'KG 7 Ave, Kigali, Rwanda',
      truckDetails: {
        plateNo: 'RAB 5678',
        driverName: 'Jean Pierre',
        driverPhone: '+250 788 123456',
        truckType: '20ft Container Truck',
        capacity: '15 tons'
      },
      eta: '2026-08-14 09:00',
      status: 'Pending Dispatch',
      priority: 'Medium',
      cargoDescription: 'Agricultural Equipment',
      declaredValue: '120,000,000 UGX',
      submittedDate: '2026-08-11',
      lastUpdate: '1 day ago',
      route: 'Kampala → Kigali',
      distance: '230 km',
      estimatedDuration: '1 day',
      trackingHistory: [
        { date: '2026-08-11 14:00', location: 'Kampala Warehouse', status: 'Ready for Dispatch' }
      ]
    },
    {
      id: 'DO-2026-003',
      orderNo: 'DO-12347',
      companyName: 'Global Logistics Ltd',
      businessAddress: 'Mombasa Road, Nairobi, Kenya',
      contactPerson: 'Sarah Kamau',
      contactPhone: '+254 722 123456',
      contactEmail: 'sarah@globallogistics.com',
      dispatchDate: '2026-08-05',
      deliveryOrder: 'DLV-003',
      consignee: 'Nairobi Distributors',
      consigneeAddress: 'Mombasa Road, Nairobi, Kenya',
      consigneePhone: '+254 722 789012',
      consigneeEmail: 'info@nairobidistributors.com',
      deliveryAddress: 'Mombasa Road, Nairobi, Kenya',
      truckDetails: {
        plateNo: 'KAB 9012',
        driverName: 'Michael Ochieng',
        driverPhone: '+254 722 123456',
        truckType: 'Refrigerated Truck',
        capacity: '12 tons'
      },
      eta: '2026-08-08',
      status: 'Delivered',
      priority: 'Low',
      cargoDescription: 'Consumer Goods',
      declaredValue: '75,000,000 UGX',
      submittedDate: '2026-08-03',
      lastUpdate: '3 days ago',
      route: 'Entebbe → Nairobi',
      distance: '420 km',
      estimatedDuration: '3 days',
      trackingHistory: [
        { date: '2026-08-05 07:00', location: 'Entebbe Warehouse', status: 'Pickup Complete' },
        { date: '2026-08-06 14:00', location: 'Kisumu', status: 'In Transit' },
        { date: '2026-08-08 16:30', location: 'Nairobi', status: 'Delivered' }
      ]
    },
    {
      id: 'DO-2026-004',
      orderNo: 'DO-12348',
      companyName: 'ImportFlow Logistics',
      businessAddress: 'Plot 123, Industrial Area, Kampala, Uganda',
      contactPerson: 'John Mukasa',
      contactPhone: '+256 700 123456',
      contactEmail: 'john@importflow.com',
      dispatchDate: '2026-08-15',
      deliveryOrder: 'DLV-004',
      consignee: 'Uganda Manufacturers',
      consigneeAddress: 'Plot 45, Bweyogerere, Kampala, Uganda',
      consigneePhone: '+256 700 456789',
      consigneeEmail: 'info@ugandamanufacturers.com',
      deliveryAddress: 'Plot 45, Bweyogerere, Kampala, Uganda',
      truckDetails: {
        plateNo: 'UAB 7890',
        driverName: 'David Okello',
        driverPhone: '+256 700 789012',
        truckType: '20ft Container Truck',
        capacity: '15 tons'
      },
      eta: '2026-08-16 16:00',
      status: 'Scheduled',
      priority: 'High',
      cargoDescription: 'Raw Materials',
      declaredValue: '280,000,000 UGX',
      submittedDate: '2026-08-13',
      lastUpdate: '5 hours ago',
      route: 'Kampala → Jinja',
      distance: '80 km',
      estimatedDuration: '1 day',
      trackingHistory: [
        { date: '2026-08-13 10:00', location: 'Kampala Warehouse', status: 'Scheduled' }
      ]
    }
  ]);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

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

  const handleEditOrder = (order) => {
    navigate(`/inland-transporter/dispatch/edit/${order.id}`);
  };

  const handleStatusUpdate = (order) => {
    setEditingOrder(order);
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

    const index = dispatchOrders.findIndex(o => o.id === editingOrder.id);
    if (index !== -1) {
      const updatedOrders = [...dispatchOrders];
      const order = updatedOrders[index];
      
      order.status = statusUpdate.status;
      order.lastUpdate = 'Just now';
      
      const trackingEntry = {
        date: `${statusUpdate.date || new Date().toISOString().split('T')[0]} ${new Date().toLocaleTimeString()}`,
        location: statusUpdate.location || order.deliveryAddress || 'N/A',
        status: statusUpdate.status,
        notes: statusUpdate.notes || 'Status updated'
      };
      
      if (!order.trackingHistory) {
        order.trackingHistory = [];
      }
      order.trackingHistory.push(trackingEntry);
      
      setDispatchOrders(updatedOrders);
    }
    
    setShowStatusModal(false);
    setEditingOrder(null);
    setStatusUpdate({
      status: '',
      notes: '',
      location: '',
      date: ''
    });
  };

  const handleDeleteOrder = (orderId) => {
    if (window.confirm('Are you sure you want to delete this dispatch order?')) {
      setDispatchOrders(dispatchOrders.filter(o => o.id !== orderId));
    }
  };

  const filteredOrders = dispatchOrders.filter(order => {
    const matchesSearch = 
      order.orderNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.consignee.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.truckDetails.plateNo.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: isDark ? '#1a1a2e' : '#f8fafc' }}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto" style={{ borderColor: colors.primary }}></div>
          <p className={`mt-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Loading dispatch orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full p-4 md:p-6" style={{ backgroundColor: isDark ? '#1a1a2e' : '#f8fafc' }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className={`text-2xl md:text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Dispatch Orders
            </h1>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              Manage all dispatch orders and deliveries
            </p>
          </div>
          <div className="flex gap-2">
            <button
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:shadow-lg"
              style={{ backgroundColor: colors.primary, color: 'white' }}
              onClick={() => navigate('/inland-transporter/dispatch/new')}
            >
              <Plus className="w-4 h-4" />
              New Dispatch Order
            </button>
            <button
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                isDark ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-600'
              }`}
              onClick={() => window.location.reload()}
            >
              <RefreshCw className="w-4 h-4" />
              Refresh
            </button>
          </div>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6">
          <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white shadow-sm'}`}>
            <div className="flex items-center gap-2">
              <ClipboardList className="w-4 h-4" style={{ color: colors.primary }} />
              <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Total Orders</span>
            </div>
            <p className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{dispatchOrders.length}</p>
          </div>
          <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white shadow-sm'}`}>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" style={{ color: colors.warning }} />
              <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Pending</span>
            </div>
            <p className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {dispatchOrders.filter(o => o.status === 'Pending Dispatch' || o.status === 'Scheduled').length}
            </p>
          </div>
          <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white shadow-sm'}`}>
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4" style={{ color: colors.info }} />
              <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>In Transit</span>
            </div>
            <p className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {dispatchOrders.filter(o => o.status === 'In Transit').length}
            </p>
          </div>
          <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white shadow-sm'}`}>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" style={{ color: colors.success }} />
              <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Delivered</span>
            </div>
            <p className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {dispatchOrders.filter(o => o.status === 'Delivered').length}
            </p>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${isDark ? 'text-gray-400' : 'text-gray-400'}`} />
            <input
              type="text"
              placeholder="Search by order no, company, consignee, or plate no..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full pl-10 pr-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                isDark ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400' : 'bg-white border-gray-200 text-gray-900'
              }`}
              style={{ focusRingColor: colors.primary }}
            />
          </div>
          <div className="flex gap-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className={`px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                isDark ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-200 text-gray-900'
              }`}
              style={{ focusRingColor: colors.primary }}
            >
              <option value="all">All Status</option>
              <option value="Pending Dispatch">Pending Dispatch</option>
              <option value="Scheduled">Scheduled</option>
              <option value="In Transit">In Transit</option>
              <option value="Delivered">Delivered</option>
              <option value="Delayed">Delayed</option>
            </select>
            <button
              className={`p-2 rounded-lg border transition-colors ${
                isDark ? 'border-gray-700 hover:bg-gray-800' : 'border-gray-200 hover:bg-gray-50'
              }`}
            >
              <Filter className={`w-5 h-5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
            </button>
          </div>
        </div>

        {/* Status Update Modal */}
        {showStatusModal && editingOrder && (
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
                    Order: {editingOrder.orderNo}
                  </label>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    {editingOrder.companyName} → {editingOrder.consignee}
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

        {/* Orders List */}
        <div className={`rounded-lg ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-md'}`}>
          {filteredOrders.length === 0 ? (
            <div className="p-8 text-center">
              <Truck className="w-12 h-12 mx-auto mb-4" style={{ color: colors.primary }} />
              <p className={`text-lg font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                No dispatch orders found
              </p>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                Try adjusting your search or filters
              </p>
            </div>
          ) : (
            <div className="divide-y" style={{ borderColor: isDark ? '#374151' : '#e5e7eb' }}>
              {filteredOrders.map((order) => {
                const statusStyle = getStatusBadge(order.status);
                const priorityStyle = getPriorityBadge(order.priority);
                const StatusIcon = statusStyle.icon;
                const isExpanded = expandedOrder === order.id;

                return (
                  <div key={order.id} className="p-4">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                      <div className="flex-1 cursor-pointer" onClick={() => setExpandedOrder(isExpanded ? null : order.id)}>
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
                            <Truck className="w-5 h-5" style={{ color: colors.primary }} />
                          </div>
                          <div>
                            <div className="flex items-center gap-2 flex-wrap">
                              <h3 className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                {order.orderNo}
                              </h3>
                              <span className={`text-xs px-2 py-0.5 rounded-full flex items-center gap-1`}
                                style={{ backgroundColor: statusStyle.bg, color: statusStyle.color }}>
                                <StatusIcon className="w-3 h-3" />
                                {order.status}
                              </span>
                              <span className={`text-xs px-2 py-0.5 rounded-full`}
                                style={{ backgroundColor: priorityStyle.bg, color: priorityStyle.color }}>
                                {order.priority}
                              </span>
                            </div>
                            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                              {order.companyName} → {order.consignee}
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-wrap items-center gap-3 ml-12 mt-1">
                          <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                            <MapPin className="w-3 h-3 inline mr-1" />
                            {order.deliveryAddress}
                          </span>
                          <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                            <Truck className="w-3 h-3 inline mr-1" />
                            {order.truckDetails.plateNo}
                          </span>
                          <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                            <Calendar className="w-3 h-3 inline mr-1" />
                            ETA: {order.eta}
                          </span>
                          <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                            <Navigation className="w-3 h-3 inline mr-1" />
                            {order.distance}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {/* Edit Button - Navigates to Edit Page */}
                        <button
                          onClick={() => handleEditOrder(order)}
                          className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                          title="Edit Order"
                        >
                          <Edit className="w-4 h-4" style={{ color: colors.primary }} />
                        </button>
                        {/* Status Update Button */}
                        <button
                          onClick={() => handleStatusUpdate(order)}
                          className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                          title="Update Status"
                        >
                          <TrendingUp className="w-4 h-4" style={{ color: colors.success }} />
                        </button>
                        {/* View Details Button */}
                        <button
                          onClick={() => navigate(`/inland-transporter/dispatch/${order.id}`)}
                          className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" style={{ color: colors.primary }} />
                        </button>
                        {/* Delete Button */}
                        <button
                          onClick={() => handleDeleteOrder(order.id)}
                          className="p-1.5 rounded-lg hover:bg-red-100 dark:hover:bg-red-900 transition-colors"
                          title="Delete Order"
                        >
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </button>
                        <button
                          onClick={() => setExpandedOrder(isExpanded ? null : order.id)}
                          className="p-1.5 rounded-lg transition-colors hover:bg-gray-100 dark:hover:bg-gray-700"
                          style={{ color: colors.primary }}
                        >
                          {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                        </button>
                      </div>
                    </div>

                    {/* Expanded Content */}
                    {isExpanded && (
                      <div className="mt-3 pt-3 border-t space-y-3"
                        style={{ borderColor: isDark ? '#374151' : '#e5e7eb' }}>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                          <div>
                            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Company</p>
                            <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{order.companyName}</p>
                          </div>
                          <div>
                            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Contact Person</p>
                            <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{order.contactPerson}</p>
                          </div>
                          <div>
                            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Dispatch Date</p>
                            <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{order.dispatchDate}</p>
                          </div>
                          <div>
                            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Delivery Order</p>
                            <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{order.deliveryOrder}</p>
                          </div>
                        </div>

                        <div>
                          <p className={`text-xs font-medium mb-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                            Truck Details
                          </p>
                          <div className={`p-2 rounded ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                              <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                Plate: {order.truckDetails.plateNo}
                              </span>
                              <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                Driver: {order.truckDetails.driverName}
                              </span>
                              <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                Phone: {order.truckDetails.driverPhone}
                              </span>
                              <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                Type: {order.truckDetails.truckType || 'N/A'}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Cargo Description</p>
                            <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{order.cargoDescription}</p>
                          </div>
                          <div>
                            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Declared Value</p>
                            <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{order.declaredValue}</p>
                          </div>
                        </div>

                        {/* Tracking History */}
                        {order.trackingHistory && order.trackingHistory.length > 0 && (
                          <div>
                            <p className={`text-xs font-medium mb-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                              <Clock className="w-3 h-3 inline mr-1" />
                              Tracking History
                            </p>
                            <div className={`space-y-1 max-h-40 overflow-y-auto ${isDark ? 'bg-gray-700' : 'bg-gray-100'} p-2 rounded`}>
                              {order.trackingHistory.map((track, idx) => (
                                <div key={idx} className="flex items-center gap-2 text-xs">
                                  <span className={`w-2 h-2 rounded-full flex-shrink-0 ${
                                    track.status === 'Delivered' ? 'bg-green-500' :
                                    track.status === 'In Transit' ? 'bg-blue-500' :
                                    track.status === 'Scheduled' ? 'bg-teal-500' :
                                    track.status === 'Pending Dispatch' ? 'bg-yellow-500' :
                                    'bg-gray-500'
                                  }`}></span>
                                  <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>
                                    {track.date}
                                  </span>
                                  <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>
                                    {track.location}
                                  </span>
                                  <span className={`px-1.5 py-0.5 rounded-full text-[10px] ${
                                    track.status === 'Delivered' ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' :
                                    track.status === 'In Transit' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300' :
                                    track.status === 'Scheduled' ? 'bg-teal-100 text-teal-700 dark:bg-teal-900 dark:text-teal-300' :
                                    'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'
                                  }`}>
                                    {track.status}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        <div className="flex flex-wrap gap-2 pt-2">
                          <button
                            onClick={() => handleEditOrder(order)}
                            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:shadow-md"
                            style={{ backgroundColor: colors.primary, color: 'white' }}
                          >
                            <Edit className="w-4 h-4" />
                            Edit Order
                          </button>
                          <button
                            onClick={() => handleStatusUpdate(order)}
                            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
                            style={{ backgroundColor: colors.success, color: 'white' }}
                          >
                            <TrendingUp className="w-4 h-4" />
                            Update Status
                          </button>
                            <button
                                onClick={() => navigate(`/inland-transporter/document/${order.id}?type=dispatch`)}
                                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 border"
                                style={{ borderColor: colors.primary, color: colors.primary }}
                                >
                                <FileText className="w-4 h-4" />
                                View Documents
                            </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InlandTransporterDispatchOrders;