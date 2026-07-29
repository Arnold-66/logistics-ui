import React, { useState, useContext, useEffect } from 'react';
import {
  Container,
  Package,
  MapPin,
  Calendar,
  Clock,
  Eye,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Navigation,
  Anchor,
  Ship,
  Truck,
  Box,
  FileText,
  CheckCircle,
  AlertCircle,
  X,
  ArrowLeft,
  Home,
  Download,
  Share2,
  Map,
  Globe,
  Flag,
  Users,
  Weight,
  Ruler,
  Thermometer,
  Gauge,
  Zap,
  Wifi,
  Coffee,
  Utensils,
  Tv,
  Bed,
  Bath,
  Printer,
  Maximize,
  Minimize,
  ZoomIn,
  ZoomOut,
  RotateCw
} from 'lucide-react';
import { ThemeContext } from '../../context/themeContext';
import { useNavigate, useParams } from 'react-router-dom';

const ExporterContainerDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { darkMode } = useContext(ThemeContext);
  const [container, setContainer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('items');
  const [expandedItem, setExpandedItem] = useState(null);

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

  // Sample container data - in real app, fetch from API
  const containerData = {
    'MSKU-458921': {
      id: 'MSKU-458921',
      status: 'Loaded',
      type: 'Standard 20ft',
      destination: 'Port of Mombasa',
      vessel: 'MV Star Express',
      voyage: 'SE-2026-078',
      location: 'Indian Ocean',
      coordinates: { lat: -2.5, lng: 48.5 },
      eta: '12 Aug 2026 14:30',
      lastUpdate: '2 hours ago',
      weight: '12.5 tons',
      capacity: '28.2 tons',
      volume: '33.2 CBM',
      temperature: '26°C',
      humidity: '65%',
      sealNumber: 'SEAL-2026-0789',
      trackingNumber: 'TRK-2026-00458',
      items: [
        { 
          name: 'Electronics Components', 
          quantity: 450, 
          weight: '2.5 tons',
          unitPrice: '468,750 UGX',
          totalValue: '210,937,500 UGX',
          hsCode: '8542.31',
          description: 'High-quality electronics components for industrial use',
          manufacturer: 'TechImport Ltd',
          countryOfOrigin: 'China',
          status: 'In Transit'
        },
        { 
          name: 'Circuit Boards', 
          quantity: 1200, 
          weight: '1.8 tons',
          unitPrice: '187,500 UGX',
          totalValue: '225,000,000 UGX',
          hsCode: '8534.00',
          description: 'Printed circuit boards for electronic devices',
          manufacturer: 'TechImport Ltd',
          countryOfOrigin: 'China',
          status: 'In Transit'
        },
        { 
          name: 'Power Supplies', 
          quantity: 850, 
          weight: '2.2 tons',
          unitPrice: '234,375 UGX',
          totalValue: '199,218,750 UGX',
          hsCode: '8504.40',
          description: 'Power supply units for various applications',
          manufacturer: 'TechImport Ltd',
          countryOfOrigin: 'China',
          status: 'In Transit'
        }
      ],
      milestones: [
        { stage: 'Container Loaded', date: '25 Jul 2026', completed: true },
        { stage: 'Vessel Departed', date: '26 Jul 2026', completed: true },
        { stage: 'In Transit', date: '27 Jul 2026', completed: true },
        { stage: 'Arrived at Port', date: '12 Aug 2026', completed: false },
        { stage: 'Customs Clearance', date: '13 Aug 2026', completed: false },
        { stage: 'Delivery', date: '15 Aug 2026', completed: false }
      ],
      documents: [
        { name: 'Bill of Lading', number: 'BOL-2026-00458', date: '25 Jul 2026' },
        { name: 'Packing List', number: 'PL-2026-00458', date: '25 Jul 2026' },
        { name: 'Commercial Invoice', number: 'INV-2026-00458', date: '25 Jul 2026' },
        { name: 'Certificate of Origin', number: 'CO-2026-00458', date: '25 Jul 2026' }
      ],
      tracking: [
        { location: 'Shanghai Port', date: '25 Jul 2026', status: 'Loaded', description: 'Container loaded onto vessel' },
        { location: 'South China Sea', date: '28 Jul 2026', status: 'In Transit', description: 'Vessel passing through South China Sea' },
        { location: 'Indian Ocean', date: '05 Aug 2026', status: 'In Transit', description: 'Crossing Indian Ocean' },
        { location: 'Port of Mombasa', date: '12 Aug 2026', status: 'Expected', description: 'Expected arrival at port' }
      ]
    },
    'MSKU-458922': {
      id: 'MSKU-458922',
      status: 'Loaded',
      type: 'Standard 40ft',
      destination: 'Port of Mombasa',
      vessel: 'MV Star Express',
      voyage: 'SE-2026-078',
      location: 'Indian Ocean',
      coordinates: { lat: -2.3, lng: 48.7 },
      eta: '12 Aug 2026 14:30',
      lastUpdate: '3 hours ago',
      weight: '4.5 tons',
      capacity: '26.8 tons',
      volume: '67.7 CBM',
      temperature: '24°C',
      humidity: '55%',
      sealNumber: 'SEAL-2026-0790',
      trackingNumber: 'TRK-2026-00459',
      items: [
        { 
          name: 'Textile Fabrics', 
          quantity: 320, 
          weight: '4.5 tons',
          unitPrice: '168,750 UGX',
          totalValue: '54,000,000 UGX',
          hsCode: '5208.11',
          description: 'High-quality cotton textile fabrics',
          manufacturer: 'FabricWorld Inc',
          countryOfOrigin: 'China',
          status: 'In Transit'
        }
      ],
      milestones: [
        { stage: 'Container Loaded', date: '25 Jul 2026', completed: true },
        { stage: 'Vessel Departed', date: '26 Jul 2026', completed: true },
        { stage: 'In Transit', date: '27 Jul 2026', completed: true },
        { stage: 'Arrived at Port', date: '12 Aug 2026', completed: false }
      ],
      documents: [
        { name: 'Bill of Lading', number: 'BOL-2026-00459', date: '25 Jul 2026' },
        { name: 'Packing List', number: 'PL-2026-00459', date: '25 Jul 2026' }
      ],
      tracking: [
        { location: 'Shanghai Port', date: '25 Jul 2026', status: 'Loaded', description: 'Container loaded onto vessel' },
        { location: 'Indian Ocean', date: '05 Aug 2026', status: 'In Transit', description: 'Crossing Indian Ocean' }
      ]
    },
    'IN-782341': {
      id: 'IN-782341',
      status: 'Unloading',
      type: 'Standard 20ft',
      destination: 'Kampala, Uganda',
      vessel: 'MV Indian Trader',
      voyage: 'IT-2026-023',
      location: 'Mombasa Port - Customs Bond',
      coordinates: { lat: -4.05, lng: 39.67 },
      eta: '18 Aug 2026 09:00',
      lastUpdate: '3 hours ago',
      weight: '2.5 tons',
      capacity: '28.2 tons',
      volume: '33.2 CBM',
      temperature: '30°C',
      humidity: '70%',
      sealNumber: 'SEAL-2026-0791',
      trackingNumber: 'TRK-2026-00460',
      items: [
        { 
          name: 'Electronics Components', 
          quantity: 280, 
          weight: '2.5 tons',
          unitPrice: '468,750 UGX',
          totalValue: '131,250,000 UGX',
          hsCode: '8542.31',
          description: 'High-quality electronics components',
          manufacturer: 'TechImport Ltd',
          countryOfOrigin: 'India',
          status: 'In Customs'
        }
      ],
      milestones: [
        { stage: 'Container Loaded', date: '08 Aug 2026', completed: true },
        { stage: 'Vessel Departed', date: '09 Aug 2026', completed: true },
        { stage: 'Arrived at Port', date: '12 Aug 2026', completed: true },
        { stage: 'Customs Clearance', date: '18 Aug 2026', completed: false }
      ],
      documents: [
        { name: 'Bill of Lading', number: 'BOL-2026-00460', date: '08 Aug 2026' },
        { name: 'Packing List', number: 'PL-2026-00460', date: '08 Aug 2026' }
      ],
      tracking: [
        { location: 'Mumbai Port', date: '08 Aug 2026', status: 'Loaded', description: 'Container loaded onto vessel' },
        { location: 'Indian Ocean', date: '10 Aug 2026', status: 'In Transit', description: 'Crossing Indian Ocean' },
        { location: 'Mombasa Port', date: '12 Aug 2026', status: 'Arrived', description: 'Container arrived at port' }
      ]
    },
    'JP-893421': {
      id: 'JP-893421',
      status: 'Loaded',
      type: 'Standard 20ft',
      destination: 'Port of Mombasa',
      vessel: 'MV Pacific Voyager',
      voyage: 'PV-2026-045',
      location: 'Pacific Ocean',
      coordinates: { lat: 8.5, lng: 58.5 },
      eta: '28 Sep 2026 16:00',
      lastUpdate: '1 day ago',
      weight: '1.2 tons',
      capacity: '28.2 tons',
      volume: '33.2 CBM',
      temperature: '28°C',
      humidity: '60%',
      sealNumber: 'SEAL-2026-0792',
      trackingNumber: 'TRK-2026-00461',
      items: [
        { 
          name: 'Electronics Components', 
          quantity: 150, 
          weight: '1.2 tons',
          unitPrice: '468,750 UGX',
          totalValue: '70,312,500 UGX',
          hsCode: '8542.31',
          description: 'High-quality electronics components',
          manufacturer: 'TechImport Ltd',
          countryOfOrigin: 'Japan',
          status: 'In Transit'
        }
      ],
      milestones: [
        { stage: 'Container Loaded', date: '05 Sep 2026', completed: true },
        { stage: 'Vessel Departed', date: '06 Sep 2026', completed: true },
        { stage: 'In Transit', date: '07 Sep 2026', completed: true },
        { stage: 'Arrived at Port', date: '28 Sep 2026', completed: false }
      ],
      documents: [
        { name: 'Bill of Lading', number: 'BOL-2026-00461', date: '05 Sep 2026' },
        { name: 'Packing List', number: 'PL-2026-00461', date: '05 Sep 2026' }
      ],
      tracking: [
        { location: 'Tokyo Port', date: '05 Sep 2026', status: 'Loaded', description: 'Container loaded onto vessel' },
        { location: 'Pacific Ocean', date: '10 Sep 2026', status: 'In Transit', description: 'Crossing Pacific Ocean' }
      ]
    }
  };

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      const data = containerData[id];
      if (data) {
        setContainer(data);
      } else {
        navigate('/exporter-containers');
      }
      setLoading(false);
    }, 300);
  }, [id, navigate]);

  const getStatusBadge = (status) => {
    const statusMap = {
      'Loaded': { backgroundColor: colors.success + '20', color: colors.success },
      'Unloading': { backgroundColor: colors.warning + '20', color: colors.warning },
      'In Transit': { backgroundColor: colors.info + '20', color: colors.info },
      'Customs Hold': { backgroundColor: colors.danger + '20', color: colors.danger },
      'Delivered': { backgroundColor: colors.primary + '20', color: colors.primary },
      'In Customs': { backgroundColor: colors.warning + '20', color: colors.warning }
    };
    return statusMap[status] || { backgroundColor: colors.primary + '20', color: colors.primary };
  };

  const getItemStatusBadge = (status) => {
    const statusMap = {
      'In Transit': { backgroundColor: colors.info + '20', color: colors.info },
      'In Customs': { backgroundColor: colors.warning + '20', color: colors.warning },
      'Delivered': { backgroundColor: colors.success + '20', color: colors.success },
      'Pending': { backgroundColor: colors.danger + '20', color: colors.danger }
    };
    return statusMap[status] || { backgroundColor: colors.primary + '20', color: colors.primary };
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: isDark ? '#1a1a2e' : '#f8fafc' }}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto" style={{ borderColor: colors.primary }}></div>
          <p className={`mt-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Loading container details...</p>
        </div>
      </div>
    );
  }

  if (!container) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: isDark ? '#1a1a2e' : '#f8fafc' }}>
        <div className="text-center">
          <Container className="w-16 h-16 mx-auto mb-4 opacity-50" style={{ color: isDark ? '#4b5563' : '#9ca3af' }} />
          <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Container not found</h2>
          <button
            onClick={() => navigate('/exporter-containers')}
            className="mt-4 px-6 py-2 rounded-lg text-white font-medium transition-all duration-200 hover:shadow-lg"
            style={{ backgroundColor: colors.primary }}
          >
            <ArrowLeft className="w-4 h-4 inline mr-2" />
            Back to Containers
          </button>
        </div>
      </div>
    );
  }

  const statusStyle = getStatusBadge(container.status);

  return (
    <div className="min-h-screen w-full p-4 md:p-6" style={{ backgroundColor: isDark ? '#1a1a2e' : '#f8fafc' }}>
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm mb-4">
          <button
            onClick={() => navigate('/exporter-containers')}
            className={`flex items-center gap-1 hover:underline ${isDark ? 'text-gray-400' : 'text-gray-500'}`}
          >
            <Home className="w-4 h-4" />
            Containers
          </button>
          <ChevronRight className={`w-4 h-4 ${isDark ? 'text-gray-600' : 'text-gray-400'}`} />
          <span className={isDark ? 'text-white' : 'text-gray-900'}>Container Details</span>
        </div>

        {/* Header */}
        <div className={`rounded-lg p-6 mb-6 ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-md'}`}>
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg flex-shrink-0" style={{ backgroundColor: colors.primaryBg }}>
                <Container className="w-8 h-8" style={{ color: colors.primary }} />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {container.id}
                  </h1>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full`} style={statusStyle}>
                    {container.status}
                  </span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'}`}>
                    {container.type}
                  </span>
                </div>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  Vessel: {container.vessel} • Voyage: {container.voyage}
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => window.print()}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isDark ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-600'
                }`}
              >
                <Printer className="w-4 h-4" />
                Print
              </button>
              <button
                onClick={() => navigate('/exporter-containers')}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isDark ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-600'
                }`}
              >
                <X className="w-4 h-4" />
                Close
              </button>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-md'}`}>
            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Weight</p>
            <p className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{container.weight}</p>
          </div>
          <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-md'}`}>
            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Capacity</p>
            <p className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{container.capacity}</p>
          </div>
          <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-md'}`}>
            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Items</p>
            <p className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{container.items.length}</p>
          </div>
          <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-md'}`}>
            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>ETA</p>
            <p className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{container.eta}</p>
          </div>
        </div>

        {/* Location Tracker */}
        <div className={`rounded-lg p-6 mb-6 ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-md'}`}>
          <div className="flex items-center justify-between mb-4">
            <h3 className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
              <Map className="w-4 h-4 inline mr-2" style={{ color: colors.primary }} />
              Current Location
            </h3>
            <span className={`text-xs flex items-center gap-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse inline-block"></span>
              Live Tracking
            </span>
          </div>
          <div className="relative w-full h-48 rounded-lg overflow-hidden" style={{ backgroundColor: isDark ? '#1a1a2e' : '#e8f4f8' }}>
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-1/3 w-full h-px bg-gray-500"></div>
              <div className="absolute top-2/3 w-full h-px bg-gray-500"></div>
              <div className="absolute left-1/3 w-px h-full bg-gray-500"></div>
              <div className="absolute left-2/3 w-px h-full bg-gray-500"></div>
            </div>
            <div className="absolute left-[10%] right-[10%] top-1/2 transform -translate-y-1/2 h-1 bg-gray-300 dark:bg-gray-600 rounded-full">
              <div className="h-full rounded-full" style={{ width: '70%', backgroundColor: colors.primary }}></div>
            </div>
            <div className="absolute top-1/2 left-[55%] transform -translate-y-1/2 -translate-x-1/2">
              <div className="w-10 h-10 rounded-full bg-white dark:bg-gray-800 shadow-xl flex items-center justify-center border-2" style={{ borderColor: colors.primary }}>
                <Container className="w-5 h-5" style={{ color: colors.primary }} />
              </div>
              <div className="absolute inset-0 w-10 h-10 rounded-full border-2 animate-ping" style={{ borderColor: colors.primary }}></div>
            </div>
            <div className="absolute left-[5%] top-1/2 transform -translate-y-1/2">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className={`text-[10px] mt-1 block ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Origin</span>
            </div>
            <div className="absolute right-[5%] top-1/2 transform -translate-y-1/2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <span className={`text-[10px] mt-1 block ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Destination</span>
            </div>
            <div className="absolute top-3 left-3 bg-black/70 text-white text-xs px-2 py-1 rounded">
              {container.location}
            </div>
            <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 bg-black/70 text-white text-xs px-3 py-1 rounded-full">
              ETA: {container.eta}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className={`rounded-lg ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-md'}`}>
          <div className="flex border-b overflow-x-auto" style={{ borderColor: isDark ? '#374151' : '#e5e7eb' }}>
            <button
              onClick={() => setActiveTab('items')}
              className={`px-4 py-3 text-sm font-medium transition-all duration-200 border-b-2 whitespace-nowrap ${
                activeTab === 'items'
                  ? 'border-primary text-primary'
                  : isDark ? 'border-transparent text-gray-400 hover:text-white' : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
              style={{ borderColor: activeTab === 'items' ? colors.primary : 'transparent' }}
            >
              <Package className="w-4 h-4 inline mr-2" />
              Items ({container.items.length})
            </button>
            <button
              onClick={() => setActiveTab('tracking')}
              className={`px-4 py-3 text-sm font-medium transition-all duration-200 border-b-2 whitespace-nowrap ${
                activeTab === 'tracking'
                  ? 'border-primary text-primary'
                  : isDark ? 'border-transparent text-gray-400 hover:text-white' : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
              style={{ borderColor: activeTab === 'tracking' ? colors.primary : 'transparent' }}
            >
              <Navigation className="w-4 h-4 inline mr-2" />
              Tracking
            </button>
            <button
              onClick={() => setActiveTab('milestones')}
              className={`px-4 py-3 text-sm font-medium transition-all duration-200 border-b-2 whitespace-nowrap ${
                activeTab === 'milestones'
                  ? 'border-primary text-primary'
                  : isDark ? 'border-transparent text-gray-400 hover:text-white' : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
              style={{ borderColor: activeTab === 'milestones' ? colors.primary : 'transparent' }}
            >
              <Clock className="w-4 h-4 inline mr-2" />
              Milestones
            </button>
            <button
              onClick={() => setActiveTab('documents')}
              className={`px-4 py-3 text-sm font-medium transition-all duration-200 border-b-2 whitespace-nowrap ${
                activeTab === 'documents'
                  ? 'border-primary text-primary'
                  : isDark ? 'border-transparent text-gray-400 hover:text-white' : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
              style={{ borderColor: activeTab === 'documents' ? colors.primary : 'transparent' }}
            >
              <FileText className="w-4 h-4 inline mr-2" />
              Documents
            </button>
            <button
              onClick={() => setActiveTab('details')}
              className={`px-4 py-3 text-sm font-medium transition-all duration-200 border-b-2 whitespace-nowrap ${
                activeTab === 'details'
                  ? 'border-primary text-primary'
                  : isDark ? 'border-transparent text-gray-400 hover:text-white' : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
              style={{ borderColor: activeTab === 'details' ? colors.primary : 'transparent' }}
            >
              <Info className="w-4 h-4 inline mr-2" />
              Details
            </button>
          </div>

          <div className="p-6">
            {/* Items Tab */}
            {activeTab === 'items' && (
              <div className="space-y-4">
                {container.items.map((item, idx) => {
                  const isExpanded = expandedItem === idx;
                  const itemStatus = getItemStatusBadge(item.status);

                  return (
                    <div key={idx} className={`p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                      <div 
                        className="flex flex-col md:flex-row md:items-center justify-between gap-3 cursor-pointer"
                        onClick={() => setExpandedItem(isExpanded ? null : idx)}
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-3">
                            <Package className="w-5 h-5" style={{ color: colors.primary }} />
                            <div>
                              <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{item.name}</p>
                              <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                                Qty: {item.quantity} • Weight: {item.weight}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className={`text-xs px-2 py-0.5 rounded-full`} style={itemStatus}>
                            {item.status}
                          </span>
                          <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                            {item.totalValue}
                          </span>
                          <button className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>

                      {isExpanded && (
                        <div className="mt-3 pt-3 border-t space-y-2" style={{ borderColor: isDark ? '#4b5563' : '#e5e7eb' }}>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                            <div>
                              <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>HS Code</p>
                              <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{item.hsCode}</p>
                            </div>
                            <div>
                              <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Unit Price</p>
                              <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{item.unitPrice}</p>
                            </div>
                            <div className="md:col-span-2">
                              <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Description</p>
                              <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{item.description}</p>
                            </div>
                            <div>
                              <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Manufacturer</p>
                              <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{item.manufacturer}</p>
                            </div>
                            <div>
                              <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Country of Origin</p>
                              <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{item.countryOfOrigin}</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            {/* Tracking Tab */}
            {activeTab === 'tracking' && (
              <div className="space-y-4">
                {container.tracking.map((track, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="relative flex items-center justify-center w-6">
                      {track.status === 'Loaded' && <CheckCircle className="w-4 h-4 text-green-500" />}
                      {track.status === 'In Transit' && <Navigation className="w-4 h-4 text-blue-500" />}
                      {track.status === 'Arrived' && <CheckCircle className="w-4 h-4 text-green-500" />}
                      {track.status === 'Expected' && <Clock className="w-4 h-4 text-yellow-500" />}
                      {idx < container.tracking.length - 1 && (
                        <div className="absolute top-6 w-0.5 h-6 bg-gray-300 dark:bg-gray-600"></div>
                      )}
                    </div>
                    <div className="flex-1">
                      <p className={`text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {track.location}
                      </p>
                      <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-400'}`}>
                        {track.date} • {track.status}
                      </p>
                      <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                        {track.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Milestones Tab */}
            {activeTab === 'milestones' && (
              <div className="space-y-4">
                {container.milestones.map((milestone, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="relative flex items-center justify-center w-6">
                      {milestone.completed ? (
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      ) : (
                        <Clock className="w-4 h-4 text-yellow-500" />
                      )}
                      {idx < container.milestones.length - 1 && (
                        <div className={`absolute top-6 w-0.5 h-6 ${milestone.completed ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                      )}
                    </div>
                    <div className="flex-1">
                      <p className={`text-sm ${milestone.completed ? 'line-through' : ''} ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        {milestone.stage}
                      </p>
                      <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-400'}`}>
                        {milestone.date}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Documents Tab */}
            {activeTab === 'documents' && (
              <div className="space-y-3">
                {container.documents.map((doc, idx) => (
                  <div key={idx} className={`flex items-center justify-between p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                    <div className="flex items-center gap-3">
                      <FileText className="w-4 h-4" style={{ color: colors.primary }} />
                      <div>
                        <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{doc.name}</p>
                        <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                          {doc.number} • {doc.date}
                        </p>
                      </div>
                    </div>
                    <button className="p-1.5 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                      <Eye className="w-4 h-4 text-gray-400" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Details Tab */}
            {activeTab === 'details' && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Container ID</p>
                    <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{container.id}</p>
                  </div>
                  <div>
                    <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Type</p>
                    <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{container.type}</p>
                  </div>
                  <div>
                    <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Status</p>
                    <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{container.status}</p>
                  </div>
                  <div>
                    <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Vessel</p>
                    <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{container.vessel}</p>
                  </div>
                  <div>
                    <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Voyage</p>
                    <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{container.voyage}</p>
                  </div>
                  <div>
                    <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Destination</p>
                    <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{container.destination}</p>
                  </div>
                  <div>
                    <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Weight</p>
                    <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{container.weight}</p>
                  </div>
                  <div>
                    <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Capacity</p>
                    <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{container.capacity}</p>
                  </div>
                  <div>
                    <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Volume</p>
                    <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{container.volume}</p>
                  </div>
                  <div>
                    <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Temperature</p>
                    <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{container.temperature}</p>
                  </div>
                  <div>
                    <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Humidity</p>
                    <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{container.humidity}</p>
                  </div>
                  <div>
                    <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Seal Number</p>
                    <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{container.sealNumber}</p>
                  </div>
                  <div className="md:col-span-2">
                    <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Tracking Number</p>
                    <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{container.trackingNumber}</p>
                  </div>
                  <div className="md:col-span-2">
                    <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Last Update</p>
                    <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{container.lastUpdate}</p>
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

// Info icon component
const Info = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="16" x2="12" y2="12" />
    <line x1="12" y1="8" x2="12.01" y2="8" />
  </svg>
);

export default ExporterContainerDetails;