// roles/exporter/ExporterFreightBookings.jsx
import React, { useState, useContext, useEffect } from 'react';
import { ThemeContext } from '../../context/themeContext';
import { useAuth } from '../../context/authContext';
import { useNavigate } from 'react-router-dom';
import ShipmentTracker from '../../components/ShipmentTracker';
import {
  ArrowLeft,
  Package,
  Ship,
  Truck,
  Calendar,
  Clock,
  MapPin,
  FileText,
  CheckCircle,
  AlertCircle,
  XCircle,
  RefreshCw,
  Eye,
  Download,
  Printer,
  Search,
  Filter,
  ChevronDown,
  ChevronUp,
  Building,
  User,
  Mail,
  Phone,
  Anchor,
  Container,
  DollarSign,
  ExternalLink,
  Edit,
  Trash2,
  MoreVertical,
  Plus,
  X,
  Info,
  Users,
  Globe,
  Flag,
  Navigation,
  FileCheck,
  FileSignature,
  CreditCard,
  Shield,
  AlertTriangle,
  Check,
  Send,
  Copy,
  Share2,
  Clock as ClockIcon,
  Box,
  Layers,
  ListChecks,
  PackageCheck,
  ShoppingBag,
  TrendingUp,
  TrendingDown,
  Calendar as CalendarIcon,
  MoreHorizontal,
  Weight,
  Ruler,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

const ExporterFreightBookings = () => {
  const navigate = useNavigate();
  const { darkMode, theme } = useContext(ThemeContext);
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date-desc');
  const [expandedBookingId, setExpandedBookingId] = useState(null);
  const [toast, setToast] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [selectedBookingForTracker, setSelectedBookingForTracker] = useState(null);
  const [showTrackerModal, setShowTrackerModal] = useState(false);

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

  const isDark = darkMode;

  // Generate dummy bookings data
  const generateDummyBookings = () => {
    const statuses = ['pending', 'confirmed', 'in_transit', 'delivered', 'cancelled', 'documentation_pending'];
    const vessels = ['MV Star Express', 'MV Indian Trader', 'MV African Trader', 'MV Pacific Express', 'MV Europe Trader'];
    const portOfLoadings = ['Kampala, Uganda', 'Mombasa, Kenya', 'Dar es Salaam, Tanzania', 'Kigali, Rwanda'];
    const portOfDischarges = ['Port of Mombasa', 'Port of Dar es Salaam', 'Port of Kigali', 'Port of Nairobi'];
    const consignees = [
      { name: 'Global Importers Inc', contact: 'Jane Smith', email: 'jane@globalimporters.com', phone: '+254 722 123456' },
      { name: 'TechImport USA Inc', contact: 'John Doe', email: 'imports@techimport.com', phone: '+1 555 123 4567' },
      { name: 'African Machinery Solutions', contact: 'Peter Okello', email: 'procurement@africanmachinery.co.za', phone: '+27 11 234 5678' },
      { name: 'Pacific Packaging Co.', contact: 'Sarah Lee', email: 'purchasing@pacificpackaging.com.au', phone: '+61 2 1234 5678' },
      { name: 'AutoParts Europe GmbH', contact: 'Klaus Schmidt', email: 'purchasing@autoparts.de', phone: '+49 30 1234 5678' }
    ];
    const exporters = ['ExportFlow Ltd', 'Uganda Exports Ltd', 'East African Exports', 'Global Exporters Ltd', 'TechExport Ltd'];
    const agents = [
      { name: 'Swift Clearance Services', email: 'info@swiftclearance.com', contact: '+254 711 123456' },
      { name: 'Mombasa Port Logistics', email: 'info@mombasaportlogistics.com', contact: '+254 722 987654' },
      { name: 'East Africa Customs Solutions', email: 'info@eastafricacustoms.com', contact: '+254 733 112233' },
      null
    ];
    const transporters = [
      { name: 'East African Logistics', email: 'dispatch@eastafricalogistics.com', contact: '+256 712 345678' },
      { name: 'Trans-East Cargo Services', email: 'dispatch@trans-eastcargo.com', contact: '+256 703 456789' },
      { name: 'Kampala Freight Forwarders', email: 'info@kampalafreight.com', contact: '+256 701 234567' },
      null
    ];

    const bookings = [];
    for (let i = 0; i < 12; i++) {
      const numContainers = Math.floor(Math.random() * 3) + 1;
      const containers = [];
      for (let c = 0; c < numContainers; c++) {
        const numItems = Math.floor(Math.random() * 4) + 1;
        const items = [];
        for (let j = 0; j < numItems; j++) {
          items.push({
            id: `ITEM-${String(j + 1).padStart(3, '0')}`,
            description: ['Laptops', 'Medical Kits', 'Fertilizer', 'Cement', 'Fabrics', 'Engines', 'Spare Parts', 'Electronics'][Math.floor(Math.random() * 8)],
            quantity: Math.floor(Math.random() * 500 + 50),
            unit: ['pcs', 'kg', 'tons', 'units', 'meters'][Math.floor(Math.random() * 5)],
            unitPrice: Math.floor(Math.random() * 500000 + 100000),
            totalValue: Math.floor(Math.random() * 50000000 + 10000000),
            hsCode: `${Math.floor(Math.random() * 9000 + 1000)}.${Math.floor(Math.random() * 90 + 10)}`
          });
        }
        containers.push({
          id: `CONT-${String(Math.floor(Math.random() * 10000)).padStart(4, '0')}`,
          sealNo: `SEAL-${String(Math.floor(Math.random() * 10000)).padStart(4, '0')}`,
          size: ['20ft', '40ft', '40ft HC'][Math.floor(Math.random() * 3)],
          packages: Math.floor(Math.random() * 500 + 50),
          grossWeight: (Math.random() * 25 + 5).toFixed(1) + ' tons',
          volume: (Math.random() * 70 + 10).toFixed(1) + ' m³',
          measurement: `${Math.floor(Math.random() * 10 + 5)}m x ${Math.floor(Math.random() * 3 + 2)}m x ${Math.floor(Math.random() * 3 + 2)}m`,
          cargoDescription: ['Electronics Components', 'Medical Supplies', 'Agricultural Equipment', 'Construction Materials', 'Textile Products', 'Automotive Parts'][Math.floor(Math.random() * 6)],
          items: items,
          totalItems: items.length,
          totalItemValue: items.reduce((sum, item) => sum + item.totalValue, 0)
        });
      }

      const status = statuses[Math.floor(Math.random() * statuses.length)];
      const consignee = consignees[Math.floor(Math.random() * consignees.length)];
      const exporter = exporters[Math.floor(Math.random() * exporters.length)];
      const agent = agents[Math.floor(Math.random() * agents.length)];
      const transporter = transporters[Math.floor(Math.random() * transporters.length)];
      const createdAt = new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000);
      
      // Generate documents based on status
      const docs = [];
      const docTypes = ['Bill of Lading', 'Commercial Invoice', 'Packing List', 'Certificate of Origin', 'Export License', 'Insurance Certificate'];
      const docStatuses = ['uploaded', 'pending', 'rejected'];
      
      docTypes.forEach((type, idx) => {
        const docStatus = idx < 3 ? 'uploaded' : docStatuses[Math.floor(Math.random() * 3)];
        docs.push({
          id: `DOC-${String(idx + 1).padStart(3, '0')}`,
          name: type,
          type: 'pdf',
          status: docStatus,
          date: new Date(createdAt.getTime() + Math.random() * 10 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          size: (Math.random() * 3 + 0.5).toFixed(1) + ' MB'
        });
      });

      const totalValue = containers.reduce((sum, c) => sum + c.totalItemValue, 0);

      // Generate tracking history
      const trackingHistory = [
        { status: 'Booking Confirmed', location: 'Online', date: new Date(createdAt.getTime() + 1 * 24 * 60 * 60 * 1000).toISOString(), description: 'Booking confirmed by freight forwarder' }
      ];
      
      if (status !== 'pending' && status !== 'documentation_pending') {
        trackingHistory.push({
          status: 'Container Loaded',
          location: 'Warehouse',
          date: new Date(createdAt.getTime() + 3 * 24 * 60 * 60 * 1000).toISOString(),
          description: 'Container loaded with cargo'
        });
      }
      
      if (status === 'in_transit' || status === 'delivered') {
        trackingHistory.push({
          status: 'In Transit',
          location: 'Indian Ocean',
          date: new Date(createdAt.getTime() + 5 * 24 * 60 * 60 * 1000).toISOString(),
          description: 'Vessel departed from port'
        });
      }
      
      if (status === 'delivered') {
        trackingHistory.push({
          status: 'Arrived at Port',
          location: 'Port of Mombasa',
          date: new Date(createdAt.getTime() + 10 * 24 * 60 * 60 * 1000).toISOString(),
          description: 'Vessel arrived at destination port'
        });
        trackingHistory.push({
          status: 'Delivered',
          location: consignee.address || 'Destination',
          date: new Date(createdAt.getTime() + 12 * 24 * 60 * 60 * 1000).toISOString(),
          description: 'Goods delivered to consignee'
        });
      }

      bookings.push({
        id: `BKG-${String(2026).slice(2)}${String(Math.floor(Math.random() * 10000)).padStart(4, '0')}`,
        bookingNo: `FRT-${String(Math.floor(Math.random() * 10000)).padStart(4, '0')}`,
        blNo: `BL-${String(2026).slice(2)}${String(Math.floor(Math.random() * 10000)).padStart(4, '0')}`,
        trackingId: `TRK-${String(2026).slice(2)}${String(Math.floor(Math.random() * 10000)).padStart(4, '0')}`,
        exporter: exporter,
        consignee: consignee,
        consigneeDetails: {
          contact: consignee.contact,
          email: consignee.email,
          phone: consignee.phone,
          address: `Plot ${Math.floor(Math.random() * 100 + 1)}, ${['Kampala', 'Nairobi', 'Mombasa', 'Dar es Salaam', 'Kigali'][Math.floor(Math.random() * 5)]}, ${['Uganda', 'Kenya', 'Tanzania', 'Rwanda'][Math.floor(Math.random() * 4)]}`
        },
        forwardingAgent: agent,
        inlandTransporter: transporter,
        vessel: vessels[Math.floor(Math.random() * vessels.length)],
        vesselSCAC: ['STAR', 'INDIAN', 'AFRICAN', 'PACIFIC', 'EUROPE'][Math.floor(Math.random() * 5)],
        voyage: `SE-${String(2026).slice(2)}-${String(Math.floor(Math.random() * 100)).padStart(3, '0')}`,
        portOfLoading: portOfLoadings[Math.floor(Math.random() * portOfLoadings.length)],
        portOfDischarge: portOfDischarges[Math.floor(Math.random() * portOfDischarges.length)],
        placeOfDelivery: ['Nairobi, Kenya', 'Kampala, Uganda', 'Dar es Salaam, Tanzania', 'Kigali, Rwanda'][Math.floor(Math.random() * 4)],
        typeOfMovement: ['FCL', 'LCL'][Math.floor(Math.random() * 2)],
        containers: containers,
        status: status,
        declaredValue: totalValue,
        totalValue: totalValue,
        shippingDate: new Date(createdAt.getTime() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        eta: new Date(createdAt.getTime() + 15 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        createdAt: createdAt.toISOString(),
        updatedAt: new Date(Date.now() - Math.random() * 5 * 24 * 60 * 60 * 1000).toISOString(),
        documents: docs,
        trackingHistory: trackingHistory,
        priority: ['High', 'Medium', 'Low'][Math.floor(Math.random() * 3)],
        paymentStatus: ['Paid', 'Partial', 'Pending', 'Deposit'][Math.floor(Math.random() * 4)],
        paymentPercentage: [100, 60, 30, 0][Math.floor(Math.random() * 4)],
        specialInstructions: Math.random() > 0.7 ? 'Please ensure all items are properly packaged for sea freight.' : '',
        delayed: Math.random() > 0.8,
        delayReason: Math.random() > 0.8 ? 'Port congestion - 3 day delay' : '',
        actionRequired: ['Submit customs documentation', 'Contact shipping line for updated ETA', 'Prepare delivery documents', 'Arrange inland transport'][Math.floor(Math.random() * 4)],
        // ShipmentTracker compatible fields
        currentLocation: status === 'in_transit' ? 'Indian Ocean' : status === 'delivered' ? portOfDischarges[0] : portOfLoadings[0],
        plannedPortOfLoading: portOfLoadings[0],
        plannedPortOfDischarge: portOfDischarges[0],
        plannedETD: new Date(createdAt.getTime() + 5 * 24 * 60 * 60 * 1000).toISOString(),
        plannedETA: new Date(createdAt.getTime() + 15 * 24 * 60 * 60 * 1000).toISOString(),
        assignedVessel: vessels[Math.floor(Math.random() * vessels.length)],
        assignedVoyage: `SE-${String(2026).slice(2)}-${String(Math.floor(Math.random() * 100)).padStart(3, '0')}`,
        vesselFlag: ['Panama', 'Liberia', 'Marshall Islands', 'Bahamas'][Math.floor(Math.random() * 4)],
        movementType: ['FCL', 'LCL'][Math.floor(Math.random() * 2)],
        plannedTransitTime: `${Math.floor(Math.random() * 15 + 5)} days`,
        timeline: trackingHistory,
        shipper: exporter
      });
    }
    return bookings;
  };

  useEffect(() => {
    const storedBookings = localStorage.getItem('exporterFreightBookings');
    if (storedBookings) {
      try {
        const parsed = JSON.parse(storedBookings);
        if (parsed.length > 0) {
          setBookings(parsed);
          setFilteredBookings(parsed);
          setLoading(false);
          return;
        }
      } catch (e) {
        console.error('Error parsing stored bookings:', e);
      }
    }
    
    const dummyData = generateDummyBookings();
    localStorage.setItem('exporterFreightBookings', JSON.stringify(dummyData));
    setBookings(dummyData);
    setFilteredBookings(dummyData);
    setLoading(false);
  }, []);

  useEffect(() => {
    let filtered = [...bookings];
    
    if (searchTerm) {
      filtered = filtered.filter(b => 
        b.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        b.bookingNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        b.blNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        b.exporter.toLowerCase().includes(searchTerm.toLowerCase()) ||
        b.consignee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        b.vessel.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (statusFilter !== 'all') {
      filtered = filtered.filter(b => b.status === statusFilter);
    }
    
    switch(sortBy) {
      case 'date-desc':
        filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case 'date-asc':
        filtered.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        break;
      case 'value-desc':
        filtered.sort((a, b) => b.totalValue - a.totalValue);
        break;
      case 'value-asc':
        filtered.sort((a, b) => a.totalValue - b.totalValue);
        break;
      case 'status':
        filtered.sort((a, b) => a.status.localeCompare(b.status));
        break;
      case 'exporter':
        filtered.sort((a, b) => a.exporter.localeCompare(b.exporter));
        break;
      default:
        break;
    }
    
    setFilteredBookings(filtered);
  }, [searchTerm, statusFilter, sortBy, bookings]);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const getStatusConfig = (status) => {
    const configs = {
      pending: {
        label: 'Pending',
        color: colors.warning,
        icon: Clock,
        bg: 'bg-yellow-100 dark:bg-yellow-900/30',
        text: 'text-yellow-700 dark:text-yellow-400',
        border: 'border-yellow-200 dark:border-yellow-800'
      },
      confirmed: {
        label: 'Confirmed',
        color: colors.info,
        icon: CheckCircle,
        bg: 'bg-blue-100 dark:bg-blue-900/30',
        text: 'text-blue-700 dark:text-blue-400',
        border: 'border-blue-200 dark:border-blue-800'
      },
      in_transit: {
        label: 'In Transit',
        color: colors.teal,
        icon: Ship,
        bg: 'bg-teal-100 dark:bg-teal-900/30',
        text: 'text-teal-700 dark:text-teal-400',
        border: 'border-teal-200 dark:border-teal-800'
      },
      delivered: {
        label: 'Delivered',
        color: colors.success,
        icon: CheckCircle,
        bg: 'bg-green-100 dark:bg-green-900/30',
        text: 'text-green-700 dark:text-green-400',
        border: 'border-green-200 dark:border-green-800'
      },
      cancelled: {
        label: 'Cancelled',
        color: colors.danger,
        icon: XCircle,
        bg: 'bg-red-100 dark:bg-red-900/30',
        text: 'text-red-700 dark:text-red-400',
        border: 'border-red-200 dark:border-red-800'
      },
      documentation_pending: {
        label: 'Docs Pending',
        color: colors.orange,
        icon: FileText,
        bg: 'bg-orange-100 dark:bg-orange-900/30',
        text: 'text-orange-700 dark:text-orange-400',
        border: 'border-orange-200 dark:border-orange-800'
      }
    };
    return configs[status] || configs.pending;
  };

  const getPaymentStatusColor = (status) => {
    switch(status) {
      case 'Paid': return colors.success;
      case 'Partial': return colors.warning;
      case 'Deposit': return colors.info;
      case 'Pending': return colors.danger;
      default: return colors.info;
    }
  };

  const getPriorityBadge = (priority) => {
    switch(priority) {
      case 'High': return { bg: 'bg-red-100 dark:bg-red-900/30', text: 'text-red-700 dark:text-red-400', color: colors.danger };
      case 'Medium': return { bg: 'bg-yellow-100 dark:bg-yellow-900/30', text: 'text-yellow-700 dark:text-yellow-400', color: colors.warning };
      case 'Low': return { bg: 'bg-green-100 dark:bg-green-900/30', text: 'text-green-700 dark:text-green-400', color: colors.success };
      default: return { bg: 'bg-gray-100 dark:bg-gray-700', text: 'text-gray-700 dark:text-gray-300', color: colors.info };
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-UG', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatCurrency = (amount) => {
    if (!amount) return 'UGX 0';
    return `UGX ${Number(amount).toLocaleString()}`;
  };

  const toggleBookingExpand = (bookingId) => {
    setExpandedBookingId(expandedBookingId === bookingId ? null : bookingId);
  };

  const getDocumentStatusIcon = (status) => {
    switch(status) {
      case 'uploaded': return <CheckCircle className="w-3.5 h-3.5 text-green-500" />;
      case 'pending': return <Clock className="w-3.5 h-3.5 text-yellow-500" />;
      case 'rejected': return <XCircle className="w-3.5 h-3.5 text-red-500" />;
      default: return <FileText className="w-3.5 h-3.5 text-gray-400" />;
    }
  };

  const getDocumentStatusColor = (status) => {
    switch(status) {
      case 'uploaded': return colors.success;
      case 'pending': return colors.warning;
      case 'rejected': return colors.danger;
      default: return colors.info;
    }
  };

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentBookings = filteredBookings.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredBookings.length / itemsPerPage);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const Toast = ({ message, type }) => {
    if (!message) return null;
    
    const bgColor = type === 'success' ? 'bg-green-500' : type === 'error' ? 'bg-red-500' : 'bg-blue-500';
    const icon = type === 'success' ? <CheckCircle className="w-5 h-5" /> : 
                  type === 'error' ? <AlertCircle className="w-5 h-5" /> : 
                  <Info className="w-5 h-5" />;

    return (
      <div className={`fixed top-24 right-4 z-50 flex items-center gap-3 px-4 py-3 rounded-xl shadow-xl text-white ${bgColor} animate-slide-in`}>
        {icon}
        <span className="text-sm font-medium">{message}</span>
        <button onClick={() => setToast(null)} className="ml-2 hover:opacity-80">
          <X className="w-4 h-4" />
        </button>
      </div>
    );
  };

  // Render expanded booking details with ShipmentTracker
  const renderExpandedBooking = (booking) => {
    if (expandedBookingId !== booking.id) return null;

    const statusConfig = getStatusConfig(booking.status);
    const StatusIcon = statusConfig.icon;

    return (
      <tr className="border-0">
        <td colSpan="8" className="p-0">
          <div className={`p-4 md:p-6 ${isDark ? 'bg-gray-800/90' : 'bg-gray-50/90'} rounded-b-xl`}>
            {/* Status Banner */}
            <div className={`mb-4 p-3 rounded-lg flex items-center justify-between flex-wrap gap-2 ${
              booking.delayed ? 'bg-red-100 dark:bg-red-900/30 border border-red-500' : ''
            }`} style={{
              backgroundColor: booking.delayed ? undefined : `${statusConfig.color}20`,
              borderColor: booking.delayed ? colors.danger : statusConfig.color
            }}>
              <div className="flex items-center gap-3">
                <span style={{ color: booking.delayed ? colors.danger : statusConfig.color }}>
                  <StatusIcon className="w-5 h-5" />
                </span>
                <div>
                  <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {booking.delayed ? `⚠️ DELAYED: ${booking.delayReason}` : `Status: ${statusConfig.label}`}
                  </p>
                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    {booking.actionRequired || 'No action required'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-xs px-2 py-1 rounded-full ${statusConfig.bg} ${statusConfig.text} ${statusConfig.border} border`}>
                  {booking.status.replace('_', ' ').toUpperCase()}
                </span>
                <span className={`text-xs px-2 py-1 rounded-full ${getPriorityBadge(booking.priority).bg} ${getPriorityBadge(booking.priority).text}`}>
                  {booking.priority} Priority
                </span>
                <button
                  onClick={() => {
                    setSelectedBookingForTracker(booking);
                    setShowTrackerModal(true);
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-white transition-all duration-200 hover:scale-105"
                  style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.purple})` }}
                >
                  <Navigation className="w-3.5 h-3.5" />
                  Track Shipment
                </button>
              </div>
            </div>

            {/* Quick Info Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
              <div className={`p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-white'} shadow-sm`}>
                <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Booking No.</p>
                <p className={`font-medium text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>{booking.bookingNo}</p>
              </div>
              <div className={`p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-white'} shadow-sm`}>
                <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>BL No.</p>
                <p className={`font-medium text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>{booking.blNo}</p>
              </div>
              <div className={`p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-white'} shadow-sm`}>
                <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Vessel</p>
                <p className={`font-medium text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>{booking.vessel}</p>
              </div>
              <div className={`p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-white'} shadow-sm`}>
                <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Total Value</p>
                <p className={`font-medium text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>{formatCurrency(booking.totalValue)}</p>
              </div>
              <div className={`p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-white'} shadow-sm`}>
                <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Shipping Date</p>
                <p className={`font-medium text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>{formatDate(booking.shippingDate)}</p>
              </div>
              <div className={`p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-white'} shadow-sm`}>
                <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>ETA</p>
                <p className={`font-medium text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>{formatDate(booking.eta)}</p>
              </div>
              <div className={`p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-white'} shadow-sm`}>
                <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Payment</p>
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full inline-flex items-center gap-1 mt-1`}
                  style={{
                    backgroundColor: getPaymentStatusColor(booking.paymentStatus) + '20',
                    color: getPaymentStatusColor(booking.paymentStatus)
                  }}>
                  {booking.paymentStatus}
                  {booking.paymentPercentage > 0 && ` (${booking.paymentPercentage}%)`}
                </span>
              </div>
              <div className={`p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-white'} shadow-sm`}>
                <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Containers</p>
                <p className={`font-medium text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>{booking.containers?.length || 0}</p>
              </div>
            </div>

            {/* SECTION 1: Exporter & Consignee Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-white'} shadow-sm`}>
                <h4 className={`font-medium text-sm mb-3 flex items-center gap-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  <Building className="w-4 h-4" style={{ color: colors.primary }} />
                  Exporter Details
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <User className="w-3.5 h-3.5" style={{ color: colors.primary }} />
                    <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>{booking.exporter}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5" style={{ color: colors.primary }} />
                    <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>{user?.email || 'exporter@company.com'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5" style={{ color: colors.primary }} />
                    <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>{user?.phone || '+256 700 123 456'}</span>
                  </div>
                </div>
              </div>

              <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-white'} shadow-sm`}>
                <h4 className={`font-medium text-sm mb-3 flex items-center gap-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  <Users className="w-4 h-4" style={{ color: colors.primary }} />
                  Consignee Details
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <User className="w-3.5 h-3.5" style={{ color: colors.primary }} />
                    <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>{booking.consignee.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5" style={{ color: colors.primary }} />
                    <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>{booking.consignee.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5" style={{ color: colors.primary }} />
                    <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>{booking.consignee.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5" style={{ color: colors.primary }} />
                    <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>{booking.consigneeDetails?.address || 'N/A'}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* SECTION 2: Agent & Transporter */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-white'} shadow-sm`}>
                <h4 className={`font-medium text-sm mb-3 flex items-center gap-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  <Shield className="w-4 h-4" style={{ color: colors.primary }} />
                  Forwarding Agent
                </h4>
                {booking.forwardingAgent ? (
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <User className="w-3.5 h-3.5" style={{ color: colors.primary }} />
                      <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>{booking.forwardingAgent.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-3.5 h-3.5" style={{ color: colors.primary }} />
                      <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>{booking.forwardingAgent.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5" style={{ color: colors.primary }} />
                      <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>{booking.forwardingAgent.contact}</span>
                    </div>
                  </div>
                ) : (
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>No agent assigned</p>
                )}
              </div>

              <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-white'} shadow-sm`}>
                <h4 className={`font-medium text-sm mb-3 flex items-center gap-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  <Truck className="w-4 h-4" style={{ color: colors.primary }} />
                  Inland Transporter
                </h4>
                {booking.inlandTransporter ? (
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <User className="w-3.5 h-3.5" style={{ color: colors.primary }} />
                      <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>{booking.inlandTransporter.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-3.5 h-3.5" style={{ color: colors.primary }} />
                      <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>{booking.inlandTransporter.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5" style={{ color: colors.primary }} />
                      <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>{booking.inlandTransporter.contact}</span>
                    </div>
                  </div>
                ) : (
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>No transporter assigned</p>
                )}
              </div>
            </div>

            {/* SECTION 3: Vessel & Route */}
            <div className={`p-4 rounded-lg mb-4 ${isDark ? 'bg-gray-700' : 'bg-white'} shadow-sm`}>
              <h4 className={`font-medium text-sm mb-3 flex items-center gap-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                <Anchor className="w-4 h-4" style={{ color: colors.primary }} />
                Vessel & Route Details
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                <div>
                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Vessel</p>
                  <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{booking.vessel}</p>
                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>SCAC: {booking.vesselSCAC}</p>
                </div>
                <div>
                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Voyage</p>
                  <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{booking.voyage}</p>
                </div>
                <div>
                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Type of Movement</p>
                  <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{booking.typeOfMovement}</p>
                </div>
                <div>
                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Port of Loading</p>
                  <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{booking.portOfLoading}</p>
                </div>
                <div>
                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Port of Discharge</p>
                  <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{booking.portOfDischarge}</p>
                </div>
                <div>
                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Place of Delivery</p>
                  <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{booking.placeOfDelivery}</p>
                </div>
              </div>
            </div>

            {/* SECTION 4: Shipment Tracker - Using the component */}
            <div className="mb-4">
              <ShipmentTracker 
                bookingData={{
                  ...booking,
                  status: booking.status === 'pending' ? 'processing' : 
                          booking.status === 'documentation_pending' ? 'processing' :
                          booking.status === 'confirmed' ? 'in_transit' :
                          booking.status === 'in_transit' ? 'in_transit' :
                          booking.status === 'delivered' ? 'delivered' : 'processing',
                  currentLocation: booking.currentLocation || booking.portOfLoading,
                  plannedPortOfLoading: booking.portOfLoading,
                  plannedPortOfDischarge: booking.portOfDischarge,
                  plannedETA: booking.eta,
                  plannedETD: booking.shippingDate,
                  timeline: booking.trackingHistory || []
                }}
                compact={true}
                showBackButton={false}
                showStatusUpdate={false}
                className="w-full"
              />
            </div>

            {/* SECTION 5: Containers with Items */}
            <div className={`p-4 rounded-lg mb-4 ${isDark ? 'bg-gray-700' : 'bg-white'} shadow-sm`}>
              <h4 className={`font-medium text-sm mb-3 flex items-center gap-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                <Container className="w-4 h-4" style={{ color: colors.primary }} />
                Containers ({booking.containers?.length || 0})
              </h4>
              <div className="space-y-3">
                {booking.containers?.map((container, idx) => (
                  <div key={idx} className={`p-3 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-gray-100'} border ${isDark ? 'border-gray-600' : 'border-gray-200'}`}>
                    {/* Container Header */}
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-3">
                        <div className={`p-1.5 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-white'}`}>
                          <Container className="w-4 h-4" style={{ color: colors.primary }} />
                        </div>
                        <div>
                          <p className={`font-medium text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            {container.id}
                          </p>
                          <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                            Seal: {container.sealNo}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className={`text-xs px-2 py-0.5 rounded-full ${isDark ? 'bg-gray-600 text-gray-300' : 'bg-gray-200 text-gray-600'}`}>
                          {container.size}
                        </span>
                        <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                          {container.packages} packages
                        </span>
                        <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                          {container.grossWeight}
                        </span>
                      </div>
                    </div>

                    {/* Container Details Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2 pt-2 border-t" style={{ borderColor: isDark ? '#4b5563' : '#d1d5db' }}>
                      <div>
                        <p className={`text-[10px] ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Volume</p>
                        <p className={`text-xs ${isDark ? 'text-white' : 'text-gray-900'}`}>{container.volume}</p>
                      </div>
                      <div>
                        <p className={`text-[10px] ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Measurement</p>
                        <p className={`text-xs ${isDark ? 'text-white' : 'text-gray-900'}`}>{container.measurement}</p>
                      </div>
                      <div>
                        <p className={`text-[10px] ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Cargo</p>
                        <p className={`text-xs ${isDark ? 'text-white' : 'text-gray-900'}`}>{container.cargoDescription}</p>
                      </div>
                      <div>
                        <p className={`text-[10px] ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Total Items</p>
                        <p className={`text-xs ${isDark ? 'text-white' : 'text-gray-900'}`}>{container.items?.length || 0} items</p>
                      </div>
                    </div>

                    {/* Items Table */}
                    {container.items && container.items.length > 0 && (
                      <div className="mt-2 pt-2 border-t" style={{ borderColor: isDark ? '#4b5563' : '#d1d5db' }}>
                        <div className="flex items-center justify-between mb-2">
                          <p className={`text-xs font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                            Items in Container ({container.items.length})
                          </p>
                          <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                            Total: {formatCurrency(container.totalItemValue)}
                          </span>
                        </div>
                        <div className="overflow-x-auto">
                          <table className="w-full text-xs">
                            <thead>
                              <tr className={`${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                                <th className="text-left py-1 px-2 font-medium">Item</th>
                                <th className="text-left py-1 px-2 font-medium">HS Code</th>
                                <th className="text-right py-1 px-2 font-medium">Qty</th>
                                <th className="text-right py-1 px-2 font-medium">Unit Price</th>
                                <th className="text-right py-1 px-2 font-medium">Total</th>
                              </tr>
                            </thead>
                            <tbody>
                              {container.items.map((item, itemIdx) => (
                                <tr key={itemIdx} className={`border-t ${isDark ? 'border-gray-600' : 'border-gray-100'}`}>
                                  <td className={`py-1 px-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                    {item.description}
                                  </td>
                                  <td className={`py-1 px-2 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                                    {item.hsCode}
                                  </td>
                                  <td className={`py-1 px-2 text-right ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                    {item.quantity} {item.unit}
                                  </td>
                                  <td className={`py-1 px-2 text-right ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                                    {formatCurrency(item.unitPrice)}
                                  </td>
                                  <td className={`py-1 px-2 text-right font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                    {formatCurrency(item.totalValue)}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* SECTION 6: Documents */}
            <div className={`p-4 rounded-lg mb-4 ${isDark ? 'bg-gray-700' : 'bg-white'} shadow-sm`}>
              <h4 className={`font-medium text-sm mb-3 flex items-center gap-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                <FileText className="w-4 h-4" style={{ color: colors.primary }} />
                Documents ({booking.documents?.length || 0})
              </h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className={`border-b ${isDark ? 'border-gray-600' : 'border-gray-200'}`}>
                      <th className={`text-left py-2 px-2 font-medium text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        Document Name
                      </th>
                      <th className={`text-left py-2 px-2 font-medium text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        Status
                      </th>
                      <th className={`text-left py-2 px-2 font-medium text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        Date
                      </th>
                      <th className={`text-left py-2 px-2 font-medium text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        Size
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {booking.documents?.map((doc) => (
                      <tr key={doc.id} className={`border-b ${isDark ? 'border-gray-600' : 'border-gray-100'}`}>
                        <td className="py-2 px-2">
                          <div className="flex items-center gap-2">
                            <FileText className="w-3.5 h-3.5" style={{ color: colors.primary }} />
                            <span className={isDark ? 'text-white' : 'text-gray-900'}>
                              {doc.name}
                            </span>
                          </div>
                        </td>
                        <td className="py-2 px-2">
                          <span className={`text-xs px-2 py-0.5 rounded-full flex items-center gap-1 w-fit`}
                            style={{
                              backgroundColor: getDocumentStatusColor(doc.status) + '20',
                              color: getDocumentStatusColor(doc.status)
                            }}>
                            {getDocumentStatusIcon(doc.status)}
                            {doc.status}
                          </span>
                        </td>
                        <td className="py-2 px-2">
                          <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>
                            {doc.date}
                          </span>
                        </td>
                        <td className="py-2 px-2">
                          <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>
                            {doc.size}
                          </span>
                        </td>
                      </tr>
                    ))}
                    {(!booking.documents || booking.documents.length === 0) && (
                      <tr>
                        <td colSpan="4" className={`py-4 text-center ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                          <FileText className="w-8 h-8 mx-auto mb-1 opacity-50" />
                          <p className="text-xs">No documents uploaded</p>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* SECTION 7: Tracking History */}
            <div className={`p-4 rounded-lg mb-4 ${isDark ? 'bg-gray-700' : 'bg-white'} shadow-sm`}>
              <h4 className={`font-medium text-sm mb-3 flex items-center gap-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                <Navigation className="w-4 h-4" style={{ color: colors.primary }} />
                Tracking History
              </h4>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {booking.trackingHistory?.map((track, idx) => (
                  <div key={idx} className={`p-2.5 rounded-lg flex items-start gap-3 ${
                    isDark ? 'bg-gray-800' : 'bg-gray-50'
                  }`}>
                    <div className="mt-0.5">
                      <div className={`w-2 h-2 rounded-full ${
                        idx === booking.trackingHistory.length - 1 ? 'bg-green-500' : 'bg-gray-400'
                      }`}></div>
                      {idx < booking.trackingHistory.length - 1 && (
                        <div className={`w-0.5 h-6 mx-auto ${isDark ? 'bg-gray-600' : 'bg-gray-300'}`}></div>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between flex-wrap gap-1">
                        <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          {track.status}
                        </p>
                        <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                          {formatDate(track.date)}
                        </span>
                      </div>
                      <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        {track.location}
                      </p>
                      {track.description && (
                        <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                          {track.description}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
                {(!booking.trackingHistory || booking.trackingHistory.length === 0) && (
                  <div className={`text-center py-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    <Clock className="w-8 h-8 mx-auto mb-1 opacity-50" />
                    <p className="text-xs">No tracking history available</p>
                  </div>
                )}
              </div>
            </div>

            {/* SECTION 8: Special Instructions */}
            {booking.specialInstructions && (
              <div className={`mt-4 p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-white'} shadow-sm border-l-4`}
                style={{ borderLeftColor: colors.primary }}>
                <p className={`text-xs font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  Special Instructions
                </p>
                <p className={`text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {booking.specialInstructions}
                </p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 mt-4 pt-4" style={{ borderTop: `2px solid ${isDark ? '#374151' : '#e5e7eb'}` }}>
              <button
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white transition-all duration-200 hover:scale-105 hover:shadow-lg"
                style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.purple})` }}
                onClick={() => showToast(`📄 Viewing full details of ${booking.id}`, 'info')}
              >
                <FileText className="w-4 h-4" />
                View Full Details
              </button>
              <button
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white transition-all duration-200 hover:scale-105 hover:shadow-lg"
                style={{ background: `linear-gradient(135deg, ${colors.info}, ${colors.teal})` }}
                onClick={() => showToast('📥 Downloading all documents...', 'info')}
              >
                <Download className="w-4 h-4" />
                Download All
              </button>
              <button
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white transition-all duration-200 hover:scale-105 hover:shadow-lg"
                style={{ background: `linear-gradient(135deg, ${colors.success}, ${colors.teal})` }}
                onClick={() => showToast('🔗 Tracking link copied!', 'success')}
              >
                <Share2 className="w-4 h-4" />
                Share Tracking
              </button>
              <button
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white transition-all duration-200 hover:scale-105 hover:shadow-lg"
                style={{ background: `linear-gradient(135deg, ${colors.warning}, ${colors.orange})` }}
                onClick={() => showToast('🖨️ Printing booking details...', 'info')}
              >
                <Printer className="w-4 h-4" />
                Print
              </button>
              {(booking.status === 'pending' || booking.status === 'documentation_pending') && (
                <button
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white transition-all duration-200 hover:scale-105 hover:shadow-lg"
                  style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.pink})` }}
                  onClick={() => showToast('✏️ Editing booking...', 'info')}
                >
                  <Edit className="w-4 h-4" />
                  Edit Booking
                </button>
              )}
              <button
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 hover:scale-105 hover:shadow-lg"
                style={{ 
                  background: isDark ? colors.primaryBgDark : colors.primaryBg,
                  color: colors.primary
                }}
                onClick={() => toggleBookingExpand(booking.id)}
              >
                <ChevronUp className="w-4 h-4" />
                Hide Details
              </button>
            </div>
          </div>
        </td>
      </tr>
    );
  };

  // Pagination Component
  const Pagination = ({ currentPage, totalPages, onPageChange, itemsPerPage, onItemsPerPageChange }) => {
    if (totalPages <= 1 && itemsPerPage >= filteredBookings.length) return null;

    return (
      <div className="flex items-center justify-between mt-4 flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            Page {currentPage} of {totalPages || 1}
          </span>
          <select
            value={itemsPerPage}
            onChange={(e) => {
              onItemsPerPageChange(Number(e.target.value));
              onPageChange(1);
            }}
            className={`px-2 py-1 rounded-lg border text-xs focus:outline-none focus:ring-2 ${
              isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
            }`}
            style={{ focusRingColor: colors.primary }}
          >
            <option value={5}>5 per page</option>
            <option value={10}>10 per page</option>
            <option value={20}>20 per page</option>
            <option value={50}>50 per page</option>
          </select>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`p-1.5 rounded-lg transition-colors ${
              currentPage === 1
                ? isDark ? 'text-gray-600 cursor-not-allowed' : 'text-gray-300 cursor-not-allowed'
                : isDark ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-600'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          {Array.from({ length: Math.min(5, totalPages || 1) }, (_, i) => {
            let pageNum;
            if ((totalPages || 1) <= 5) {
              pageNum = i + 1;
            } else if (currentPage <= 3) {
              pageNum = i + 1;
            } else if (currentPage >= (totalPages || 1) - 2) {
              pageNum = (totalPages || 1) - 4 + i;
            } else {
              pageNum = currentPage - 2 + i;
            }
            return (
              <button
                key={pageNum}
                onClick={() => onPageChange(pageNum)}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                  currentPage === pageNum
                    ? 'text-white'
                    : isDark ? 'text-gray-400 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'
                }`}
                style={{
                  backgroundColor: currentPage === pageNum ? colors.primary : 'transparent'
                }}
              >
                {pageNum}
              </button>
            );
          })}
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === (totalPages || 1)}
            className={`p-1.5 rounded-lg transition-colors ${
              currentPage === (totalPages || 1)
                ? isDark ? 'text-gray-600 cursor-not-allowed' : 'text-gray-300 cursor-not-allowed'
                : isDark ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-600'
            }`}
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  };

  // Stats
  const stats = {
    total: bookings.length,
    pending: bookings.filter(b => b.status === 'pending' || b.status === 'documentation_pending').length,
    inTransit: bookings.filter(b => b.status === 'in_transit').length,
    delivered: bookings.filter(b => b.status === 'delivered').length,
    cancelled: bookings.filter(b => b.status === 'cancelled').length,
    totalValue: bookings.reduce((sum, b) => sum + (b.totalValue || 0), 0)
  };

  // Shipment Tracker Modal
  const TrackerModal = () => {
    if (!showTrackerModal || !selectedBookingForTracker) return null;

    return (
      <div 
        className="fixed inset-0 flex items-center justify-center z-50 p-4"
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}
        onClick={() => {
          setShowTrackerModal(false);
          setSelectedBookingForTracker(null);
        }}
      >
        <div 
          className={`max-w-4xl w-full max-h-[90vh] overflow-y-auto p-4 rounded-xl shadow-2xl ${isDark ? 'bg-gray-800' : 'bg-white'}`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Shipment Tracker - {selectedBookingForTracker.bookingNo}
            </h3>
            <button
              onClick={() => {
                setShowTrackerModal(false);
                setSelectedBookingForTracker(null);
              }}
              className={`p-1 rounded-lg transition-colors duration-200 ${
                isDark ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-500'
              }`}
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          
          <ShipmentTracker 
            bookingData={{
              ...selectedBookingForTracker,
              status: selectedBookingForTracker.status === 'pending' ? 'processing' : 
                      selectedBookingForTracker.status === 'documentation_pending' ? 'processing' :
                      selectedBookingForTracker.status === 'confirmed' ? 'in_transit' :
                      selectedBookingForTracker.status === 'in_transit' ? 'in_transit' :
                      selectedBookingForTracker.status === 'delivered' ? 'delivered' : 'processing',
              currentLocation: selectedBookingForTracker.currentLocation || selectedBookingForTracker.portOfLoading,
              plannedPortOfLoading: selectedBookingForTracker.portOfLoading,
              plannedPortOfDischarge: selectedBookingForTracker.portOfDischarge,
              plannedETA: selectedBookingForTracker.eta,
              plannedETD: selectedBookingForTracker.shippingDate,
              timeline: selectedBookingForTracker.trackingHistory || [],
              trackingId: selectedBookingForTracker.trackingId || `TRK-${selectedBookingForTracker.id}`
            }}
            showBackButton={false}
            showStatusUpdate={false}
            compact={false}
            className="w-full"
          />
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen w-full p-4 md:p-6" style={{ backgroundColor: isDark ? '#1a1a2e' : '#f8fafc' }}>
      {toast && <Toast message={toast.message} type={toast.type} />}
      <TrackerModal />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <button
              onClick={() => navigate('/exporter-dashboard')}
              className={`flex items-center gap-2 text-sm hover:underline mb-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </button>
            <h1 className={`text-2xl md:text-3xl font-bold bg-gradient-to-r ${isDark ? 'from-purple-400 to-pink-400' : 'from-purple-600 to-pink-600'} bg-clip-text text-transparent`}>
              Freight Bookings
            </h1>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              Manage all your freight bookings • {bookings.length} total bookings
            </p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
          <div className={`p-4 rounded-xl ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-md'} hover:shadow-lg transition-shadow duration-200`}>
            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Total</p>
            <p className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{stats.total}</p>
          </div>
          <div className={`p-4 rounded-xl bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 border border-yellow-200 dark:border-yellow-800 hover:shadow-lg transition-shadow duration-200`}>
            <p className={`text-xs text-yellow-600 dark:text-yellow-400`}>Pending</p>
            <p className="text-xl font-bold text-yellow-600 dark:text-yellow-400">{stats.pending}</p>
          </div>
          <div className={`p-4 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border border-blue-200 dark:border-blue-800 hover:shadow-lg transition-shadow duration-200`}>
            <p className={`text-xs text-blue-600 dark:text-blue-400`}>In Transit</p>
            <p className="text-xl font-bold text-blue-600 dark:text-blue-400">{stats.inTransit}</p>
          </div>
          <div className={`p-4 rounded-xl bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border border-green-200 dark:border-green-800 hover:shadow-lg transition-shadow duration-200`}>
            <p className={`text-xs text-green-600 dark:text-green-400`}>Delivered</p>
            <p className="text-xl font-bold text-green-600 dark:text-green-400">{stats.delivered}</p>
          </div>
          <div className={`p-4 rounded-xl bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border border-purple-200 dark:border-purple-800 hover:shadow-lg transition-shadow duration-200`}>
            <p className={`text-xs text-purple-600 dark:text-purple-400`}>Total Value</p>
            <p className="text-xl font-bold text-purple-600 dark:text-purple-400">{formatCurrency(stats.totalValue).replace('UGX', '')}</p>
          </div>
        </div>

        {/* Filters */}
        <div className={`rounded-xl p-4 mb-6 ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-md'}`}>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search bookings..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full pl-10 pr-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 transition-all duration-200 ${
                  isDark ? 'bg-gray-700 border-gray-600 text-white focus:ring-purple-500' : 'bg-white border-gray-300 text-gray-900 focus:ring-purple-500'
                }`}
                style={{ focusRingColor: colors.primary }}
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className={`px-3 py-2.5 rounded-xl border focus:outline-none focus:ring-2 transition-all duration-200 ${
                isDark ? 'bg-gray-700 border-gray-600 text-white focus:ring-purple-500' : 'bg-white border-gray-300 text-gray-900 focus:ring-purple-500'
              }`}
              style={{ focusRingColor: colors.primary }}
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="documentation_pending">Docs Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="in_transit">In Transit</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className={`px-3 py-2.5 rounded-xl border focus:outline-none focus:ring-2 transition-all duration-200 ${
                isDark ? 'bg-gray-700 border-gray-600 text-white focus:ring-purple-500' : 'bg-white border-gray-300 text-gray-900 focus:ring-purple-500'
              }`}
              style={{ focusRingColor: colors.primary }}
            >
              <option value="date-desc">Latest First</option>
              <option value="date-asc">Oldest First</option>
              <option value="value-desc">Highest Value</option>
              <option value="value-asc">Lowest Value</option>
              <option value="status">Sort by Status</option>
              <option value="exporter">Sort by Exporter</option>
            </select>
            <button
              onClick={() => {
                setSearchTerm('');
                setStatusFilter('all');
                setSortBy('date-desc');
                setCurrentPage(1);
              }}
              className="px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 hover:scale-105 flex items-center gap-2 justify-center"
              style={{
                backgroundColor: isDark ? colors.primaryBgDark : colors.primaryBg,
                color: colors.primary
              }}
            >
              <RefreshCw className="w-4 h-4" />
              Reset
            </button>
            <button
              onClick={() => {
                const dummyData = generateDummyBookings();
                localStorage.setItem('exporterFreightBookings', JSON.stringify(dummyData));
                setBookings(dummyData);
                setFilteredBookings(dummyData);
                showToast('Bookings refreshed with new data!', 'success');
              }}
              className="px-4 py-2.5 rounded-xl text-sm font-medium text-white transition-all duration-200 hover:scale-105 hover:shadow-lg flex items-center gap-2 justify-center"
              style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.purple})` }}
            >
              <RefreshCw className="w-4 h-4" />
              Refresh Data
            </button>
          </div>
        </div>

        {/* Sort Info */}
        <div className="flex flex-wrap items-center justify-between mb-4">
          <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            Showing {filteredBookings.length} bookings
          </span>
          <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            Last updated: {new Date().toLocaleString()}
          </span>
        </div>

        {/* Bookings Table */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <RefreshCw className="w-8 h-8 animate-spin" style={{ color: colors.primary }} />
          </div>
        ) : filteredBookings.length === 0 ? (
          <div className={`text-center py-12 rounded-xl ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-md'}`}>
            <Package className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              No Bookings Found
            </h3>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              {bookings.length === 0 ? "You haven't created any freight bookings yet." : "No bookings match your filters."}
            </p>
          </div>
        ) : (
          <div className={`rounded-xl overflow-hidden border ${isDark ? 'border-gray-700' : 'border-gray-200'} shadow-sm`}>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-gray-700 dark:to-gray-800">
                  <tr>
                    <th className="text-left py-3 px-4 font-semibold text-xs text-gray-700 dark:text-gray-300">Booking</th>
                    <th className="text-left py-3 px-4 font-semibold text-xs text-gray-700 dark:text-gray-300">Exporter</th>
                    <th className="text-left py-3 px-4 font-semibold text-xs text-gray-700 dark:text-gray-300">Consignee</th>
                    <th className="text-left py-3 px-4 font-semibold text-xs text-gray-700 dark:text-gray-300">Status</th>
                    <th className="text-left py-3 px-4 font-semibold text-xs text-gray-700 dark:text-gray-300">Vessel</th>
                    <th className="text-left py-3 px-4 font-semibold text-xs text-gray-700 dark:text-gray-300">Value</th>
                    <th className="text-left py-3 px-4 font-semibold text-xs text-gray-700 dark:text-gray-300">ETA</th>
                    <th className="text-center py-3 px-4 font-semibold text-xs text-gray-700 dark:text-gray-300">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                  {currentBookings.map((booking) => {
                    const isExpanded = expandedBookingId === booking.id;
                    const statusConfig = getStatusConfig(booking.status);
                    const StatusIcon = statusConfig.icon;

                    return (
                      <React.Fragment key={booking.id}>
                        <tr 
                          className={`cursor-pointer transition-all duration-200 ${
                            isDark ? 'hover:bg-gray-700/50' : 'hover:bg-gray-50'
                          } ${isExpanded ? (isDark ? 'bg-gray-700' : 'bg-purple-50') : ''}`}
                          onClick={() => toggleBookingExpand(booking.id)}
                        >
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2">
                              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-purple-100 to-indigo-100 dark:from-purple-900/30 dark:to-indigo-900/30 flex items-center justify-center">
                                <Ship className="w-3.5 h-3.5" style={{ color: colors.primary }} />
                              </div>
                              <div>
                                <span className={`font-mono text-xs font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                  {booking.id}
                                </span>
                                <p className={`text-[10px] ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                                  {booking.bookingNo}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2">
                              <Building className="w-3.5 h-3.5" style={{ color: colors.primary }} />
                              <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>
                                {booking.exporter}
                              </span>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2">
                              <User className="w-3.5 h-3.5" style={{ color: colors.primary }} />
                              <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>
                                {booking.consignee.name}
                              </span>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex flex-col gap-0.5">
                              <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${statusConfig.bg} ${statusConfig.text} ${statusConfig.border} ${isDark ? statusConfig.darkBg : ''} ${isDark ? statusConfig.darkText : ''} ${isDark ? statusConfig.darkBorder : ''}`}>
                                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: statusConfig.color }} />
                                <StatusIcon className="w-3 h-3" />
                                {statusConfig.label}
                              </span>
                              {booking.delayed && (
                                <span className="text-[10px] text-red-500 dark:text-red-400 flex items-center gap-1">
                                  <AlertTriangle className="w-3 h-3" />
                                  Delayed
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>
                              {booking.vessel}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <span className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                              {formatCurrency(booking.totalValue)}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                              {formatDate(booking.eta)}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center justify-center">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleBookingExpand(booking.id);
                                }}
                                className="p-1.5 rounded-lg transition-all duration-200 hover:scale-110 flex items-center gap-1.5"
                                style={{ backgroundColor: isDark ? '#374151' : '#f3f4f6', color: colors.primary }}
                                title={isExpanded ? "Hide Details" : "Show Details"}
                              >
                                {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                                <span className="text-xs font-medium">
                                  {isExpanded ? 'Hide' : 'Details'}
                                </span>
                              </button>
                            </div>
                          </td>
                        </tr>
                        {renderExpandedBooking(booking)}
                      </React.Fragment>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <Pagination 
              currentPage={currentPage} 
              totalPages={totalPages} 
              onPageChange={goToPage}
              itemsPerPage={itemsPerPage}
              onItemsPerPageChange={setItemsPerPage}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ExporterFreightBookings;