// roles/freightForwarder/FreightForwarderBookings.jsx
import React, { useState, useContext, useEffect } from 'react';
import {
  Ship, Package, Container, Calendar, Clock, Eye, CheckCircle, AlertCircle,
  TrendingUp, Users, FileText, ClipboardList, MapPin, ArrowRight, Search,
  Filter, Download, RefreshCw, Plus, X, ChevronRight, ChevronDown, ChevronUp,
  Home, Building, Phone, Mail, User, BarChart3, Activity, Layers, Truck,
  Anchor, Globe, Flag, BookOpen
} from 'lucide-react';
import { ThemeContext } from '../../context/themeContext';
import { useAuth } from '../../context/authContext';
import { useNavigate } from 'react-router-dom';

const FreightForwarderBookings = () => {
  const navigate = useNavigate();
  const { darkMode } = useContext(ThemeContext);
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [expandedBooking, setExpandedBooking] = useState(null);

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

  // Sample bookings data
  const [bookings, setBookings] = useState([
    {
      id: 'FRT-2026-001',
      bookingNo: 'BKG-12345678',
      blNo: 'BL-2026-001',
      shipper: 'ImportFlow Ltd',
      shipperContact: 'John Doe',
      consignee: 'Global Importers Inc',
      vessel: 'MV Star Express',
      voyage: 'SE-2026-078',
      portOfLoading: 'Kampala, Uganda',
      portOfDischarge: 'Port of Mombasa',
      placeOfDelivery: 'Nairobi, Kenya',
      containers: [
        { id: 'MSKU-458921', size: '20ft', packages: 450, weight: '12.5 tons' },
        { id: 'MSKU-458922', size: '40ft', packages: 320, weight: '4.5 tons' }
      ],
      status: 'Pending Approval',
      declaredValue: '749,484,375 UGX',
      shippingDate: '2026-07-25',
      eta: '2026-08-12 14:30',
      finalDelivery: 'Kampala, Uganda',
      submittedDate: '2026-07-20',
      lastUpdate: '2 hours ago',
      priority: 'High',
      typeOfMovement: 'FCL',
      countryFlag: 'Uganda'
    },
    {
      id: 'FRT-2026-002',
      bookingNo: 'BKG-23456789',
      blNo: 'BL-2026-002',
      shipper: 'East Africa Trading Co',
      shipperContact: 'Peter Habimana',
      consignee: 'Rwanda Importers Ltd',
      vessel: 'MV Pacific Voyager',
      voyage: 'PV-2026-045',
      portOfLoading: 'Kampala, Uganda',
      portOfDischarge: 'Port of Mombasa',
      placeOfDelivery: 'Kigali, Rwanda',
      containers: [
        { id: 'JP-893421', size: '20ft', packages: 150, weight: '1.2 tons' }
      ],
      status: 'In Transit',
      declaredValue: '325,000,000 UGX',
      shippingDate: '2026-07-29',
      eta: '2026-08-18 09:00',
      finalDelivery: 'Kigali, Rwanda',
      submittedDate: '2026-07-22',
      lastUpdate: '4 hours ago',
      priority: 'Medium',
      typeOfMovement: 'LCL',
      countryFlag: 'Rwanda'
    },
    {
      id: 'FRT-2026-003',
      bookingNo: 'BKG-34567890',
      blNo: 'BL-2026-003',
      shipper: 'Global Importers Inc',
      shipperContact: 'Sarah Kamau',
      consignee: 'Nairobi Distributors',
      vessel: 'MV African Trader',
      voyage: 'AT-2026-067',
      portOfLoading: 'Entebbe, Uganda',
      portOfDischarge: 'Nairobi, Kenya',
      placeOfDelivery: 'Nairobi, Kenya',
      containers: [
        { id: 'SA-456732', size: '40ft', packages: 320, weight: '10.8 tons' }
      ],
      status: 'Delivered',
      declaredValue: '187,500,000 UGX',
      shippingDate: '2026-07-10',
      eta: '2026-08-05',
      finalDelivery: 'Nairobi, Kenya',
      submittedDate: '2026-07-05',
      lastUpdate: '2 days ago',
      priority: 'Low',
      typeOfMovement: 'FCL',
      countryFlag: 'Kenya'
    },
    {
      id: 'FRT-2026-004',
      bookingNo: 'BKG-45678901',
      blNo: 'BL-2026-004',
      shipper: 'ImportFlow Ltd',
      shipperContact: 'John Doe',
      consignee: 'Uganda Manufacturers',
      vessel: 'MV Pacific Voyager',
      voyage: 'PV-2026-045',
      portOfLoading: 'Kampala, Uganda',
      portOfDischarge: 'Port of Mombasa',
      placeOfDelivery: 'Kampala, Uganda',
      containers: [
        { id: 'MSKU-458923', size: '20ft', packages: 280, weight: '3.2 tons' },
        { id: 'MSKU-458924', size: '20ft', packages: 150, weight: '4.5 tons' }
      ],
      status: 'In Customs',
      declaredValue: '1,200,000,000 UGX',
      shippingDate: '2026-09-05',
      eta: '2026-09-22 16:00',
      finalDelivery: 'Kampala, Uganda',
      submittedDate: '2026-08-28',
      lastUpdate: '3 days ago',
      priority: 'High',
      typeOfMovement: 'FCL',
      countryFlag: 'Uganda'
    }
  ]);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  const getStatusBadge = (status) => {
    const statusMap = {
      'Pending Approval': { bg: colors.warning + '20', color: colors.warning, icon: Clock },
      'In Transit': { bg: colors.info + '20', color: colors.info, icon: Ship },
      'In Customs': { bg: colors.orange + '20', color: colors.orange, icon: AlertCircle },
      'Delivered': { bg: colors.success + '20', color: colors.success, icon: CheckCircle },
      'Pending Documentation': { bg: colors.warning + '20', color: colors.warning, icon: FileText }
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

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = 
      booking.bookingNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.shipper.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.consignee.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.blNo.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || booking.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: isDark ? '#1a1a2e' : '#f8fafc' }}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto" style={{ borderColor: colors.primary }}></div>
          <p className={`mt-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Loading bookings...</p>
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
              Freight Bookings
            </h1>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              Manage all your freight bookings and shipments
            </p>
          </div>
          <div className="flex gap-2">
            <button
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:shadow-lg"
              style={{ backgroundColor: colors.primary, color: 'white' }}
              onClick={() => navigate('/freight-forwarder/booking/new')}
            >
              <Plus className="w-4 h-4" />
              New Booking
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

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${isDark ? 'text-gray-400' : 'text-gray-400'}`} />
            <input
              type="text"
              placeholder="Search by booking no, shipper, consignee, or BL no..."
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
              <option value="Pending Approval">Pending Approval</option>
              <option value="In Transit">In Transit</option>
              <option value="In Customs">In Customs</option>
              <option value="Delivered">Delivered</option>
              <option value="Pending Documentation">Pending Documentation</option>
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

        {/* Bookings List */}
        <div className={`rounded-lg ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-md'}`}>
          {filteredBookings.length === 0 ? (
            <div className="p-8 text-center">
              <Package className="w-12 h-12 mx-auto mb-4" style={{ color: colors.primary }} />
              <p className={`text-lg font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                No bookings found
              </p>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                Try adjusting your search or filters
              </p>
            </div>
          ) : (
            <div className="divide-y" style={{ borderColor: isDark ? '#374151' : '#e5e7eb' }}>
              {filteredBookings.map((booking) => {
                const statusStyle = getStatusBadge(booking.status);
                const priorityStyle = getPriorityBadge(booking.priority);
                const StatusIcon = statusStyle.icon;
                const isExpanded = expandedBooking === booking.id;

                return (
                  <div key={booking.id} className="p-4">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                      <div className="flex-1 cursor-pointer" onClick={() => setExpandedBooking(isExpanded ? null : booking.id)}>
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
                            <Package className="w-5 h-5" style={{ color: colors.primary }} />
                          </div>
                          <div>
                            <div className="flex items-center gap-2 flex-wrap">
                              <h3 className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                {booking.bookingNo}
                              </h3>
                              <span className="text-xs text-gray-500">BL: {booking.blNo}</span>
                              <span className={`text-xs px-2 py-0.5 rounded-full flex items-center gap-1`}
                                style={{ backgroundColor: statusStyle.bg, color: statusStyle.color }}>
                                <StatusIcon className="w-3 h-3" />
                                {booking.status}
                              </span>
                              <span className={`text-xs px-2 py-0.5 rounded-full`}
                                style={{ backgroundColor: priorityStyle.bg, color: priorityStyle.color }}>
                                {booking.priority}
                              </span>
                            </div>
                            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                              {booking.shipper} → {booking.consignee}
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-wrap items-center gap-3 ml-12 mt-1">
                          <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                            <Ship className="w-3 h-3 inline mr-1" />
                            {booking.vessel}
                          </span>
                          <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                            <Container className="w-3 h-3 inline mr-1" />
                            {booking.containers.length} containers
                          </span>
                          <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                            <Calendar className="w-3 h-3 inline mr-1" />
                            ETA: {booking.eta}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => navigate(`/freight-forwarder/booking/${booking.id}`)}
                          className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" style={{ color: colors.primary }} />
                        </button>
                        <button
                          onClick={() => setExpandedBooking(isExpanded ? null : booking.id)}
                          className="p-1.5 rounded-lg transition-colors hover:bg-gray-100 dark:hover:bg-gray-700"
                          style={{ color: colors.primary }}
                        >
                          {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                        </button>
                      </div>
                    </div>

                    {/* Expanded Content */}
                    {isExpanded && (
                      <div className="mt-3 pt-3 border-t space-y-3" style={{ borderColor: isDark ? '#374151' : '#e5e7eb' }}>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                          <div>
                            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Shipper</p>
                            <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{booking.shipper}</p>
                          </div>
                          <div>
                            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Consignee</p>
                            <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{booking.consignee}</p>
                          </div>
                          <div>
                            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Port of Loading</p>
                            <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{booking.portOfLoading}</p>
                          </div>
                          <div>
                            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Port of Discharge</p>
                            <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{booking.portOfDischarge}</p>
                          </div>
                          <div>
                            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Vessel</p>
                            <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{booking.vessel}</p>
                          </div>
                          <div>
                            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Voyage</p>
                            <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{booking.voyage}</p>
                          </div>
                          <div>
                            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Type of Movement</p>
                            <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{booking.typeOfMovement}</p>
                          </div>
                          <div>
                            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Declared Value</p>
                            <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{booking.declaredValue}</p>
                          </div>
                        </div>

                        <div>
                          <p className={`text-xs font-medium mb-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                            Containers
                          </p>
                          <div className="space-y-1">
                            {booking.containers.map((container, idx) => (
                              <div key={idx} className={`flex items-center justify-between p-2 rounded ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
                                <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                  {container.id}
                                </span>
                                <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                                  {container.size} • {container.packages} packages • {container.weight}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2 pt-2">
                          <button
                            onClick={() => navigate(`/freight-forwarder/booking/${booking.id}`)}
                            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:shadow-md"
                            style={{ backgroundColor: colors.primary, color: 'white' }}
                          >
                            <Eye className="w-4 h-4" />
                            View Full Details
                          </button>
                          <button
                            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 border"
                            style={{ borderColor: colors.primary, color: colors.primary }}
                          >
                            <FileText className="w-4 h-4" />
                            View Documents
                          </button>
                          <button
                            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 border"
                            style={{ borderColor: colors.primary, color: colors.primary }}
                          >
                            <Download className="w-4 h-4" />
                            Export
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

export default FreightForwarderBookings;