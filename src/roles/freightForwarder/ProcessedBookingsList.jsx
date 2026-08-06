// roles/freightForwarder/ProcessedBookingsList.jsx
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search, Filter, Eye, Map, TrendingUp, TrendingDown,
  Ship, Calendar, MapPin, Package, CheckCircle, Clock,
  AlertCircle, Download, FileText, Truck, Users, Filter as FilterIcon,
  X, ChevronDown, ChevronUp
} from 'lucide-react';
import { ThemeContext } from '../../context/themeContext';

const ProcessedBookingsList = () => {
  const navigate = useNavigate();
  const { darkMode } = useContext(ThemeContext);
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterImporter, setFilterImporter] = useState('all');
  const [importers, setImporters] = useState([]);
  const [sortBy, setSortBy] = useState('date'); // 'date', 'importer', 'status'
  const [sortOrder, setSortOrder] = useState('desc'); // 'asc', 'desc'
  const [showFilters, setShowFilters] = useState(false);

  const colors = {
    primary: '#714b67',
    success: '#10b981',
    warning: '#f59e0b',
    danger: '#ef4444',
    info: '#3b82f6',
  };

  const isDark = darkMode;

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = () => {
    const processed = JSON.parse(localStorage.getItem('processedBookings') || '[]');
    setBookings(processed);
    setFilteredBookings(processed);
    
    // Extract unique importers (consignees) for filter
    const uniqueImporters = [...new Set(processed.map(b => b.consignee || b.consigneeName).filter(Boolean))];
    setImporters(uniqueImporters);
  };

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    applyFilters(term, filterStatus, filterImporter);
  };

  const handleFilterStatus = (status) => {
    setFilterStatus(status);
    applyFilters(searchTerm, status, filterImporter);
  };

  const handleFilterImporter = (importer) => {
    setFilterImporter(importer);
    applyFilters(searchTerm, filterStatus, importer);
  };

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
    applySorting(filteredBookings, field, sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const applyFilters = (term, status, importer) => {
    let filtered = bookings;
    
    if (term) {
      filtered = filtered.filter(b => 
        b.bookingNo?.toLowerCase().includes(term) ||
        b.shipper?.toLowerCase().includes(term) ||
        b.exporter?.toLowerCase().includes(term) ||
        b.consignee?.toLowerCase().includes(term) ||
        b.consigneeName?.toLowerCase().includes(term) ||
        b.trackingId?.toLowerCase().includes(term) ||
        b.destination?.toLowerCase().includes(term)
      );
    }
    
    if (status !== 'all') {
      filtered = filtered.filter(b => b.status === status);
    }
    
    if (importer !== 'all') {
      filtered = filtered.filter(b => (b.consignee || b.consigneeName) === importer);
    }
    
    applySorting(filtered, sortBy, sortOrder);
  };

  const applySorting = (data, field, order) => {
    const sorted = [...data].sort((a, b) => {
      let valA, valB;
      
      switch(field) {
        case 'date':
          valA = new Date(a.processedAt || a.createdAt || 0);
          valB = new Date(b.processedAt || b.createdAt || 0);
          break;
        case 'importer':
          valA = (a.consignee || a.consigneeName || '').toLowerCase();
          valB = (b.consignee || b.consigneeName || '').toLowerCase();
          break;
        case 'status':
          valA = a.status || '';
          valB = b.status || '';
          break;
        case 'booking':
          valA = a.bookingNo || '';
          valB = b.bookingNo || '';
          break;
        default:
          valA = a.processedAt || a.createdAt || 0;
          valB = b.processedAt || b.createdAt || 0;
      }
      
      if (valA < valB) return order === 'asc' ? -1 : 1;
      if (valA > valB) return order === 'asc' ? 1 : -1;
      return 0;
    });
    
    setFilteredBookings(sorted);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setFilterStatus('all');
    setFilterImporter('all');
    setFilteredBookings(bookings);
    applySorting(bookings, sortBy, sortOrder);
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'processing': return 'bg-yellow-100 text-yellow-700';
      case 'in_transit': return 'bg-blue-100 text-blue-700';
      case 'arrived': return 'bg-green-100 text-green-700';
      case 'delivered': return 'bg-purple-100 text-purple-700';
      case 'delayed': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'processing': return <Clock className="w-4 h-4" />;
      case 'in_transit': return <Ship className="w-4 h-4" />;
      case 'arrived': return <CheckCircle className="w-4 h-4" />;
      case 'delivered': return <Package className="w-4 h-4" />;
      case 'delayed': return <AlertCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getStatusLabel = (status) => {
    return status?.replace('_', ' ').toUpperCase() || 'PROCESSING';
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-6 py-4 md:py-6">
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Processed Bookings
          </h2>
          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            {filteredBookings.length} bookings processed
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate('/freight-forwarder/process-booking')}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white transition-all duration-200 hover:shadow-lg"
            style={{ backgroundColor: colors.primary }}
          >
            <Ship className="w-4 h-4" />
            Process New Booking
          </button>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`p-2 rounded-lg transition-all duration-200 border
              ${isDark ? 'border-gray-600 hover:bg-gray-700' : 'border-gray-300 hover:bg-gray-100'}`}
          >
            <FilterIcon className="w-5 h-5" style={{ color: colors.primary }} />
          </button>
        </div>
      </div>

      {/* Filters Section */}
      {showFilters && (
        <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white'} border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Search
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by booking, shipper, consignee..."
                  value={searchTerm}
                  onChange={handleSearch}
                  className={`w-full pl-10 pr-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200
                    ${isDark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900'}`}
                  style={{ focusRingColor: colors.primary }}
                />
              </div>
            </div>
            
            <div className="flex-1">
              <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Importer (Consignee)
              </label>
              <select
                value={filterImporter}
                onChange={(e) => handleFilterImporter(e.target.value)}
                className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200
                  ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                style={{ focusRingColor: colors.primary }}
              >
                <option value="all">All Importers</option>
                {importers.map((importer, index) => (
                  <option key={index} value={importer}>{importer}</option>
                ))}
              </select>
            </div>

            <div className="flex-1">
              <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Status
              </label>
              <select
                value={filterStatus}
                onChange={(e) => handleFilterStatus(e.target.value)}
                className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200
                  ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                style={{ focusRingColor: colors.primary }}
              >
                <option value="all">All Status</option>
                <option value="processing">Processing</option>
                <option value="in_transit">In Transit</option>
                <option value="arrived">Arrived</option>
                <option value="delivered">Delivered</option>
                <option value="delayed">Delayed</option>
              </select>
            </div>

            <div className="flex items-end">
              <button
                onClick={clearFilters}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 border"
                style={{ borderColor: colors.primary, color: colors.primary }}
              >
                <X className="w-4 h-4" />
                Clear Filters
              </button>
            </div>
          </div>

          {/* Active Filters */}
          {(searchTerm || filterStatus !== 'all' || filterImporter !== 'all') && (
            <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t" style={{ borderColor: isDark ? '#374151' : '#e5e7eb' }}>
              <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Active Filters:</span>
              {searchTerm && (
                <span className={`text-xs px-2 py-1 rounded-full flex items-center gap-1 ${isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'}`}>
                  Search: {searchTerm}
                  <button onClick={() => { setSearchTerm(''); applyFilters('', filterStatus, filterImporter); }}>
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {filterStatus !== 'all' && (
                <span className={`text-xs px-2 py-1 rounded-full flex items-center gap-1 ${isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'}`}>
                  Status: {getStatusLabel(filterStatus)}
                  <button onClick={() => handleFilterStatus('all')}>
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {filterImporter !== 'all' && (
                <span className={`text-xs px-2 py-1 rounded-full flex items-center gap-1 ${isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'}`}>
                  Importer: {filterImporter}
                  <button onClick={() => handleFilterImporter('all')}>
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
            </div>
          )}
        </div>
      )}

      {/* Sort Controls */}
      <div className="flex flex-wrap items-center gap-2">
        <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Sort by:</span>
        <button
          onClick={() => handleSort('date')}
          className={`text-xs px-3 py-1 rounded-full transition-all duration-200 flex items-center gap-1
            ${sortBy === 'date' ? (isDark ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-900') : (isDark ? 'text-gray-400 hover:bg-gray-700' : 'text-gray-500 hover:bg-gray-100')}`}
        >
          Date
          {sortBy === 'date' && (sortOrder === 'asc' ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />)}
        </button>
        <button
          onClick={() => handleSort('importer')}
          className={`text-xs px-3 py-1 rounded-full transition-all duration-200 flex items-center gap-1
            ${sortBy === 'importer' ? (isDark ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-900') : (isDark ? 'text-gray-400 hover:bg-gray-700' : 'text-gray-500 hover:bg-gray-100')}`}
        >
          Importer
          {sortBy === 'importer' && (sortOrder === 'asc' ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />)}
        </button>
        <button
          onClick={() => handleSort('status')}
          className={`text-xs px-3 py-1 rounded-full transition-all duration-200 flex items-center gap-1
            ${sortBy === 'status' ? (isDark ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-900') : (isDark ? 'text-gray-400 hover:bg-gray-700' : 'text-gray-500 hover:bg-gray-100')}`}
        >
          Status
          {sortBy === 'status' && (sortOrder === 'asc' ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />)}
        </button>
        <button
          onClick={() => handleSort('booking')}
          className={`text-xs px-3 py-1 rounded-full transition-all duration-200 flex items-center gap-1
            ${sortBy === 'booking' ? (isDark ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-900') : (isDark ? 'text-gray-400 hover:bg-gray-700' : 'text-gray-500 hover:bg-gray-100')}`}
        >
          Booking #
          {sortBy === 'booking' && (sortOrder === 'asc' ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />)}
        </button>
      </div>

      {/* Bookings List */}
      {filteredBookings.length === 0 ? (
        <div className={`p-12 text-center rounded-lg border-2 border-dashed ${isDark ? 'border-gray-600' : 'border-gray-300'}`}>
          <Package className="w-16 h-16 mx-auto mb-4" style={{ color: colors.primary }} />
          <h3 className={`text-lg font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            No Processed Bookings Found
          </h3>
          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            {bookings.length === 0 ? 'Start processing bookings from the available list.' : 'Try adjusting your filters.'}
          </p>
          {bookings.length > 0 && (
            <button
              onClick={clearFilters}
              className="mt-4 px-4 py-2 rounded-lg text-sm font-medium text-white transition-all duration-200 hover:shadow-lg"
              style={{ backgroundColor: colors.primary }}
            >
              Clear Filters
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {filteredBookings.map((booking, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg transition-all duration-200 hover:shadow-lg border
                ${isDark ? 'bg-gray-800 border-gray-700 hover:border-gray-600' : 'bg-white border-gray-200 hover:border-gray-300'}`}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className={`text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-700`}>
                      {booking.movementType || 'FCL'}
                    </span>
                    <span className={`text-xs px-2 py-0.5 rounded-full flex items-center gap-1 ${getStatusColor(booking.status)}`}>
                      {getStatusIcon(booking.status)}
                      {getStatusLabel(booking.status)}
                    </span>
                    {booking.priority === 'urgent' && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-red-100 text-red-700 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        Urgent
                      </span>
                    )}
                    {booking.priority === 'high' && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-orange-100 text-orange-700 flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" />
                        High Priority
                      </span>
                    )}
                  </div>
                  <h4 className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {booking.bookingNo}
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 mt-2 text-sm">
                    <div>
                      <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Shipper</p>
                      <p className={isDark ? 'text-white' : 'text-gray-900'}>{booking.shipper || booking.exporter}</p>
                    </div>
                    <div>
                      <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Importer (Consignee)</p>
                      <p className={isDark ? 'text-white' : 'text-gray-900'}>{booking.consignee || booking.consigneeName}</p>
                    </div>
                    <div>
                      <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Route</p>
                      <p className={isDark ? 'text-white' : 'text-gray-900'}>
                        {booking.plannedPortOfLoading} → {booking.plannedPortOfDischarge}
                      </p>
                    </div>
                    <div>
                      <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Tracking ID</p>
                      <p className={isDark ? 'text-white' : 'text-gray-900'}>{booking.trackingId}</p>
                    </div>
                  </div>
                  {booking.assignedVessel && (
                    <div className="mt-2 text-sm">
                      <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Vessel: </span>
                      <span className={isDark ? 'text-white' : 'text-gray-900'}>
                        {booking.assignedVessel} ({booking.assignedVoyage})
                      </span>
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => navigate(`/freight-forwarder/processed-bookings/${booking.trackingId}`)}
                    className="p-2 rounded-lg transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                    title="View Details"
                  >
                    <Eye className="w-5 h-5" style={{ color: colors.primary }} />
                  </button>
                  <button
                    onClick={() => navigate(`/freight-forwarder/track/${booking.trackingId}`)}
                    className="p-2 rounded-lg transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                    title="Track Shipment"
                  >
                    <Map className="w-5 h-5" style={{ color: colors.primary }} />
                  </button>
                  <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    {new Date(booking.processedAt || booking.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
    </div>
  );
};

export default ProcessedBookingsList;