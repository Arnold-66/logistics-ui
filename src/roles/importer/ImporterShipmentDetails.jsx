// roles/importer/ImporterShipmentDetails.jsx
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
  ChevronLeft,
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
  Home,
  Warehouse,
  Map,
  Crosshair,
  Plane,
  Train,
  Bus,
  Bike,
  Share2
} from 'lucide-react';
import { ThemeContext } from '../../context/themeContext';
import { useNavigate, useParams } from 'react-router-dom';
import DocumentViewer from '../../components/DocumentViewer';

const ImporterShipmentDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { darkMode } = useContext(ThemeContext);
  const [shipment, setShipment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showDocuments, setShowDocuments] = useState(false);

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

  // Sample shipment data - in real app, fetch from API
  const shipmentData = {
    '#458': {
      id: '#458',
      origin: 'Shanghai, China',
      originCoords: { lat: 31.2304, lng: 121.4737 },
      destination: 'Port of Mombasa',
      destCoords: { lat: -4.0435, lng: 39.6682 },
      status: 'In Transit',
      progress: 70,
      eta: '12 Aug 2026',
      createdDate: '2026-06-15',
      items: 450,
      weight: '12.5 tons',
      container: 'MSKU-458921',
      currentLocation: 'Indian Ocean',
      currentCoords: { lat: -2.5, lng: 48.5 },
      lastUpdate: '2 hours ago',
      statusIcon: '🚢',
      statusColor: colors.primary,
      locationType: 'sea',
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
      documents: [
        { id: 1, name: 'Commercial Invoice', type: 'invoice', status: 'completed', date: '2026-07-15', size: '2.4 MB', documentNumber: 'INV-2026-00458' },
        { id: 2, name: 'Bill of Lading', type: 'bl', status: 'completed', date: '2026-07-25', size: '1.8 MB', documentNumber: 'BOL-2026-00458' },
        { id: 3, name: 'PVoC Certificate', type: 'pvoc', status: 'pending', date: '2026-07-28', size: '1.2 MB', documentNumber: 'PVOC-2026-00458' },
        { id: 4, name: 'Packing List', type: 'list', status: 'completed', date: '2026-07-20', size: '0.8 MB', documentNumber: 'PL-2026-00458' }
      ]
    },
    '#459': {
      id: '#459',
      origin: 'Mumbai, India',
      originCoords: { lat: 19.0760, lng: 72.8777 },
      destination: 'Kampala, Uganda',
      destCoords: { lat: 0.3476, lng: 32.5825 },
      status: 'Customs Clearance',
      progress: 45,
      eta: '18 Aug 2026',
      createdDate: '2026-07-01',
      items: 280,
      weight: '8.2 tons',
      container: 'IN-782341',
      currentLocation: 'Customs Checkpoint - Mombasa',
      currentCoords: { lat: -4.0435, lng: 39.6682 },
      lastUpdate: '5 hours ago',
      statusIcon: '📋',
      statusColor: colors.warning,
      locationType: 'bond',
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
      documents: [
        { id: 1, name: 'Commercial Invoice', type: 'invoice', status: 'completed', date: '2026-08-01', size: '2.1 MB', documentNumber: 'INV-2026-00459' },
        { id: 2, name: 'COC Certificate', type: 'certificate', status: 'pending', date: '2026-08-05', size: '1.5 MB', documentNumber: 'COC-2026-00459' },
        { id: 3, name: 'Freight Invoice', type: 'invoice', status: 'completed', date: '2026-08-03', size: '3.2 MB', documentNumber: 'FI-2026-00459' }
      ]
    },
    '#460': {
      id: '#460',
      origin: 'Durban, South Africa',
      originCoords: { lat: -29.8587, lng: 31.0218 },
      destination: 'Nairobi, Kenya',
      destCoords: { lat: -1.2921, lng: 36.8219 },
      status: 'Delivered',
      progress: 100,
      eta: '05 Aug 2026',
      createdDate: '2026-07-10',
      items: 320,
      weight: '10.8 tons',
      container: 'SA-456732',
      currentLocation: 'Nairobi Warehouse',
      currentCoords: { lat: -1.2921, lng: 36.8219 },
      lastUpdate: '2 days ago',
      statusIcon: '✅',
      statusColor: colors.success,
      locationType: 'warehouse',
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
      documents: [
        { id: 1, name: 'Commercial Invoice', type: 'invoice', status: 'completed', date: '2026-07-12', size: '1.8 MB', documentNumber: 'INV-2026-00460' },
        { id: 2, name: 'Proof of Payment', type: 'payment', status: 'completed', date: '2026-07-20', size: '2.4 MB', documentNumber: 'POP-2026-00460' },
        { id: 3, name: 'COC Certificate', type: 'certificate', status: 'completed', date: '2026-07-25', size: '1.1 MB', documentNumber: 'COC-2026-00460' }
      ]
    },
    '#461': {
      id: '#461',
      origin: 'Shanghai, China',
      originCoords: { lat: 31.2304, lng: 121.4737 },
      destination: 'Port of Mombasa',
      destCoords: { lat: -4.0435, lng: 39.6682 },
      status: 'In Transit',
      progress: 25,
      eta: '28 Sep 2026',
      createdDate: '2026-09-01',
      items: 150,
      weight: '4.5 tons',
      container: 'JP-893421',
      currentLocation: 'Pacific Ocean',
      currentCoords: { lat: 8.5, lng: 58.5 },
      lastUpdate: '1 day ago',
      statusIcon: '🚢',
      statusColor: colors.primary,
      locationType: 'sea',
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
      documents: [
        { id: 1, name: 'Commercial Invoice', type: 'invoice', status: 'completed', date: '2026-09-02', size: '2.2 MB', documentNumber: 'INV-2026-00461' },
        { id: 2, name: 'Bill of Lading', type: 'bl', status: 'pending', date: '2026-09-05', size: '1.6 MB', documentNumber: 'BOL-2026-00461' },
        { id: 3, name: 'PVoC Certificate', type: 'pvoc', status: 'pending', date: '2026-09-06', size: '1.0 MB', documentNumber: 'PVOC-2026-00461' }
      ]
    },
    '#462': {
      id: '#462',
      origin: 'Hamburg, Germany',
      originCoords: { lat: 53.5511, lng: 9.9937 },
      destination: 'Kampala, Uganda',
      destCoords: { lat: 0.3476, lng: 32.5825 },
      status: 'Customs Clearance',
      progress: 60,
      eta: '15 Sep 2026',
      createdDate: '2026-08-20',
      items: 200,
      weight: '6.8 tons',
      container: 'DE-782341',
      currentLocation: 'Mombasa Port - Customs Bond',
      currentCoords: { lat: -4.0435, lng: 39.6682 },
      lastUpdate: '3 hours ago',
      statusIcon: '📋',
      statusColor: colors.warning,
      locationType: 'bond',
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
      documents: [
        { id: 1, name: 'Commercial Invoice', type: 'invoice', status: 'completed', date: '2026-08-22', size: '2.8 MB', documentNumber: 'INV-2026-00462' },
        { id: 2, name: 'COC Certificate', type: 'certificate', status: 'pending', date: '2026-08-25', size: '1.3 MB', documentNumber: 'COC-2026-00462' },
        { id: 3, name: 'Freight Invoice', type: 'invoice', status: 'completed', date: '2026-08-28', size: '3.5 MB', documentNumber: 'FI-2026-00462' },
        { id: 4, name: 'Packing List', type: 'list', status: 'completed', date: '2026-08-21', size: '0.9 MB', documentNumber: 'PL-2026-00462' }
      ]
    }
  };

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      const data = shipmentData[`#${id}`];
      if (data) {
        setShipment(data);
      }
      setLoading(false);
    }, 500);
  }, [id]);

  const getStatusColor = (status) => {
    switch(status) {
      case 'Delivered': return colors.success;
      case 'In Transit': return colors.primary;
      case 'Customs Clearance': return colors.warning;
      default: return colors.info;
    }
  };

  const getStatusBadge = (status) => {
    const color = getStatusColor(status);
    return {
      backgroundColor: color + '20',
      color: color
    };
  };

  const getLocationIcon = (type) => {
    switch(type) {
      case 'sea':
        return <Ship className="w-6 h-6 text-blue-500" />;
      case 'bond':
        return <Shield className="w-6 h-6 text-yellow-500" />;
      case 'warehouse':
        return <Warehouse className="w-6 h-6 text-green-500" />;
      case 'port':
        return <Anchor className="w-6 h-6 text-purple-500" />;
      case 'customs':
        return <FileCheck className="w-6 h-6 text-orange-500" />;
      case 'truck':
        return <Truck className="w-6 h-6 text-blue-500" />;
      default:
        return <MapPin className="w-6 h-6 text-gray-500" />;
    }
  };

  const getLocationLabel = (type) => {
    switch(type) {
      case 'sea': return 'At Sea';
      case 'bond': return 'Customs Bond';
      case 'warehouse': return 'Warehouse';
      case 'port': return 'Port';
      case 'customs': return 'Customs Clearance';
      case 'truck': return 'In Transit';
      default: return 'Location';
    }
  };

  // Mini Map Component
  const MiniMap = ({ shipment }) => {
    if (!shipment) return null;

    return (
      <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
        <div className="flex items-center justify-between mb-3">
          <h4 className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
            <Map className="w-4 h-4 inline mr-2" style={{ color: colors.primary }} />
            Live Location Tracking
          </h4>
          <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            {shipment.status}
          </span>
        </div>

        <div className="relative w-full h-48 rounded-lg overflow-hidden" style={{ 
          backgroundColor: isDark ? '#1a1a2e' : '#e8f4f8',
        }}>
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-1/3 w-full h-px bg-gray-500"></div>
            <div className="absolute top-2/3 w-full h-px bg-gray-500"></div>
            <div className="absolute left-1/3 w-px h-full bg-gray-500"></div>
            <div className="absolute left-2/3 w-px h-full bg-gray-500"></div>
          </div>

          <div className="absolute left-6 top-1/2 transform -translate-y-1/2 flex flex-col items-center">
            <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold shadow-lg">
              <MapPin className="w-3 h-3" />
            </div>
            <span className={`text-[10px] mt-1 px-1.5 py-0.5 rounded ${isDark ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-700'}`}>
              Origin
            </span>
          </div>

          <div className="absolute left-[15%] right-[15%] top-1/2 transform -translate-y-1/2 h-1 bg-gray-300 dark:bg-gray-600 rounded-full">
            <div 
              className="h-full rounded-full transition-all duration-1000"
              style={{ 
                width: `${shipment.progress}%`,
                backgroundColor: getStatusColor(shipment.status)
              }}
            />
          </div>

          <div className="absolute right-6 top-1/2 transform -translate-y-1/2 flex flex-col items-center">
            <div className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center text-white text-xs font-bold shadow-lg">
              <MapPin className="w-3 h-3" />
            </div>
            <span className={`text-[10px] mt-1 px-1.5 py-0.5 rounded ${isDark ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-700'}`}>
              Destination
            </span>
          </div>

          <div 
            className="absolute top-1/2 transform -translate-y-1/2 -translate-x-1/2 flex flex-col items-center"
            style={{ left: `${Math.max(10, Math.min(90, 10 + (shipment.progress / 100) * 80))}%` }}
          >
            <div className="absolute w-12 h-12 rounded-full border-2 border-primary/30 animate-ping" style={{ borderColor: colors.primary }}></div>
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-white dark:bg-gray-800 shadow-xl flex items-center justify-center border-2" style={{ borderColor: colors.primary }}>
                {getLocationIcon(shipment.locationType)}
              </div>
              <span className={`text-[10px] mt-1 px-2 py-0.5 rounded-full font-medium text-white whitespace-nowrap`} style={{ backgroundColor: colors.primary }}>
                {shipment.status}
              </span>
            </div>
          </div>

          <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2">
            <div className={`px-3 py-1 rounded-full text-xs ${isDark ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-700'} shadow-md flex items-center gap-2`}>
              {getLocationIcon(shipment.locationType)}
              <span>{shipment.currentLocation}</span>
            </div>
          </div>

          <div className="absolute top-3 right-3">
            <div className={`px-2 py-1 rounded-lg text-xs font-bold ${isDark ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'} shadow-md`}>
              {shipment.progress}% Complete
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-3">
          <div className={`p-2 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Origin</p>
            <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{shipment.origin}</p>
          </div>
          <div className={`p-2 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Current Location</p>
            <div className="flex items-center gap-1">
              {getLocationIcon(shipment.locationType)}
              <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{shipment.currentLocation}</p>
            </div>
          </div>
          <div className={`p-2 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Destination</p>
            <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{shipment.destination}</p>
          </div>
        </div>

        <div className="mt-3 flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full animate-pulse`} style={{ backgroundColor: getStatusColor(shipment.status) }}></div>
          <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            {shipment.locationType === 'sea' && 'Vessel is currently at sea'}
            {shipment.locationType === 'bond' && 'Goods are in customs bond'}
            {shipment.locationType === 'warehouse' && 'Goods are in warehouse'}
            {shipment.locationType === 'port' && 'At port awaiting clearance'}
            {shipment.locationType === 'customs' && 'Under customs clearance'}
            {shipment.locationType === 'truck' && 'In transit via road'}
          </span>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: isDark ? '#1a1a2e' : '#f8fafc' }}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto" style={{ borderColor: colors.primary }}></div>
          <p className={`mt-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Loading shipment details...</p>
        </div>
      </div>
    );
  }

  if (!shipment) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: isDark ? '#1a1a2e' : '#f8fafc' }}>
        <div className="text-center">
          <Package className="w-16 h-16 mx-auto mb-4 opacity-50" style={{ color: isDark ? '#4b5563' : '#9ca3af' }} />
          <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Shipment not found</h2>
          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>The shipment you're looking for doesn't exist</p>
          <button
            onClick={() => navigate('/importer-shipments')}
            className="mt-4 px-6 py-2 rounded-lg text-white font-medium transition-all duration-200 hover:shadow-lg"
            style={{ backgroundColor: colors.primary }}
          >
            <ArrowLeft className="w-4 h-4 inline mr-2" />
            Back to Shipments
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full p-4 md:p-6" style={{ backgroundColor: isDark ? '#1a1a2e' : '#f8fafc' }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/importer-shipments')}
              className={`p-2 rounded-lg transition-colors ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
            >
              <ArrowLeft className="w-5 h-5" style={{ color: colors.primary }} />
            </button>
            <div>
              <h1 className={`text-2xl md:text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Shipment {shipment.id}
              </h1>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                {shipment.origin} → {shipment.destination}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span 
              className="text-sm font-medium px-4 py-2 rounded-full flex items-center gap-2"
              style={getStatusBadge(shipment.status)}
            >
              {shipment.statusIcon} {shipment.status}
            </span>
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

        {/* Mini Map */}
        <div className="mb-6">
          <MiniMap shipment={shipment} />
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white shadow-sm'}`}>
            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Items</p>
            <p className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{shipment.items}</p>
          </div>
          <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white shadow-sm'}`}>
            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Weight</p>
            <p className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{shipment.weight}</p>
          </div>
          <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white shadow-sm'}`}>
            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Container</p>
            <p className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{shipment.container}</p>
          </div>
          <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white shadow-sm'}`}>
            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>ETA</p>
            <p className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{shipment.eta}</p>
          </div>
        </div>

        {/* Progress Section */}
        <div className={`rounded-lg p-6 mb-6 ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-md'}`}>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex-1">
              <div className="flex justify-between items-center mb-2">
                <span className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Shipment Progress
                </span>
                <span className={`text-sm font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {shipment.progress}%
                </span>
              </div>
              <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full rounded-full transition-all duration-1000"
                  style={{ 
                    width: `${shipment.progress}%`,
                    backgroundColor: getStatusColor(shipment.status)
                  }}
                />
              </div>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" style={{ color: colors.primary }} />
                <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>{shipment.currentLocation}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" style={{ color: colors.primary }} />
                <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>ETA: {shipment.eta}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - 2/3 */}
          <div className="lg:col-span-2 space-y-6">
            {/* Containers Section */}
            <div className={`rounded-lg p-6 ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-md'}`}>
              <h3 className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Containers
              </h3>
              {shipment.containers.map((container, idx) => (
                <div key={idx} className={`p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'} ${idx > 0 ? 'mt-4' : ''}`}>
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <Anchor className="w-5 h-5" style={{ color: colors.primary }} />
                      <div>
                        <h4 className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          {container.id}
                        </h4>
                        <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                          Voyage: {container.voyage}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-3">
                      <span 
                        className="text-xs font-medium px-3 py-1 rounded-full"
                        style={getStatusBadge(container.status)}
                      >
                        {container.status}
                      </span>
                      <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        <Clock className="w-3 h-3 inline mr-1" />
                        {container.daysAtSea} days at sea
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                    <div>
                      <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Location</p>
                      <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{container.location}</p>
                    </div>
                    <div>
                      <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Next Port</p>
                      <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{container.nextPort}</p>
                    </div>
                    <div>
                      <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Distance Remaining</p>
                      <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{container.distanceRemaining}</p>
                    </div>
                  </div>

                  <div className="mt-3 pt-3 border-t" style={{ borderColor: isDark ? '#4b5563' : '#e5e7eb' }}>
                    <p className={`text-sm font-medium mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      Items in Container ({container.items.length} types)
                    </p>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead className={`${isDark ? 'bg-gray-800' : 'bg-gray-100'}`}>
                          <tr>
                            <th className={`px-3 py-2 text-left ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Item Name</th>
                            <th className={`px-3 py-2 text-left ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Quantity</th>
                            <th className={`px-3 py-2 text-left ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Weight</th>
                          </tr>
                        </thead>
                        <tbody>
                          {container.items.map((item, itemIdx) => (
                            <tr key={itemIdx} className={`border-t ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                              <td className={`px-3 py-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{item.name}</td>
                              <td className={`px-3 py-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{item.quantity}</td>
                              <td className={`px-3 py-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{item.weight}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Shipment Timeline */}
            <div className={`rounded-lg p-6 ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-md'}`}>
              <h3 className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Shipment Timeline
              </h3>
              <div className="space-y-3">
                {shipment.milestones.map((milestone, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="relative flex items-center justify-center w-6">
                      {milestone.completed ? (
                        <CheckCircle className="w-4 h-4" style={{ color: colors.success }} />
                      ) : (
                        <Clock className="w-4 h-4" style={{ color: colors.warning }} />
                      )}
                      {index < shipment.milestones.length - 1 && (
                        <div className={`absolute top-6 w-0.5 h-4 ${
                          milestone.completed ? 'bg-green-500' : 'bg-gray-300'
                        }`}></div>
                      )}
                    </div>
                    <div className="flex-1">
                      <p className={`text-sm ${milestone.completed ? 'line-through' : ''} ${
                        isDark ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        {milestone.stage}
                      </p>
                      <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                        {milestone.date}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - 1/3 */}
          <div className="space-y-6">
            {/* Documents Section - Using DocumentViewer */}
            <div className={`rounded-lg p-6 ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-md'}`}>
              <DocumentViewer 
                documents={shipment.documents || []}
                title="Shipment Documents"
                backPath="/importer-shipments"
                shipmentId={shipment.id}
              />
            </div>

            {/* Quick Actions */}
            <div className={`rounded-lg p-6 ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-md'}`}>
              <h3 className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Quick Actions
              </h3>
              <div className="space-y-2">
                <button 
                  onClick={() => setShowDocuments(!showDocuments)}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200" 
                  style={{ backgroundColor: colors.primaryBg, color: colors.primary }}
                >
                  <FileText className="w-4 h-4" />
                  <span className="text-sm font-medium">View All Documents</span>
                </button>
                <button className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}`}>
                  <Download className="w-4 h-4" style={{ color: colors.primary }} />
                  <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Export Report</span>
                </button>
                <button className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}`}>
                  <Share2 className="w-4 h-4" style={{ color: colors.primary }} />
                  <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Share Shipment</span>
                </button>
              </div>
            </div>

            {/* Shipment Info */}
            <div className={`rounded-lg p-6 ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-md'}`}>
              <h3 className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Shipment Info
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Created</span>
                  <span className={isDark ? 'text-white' : 'text-gray-900'}>{new Date(shipment.createdDate).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Last Updated</span>
                  <span className={isDark ? 'text-white' : 'text-gray-900'}>{shipment.lastUpdate}</span>
                </div>
                <div className="flex justify-between">
                  <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Status</span>
                  <span className={`font-medium`} style={{ color: getStatusColor(shipment.status) }}>
                    {shipment.status}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Container</span>
                  <span className={isDark ? 'text-white' : 'text-gray-900'}>{shipment.container}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImporterShipmentDetails;