import React, { useState, useContext, useEffect } from 'react';
import {
  Ship,
  Package,
  Truck,
  Clock,
  Calendar,
  MapPin,
  Eye,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  ArrowLeft,
  Anchor,
  Box,
  Navigation,
  FileText,
  CheckCircle,
  AlertCircle,
  Search,
  Filter,
  X,
  MoreVertical,
  Download,
  RefreshCw,
  Globe,
  Compass,
  Wind,
  Waves,
  Coffee,
  Utensils,
  Wifi,
  Users,
  BarChart3,
  TrendingUp,
  TrendingDown,
  Activity,
  Layers,
  ClipboardList,
  FileCheck,
  Shield,
  CreditCard,
  FileSignature,
  Grid,
  List
} from 'lucide-react';
import { ThemeContext } from '../../context/themeContext';
import { useNavigate } from 'react-router-dom';

const Shipments = () => {
  const navigate = useNavigate();
  const { darkMode } = useContext(ThemeContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
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
  };

  const isDark = darkMode

  // Sample shipments data (newest first)
  const shipments = [
    {
      id: '#461',
      origin: 'Shanghai, China',
      destination: 'Port of Mombasa',
      status: 'In Transit',
      progress: 25,
      eta: '28 Sep 2026',
      createdDate: '2026-09-01',
      items: 150,
      weight: '4.5 tons',
      container: 'JP-893421',
      currentLocation: 'Pacific Ocean',
      lastUpdate: '1 day ago',
      statusIcon: '🚢',
      statusColor: colors.primary,
      containers: [
        {
          id: 'JP-893421',
          status: 'At Sea',
          location: 'Pacific Ocean',
          voyage: 'MV Pacific Voyager',
          eta: '28 Sep 2026 14:30',
          daysAtSea: 23,
          nextPort: 'Port of Mombasa',
          distanceRemaining: '2,450 nautical miles',
          items: [
            { name: 'Electronics Components', quantity: 450, weight: '2.5 tons' },
            { name: 'Circuit Boards', quantity: 1200, weight: '1.8 tons' },
            { name: 'Power Supplies', quantity: 850, weight: '2.2 tons' }
          ]
        }
      ],
      milestones: [
        { stage: 'Supplier dispatched goods', date: '01 Sep 2026', completed: true },
        { stage: 'Vessel departed', date: '05 Sep 2026', completed: true },
        { stage: 'Arrived Mombasa', date: '25 Sep 2026', completed: false },
        { stage: 'Customs inspection', date: '28 Sep 2026', completed: false },
        { stage: 'Delivery', date: '30 Sep 2026', completed: false },
      ],
      documents: ['Commercial Invoice', 'Bill of Lading', 'PVoC']
    },
    {
      id: '#462',
      origin: 'Hamburg, Germany',
      destination: 'Kampala, Uganda',
      status: 'Customs Clearance',
      progress: 60,
      eta: '15 Sep 2026',
      createdDate: '2026-08-20',
      items: 200,
      weight: '6.8 tons',
      container: 'DE-782341',
      currentLocation: 'Mombasa Port',
      lastUpdate: '3 hours ago',
      statusIcon: '📋',
      statusColor: colors.warning,
      containers: [
        {
          id: 'DE-782341',
          status: 'At Port',
          location: 'Mombasa Port - Customs Bond',
          voyage: 'MV European Trader',
          eta: '15 Sep 2026 09:00',
          daysAtSea: 20,
          nextPort: 'Kampala Inland Depot',
          distanceRemaining: '0 - In Bond',
          items: [
            { name: 'Industrial Machinery', quantity: 120, weight: '4.5 tons' },
            { name: 'Spare Parts', quantity: 450, weight: '2.3 tons' }
          ]
        }
      ],
      milestones: [
        { stage: 'Supplier dispatched goods', date: '20 Aug 2026', completed: true },
        { stage: 'Vessel departed', date: '25 Aug 2026', completed: true },
        { stage: 'Arrived Mombasa', date: '10 Sep 2026', completed: true },
        { stage: 'Customs inspection', date: '12 Sep 2026', completed: false },
        { stage: 'Delivery', date: '15 Sep 2026', completed: false },
      ],
      documents: ['Commercial Invoice', 'COC', 'Freight Invoice']
    },
    {
      id: '#460',
      origin: 'Durban, South Africa',
      destination: 'Nairobi, Kenya',
      status: 'Delivered',
      progress: 100,
      eta: '05 Aug 2026',
      createdDate: '2026-07-10',
      items: 320,
      weight: '10.8 tons',
      container: 'SA-456732',
      currentLocation: 'Nairobi Warehouse',
      lastUpdate: '2 days ago',
      statusIcon: '✅',
      statusColor: colors.success,
      containers: [
        {
          id: 'SA-456732',
          status: 'Delivered',
          location: 'Nairobi Warehouse',
          voyage: 'MV African Trader',
          eta: 'Delivered 05 Aug 2026',
          daysAtSea: 12,
          nextPort: 'Nairobi Distribution Center',
          distanceRemaining: 'Completed',
          items: [
            { name: 'Textile Fabrics', quantity: 280, weight: '8.2 tons' },
            { name: 'Dyeing Agents', quantity: 150, weight: '0.5 tons' }
          ]
        }
      ],
      milestones: [
        { stage: 'Supplier dispatched goods', date: '10 Jul 2026', completed: true },
        { stage: 'Vessel departed', date: '20 Jul 2026', completed: true },
        { stage: 'Arrived Mombasa', date: '25 Jul 2026', completed: true },
        { stage: 'Customs inspection', date: '28 Jul 2026', completed: true },
        { stage: 'Delivery', date: '05 Aug 2026', completed: true },
      ],
      documents: ['Commercial Invoice', 'Proof of Payment', 'COC']
    },
    {
      id: '#459',
      origin: 'Mumbai, India',
      destination: 'Kampala, Uganda',
      status: 'Customs Clearance',
      progress: 45,
      eta: '18 Aug 2026',
      createdDate: '2026-07-01',
      items: 280,
      weight: '8.2 tons',
      container: 'IN-782341',
      currentLocation: 'Customs Checkpoint',
      lastUpdate: '5 hours ago',
      statusIcon: '📋',
      statusColor: colors.warning,
      containers: [
        {
          id: 'IN-782341',
          status: 'At Port',
          location: 'Customs Checkpoint',
          voyage: 'MV Indian Trader',
          eta: '18 Aug 2026 09:00',
          daysAtSea: 14,
          nextPort: 'Kampala Inland Depot',
          distanceRemaining: '0 - Customs Hold',
          items: [
            { name: 'Electronics Components', quantity: 280, weight: '8.2 tons' }
          ]
        }
      ],
      milestones: [
        { stage: 'Supplier dispatched goods', date: '01 Aug 2026', completed: true },
        { stage: 'Vessel departed', date: '08 Aug 2026', completed: true },
        { stage: 'Arrived Mombasa', date: '12 Aug 2026', completed: true },
        { stage: 'Customs inspection', date: '14 Aug 2026', completed: false },
        { stage: 'Delivery', date: '18 Aug 2026', completed: false },
      ],
      documents: ['Commercial Invoice', 'COC', 'Freight Invoice']
    },
    {
      id: '#458',
      origin: 'Shanghai, China',
      destination: 'Port of Mombasa',
      status: 'In Transit',
      progress: 70,
      eta: '12 Aug 2026',
      createdDate: '2026-06-15',
      items: 450,
      weight: '12.5 tons',
      container: 'MSKU-458921',
      currentLocation: 'Indian Ocean',
      lastUpdate: '2 hours ago',
      statusIcon: '🚢',
      statusColor: colors.primary,
      containers: [
        {
          id: 'MSKU-458921',
          status: 'At Sea',
          location: 'Indian Ocean',
          voyage: 'MV Star Express',
          eta: '12 Aug 2026 14:30',
          daysAtSea: 8,
          nextPort: 'Port of Mombasa',
          distanceRemaining: '342 nautical miles',
          items: [
            { name: 'Electronics Components', quantity: 450, weight: '2.5 tons' },
            { name: 'Circuit Boards', quantity: 1200, weight: '1.8 tons' },
            { name: 'Power Supplies', quantity: 850, weight: '2.2 tons' }
          ]
        }
      ],
      milestones: [
        { stage: 'Supplier dispatched goods', date: '15 Jul 2026', completed: true },
        { stage: 'Vessel departed', date: '25 Jul 2026', completed: true },
        { stage: 'Arrived Mombasa', date: '10 Aug 2026', completed: false },
        { stage: 'Customs inspection', date: '12 Aug 2026', completed: false },
        { stage: 'Delivery', date: '15 Aug 2026', completed: false },
      ],
      documents: ['Commercial Invoice', 'Bill of Lading', 'PVoC']
    }
  ];

  // Sort shipments by created date (newest first)
  const sortedShipments = [...shipments].sort((a, b) => 
    new Date(b.createdDate) - new Date(a.createdDate)
  );

  // Filter shipments
  const filteredShipments = sortedShipments.filter(shipment => {
    const matchesSearch = shipment.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          shipment.origin.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          shipment.destination.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || shipment.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  // Get status options for filter
  const statusOptions = ['all', 'In Transit', 'Customs Clearance', 'Delivered', 'Pending'];

  // Toggle expansion
  const toggleExpand = (shipmentId, e) => {
    e.stopPropagation();
    if (expandedShipment === shipmentId) {
      setExpandedShipment(null);
    } else {
      setExpandedShipment(shipmentId);
    }
  };

  // Navigate to shipment details
  const viewShipmentDetails = (shipmentId) => {
    navigate(`/importer-shipments/${shipmentId.replace('#', '')}`);
  };

  // Handle shipment name click
  const handleShipmentNameClick = (shipmentId, e) => {
    e.stopPropagation();
    viewShipmentDetails(shipmentId);
  };

  // Get status color
  const getStatusColor = (status) => {
    switch(status) {
      case 'Delivered': return colors.success;
      case 'In Transit': return colors.primary;
      case 'Customs Clearance': return colors.warning;
      default: return colors.info;
    }
  };

  // Get status badge style
  const getStatusBadge = (status) => {
    const color = getStatusColor(status);
    return {
      backgroundColor: color + '20',
      color: color
    };
  };

  // Get status icon
  const getStatusIcon = (status) => {
    switch(status) {
      case 'Delivered': return <CheckCircle className="w-4 h-4" />;
      case 'In Transit': return <Ship className="w-4 h-4" />;
      case 'Customs Clearance': return <Shield className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  // Render list view
  const renderListView = () => (
    <div className="space-y-3">
      {filteredShipments.map((shipment) => {
        const isExpanded = expandedShipment === shipment.id;
        
        return (
          <div
            key={shipment.id}
            className={`rounded-lg transition-all duration-300 ${
              isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-md'
            } ${isExpanded ? 'p-4 md:p-6' : 'p-3 md:p-4'}`}
          >
            {/* Main Row */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div 
                className="flex-1 cursor-pointer"
                onClick={(e) => toggleExpand(shipment.id, e)}
              >
                <div className="flex items-center gap-3 mb-1">
                  <div className="p-2 rounded-lg flex-shrink-0" style={{ backgroundColor: colors.primaryBg }}>
                    <Ship className="w-5 h-5" style={{ color: colors.primary }} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 
                        className={`font-bold cursor-pointer hover:underline ${isDark ? 'text-white' : 'text-gray-900'}`}
                        onClick={(e) => handleShipmentNameClick(shipment.id, e)}
                      >
                        Shipment {shipment.id}
                      </h3>
                      <span 
                        className="text-xs font-medium px-2 py-0.5 rounded-full flex items-center gap-1"
                        style={getStatusBadge(shipment.status)}
                      >
                        {getStatusIcon(shipment.status)}
                        {shipment.status}
                      </span>
                    </div>
                    <p className={`text-xs md:text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      {shipment.origin} → {shipment.destination}
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-3 ml-12">
                  <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    <Calendar className="w-3 h-3 inline mr-1" />
                    ETA: {shipment.eta}
                  </span>
                  <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    <Package className="w-3 h-3 inline mr-1" />
                    {shipment.items} items
                  </span>
                  <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    <Anchor className="w-3 h-3 inline mr-1" />
                    {shipment.container}
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
                        backgroundColor: getStatusColor(shipment.status)
                      }}
                    />
                  </div>
                </div>
                <button
                  onClick={(e) => toggleExpand(shipment.id, e)}
                  className={`p-1.5 rounded-lg transition-colors hover:bg-gray-100 dark:hover:bg-gray-700`}
                  style={{ color: colors.primary }}
                >
                  {isExpanded ? (
                    <ChevronUp className="w-5 h-5" />
                  ) : (
                    <ChevronDown className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Expanded Content */}
            {isExpanded && (
              <div className="mt-4 pt-4 border-t space-y-4" style={{ borderColor: isDark ? '#374151' : '#e5e7eb' }}>
                {/* Quick Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div>
                    <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Items</p>
                    <p className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>{shipment.items}</p>
                  </div>
                  <div>
                    <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Weight</p>
                    <p className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>{shipment.weight}</p>
                  </div>
                  <div>
                    <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Container</p>
                    <p className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>{shipment.container}</p>
                  </div>
                  <div>
                    <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Last Update</p>
                    <p className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>{shipment.lastUpdate}</p>
                  </div>
                </div>

                {/* Location & ETA */}
                <div className={`p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" style={{ color: colors.primary }} />
                      <div>
                        <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Current Location</p>
                        <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{shipment.currentLocation}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" style={{ color: colors.primary }} />
                      <div>
                        <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Expected Arrival</p>
                        <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{shipment.eta}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Containers Preview */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      Containers ({shipment.containers.length})
                    </h4>
                  </div>
                  <div className="space-y-2">
                    {shipment.containers.slice(0, 1).map((container, idx) => (
                      <div key={idx} className={`p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <Anchor className="w-4 h-4" style={{ color: colors.primary }} />
                            <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                              {container.id}
                            </span>
                            <span className="text-xs px-2 py-0.5 rounded-full" style={getStatusBadge(container.status)}>
                              {container.status}
                            </span>
                          </div>
                          <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                            {container.items.length} items • {container.daysAtSea} days at sea
                          </span>
                        </div>
                        <div className="mt-2 text-xs">
                          <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>
                            Location: {container.location}
                          </span>
                        </div>
                      </div>
                    ))}
                    {shipment.containers.length > 1 && (
                      <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        +{shipment.containers.length - 1} more containers
                      </p>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
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
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isDark ? 'hover:bg-gray-600 text-gray-300' : 'hover:bg-gray-100 text-gray-600'
                    }`}
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
  );

  // Render grid view
  const renderGridView = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {filteredShipments.map((shipment) => (
        <div
          key={shipment.id}
          className={`rounded-lg p-4 transition-all duration-300 cursor-pointer hover:shadow-lg ${
            isDark ? 'bg-gray-800 border border-gray-700 hover:border-gray-600' : 'bg-white shadow-md hover:shadow-xl'
          }`}
          onClick={() => viewShipmentDetails(shipment.id)}
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg flex-shrink-0" style={{ backgroundColor: colors.primaryBg }}>
              <Ship className="w-5 h-5" style={{ color: colors.primary }} />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className={`font-bold truncate ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {shipment.id}
              </h3>
              <p className={`text-xs truncate ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                {shipment.origin} → {shipment.destination}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 mb-2">
            <span 
              className="text-xs font-medium px-2 py-0.5 rounded-full flex items-center gap-1"
              style={getStatusBadge(shipment.status)}
            >
              {getStatusIcon(shipment.status)}
              {shipment.status}
            </span>
            <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              ETA: {shipment.eta}
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs mb-2">
            <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>
              <Package className="w-3 h-3 inline mr-1" />
              {shipment.items} items
            </span>
            <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>
              <Anchor className="w-3 h-3 inline mr-1" />
              {shipment.container}
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
                  backgroundColor: getStatusColor(shipment.status)
                }}
              />
            </div>
          </div>

          <div className="mt-3 pt-3 border-t flex items-center justify-between" style={{ borderColor: isDark ? '#374151' : '#e5e7eb' }}>
            <div className="flex items-center gap-1 text-xs">
              <MapPin className="w-3 h-3" style={{ color: colors.primary }} />
              <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>{shipment.currentLocation}</span>
            </div>
            <button
              className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              style={{ color: colors.primary }}
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen w-full p-4 md:p-6" style={{ backgroundColor: isDark ? '#1a1a2e' : '#f8fafc' }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className={`text-2xl md:text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Shipments
            </h1>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              Track and manage all your shipments
            </p>
          </div>
          <div className="flex items-center gap-2">
            {/* View toggle */}
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
                <List className="w-4 h-4" />
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
            <button
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:shadow-lg"
              style={{
                backgroundColor: colors.primary,
                color: 'white'
              }}
              onClick={() => navigate('/new-import')}
            >
              <Ship className="w-4 h-4" />
              New Import
            </button>
          </div>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6">
          <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white shadow-sm'}`}>
            <div className="flex items-center gap-2">
              <Ship className="w-4 h-4" style={{ color: colors.primary }} />
              <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Total</span>
            </div>
            <p className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{filteredShipments.length}</p>
          </div>
          <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white shadow-sm'}`}>
            <div className="flex items-center gap-2">
              <Ship className="w-4 h-4" style={{ color: colors.primary }} />
              <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>In Transit</span>
            </div>
            <p className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {filteredShipments.filter(s => s.status === 'In Transit').length}
            </p>
          </div>
          <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white shadow-sm'}`}>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4" style={{ color: colors.warning }} />
              <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Customs</span>
            </div>
            <p className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {filteredShipments.filter(s => s.status === 'Customs Clearance').length}
            </p>
          </div>
          <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white shadow-sm'}`}>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" style={{ color: colors.success }} />
              <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Delivered</span>
            </div>
            <p className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {filteredShipments.filter(s => s.status === 'Delivered').length}
            </p>
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
                placeholder="Search by ID, origin, or destination..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full pl-10 pr-4 py-2.5 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                  isDark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900'
                }`}
                style={{ focusRingColor: colors.primary }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = colors.primary;
                  e.currentTarget.style.boxShadow = `0 0 0 2px ${colors.primary}33`;
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = isDark ? '#4b5563' : '#d1d5db';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              />
            </div>
            <div className="flex gap-2">
              <div className="relative">
                <Filter className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className={`pl-10 pr-8 py-2.5 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 appearance-none ${
                    isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                  }`}
                  style={{ focusRingColor: colors.primary }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = colors.primary;
                    e.currentTarget.style.boxShadow = `0 0 0 2px ${colors.primary}33`;
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = isDark ? '#4b5563' : '#d1d5db';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  {statusOptions.map((status) => (
                    <option key={status} value={status}>
                      {status === 'all' ? 'All Status' : status}
                    </option>
                  ))}
                </select>
                <ChevronDown className={`absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
              </div>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setFilterStatus('all');
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

        {/* Shipments - List or Grid */}
        {viewMode === 'list' ? renderListView() : renderGridView()}

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

export default Shipments;