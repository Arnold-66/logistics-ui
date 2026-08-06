// components/common/ShipmentTracker.jsx
import React, { useState, useEffect, useContext } from 'react';
import {
  MapPin, Ship, Package, Clock, Calendar, CheckCircle,
  AlertCircle, Navigation, Map, X, RefreshCw, Edit,
  TrendingUp, TrendingDown, Anchor, Compass, ArrowRight
} from 'lucide-react';
import { ThemeContext } from '../context/themeContext';

/**
 * ShipmentTracker - Reusable shipment tracking component
 * Can be used in any page by passing trackingId or booking data
 * 
 * @param {string} trackingId - The tracking ID to load (optional)
 * @param {object} bookingData - Pre-loaded booking data (optional)
 * @param {boolean} showBackButton - Show back to bookings button
 * @param {string} backPath - Path for back button
 * @param {function} onStatusUpdate - Callback when status is updated
 * @param {boolean} showStatusUpdate - Show status update button
 * @param {function} onRefresh - Callback when refresh is triggered
 */
const ShipmentTracker = ({ 
  trackingId = null,
  bookingData = null,
  showBackButton = true,
  backPath = '/freight-forwarder/processed-bookings',
  onStatusUpdate = null,
  showStatusUpdate = true,
  onRefresh = null,
  className = '',
  compact = false
}) => {
  const { darkMode } = useContext(ThemeContext);
  const [booking, setBooking] = useState(bookingData);
  const [loading, setLoading] = useState(!bookingData);
  const [showStatusUpdateModal, setShowStatusUpdateModal] = useState(false);
  const [newStatus, setNewStatus] = useState('');
  const [newLocation, setNewLocation] = useState('');

  const colors = {
    primary: '#714b67',
    success: '#10b981',
    warning: '#f59e0b',
    danger: '#ef4444',
    info: '#3b82f6',
  };

  const isDark = darkMode;

  useEffect(() => {
    if (bookingData) {
      setBooking(bookingData);
      setNewStatus(bookingData.status || 'processing');
      setNewLocation(bookingData.currentLocation || bookingData.plannedPortOfLoading || '');
      setLoading(false);
    } else if (trackingId) {
      loadBooking();
    }
  }, [trackingId, bookingData]);

  const loadBooking = () => {
    setLoading(true);
    const processed = JSON.parse(localStorage.getItem('processedBookings') || '[]');
    const found = processed.find(b => b.trackingId === trackingId);
    if (found) {
      setBooking(found);
      setNewStatus(found.status || 'processing');
      setNewLocation(found.currentLocation || found.plannedPortOfLoading || '');
    }
    setLoading(false);
  };

  const handleUpdateStatus = () => {
    if (!booking) return;
    
    const updatedBooking = {
      ...booking,
      status: newStatus,
      currentLocation: newLocation,
      lastUpdated: new Date().toISOString(),
      timeline: [
        ...(booking.timeline || []),
        {
          date: new Date().toISOString(),
          status: newStatus,
          location: newLocation || 'Unknown',
          description: `Status updated to ${newStatus.replace('_', ' ')}`
        }
      ]
    };

    const processed = JSON.parse(localStorage.getItem('processedBookings') || '[]');
    const index = processed.findIndex(b => b.trackingId === trackingId);
    if (index !== -1) {
      processed[index] = updatedBooking;
      localStorage.setItem('processedBookings', JSON.stringify(processed));
    }

    setBooking(updatedBooking);
    setShowStatusUpdateModal(false);
    
    if (onStatusUpdate) {
      onStatusUpdate(updatedBooking);
    }
    
    alert('✅ Shipment status updated successfully!');
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'processing': return '#f59e0b';
      case 'in_transit': return '#3b82f6';
      case 'arrived': return '#10b981';
      case 'delivered': return '#8b5cf6';
      case 'delayed': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const getStatusLabel = (status) => {
    return status?.replace('_', ' ').toUpperCase() || 'PROCESSING';
  };

  const getStatusBgColor = (status) => {
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

  const renderMap = () => {
    if (!booking) return null;
    
    const progress = booking?.status === 'delivered' ? 100 :
                     booking?.status === 'arrived' ? 75 :
                     booking?.status === 'in_transit' ? 50 :
                     booking?.status === 'processing' ? 25 : 0;

    return (
      <div className={`relative p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white'} border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
        <div className="flex items-center gap-2 mb-4">
          <Map className="w-5 h-5" style={{ color: colors.primary }} />
          <h4 className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Shipment Progress
          </h4>
          <span className={`ml-auto text-xs px-2 py-0.5 rounded-full ${isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'}`}>
            {progress}% Complete
          </span>
        </div>
        
        <div className="relative h-72 rounded-lg overflow-hidden" style={{ backgroundColor: isDark ? '#1a1a2e' : '#f0f2f5' }}>
          <div className="absolute inset-0 flex items-center justify-center p-4">
            <div className="relative w-full max-w-md h-full mx-auto">
              {/* Background Grid */}
              <div className="absolute inset-0 opacity-10" style={{ 
                backgroundImage: `radial-gradient(circle, ${isDark ? '#ffffff' : '#000000'} 1px, transparent 1px)`,
                backgroundSize: '20px 20px'
              }} />
              
              {/* Route Path - Background */}
              <svg className="absolute inset-0 w-full h-full">
                <path
                  d="M 15% 80% C 20% 30%, 40% 20%, 50% 40% C 60% 60%, 70% 30%, 85% 70%"
                  fill="none"
                  stroke={isDark ? '#374151' : '#e5e7eb'}
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                
                {/* Progress route path (colored) */}
                <path
                  d="M 15% 80% C 20% 30%, 40% 20%, 50% 40% C 60% 60%, 70% 30%, 85% 70%"
                  fill="none"
                  stroke={colors.primary}
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeDasharray={`${progress * 3.5} 350`}
                  strokeDashoffset="0"
                  style={{ transition: 'stroke-dasharray 1s ease-in-out' }}
                />
              </svg>

              {/* Waypoints */}
              <div className="absolute inset-0">
                {/* Origin Marker */}
                <div className="absolute" style={{ left: '12%', top: '78%' }}>
                  <div className="relative">
                    <div className="w-6 h-6 rounded-full bg-green-500 border-2 border-white shadow-lg flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-white"></div>
                    </div>
                    <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                      <span className={`text-[10px] ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Origin</span>
                    </div>
                  </div>
                </div>

                {/* Destination Marker */}
                <div className="absolute" style={{ left: '82%', top: '68%' }}>
                  <div className="relative">
                    <div className="w-6 h-6 rounded-full bg-red-500 border-2 border-white shadow-lg flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-white"></div>
                    </div>
                    <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                      <span className={`text-[10px] ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Destination</span>
                    </div>
                  </div>
                </div>

                {/* Ship - Moving along the route */}
                {progress > 0 && (
                  <div 
                    className="absolute transition-all duration-1000 ease-in-out"
                    style={{
                      left: `${15 + (progress / 100) * 70}%`,
                      top: `${80 - (progress / 100) * 20}%`,
                      transform: `translate(-50%, -50%) rotate(${progress * 0.5}deg)`
                    }}
                  >
                    <div className="relative">
                      <div className="w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center border-2" style={{ borderColor: colors.primary }}>
                        <Ship className="w-5 h-5" style={{ color: colors.primary }} />
                      </div>
                      <div className="absolute inset-0 rounded-full animate-ping opacity-30" style={{ backgroundColor: colors.primary }}></div>
                    </div>
                  </div>
                )}

                {/* Progress Waypoints */}
                {Array.from({ length: 10 }).map((_, index) => {
                  const pointProgress = (index / 9) * 100;
                  const isActive = pointProgress <= progress;
                  const x = 15 + (pointProgress / 100) * 70;
                  const y = 80 - (pointProgress / 100) * 20;
                  
                  return (
                    <div
                      key={index}
                      className="absolute rounded-full transition-all duration-500"
                      style={{
                        left: `${x}%`,
                        top: `${y}%`,
                        width: isActive ? '8px' : '4px',
                        height: isActive ? '8px' : '4px',
                        backgroundColor: isActive ? colors.primary : (isDark ? '#374151' : '#d1d5db'),
                        transform: 'translate(-50%, -50%)',
                        opacity: isActive ? 1 : 0.5,
                        boxShadow: isActive ? `0 0 8px ${colors.primary}` : 'none'
                      }}
                    />
                  );
                })}
              </div>

              {/* Progress Label */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="text-center">
                  <div className={`px-3 py-1.5 rounded-lg backdrop-blur-sm ${isDark ? 'bg-gray-900/70' : 'bg-white/70'}`}>
                    <span className={`text-sm font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {progress}% Complete
                    </span>
                  </div>
                  <div className="mt-2">
                    <span className={`text-xs px-3 py-1 rounded-full flex items-center gap-1 ${getStatusBgColor(booking?.status)}`}>
                      {getStatusIcon(booking?.status)}
                      {getStatusLabel(booking?.status)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Route Info - Compact or Full */}
        {!compact ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div className={`p-3 rounded-lg ${isDark ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
              <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                <MapPin className="w-3 h-3 inline mr-1 text-green-500" />
                Origin
              </p>
              <p className={`font-medium text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {booking?.plannedPortOfLoading || 'Not set'}
              </p>
            </div>
            <div className={`p-3 rounded-lg ${isDark ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
              <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                <Navigation className="w-3 h-3 inline mr-1" style={{ color: colors.primary }} />
                Current Location
              </p>
              <p className={`font-medium text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {booking?.currentLocation || booking?.plannedPortOfLoading || 'Unknown'}
              </p>
            </div>
            <div className={`p-3 rounded-lg ${isDark ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
              <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                <MapPin className="w-3 h-3 inline mr-1 text-red-500" />
                Destination
              </p>
              <p className={`font-medium text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {booking?.plannedPortOfDischarge || 'Not set'}
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-2 mt-4 text-center">
            <div>
              <p className={`text-[10px] ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Origin</p>
              <p className={`text-xs font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {booking?.plannedPortOfLoading?.split(',')[0] || 'N/A'}
              </p>
            </div>
            <div>
              <p className={`text-[10px] ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Current</p>
              <p className={`text-xs font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {booking?.currentLocation?.split(',')[0] || 'N/A'}
              </p>
            </div>
            <div>
              <p className={`text-[10px] ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Destination</p>
              <p className={`text-xs font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {booking?.plannedPortOfDischarge?.split(',')[0] || 'N/A'}
              </p>
            </div>
          </div>
        )}

        {/* Progress Bar */}
        <div className="mt-4">
          <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: isDark ? '#374151' : '#e5e7eb' }}>
            <div 
              className="h-full rounded-full transition-all duration-1000 ease-in-out"
              style={{ 
                width: `${progress}%`,
                backgroundColor: progress === 100 ? colors.success : colors.primary
              }}
            />
          </div>
        </div>
      </div>
    );
  };

  const renderTimeline = () => {
    if (!booking) return null;
    const timeline = booking?.timeline || [];
    
    return (
      <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white'} border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
        <h4 className={`font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          <Clock className="w-5 h-5 inline mr-2" style={{ color: colors.primary }} />
          Timeline
        </h4>
        
        {timeline.length === 0 ? (
          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>No updates yet</p>
        ) : (
          <div className={`space-y-4 ${!compact ? 'max-h-80 overflow-y-auto pr-2' : ''}`}>
            {timeline.slice(0, compact ? 5 : timeline.length).map((item, index) => (
              <div key={index} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-3 h-3 rounded-full mt-1.5" style={{ backgroundColor: getStatusColor(item.status) }} />
                  {index < timeline.length - 1 && index < (compact ? 4 : timeline.length - 1) && (
                    <div className="w-0.5 flex-1" style={{ backgroundColor: isDark ? '#374151' : '#e5e7eb' }} />
                  )}
                </div>
                <div className="flex-1 pb-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {getStatusLabel(item.status)}
                    </span>
                    <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      {new Date(item.date).toLocaleString()}
                    </span>
                  </div>
                  {item.location && (
                    <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      📍 {item.location}
                    </p>
                  )}
                  {item.description && (
                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      {item.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
            {compact && timeline.length > 5 && (
              <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'} text-center`}>
                +{timeline.length - 5} more updates
              </p>
            )}
          </div>
        )}
      </div>
    );
  };

  const renderStatusUpdateModal = () => (
    <div 
      className="fixed inset-0 flex items-center justify-center z-50 p-4"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
      onClick={() => setShowStatusUpdateModal(false)}
    >
      <div 
        className={`max-w-md w-full p-6 rounded-lg shadow-xl ${isDark ? 'bg-gray-800' : 'bg-white'}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Update Shipment Status
          </h3>
          <button
            onClick={() => setShowStatusUpdateModal(false)}
            className={`p-1 rounded-lg transition-colors duration-200 ${
              isDark ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-500'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Status
            </label>
            <select
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
              className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200
                ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
              style={{ focusRingColor: colors.primary }}
            >
              <option value="processing">Processing</option>
              <option value="in_transit">In Transit</option>
              <option value="arrived">Arrived</option>
              <option value="delivered">Delivered</option>
              <option value="delayed">Delayed</option>
            </select>
          </div>

          <div>
            <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Location
            </label>
            <input
              type="text"
              value={newLocation}
              onChange={(e) => setNewLocation(e.target.value)}
              placeholder="Current location"
              className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200
                ${isDark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900'}`}
              style={{ focusRingColor: colors.primary }}
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              onClick={handleUpdateStatus}
              className="flex-1 px-4 py-2 rounded-lg text-sm font-medium text-white transition-all duration-200 hover:shadow-lg"
              style={{ backgroundColor: colors.primary }}
            >
              Update Status
            </button>
            <button
              onClick={() => setShowStatusUpdateModal(false)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 border
                ${isDark ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : 'border-gray-300 text-gray-700 hover:bg-gray-50'}`}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Loading State
  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2" style={{ borderColor: colors.primary }}></div>
      </div>
    );
  }

  // No Booking Found
  if (!booking) {
    return (
      <div className={`p-12 text-center rounded-lg border-2 border-dashed ${isDark ? 'border-gray-600' : 'border-gray-300'}`}>
        <AlertCircle className="w-16 h-16 mx-auto mb-4" style={{ color: colors.danger }} />
        <h3 className={`text-lg font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          Booking Not Found
        </h3>
        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
          The shipment you're looking for doesn't exist.
        </p>
      </div>
    );
  }

  // Main Render
  return (
    <div className={`w-full ${className}`}>
      <div className={`space-y-${compact ? '4' : '6'}`}>
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            {showBackButton && (
              <button
                onClick={() => window.history.back()}
                className={`text-sm flex items-center gap-2 ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-700'}`}
              >
                <ArrowRight className="w-4 h-4 transform rotate-180" />
                Back
              </button>
            )}
            <h2 className={`text-${compact ? 'lg' : '2xl'} font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {compact ? 'Shipment' : 'Shipment Tracker'}
            </h2>
            <span className={`text-xs px-2 py-0.5 rounded-full flex items-center gap-1 ${getStatusBgColor(booking.status)}`}>
              {getStatusIcon(booking.status)}
              {getStatusLabel(booking.status)}
            </span>
            {!compact && (
              <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                Tracking ID: {booking.trackingId}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            {showStatusUpdate && (
              <button
                onClick={() => setShowStatusUpdateModal(true)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white transition-all duration-200 hover:shadow-lg"
                style={{ backgroundColor: colors.primary }}
              >
                <Edit className="w-4 h-4" />
                Update Status
              </button>
            )}
            <button
              onClick={() => {
                if (onRefresh) {
                  onRefresh();
                } else if (trackingId) {
                  loadBooking();
                }
              }}
              className={`p-2 rounded-lg transition-all duration-200 ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
            >
              <RefreshCw className="w-5 h-5" style={{ color: colors.primary }} />
            </button>
          </div>
        </div>

        {/* Booking Info - Only show in full mode */}
        {!compact && (
          <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white'} border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Booking No</p>
                <p className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{booking.bookingNo}</p>
              </div>
              <div>
                <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Shipper</p>
                <p className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{booking.shipper || booking.exporter}</p>
              </div>
              <div>
                <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Consignee</p>
                <p className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{booking.consignee}</p>
              </div>
              <div>
                <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Containers</p>
                <p className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{booking.containers?.length || 0}</p>
              </div>
            </div>
          </div>
        )}

        {/* Map */}
        {renderMap()}

        {/* Details Grid - Full mode only */}
        {!compact && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white'} border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
              <h4 className={`font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                <Ship className="w-5 h-5 inline mr-2" style={{ color: colors.primary }} />
                Vessel Details
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Vessel</span>
                  <span className={isDark ? 'text-white' : 'text-gray-900'}>{booking.assignedVessel || 'Not assigned'}</span>
                </div>
                <div className="flex justify-between">
                  <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Voyage</span>
                  <span className={isDark ? 'text-white' : 'text-gray-900'}>{booking.assignedVoyage || 'N/A'}</span>
                </div>
                <div className="flex justify-between">
                  <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>SCAC</span>
                  <span className={isDark ? 'text-white' : 'text-gray-900'}>{booking.vesselSCAC || 'N/A'}</span>
                </div>
                <div className="flex justify-between">
                  <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Flag</span>
                  <span className={isDark ? 'text-white' : 'text-gray-900'}>{booking.vesselFlag || 'N/A'}</span>
                </div>
              </div>
            </div>

            <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white'} border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
              <h4 className={`font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                <Calendar className="w-5 h-5 inline mr-2" style={{ color: colors.primary }} />
                Schedule
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>ETD</span>
                  <span className={isDark ? 'text-white' : 'text-gray-900'}>
                    {booking.plannedETD ? new Date(booking.plannedETD).toLocaleString() : 'Not set'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>ETA</span>
                  <span className={isDark ? 'text-white' : 'text-gray-900'}>
                    {booking.plannedETA ? new Date(booking.plannedETA).toLocaleString() : 'Not set'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Transit Time</span>
                  <span className={isDark ? 'text-white' : 'text-gray-900'}>{booking.plannedTransitTime || 'N/A'}</span>
                </div>
                <div className="flex justify-between">
                  <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Movement</span>
                  <span className={isDark ? 'text-white' : 'text-gray-900'}>{booking.movementType || 'FCL'}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Timeline */}
        {renderTimeline()}

        {/* Status Update Modal */}
        {showStatusUpdateModal && renderStatusUpdateModal()}
      </div>
    </div>
  );
};

export default ShipmentTracker;