// src/roles/freightForwarder/BookingDetails.jsx
import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft, Ship, Package, Container, Calendar, Clock, MapPin, User, Building,
  Phone, Mail, Globe, Flag, Anchor, FileText, Truck, Layers, Box, Users, Bell,
  Eye, Edit, Trash2, CheckCircle, AlertCircle, Info, Download, ClipboardCheck,
  FileCheck, Printer, Share2, MessageCircle, Phone as PhoneIcon,
  Map, Navigation, TrendingUp, TrendingDown, Activity
} from 'lucide-react';
import { ThemeContext } from '../../context/themeContext';

const BookingDetails = () => {
  const { trackingId } = useParams();
  const navigate = useNavigate();
  const { darkMode } = useContext(ThemeContext);
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);

  const colors = {
    primary: '#714b67',
    success: '#10b981',
    warning: '#f59e0b',
    danger: '#ef4444',
    info: '#3b82f6',
  };

  const isDark = darkMode;

  useEffect(() => {
    loadBooking();
  }, [trackingId]);

  const loadBooking = () => {
    setLoading(true);
    const processed = JSON.parse(localStorage.getItem('processedBookings') || '[]');
    const found = processed.find(b => b.trackingId === trackingId || b.bookingNo === trackingId);
    if (found) {
      setBooking(found);
    }
    setLoading(false);
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

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = () => {
    alert('📄 Downloading booking details as PDF...');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `Booking ${booking?.bookingNo}`,
        text: `Booking details for ${booking?.bookingNo}`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('✅ Link copied to clipboard!');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2" style={{ borderColor: colors.primary }}></div>
      </div>
    );
  }

  if (!booking) {
    return (
      <div className={`p-12 text-center rounded-lg border-2 border-dashed ${isDark ? 'border-gray-600' : 'border-gray-300'}`}>
        <AlertCircle className="w-16 h-16 mx-auto mb-4" style={{ color: colors.danger }} />
        <h3 className={`text-lg font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          Booking Not Found
        </h3>
        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
          The booking you're looking for doesn't exist.
        </p>
        <button
          onClick={() => navigate('/freight-forwarder/processed-bookings')}
          className="mt-4 px-4 py-2 rounded-lg text-sm font-medium text-white transition-all duration-200 hover:shadow-lg"
          style={{ backgroundColor: colors.primary }}
        >
          Back to Bookings
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-6 py-4 md:py-6">
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <button
            onClick={() => navigate('/freight-forwarder/processed-bookings')}
            className={`text-sm flex items-center gap-2 mb-2 ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-700'}`}
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Bookings
          </button>
          <div className="flex flex-wrap items-center gap-3">
            <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Booking #{booking.bookingNo}
            </h2>
            <span className={`text-xs px-3 py-1 rounded-full flex items-center gap-1 ${getStatusColor(booking.status)}`}>
              {getStatusIcon(booking.status)}
              {booking.status?.replace('_', ' ').toUpperCase()}
            </span>
            {booking.priority === 'urgent' && (
              <span className="text-xs px-3 py-1 rounded-full bg-red-100 text-red-700 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                Urgent
              </span>
            )}
          </div>
          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            Tracking ID: {booking.trackingId}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handlePrint}
            className="p-2 rounded-lg transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-700"
            title="Print"
          >
            <Printer className="w-5 h-5" style={{ color: colors.primary }} />
          </button>
          <button
            onClick={handleDownloadPDF}
            className="p-2 rounded-lg transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-700"
            title="Download PDF"
          >
            <Download className="w-5 h-5" style={{ color: colors.primary }} />
          </button>
          <button
            onClick={handleShare}
            className="p-2 rounded-lg transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-700"
            title="Share"
          >
            <Share2 className="w-5 h-5" style={{ color: colors.primary }} />
          </button>
          <button
            onClick={() => navigate(`/freight-forwarder/track/${booking.trackingId}`)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white transition-all duration-200 hover:shadow-lg"
            style={{ backgroundColor: colors.primary }}
          >
            <Map className="w-4 h-4" />
            Track Shipment
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white'} border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
          <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Containers</p>
          <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{booking.containers?.length || 0}</p>
        </div>
        <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white'} border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
          <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Packages</p>
          <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{booking.totalPackages || '0'}</p>
        </div>
        <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white'} border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
          <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Weight</p>
          <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{booking.totalGrossWeight || 'N/A'}</p>
        </div>
        <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white'} border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
          <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Value</p>
          <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{booking.declaredCargoValue || 'N/A'}</p>
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Main Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Shipper & Consignee */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white'} border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
              <h4 className={`font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                <User className="w-4 h-4 inline mr-2" style={{ color: colors.primary }} />
                Shipper / Exporter
              </h4>
              <div className="space-y-1 text-sm">
                <p className={isDark ? 'text-gray-300' : 'text-gray-700'}><strong>Name:</strong> {booking.shipper || booking.exporter}</p>
                <p className={isDark ? 'text-gray-300' : 'text-gray-700'}><strong>Address:</strong> {booking.shipperAddress || booking.address}</p>
                <p className={isDark ? 'text-gray-300' : 'text-gray-700'}><strong>Contact:</strong> {booking.shipperContact || booking.contactPerson}</p>
                <p className={isDark ? 'text-gray-300' : 'text-gray-700'}><strong>Phone:</strong> {booking.shipperPhone || booking.phone}</p>
                <p className={isDark ? 'text-gray-300' : 'text-gray-700'}><strong>Email:</strong> {booking.shipperEmail || booking.email}</p>
              </div>
            </div>

            <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white'} border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
              <h4 className={`font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                <Package className="w-4 h-4 inline mr-2" style={{ color: colors.primary }} />
                Consignee / Importer
              </h4>
              <div className="space-y-1 text-sm">
                <p className={isDark ? 'text-gray-300' : 'text-gray-700'}><strong>Name:</strong> {booking.consignee}</p>
                <p className={isDark ? 'text-gray-300' : 'text-gray-700'}><strong>Address:</strong> {booking.consigneeAddress}</p>
                <p className={isDark ? 'text-gray-300' : 'text-gray-700'}><strong>Contact:</strong> {booking.consigneeContact}</p>
                <p className={isDark ? 'text-gray-300' : 'text-gray-700'}><strong>Phone:</strong> {booking.consigneePhone}</p>
                <p className={isDark ? 'text-gray-300' : 'text-gray-700'}><strong>Email:</strong> {booking.consigneeEmail}</p>
              </div>
            </div>
          </div>

          {/* Vessel & Route */}
          <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white'} border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
            <h4 className={`font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              <Ship className="w-4 h-4 inline mr-2" style={{ color: colors.primary }} />
              Vessel & Route
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className={isDark ? 'text-gray-400' : 'text-gray-500'}>Vessel</p>
                <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{booking.assignedVessel || 'Not assigned'}</p>
                <p className={isDark ? 'text-gray-400' : 'text-gray-500'}>Voyage</p>
                <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{booking.assignedVoyage || 'N/A'}</p>
              </div>
              <div>
                <p className={isDark ? 'text-gray-400' : 'text-gray-500'}>Port of Loading</p>
                <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{booking.plannedPortOfLoading || 'Not set'}</p>
                <p className={isDark ? 'text-gray-400' : 'text-gray-500'}>Port of Discharge</p>
                <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{booking.plannedPortOfDischarge || 'Not set'}</p>
              </div>
            </div>
          </div>

          {/* Containers */}
          <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white'} border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
            <h4 className={`font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              <Container className="w-4 h-4 inline mr-2" style={{ color: colors.primary }} />
              Containers ({booking.containers?.length || 0})
            </h4>
            {booking.containers && booking.containers.length > 0 ? (
              <div className="space-y-2">
                {booking.containers.map((container, index) => (
                  <div key={index} className={`flex flex-col p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          {container.containerNo}
                        </p>
                        <div className="flex flex-wrap gap-2 text-xs">
                          <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>
                            {container.size}
                          </span>
                          <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>
                            {container.packages} packages
                          </span>
                          {container.grossWeight && (
                            <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>
                              {container.grossWeight}
                            </span>
                          )}
                        </div>
                      </div>
                      {container.sealNo && (
                        <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                          Seal: {container.sealNo}
                        </span>
                      )}
                    </div>
                    {container.cargoDescription && (
                      <p className={`text-sm mt-1 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                        {container.cargoDescription}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>No containers</p>
            )}
          </div>
        </div>

        {/* Right Column - Sidebar */}
        <div className="space-y-6">
          {/* Status Timeline */}
          <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white'} border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
            <h4 className={`font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              <Clock className="w-4 h-4 inline mr-2" style={{ color: colors.primary }} />
              Timeline
            </h4>
            <div className="space-y-3 max-h-60 overflow-y-auto">
              {(booking.timeline || []).map((item, index) => (
                <div key={index} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className="w-2 h-2 rounded-full mt-1.5" style={{ backgroundColor: getStatusColor(item.status)?.replace('bg-', '').replace(' text-', '') || colors.primary }} />
                    {index < (booking.timeline || []).length - 1 && (
                      <div className="w-0.5 flex-1" style={{ backgroundColor: isDark ? '#374151' : '#e5e7eb' }} />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {item.status?.replace('_', ' ').toUpperCase()}
                      </span>
                      <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        {new Date(item.date).toLocaleDateString()}
                      </span>
                    </div>
                    {item.location && (
                      <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        📍 {item.location}
                      </p>
                    )}
                  </div>
                </div>
              ))}
              {(!booking.timeline || booking.timeline.length === 0) && (
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>No updates yet</p>
              )}
            </div>
          </div>

          {/* Customs Info */}
          <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white'} border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
            <h4 className={`font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              <FileCheck className="w-4 h-4 inline mr-2" style={{ color: colors.primary }} />
              Customs & Documentation
            </h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Status</span>
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  booking.documentationStatus === 'completed' ? 'bg-green-100 text-green-700' :
                  booking.documentationStatus === 'in_progress' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-gray-100 text-gray-700'
                }`}>
                  {booking.documentationStatus?.replace('_', ' ').toUpperCase() || 'Pending'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Customs Broker</span>
                <span className={isDark ? 'text-white' : 'text-gray-900'}>{booking.customsBroker || 'Not assigned'}</span>
              </div>
              <div className="flex justify-between">
                <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Reference</span>
                <span className={isDark ? 'text-white' : 'text-gray-900'}>{booking.customsReference || 'N/A'}</span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white'} border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
            <h4 className={`font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Quick Actions
            </h4>
            <div className="space-y-2">
              <button
                onClick={() => navigate(`/freight-forwarder/track/${booking.trackingId}`)}
                className="w-full flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white transition-all duration-200 hover:shadow-lg"
                style={{ backgroundColor: colors.primary }}
              >
                <Map className="w-4 h-4" />
                Track Shipment
              </button>
              <button
                onClick={() => alert('📞 Contacting carrier...')}
                className={`w-full flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 border
                  ${isDark ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : 'border-gray-300 text-gray-700 hover:bg-gray-50'}`}
              >
                <PhoneIcon className="w-4 h-4" />
                Contact Carrier
              </button>
              <button
                onClick={() => alert('📧 Sending notification...')}
                className={`w-full flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 border
                  ${isDark ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : 'border-gray-300 text-gray-700 hover:bg-gray-50'}`}
              >
                <Mail className="w-4 h-4" />
                Send Notification
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default BookingDetails;