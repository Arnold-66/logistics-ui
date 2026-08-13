// roles/freightForwarder/FreightForwarderSchedule.jsx
import React, { useState, useContext, useEffect } from 'react';
import {
  Calendar, Clock, Ship, Container, Package, MapPin, ChevronLeft,
  ChevronRight, Plus, Search, Filter, RefreshCw, Eye, CheckCircle,
  AlertCircle, Truck, Anchor, Globe, Flag, Users, Building, X, Save,
  Search as SearchIcon
} from 'lucide-react';
import { ThemeContext } from '../../context/themeContext';
import { useAuth } from '../../context/authContext';
import { useNavigate } from 'react-router-dom';

const FreightForwarderSchedule = () => {
  const navigate = useNavigate();
  const { darkMode, theme } = useContext(ThemeContext);
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '',
    date: '',
    time: '',
    type: 'Arrival',
    port: '',
    vessel: '',
    voyage: '',
    bookingNo: '',
    status: 'Scheduled',
    priority: 'Medium',
    containers: 1
  });

  const colors = {
    primary: theme.primary,
    primaryLight: theme.primary + 'cc',
    primaryDark: theme.primary + '99',
    primaryBg: theme.primary + '20',
    primaryBgDark: theme.primary + '40',
    success: theme.success || '#10b981',
    warning: theme.accent || '#f59e0b',
    danger: theme.danger || '#ef4444',
    info: theme.secondary || '#3b82f6',
  };

  const isDark = darkMode

  // Get current date for sample events
  const getCurrentDate = (daysToAdd) => {
    const date = new Date();
    date.setDate(date.getDate() + daysToAdd);
    return date.toISOString().split('T')[0];
  };

  // Sample bookings data for search
  const [bookings, setBookings] = useState([
    {
      id: 'BKG-12345678',
      vessel: 'MV Star Express',
      voyage: 'SE-2026-078',
      shipper: 'ImportFlow Ltd',
      consignee: 'Global Importers Inc',
      portOfLoading: 'Kampala, Uganda',
      portOfDischarge: 'Port of Mombasa',
      eta: getCurrentDate(2),
      status: 'In Transit',
      containers: 2,
      type: 'FCL'
    },
    {
      id: 'BKG-23456789',
      vessel: 'MV Pacific Voyager',
      voyage: 'PV-2026-045',
      shipper: 'East Africa Trading Co',
      consignee: 'Rwanda Importers Ltd',
      portOfLoading: 'Kampala, Uganda',
      portOfDischarge: 'Port of Mombasa',
      eta: getCurrentDate(5),
      status: 'In Transit',
      containers: 1,
      type: 'LCL'
    },
    {
      id: 'BKG-34567890',
      vessel: 'MV African Trader',
      voyage: 'AT-2026-067',
      shipper: 'Global Importers Inc',
      consignee: 'Nairobi Distributors',
      portOfLoading: 'Entebbe, Uganda',
      portOfDischarge: 'Nairobi, Kenya',
      eta: getCurrentDate(-2),
      status: 'Delivered',
      containers: 1,
      type: 'FCL'
    },
    {
      id: 'BKG-45678901',
      vessel: 'MV Pacific Voyager',
      voyage: 'PV-2026-045',
      shipper: 'ImportFlow Ltd',
      consignee: 'Uganda Manufacturers',
      portOfLoading: 'Kampala, Uganda',
      portOfDischarge: 'Port of Mombasa',
      eta: getCurrentDate(7),
      status: 'In Customs',
      containers: 2,
      type: 'FCL'
    },
    {
      id: 'BKG-56789012',
      vessel: 'MV Indian Trader',
      voyage: 'IT-2026-023',
      shipper: 'Rwanda Exporters',
      consignee: 'Global Importers Inc',
      portOfLoading: 'Kigali, Rwanda',
      portOfDischarge: 'Port of Mombasa',
      eta: getCurrentDate(10),
      status: 'Pending Approval',
      containers: 2,
      type: 'FCL'
    }
  ]);

  const [scheduleEvents, setScheduleEvents] = useState([
    {
      id: 'EVT-001',
      title: 'MV Star Express - Arrival',
      bookingNo: 'BKG-12345678',
      vessel: 'MV Star Express',
      voyage: 'SE-2026-078',
      date: getCurrentDate(2),
      time: '14:30',
      type: 'Arrival',
      port: 'Port of Mombasa',
      status: 'Scheduled',
      priority: 'High',
      containers: 2,
      color: colors.info
    },
    {
      id: 'EVT-002',
      title: 'MV Pacific Voyager - Departure',
      bookingNo: 'BKG-23456789',
      vessel: 'MV Pacific Voyager',
      voyage: 'PV-2026-045',
      date: getCurrentDate(5),
      time: '09:00',
      type: 'Departure',
      port: 'Port of Mombasa',
      status: 'Scheduled',
      priority: 'Medium',
      containers: 1,
      color: colors.warning
    },
    {
      id: 'EVT-003',
      title: 'Container Delivery - MSKU-458921',
      bookingNo: 'BKG-12345678',
      vessel: 'MV Star Express',
      voyage: 'SE-2026-078',
      date: getCurrentDate(3),
      time: '10:00',
      type: 'Delivery',
      port: 'Kampala, Uganda',
      status: 'Scheduled',
      priority: 'High',
      containers: 2,
      color: colors.success
    },
    {
      id: 'EVT-004',
      title: 'MV African Trader - Arrival',
      bookingNo: 'BKG-34567890',
      vessel: 'MV African Trader',
      voyage: 'AT-2026-067',
      date: getCurrentDate(-2),
      time: '08:00',
      type: 'Arrival',
      port: 'Nairobi, Kenya',
      status: 'Completed',
      priority: 'Low',
      containers: 1,
      color: colors.success
    },
    {
      id: 'EVT-005',
      title: 'MV Star Express - Departure',
      bookingNo: 'BKG-12345678',
      vessel: 'MV Star Express',
      voyage: 'SE-2026-078',
      date: getCurrentDate(7),
      time: '16:00',
      type: 'Departure',
      port: 'Port of Mombasa',
      status: 'Scheduled',
      priority: 'High',
      containers: 2,
      color: colors.info
    }
  ]);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  // Filter bookings based on search term
  const filteredBookings = bookings.filter(booking =>
    booking.vessel.toLowerCase().includes(searchTerm.toLowerCase()) ||
    booking.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    booking.shipper.toLowerCase().includes(searchTerm.toLowerCase()) ||
    booking.consignee.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getMonthDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();

    const days = [];
    for (let i = 0; i < startingDay; i++) {
      days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }
    return days;
  };

  const getEventsForDate = (date) => {
    if (!date) return [];
    const dateStr = date.toISOString().split('T')[0];
    return scheduleEvents.filter(event => event.date === dateStr);
  };

  const getStatusBadge = (status) => {
    const statusMap = {
      'Scheduled': { bg: colors.info + '20', color: colors.info, icon: Clock },
      'Completed': { bg: colors.success + '20', color: colors.success, icon: CheckCircle },
      'Delayed': { bg: colors.danger + '20', color: colors.danger, icon: AlertCircle },
      'In Progress': { bg: colors.warning + '20', color: colors.warning, icon: Truck },
      'Cancelled': { bg: colors.danger + '20', color: colors.danger, icon: X }
    };
    return statusMap[status] || { bg: colors.primary + '20', color: colors.primary, icon: Clock };
  };

  const getEventTypeIcon = (type) => {
    const typeMap = {
      'Arrival': Ship,
      'Departure': Ship,
      'Delivery': Truck,
      'Customs': AlertCircle,
      'Storage': Package
    };
    return typeMap[type] || Calendar;
  };

  const getEventColor = (type) => {
    const typeMap = {
      'Arrival': colors.info,
      'Departure': colors.warning,
      'Delivery': colors.success,
      'Customs': colors.orange,
      'Storage': colors.teal
    };
    return typeMap[type] || colors.primary;
  };

  const handleSelectBooking = (booking) => {
    setNewEvent({
      ...newEvent,
      title: `${booking.vessel} - ${booking.status === 'In Transit' ? 'Arrival' : 'Event'}`,
      vessel: booking.vessel,
      voyage: booking.voyage,
      bookingNo: booking.id,
      port: booking.portOfDischarge || booking.portOfLoading,
      containers: booking.containers || 1,
      date: booking.eta || newEvent.date
    });
    setSearchTerm('');
    setShowSearchResults(false);
  };

  const handleAddEvent = () => {
    if (!newEvent.title || !newEvent.date) {
      alert('Please fill in all required fields');
      return;
    }

    const event = {
      id: `EVT-${Date.now()}`,
      ...newEvent,
      color: getEventColor(newEvent.type),
      containers: parseInt(newEvent.containers) || 1
    };

    setScheduleEvents([...scheduleEvents, event]);
    setShowAddModal(false);
    setNewEvent({
      title: '',
      date: '',
      time: '',
      type: 'Arrival',
      port: '',
      vessel: '',
      voyage: '',
      bookingNo: '',
      status: 'Scheduled',
      priority: 'Medium',
      containers: 1
    });
    setSearchTerm('');
  };

  const handleDeleteEvent = (eventId) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      setScheduleEvents(scheduleEvents.filter(event => event.id !== eventId));
    }
  };

  const days = getMonthDays();
  const eventsForSelectedDate = selectedDate ? getEventsForDate(selectedDate) : [];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: isDark ? '#1a1a2e' : '#f8fafc' }}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto" style={{ borderColor: colors.primary }}></div>
          <p className={`mt-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Loading schedule...</p>
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
              Shipping Schedule
            </h1>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              Manage and track all shipping events
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:shadow-lg"
              style={{ backgroundColor: colors.primary, color: 'white' }}
            >
              <Plus className="w-4 h-4" />
              Add Event
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

        {/* Add Event Modal */}
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className={`w-full max-w-2xl rounded-lg shadow-xl p-6 max-h-[90vh] overflow-y-auto ${
              isDark ? 'bg-gray-800' : 'bg-white'
            }`}>
              <div className="flex items-center justify-between mb-4">
                <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Add New Event
                </h3>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <X className={`w-5 h-5 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
                </button>
              </div>

              <div className="space-y-4">
                {/* Search for Booking */}
                <div className="relative">
                  <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Search Booking / Vessel (Optional)
                  </label>
                  <div className="relative">
                    <SearchIcon className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${isDark ? 'text-gray-400' : 'text-gray-400'}`} />
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setShowSearchResults(e.target.value.length > 0);
                      }}
                      onFocus={() => setShowSearchResults(searchTerm.length > 0)}
                      placeholder="Search by vessel, booking no, shipper, consignee..."
                      className={`w-full pl-10 pr-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                        isDark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900'
                      }`}
                      style={{ focusRingColor: colors.primary }}
                    />
                  </div>

                  {/* Search Results Dropdown */}
                  {showSearchResults && filteredBookings.length > 0 && (
                    <div className={`absolute z-10 w-full mt-1 rounded-lg shadow-xl border max-h-60 overflow-y-auto ${
                      isDark ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-200'
                    }`}>
                      {filteredBookings.map((booking) => (
                        <div
                          key={booking.id}
                          onClick={() => handleSelectBooking(booking)}
                          className={`p-3 cursor-pointer transition-colors border-b last:border-b-0 ${
                            isDark ? 'hover:bg-gray-600 border-gray-600' : 'hover:bg-gray-50 border-gray-100'
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <Ship className="w-5 h-5 mt-0.5" style={{ color: colors.primary }} />
                            <div className="flex-1 min-w-0">
                              <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                {booking.vessel}
                              </p>
                              <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                                {booking.id} • Voyage: {booking.voyage}
                              </p>
                              <div className="flex flex-wrap gap-2 mt-1 text-xs">
                                <span className={`${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                                  Shipper: {booking.shipper}
                                </span>
                                <span className={`${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                                  Consignee: {booking.consignee}
                                </span>
                                <span className={`${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                                  Containers: {booking.containers}
                                </span>
                              </div>
                            </div>
                            <span className={`text-xs px-2 py-1 rounded-full flex-shrink-0 ${
                              booking.status === 'In Transit' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300' :
                              booking.status === 'Delivered' ? 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300' :
                              booking.status === 'In Customs' ? 'bg-orange-100 text-orange-600 dark:bg-orange-900 dark:text-orange-300' :
                              'bg-yellow-100 text-yellow-600 dark:bg-yellow-900 dark:text-yellow-300'
                            }`}>
                              {booking.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {showSearchResults && searchTerm.length > 0 && filteredBookings.length === 0 && (
                    <div className={`absolute z-10 w-full mt-1 rounded-lg shadow-xl border p-4 text-center ${
                      isDark ? 'bg-gray-700 border-gray-600 text-gray-400' : 'bg-white border-gray-200 text-gray-500'
                    }`}>
                      No bookings found matching "{searchTerm}"
                    </div>
                  )}
                </div>

                <div className="border-t" style={{ borderColor: isDark ? '#374151' : '#e5e7eb' }} />

                <div>
                  <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Event Title *
                  </label>
                  <input
                    type="text"
                    value={newEvent.title}
                    onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                    placeholder="e.g., MV Star Express - Arrival"
                    className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                      isDark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900'
                    }`}
                    style={{ focusRingColor: colors.primary }}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      Date *
                    </label>
                    <input
                      type="date"
                      value={newEvent.date}
                      onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                      className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                        isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                      }`}
                      style={{ focusRingColor: colors.primary }}
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      Time
                    </label>
                    <input
                      type="time"
                      value={newEvent.time}
                      onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                      className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                        isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                      }`}
                      style={{ focusRingColor: colors.primary }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      Event Type
                    </label>
                    <select
                      value={newEvent.type}
                      onChange={(e) => setNewEvent({ ...newEvent, type: e.target.value })}
                      className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                        isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                      }`}
                      style={{ focusRingColor: colors.primary }}
                    >
                      <option value="Arrival">Arrival</option>
                      <option value="Departure">Departure</option>
                      <option value="Delivery">Delivery</option>
                      <option value="Customs">Customs</option>
                      <option value="Storage">Storage</option>
                    </select>
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      Status
                    </label>
                    <select
                      value={newEvent.status}
                      onChange={(e) => setNewEvent({ ...newEvent, status: e.target.value })}
                      className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                        isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                      }`}
                      style={{ focusRingColor: colors.primary }}
                    >
                      <option value="Scheduled">Scheduled</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                      <option value="Delayed">Delayed</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Port / Location
                  </label>
                  <input
                    type="text"
                    value={newEvent.port}
                    onChange={(e) => setNewEvent({ ...newEvent, port: e.target.value })}
                    placeholder="e.g., Port of Mombasa"
                    className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                      isDark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900'
                    }`}
                    style={{ focusRingColor: colors.primary }}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      Vessel
                    </label>
                    <input
                      type="text"
                      value={newEvent.vessel}
                      onChange={(e) => setNewEvent({ ...newEvent, vessel: e.target.value })}
                      placeholder="e.g., MV Star Express"
                      className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                        isDark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900'
                      }`}
                      style={{ focusRingColor: colors.primary }}
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      Voyage
                    </label>
                    <input
                      type="text"
                      value={newEvent.voyage}
                      onChange={(e) => setNewEvent({ ...newEvent, voyage: e.target.value })}
                      placeholder="e.g., SE-2026-078"
                      className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                        isDark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900'
                      }`}
                      style={{ focusRingColor: colors.primary }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      Booking No
                    </label>
                    <input
                      type="text"
                      value={newEvent.bookingNo}
                      onChange={(e) => setNewEvent({ ...newEvent, bookingNo: e.target.value })}
                      placeholder="e.g., BKG-12345678"
                      className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                        isDark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900'
                      }`}
                      style={{ focusRingColor: colors.primary }}
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      Priority
                    </label>
                    <select
                      value={newEvent.priority}
                      onChange={(e) => setNewEvent({ ...newEvent, priority: e.target.value })}
                      className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                        isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                      }`}
                      style={{ focusRingColor: colors.primary }}
                    >
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Number of Containers
                  </label>
                  <input
                    type="number"
                    value={newEvent.containers}
                    onChange={(e) => setNewEvent({ ...newEvent, containers: parseInt(e.target.value) || 1 })}
                    min="1"
                    className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                      isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                    }`}
                    style={{ focusRingColor: colors.primary }}
                  />
                </div>

                <div className="flex gap-2 pt-4 border-t" style={{ borderColor: isDark ? '#374151' : '#e5e7eb' }}>
                  <button
                    onClick={() => setShowAddModal(false)}
                    className="flex-1 px-4 py-2 rounded-lg text-sm font-medium border transition-all duration-200"
                    style={{ borderColor: colors.primary, color: colors.primary }}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddEvent}
                    className="flex-1 px-4 py-2 rounded-lg text-sm font-medium text-white transition-all duration-200 hover:shadow-lg"
                    style={{ backgroundColor: colors.primary }}
                  >
                    <Save className="w-4 h-4 inline mr-2" />
                    Add Event
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Calendar */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className={`rounded-lg ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-md'}`}>
              {/* Calendar Header */}
              <div className="p-4 border-b flex items-center justify-between"
                style={{ borderColor: isDark ? '#374151' : '#e5e7eb' }}>
                <button
                  onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" style={{ color: colors.primary }} />
                </button>
                <h2 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
                </h2>
                <button
                  onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <ChevronRight className="w-5 h-5" style={{ color: colors.primary }} />
                </button>
              </div>

              {/* Calendar Grid */}
              <div className="p-4">
                <div className="grid grid-cols-7 gap-1">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                    <div key={day} className={`text-center text-xs font-medium py-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      {day}
                    </div>
                  ))}
                  {days.map((date, index) => {
                    const events = date ? getEventsForDate(date) : [];
                    const hasEvents = events.length > 0;
                    const isToday = date && new Date().toDateString() === date.toDateString();
                    const isSelected = date && selectedDate && date.toDateString() === selectedDate.toDateString();

                    return (
                      <div
                        key={index}
                        className={`aspect-square p-1 rounded-lg cursor-pointer transition-all duration-200
                          ${!date ? 'opacity-0' : ''}
                          ${isToday ? 'border-2' : ''}
                          ${isSelected ? 'shadow-lg' : ''}
                          ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                        style={{
                          borderColor: isToday ? colors.primary : 'transparent',
                          backgroundColor: isSelected ? colors.primary + '20' : 'transparent'
                        }}
                        onClick={() => setSelectedDate(date)}
                      >
                        <div className="flex flex-col items-center h-full">
                          <span className={`text-sm font-medium
                            ${isToday ? 'font-bold' : ''}
                            ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            {date ? date.getDate() : ''}
                          </span>
                          {hasEvents && (
                            <div className="flex gap-0.5 mt-auto">
                              {events.slice(0, 3).map((event, i) => (
                                <div key={i} className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: event.color }} />
                              ))}
                              {events.length > 3 && (
                                <span className={`text-[8px] ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                                  +{events.length - 3}
                                </span>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Events Panel */}
          <div className={`rounded-lg ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-md'}`}>
            <div className="p-4 border-b" style={{ borderColor: isDark ? '#374151' : '#e5e7eb' }}>
              <h3 className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {selectedDate ? selectedDate.toLocaleDateString('default', { 
                  weekday: 'long', 
                  month: 'long', 
                  day: 'numeric',
                  year: 'numeric'
                }) : 'Select a date'}
              </h3>
            </div>

            <div className="p-4 max-h-[600px] overflow-y-auto">
              {!selectedDate ? (
                <div className="text-center py-8">
                  <Calendar className="w-12 h-12 mx-auto mb-4" style={{ color: colors.primary }} />
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    Click on a date to view events
                  </p>
                </div>
              ) : eventsForSelectedDate.length === 0 ? (
                <div className="text-center py-8">
                  <Calendar className="w-12 h-12 mx-auto mb-4" style={{ color: colors.primary }} />
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    No events scheduled for this date
                  </p>
                  <button
                    onClick={() => {
                      setShowAddModal(true);
                      setNewEvent({ ...newEvent, date: selectedDate.toISOString().split('T')[0] });
                    }}
                    className="mt-4 px-4 py-2 rounded-lg text-sm font-medium text-white transition-all duration-200 hover:shadow-lg"
                    style={{ backgroundColor: colors.primary }}
                  >
                    <Plus className="w-4 h-4 inline mr-2" />
                    Add Event
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {eventsForSelectedDate.map((event) => {
                    const statusStyle = getStatusBadge(event.status);
                    const StatusIcon = statusStyle.icon;
                    const EventIcon = getEventTypeIcon(event.type);

                    return (
                      <div
                        key={event.id}
                        className={`p-3 rounded-lg transition-colors cursor-pointer hover:shadow-md group
                          ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}`}
                        style={{ borderLeft: `3px solid ${event.color}` }}
                        onClick={() => {
                          if (event.bookingNo) {
                            navigate(`/freight-forwarder/booking/${event.bookingNo}`);
                          }
                        }}
                      >
                        <div className="flex items-start gap-2">
                          <EventIcon className="w-4 h-4 mt-0.5" style={{ color: event.color }} />
                          <div className="flex-1">
                            <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                              {event.title}
                            </p>
                            {event.vessel && (
                              <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                                {event.vessel} {event.voyage ? `• ${event.voyage}` : ''}
                              </p>
                            )}
                            <div className="flex items-center gap-2 mt-1 flex-wrap">
                              <span className={`text-xs px-2 py-0.5 rounded-full flex items-center gap-1`}
                                style={{ backgroundColor: statusStyle.bg, color: statusStyle.color }}>
                                <StatusIcon className="w-3 h-3" />
                                {event.status}
                              </span>
                              {event.time && (
                                <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                                  {event.time}
                                </span>
                              )}
                              {event.port && (
                                <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                                  {event.port}
                                </span>
                              )}
                              {event.containers && (
                                <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                                  {event.containers} containers
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="flex flex-col items-end gap-1">
                            <span className={`text-xs px-2 py-0.5 rounded-full`}
                              style={{ 
                                backgroundColor: (event.priority === 'High' ? colors.danger : 
                                  event.priority === 'Medium' ? colors.warning : colors.success) + '20',
                                color: event.priority === 'High' ? colors.danger : 
                                  event.priority === 'Medium' ? colors.warning : colors.success
                              }}>
                              {event.priority}
                            </span>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteEvent(event.id);
                              }}
                              className={`opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-red-100 dark:hover:bg-red-900 transition-all duration-200`}
                              title="Delete Event"
                            >
                              <X className="w-3 h-3 text-red-500" />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FreightForwarderSchedule;