// roles/exporter/ExporterDashboard.jsx
import React, { useState, useContext, useEffect } from 'react';
import {
  Building,
  User,
  FileText,
  FileCheck,
  FileSignature,
  CreditCard,
  Shield,
  FileBarChart,
  Package,
  Truck,
  MapPin,
  Calendar,
  Clock,
  Eye,
  ChevronRight,
  CheckCircle,
  AlertCircle,
  AlertTriangle,
  X,
  Search,
  Filter,
  Download,
  RefreshCw,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  TrendingUp,
  TrendingDown,
  BarChart3,
  PieChart,
  Users,
  Briefcase,
  Home,
  Menu,
  Upload,
  Printer,
  Share2,
  Link,
  MessageSquare,
  Globe,
  Flag,
  Anchor,
  Container,
  Box,
  Layers,
  ClipboardList,
  Award,
  Target,
  Rocket,
  Zap,
  Flame,
  Coffee,
  Sun,
  Moon,
  Cloud,
  CloudRain,
  Snowflake,
  Wind,
  CheckSquare,
  Square,
  Clock as ClockIcon,
  Calendar as CalendarIcon,
  User as UserIcon,
  Tag,
  MoreVertical,
  Edit,
  Trash2,
  BookOpen,
  DollarSign as DollarSignIcon,
  Navigation
} from 'lucide-react';
import { ThemeContext } from '../../context/themeContext';
import { useNavigate } from 'react-router-dom';

const ExporterDashboard = () => {
  const navigate = useNavigate();
  const { darkMode } = useContext(ThemeContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [expandedDocument, setExpandedDocument] = useState(null);
  const [selectedTab, setSelectedTab] = useState('overview');

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
    orange: '#f97316',
  };

  const isDark = darkMode

  // Freight Bookings Data
  const freightBookingsData = [
    {
      id: 'FRT-2026-001',
      bookingNo: 'BKG-12345678',
      blNo: 'BL-2026-001',
      destination: 'Port of Mombasa',
      vessel: 'MV Star Express',
      voyage: 'SE-2026-078',
      status: 'In Transit',
      progress: 70,
      eta: '12 Aug 2026',
      shippingDate: '25 Jul 2026',
      containers: 2,
      items: 770,
      weight: '17.0 tons',
      declaredValue: '749,484,375 UGX',
      consignee: 'Global Importers Inc',
      priority: 'High',
      lastUpdate: '2 hours ago'
    },
    {
      id: 'FRT-2026-002',
      bookingNo: 'BKG-23456789',
      blNo: 'BL-2026-002',
      destination: 'Kigali, Rwanda',
      vessel: 'MV Pacific Voyager',
      voyage: 'PV-2026-045',
      status: 'Pending Approval',
      progress: 25,
      eta: '18 Aug 2026',
      shippingDate: '29 Jul 2026',
      containers: 1,
      items: 150,
      weight: '1.2 tons',
      declaredValue: '325,000,000 UGX',
      consignee: 'Rwanda Importers Ltd',
      priority: 'Medium',
      lastUpdate: '4 hours ago'
    },
    {
      id: 'FRT-2026-003',
      bookingNo: 'BKG-34567890',
      blNo: 'BL-2026-003',
      destination: 'Nairobi, Kenya',
      vessel: 'MV African Trader',
      voyage: 'AT-2026-067',
      status: 'Delivered',
      progress: 100,
      eta: '05 Aug 2026',
      shippingDate: '10 Jul 2026',
      containers: 1,
      items: 320,
      weight: '10.8 tons',
      declaredValue: '187,500,000 UGX',
      consignee: 'Nairobi Distributors',
      priority: 'Low',
      lastUpdate: '2 days ago'
    },
    {
      id: 'FRT-2026-004',
      bookingNo: 'BKG-45678901',
      blNo: 'BL-2026-004',
      destination: 'Kampala, Uganda',
      vessel: 'MV Pacific Voyager',
      voyage: 'PV-2026-045',
      status: 'In Customs',
      progress: 55,
      eta: '22 Sep 2026',
      shippingDate: '05 Sep 2026',
      containers: 2,
      items: 430,
      weight: '7.7 tons',
      declaredValue: '1,200,000,000 UGX',
      consignee: 'Uganda Manufacturers',
      priority: 'High',
      lastUpdate: '3 days ago'
    },
    {
      id: 'FRT-2026-005',
      bookingNo: 'BKG-56789012',
      blNo: 'BL-2026-005',
      destination: 'Mombasa, Kenya',
      vessel: 'MV Indian Trader',
      voyage: 'IT-2026-023',
      status: 'Pending Documentation',
      progress: 15,
      eta: '15 Oct 2026',
      shippingDate: '10 Sep 2026',
      containers: 2,
      items: 430,
      weight: '7.7 tons',
      declaredValue: '450,000,000 UGX',
      consignee: 'Global Importers Inc',
      priority: 'Medium',
      lastUpdate: '1 day ago'
    }
  ];

  // Exporter Data
  const exporterData = {
    company: {
      name: 'TechExport Ltd',
      address: '123 Industrial Park, Kampala, Uganda',
      contactPerson: 'Jane Smith',
      contactEmail: 'jane@techexport.com',
      contactPhone: '+256 712 345 678',
      registrationNumber: 'REG-2024-0789',
      tinNumber: '1234567890',
      exportLicense: 'EXP-2024-0456',
      established: '2018'
    },
    shipments: [
      {
        id: '#EXP-001',
        destination: 'Nairobi, Kenya',
        status: 'In Transit',
        progress: 70,
        eta: '15 Aug 2026',
        items: 450,
        weight: '12.5 tons',
        value: '$89,500',
        container: 'MSKU-458921',
        currentLocation: 'Indian Ocean',
        lastUpdate: '2 hours ago'
      },
      {
        id: '#EXP-002',
        destination: 'Mombasa, Kenya',
        status: 'Customs Clearance',
        progress: 45,
        eta: '20 Aug 2026',
        items: 280,
        weight: '8.2 tons',
        value: '$45,200',
        container: 'IN-782341',
        currentLocation: 'Customs Checkpoint',
        lastUpdate: '5 hours ago'
      },
      {
        id: '#EXP-003',
        destination: 'Kigali, Rwanda',
        status: 'Delivered',
        progress: 100,
        eta: '05 Aug 2026',
        items: 320,
        weight: '10.8 tons',
        value: '$67,800',
        container: 'SA-456732',
        currentLocation: 'Kigali Warehouse',
        lastUpdate: '2 days ago'
      }
    ],
    documents: [
      { 
        id: 1, 
        name: 'Exporter Details', 
        status: 'completed', 
        required: true,
        icon: Building,
        description: 'Company Name, Business Address, Contact Person Details'
      },
      { 
        id: 2, 
        name: 'Packing List (PL)', 
        status: 'completed', 
        required: true,
        icon: Package,
        description: 'Detailed list of items being exported'
      },
      { 
        id: 3, 
        name: 'Commercial Invoice', 
        status: 'pending', 
        required: true,
        icon: FileText,
        description: 'Commercial invoice for customs clearance'
      },
      { 
        id: 4, 
        name: 'Bill of Lading (BL)', 
        status: 'pending', 
        required: true,
        icon: FileSignature,
        description: 'Bill of lading for shipping'
      },
      { 
        id: 5, 
        name: 'Sales Contract', 
        status: 'completed', 
        required: true,
        icon: FileSignature,
        description: 'Sales agreement between parties'
      },
      { 
        id: 6, 
        name: 'Proof of Payments', 
        status: 'pending', 
        required: true,
        icon: CreditCard,
        description: 'Payment confirmation and receipts'
      },
      { 
        id: 7, 
        name: 'UNBS Certificate of Conformity', 
        status: 'pending', 
        required: true,
        icon: Shield,
        description: 'Product quality certification'
      },
      { 
        id: 8, 
        name: 'UNBS Pre-Export Verification', 
        status: 'pending', 
        required: true,
        icon: Shield,
        description: 'Pre-shipment quality verification'
      },
      { 
        id: 9, 
        name: 'Certificate of Origin (CO)', 
        status: 'pending', 
        required: true,
        icon: Globe,
        description: 'Certificate of country of origin'
      }
    ],
    stats: {
      totalExports: 45,
      activeShipments: 3,
      completedShipments: 42,
      pendingDocuments: 6,
      totalValue: '$1,247,890',
      countriesServed: ['Kenya', 'Uganda', 'Rwanda', 'Tanzania', 'DRC']
    }
  };

  // Custom Ship Icon component
  const ShipIcon = ({ className, style }) => (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 21c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.5 0 2.5 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
      <path d="M19.5 11.5V6.5a2 2 0 0 0-2-2H6.5a2 2 0 0 0-2 2v5" />
      <path d="M2 21V9l3-3" />
      <path d="M22 21V9l-3-3" />
      <path d="M17.5 9.5 12 15l-5.5-5.5" />
    </svg>
  );

  // ChevronUp component
  const ChevronUp = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="18 15 12 9 6 15" />
    </svg>
  );

  // ChevronDown component
  const ChevronDown = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );

  // Get status badge style
  const getStatusBadge = (status) => {
    const statusMap = {
      'completed': { 
        backgroundColor: colors.success + '20', 
        color: colors.success, 
        icon: <CheckCircle className="w-3 h-3" />,
        label: 'Completed'
      },
      'pending': { 
        backgroundColor: colors.warning + '20', 
        color: colors.warning, 
        icon: <Clock className="w-3 h-3" />,
        label: 'Pending'
      },
      'overdue': { 
        backgroundColor: colors.danger + '20', 
        color: colors.danger, 
        icon: <AlertCircle className="w-3 h-3" />,
        label: 'Overdue'
      },
      'Pending Approval': { 
        backgroundColor: colors.warning + '20', 
        color: colors.warning, 
        icon: <Clock className="w-3 h-3" />, 
        label: 'Pending Approval' 
      },
      'Pending Documentation': { 
        backgroundColor: colors.warning + '20', 
        color: colors.warning, 
        icon: <FileText className="w-3 h-3" />, 
        label: 'Pending Docs' 
      },
      'In Transit': { 
        backgroundColor: colors.info + '20', 
        color: colors.info, 
        icon: <ShipIcon className="w-3 h-3" />, 
        label: 'In Transit' 
      },
      'In Customs': { 
        backgroundColor: colors.orange + '20', 
        color: colors.orange, 
        icon: <AlertCircle className="w-3 h-3" />, 
        label: 'In Customs' 
      },
      'Delivered': { 
        backgroundColor: colors.success + '20', 
        color: colors.success, 
        icon: <CheckCircle className="w-3 h-3" />, 
        label: 'Delivered' 
      }
    };
    return statusMap[status] || statusMap['pending'];
  };

  // Get shipment status color
  const getShipmentStatusColor = (status) => {
    switch(status) {
      case 'Delivered': return colors.success;
      case 'In Transit': return colors.primary;
      case 'Customs Clearance': return colors.warning;
      default: return colors.info;
    }
  };

  // Filtered documents
  const filteredDocuments = exporterData.documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || doc.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  // Calculate progress
  const completedDocs = exporterData.documents.filter(d => d.status === 'completed').length;
  const totalDocs = exporterData.documents.length;
  const progressPercentage = Math.round((completedDocs / totalDocs) * 100);

  // Filtered bookings
  const filteredBookings = freightBookingsData.filter(booking => {
    const matchesSearch = 
      booking.bookingNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.blNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.vessel.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.consignee.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || booking.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  // Toggle document expansion
  const toggleExpand = (id) => {
    if (expandedDocument === id) {
      setExpandedDocument(null);
    } else {
      setExpandedDocument(id);
    }
  };

  // Document Card Component
  const DocumentCard = ({ doc }) => {
    const statusStyle = getStatusBadge(doc.status);
    const isExpanded = expandedDocument === doc.id;
    const Icon = doc.icon;

    return (
      <div 
        className={`rounded-lg transition-all duration-300 ${
          isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-md'
        } ${isExpanded ? 'p-4 md:p-6' : 'p-3 md:p-4'}`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 flex-1 cursor-pointer" onClick={() => toggleExpand(doc.id)}>
            <div className="p-2 rounded-lg flex-shrink-0" style={{ backgroundColor: colors.primaryBg }}>
              <Icon className="w-5 h-5" style={{ color: colors.primary }} />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h4 className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {doc.name}
                </h4>
                {doc.required && (
                  <span className="text-xs px-2 py-0.5 rounded-full" style={{ backgroundColor: colors.danger + '20', color: colors.danger }}>
                    Required
                  </span>
                )}
                <span className="text-xs px-2 py-0.5 rounded-full flex items-center gap-1" style={statusStyle}>
                  {statusStyle.icon}
                  {statusStyle.label}
                </span>
              </div>
              <p className={`text-xs md:text-sm truncate ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                {doc.description}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {doc.status === 'completed' ? (
              <button className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                <Eye className="w-4 h-4" style={{ color: colors.primary }} />
              </button>
            ) : (
              <button className="p-1.5 rounded-lg transition-colors hover:shadow-md" style={{ backgroundColor: colors.primaryBg, color: colors.primary }}>
                <Upload className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={() => toggleExpand(doc.id)}
              className="p-1.5 rounded-lg transition-colors hover:bg-gray-100 dark:hover:bg-gray-700"
              style={{ color: colors.primary }}
            >
              {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {isExpanded && (
          <div className="mt-4 pt-4 border-t space-y-3" style={{ borderColor: isDark ? '#374151' : '#e5e7eb' }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Document Status</p>
                <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {doc.status === 'completed' ? '✅ Completed' : '⏳ Pending Upload'}
                </p>
              </div>
              <div>
                <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Required</p>
                <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {doc.required ? 'Yes' : 'No'}
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {doc.status === 'completed' ? (
                <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 hover:shadow-md" style={{ backgroundColor: colors.primaryBg, color: colors.primary }}>
                  <Eye className="w-4 h-4" />
                  View Document
                </button>
              ) : (
                <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 hover:shadow-md" style={{ backgroundColor: colors.primary, color: 'white' }}>
                  <Upload className="w-4 h-4" />
                  Upload Now
                </button>
              )}
              <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200" style={{ backgroundColor: colors.primaryBg, color: colors.primary }}>
                <Download className="w-4 h-4" />
                Download Template
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen w-full p-4 md:p-6" style={{ backgroundColor: isDark ? '#1a1a2e' : '#f8fafc' }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className={`text-2xl md:text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Exporter Dashboard
            </h1>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              Welcome back, {exporterData.company.contactPerson}
            </p>
          </div>
          <div className="flex gap-2">
            <button
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:shadow-lg"
              style={{
                backgroundColor: isDark ? colors.primaryBgDark : colors.primaryBg,
                color: colors.primary
              }}
            >
              <RefreshCw className="w-4 h-4" />
              Refresh
            </button>
          </div>
        </div>

        {/* Company Profile Card */}
        <div className={`rounded-lg p-6 mb-6 ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-md'}`}>
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg" style={{ backgroundColor: colors.primaryBg }}>
                <Building className="w-8 h-8" style={{ color: colors.primary }} />
              </div>
              <div>
                <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {exporterData.company.name}
                </h2>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  {exporterData.company.address}
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-4 md:ml-auto text-sm">
              <div>
                <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Contact</p>
                <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{exporterData.company.contactEmail}</p>
              </div>
              <div>
                <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Phone</p>
                <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{exporterData.company.contactPhone}</p>
              </div>
              <div>
                <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>TIN</p>
                <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{exporterData.company.tinNumber}</p>
              </div>
              <div>
                <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>License</p>
                <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{exporterData.company.exportLicense}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4 mb-6">
          <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white shadow-sm'}`}>
            <div className="flex items-center gap-2">
              <Package className="w-4 h-4" style={{ color: colors.primary }} />
              <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Total Exports</span>
            </div>
            <p className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{exporterData.stats.totalExports}</p>
          </div>
          <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white shadow-sm'}`}>
            <div className="flex items-center gap-2">
              <ShipIcon className="w-4 h-4" style={{ color: colors.success }} />
              <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Active</span>
            </div>
            <p className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{exporterData.stats.activeShipments}</p>
          </div>
          <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white shadow-sm'}`}>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" style={{ color: colors.success }} />
              <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Completed</span>
            </div>
            <p className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{exporterData.stats.completedShipments}</p>
          </div>
          <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white shadow-sm'}`}>
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4" style={{ color: colors.warning }} />
              <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Pending Docs</span>
            </div>
            <p className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{exporterData.stats.pendingDocuments}</p>
          </div>
          <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white shadow-sm'}`}>
            <div className="flex items-center gap-2">
              <DollarSignIcon className="w-4 h-4" style={{ color: colors.success }} />
              <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Total Value</span>
            </div>
            <p className={`text-sm font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{exporterData.stats.totalValue}</p>
          </div>
          <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white shadow-sm'}`}>
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4" style={{ color: colors.info }} />
              <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Countries</span>
            </div>
            <p className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{exporterData.stats.countriesServed.length}</p>
          </div>
        </div>

        {/* Tabs */}
        <div className={`rounded-lg ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-md'} mb-6`}>
          <div className="flex border-b overflow-x-auto" style={{ borderColor: isDark ? '#374151' : '#e5e7eb' }}>
            <button
              onClick={() => setSelectedTab('overview')}
              className={`px-4 py-3 text-sm font-medium transition-all duration-200 border-b-2 whitespace-nowrap ${
                selectedTab === 'overview'
                  ? 'border-primary text-primary'
                  : isDark ? 'border-transparent text-gray-400 hover:text-white' : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
              style={{ borderColor: selectedTab === 'overview' ? colors.primary : 'transparent' }}
            >
              <BarChart3 className="w-4 h-4 inline mr-2" />
              Overview
            </button>
            <button
              onClick={() => setSelectedTab('documents')}
              className={`px-4 py-3 text-sm font-medium transition-all duration-200 border-b-2 whitespace-nowrap ${
                selectedTab === 'documents'
                  ? 'border-primary text-primary'
                  : isDark ? 'border-transparent text-gray-400 hover:text-white' : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
              style={{ borderColor: selectedTab === 'documents' ? colors.primary : 'transparent' }}
            >
              <FileText className="w-4 h-4 inline mr-2" />
              Documents ({completedDocs}/{totalDocs})
            </button>
            <button
              onClick={() => setSelectedTab('shipments')}
              className={`px-4 py-3 text-sm font-medium transition-all duration-200 border-b-2 whitespace-nowrap ${
                selectedTab === 'shipments'
                  ? 'border-primary text-primary'
                  : isDark ? 'border-transparent text-gray-400 hover:text-white' : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
              style={{ borderColor: selectedTab === 'shipments' ? colors.primary : 'transparent' }}
            >
              <ShipIcon className="w-4 h-4 inline mr-2" />
              Shipments
            </button>
            <button
              onClick={() => setSelectedTab('freight-bookings')}
              className={`px-4 py-3 text-sm font-medium transition-all duration-200 border-b-2 whitespace-nowrap ${
                selectedTab === 'freight-bookings'
                  ? 'border-primary text-primary'
                  : isDark ? 'border-transparent text-gray-400 hover:text-white' : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
              style={{ borderColor: selectedTab === 'freight-bookings' ? colors.primary : 'transparent' }}
            >
              <BookOpen className="w-4 h-4 inline mr-2" />
              Freight Bookings ({freightBookingsData.length})
            </button>
            <button
              onClick={() => setSelectedTab('analytics')}
              className={`px-4 py-3 text-sm font-medium transition-all duration-200 border-b-2 whitespace-nowrap ${
                selectedTab === 'analytics'
                  ? 'border-primary text-primary'
                  : isDark ? 'border-transparent text-gray-400 hover:text-white' : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
              style={{ borderColor: selectedTab === 'analytics' ? colors.primary : 'transparent' }}
            >
              <TrendingUp className="w-4 h-4 inline mr-2" />
              Analytics
            </button>
          </div>

          <div className="p-6">
            {/* Overview Tab */}
            {selectedTab === 'overview' && (
              <div className="space-y-6">
                {/* Documentation Progress */}
                <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        Documentation Progress
                      </h3>
                      <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        {completedDocs} of {totalDocs} documents completed
                      </p>
                    </div>
                    <span className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {progressPercentage}%
                    </span>
                  </div>
                  <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full transition-all duration-1000"
                      style={{ 
                        width: `${progressPercentage}%`,
                        backgroundColor: progressPercentage === 100 ? colors.success : colors.primary
                      }}
                    />
                  </div>
                </div>

                {/* Recent Shipments */}
                <div>
                  <h3 className={`text-sm font-medium mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    Recent Shipments
                  </h3>
                  <div className="space-y-3">
                    {exporterData.shipments.map((shipment, idx) => (
                      <div key={idx} className={`p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                          <div>
                            <div className="flex items-center gap-2">
                              <ShipIcon className="w-4 h-4" style={{ color: colors.primary }} />
                              <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                {shipment.id}
                              </span>
                              <span 
                                className="text-xs px-2 py-0.5 rounded-full"
                                style={{ 
                                  backgroundColor: getShipmentStatusColor(shipment.status) + '20',
                                  color: getShipmentStatusColor(shipment.status)
                                }}
                              >
                                {shipment.status}
                              </span>
                            </div>
                            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                              <MapPin className="w-3 h-3 inline mr-1" />
                              {shipment.destination}
                            </p>
                          </div>
                          <div className="flex flex-wrap items-center gap-4">
                            <div>
                              <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Progress</p>
                              <p className={`text-sm font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{shipment.progress}%</p>
                            </div>
                            <button
                              onClick={() => navigate(`/shipment/${shipment.id}`)}
                              className="text-xs px-3 py-1 rounded-lg transition-all duration-200 hover:shadow-md"
                              style={{
                                backgroundColor: colors.primary,
                                color: 'white'
                              }}
                            >
                              <Eye className="w-3 h-3 inline mr-1" />
                              View
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Countries Served */}
                <div>
                  <h3 className={`text-sm font-medium mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    Countries Served
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {exporterData.stats.countriesServed.map((country, idx) => (
                      <span key={idx} className={`text-sm px-4 py-2 rounded-lg ${isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'}`}>
                        <Flag className="w-4 h-4 inline mr-2" />
                        {country}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Documents Tab */}
            {selectedTab === 'documents' && (
              <div>
                <div className="flex flex-col sm:flex-row gap-3 mb-4">
                  <div className="flex-1 relative">
                    <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                    <input
                      type="text"
                      placeholder="Search documents..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className={`w-full pl-10 pr-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                        isDark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900'
                      }`}
                      style={{ focusRingColor: colors.primary }}
                    />
                  </div>
                  <div className="relative">
                    <Filter className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                    <select
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                      className={`pl-10 pr-8 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 appearance-none ${
                        isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                      }`}
                    >
                      <option value="all">All Status</option>
                      <option value="completed">Completed</option>
                      <option value="pending">Pending</option>
                      <option value="overdue">Overdue</option>
                    </select>
                    <ChevronDown className={`absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                  </div>
                </div>
                <div className="space-y-3">
                  {filteredDocuments.map((doc) => (
                    <DocumentCard key={doc.id} doc={doc} />
                  ))}
                </div>
              </div>
            )}

            {/* Shipments Tab */}
            {selectedTab === 'shipments' && (
              <div className="space-y-4">
                {exporterData.shipments.map((shipment, idx) => (
                  <div key={idx} className={`rounded-lg p-4 ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            {shipment.id}
                          </h4>
                          <span 
                            className="text-xs px-2 py-0.5 rounded-full"
                            style={{ 
                              backgroundColor: getShipmentStatusColor(shipment.status) + '20',
                              color: getShipmentStatusColor(shipment.status)
                            }}
                          >
                            {shipment.status}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-2 text-sm">
                          <div>
                            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Destination</p>
                            <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{shipment.destination}</p>
                          </div>
                          <div>
                            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Items</p>
                            <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{shipment.items}</p>
                          </div>
                          <div>
                            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Weight</p>
                            <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{shipment.weight}</p>
                          </div>
                          <div>
                            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Value</p>
                            <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{shipment.value}</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => navigate(`/shipment/${shipment.id}`)}
                          className="text-xs px-3 py-1 rounded-lg transition-all duration-200 hover:shadow-md"
                          style={{
                            backgroundColor: colors.primary,
                            color: 'white'
                          }}
                        >
                          <Eye className="w-3 h-3 inline mr-1" />
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Freight Bookings Tab */}
            {selectedTab === 'freight-bookings' && (
              <div>
                <div className="flex flex-col sm:flex-row gap-3 mb-4">
                  <div className="flex-1 relative">
                    <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                    <input
                      type="text"
                      placeholder="Search bookings by booking no, BL, vessel, consignee..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className={`w-full pl-10 pr-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                        isDark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900'
                      }`}
                      style={{ focusRingColor: colors.primary }}
                    />
                  </div>
                  <div className="relative">
                    <Filter className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                    <select
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                      className={`pl-10 pr-8 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 appearance-none ${
                        isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                      }`}
                    >
                      <option value="all">All Status</option>
                      <option value="In Transit">In Transit</option>
                      <option value="Pending Approval">Pending Approval</option>
                      <option value="Pending Documentation">Pending Documentation</option>
                      <option value="In Customs">In Customs</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                    <ChevronDown className={`absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                  </div>
                </div>

                {/* Freight Bookings Table */}
                <div className={`rounded-lg overflow-hidden ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-md'}`}>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className={`border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                          <th className={`text-left py-3 px-4 text-xs font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                            Booking
                          </th>
                          <th className={`text-left py-3 px-4 text-xs font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                            Vessel / Voyage
                          </th>
                          <th className={`text-left py-3 px-4 text-xs font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                            Destination
                          </th>
                          <th className={`text-left py-3 px-4 text-xs font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                            Status
                          </th>
                          <th className={`text-left py-3 px-4 text-xs font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                            ETA
                          </th>
                          <th className={`text-left py-3 px-4 text-xs font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                            Items / Weight
                          </th>
                          <th className={`text-left py-3 px-4 text-xs font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                            Priority
                          </th>
                          <th className={`text-left py-3 px-4 text-xs font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y" style={{ borderColor: isDark ? '#374151' : '#e5e7eb' }}>
                        {filteredBookings.map((booking) => {
                          const statusStyle = getStatusBadge(booking.status);
                          const StatusIcon = statusStyle.icon;
                          const progressColor = booking.progress > 70 ? colors.success : 
                                               booking.progress > 40 ? colors.warning : colors.danger;

                          return (
                            <tr key={booking.id} className={`hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors`}>
                              <td className="py-3 px-4">
                                <div>
                                  <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                    {booking.bookingNo}
                                  </p>
                                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                                    BL: {booking.blNo}
                                  </p>
                                </div>
                              </td>
                              <td className="py-3 px-4">
                                <div>
                                  <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                    {booking.vessel}
                                  </p>
                                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                                    Voy: {booking.voyage}
                                  </p>
                                </div>
                              </td>
                              <td className="py-3 px-4">
                                <div className="flex items-center gap-2">
                                  <MapPin className="w-4 h-4" style={{ color: colors.primary }} />
                                  <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                    {booking.destination}
                                  </span>
                                </div>
                              </td>
                              <td className="py-3 px-4">
                                <div className="space-y-1">
                                  <span className={`text-xs px-2 py-1 rounded-full flex items-center gap-1 inline-flex`}
                                    style={{ backgroundColor: statusStyle.backgroundColor, color: statusStyle.color }}>
                                    {StatusIcon}
                                    {booking.status}
                                  </span>
                                  <div className="flex items-center gap-2">
                                    <div className="w-16 h-1 bg-gray-200 rounded-full overflow-hidden">
                                      <div 
                                        className="h-full rounded-full transition-all duration-500"
                                        style={{ 
                                          width: `${booking.progress}%`,
                                          backgroundColor: progressColor
                                        }}
                                      />
                                    </div>
                                    <span className={`text-xs font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                                      {booking.progress}%
                                    </span>
                                  </div>
                                </div>
                              </td>
                              <td className="py-3 px-4">
                                <div>
                                  <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                    {booking.eta}
                                  </p>
                                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                                    Ship: {booking.shippingDate}
                                  </p>
                                </div>
                              </td>
                              <td className="py-3 px-4">
                                <div>
                                  <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                    {booking.items} items
                                  </p>
                                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                                    {booking.weight} • {booking.containers} containers
                                  </p>
                                </div>
                              </td>
                              <td className="py-3 px-4">
                                <span className={`text-xs px-2 py-1 rounded-full ${
                                  booking.priority === 'High' ? 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300' :
                                  booking.priority === 'Medium' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300' :
                                  'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                                }`}>
                                  {booking.priority}
                                </span>
                              </td>
                              <td className="py-3 px-4">
                                <div className="flex items-center gap-2">
                                  <button
                                    onClick={() => navigate(`/freight-bookings/${booking.id}`)}
                                    className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                    title="View Details"
                                  >
                                    <Eye className="w-4 h-4" style={{ color: colors.primary }} />
                                  </button>
                                  <button
                                    className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                    title="View Documents"
                                  >
                                    <FileText className="w-4 h-4" style={{ color: colors.primary }} />
                                  </button>
                                  <button
                                    className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                    title="Track Shipment"
                                  >
                                    <Navigation className="w-4 h-4" style={{ color: colors.primary }} />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Summary Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mt-4">
                  <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4" style={{ color: colors.primary }} />
                      <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Total Bookings</span>
                    </div>
                    <p className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{freightBookingsData.length}</p>
                  </div>
                  <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" style={{ color: colors.warning }} />
                      <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>In Progress</span>
                    </div>
                    <p className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {freightBookingsData.filter(b => b.status !== 'Delivered' && b.status !== 'Pending Approval').length}
                    </p>
                  </div>
                  <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                    <div className="flex items-center gap-2">
                      <ShipIcon className="w-4 h-4" style={{ color: colors.info }} />
                      <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>In Transit</span>
                    </div>
                    <p className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {freightBookingsData.filter(b => b.status === 'In Transit').length}
                    </p>
                  </div>
                  <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" style={{ color: colors.success }} />
                      <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Delivered</span>
                    </div>
                    <p className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {freightBookingsData.filter(b => b.status === 'Delivered').length}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Analytics Tab */}
            {selectedTab === 'analytics' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                    <h4 className={`text-sm font-medium mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      Export Performance
                    </h4>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm">
                          <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Completion Rate</span>
                          <span className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            {Math.round((exporterData.stats.completedShipments / exporterData.stats.totalExports) * 100)}%
                          </span>
                        </div>
                        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden mt-1">
                          <div 
                            className="h-full rounded-full transition-all duration-500"
                            style={{ 
                              width: `${Math.round((exporterData.stats.completedShipments / exporterData.stats.totalExports) * 100)}%`,
                              backgroundColor: colors.success
                            }}
                          />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm">
                          <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Documentation Progress</span>
                          <span className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{progressPercentage}%</span>
                        </div>
                        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden mt-1">
                          <div 
                            className="h-full rounded-full transition-all duration-500"
                            style={{ 
                              width: `${progressPercentage}%`,
                              backgroundColor: colors.primary
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                    <h4 className={`text-sm font-medium mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      Export Summary
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Total Exports</span>
                        <span className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{exporterData.stats.totalExports}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Active Shipments</span>
                        <span className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{exporterData.stats.activeShipments}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Total Value</span>
                        <span className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{exporterData.stats.totalValue}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Countries Served</span>
                        <span className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{exporterData.stats.countriesServed.length}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                  <h4 className={`text-sm font-medium mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    Countries Served
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {exporterData.stats.countriesServed.map((country, idx) => (
                      <div key={idx} className={`flex items-center gap-2 px-3 py-2 rounded-lg ${isDark ? 'bg-gray-600' : 'bg-gray-100'}`}>
                        <Flag className="w-4 h-4" style={{ color: colors.primary }} />
                        <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{country}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExporterDashboard;