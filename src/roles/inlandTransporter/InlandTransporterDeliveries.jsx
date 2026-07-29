// roles/inlandTransporter/InlandTransporterDeliveries.jsx
import React, { useState, useContext, useEffect } from 'react';
import {
  Truck, Package, MapPin, Calendar, Clock, Eye, CheckCircle, AlertCircle,
  Search, Filter, Download, RefreshCw, Plus, X, ChevronDown, ChevronUp,
  Users, Building, Phone, Mail, Navigation, CheckSquare, FileText,
  Printer, Edit, Star, ClipboardList
} from 'lucide-react';
import { ThemeContext } from '../../context/themeContext';
import { useAuth } from '../../context/authContext';
import { useNavigate } from 'react-router-dom';

const InlandTransporterDeliveries = () => {
  const navigate = useNavigate();
  const { darkMode } = useContext(ThemeContext);
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [expandedDelivery, setExpandedDelivery] = useState(null);

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

  const [deliveries, setDeliveries] = useState([
    {
      id: 'DLV-2026-001',
      deliveryNo: 'DLV-001',
      orderNo: 'DO-12345',
      companyName: 'ImportFlow Logistics',
      consignee: 'Global Importers Inc',
      deliveryAddress: 'Plot 123, Industrial Area, Kampala, Uganda',
      truckDetails: {
        plateNo: 'UAB 1234',
        driverName: 'Robert Ssali'
      },
      scheduledDate: '2026-08-12 14:30',
      actualDate: '2026-08-12 13:45',
      status: 'Completed',
      priority: 'High',
      cargoDescription: 'Electronics and Machinery',
      signature: 'John Doe',
      deliveryNotes: 'Goods received in good condition',
      rating: 5,
      distance: '380 km'
    },
    {
      id: 'DLV-2026-002',
      deliveryNo: 'DLV-002',
      orderNo: 'DO-12346',
      companyName: 'East Africa Transport',
      consignee: 'Rwanda Importers Ltd',
      deliveryAddress: 'KG 7 Ave, Kigali, Rwanda',
      truckDetails: {
        plateNo: 'RAB 5678',
        driverName: 'Jean Pierre'
      },
      scheduledDate: '2026-08-14 09:00',
      actualDate: null,
      status: 'In Progress',
      priority: 'Medium',
      cargoDescription: 'Agricultural Equipment',
      signature: null,
      deliveryNotes: null,
      rating: null,
      distance: '230 km'
    },
    {
      id: 'DLV-2026-003',
      deliveryNo: 'DLV-003',
      orderNo: 'DO-12347',
      companyName: 'Global Logistics Ltd',
      consignee: 'Nairobi Distributors',
      deliveryAddress: 'Mombasa Road, Nairobi, Kenya',
      truckDetails: {
        plateNo: 'KAB 9012',
        driverName: 'Michael Ochieng'
      },
      scheduledDate: '2026-08-08',
      actualDate: '2026-08-08 16:30',
      status: 'Completed',
      priority: 'Low',
      cargoDescription: 'Consumer Goods',
      signature: 'Sarah Kamau',
      deliveryNotes: 'Delivery completed successfully',
      rating: 4,
      distance: '420 km'
    },
    {
      id: 'DLV-2026-004',
      deliveryNo: 'DLV-004',
      orderNo: 'DO-12348',
      companyName: 'ImportFlow Logistics',
      consignee: 'Uganda Manufacturers',
      deliveryAddress: 'Plot 45, Bweyogerere, Kampala, Uganda',
      truckDetails: {
        plateNo: 'UAB 7890',
        driverName: 'David Okello'
      },
      scheduledDate: '2026-08-16 16:00',
      actualDate: null,
      status: 'Scheduled',
      priority: 'High',
      cargoDescription: 'Raw Materials',
      signature: null,
      deliveryNotes: null,
      rating: null,
      distance: '80 km'
    }
  ]);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

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
          <Star key={i} className="w-3 h-3 fill-current" style={{ color: i < rating ? colors.primary : '#d1d5db' }} />
        ))}
      </div>
    );
  };

  const handleViewDetails = (id) => {
    navigate(`/inland-transporter/delivery/${id}`);
  };

  const handleEditDelivery = (id) => {
    navigate(`/inland-transporter/delivery/edit/${id}`);
  };

  const handleNewDelivery = () => {
    navigate('/inland-transporter/delivery/new');
  };

  const filteredDeliveries = deliveries.filter(delivery => {
    const matchesSearch = 
      delivery.deliveryNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      delivery.orderNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      delivery.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      delivery.consignee.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || delivery.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: isDark ? '#1a1a2e' : '#f8fafc' }}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto" style={{ borderColor: colors.primary }}></div>
          <p className={`mt-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Loading deliveries...</p>
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
              Deliveries
            </h1>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              Manage all deliveries and delivery status
            </p>
          </div>
          <div className="flex gap-2">
            <button
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:shadow-lg"
              style={{ backgroundColor: colors.primary, color: 'white' }}
              onClick={handleNewDelivery}
            >
              <Plus className="w-4 h-4" />
              New Delivery
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
              <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Total Deliveries</span>
            </div>
            <p className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{deliveries.length}</p>
          </div>
          <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white shadow-sm'}`}>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" style={{ color: colors.warning }} />
              <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Pending</span>
            </div>
            <p className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {deliveries.filter(d => d.status === 'Scheduled' || d.status === 'In Progress').length}
            </p>
          </div>
          <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white shadow-sm'}`}>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" style={{ color: colors.success }} />
              <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Completed</span>
            </div>
            <p className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {deliveries.filter(d => d.status === 'Completed').length}
            </p>
          </div>
          <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white shadow-sm'}`}>
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4" style={{ color: colors.danger }} />
              <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Delayed</span>
            </div>
            <p className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {deliveries.filter(d => d.status === 'Delayed').length}
            </p>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${isDark ? 'text-gray-400' : 'text-gray-400'}`} />
            <input
              type="text"
              placeholder="Search by delivery no, order no, company, consignee..."
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
              <option value="Scheduled">Scheduled</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
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

        {/* Deliveries List */}
        <div className={`rounded-lg ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-md'}`}>
          {filteredDeliveries.length === 0 ? (
            <div className="p-8 text-center">
              <Truck className="w-12 h-12 mx-auto mb-4" style={{ color: colors.primary }} />
              <p className={`text-lg font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                No deliveries found
              </p>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                Try adjusting your search or filters
              </p>
            </div>
          ) : (
            <div className="divide-y" style={{ borderColor: isDark ? '#374151' : '#e5e7eb' }}>
              {filteredDeliveries.map((delivery) => {
                const statusStyle = getStatusBadge(delivery.status);
                const priorityStyle = getPriorityBadge(delivery.priority);
                const StatusIcon = statusStyle.icon;
                const isExpanded = expandedDelivery === delivery.id;

                return (
                  <div key={delivery.id} className="p-4">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                      <div className="flex-1 cursor-pointer" onClick={() => setExpandedDelivery(isExpanded ? null : delivery.id)}>
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
                            <CheckSquare className="w-5 h-5" style={{ color: colors.primary }} />
                          </div>
                          <div>
                            <div className="flex items-center gap-2 flex-wrap">
                              <h3 className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                {delivery.deliveryNo}
                              </h3>
                              <span className="text-xs text-gray-500">Order: {delivery.orderNo}</span>
                              <span className={`text-xs px-2 py-0.5 rounded-full flex items-center gap-1`}
                                style={{ backgroundColor: statusStyle.bg, color: statusStyle.color }}>
                                <StatusIcon className="w-3 h-3" />
                                {delivery.status}
                              </span>
                              <span className={`text-xs px-2 py-0.5 rounded-full`}
                                style={{ backgroundColor: priorityStyle.bg, color: priorityStyle.color }}>
                                {delivery.priority}
                              </span>
                            </div>
                            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                              {delivery.companyName} → {delivery.consignee}
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-wrap items-center gap-3 ml-12 mt-1">
                          <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                            <MapPin className="w-3 h-3 inline mr-1" />
                            {delivery.deliveryAddress}
                          </span>
                          <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                            <Truck className="w-3 h-3 inline mr-1" />
                            {delivery.truckDetails.plateNo}
                          </span>
                          <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                            <Calendar className="w-3 h-3 inline mr-1" />
                            Scheduled: {delivery.scheduledDate}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {/* Edit Button */}
                        <button
                          onClick={() => handleEditDelivery(delivery.id)}
                          className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                          title="Edit Delivery"
                        >
                          <Edit className="w-4 h-4" style={{ color: colors.primary }} />
                        </button>
                        {/* View Details Button */}
                        <button
                          onClick={() => handleViewDetails(delivery.id)}
                          className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" style={{ color: colors.primary }} />
                        </button>
                        <button
                          onClick={() => setExpandedDelivery(isExpanded ? null : delivery.id)}
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
                            <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{delivery.companyName}</p>
                          </div>
                          <div>
                            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Consignee</p>
                            <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{delivery.consignee}</p>
                          </div>
                          <div>
                            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Driver</p>
                            <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{delivery.truckDetails.driverName}</p>
                          </div>
                          <div>
                            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Distance</p>
                            <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{delivery.distance}</p>
                          </div>
                        </div>

                        <div>
                          <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Cargo Description</p>
                          <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{delivery.cargoDescription}</p>
                        </div>

                        {delivery.status === 'Completed' && (
                          <div className={`p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                              <div>
                                <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Actual Date</p>
                                <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{delivery.actualDate}</p>
                              </div>
                              <div>
                                <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Signature</p>
                                <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{delivery.signature}</p>
                              </div>
                              <div>
                                <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Rating</p>
                                {renderStars(delivery.rating)}
                              </div>
                            </div>
                            <div>
                              <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Delivery Notes</p>
                              <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{delivery.deliveryNotes}</p>
                            </div>
                          </div>
                        )}

                        <div className="flex flex-wrap gap-2 pt-2">
                          <button
                            onClick={() => handleViewDetails(delivery.id)}
                            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:shadow-md"
                            style={{ backgroundColor: colors.primary, color: 'white' }}
                          >
                            <Eye className="w-4 h-4" />
                            View Full Details
                          </button>
                          <button
                            onClick={() => handleEditDelivery(delivery.id)}
                            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 border"
                            style={{ borderColor: colors.primary, color: colors.primary }}
                          >
                            <Edit className="w-4 h-4" />
                            Edit Delivery
                          </button>
                          {delivery.status === 'Scheduled' && (
                            <button
                              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
                              style={{ backgroundColor: colors.success, color: 'white' }}
                            >
                              <Truck className="w-4 h-4" />
                              Start Delivery
                            </button>
                          )}
                          {delivery.status === 'In Progress' && (
                            <button
                              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
                              style={{ backgroundColor: colors.success, color: 'white' }}
                            >
                              <CheckCircle className="w-4 h-4" />
                              Complete Delivery
                            </button>
                          )}
                          <button
                            onClick={() => navigate(`/inland-transporter/document/${delivery.id}?type=delivery`)}
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

export default InlandTransporterDeliveries;