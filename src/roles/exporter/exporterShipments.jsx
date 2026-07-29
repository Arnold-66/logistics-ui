import React, { useState, useContext } from 'react';
import {
  Package,
  Ship,
  Truck,
  Calendar,
  Clock,
  Eye,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Navigation,
  Anchor,
  FileText,
  CheckCircle,
  AlertCircle,
  X,
  Search,
  Filter,
  Plus,
  Download,
  RefreshCw,
  MoreVertical,
  Home,
  Globe,
  Flag,
  Weight,
  Ruler,
  Thermometer,
  Gauge,
  Users,
  Building,
  User,
  MapPin,
  ArrowRight,
  BarChart3,
  TrendingUp,
  ClipboardList,
  Send,
  UserCheck,
  FileSignature,
  CreditCard,
  Shield,
  FileBarChart
} from 'lucide-react';
import { ThemeContext } from '../../context/themeContext';
import { useAuth } from '../../context/authContext';
import { useNavigate } from 'react-router-dom';

const ExporterShipments = () => {
  const navigate = useNavigate();
  const { darkMode } = useContext(ThemeContext);
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterImporter, setFilterImporter] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [expandedShipment, setExpandedShipment] = useState(null);
  const [viewMode, setViewMode] = useState('list');

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
    indigo: '#6366f1',
    teal: '#14b8a6',
    orange: '#f97316',
    pink: '#ec4899'
  };

  const isDark = darkMode

  // CORRECTED Shipments data with unique property names
  const shipmentsData = [
    {
      id: 'EXP-001',
      importer: 'ImportFlow Ltd',
      importerId: 'IMP-001',
      importerContact: 'John Doe',
      importerEmail: 'john@importflow.com',
      importerPhone: '+256 712 345 678',
      importerCountry: 'Uganda',
      status: 'In Transit',
      type: 'Sea Freight',
      vessel: 'MV Star Express',
      voyage: 'SE-2026-078',
      destination: 'Port of Mombasa',
      origin: 'Kampala, Uganda',
      eta: '12 Aug 2026 14:30',
      etd: '25 Jul 2026 08:00',
      lastUpdate: '2 hours ago',
      weight: '12.5 tons',
      volume: '33.2 CBM',
      containers: 2,
      itemCount: 450,
      value: '749,484,375 UGX',
      progress: 70,
      documentCount: 8,
      documentsTotal: 11,
      color: colors.primary,
      coordinates: { lat: -2.5, lng: 48.5 },
      location: 'Indian Ocean',
      items: [
        { name: 'Electronics Components', quantity: 450, weight: '2.5 tons', value: '210,937,500 UGX' },
        { name: 'Circuit Boards', quantity: 1200, weight: '1.8 tons', value: '225,000,000 UGX' },
        { name: 'Power Supplies', quantity: 850, weight: '2.2 tons', value: '199,218,750 UGX' }
      ],
      milestones: [
        { stage: 'Export Documentation', date: '20 Jul 2026', completed: true },
        { stage: 'Container Loaded', date: '25 Jul 2026', completed: true },
        { stage: 'Vessel Departed', date: '26 Jul 2026', completed: true },
        { stage: 'In Transit', date: '27 Jul 2026', completed: true },
        { stage: 'Arrived at Port', date: '12 Aug 2026', completed: false },
        { stage: 'Customs Clearance', date: '13 Aug 2026', completed: false },
        { stage: 'Delivery', date: '15 Aug 2026', completed: false }
      ],
      documents: [
        { name: 'Commercial Invoice', status: 'completed' },
        { name: 'Packing List', status: 'completed' },
        { name: 'Bill of Lading', status: 'pending' },
        { name: 'Certificate of Origin', status: 'completed' },
        { name: 'Sales Contract', status: 'completed' },
        { name: 'UNBS CoC', status: 'pending' },
        { name: 'UNBS PVoC', status: 'pending' },
        { name: 'Proof of Payment', status: 'received' }
      ]
    },
    {
      id: 'EXP-002',
      importer: 'Global Importers Inc',
      importerId: 'IMP-002',
      importerContact: 'Sarah Kamau',
      importerEmail: 'sarah@globalimporters.com',
      importerPhone: '+254 722 345 678',
      importerCountry: 'Kenya',
      status: 'Loaded',
      type: 'Air Freight',
      vessel: 'CargoJet 747',
      voyage: 'CJ-2026-045',
      destination: 'Jomo Kenyatta Airport',
      origin: 'Entebbe, Uganda',
      eta: '18 Aug 2026 09:00',
      etd: '29 Jul 2026 15:30',
      lastUpdate: '4 hours ago',
      weight: '4.5 tons',
      volume: '18.5 CBM',
      containers: 1,
      itemCount: 320,
      value: '325,000,000 UGX',
      progress: 45,
      documentCount: 5,
      documentsTotal: 11,
      color: colors.info,
      coordinates: { lat: -1.3, lng: 36.8 },
      location: 'Nairobi, Kenya',
      items: [
        { name: 'Textile Fabrics', quantity: 320, weight: '4.5 tons', value: '325,000,000 UGX' }
      ],
      milestones: [
        { stage: 'Export Documentation', date: '22 Jul 2026', completed: true },
        { stage: 'Container Loaded', date: '29 Jul 2026', completed: true },
        { stage: 'In Transit', date: '29 Jul 2026', completed: true },
        { stage: 'Arrived at Destination', date: '18 Aug 2026', completed: false },
        { stage: 'Delivery', date: '19 Aug 2026', completed: false }
      ],
      documents: [
        { name: 'Commercial Invoice', status: 'completed' },
        { name: 'Packing List', status: 'completed' },
        { name: 'Bill of Lading', status: 'pending' },
        { name: 'Certificate of Origin', status: 'completed' },
        { name: 'Sales Contract', status: 'completed' },
        { name: 'UNBS CoC', status: 'pending' },
        { name: 'UNBS PVoC', status: 'pending' },
        { name: 'Proof of Payment', status: 'received' }
      ]
    },
    {
      id: 'EXP-003',
      importer: 'East Africa Trading Co',
      importerId: 'IMP-003',
      importerContact: 'Peter Habimana',
      importerEmail: 'peter@eastafricatrading.com',
      importerPhone: '+250 788 345 678',
      importerCountry: 'Rwanda',
      status: 'Delivered',
      type: 'Road Freight',
      vessel: 'Truck Fleet - Unit 23',
      voyage: 'TR-2026-023',
      destination: 'Kigali, Rwanda',
      origin: 'Kampala, Uganda',
      eta: 'Completed',
      etd: '15 Aug 2026 06:00',
      lastUpdate: '1 day ago',
      weight: '2.5 tons',
      volume: '15.2 CBM',
      containers: 1,
      itemCount: 150,
      value: '187,500,000 UGX',
      progress: 100,
      documentCount: 11,
      documentsTotal: 11,
      color: colors.success,
      coordinates: { lat: -1.94, lng: 30.06 },
      location: 'Kigali, Rwanda',
      items: [
        { name: 'Electronics Components', quantity: 150, weight: '2.5 tons', value: '187,500,000 UGX' }
      ],
      milestones: [
        { stage: 'Export Documentation', date: '08 Aug 2026', completed: true },
        { stage: 'Container Loaded', date: '12 Aug 2026', completed: true },
        { stage: 'In Transit', date: '13 Aug 2026', completed: true },
        { stage: 'Arrived at Destination', date: '18 Aug 2026', completed: true },
        { stage: 'Delivery', date: '18 Aug 2026', completed: true }
      ],
      documents: [
        { name: 'Commercial Invoice', status: 'completed' },
        { name: 'Packing List', status: 'completed' },
        { name: 'Bill of Lading', status: 'completed' },
        { name: 'Certificate of Origin', status: 'completed' },
        { name: 'Sales Contract', status: 'completed' },
        { name: 'UNBS CoC', status: 'completed' },
        { name: 'UNBS PVoC', status: 'completed' },
        { name: 'Proof of Payment', status: 'completed' }
      ]
    },
    {
      id: 'EXP-004',
      importer: 'ImportFlow Ltd',
      importerId: 'IMP-001',
      importerContact: 'John Doe',
      importerEmail: 'john@importflow.com',
      importerPhone: '+256 712 345 678',
      importerCountry: 'Uganda',
      status: 'In Customs',
      type: 'Sea Freight',
      vessel: 'MV Pacific Voyager',
      voyage: 'PV-2026-045',
      destination: 'Port of Mombasa',
      origin: 'Kampala, Uganda',
      eta: '22 Sep 2026 16:00',
      etd: '05 Sep 2026 10:00',
      lastUpdate: '3 days ago',
      weight: '8.2 tons',
      volume: '45.6 CBM',
      containers: 2,
      itemCount: 600,
      value: '1,200,000,000 UGX',
      progress: 30,
      documentCount: 4,
      documentsTotal: 11,
      color: colors.warning,
      coordinates: { lat: -4.05, lng: 39.67 },
      location: 'Mombasa Port - Customs Bond',
      items: [
        { name: 'Industrial Machinery', quantity: 120, weight: '8.2 tons', value: '1,200,000,000 UGX' },
        { name: 'Spare Parts', quantity: 480, weight: '2.3 tons', value: '230,000,000 UGX' }
      ],
      milestones: [
        { stage: 'Export Documentation', date: '28 Aug 2026', completed: true },
        { stage: 'Container Loaded', date: '05 Sep 2026', completed: true },
        { stage: 'Vessel Departed', date: '06 Sep 2026', completed: true },
        { stage: 'Arrived at Port', date: '20 Sep 2026', completed: true },
        { stage: 'Customs Clearance', date: '22 Sep 2026', completed: false },
        { stage: 'Delivery', date: '25 Sep 2026', completed: false }
      ],
      documents: [
        { name: 'Commercial Invoice', status: 'completed' },
        { name: 'Packing List', status: 'completed' },
        { name: 'Bill of Lading', status: 'received' },
        { name: 'Certificate of Origin', status: 'completed' },
        { name: 'Sales Contract', status: 'completed' },
        { name: 'UNBS CoC', status: 'pending' },
        { name: 'UNBS PVoC', status: 'pending' },
        { name: 'Proof of Payment', status: 'pending' }
      ]
    }
  ];

  // Get unique importers for filter
  const importers = ['all', ...new Set(shipmentsData.map(s => s.importer))];
  const statusOptions = ['all', 'Loaded', 'In Transit', 'In Customs', 'Delivered'];
  const typeOptions = ['all', ...new Set(shipmentsData.map(s => s.type))];

  // Filter shipments
  const filteredShipments = shipmentsData.filter(shipment => {
    const matchesSearch = shipment.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          shipment.importer.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          shipment.destination.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          shipment.vessel.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || shipment.status === filterStatus;
    const matchesImporter = filterImporter === 'all' || shipment.importer === filterImporter;
    const matchesType = filterType === 'all' || shipment.type === filterType;
    return matchesSearch && matchesStatus && matchesImporter && matchesType;
  });

  // Get status badge style
  const getStatusBadge = (status) => {
    const statusMap = {
      'Loaded': { backgroundColor: colors.success + '20', color: colors.success, icon: CheckCircle },
      'In Transit': { backgroundColor: colors.info + '20', color: colors.info, icon: Ship },
      'In Customs': { backgroundColor: colors.warning + '20', color: colors.warning, icon: Clock },
      'Delivered': { backgroundColor: colors.teal + '20', color: colors.teal, icon: CheckCircle },
      'Pending': { backgroundColor: colors.danger + '20', color: colors.danger, icon: AlertCircle }
    };
    return statusMap[status] || statusMap['Loaded'];
  };

  // Get progress color
  const getProgressColor = (progress) => {
    if (progress === 100) return colors.success;
    if (progress >= 70) return colors.primary;
    if (progress >= 40) return colors.warning;
    return colors.danger;
  };

  // Toggle expansion
  const toggleExpand = (id) => {
    if (expandedShipment === id) {
      setExpandedShipment(null);
    } else {
      setExpandedShipment(id);
    }
  };

  // Navigate to shipment details
  const viewShipmentDetails = (id) => {
    navigate(`/exporter-shipments/${id}`);
  };

  // Stats
  const totalShipments = shipmentsData.length;
  const inTransit = shipmentsData.filter(s => s.status === 'In Transit' || s.status === 'Loaded').length;
  const inCustoms = shipmentsData.filter(s => s.status === 'In Customs').length;
  const delivered = shipmentsData.filter(s => s.status === 'Delivered').length;

  // Get document status icon
  const getDocumentStatusIcon = (status) => {
    if (status === 'completed') return <CheckCircle className="w-3 h-3 text-green-500" />;
    if (status === 'pending') return <Clock className="w-3 h-3 text-yellow-500" />;
    if (status === 'received') return <CheckCircle className="w-3 h-3 text-teal-500" />;
    return <AlertCircle className="w-3 h-3 text-red-500" />;
  };

  return (
    <div className="min-h-screen w-full p-4 md:p-6" style={{ backgroundColor: isDark ? '#1a1a2e' : '#f8fafc' }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className={`text-2xl md:text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Export Shipments
            </h1>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              Track and manage all your export shipments
            </p>
          </div>
          <div className="flex gap-2">
            <button
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:shadow-lg"
              style={{
                backgroundColor: colors.primary,
                color: 'white'
              }}
              onClick={() => navigate('/new-export')}
            >
              <Plus className="w-4 h-4" />
              New Export
            </button>
          </div>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6">
          <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white shadow-sm'}`}>
            <div className="flex items-center gap-2">
              <Package className="w-4 h-4" style={{ color: colors.primary }} />
              <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Total</span>
            </div>
            <p className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{totalShipments}</p>
          </div>
          <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white shadow-sm'}`}>
            <div className="flex items-center gap-2">
              <Ship className="w-4 h-4" style={{ color: colors.info }} />
              <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>In Transit</span>
            </div>
            <p className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{inTransit}</p>
          </div>
          <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white shadow-sm'}`}>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" style={{ color: colors.warning }} />
              <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>In Customs</span>
            </div>
            <p className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{inCustoms}</p>
          </div>
          <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white shadow-sm'}`}>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" style={{ color: colors.success }} />
              <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Delivered</span>
            </div>
            <p className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{delivered}</p>
          </div>
        </div>

        {/* Filters */}
        <div className={`rounded-lg p-4 mb-6 transition-all duration-300 ${
          isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-md'
        }`}>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
              <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
              <input
                type="text"
                placeholder="Search by shipment ID, importer, destination..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full pl-10 pr-4 py-2.5 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                  isDark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900'
                }`}
                style={{ focusRingColor: colors.primary }}
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              <div className="relative">
                <Filter className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className={`pl-10 pr-8 py-2.5 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 appearance-none ${
                    isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                  }`}
                >
                  {statusOptions.map((status) => (
                    <option key={status} value={status}>
                      {status === 'all' ? 'All Status' : status}
                    </option>
                  ))}
                </select>
                <ChevronDown className={`absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
              </div>
              <div className="relative">
                <Filter className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                <select
                  value={filterImporter}
                  onChange={(e) => setFilterImporter(e.target.value)}
                  className={`pl-10 pr-8 py-2.5 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 appearance-none ${
                    isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                  }`}
                >
                  {importers.map((importer) => (
                    <option key={importer} value={importer}>
                      {importer === 'all' ? 'All Importers' : importer}
                    </option>
                  ))}
                </select>
                <ChevronDown className={`absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
              </div>
              <div className="relative">
                <Filter className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className={`pl-10 pr-8 py-2.5 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 appearance-none ${
                    isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                  }`}
                >
                  {typeOptions.map((type) => (
                    <option key={type} value={type}>
                      {type === 'all' ? 'All Types' : type}
                    </option>
                  ))}
                </select>
                <ChevronDown className={`absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
              </div>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setFilterStatus('all');
                  setFilterImporter('all');
                  setFilterType('all');
                }}
                className={`px-4 py-2.5 rounded-lg border transition-all duration-200 ${
                  isDark ? 'border-gray-600 text-gray-400 hover:bg-gray-700' : 'border-gray-300 text-gray-500 hover:bg-gray-100'
                }`}
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* View Toggle */}
        <div className="flex justify-end mb-4">
          <div className={`flex rounded-lg border ${isDark ? 'border-gray-700' : 'border-gray-200'} overflow-hidden`}>
            <button
              onClick={() => setViewMode('list')}
              className={`px-3 py-2 text-sm transition-all duration-200 flex items-center gap-1 ${
                viewMode === 'list' 
                  ? 'text-white' 
                  : isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
              }`}
              style={{ backgroundColor: viewMode === 'list' ? colors.primary : 'transparent' }}
            >
              <ClipboardList className="w-4 h-4" />
              <span className="hidden sm:inline">List</span>
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`px-3 py-2 text-sm transition-all duration-200 flex items-center gap-1 ${
                viewMode === 'grid' 
                  ? 'text-white' 
                  : isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
              }`}
              style={{ backgroundColor: viewMode === 'grid' ? colors.primary : 'transparent' }}
            >
              <Grid className="w-4 h-4" />
              <span className="hidden sm:inline">Grid</span>
            </button>
          </div>
        </div>

        {/* Shipments List/Grid */}
        {viewMode === 'list' ? (
          <div className="space-y-3">
            {filteredShipments.map((shipment) => {
              const isExpanded = expandedShipment === shipment.id;
              const statusStyle = getStatusBadge(shipment.status);
              const progressColor = getProgressColor(shipment.progress);
              const StatusIcon = statusStyle.icon;

              return (
                <div
                  key={shipment.id}
                  className={`rounded-lg transition-all duration-300 ${
                    isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-md'
                  } ${isExpanded ? 'p-4 md:p-6' : 'p-3 md:p-4'}`}
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                    <div className="flex-1 cursor-pointer" onClick={() => toggleExpand(shipment.id)}>
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg flex-shrink-0" style={{ backgroundColor: colors.primaryBg }}>
                          <Package className="w-5 h-5" style={{ color: colors.primary }} />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 
                              className={`font-bold cursor-pointer hover:underline ${isDark ? 'text-white' : 'text-gray-900'}`}
                              onClick={(e) => {
                                e.stopPropagation();
                                viewShipmentDetails(shipment.id);
                              }}
                            >
                              {shipment.id}
                            </h3>
                            <span className={`text-xs font-medium px-2 py-0.5 rounded-full flex items-center gap-1`} style={{
                              backgroundColor: statusStyle.backgroundColor,
                              color: statusStyle.color
                            }}>
                              <StatusIcon className="w-3 h-3" />
                              {shipment.status}
                            </span>
                            <span className={`text-xs px-2 py-0.5 rounded-full ${isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'}`}>
                              {shipment.type}
                            </span>
                            <span className={`text-xs px-2 py-0.5 rounded-full ${isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'}`}>
                              <Building className="w-3 h-3 inline mr-1" />
                              {shipment.importer}
                            </span>
                          </div>
                          <p className={`text-xs md:text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                            {shipment.vessel} • {shipment.destination}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-wrap items-center gap-3 ml-12 mt-1">
                        <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                          <Package className="w-3 h-3 inline mr-1" />
                          {shipment.itemCount} items
                        </span>
                        <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                          <Weight className="w-3 h-3 inline mr-1" />
                          {shipment.weight}
                        </span>
                        <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                          <Clock className="w-3 h-3 inline mr-1" />
                          ETA: {shipment.eta}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <div className="flex items-center gap-2">
                          <span className={`text-xs font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                            Progress
                          </span>
                          <span className={`text-xs font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            {shipment.progress}%
                          </span>
                        </div>
                        <div className="w-24 md:w-32 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full rounded-full transition-all duration-500"
                            style={{ 
                              width: `${shipment.progress}%`,
                              backgroundColor: progressColor
                            }}
                          />
                        </div>
                      </div>
                      <button
                        onClick={() => viewShipmentDetails(shipment.id)}
                        className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" style={{ color: colors.primary }} />
                      </button>
                      <button
                        onClick={() => toggleExpand(shipment.id)}
                        className="p-1.5 rounded-lg transition-colors hover:bg-gray-100 dark:hover:bg-gray-700"
                        style={{ color: colors.primary }}
                      >
                        {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  {/* Expanded Content */}
                  {isExpanded && (
                    <div className="mt-4 pt-4 border-t space-y-4" style={{ borderColor: isDark ? '#374151' : '#e5e7eb' }}>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        <div>
                          <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Weight</p>
                          <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{shipment.weight}</p>
                        </div>
                        <div>
                          <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Volume</p>
                          <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{shipment.volume}</p>
                        </div>
                        <div>
                          <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Containers</p>
                          <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{shipment.containers}</p>
                        </div>
                        <div>
                          <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Value</p>
                          <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{shipment.value}</p>
                        </div>
                      </div>

                      {/* Importer Info */}
                      <div className={`p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
                        <p className={`text-xs font-medium mb-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                          <Building className="w-3 h-3 inline mr-1" />
                          Importer Information
                        </p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                          <div>
                            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Company</p>
                            <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{shipment.importer}</p>
                          </div>
                          <div>
                            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Contact</p>
                            <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{shipment.importerContact}</p>
                          </div>
                          <div>
                            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Email</p>
                            <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{shipment.importerEmail}</p>
                          </div>
                          <div>
                            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Country</p>
                            <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{shipment.importerCountry}</p>
                          </div>
                        </div>
                      </div>

                      {/* Documents Progress */}
                      <div>
                        <div className="flex justify-between items-center">
                          <p className={`text-xs font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                            <FileText className="w-3 h-3 inline mr-1" />
                            Documents ({shipment.documentCount}/{shipment.documentsTotal})
                          </p>
                          <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                            {Math.round((shipment.documentCount / shipment.documentsTotal) * 100)}%
                          </span>
                        </div>
                        <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden mt-1">
                          <div 
                            className="h-full rounded-full transition-all duration-500"
                            style={{ 
                              width: `${(shipment.documentCount / shipment.documentsTotal) * 100}%`,
                              backgroundColor: colors.primary
                            }}
                          />
                        </div>
                        <div className="grid grid-cols-4 gap-1 mt-2">
                          {shipment.documents.map((doc, idx) => (
                            <div key={idx} className={`flex items-center gap-1 text-[10px] ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                              {getDocumentStatusIcon(doc.status)}
                              <span className="truncate">{doc.name}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Items Preview */}
                      <div>
                        <p className={`text-sm font-medium mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          Items in Shipment ({shipment.items.length} types)
                        </p>
                        <div className="space-y-1">
                          {shipment.items.map((item, idx) => (
                            <div key={idx} className={`flex items-center justify-between p-2 rounded ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
                              <div className="flex-1">
                                <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                  {item.name}
                                </p>
                                <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                                  HS Code: {item.hsCode || 'N/A'}
                                </p>
                              </div>
                              <div className="text-right">
                                <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                  Qty: {item.quantity}
                                </p>
                                <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                                  {item.weight} • {item.value}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Milestones */}
                      <div>
                        <p className={`text-sm font-medium mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>Milestones</p>
                        <div className="space-y-1">
                          {shipment.milestones.map((milestone, idx) => (
                            <div key={idx} className={`flex items-center gap-2 text-sm ${milestone.completed ? 'text-green-500' : isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                              {milestone.completed ? (
                                <CheckCircle className="w-4 h-4" />
                              ) : (
                                <Clock className="w-4 h-4" />
                              )}
                              <span>{milestone.stage}</span>
                              <span className="text-xs">{milestone.date}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 pt-2">
                        <button
                          onClick={() => viewShipmentDetails(shipment.id)}
                          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:shadow-md"
                          style={{
                            backgroundColor: colors.primary,
                            color: 'white'
                          }}
                        >
                          <Eye className="w-4 h-4" />
                          View Full Details
                        </button>
                        <button
                          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
                          style={{
                            backgroundColor: colors.primaryBg,
                            color: colors.primary
                          }}
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
        ) : (
          // Grid View
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredShipments.map((shipment) => {
              const statusStyle = getStatusBadge(shipment.status);
              const progressColor = getProgressColor(shipment.progress);
              const StatusIcon = statusStyle.icon;

              return (
                <div
                  key={shipment.id}
                  className={`rounded-lg p-4 transition-all duration-300 cursor-pointer hover:shadow-lg ${
                    isDark ? 'bg-gray-800 border border-gray-700 hover:border-gray-600' : 'bg-white shadow-md hover:shadow-xl'
                  }`}
                  onClick={() => viewShipmentDetails(shipment.id)}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className={`font-bold text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {shipment.id}
                      </h3>
                      <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        <Building className="w-3 h-3 inline mr-1" />
                        {shipment.importer}
                      </p>
                    </div>
                    <span className={`text-xs px-2 py-0.5 rounded-full flex items-center gap-1`} style={{
                      backgroundColor: statusStyle.backgroundColor,
                      color: statusStyle.color
                    }}>
                      <StatusIcon className="w-3 h-3" />
                      {shipment.status}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-xs mb-2">
                    <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>
                      <Package className="w-3 h-3 inline mr-1" />
                      {shipment.itemCount} items
                    </span>
                    <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>
                      <Weight className="w-3 h-3 inline mr-1" />
                      {shipment.weight}
                    </span>
                  </div>

                  <div className="mt-2">
                    <div className="flex justify-between items-center mb-1">
                      <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Progress</span>
                      <span className={`text-xs font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {shipment.progress}%
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full rounded-full transition-all duration-500"
                        style={{ 
                          width: `${shipment.progress}%`,
                          backgroundColor: progressColor
                        }}
                      />
                    </div>
                  </div>

                  <div className="mt-3 pt-3 border-t flex items-center justify-between" style={{ borderColor: isDark ? '#374151' : '#e5e7eb' }}>
                    <div className="flex items-center gap-1 text-xs">
                      <Clock className="w-3 h-3" style={{ color: colors.primary }} />
                      <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>ETA: {shipment.eta}</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs">
                      <FileText className="w-3 h-3" style={{ color: colors.primary }} />
                      <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>
                        {shipment.documentCount}/{shipment.documentsTotal}
                      </span>
                    </div>
                    <button
                      className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      style={{ color: colors.primary }}
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {filteredShipments.length === 0 && (
          <div className={`text-center py-12 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            <Package className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <p className="text-lg font-medium">No shipments found</p>
            <p className="text-sm">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

// Grid icon component
const Grid = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7" />
    <rect x="14" y="3" width="7" height="7" />
    <rect x="3" y="14" width="7" height="7" />
    <rect x="14" y="14" width="7" height="7" />
  </svg>
);

export default ExporterShipments;