import React, { useState, useContext } from 'react';
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
  RotateCw,
  Layers,
  Grid,
  List,
  User,
  Users,
  Briefcase,
  Building
} from 'lucide-react';
import { ThemeContext } from '../../context/themeContext';
import { useAuth } from '../../context/authContext';
import { useNavigate } from 'react-router-dom';

const ImporterContainers = () => {
  const navigate = useNavigate();
  const { darkMode } = useContext(ThemeContext);
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterVessel, setFilterVessel] = useState('all');
  const [expandedContainer, setExpandedContainer] = useState(null);
  const [viewMode, setViewMode] = useState('list');
  const [selectedContainer, setSelectedContainer] = useState(null);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState('');

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

  // Available clearing agents
  const clearingAgents = [
    { id: 1, name: 'Swift Clearance Services', email: 'info@swiftclearance.co.ke', phone: '+254 712 345 678' },
    { id: 2, name: 'Mombasa Port Logistics', email: 'operations@mombasalogistics.com', phone: '+254 723 456 789' },
    { id: 3, name: 'East Africa Customs Solutions', email: 'support@eacustoms.co.ke', phone: '+254 734 567 890' },
    { id: 4, name: 'TransGlobal Clearing', email: 'info@transglobal.com', phone: '+254 745 678 901' },
  ];

  // Importer containers data
  const containersData = [
    {
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
      items: 450,
      sealNumber: 'SEAL-2026-0789',
      progress: 70,
      color: colors.primary,
      assignedAgent: null,
      contents: [
        { name: 'Electronics Components', quantity: 450, weight: '2.5 tons' },
        { name: 'Circuit Boards', quantity: 1200, weight: '1.8 tons' },
        { name: 'Power Supplies', quantity: 850, weight: '2.2 tons' }
      ]
    },
    {
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
      items: 320,
      sealNumber: 'SEAL-2026-0790',
      progress: 70,
      color: colors.primary,
      assignedAgent: { id: 1, name: 'Swift Clearance Services' },
      contents: [
        { name: 'Textile Fabrics', quantity: 320, weight: '4.5 tons' },
        { name: 'Dyeing Agents', quantity: 150, weight: '0.5 tons' }
      ]
    },
    {
      id: 'MSKU-458923',
      status: 'In Transit',
      type: 'Standard 20ft',
      destination: 'Port of Mombasa',
      vessel: 'MV Star Express',
      voyage: 'SE-2026-078',
      location: 'Indian Ocean',
      coordinates: { lat: -2.1, lng: 48.9 },
      eta: '12 Aug 2026 14:30',
      lastUpdate: '4 hours ago',
      weight: '3.2 tons',
      capacity: '28.2 tons',
      items: 280,
      sealNumber: 'SEAL-2026-0791',
      progress: 65,
      color: colors.info,
      assignedAgent: null,
      contents: [
        { name: 'Industrial Parts', quantity: 280, weight: '3.2 tons' }
      ]
    },
    {
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
      items: 280,
      sealNumber: 'SEAL-2026-0792',
      progress: 45,
      color: colors.warning,
      assignedAgent: { id: 3, name: 'East Africa Customs Solutions' },
      contents: [
        { name: 'Electronics Components', quantity: 280, weight: '2.5 tons' },
        { name: 'Circuit Boards', quantity: 800, weight: '1.2 tons' }
      ]
    },
    {
      id: 'IN-782342',
      status: 'Customs Hold',
      type: 'Standard 20ft',
      destination: 'Kampala, Uganda',
      vessel: 'MV Indian Trader',
      voyage: 'IT-2026-023',
      location: 'Customs Checkpoint',
      coordinates: { lat: -4.03, lng: 39.65 },
      eta: '18 Aug 2026 09:00',
      lastUpdate: '5 hours ago',
      weight: '4.5 tons',
      capacity: '28.2 tons',
      items: 150,
      sealNumber: 'SEAL-2026-0793',
      progress: 30,
      color: colors.danger,
      assignedAgent: null,
      contents: [
        { name: 'Industrial Machinery', quantity: 150, weight: '4.5 tons' }
      ]
    },
    {
      id: 'SA-456732',
      status: 'Delivered',
      type: 'Standard 40ft',
      destination: 'Nairobi, Kenya',
      vessel: 'MV African Trader',
      voyage: 'AT-2026-067',
      location: 'Nairobi Warehouse',
      coordinates: { lat: -1.29, lng: 36.82 },
      eta: 'Completed',
      lastUpdate: '2 days ago',
      weight: '10.8 tons',
      capacity: '26.8 tons',
      items: 320,
      sealNumber: 'SEAL-2026-0794',
      progress: 100,
      color: colors.success,
      assignedAgent: { id: 2, name: 'Mombasa Port Logistics' },
      contents: [
        { name: 'Industrial Machinery', quantity: 120, weight: '10.8 tons' },
        { name: 'Spare Parts', quantity: 450, weight: '2.3 tons' }
      ]
    },
    {
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
      items: 150,
      sealNumber: 'SEAL-2026-0795',
      progress: 25,
      color: colors.primary,
      assignedAgent: null,
      contents: [
        { name: 'Electronics Components', quantity: 150, weight: '1.2 tons' }
      ]
    },
    {
      id: 'JP-893422',
      status: 'Loaded',
      type: 'Standard 20ft',
      destination: 'Port of Mombasa',
      vessel: 'MV Pacific Voyager',
      voyage: 'PV-2026-045',
      location: 'Pacific Ocean',
      coordinates: { lat: 8.7, lng: 58.7 },
      eta: '28 Sep 2026 16:00',
      lastUpdate: '1 day ago',
      weight: '2.8 tons',
      capacity: '28.2 tons',
      items: 200,
      sealNumber: 'SEAL-2026-0796',
      progress: 25,
      color: colors.primary,
      assignedAgent: null,
      contents: [
        { name: 'Consumer Goods', quantity: 200, weight: '2.8 tons' },
        { name: 'Packaging Materials', quantity: 500, weight: '1.5 tons' }
      ]
    },
    {
      id: 'TR-782341',
      status: 'In Transit',
      type: 'Truck Container',
      destination: 'Port of Mombasa',
      vessel: 'Truck Fleet - Unit 45',
      voyage: 'TR-2026-045',
      location: 'Kampala - Mombasa Road',
      coordinates: { lat: 0.5, lng: 35.5 },
      eta: '15 Aug 2026 18:00',
      lastUpdate: '1 hour ago',
      weight: '4.5 tons',
      capacity: '25 tons',
      items: 120,
      sealNumber: 'SEAL-2026-0797',
      progress: 40,
      color: colors.info,
      assignedAgent: null,
      contents: [
        { name: 'Fresh Produce', quantity: 120, weight: '4.5 tons' }
      ]
    }
  ];

  // Get unique vessels for filter
  const vessels = ['all', ...new Set(containersData.map(c => c.vessel))];
  const statusOptions = ['all', 'Loaded', 'In Transit', 'Unloading', 'Customs Hold', 'Delivered'];

  // Filter containers
  const filteredContainers = containersData.filter(container => {
    const matchesSearch = container.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          container.destination.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          container.vessel.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || container.status === filterStatus;
    const matchesVessel = filterVessel === 'all' || container.vessel === filterVessel;
    return matchesSearch && matchesStatus && matchesVessel;
  });

  // Get status badge style
  const getStatusBadge = (status) => {
    const statusMap = {
      'Loaded': { backgroundColor: colors.success + '20', color: colors.success },
      'Unloading': { backgroundColor: colors.warning + '20', color: colors.warning },
      'In Transit': { backgroundColor: colors.info + '20', color: colors.info },
      'Customs Hold': { backgroundColor: colors.danger + '20', color: colors.danger },
      'Delivered': { backgroundColor: colors.primary + '20', color: colors.primary }
    };
    return statusMap[status] || { backgroundColor: colors.primary + '20', color: colors.primary };
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
    if (expandedContainer === id) {
      setExpandedContainer(null);
    } else {
      setExpandedContainer(id);
    }
  };

  // Navigate to container details
  const viewContainerDetails = (id) => {
    navigate(`/importer/container/${id}`);
  };

  // Handle assign agent
  const handleAssignAgent = (containerId) => {
    const container = containersData.find(c => c.id === containerId);
    setSelectedContainer(container);
    setSelectedAgent('');
    setShowAssignModal(true);
  };

  const confirmAssignAgent = () => {
    if (selectedContainer && selectedAgent) {
      const agent = clearingAgents.find(a => a.id === parseInt(selectedAgent));
      // Update the container with assigned agent
      const containerIndex = containersData.findIndex(c => c.id === selectedContainer.id);
      if (containerIndex !== -1) {
        containersData[containerIndex].assignedAgent = agent;
      }
      setShowAssignModal(false);
      setSelectedContainer(null);
      setSelectedAgent('');
      // Show success message (in real app, use toast)
      alert(`Container ${selectedContainer.id} assigned to ${agent.name}`);
    }
  };

  // Stats
  const totalContainers = containersData.length;
  const inTransit = containersData.filter(c => c.status === 'In Transit' || c.status === 'Loaded').length;
  const inPort = containersData.filter(c => c.status === 'Unloading' || c.status === 'Customs Hold').length;
  const delivered = containersData.filter(c => c.status === 'Delivered').length;

  // Assign Agent Modal
  const AssignAgentModal = () => {
    if (!showAssignModal) return null;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
        <div className={`relative w-full max-w-md rounded-xl shadow-2xl overflow-hidden ${
          isDark ? 'bg-gray-800' : 'bg-white'
        }`}>
          <div className={`flex items-center justify-between p-4 border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
            <div className="flex items-center gap-3">
              <Users className="w-5 h-5" style={{ color: colors.primary }} />
              <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Assign Clearing Agent
              </h3>
            </div>
            <button
              onClick={() => setShowAssignModal(false)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6">
            <div className={`p-3 rounded-lg mb-4 ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <div className="flex items-center gap-3">
                <Container className="w-5 h-5" style={{ color: colors.primary }} />
                <div>
                  <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {selectedContainer?.id}
                  </p>
                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    {selectedContainer?.destination} • {selectedContainer?.status}
                  </p>
                </div>
              </div>
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Select Clearing Agent
              </label>
              <select
                value={selectedAgent}
                onChange={(e) => setSelectedAgent(e.target.value)}
                className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                  isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                }`}
                style={{ focusRingColor: colors.primary }}
              >
                <option value="">Choose an agent...</option>
                {clearingAgents.map((agent) => (
                  <option key={agent.id} value={agent.id}>
                    {agent.name} - {agent.phone}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className={`flex items-center justify-end gap-3 p-4 border-t ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
            <button
              onClick={() => setShowAssignModal(false)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                isDark ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-600'
              }`}
            >
              Cancel
            </button>
            <button
              onClick={confirmAssignAgent}
              disabled={!selectedAgent}
              className="flex items-center gap-2 px-6 py-2 rounded-lg text-sm font-medium text-white transition-all duration-200 hover:shadow-lg disabled:opacity-50"
              style={{ backgroundColor: colors.primary }}
            >
              <CheckCircle className="w-4 h-4" />
              Assign Agent
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen w-full p-4 md:p-6" style={{ backgroundColor: isDark ? '#1a1a2e' : '#f8fafc' }}>
      <AssignAgentModal />
      
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className={`text-2xl md:text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              My Containers
            </h1>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              Track and manage all your containers
            </p>
          </div>
          <div className="flex gap-2">
            <button
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:shadow-lg"
              style={{
                backgroundColor: colors.primary,
                color: 'white'
              }}
              onClick={() => navigate('/new-import')}
            >
              <Plus className="w-4 h-4" />
              New Import
            </button>
          </div>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6">
          <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white shadow-sm'}`}>
            <div className="flex items-center gap-2">
              <Container className="w-4 h-4" style={{ color: colors.primary }} />
              <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Total</span>
            </div>
            <p className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{totalContainers}</p>
          </div>
          <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white shadow-sm'}`}>
            <div className="flex items-center gap-2">
              <Ship className="w-4 h-4" style={{ color: colors.success }} />
              <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>In Transit</span>
            </div>
            <p className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{inTransit}</p>
          </div>
          <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white shadow-sm'}`}>
            <div className="flex items-center gap-2">
              <Anchor className="w-4 h-4" style={{ color: colors.warning }} />
              <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>In Port</span>
            </div>
            <p className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{inPort}</p>
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
                placeholder="Search by container ID, destination, or vessel..."
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
                  value={filterVessel}
                  onChange={(e) => setFilterVessel(e.target.value)}
                  className={`pl-10 pr-8 py-2.5 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 appearance-none ${
                    isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                  }`}
                >
                  {vessels.map((vessel) => (
                    <option key={vessel} value={vessel}>
                      {vessel === 'all' ? 'All Vessels' : vessel}
                    </option>
                  ))}
                </select>
                <ChevronDown className={`absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
              </div>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setFilterStatus('all');
                  setFilterVessel('all');
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
        </div>

        {/* Containers List/Grid */}
        {viewMode === 'list' ? (
          <div className="space-y-3">
            {filteredContainers.map((container) => {
              const isExpanded = expandedContainer === container.id;
              const statusStyle = getStatusBadge(container.status);
              const progressColor = getProgressColor(container.progress);

              return (
                <div
                  key={container.id}
                  className={`rounded-lg transition-all duration-300 ${
                    isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-md'
                  } ${isExpanded ? 'p-4 md:p-6' : 'p-3 md:p-4'}`}
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                    <div className="flex-1 cursor-pointer" onClick={() => toggleExpand(container.id)}>
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg flex-shrink-0" style={{ backgroundColor: colors.primaryBg }}>
                          <Container className="w-5 h-5" style={{ color: colors.primary }} />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 
                              className={`font-bold cursor-pointer hover:underline ${isDark ? 'text-white' : 'text-gray-900'}`}
                              onClick={(e) => {
                                e.stopPropagation();
                                viewContainerDetails(container.id);
                              }}
                            >
                              {container.id}
                            </h3>
                            <span className="text-xs px-2 py-0.5 rounded-full" style={statusStyle}>
                              {container.status}
                            </span>
                            <span className={`text-xs px-2 py-0.5 rounded-full ${isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'}`}>
                              {container.type}
                            </span>
                          </div>
                          <p className={`text-xs md:text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                            {container.vessel} • {container.location}
                          </p>
                          {container.assignedAgent && (
                            <p className={`text-xs flex items-center gap-1 mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                              <Users className="w-3 h-3" style={{ color: colors.primary }} />
                              Agent: {container.assignedAgent.name}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-wrap items-center gap-3 ml-12 mt-1">
                        <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                          <MapPin className="w-3 h-3 inline mr-1" />
                          {container.destination}
                        </span>
                        <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                          <Package className="w-3 h-3 inline mr-1" />
                          {container.items} items
                        </span>
                        <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                          <Clock className="w-3 h-3 inline mr-1" />
                          ETA: {container.eta}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {!container.assignedAgent && container.status !== 'Delivered' && (
                        <button
                          onClick={() => handleAssignAgent(container.id)}
                          className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                          title="Assign Clearing Agent"
                        >
                          <Users className="w-4 h-4" style={{ color: colors.primary }} />
                        </button>
                      )}
                      <button
                        onClick={() => viewContainerDetails(container.id)}
                        className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" style={{ color: colors.primary }} />
                      </button>
                      <button
                        onClick={() => toggleExpand(container.id)}
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
                          <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{container.weight}</p>
                        </div>
                        <div>
                          <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Capacity</p>
                          <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{container.capacity}</p>
                        </div>
                        <div>
                          <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Items</p>
                          <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{container.items}</p>
                        </div>
                        <div>
                          <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Seal Number</p>
                          <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{container.sealNumber}</p>
                        </div>
                      </div>

                      {/* Contents Preview */}
                      <div>
                        <p className={`text-sm font-medium mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          Items in Container ({container.contents.length} types)
                        </p>
                        <div className="space-y-1">
                          {container.contents.map((item, idx) => (
                            <div key={idx} className={`flex items-center justify-between p-2 rounded ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
                              <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{item.name}</span>
                              <span className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                Qty: {item.quantity} • {item.weight}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Assigned Agent */}
                      {container.assignedAgent && (
                        <div className={`p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                          <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Assigned Clearing Agent</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Users className="w-4 h-4" style={{ color: colors.primary }} />
                            <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                              {container.assignedAgent.name}
                            </span>
                          </div>
                        </div>
                      )}

                      <div className="flex flex-wrap gap-2 pt-2">
                        <button
                          onClick={() => viewContainerDetails(container.id)}
                          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:shadow-md"
                          style={{
                            backgroundColor: colors.primary,
                            color: 'white'
                          }}
                        >
                          <Eye className="w-4 h-4" />
                          View Full Details
                        </button>
                        {!container.assignedAgent && container.status !== 'Delivered' && (
                          <button
                            onClick={() => handleAssignAgent(container.id)}
                            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:shadow-md"
                            style={{
                              backgroundColor: colors.primaryBg,
                              color: colors.primary
                            }}
                          >
                            <Users className="w-4 h-4" />
                            Assign Agent
                          </button>
                        )}
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
            {filteredContainers.map((container) => {
              const statusStyle = getStatusBadge(container.status);
              const progressColor = getProgressColor(container.progress);

              return (
                <div
                  key={container.id}
                  className={`rounded-lg p-4 transition-all duration-300 cursor-pointer hover:shadow-lg ${
                    isDark ? 'bg-gray-800 border border-gray-700 hover:border-gray-600' : 'bg-white shadow-md hover:shadow-xl'
                  }`}
                  onClick={() => viewContainerDetails(container.id)}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="p-2 rounded-lg flex-shrink-0" style={{ backgroundColor: colors.primaryBg }}>
                        <Container className="w-4 h-4" style={{ color: colors.primary }} />
                      </div>
                      <div>
                        <h3 className={`font-bold text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          {container.id}
                        </h3>
                        <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                          {container.vessel}
                        </p>
                      </div>
                    </div>
                    <span className="text-xs px-2 py-0.5 rounded-full" style={statusStyle}>
                      {container.status}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-xs mb-2">
                    <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>
                      <MapPin className="w-3 h-3 inline mr-1" />
                      {container.location}
                    </span>
                    <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>
                      <Package className="w-3 h-3 inline mr-1" />
                      {container.items}
                    </span>
                  </div>

                  {container.assignedAgent && (
                    <p className={`text-xs flex items-center gap-1 mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      <Users className="w-3 h-3" style={{ color: colors.primary }} />
                      Agent: {container.assignedAgent.name}
                    </p>
                  )}

                  <div className="mt-2">
                    <div className="flex justify-between items-center mb-1">
                      <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Progress</span>
                      <span className={`text-xs font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {container.progress}%
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full rounded-full transition-all duration-500"
                        style={{ 
                          width: `${container.progress}%`,
                          backgroundColor: progressColor
                        }}
                      />
                    </div>
                  </div>

                  <div className="mt-3 pt-3 border-t flex items-center justify-between" style={{ borderColor: isDark ? '#374151' : '#e5e7eb' }}>
                    <div className="flex items-center gap-1 text-xs">
                      <Clock className="w-3 h-3" style={{ color: colors.primary }} />
                      <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>ETA: {container.eta}</span>
                    </div>
                    <div className="flex gap-1">
                      {!container.assignedAgent && container.status !== 'Delivered' && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAssignAgent(container.id);
                          }}
                          className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                          title="Assign Agent"
                        >
                          <Users className="w-4 h-4" style={{ color: colors.primary }} />
                        </button>
                      )}
                      <button
                        className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        style={{ color: colors.primary }}
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {filteredContainers.length === 0 && (
          <div className={`text-center py-12 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            <Container className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <p className="text-lg font-medium">No containers found</p>
            <p className="text-sm">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImporterContainers;