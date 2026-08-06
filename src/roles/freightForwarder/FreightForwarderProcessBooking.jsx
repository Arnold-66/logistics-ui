// roles/freightForwarder/FreightForwarderProcessBooking.jsx
import React, { useState, useContext, useEffect } from 'react';
import {
  Ship, Package, Container, Calendar, Clock, MapPin, User, Building,
  Phone, Mail, Globe, Flag, Anchor, ArrowRight, Save, X, FileText,
  Truck, Layers, Box, Plus, Minus, ChevronDown, ChevronUp, Users, Bell,
  Eye, Edit, Trash2, CheckCircle, AlertCircle, Info, Download, ClipboardCheck,
  ClipboardList, Route, Navigation, Calendar as CalendarIcon, Clock as ClockIcon,
  FileCheck, Shield, Truck as TruckIcon, Anchor as AnchorIcon, Search,
  Filter, List, Grid, Map, Activity, Compass, Ship as ShipIcon, 
  Navigation2, MapPin as MapPinIcon, TrendingUp, TrendingDown
} from 'lucide-react';
import { ThemeContext } from '../../context/themeContext';
import { useAuth } from '../../context/authContext';
import { useNavigate, useLocation } from 'react-router-dom';

const FreightForwarderProcessBooking = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { darkMode } = useContext(ThemeContext);
  const { user } = useAuth();
  
  // State
  const [view, setView] = useState('select'); // 'select', 'process', 'list', 'details', 'tracker'
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [availableBookings, setAvailableBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [containers, setContainers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('review');
  const [bookingData, setBookingData] = useState(null);

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
  };

  const isDark = darkMode;

  // Form state for processing
  const [formData, setFormData] = useState({
    // Route Planning
    assignedVessel: '',
    assignedVoyage: '',
    vesselSCAC: '',
    vesselFlag: '',
    plannedPortOfLoading: '',
    plannedPortOfDischarge: '',
    plannedPlaceOfDelivery: '',
    plannedETD: '',
    plannedETA: '',
    plannedTransitTime: '',
    movementType: 'FCL',
    
    // Customs & Documentation
    customsBroker: '',
    customsReference: '',
    documentationStatus: 'pending',
    
    // Internal
    internalNotes: '',
    shippingInstructions: '',
    priority: 'normal',
    
    // Status
    status: 'processing',
  });

  // Initialize dummy data if none exists
  const initializeDummyData = () => {
    const existingBookings = localStorage.getItem('exporterBookings');
    if (!existingBookings || JSON.parse(existingBookings).length === 0) {
      const dummyBookings = generateDummyBookings();
      localStorage.setItem('exporterBookings', JSON.stringify(dummyBookings));
    }
  };

  // Generate dummy bookings
  const generateDummyBookings = () => {
    const now = new Date();
    const shippers = [
      'Uganda Exporters Ltd', 'Kenya Coffee Traders', 'Tanzania Agro Exports', 
      'Rwanda Tea Company', 'DRC Minerals Export', 'South Sudan Oil Traders',
      'Ethiopian Flowers Export', 'Somalia Livestock Export', 'Mozambique Cashew Export'
    ];
    
    const consignees = [
      'Global Importers Inc', 'European Trading Co', 'Asian Markets Ltd',
      'American Distribution Group', 'Middle East Trading', 'African Imports Ltd'
    ];
    
    const destinations = [
      'Rotterdam, Netherlands', 'Shanghai, China', 'New York, USA',
      'Dubai, UAE', 'London, UK', 'Tokyo, Japan', 'Mumbai, India'
    ];
    
    const ports = [
      'Mombasa, Kenya', 'Dar es Salaam, Tanzania', 'Djibouti, Djibouti',
      'Port Sudan, Sudan', 'Maputo, Mozambique', 'Beira, Mozambique'
    ];

    const getRandomDate = (daysBack) => {
      const date = new Date(now);
      date.setDate(date.getDate() - Math.floor(Math.random() * daysBack));
      return date.toISOString().split('T')[0];
    };

    const getRandomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

    return Array.from({ length: 15 }, (_, i) => {
      const containerCount = Math.floor(Math.random() * 4) + 1;
      const containers = Array.from({ length: containerCount }, (_, j) => ({
        id: `CONT-${String(i + 1).padStart(3, '0')}${String(j + 1).padStart(2, '0')}`,
        containerNo: `MSKU-${String(Math.floor(Math.random() * 900000) + 100000)}`,
        sealNo: `SEAL-${String(Math.floor(Math.random() * 900000) + 100000)}`,
        size: ['20ft', '40ft', '40ft HC', '45ft'][Math.floor(Math.random() * 4)],
        packages: Math.floor(Math.random() * 50) + 5,
        grossWeight: `${(Math.random() * 25 + 5).toFixed(1)} tons`,
        volume: `${(Math.random() * 40 + 10).toFixed(1)} CBM`,
        measurement: `${(Math.random() * 5 + 2).toFixed(1)}x${(Math.random() * 3 + 1).toFixed(1)}x${(Math.random() * 3 + 1).toFixed(1)}m`,
        cargoDescription: `Container ${j + 1} - ${['Machinery', 'Electronics', 'Agricultural products', 'Textiles', 'Raw materials', 'Consumer goods'][Math.floor(Math.random() * 6)]}`,
        items: Array.from({ length: Math.floor(Math.random() * 3) + 1 }, () => ({
          description: ['Heavy machinery', 'Electronics equipment', 'Coffee beans', 'Tea leaves', 'Cotton bales', 'Minerals', 'Petroleum products'][Math.floor(Math.random() * 7)],
          quantity: Math.floor(Math.random() * 100) + 1,
          unit: ['kg', 'tons', 'boxes', 'pallets', 'units'][Math.floor(Math.random() * 5)]
        }))
      }));

      const statuses = ['pending', 'confirmed', 'ready'];
      const status = statuses[Math.floor(Math.random() * statuses.length)];
      
      return {
        id: `BKG-${String(i + 1).padStart(4, '0')}`,
        bookingNo: `BKG-${String(i + 1).padStart(4, '0')}`,
        bookingReference: `REF-${String(Math.floor(Math.random() * 900000) + 100000)}`,
        bookingDate: getRandomDate(30),
        shipper: getRandomItem(shippers),
        exporter: getRandomItem(shippers),
        address: `${Math.floor(Math.random() * 100) + 1} Trade Center, ${['Kampala', 'Nairobi', 'Dar es Salaam', 'Kigali', 'Kinshasa'][Math.floor(Math.random() * 5)]}`,
        contactPerson: `Mr./Ms. ${['John', 'Jane', 'Peter', 'Mary', 'David', 'Sarah'][Math.floor(Math.random() * 6)]} ${['Smith', 'Johnson', 'Williams', 'Brown', 'Jones'][Math.floor(Math.random() * 5)]}`,
        phone: `+256 ${String(Math.floor(Math.random() * 900) + 100)} ${String(Math.floor(Math.random() * 9000) + 1000)}`,
        email: `export${i + 1}@${['gmail', 'yahoo', 'outlook', 'company'][Math.floor(Math.random() * 4)]}.com`,
        consignee: getRandomItem(consignees),
        consigneeAddress: `${Math.floor(Math.random() * 100) + 1} Business Park, ${getRandomItem(['London', 'New York', 'Singapore', 'Dubai', 'Shanghai'])}`,
        consigneeContact: `Mr./Ms. ${['Robert', 'Emma', 'Michael', 'Sophie', 'James'][Math.floor(Math.random() * 5)]} ${['Davis', 'Miller', 'Wilson', 'Moore', 'Taylor'][Math.floor(Math.random() * 5)]}`,
        consigneePhone: `+${Math.floor(Math.random() * 90 + 1)} ${Math.floor(Math.random() * 900) + 100} ${Math.floor(Math.random() * 9000) + 1000}`,
        consigneeEmail: `import${i + 1}@${['global', 'trade', 'logistics', 'shipping'][Math.floor(Math.random() * 4)]}.com`,
        destination: getRandomItem(destinations),
        portOfLoading: getRandomItem(ports),
        portOfDischarge: getRandomItem(ports),
        vessel: ['MSC Magnifica', 'Maersk Edinburgh', 'Evergreen Harmony', 'CMA CGM Alexander', 'COSCO Shipping'][Math.floor(Math.random() * 5)],
        voyage: `V${Math.floor(Math.random() * 900) + 100}${['E', 'W', 'S', 'N'][Math.floor(Math.random() * 4)]}`,
        typeOfMovement: ['FCL', 'LCL', 'Breakbulk', 'Ro-Ro'][Math.floor(Math.random() * 4)],
        totalValue: `$${Math.floor(Math.random() * 9000000) + 1000000}`,
        totalPackages: String(Math.floor(Math.random() * 200) + 50),
        totalWeight: `${(Math.random() * 100 + 10).toFixed(1)} tons`,
        totalVolume: `${(Math.random() * 200 + 20).toFixed(1)} CBM`,
        cargoDescription: [`Electronics and equipment`, `Agricultural products`, `Machinery parts`, `Consumer goods`, `Raw materials`][Math.floor(Math.random() * 5)],
        containers: containers,
        status: status,
        priority: ['normal', 'high', 'urgent'][Math.floor(Math.random() * 3)],
        shippingDate: getRandomDate(15),
        createdAt: getRandomDate(30),
        notes: `Additional instructions for container ${i + 1}`
      };
    });
  };

  // Load available bookings from exporter
  useEffect(() => {
    initializeDummyData();
    loadAvailableBookings();
  }, []);

  const loadAvailableBookings = () => {
    setLoading(true);
    // Get bookings from localStorage
    const bookings = JSON.parse(localStorage.getItem('exporterBookings') || '[]');
    const processed = JSON.parse(localStorage.getItem('processedBookings') || '[]');
    
    // Filter out already processed bookings
    const processedIds = processed.map(p => p.bookingNo);
    const available = bookings.filter(b => !processedIds.includes(b.bookingNo));
    
    setAvailableBookings(available);
    setFilteredBookings(available);
    setLoading(false);
  };

  const handleSelectBooking = (booking) => {
    setSelectedBooking(booking);
    setView('process');
    loadBookingData(booking);
  };

  const loadBookingData = (booking) => {
    // Populate form with booking data
    setFormData({
      ...formData,
      plannedPortOfLoading: booking.portOfLoading || '',
      plannedPortOfDischarge: booking.portOfDischarge || '',
      plannedPlaceOfDelivery: booking.destination || '',
      assignedVessel: booking.vessel || '',
      assignedVoyage: booking.voyage || '',
      movementType: booking.typeOfMovement || 'FCL',
    });

    // Load containers
    if (booking.containers && booking.containers.length > 0) {
      setContainers(booking.containers.map((c, index) => ({
        id: c.id || `CONT-${Date.now()}-${index}`,
        containerNo: c.containerNo || `CONT-${index + 1}`,
        sealNo: c.sealNo || '',
        size: c.size || '20ft',
        packages: c.packages || 0,
        grossWeight: c.grossWeight || '',
        volume: c.volume || '',
        measurement: c.measurement || '',
        cargoDescription: c.cargoDescription || '',
        items: c.items || [],
        status: 'processing'
      })));
    }

    setBookingData(booking);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    filterBookings(term, filterStatus);
  };

  const handleFilterStatus = (status) => {
    setFilterStatus(status);
    filterBookings(searchTerm, status);
  };

  const filterBookings = (term, status) => {
    let filtered = availableBookings;
    
    if (term) {
      filtered = filtered.filter(b => 
        b.shipper?.toLowerCase().includes(term) ||
        b.bookingNo?.toLowerCase().includes(term) ||
        b.consignee?.toLowerCase().includes(term) ||
        b.destination?.toLowerCase().includes(term) ||
        b.exporter?.toLowerCase().includes(term)
      );
    }
    
    if (status !== 'all') {
      filtered = filtered.filter(b => b.status === status);
    }
    
    setFilteredBookings(filtered);
  };

  const handleProcessBooking = () => {
    setLoading(true);
    
    // Create processed booking record
    const processedBooking = {
      ...selectedBooking,
      ...formData,
      containers: containers,
      processedAt: new Date().toISOString(),
      processedBy: user?.name || 'Unknown',
      status: 'processing',
      trackingId: `TRK-${Date.now().toString().slice(-8)}`,
      currentLocation: formData.plannedPortOfLoading || 'Origin',
      timeline: [
        {
          date: new Date().toISOString(),
          status: 'processing',
          location: formData.plannedPortOfLoading || 'Origin',
          description: 'Booking received and processing started'
        }
      ]
    };

    // Save to processed bookings
    const processed = JSON.parse(localStorage.getItem('processedBookings') || '[]');
    processed.push(processedBooking);
    localStorage.setItem('processedBookings', JSON.stringify(processed));

    // Remove from available bookings
    const available = JSON.parse(localStorage.getItem('exporterBookings') || '[]');
    const updatedAvailable = available.filter(b => b.bookingNo !== selectedBooking.bookingNo);
    localStorage.setItem('exporterBookings', JSON.stringify(updatedAvailable));

    setLoading(false);
    alert('✅ Booking processed successfully!');
    navigate(`/freight-forwarder/processed-bookings/${processedBooking.trackingId}`);
  };

  // Render booking selection view
  const renderBookingSelection = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Select Booking to Process
          </h2>
          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            Choose a booking from the list to start processing
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search bookings..."
              value={searchTerm}
              onChange={handleSearch}
              className={`pl-10 pr-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200
                ${isDark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900'}`}
              style={{ focusRingColor: colors.primary }}
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => handleFilterStatus(e.target.value)}
            className={`px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200
              ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
            style={{ focusRingColor: colors.primary }}
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="ready">Ready</option>
          </select>
          <button
            onClick={loadAvailableBookings}
            className={`p-2 rounded-lg transition-all duration-200 ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
            title="Refresh"
          >
            <ArrowRight className="w-5 h-5" style={{ color: colors.primary }} />
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2" style={{ borderColor: colors.primary }}></div>
        </div>
      ) : filteredBookings.length === 0 ? (
        <div className={`p-12 text-center rounded-lg border-2 border-dashed ${isDark ? 'border-gray-600' : 'border-gray-300'}`}>
          <Package className="w-16 h-16 mx-auto mb-4" style={{ color: colors.primary }} />
          <h3 className={`text-lg font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            No Bookings Available
          </h3>
          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            All bookings have been processed or no bookings have been received yet.
          </p>
          <button
            onClick={() => {
              initializeDummyData();
              loadAvailableBookings();
            }}
            className="mt-4 px-4 py-2 rounded-lg text-sm font-medium text-white transition-all duration-200 hover:shadow-lg"
            style={{ backgroundColor: colors.primary }}
          >
            Generate Sample Bookings
          </button>
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between">
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              Showing {filteredBookings.length} of {availableBookings.length} bookings
            </p>
            <span className={`text-xs px-2 py-0.5 rounded-full ${isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'}`}>
              {availableBookings.length - filteredBookings.length} filtered out
            </span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {filteredBookings.map((booking, index) => (
              <div
                key={index}
                onClick={() => handleSelectBooking(booking)}
                className={`p-4 rounded-lg cursor-pointer transition-all duration-200 hover:shadow-lg border-2
                  ${isDark ? 'bg-gray-800 border-gray-700 hover:border-gray-600' : 'bg-white border-gray-200 hover:border-gray-300'}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <span className={`text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-700`}>
                        {booking.typeOfMovement || 'FCL'}
                      </span>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        booking.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                        booking.status === 'confirmed' ? 'bg-green-100 text-green-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {booking.status || 'Pending'}
                      </span>
                      {booking.priority === 'urgent' && (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-red-100 text-red-700">
                          Urgent
                        </span>
                      )}
                      {booking.priority === 'high' && (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-orange-100 text-orange-700">
                          High Priority
                        </span>
                      )}
                    </div>
                    <h4 className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {booking.bookingNo}
                    </h4>
                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      Shipper: {booking.shipper || booking.exporter}
                    </p>
                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      Consignee: {booking.consignee}
                    </p>
                    <div className="flex items-center gap-4 mt-2 text-xs">
                      <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>
                        📦 {booking.containers?.length || 0} containers
                      </span>
                      <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>
                        📍 {booking.destination}
                      </span>
                      <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>
                        📅 {new Date(booking.bookingDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="p-2 rounded-full bg-primary/10" style={{ backgroundColor: colors.primaryBg }}>
                      <ArrowRight className="w-5 h-5" style={{ color: colors.primary }} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );

  // Render booking processing view
  const renderProcessingView = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <button
            onClick={() => setView('select')}
            className={`text-sm flex items-center gap-2 mb-2 ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-700'}`}
          >
            <ArrowRight className="w-4 h-4 transform rotate-180" />
            Back to Bookings
          </button>
          <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Process Booking: {selectedBooking?.bookingNo}
          </h2>
          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            From {selectedBooking?.shipper || selectedBooking?.exporter}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className={`text-xs px-3 py-1 rounded-full bg-yellow-100 text-yellow-700`}>
            Processing
          </span>
        </div>
      </div>

      {/* Booking Summary */}
      <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-gray-50'} border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Booking No</p>
            <p className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{selectedBooking?.bookingNo}</p>
          </div>
          <div>
            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Shipper</p>
            <p className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{selectedBooking?.shipper || selectedBooking?.exporter}</p>
          </div>
          <div>
            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Consignee</p>
            <p className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{selectedBooking?.consignee}</p>
          </div>
          <div>
            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Containers</p>
            <p className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{containers.length}</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-1 border-b" style={{ borderColor: isDark ? '#374151' : '#e5e7eb' }}>
        <button
          onClick={() => setActiveTab('review')}
          className={`px-4 py-2 text-sm font-medium transition-all duration-200 border-b-2 ${
            activeTab === 'review' 
              ? `border-${colors.primary} ${isDark ? 'text-white' : 'text-gray-900'}` 
              : `border-transparent ${isDark ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'}`
          }`}
          style={{ borderColor: activeTab === 'review' ? colors.primary : 'transparent' }}
        >
          <ClipboardList className="w-4 h-4 inline mr-2" />
          Review
        </button>
        <button
          onClick={() => setActiveTab('plan')}
          className={`px-4 py-2 text-sm font-medium transition-all duration-200 border-b-2 ${
            activeTab === 'plan' 
              ? `border-${colors.primary} ${isDark ? 'text-white' : 'text-gray-900'}` 
              : `border-transparent ${isDark ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'}`
          }`}
          style={{ borderColor: activeTab === 'plan' ? colors.primary : 'transparent' }}
        >
          <Route className="w-4 h-4 inline mr-2" />
          Plan
        </button>
        <button
          onClick={() => setActiveTab('containers')}
          className={`px-4 py-2 text-sm font-medium transition-all duration-200 border-b-2 ${
            activeTab === 'containers' 
              ? `border-${colors.primary} ${isDark ? 'text-white' : 'text-gray-900'}` 
              : `border-transparent ${isDark ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'}`
          }`}
          style={{ borderColor: activeTab === 'containers' ? colors.primary : 'transparent' }}
        >
          <Container className="w-4 h-4 inline mr-2" />
          Containers ({containers.length})
        </button>
      </div>

      {/* Tab Content */}
      <div className="mt-4">
        {activeTab === 'review' && renderReviewContent()}
        {activeTab === 'plan' && renderPlanContent()}
        {activeTab === 'containers' && renderContainersContent()}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3 pt-4 border-t" style={{ borderColor: isDark ? '#374151' : '#e5e7eb' }}>
        <button
          onClick={handleProcessBooking}
          disabled={loading}
          className="flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-medium text-white transition-all duration-200 hover:shadow-lg disabled:opacity-50"
          style={{ backgroundColor: colors.primary }}
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              Processing...
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              Process Booking
            </>
          )}
        </button>
        <button
          onClick={() => setView('select')}
          className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
            isDark ? 'text-gray-400 hover:bg-gray-700' : 'text-gray-500 hover:bg-gray-100'
          }`}
        >
          Cancel
        </button>
      </div>
    </div>
  );

  const renderReviewContent = () => (
    <div className="space-y-4">
      <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
        <h4 className={`font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          Shipper Details
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
          <div>
            <p className={isDark ? 'text-gray-400' : 'text-gray-500'}>Name</p>
            <p className={isDark ? 'text-white' : 'text-gray-900'}>{selectedBooking?.shipper || selectedBooking?.exporter}</p>
          </div>
          <div>
            <p className={isDark ? 'text-gray-400' : 'text-gray-500'}>Contact</p>
            <p className={isDark ? 'text-white' : 'text-gray-900'}>{selectedBooking?.contactPerson || selectedBooking?.shipperContact}</p>
          </div>
          <div>
            <p className={isDark ? 'text-gray-400' : 'text-gray-500'}>Phone</p>
            <p className={isDark ? 'text-white' : 'text-gray-900'}>{selectedBooking?.phone}</p>
          </div>
          <div>
            <p className={isDark ? 'text-gray-400' : 'text-gray-500'}>Email</p>
            <p className={isDark ? 'text-white' : 'text-gray-900'}>{selectedBooking?.email}</p>
          </div>
        </div>
      </div>

      <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
        <h4 className={`font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          Consignee Details
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
          <div>
            <p className={isDark ? 'text-gray-400' : 'text-gray-500'}>Name</p>
            <p className={isDark ? 'text-white' : 'text-gray-900'}>{selectedBooking?.consignee}</p>
          </div>
          <div>
            <p className={isDark ? 'text-gray-400' : 'text-gray-500'}>Destination</p>
            <p className={isDark ? 'text-white' : 'text-gray-900'}>{selectedBooking?.destination}</p>
          </div>
          <div>
            <p className={isDark ? 'text-gray-400' : 'text-gray-500'}>Contact</p>
            <p className={isDark ? 'text-white' : 'text-gray-900'}>{selectedBooking?.consigneeContact}</p>
          </div>
          <div>
            <p className={isDark ? 'text-gray-400' : 'text-gray-500'}>Phone</p>
            <p className={isDark ? 'text-white' : 'text-gray-900'}>{selectedBooking?.consigneePhone}</p>
          </div>
        </div>
      </div>

      <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
        <h4 className={`font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          Cargo Summary
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Total Value</p>
            <p className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{selectedBooking?.totalValue || 'N/A'}</p>
          </div>
          <div>
            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Packages</p>
            <p className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{selectedBooking?.totalPackages || '0'}</p>
          </div>
          <div>
            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Weight</p>
            <p className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{selectedBooking?.totalWeight || 'N/A'}</p>
          </div>
          <div>
            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Volume</p>
            <p className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{selectedBooking?.totalVolume || 'N/A'}</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPlanContent = () => (
    <div className="space-y-4">
      <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
        <h4 className={`font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          <Ship className="w-4 h-4 inline mr-2" style={{ color: colors.primary }} />
          Vessel Assignment
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Assigned Vessel *
            </label>
            <input
              type="text"
              name="assignedVessel"
              value={formData.assignedVessel}
              onChange={handleChange}
              className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200
                ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
              style={{ focusRingColor: colors.primary }}
              placeholder="Enter vessel name"
              required
            />
          </div>
          <div>
            <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Voyage Number *
            </label>
            <input
              type="text"
              name="assignedVoyage"
              value={formData.assignedVoyage}
              onChange={handleChange}
              className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200
                ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
              style={{ focusRingColor: colors.primary }}
              placeholder="Enter voyage number"
              required
            />
          </div>
          <div>
            <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              SCAC Code
            </label>
            <input
              type="text"
              name="vesselSCAC"
              value={formData.vesselSCAC}
              onChange={handleChange}
              className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200
                ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
              style={{ focusRingColor: colors.primary }}
              placeholder="e.g., MSCU"
            />
          </div>
          <div>
            <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Vessel Flag
            </label>
            <input
              type="text"
              name="vesselFlag"
              value={formData.vesselFlag}
              onChange={handleChange}
              className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200
                ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
              style={{ focusRingColor: colors.primary }}
              placeholder="Country flag"
            />
          </div>
        </div>
      </div>

      <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
        <h4 className={`font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          <Navigation className="w-4 h-4 inline mr-2" style={{ color: colors.primary }} />
          Route Planning
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Port of Loading *
            </label>
            <input
              type="text"
              name="plannedPortOfLoading"
              value={formData.plannedPortOfLoading}
              onChange={handleChange}
              className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200
                ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
              style={{ focusRingColor: colors.primary }}
              placeholder="e.g., Mombasa, Kenya"
              required
            />
          </div>
          <div>
            <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Port of Discharge *
            </label>
            <input
              type="text"
              name="plannedPortOfDischarge"
              value={formData.plannedPortOfDischarge}
              onChange={handleChange}
              className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200
                ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
              style={{ focusRingColor: colors.primary }}
              placeholder="e.g., Dar es Salaam, Tanzania"
              required
            />
          </div>
          <div>
            <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Place of Delivery
            </label>
            <input
              type="text"
              name="plannedPlaceOfDelivery"
              value={formData.plannedPlaceOfDelivery}
              onChange={handleChange}
              className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200
                ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
              style={{ focusRingColor: colors.primary }}
              placeholder="Final delivery destination"
            />
          </div>
          <div>
            <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Movement Type
            </label>
            <select
              name="movementType"
              value={formData.movementType}
              onChange={handleChange}
              className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200
                ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
              style={{ focusRingColor: colors.primary }}
            >
              <option value="FCL">FCL - Full Container Load</option>
              <option value="LCL">LCL - Less than Container Load</option>
              <option value="Breakbulk">Breakbulk</option>
              <option value="Ro-Ro">Ro-Ro</option>
            </select>
          </div>
        </div>
      </div>

      <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
        <h4 className={`font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          <CalendarIcon className="w-4 h-4 inline mr-2" style={{ color: colors.primary }} />
          Schedule
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Estimated Time of Departure (ETD)
            </label>
            <input
              type="datetime-local"
              name="plannedETD"
              value={formData.plannedETD}
              onChange={handleChange}
              className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200
                ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
              style={{ focusRingColor: colors.primary }}
            />
          </div>
          <div>
            <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Estimated Time of Arrival (ETA)
            </label>
            <input
              type="datetime-local"
              name="plannedETA"
              value={formData.plannedETA}
              onChange={handleChange}
              className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200
                ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
              style={{ focusRingColor: colors.primary }}
            />
          </div>
          <div>
            <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Estimated Transit Time
            </label>
            <input
              type="text"
              name="plannedTransitTime"
              value={formData.plannedTransitTime}
              onChange={handleChange}
              className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200
                ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
              style={{ focusRingColor: colors.primary }}
              placeholder="e.g., 14 days"
            />
          </div>
          <div>
            <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Priority
            </label>
            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200
                ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
              style={{ focusRingColor: colors.primary }}
            >
              <option value="normal">Normal</option>
              <option value="high">High Priority</option>
              <option value="urgent">Urgent</option>
            </select>
          </div>
        </div>
      </div>

      <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
        <h4 className={`font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          <FileText className="w-4 h-4 inline mr-2" style={{ color: colors.primary }} />
          Internal Notes
        </h4>
        <textarea
          name="internalNotes"
          value={formData.internalNotes}
          onChange={handleChange}
          rows="3"
          placeholder="Internal notes for this shipment..."
          className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200
            ${isDark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900'}`}
          style={{ focusRingColor: colors.primary }}
        />
      </div>
    </div>
  );

  const renderContainersContent = () => (
    <div className="space-y-4">
      {containers.length > 0 ? (
        <div className="grid grid-cols-1 gap-3">
          {containers.map((container, index) => (
            <div key={index} className={`p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white'} border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <Container className="w-5 h-5" style={{ color: colors.primary }} />
                    <h5 className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {container.containerNo}
                    </h5>
                  </div>
                  <div className="flex flex-wrap gap-3 mt-2 text-sm">
                    <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>
                      Size: {container.size}
                    </span>
                    <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>
                      Packages: {container.packages}
                    </span>
                    {container.grossWeight && (
                      <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>
                        Weight: {container.grossWeight}
                      </span>
                    )}
                    {container.volume && (
                      <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>
                        Volume: {container.volume}
                      </span>
                    )}
                    {container.sealNo && (
                      <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>
                        Seal: {container.sealNo}
                      </span>
                    )}
                  </div>
                  {container.cargoDescription && (
                    <p className={`text-sm mt-1 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      {container.cargoDescription}
                    </p>
                  )}
                  {container.items && container.items.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1">
                      {container.items.map((item, idx) => (
                        <span key={idx} className={`text-xs px-2 py-0.5 rounded-full ${isDark ? 'bg-gray-600 text-gray-300' : 'bg-gray-200 text-gray-600'}`}>
                          {item.description} ({item.quantity} {item.unit})
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <span className={`text-xs px-2 py-1 rounded-full bg-green-100 text-green-700`}>
                  Ready
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className={`p-8 text-center rounded-lg border-2 border-dashed ${isDark ? 'border-gray-600' : 'border-gray-300'}`}>
          <Container className="w-12 h-12 mx-auto mb-3" style={{ color: colors.primary }} />
          <p className={isDark ? 'text-gray-400' : 'text-gray-500'}>No containers in this booking</p>
        </div>
      )}
    </div>
  );

  // Main render
  return (
    <div className="min-h-screen w-full p-4 md:p-6" style={{ backgroundColor: isDark ? '#1a1a2e' : '#f8fafc' }}>
      <div className="max-w-7xl mx-auto">
        {view === 'select' && renderBookingSelection()}
        {view === 'process' && renderProcessingView()}
      </div>
    </div>
  );
};

export default FreightForwarderProcessBooking;