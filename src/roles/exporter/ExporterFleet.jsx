import React, { useState, useContext, useEffect } from 'react';
import {
  Ship,
  Truck,
  Anchor,
  Package,
  MapPin,
  Calendar,
  Clock,
  Eye,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Navigation,
  Compass,
  Wind,
  Waves,
  Globe,
  Flag,
  Box,
  Container,
  Map,
  Search,
  Filter,
  X,
  Plus,
  Download,
  RefreshCw,
  MoreVertical,
  ArrowLeft,
  Home,
  Users,
  Fuel,
  Wifi,
  Coffee,
  Utensils,
  Tv,
  Bed,
  Bath,
  Zap,
  Thermometer,
  Gauge,
  Navigation2,
  Ship as ShipIcon,
  Truck as TruckIcon,
  Anchor as AnchorIcon,
  Package as PackageIcon,
  AlertCircle,
  CheckCircle,
  Clock as ClockIcon,
  ChevronLeft
} from 'lucide-react';
import { ThemeContext } from '../../context/themeContext';
import { useNavigate, useParams, Link } from 'react-router-dom';

const ExporterFleet = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { darkMode } = useContext(ThemeContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [expandedFleet, setExpandedFleet] = useState(null);
  const [selectedFleet, setSelectedFleet] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

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

  // Fleet data with container items
  const fleetData = [
    {
      id: 1,
      name: 'MV Star Express',
      type: 'ship',
      flag: '🇱🇷',
      country: 'Liberia',
      status: 'active',
      location: 'Indian Ocean',
      coordinates: { lat: -2.5, lng: 48.5 },
      speed: '18 knots',
      heading: '235°',
      destination: 'Port of Mombasa',
      eta: '12 Aug 2026 14:30',
      capacity: '500 TEU',
      containers: [
        { 
          id: 'MSKU-458921', 
          status: 'Loaded', 
          destination: 'Port of Mombasa', 
          items: 450,
          contents: [
            { name: 'Electronics Components', quantity: 450, weight: '2.5 tons' },
            { name: 'Circuit Boards', quantity: 1200, weight: '1.8 tons' },
            { name: 'Power Supplies', quantity: 850, weight: '2.2 tons' }
          ]
        },
        { 
          id: 'MSKU-458922', 
          status: 'Loaded', 
          destination: 'Port of Mombasa', 
          items: 320,
          contents: [
            { name: 'Textile Fabrics', quantity: 320, weight: '4.5 tons' },
            { name: 'Dyeing Agents', quantity: 150, weight: '0.5 tons' }
          ]
        },
        { 
          id: 'MSKU-458923', 
          status: 'In Transit', 
          destination: 'Port of Mombasa', 
          items: 280,
          contents: [
            { name: 'Industrial Parts', quantity: 280, weight: '3.2 tons' }
          ]
        }
      ],
      crew: 25,
      captain: 'Captain James Wilson',
      voyage: 'SE-2026-078',
      lastUpdate: '2 hours ago',
      nextPort: 'Port of Mombasa',
      distanceRemaining: '342 nautical miles',
      fuel: '72%',
      temperature: '26°C',
      windSpeed: '12 knots',
      waveHeight: '1.5m',
      statusIcon: '🚢',
      color: colors.primary,
      amenities: ['WiFi', 'Mess Hall', 'Gym', 'Medical Bay'],
      route: [
        { point: 'Shanghai, China', date: '25 Jul 2026', completed: true },
        { point: 'Singapore', date: '30 Jul 2026', completed: true },
        { point: 'Indian Ocean', date: '05 Aug 2026', completed: true },
        { point: 'Port of Mombasa', date: '12 Aug 2026', completed: false }
      ]
    },
    {
      id: 2,
      name: 'MV Pacific Voyager',
      type: 'ship',
      flag: '🇵🇦',
      country: 'Panama',
      status: 'active',
      location: 'Pacific Ocean',
      coordinates: { lat: 8.5, lng: 58.5 },
      speed: '12 knots',
      heading: '245°',
      destination: 'Port of Mombasa',
      eta: '28 Sep 2026 16:00',
      capacity: '350 TEU',
      containers: [
        { 
          id: 'JP-893421', 
          status: 'Loaded', 
          destination: 'Port of Mombasa', 
          items: 150,
          contents: [
            { name: 'Electronics Components', quantity: 150, weight: '1.2 tons' }
          ]
        },
        { 
          id: 'JP-893422', 
          status: 'Loaded', 
          destination: 'Port of Mombasa', 
          items: 200,
          contents: [
            { name: 'Consumer Goods', quantity: 200, weight: '2.8 tons' },
            { name: 'Packaging Materials', quantity: 500, weight: '1.5 tons' }
          ]
        }
      ],
      crew: 20,
      captain: 'Captain Maria Santos',
      voyage: 'PV-2026-045',
      lastUpdate: '1 day ago',
      nextPort: 'Port of Mombasa',
      distanceRemaining: '1,245 nautical miles',
      fuel: '58%',
      temperature: '28°C',
      windSpeed: '8 knots',
      waveHeight: '2.0m',
      statusIcon: '🚢',
      color: colors.primary,
      amenities: ['WiFi', 'Mess Hall', 'Gym'],
      route: [
        { point: 'Shanghai, China', date: '05 Sep 2026', completed: true },
        { point: 'Pacific Ocean', date: '10 Sep 2026', completed: true },
        { point: 'Indian Ocean', date: '20 Sep 2026', completed: false },
        { point: 'Port of Mombasa', date: '28 Sep 2026', completed: false }
      ]
    },
    {
      id: 3,
      name: 'MV Indian Trader',
      type: 'ship',
      flag: '🇮🇳',
      country: 'India',
      status: 'port',
      location: 'Mombasa Port - Customs Bond',
      coordinates: { lat: -4.05, lng: 39.67 },
      speed: '0 knots',
      heading: 'Docked',
      destination: 'Kampala Inland Depot',
      eta: '18 Aug 2026 09:00',
      capacity: '280 TEU',
      containers: [
        { 
          id: 'IN-782341', 
          status: 'Unloading', 
          destination: 'Kampala, Uganda', 
          items: 280,
          contents: [
            { name: 'Electronics Components', quantity: 280, weight: '2.5 tons' },
            { name: 'Circuit Boards', quantity: 800, weight: '1.2 tons' }
          ]
        },
        { 
          id: 'IN-782342', 
          status: 'Customs Hold', 
          destination: 'Kampala, Uganda', 
          items: 150,
          contents: [
            { name: 'Industrial Machinery', quantity: 150, weight: '4.5 tons' }
          ]
        }
      ],
      crew: 18,
      captain: 'Captain Raj Patel',
      voyage: 'IT-2026-023',
      lastUpdate: '3 hours ago',
      nextPort: 'Kampala Inland Depot',
      distanceRemaining: '0 - In Port',
      fuel: '45%',
      temperature: '30°C',
      windSpeed: '5 knots',
      waveHeight: '0.5m',
      statusIcon: '⚓',
      color: colors.warning,
      amenities: ['WiFi', 'Mess Hall'],
      route: [
        { point: 'Mumbai, India', date: '08 Aug 2026', completed: true },
        { point: 'Indian Ocean', date: '10 Aug 2026', completed: true },
        { point: 'Mombasa Port', date: '12 Aug 2026', completed: true },
        { point: 'Kampala, Uganda', date: '18 Aug 2026', completed: false }
      ]
    },
    {
      id: 4,
      name: 'MV African Trader',
      type: 'ship',
      flag: '🇿🇦',
      country: 'South Africa',
      status: 'completed',
      location: 'Nairobi Warehouse',
      coordinates: { lat: -1.29, lng: 36.82 },
      speed: '0 knots',
      heading: 'Completed',
      destination: 'Nairobi Distribution Center',
      eta: 'Completed',
      capacity: '320 TEU',
      containers: [
        { 
          id: 'SA-456732', 
          status: 'Delivered', 
          destination: 'Nairobi, Kenya', 
          items: 320,
          contents: [
            { name: 'Industrial Machinery', quantity: 120, weight: '10.8 tons' },
            { name: 'Spare Parts', quantity: 450, weight: '2.3 tons' }
          ]
        }
      ],
      crew: 22,
      captain: 'Captain David Mbeki',
      voyage: 'AT-2026-067',
      lastUpdate: '2 days ago',
      nextPort: 'Nairobi Distribution Center',
      distanceRemaining: 'Completed',
      fuel: '12%',
      temperature: '22°C',
      windSpeed: '0 knots',
      waveHeight: '0m',
      statusIcon: '✅',
      color: colors.success,
      amenities: ['WiFi', 'Mess Hall', 'Gym', 'Medical Bay', 'Lounge'],
      route: [
        { point: 'Durban, South Africa', date: '20 Jul 2026', completed: true },
        { point: 'Indian Ocean', date: '22 Jul 2026', completed: true },
        { point: 'Mombasa Port', date: '28 Jul 2026', completed: true },
        { point: 'Nairobi, Kenya', date: '05 Aug 2026', completed: true }
      ]
    },
    {
      id: 5,
      name: 'Truck Fleet - Unit 45',
      type: 'truck',
      flag: '🇺🇬',
      country: 'Uganda',
      status: 'transit',
      location: 'Kampala - Mombasa Road',
      coordinates: { lat: 0.5, lng: 35.5 },
      speed: '60 km/h',
      heading: '235°',
      destination: 'Port of Mombasa',
      eta: '15 Aug 2026 18:00',
      capacity: '25 tons',
      containers: [
        { 
          id: 'TR-782341', 
          status: 'In Transit', 
          destination: 'Port of Mombasa', 
          items: 120,
          contents: [
            { name: 'Fresh Produce', quantity: 120, weight: '4.5 tons' }
          ]
        }
      ],
      driver: 'John Muwonge',
      truckNumber: 'UG-2024-0789',
      lastUpdate: '1 hour ago',
      nextPort: 'Port of Mombasa',
      distanceRemaining: '450 km',
      fuel: '65%',
      temperature: '28°C',
      statusIcon: '🚛',
      color: colors.info,
      amenities: ['AC', 'GPS', 'Comms'],
      route: [
        { point: 'Kampala, Uganda', date: '13 Aug 2026', completed: true },
        { point: 'Jinja, Uganda', date: '14 Aug 2026', completed: true },
        { point: 'Tororo, Uganda', date: '15 Aug 2026', completed: false },
        { point: 'Port of Mombasa', date: '15 Aug 2026', completed: false }
      ]
    }
  ];

  // Check if we're viewing a specific fleet item
  useEffect(() => {
    if (id) {
      const item = fleetData.find(f => f.id === parseInt(id));
      if (item) {
        setSelectedFleet(item);
      } else {
        navigate('/fleet');
      }
    } else {
      setSelectedFleet(null);
    }
  }, [id, navigate]);

  // Get status badge style
  const getStatusBadge = (status) => {
    switch(status) {
      case 'active':
        return { backgroundColor: colors.success + '20', color: colors.success, label: 'Active' };
      case 'port':
        return { backgroundColor: colors.warning + '20', color: colors.warning, label: 'In Port' };
      case 'transit':
        return { backgroundColor: colors.info + '20', color: colors.info, label: 'In Transit' };
      case 'completed':
        return { backgroundColor: colors.primary + '20', color: colors.primary, label: 'Completed' };
      default:
        return { backgroundColor: colors.danger + '20', color: colors.danger, label: 'Unknown' };
    }
  };

  // Get type icon
  const getTypeIcon = (type) => {
    return type === 'ship' ? <Ship className="w-5 h-5" /> : <Truck className="w-5 h-5" />;
  };

  // Filter fleet
  const filteredFleet = fleetData.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.destination.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === 'all' || item.type === filterType;
    const matchesStatus = filterStatus === 'all' || item.status === filterStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  // Toggle expansion
  const toggleExpand = (id) => {
    if (expandedFleet === id) {
      setExpandedFleet(null);
    } else {
      setExpandedFleet(id);
    }
  };

  // Navigate to fleet details
  const viewFleetDetails = (id) => {
    navigate(`/fleet/${id}`);
  };

  // Navigate to container details
  const viewContainerDetails = (containerId) => {
    navigate(`/container/${containerId}`);
  };

  // Get flag emoji
  const getFlagEmoji = (flag) => flag || '🌍';

  // Container Contents Component
  const ContainerContents = ({ contents }) => {
    if (!contents || contents.length === 0) {
      return <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>No items in this container</p>;
    }

    return (
      <div className="mt-2 space-y-1">
        {contents.map((item, idx) => (
          <div key={idx} className={`flex items-center justify-between p-2 rounded ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
            <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{item.name}</span>
            <span className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Qty: {item.quantity} • {item.weight}
            </span>
          </div>
        ))}
      </div>
    );
  };

  // Fleet Details Page
  const FleetDetails = ({ item }) => {
    if (!item) return null;

    const statusStyle = getStatusBadge(item.status);
    const isShip = item.type === 'ship';

    return (
      <div className="space-y-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm">
          <button
            onClick={() => navigate('/fleet')}
            className={`flex items-center gap-1 hover:underline ${isDark ? 'text-gray-400' : 'text-gray-500'}`}
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Fleet
          </button>
        </div>

        {/* Header */}
        <div className={`rounded-lg p-6 ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-md'}`}>
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className={`p-3 rounded-lg flex-shrink-0 ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
                {isShip ? <Ship className="w-8 h-8" style={{ color: colors.primary }} /> : <Truck className="w-8 h-8" style={{ color: colors.primary }} />}
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {item.name}
                  </h1>
                  <span className="text-2xl">{getFlagEmoji(item.flag)}</span>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full`} style={statusStyle}>
                    {statusStyle.label}
                  </span>
                </div>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  {item.country} • {isShip ? 'Vessel' : 'Truck'} • {item.capacity}
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => navigate('/fleet')}
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
              <Eye className="w-4 h-4 inline mr-2" />
              Overview
            </button>
            <button
              onClick={() => setActiveTab('containers')}
              className={`px-4 py-3 text-sm font-medium transition-all duration-200 border-b-2 whitespace-nowrap ${
                activeTab === 'containers'
                  ? 'border-primary text-primary'
                  : isDark ? 'border-transparent text-gray-400 hover:text-white' : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
              style={{ borderColor: activeTab === 'containers' ? colors.primary : 'transparent' }}
            >
              <Container className="w-4 h-4 inline mr-2" />
              Containers ({item.containers.length})
            </button>
            <button
              onClick={() => setActiveTab('route')}
              className={`px-4 py-3 text-sm font-medium transition-all duration-200 border-b-2 whitespace-nowrap ${
                activeTab === 'route'
                  ? 'border-primary text-primary'
                  : isDark ? 'border-transparent text-gray-400 hover:text-white' : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
              style={{ borderColor: activeTab === 'route' ? colors.primary : 'transparent' }}
            >
              <Map className="w-4 h-4 inline mr-2" />
              Route
            </button>
          </div>

          <div className="p-6">
            {/* Overview Tab - Same as before */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Live Tracker */}
                <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      <Navigation className="w-4 h-4 inline mr-2" style={{ color: colors.primary }} />
                      Live Location
                    </h3>
                    <span className={`text-xs flex items-center gap-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse inline-block"></span>
                      Live
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
                      <div className="w-8 h-8 rounded-full bg-white dark:bg-gray-800 shadow-xl flex items-center justify-center border-2" style={{ borderColor: colors.primary }}>
                        {isShip ? <Ship className="w-4 h-4" style={{ color: colors.primary }} /> : <Truck className="w-4 h-4" style={{ color: colors.primary }} />}
                      </div>
                      <div className="absolute inset-0 w-8 h-8 rounded-full border-2 animate-ping" style={{ borderColor: colors.primary }}></div>
                    </div>
                    <div className="absolute left-[5%] top-1/2 transform -translate-y-1/2">
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      <span className={`text-[10px] mt-1 block ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Origin</span>
                    </div>
                    <div className="absolute right-[5%] top-1/2 transform -translate-y-1/2">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <span className={`text-[10px] mt-1 block ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Destination</span>
                    </div>
                    <div className="absolute top-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded">
                      {item.speed}
                    </div>
                    <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 bg-black/70 text-white text-xs px-3 py-1 rounded-full">
                      {item.location}
                    </div>
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className={`p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                    <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Speed</p>
                    <p className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{item.speed}</p>
                  </div>
                  <div className={`p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                    <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Heading</p>
                    <p className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{item.heading}</p>
                  </div>
                  <div className={`p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                    <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Fuel</p>
                    <p className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{item.fuel}</p>
                  </div>
                  <div className={`p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                    <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>ETA</p>
                    <p className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{item.eta}</p>
                  </div>
                </div>

                {/* Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                    <h4 className={`text-sm font-medium mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>Vessel Details</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Name</span>
                        <span className={isDark ? 'text-white' : 'text-gray-900'}>{item.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Flag</span>
                        <span className={isDark ? 'text-white' : 'text-gray-900'}>{getFlagEmoji(item.flag)} {item.country}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Type</span>
                        <span className={isDark ? 'text-white' : 'text-gray-900'}>{isShip ? 'Vessel' : 'Truck'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Capacity</span>
                        <span className={isDark ? 'text-white' : 'text-gray-900'}>{item.capacity}</span>
                      </div>
                      {isShip && (
                        <>
                          <div className="flex justify-between">
                            <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Crew</span>
                            <span className={isDark ? 'text-white' : 'text-gray-900'}>{item.crew} members</span>
                          </div>
                          <div className="flex justify-between">
                            <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Captain</span>
                            <span className={isDark ? 'text-white' : 'text-gray-900'}>{item.captain}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Voyage</span>
                            <span className={isDark ? 'text-white' : 'text-gray-900'}>{item.voyage}</span>
                          </div>
                        </>
                      )}
                      {!isShip && (
                        <>
                          <div className="flex justify-between">
                            <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Driver</span>
                            <span className={isDark ? 'text-white' : 'text-gray-900'}>{item.driver}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Truck Number</span>
                            <span className={isDark ? 'text-white' : 'text-gray-900'}>{item.truckNumber}</span>
                          </div>
                        </>
                      )}
                      <div className="flex justify-between">
                        <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Last Update</span>
                        <span className={isDark ? 'text-white' : 'text-gray-900'}>{item.lastUpdate}</span>
                      </div>
                    </div>
                  </div>

                  <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                    <h4 className={`text-sm font-medium mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>Current Status</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Location</span>
                        <span className={isDark ? 'text-white' : 'text-gray-900'}>{item.location}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Destination</span>
                        <span className={isDark ? 'text-white' : 'text-gray-900'}>{item.destination}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Distance Remaining</span>
                        <span className={isDark ? 'text-white' : 'text-gray-900'}>{item.distanceRemaining}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Next Port</span>
                        <span className={isDark ? 'text-white' : 'text-gray-900'}>{item.nextPort}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Temperature</span>
                        <span className={isDark ? 'text-white' : 'text-gray-900'}>{item.temperature}</span>
                      </div>
                      {isShip && (
                        <>
                          <div className="flex justify-between">
                            <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Wind Speed</span>
                            <span className={isDark ? 'text-white' : 'text-gray-900'}>{item.windSpeed}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Wave Height</span>
                            <span className={isDark ? 'text-white' : 'text-gray-900'}>{item.waveHeight}</span>
                          </div>
                        </>
                      )}
                    </div>

                    {/* Amenities */}
                    <div className="mt-3 pt-3 border-t" style={{ borderColor: isDark ? '#4b5563' : '#e5e7eb' }}>
                      <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Amenities</p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {item.amenities.map((amenity, idx) => (
                          <span key={idx} className={`text-xs px-2 py-0.5 rounded ${isDark ? 'bg-gray-600 text-gray-300' : 'bg-gray-200 text-gray-600'}`}>
                            {amenity}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Containers Tab with expandable details */}
            {activeTab === 'containers' && (
              <div className="space-y-4">
                {item.containers.map((container, idx) => {
                  const [expanded, setExpanded] = React.useState(false);
                  
                  return (
                    <div key={idx} className={`p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                        <div 
                          className="flex items-center gap-3 cursor-pointer flex-1"
                          onClick={() => setExpanded(!expanded)}
                        >
                          <Container className="w-5 h-5" style={{ color: colors.primary }} />
                          <div>
                            <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{container.id}</p>
                            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Items: {container.items}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className={`text-xs px-2 py-0.5 rounded-full ${isDark ? 'bg-gray-600 text-gray-300' : 'bg-gray-200 text-gray-600'}`}>
                            {container.status}
                          </span>
                          <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                            {container.destination}
                          </span>
                          <button
                            onClick={() => viewContainerDetails(container.id)}
                            className="text-xs px-3 py-1 rounded-lg transition-all duration-200 hover:shadow-md"
                            style={{
                              backgroundColor: colors.primary,
                              color: 'white'
                            }}
                          >
                            <Eye className="w-3 h-3 inline mr-1" />
                            Details
                          </button>
                          <button
                            onClick={() => setExpanded(!expanded)}
                            className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                          >
                            {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>
                      
                      {/* Expanded container contents */}
                      {expanded && (
                        <div className="mt-3 pt-3 border-t" style={{ borderColor: isDark ? '#4b5563' : '#e5e7eb' }}>
                          <p className={`text-sm font-medium mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            Items in Container ({container.contents?.length || 0} items)
                          </p>
                          <ContainerContents contents={container.contents} />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            {/* Route Tab */}
            {activeTab === 'route' && (
              <div className="space-y-4">
                {item.route.map((point, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="relative flex items-center justify-center w-6">
                      {point.completed ? (
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      ) : (
                        <ClockIcon className="w-4 h-4 text-yellow-500" />
                      )}
                      {idx < item.route.length - 1 && (
                        <div className={`absolute top-6 w-0.5 h-6 ${point.completed ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                      )}
                    </div>
                    <div className="flex-1">
                      <p className={`text-sm ${point.completed ? 'line-through' : ''} ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        {point.point}
                      </p>
                      <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-400'}`}>
                        {point.date}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  // If viewing a specific fleet item
  if (selectedFleet) {
    return (
      <div className="min-h-screen w-full p-4 md:p-6" style={{ backgroundColor: isDark ? '#1a1a2e' : '#f8fafc' }}>
        <div className="max-w-7xl mx-auto">
          <FleetDetails item={selectedFleet} />
        </div>
      </div>
    );
  }

  // Fleet List Page
  return (
    <div className="min-h-screen w-full p-4 md:p-6" style={{ backgroundColor: isDark ? '#1a1a2e' : '#f8fafc' }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className={`text-2xl md:text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Fleet Management
            </h1>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              Track and manage your entire fleet
            </p>
          </div>
          <div className="flex gap-2">
            <button
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:shadow-lg"
              style={{
                backgroundColor: colors.primary,
                color: 'white'
              }}
              onClick={() => navigate('/exporter-containers')}
            >
              <Container className="w-4 h-4" />
              View All Containers
            </button>
          </div>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6">
          <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white shadow-sm'}`}>
            <div className="flex items-center gap-2">
              <Ship className="w-4 h-4" style={{ color: colors.primary }} />
              <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Total Fleet</span>
            </div>
            <p className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{fleetData.length}</p>
          </div>
          <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white shadow-sm'}`}>
            <div className="flex items-center gap-2">
              <Ship className="w-4 h-4" style={{ color: colors.success }} />
              <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Active</span>
            </div>
            <p className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {fleetData.filter(f => f.status === 'active' || f.status === 'transit').length}
            </p>
          </div>
          <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white shadow-sm'}`}>
            <div className="flex items-center gap-2">
              <Anchor className="w-4 h-4" style={{ color: colors.warning }} />
              <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>In Port</span>
            </div>
            <p className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {fleetData.filter(f => f.status === 'port').length}
            </p>
          </div>
          <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white shadow-sm'}`}>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" style={{ color: colors.success }} />
              <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Completed</span>
            </div>
            <p className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {fleetData.filter(f => f.status === 'completed').length}
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
                placeholder="Search fleet by name, country, or destination..."
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
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className={`pl-10 pr-8 py-2.5 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 appearance-none ${
                    isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                  }`}
                >
                  <option value="all">All Types</option>
                  <option value="ship">Vessels</option>
                  <option value="truck">Trucks</option>
                </select>
                <ChevronDown className={`absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
              </div>
              <div className="relative">
                <Filter className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className={`pl-10 pr-8 py-2.5 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 appearance-none ${
                    isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                  }`}
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="port">In Port</option>
                  <option value="transit">In Transit</option>
                  <option value="completed">Completed</option>
                </select>
                <ChevronDown className={`absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
              </div>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setFilterType('all');
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

        {/* Fleet List */}
        <div className="space-y-3">
          {filteredFleet.map((item) => {
            const isExpanded = expandedFleet === item.id;
            const statusStyle = getStatusBadge(item.status);

            return (
              <div
                key={item.id}
                className={`rounded-lg transition-all duration-300 ${
                  isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-md'
                } ${isExpanded ? 'p-4 md:p-6' : 'p-3 md:p-4'}`}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                  <div className="flex-1 cursor-pointer" onClick={() => toggleExpand(item.id)}>
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg flex-shrink-0 ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
                        {getTypeIcon(item.type)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 
                            className={`font-bold cursor-pointer hover:underline ${isDark ? 'text-white' : 'text-gray-900'}`}
                            onClick={(e) => {
                              e.stopPropagation();
                              viewFleetDetails(item.id);
                            }}
                          >
                            {item.name}
                          </h3>
                          <span className="text-lg">{getFlagEmoji(item.flag)}</span>
                          <span className="text-xs px-2 py-0.5 rounded-full" style={statusStyle}>
                            {statusStyle.label}
                          </span>
                        </div>
                        <p className={`text-xs md:text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                          {item.country} • {item.location} • {item.speed}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-3 ml-12 mt-1">
                      <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        <MapPin className="w-3 h-3 inline mr-1" />
                        {item.destination}
                      </span>
                      <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        <Package className="w-3 h-3 inline mr-1" />
                        {item.containers.length} containers
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => viewFleetDetails(item.id)}
                      className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      title="View Details"
                    >
                      <Eye className="w-4 h-4" style={{ color: colors.primary }} />
                    </button>
                    <button
                      onClick={() => toggleExpand(item.id)}
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
                        <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Speed</p>
                        <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{item.speed}</p>
                      </div>
                      <div>
                        <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>ETA</p>
                        <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{item.eta}</p>
                      </div>
                      <div>
                        <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Capacity</p>
                        <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{item.capacity}</p>
                      </div>
                      <div>
                        <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Containers</p>
                        <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{item.containers.length}</p>
                      </div>
                    </div>

                    <div className={`p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" style={{ color: colors.primary }} />
                          <div>
                            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Current Location</p>
                            <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{item.location}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Navigation className="w-4 h-4" style={{ color: colors.primary }} />
                          <div>
                            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Destination</p>
                            <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{item.destination}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 pt-2">
                      <button
                        onClick={() => viewFleetDetails(item.id)}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:shadow-md"
                        style={{
                          backgroundColor: colors.primary,
                          color: 'white'
                        }}
                      >
                        <Eye className="w-4 h-4" />
                        View Full Details
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {filteredFleet.length === 0 && (
            <div className={`text-center py-12 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              <Ship className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p className="text-lg font-medium">No fleet found</p>
              <p className="text-sm">Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExporterFleet;