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
  Building,
  User,
  Send,
  Share2,
  Printer,
  Info
} from 'lucide-react';
import { ThemeContext } from '../../context/themeContext';
import { useNavigate, useParams } from 'react-router-dom';

const ExporterShipmentDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { darkMode } = useContext(ThemeContext);
  const [shipment, setShipment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
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
    teal: '#14b8a6',
    indigo: '#6366f1',
    orange: '#f97316',
    pink: '#ec4899'
  };

  const isDark = darkMode

  // This data matches the ExporterShipments data structure
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
      locationType: 'sea',
      items: [
        { name: 'Electronics Components', quantity: 450, weight: '2.5 tons', value: '210,937,500 UGX', hsCode: '8542.31', description: 'High-quality electronics components', manufacturer: 'TechImport Ltd', countryOfOrigin: 'Uganda', unitPrice: '468,750 UGX', totalValue: '210,937,500 UGX' },
        { name: 'Circuit Boards', quantity: 1200, weight: '1.8 tons', value: '225,000,000 UGX', hsCode: '8534.00', description: 'Printed circuit boards', manufacturer: 'TechImport Ltd', countryOfOrigin: 'Uganda', unitPrice: '187,500 UGX', totalValue: '225,000,000 UGX' },
        { name: 'Power Supplies', quantity: 850, weight: '2.2 tons', value: '199,218,750 UGX', hsCode: '8504.40', description: 'Power supply units', manufacturer: 'TechImport Ltd', countryOfOrigin: 'Uganda', unitPrice: '234,375 UGX', totalValue: '199,218,750 UGX' }
      ],
      milestones: [
        { stage: 'Export Documentation', date: '20 Jul 2026', completed: true, description: 'All export documents completed and verified' },
        { stage: 'Container Loaded', date: '25 Jul 2026', completed: true, description: 'Containers loaded onto vessel' },
        { stage: 'Vessel Departed', date: '26 Jul 2026', completed: true, description: 'Vessel departed from port of origin' },
        { stage: 'In Transit', date: '27 Jul 2026', completed: true, description: 'Shipment is in transit to destination' },
        { stage: 'Arrived at Port', date: '12 Aug 2026', completed: false, description: 'Estimated arrival at destination port' },
        { stage: 'Customs Clearance', date: '13 Aug 2026', completed: false, description: 'Customs clearance process' },
        { stage: 'Delivery', date: '15 Aug 2026', completed: false, description: 'Final delivery to importer' }
      ],
      documents: [
        { name: 'Commercial Invoice', status: 'completed', date: '12 Jul 2026', number: 'INV-2026-001' },
        { name: 'Packing List', status: 'completed', date: '10 Jul 2026', number: 'PL-2026-001' },
        { name: 'Bill of Lading', status: 'pending', date: '15 Jul 2026', number: 'BOL-2026-001' },
        { name: 'Certificate of Origin', status: 'completed', date: '30 Jul 2026', number: 'CO-2026-001' },
        { name: 'Sales Contract', status: 'completed', date: '14 Jul 2026', number: 'SC-2026-001' },
        { name: 'UNBS CoC', status: 'pending', date: '25 Jul 2026', number: 'COC-2026-001' },
        { name: 'UNBS PVoC', status: 'pending', date: '28 Jul 2026', number: 'PVoC-2026-001' },
        { name: 'Proof of Payment', status: 'received', date: '20 Jul 2026', number: 'POP-2026-001' }
      ],
      tracking: [
        { location: 'Kampala, Uganda', date: '25 Jul 2026', status: 'Loaded', description: 'Container loaded onto vessel' },
        { location: 'Indian Ocean', date: '28 Jul 2026', status: 'In Transit', description: 'Crossing Indian Ocean' },
        { location: 'Indian Ocean', date: '05 Aug 2026', status: 'In Transit', description: 'Mid-ocean transit' },
        { location: 'Port of Mombasa', date: '12 Aug 2026', status: 'Expected', description: 'Expected arrival at port' }
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
      locationType: 'air',
      items: [
        { name: 'Textile Fabrics', quantity: 320, weight: '4.5 tons', value: '325,000,000 UGX', hsCode: '5208.11', description: 'High-quality textile fabrics', manufacturer: 'Textile World Ltd', countryOfOrigin: 'Uganda', unitPrice: '1,015,625 UGX', totalValue: '325,000,000 UGX' }
      ],
      milestones: [
        { stage: 'Export Documentation', date: '22 Jul 2026', completed: true, description: 'All export documents completed and verified' },
        { stage: 'Container Loaded', date: '29 Jul 2026', completed: true, description: 'Containers loaded onto vessel' },
        { stage: 'In Transit', date: '29 Jul 2026', completed: true, description: 'Shipment is in transit to destination' },
        { stage: 'Arrived at Destination', date: '18 Aug 2026', completed: false, description: 'Estimated arrival at destination' },
        { stage: 'Delivery', date: '19 Aug 2026', completed: false, description: 'Final delivery to importer' }
      ],
      documents: [
        { name: 'Commercial Invoice', status: 'completed', date: '12 Jul 2026', number: 'INV-2026-002' },
        { name: 'Packing List', status: 'completed', date: '10 Jul 2026', number: 'PL-2026-002' },
        { name: 'Bill of Lading', status: 'pending', date: '15 Jul 2026', number: 'BOL-2026-002' },
        { name: 'Certificate of Origin', status: 'completed', date: '30 Jul 2026', number: 'CO-2026-002' }
      ],
      tracking: [
        { location: 'Entebbe, Uganda', date: '29 Jul 2026', status: 'Loaded', description: 'Container loaded onto vessel' },
        { location: 'Nairobi, Kenya', date: '18 Aug 2026', status: 'Expected', description: 'Expected arrival at destination' }
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
      locationType: 'warehouse',
      items: [
        { name: 'Electronics Components', quantity: 150, weight: '2.5 tons', value: '187,500,000 UGX', hsCode: '8542.31', description: 'High-quality electronics components', manufacturer: 'TechImport Ltd', countryOfOrigin: 'Uganda', unitPrice: '1,250,000 UGX', totalValue: '187,500,000 UGX' }
      ],
      milestones: [
        { stage: 'Export Documentation', date: '08 Aug 2026', completed: true, description: 'All export documents completed and verified' },
        { stage: 'Container Loaded', date: '12 Aug 2026', completed: true, description: 'Containers loaded onto vessel' },
        { stage: 'In Transit', date: '13 Aug 2026', completed: true, description: 'Shipment is in transit to destination' },
        { stage: 'Arrived at Destination', date: '18 Aug 2026', completed: true, description: 'Arrived at destination' },
        { stage: 'Delivery', date: '18 Aug 2026', completed: true, description: 'Final delivery completed' }
      ],
      documents: [
        { name: 'Commercial Invoice', status: 'completed', date: '12 Jul 2026', number: 'INV-2026-003' },
        { name: 'Packing List', status: 'completed', date: '10 Jul 2026', number: 'PL-2026-003' }
      ],
      tracking: [
        { location: 'Kampala, Uganda', date: '12 Aug 2026', status: 'Loaded', description: 'Container loaded onto truck' },
        { location: 'Kigali, Rwanda', date: '18 Aug 2026', status: 'Delivered', description: 'Delivered to destination' }
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
      locationType: 'bond',
      items: [
        { name: 'Industrial Machinery', quantity: 120, weight: '8.2 tons', value: '1,200,000,000 UGX', hsCode: '8479.89', description: 'Industrial machinery equipment', manufacturer: 'Machinery Corp', countryOfOrigin: 'Uganda', unitPrice: '10,000,000 UGX', totalValue: '1,200,000,000 UGX' },
        { name: 'Spare Parts', quantity: 480, weight: '2.3 tons', value: '230,000,000 UGX', hsCode: '8483.10', description: 'Spare parts for machinery', manufacturer: 'Machinery Corp', countryOfOrigin: 'Uganda', unitPrice: '479,167 UGX', totalValue: '230,000,000 UGX' }
      ],
      milestones: [
        { stage: 'Export Documentation', date: '28 Aug 2026', completed: true, description: 'All export documents completed and verified' },
        { stage: 'Container Loaded', date: '05 Sep 2026', completed: true, description: 'Containers loaded onto vessel' },
        { stage: 'Vessel Departed', date: '06 Sep 2026', completed: true, description: 'Vessel departed from port of origin' },
        { stage: 'Arrived at Port', date: '20 Sep 2026', completed: true, description: 'Arrived at destination port' },
        { stage: 'Customs Clearance', date: '22 Sep 2026', completed: false, description: 'Customs clearance process' },
        { stage: 'Delivery', date: '25 Sep 2026', completed: false, description: 'Final delivery to importer' }
      ],
      documents: [
        { name: 'Commercial Invoice', status: 'completed', date: '12 Jul 2026', number: 'INV-2026-004' },
        { name: 'Packing List', status: 'completed', date: '10 Jul 2026', number: 'PL-2026-004' },
        { name: 'Bill of Lading', status: 'received', date: '15 Jul 2026', number: 'BOL-2026-004' }
      ],
      tracking: [
        { location: 'Kampala, Uganda', date: '05 Sep 2026', status: 'Loaded', description: 'Container loaded onto vessel' },
        { location: 'Indian Ocean', date: '15 Sep 2026', status: 'In Transit', description: 'Crossing Indian Ocean' },
        { location: 'Port of Mombasa', date: '20 Sep 2026', status: 'Arrived', description: 'Arrived at port' },
        { location: 'Mombasa Port - Customs Bond', date: '22 Sep 2026', status: 'Customs', description: 'Under customs clearance' }
      ]
    }
  ];

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      const data = shipmentsData.find(s => s.id === id);
      if (data) {
        setShipment(data);
      } else {
        navigate('/exporter-shipments');
      }
      setLoading(false);
    }, 300);
  }, [id, navigate]);

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

  const getDocumentStatusIcon = (status) => {
    if (status === 'completed') return <CheckCircle className="w-4 h-4 text-green-500" />;
    if (status === 'pending') return <Clock className="w-4 h-4 text-yellow-500" />;
    if (status === 'received') return <CheckCircle className="w-4 h-4 text-teal-500" />;
    return <AlertCircle className="w-4 h-4 text-red-500" />;
  };

  const getProgressColor = (progress) => {
    if (progress === 100) return colors.success;
    if (progress >= 70) return colors.primary;
    if (progress >= 40) return colors.warning;
    return colors.danger;
  };

  // Get location icon based on type
  const getLocationIcon = (type) => {
    switch(type) {
      case 'sea':
        return <Ship className="w-6 h-6 text-blue-500" />;
      case 'bond':
        return <Shield className="w-6 h-6 text-yellow-500" />;
      case 'warehouse':
        return <Package className="w-6 h-6 text-green-500" />;
      case 'port':
        return <Anchor className="w-6 h-6 text-purple-500" />;
      case 'customs':
        return <FileCheck className="w-6 h-6 text-orange-500" />;
      case 'truck':
        return <Truck className="w-6 h-6 text-blue-500" />;
      case 'air':
        return <Plane className="w-6 h-6 text-indigo-500" />;
      default:
        return <MapPin className="w-6 h-6 text-gray-500" />;
    }
  };

  // Mini Map Component
  const MiniMap = ({ shipment }) => {
    if (!shipment) return null;

    const progressColor = getProgressColor(shipment.progress);
    
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

        {/* Map Visualization */}
        <div className="relative w-full h-48 rounded-lg overflow-hidden" style={{ 
          backgroundColor: isDark ? '#1a1a2e' : '#e8f4f8',
          backgroundImage: isDark ? 
            'radial-gradient(circle at 20% 50%, rgba(26, 26, 46, 0.8), rgba(26, 26, 46, 1))' :
            'radial-gradient(circle at 20% 50%, rgba(232, 244, 248, 0.8), rgba(232, 244, 248, 1))'
        }}>
          {/* Grid lines - Map background */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-1/3 w-full h-px bg-gray-500"></div>
            <div className="absolute top-2/3 w-full h-px bg-gray-500"></div>
            <div className="absolute left-1/3 w-px h-full bg-gray-500"></div>
            <div className="absolute left-2/3 w-px h-full bg-gray-500"></div>
          </div>

          {/* Origin Marker */}
          <div className="absolute left-6 top-1/2 transform -translate-y-1/2 flex flex-col items-center">
            <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold shadow-lg">
              <MapPin className="w-3 h-3" />
            </div>
            <span className={`text-[10px] mt-1 px-1.5 py-0.5 rounded ${isDark ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-700'}`}>
              Origin
            </span>
          </div>

          {/* Route Line with Progress */}
          <div className="absolute left-[15%] right-[15%] top-1/2 transform -translate-y-1/2 h-1.5 bg-gray-300 dark:bg-gray-600 rounded-full overflow-hidden">
            <div 
              className="h-full rounded-full transition-all duration-1000"
              style={{ 
                width: `${shipment.progress}%`,
                backgroundColor: progressColor
              }}
            />
          </div>

          {/* Destination Marker */}
          <div className="absolute right-6 top-1/2 transform -translate-y-1/2 flex flex-col items-center">
            <div className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center text-white text-xs font-bold shadow-lg">
              <MapPin className="w-3 h-3" />
            </div>
            <span className={`text-[10px] mt-1 px-1.5 py-0.5 rounded ${isDark ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-700'}`}>
              Destination
            </span>
          </div>

          {/* Current Location Marker */}
          <div 
            className="absolute top-1/2 transform -translate-y-1/2 -translate-x-1/2 flex flex-col items-center"
            style={{ left: `${Math.max(10, Math.min(90, 10 + (shipment.progress / 100) * 80))}%` }}
          >
            {/* Pulsing ring */}
            <div className="absolute w-12 h-12 rounded-full border-2 border-primary/30 animate-ping" style={{ borderColor: colors.primary }}></div>
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-white dark:bg-gray-800 shadow-xl flex items-center justify-center border-2" style={{ borderColor: colors.primary }}>
                {getLocationIcon(shipment.locationType || 'sea')}
              </div>
              <span className={`text-[10px] mt-1 px-2 py-0.5 rounded-full font-medium text-white whitespace-nowrap`} style={{ backgroundColor: colors.primary }}>
                {shipment.status}
              </span>
            </div>
          </div>

          {/* Progress percentage on map */}
          <div className="absolute top-3 right-3">
            <div className={`px-2 py-1 rounded-lg text-xs font-bold ${isDark ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'} shadow-md`}>
              {shipment.progress}% Complete
            </div>
          </div>

          {/* Location Type Label */}
          <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2">
            <div className={`px-3 py-1 rounded-full text-xs ${isDark ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-700'} shadow-md flex items-center gap-2`}>
              {getLocationIcon(shipment.locationType || 'sea')}
              <span>{shipment.location}</span>
            </div>
          </div>
        </div>

        {/* Location Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-3">
          <div className={`p-2 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Origin</p>
            <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{shipment.origin}</p>
          </div>
          <div className={`p-2 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Current Location</p>
            <div className="flex items-center gap-1">
              {getLocationIcon(shipment.locationType || 'sea')}
              <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{shipment.location}</p>
            </div>
          </div>
          <div className={`p-2 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Destination</p>
            <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{shipment.destination}</p>
          </div>
        </div>

        {/* Status indicator */}
        <div className="mt-3 flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full animate-pulse`} style={{ backgroundColor: progressColor }}></div>
          <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            {shipment.locationType === 'sea' && 'Vessel is currently at sea'}
            {shipment.locationType === 'bond' && 'Goods are in customs bond'}
            {shipment.locationType === 'warehouse' && 'Goods are in warehouse'}
            {shipment.locationType === 'port' && 'At port awaiting clearance'}
            {shipment.locationType === 'customs' && 'Under customs clearance'}
            {shipment.locationType === 'truck' && 'In transit via road'}
            {shipment.locationType === 'air' && 'In transit via air'}
            {!shipment.locationType && `Shipment is ${shipment.status.toLowerCase()}`}
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
          <button
            onClick={() => navigate('/exporter-shipments')}
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

  const statusStyle = getStatusBadge(shipment.status);
  const StatusIcon = statusStyle.icon;
  const progressColor = getProgressColor(shipment.progress);

  return (
    <div className="min-h-screen w-full p-4 md:p-6" style={{ backgroundColor: isDark ? '#1a1a2e' : '#f8fafc' }}>
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm mb-4">
          <button
            onClick={() => navigate('/exporter-shipments')}
            className={`flex items-center gap-1 hover:underline ${isDark ? 'text-gray-400' : 'text-gray-500'}`}
          >
            <Home className="w-4 h-4" />
            Shipments
          </button>
          <ChevronRight className={`w-4 h-4 ${isDark ? 'text-gray-600' : 'text-gray-400'}`} />
          <span className={isDark ? 'text-white' : 'text-gray-900'}>Shipment Details</span>
        </div>

        {/* Header */}
        <div className={`rounded-lg p-6 mb-6 ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-md'}`}>
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg flex-shrink-0" style={{ backgroundColor: colors.primaryBg }}>
                <Package className="w-8 h-8" style={{ color: colors.primary }} />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {shipment.id}
                  </h1>
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
                </div>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  Vessel: {shipment.vessel} • Voyage: {shipment.voyage}
                </p>
                <div className="flex flex-wrap items-center gap-4 mt-2">
                  <span className={`text-xs flex items-center gap-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    <Building className="w-3 h-3" />
                    {shipment.importer}
                  </span>
                  <span className={`text-xs flex items-center gap-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    <MapPin className="w-3 h-3" />
                    {shipment.destination}
                  </span>
                  <span className={`text-xs flex items-center gap-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    <Clock className="w-3 h-3" />
                    ETA: {shipment.eta}
                  </span>
                </div>
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
                onClick={() => navigate('/exporter-shipments')}
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
            <p className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{shipment.weight}</p>
          </div>
          <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-md'}`}>
            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Volume</p>
            <p className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{shipment.volume}</p>
          </div>
          <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-md'}`}>
            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Items</p>
            <p className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{shipment.itemCount}</p>
          </div>
          <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-md'}`}>
            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Total Value</p>
            <p className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{shipment.value}</p>
          </div>
        </div>

        {/* Mini Map Component */}
        <div className="mb-6">
          <MiniMap shipment={shipment} />
        </div>

        {/* Progress Bar */}
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
              <div className="w-full h-3 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
                <div 
                  className="h-full rounded-full transition-all duration-1000"
                  style={{ 
                    width: `${shipment.progress}%`,
                    backgroundColor: progressColor
                  }}
                />
              </div>
              <div className="flex justify-between mt-2 text-xs">
                <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>
                  <CheckCircle className="w-3 h-3 inline mr-1 text-green-500" />
                  Started: {shipment.etd}
                </span>
                <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>
                  <Clock className="w-3 h-3 inline mr-1 text-yellow-500" />
                  ETA: {shipment.eta}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-4 text-sm md:border-l md:pl-4" style={{ borderColor: isDark ? '#4b5563' : '#e5e7eb' }}>
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full animate-pulse`} style={{ backgroundColor: progressColor }}></div>
                <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>{shipment.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" style={{ color: colors.primary }} />
                <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>ETA: {shipment.eta}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className={`rounded-lg ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-md'}`}>
          <div className="flex border-b overflow-x-auto" style={{ borderColor: isDark ? '#374151' : '#e5e7eb' }}>
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-4 py-3 text-sm font-medium transition-all duration-200 border-b-2 whitespace-nowrap ${
                activeTab === 'overview'
                  ? 'border-primary text-primary'
                  : isDark ? 'border-transparent text-gray-400 hover:text-white' : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
              style={{ borderColor: activeTab === 'overview' ? colors.primary : 'transparent' }}
            >
              <Info className="w-4 h-4 inline mr-2" />
              Overview
            </button>
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
              Items ({shipment.items ? shipment.items.length : 0})
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
              Documents ({shipment.documents ? shipment.documents.length : 0})
            </button>
            <button
              onClick={() => setActiveTab('importer')}
              className={`px-4 py-3 text-sm font-medium transition-all duration-200 border-b-2 whitespace-nowrap ${
                activeTab === 'importer'
                  ? 'border-primary text-primary'
                  : isDark ? 'border-transparent text-gray-400 hover:text-white' : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
              style={{ borderColor: activeTab === 'importer' ? colors.primary : 'transparent' }}
            >
              <Building className="w-4 h-4 inline mr-2" />
              Importer Details
            </button>
          </div>

          <div className="p-6">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Shipment Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className={`text-sm font-medium mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      Shipment Information
                    </h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Status</span>
                        <span className={`text-xs font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{shipment.status}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Type</span>
                        <span className={`text-xs font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{shipment.type}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Vessel</span>
                        <span className={`text-xs font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{shipment.vessel}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Voyage</span>
                        <span className={`text-xs font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{shipment.voyage}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Origin</span>
                        <span className={`text-xs font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{shipment.origin}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Destination</span>
                        <span className={`text-xs font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{shipment.destination}</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className={`text-sm font-medium mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      Container Details
                    </h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Containers</span>
                        <span className={`text-xs font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{shipment.containers}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Last Update</span>
                        <span className={`text-xs font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{shipment.lastUpdate}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Items Tab */}
            {activeTab === 'items' && shipment.items && (
              <div className="space-y-4">
                {shipment.items.map((item, idx) => {
                  const isExpanded = expandedItem === idx;
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
                          <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                            {item.totalValue || item.value}
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
                              <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{item.hsCode || 'N/A'}</p>
                            </div>
                            <div>
                              <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Unit Price</p>
                              <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{item.unitPrice || 'N/A'}</p>
                            </div>
                            <div className="md:col-span-2">
                              <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Description</p>
                              <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{item.description || 'N/A'}</p>
                            </div>
                            <div>
                              <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Manufacturer</p>
                              <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{item.manufacturer || 'N/A'}</p>
                            </div>
                            <div>
                              <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Country of Origin</p>
                              <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{item.countryOfOrigin || 'N/A'}</p>
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
            {activeTab === 'tracking' && shipment.tracking && (
              <div className="space-y-4">
                {shipment.tracking.map((track, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="relative flex items-center justify-center w-6">
                      {track.status === 'Loaded' && <CheckCircle className="w-4 h-4 text-green-500" />}
                      {track.status === 'In Transit' && <Navigation className="w-4 h-4 text-blue-500" />}
                      {track.status === 'Arrived' && <CheckCircle className="w-4 h-4 text-green-500" />}
                      {track.status === 'Expected' && <Clock className="w-4 h-4 text-yellow-500" />}
                      {track.status === 'Delivered' && <CheckCircle className="w-4 h-4 text-green-500" />}
                      {track.status === 'Customs' && <Shield className="w-4 h-4 text-orange-500" />}
                      {idx < shipment.tracking.length - 1 && (
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
            {activeTab === 'milestones' && shipment.milestones && (
              <div className="space-y-4">
                {shipment.milestones.map((milestone, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="relative flex items-center justify-center w-6">
                      {milestone.completed ? (
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      ) : (
                        <Clock className="w-4 h-4 text-yellow-500" />
                      )}
                      {idx < shipment.milestones.length - 1 && (
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
                      {milestone.description && (
                        <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                          {milestone.description}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Documents Tab */}
            {activeTab === 'documents' && shipment.documents && (
              <div className="space-y-3">
                {shipment.documents.map((doc, idx) => (
                  <div key={idx} className={`flex items-center justify-between p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                    <div className="flex items-center gap-3">
                      {getDocumentStatusIcon(doc.status)}
                      <div>
                        <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{doc.name}</p>
                        <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                          {doc.number || 'N/A'} • {doc.date || 'N/A'}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        doc.status === 'completed' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                        doc.status === 'received' ? 'bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400' :
                        doc.status === 'pending' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' :
                        'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                      }`}>
                        {doc.status}
                      </span>
                      <button className="p-1.5 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                        <Eye className="w-4 h-4 text-gray-400" />
                      </button>
                      <button className="p-1.5 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                        <Download className="w-4 h-4 text-gray-400" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Importer Details Tab */}
            {activeTab === 'importer' && (
              <div className="space-y-4">
                <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                  <h3 className={`text-sm font-medium mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    <Building className="w-4 h-4 inline mr-2" />
                    Importer Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Company Name</p>
                      <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{shipment.importer}</p>
                    </div>
                    <div>
                      <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Contact Person</p>
                      <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{shipment.importerContact}</p>
                    </div>
                    <div>
                      <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Email</p>
                      <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{shipment.importerEmail}</p>
                    </div>
                    <div>
                      <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Phone</p>
                      <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{shipment.importerPhone}</p>
                    </div>
                    <div>
                      <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Country</p>
                      <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{shipment.importerCountry}</p>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-2 pt-2">
                  <button
                    className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:shadow-md"
                    style={{
                      backgroundColor: colors.primary,
                      color: 'white'
                    }}
                  >
                    <Send className="w-4 h-4" />
                    Contact Importer
                  </button>
                  <button
                    className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
                    style={{
                      backgroundColor: colors.primaryBg,
                      color: colors.primary
                    }}
                  >
                    <User className="w-4 h-4" />
                    View Profile
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExporterShipmentDetails;