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
  Users,
  UserPlus,
  AlertCircle,
  AlertTriangle,
  CheckCircle,
  X,
  Search,
  Filter,
  RefreshCw,
  Plus,
  List,
  Grid,
  Building,
  Phone,
  Mail,
  Award,
  Target,
  Rocket,
  Zap,
  Flame,
  CheckSquare,
  Square,
  Clock as ClockIcon,
  Calendar as CalendarIcon,
  User as UserIcon,
  Tag,
  MoreHorizontal,
  Trash2,
  Edit,
  Save,
  Upload,
  Printer,
  Share2,
  Link,
  MessageSquare,
  Home,
  ArrowLeft,
  Download,
  Eye as EyeIcon,
  TrendingUp,
  TrendingDown,
  BarChart3,
  PieChart,
  Layers,
  ClipboardList,
  FileCheck,
  Shield,
  CreditCard,
  FileSignature,
  FileText,
  Anchor,
  Box,
  Navigation,
  Compass,
  Wind,
  Waves,
  Globe,
  Flag,
  Wifi,
  Coffee,
  Utensils,
  Tv,
  Bed,
  Bath,
  Zap as ZapIcon,
  Thermometer,
  Gauge,
  Navigation2,
  Ship as ShipIcon,
  Truck as TruckIcon,
  Anchor as AnchorIcon,
  Package as PackageIcon,
  Info,
  MoreVertical,
  AlertOctagon
} from 'lucide-react';
import { ThemeContext } from '../../context/themeContext';
import { useAuth } from '../../context/authContext';
import { useNavigate } from 'react-router-dom';

const ImporterAssignments = () => {
  const navigate = useNavigate();
  const { darkMode } = useContext(ThemeContext);
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterAgent, setFilterAgent] = useState('all');
  const [expandedAssignment, setExpandedAssignment] = useState(null);
  const [viewMode, setViewMode] = useState('list');
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedShipment, setSelectedShipment] = useState(null);
  const [selectedAgent, setSelectedAgent] = useState('');
  const [showRisks, setShowRisks] = useState(true);

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
    { id: 1, name: 'Swift Clearance Services', email: 'info@swiftclearance.co.ke', phone: '+254 712 345 678', rating: 4.8, specialties: ['Electronics', 'Chemicals'] },
    { id: 2, name: 'Mombasa Port Logistics', email: 'operations@mombasalogistics.com', phone: '+254 723 456 789', rating: 4.5, specialties: ['Machinery', 'Textiles'] },
    { id: 3, name: 'East Africa Customs Solutions', email: 'support@eacustoms.co.ke', phone: '+254 734 567 890', rating: 4.2, specialties: ['Food Products', 'Construction'] },
    { id: 4, name: 'TransGlobal Clearing', email: 'info@transglobal.com', phone: '+254 745 678 901', rating: 3.9, specialties: ['General Cargo', 'Vehicles'] },
  ];

  // My shipments with assignment status
  const shipments = [
    {
      id: '#458',
      importer: 'ImportFlow Ltd',
      origin: 'Shanghai, China',
      destination: 'Port of Mombasa',
      status: 'In Transit',
      progress: 70,
      eta: '12 Aug 2026',
      assignedDate: '2026-08-10',
      items: 450,
      weight: '12.5 tons',
      container: 'MSKU-458921',
      currentLocation: 'Indian Ocean',
      lastUpdate: '2 hours ago',
      assignedAgent: { id: 1, name: 'Swift Clearance Services' },
      customsDays: 0,
      riskLevel: 'low',
      riskWarnings: [],
      milestones: [
        { stage: 'Supplier dispatched goods', date: '15 Jul 2026', completed: true },
        { stage: 'Vessel departed', date: '25 Jul 2026', completed: true },
        { stage: 'Arrived Mombasa', date: '10 Aug 2026', completed: false },
        { stage: 'Customs inspection', date: '12 Aug 2026', completed: false },
        { stage: 'Delivery', date: '15 Aug 2026', completed: false },
      ]
    },
    {
      id: '#459',
      importer: 'ImportFlow Ltd',
      origin: 'Mumbai, India',
      destination: 'Kampala, Uganda',
      status: 'Customs Clearance',
      progress: 45,
      eta: '18 Aug 2026',
      assignedDate: '2026-08-12',
      items: 280,
      weight: '8.2 tons',
      container: 'IN-782341',
      currentLocation: 'Customs Checkpoint',
      lastUpdate: '5 hours ago',
      assignedAgent: null,
      customsDays: 4,
      riskLevel: 'high',
      riskWarnings: [
        'Documentation incomplete - Missing COC certificate',
        'Customs hold - Additional inspection required',
        'Fine accruing: $500/day after 5 days'
      ],
      milestones: [
        { stage: 'Supplier dispatched goods', date: '01 Aug 2026', completed: true },
        { stage: 'Vessel departed', date: '08 Aug 2026', completed: true },
        { stage: 'Arrived Mombasa', date: '12 Aug 2026', completed: true },
        { stage: 'Customs inspection', date: '14 Aug 2026', completed: false },
        { stage: 'Delivery', date: '18 Aug 2026', completed: false },
      ]
    },
    {
      id: '#460',
      importer: 'ImportFlow Ltd',
      origin: 'Durban, South Africa',
      destination: 'Nairobi, Kenya',
      status: 'Delivered',
      progress: 100,
      eta: '05 Aug 2026',
      assignedDate: '2026-08-05',
      items: 320,
      weight: '10.8 tons',
      container: 'SA-456732',
      currentLocation: 'Nairobi Warehouse',
      lastUpdate: '2 days ago',
      assignedAgent: { id: 2, name: 'Mombasa Port Logistics' },
      customsDays: 0,
      riskLevel: 'low',
      riskWarnings: [],
      milestones: [
        { stage: 'Supplier dispatched goods', date: '10 Jul 2026', completed: true },
        { stage: 'Vessel departed', date: '20 Jul 2026', completed: true },
        { stage: 'Arrived Mombasa', date: '25 Jul 2026', completed: true },
        { stage: 'Customs inspection', date: '28 Jul 2026', completed: true },
        { stage: 'Delivery', date: '05 Aug 2026', completed: true },
      ]
    },
    {
      id: '#461',
      importer: 'ImportFlow Ltd',
      origin: 'Tokyo, Japan',
      destination: 'Port of Mombasa',
      status: 'In Transit',
      progress: 25,
      eta: '28 Sep 2026',
      assignedDate: '2026-09-01',
      items: 150,
      weight: '4.5 tons',
      container: 'JP-893421',
      currentLocation: 'Pacific Ocean',
      lastUpdate: '1 day ago',
      assignedAgent: null,
      customsDays: 0,
      riskLevel: 'low',
      riskWarnings: [],
      milestones: [
        { stage: 'Supplier dispatched goods', date: '01 Sep 2026', completed: true },
        { stage: 'Vessel departed', date: '05 Sep 2026', completed: true },
        { stage: 'Arrived Mombasa', date: '25 Sep 2026', completed: false },
        { stage: 'Customs inspection', date: '28 Sep 2026', completed: false },
        { stage: 'Delivery', date: '30 Sep 2026', completed: false },
      ]
    },
    {
      id: '#462',
      importer: 'ImportFlow Ltd',
      origin: 'Hamburg, Germany',
      destination: 'Kampala, Uganda',
      status: 'Customs Clearance',
      progress: 60,
      eta: '15 Sep 2026',
      assignedDate: '2026-08-20',
      items: 200,
      weight: '6.8 tons',
      container: 'DE-782341',
      currentLocation: 'Mombasa Port',
      lastUpdate: '3 hours ago',
      assignedAgent: { id: 3, name: 'East Africa Customs Solutions' },
      customsDays: 7,
      riskLevel: 'critical',
      riskWarnings: [
        '⚠️ CRITICAL: 7 days in customs bond',
        'Fine accruing: $1,200/day after 5 days',
        'Documentation discrepancy - HS Code mismatch',
        'Action required: Submit corrected documentation within 24 hours'
      ],
      milestones: [
        { stage: 'Supplier dispatched goods', date: '20 Aug 2026', completed: true },
        { stage: 'Vessel departed', date: '25 Aug 2026', completed: true },
        { stage: 'Arrived Mombasa', date: '10 Sep 2026', completed: true },
        { stage: 'Customs inspection', date: '12 Sep 2026', completed: false },
        { stage: 'Delivery', date: '15 Sep 2026', completed: false },
      ]
    }
  ];

  // Calculate customs days and risks
  useEffect(() => {
    // In real app, this would be calculated from API data
    const today = new Date();
    shipments.forEach(shipment => {
      if (shipment.status === 'Customs Clearance') {
        const assignedDate = new Date(shipment.assignedDate);
        const daysInCustoms = Math.floor((today - assignedDate) / (1000 * 60 * 60 * 24));
        shipment.customsDays = daysInCustoms;
        
        // Determine risk level based on days in customs
        if (daysInCustoms > 7) {
          shipment.riskLevel = 'critical';
          if (!shipment.riskWarnings.includes('⚠️ CRITICAL: ' + daysInCustoms + ' days in customs bond')) {
            shipment.riskWarnings.push(`⚠️ CRITICAL: ${daysInCustoms} days in customs bond`);
            shipment.riskWarnings.push(`Fine accruing: $${1200}/day after 5 days`);
          }
        } else if (daysInCustoms > 5) {
          shipment.riskLevel = 'high';
          if (!shipment.riskWarnings.includes('⚠️ High risk: ' + daysInCustoms + ' days in customs bond')) {
            shipment.riskWarnings.push(`⚠️ High risk: ${daysInCustoms} days in customs bond`);
          }
        } else if (daysInCustoms > 3) {
          shipment.riskLevel = 'medium';
        } else {
          shipment.riskLevel = 'low';
        }
      }
    });
  }, []);

  const getStatusBadge = (status) => {
    const statusMap = {
      'In Transit': { backgroundColor: colors.primary + '20', color: colors.primary, icon: <Ship className="w-3 h-3" /> },
      'Customs Clearance': { backgroundColor: colors.warning + '20', color: colors.warning, icon: <Shield className="w-3 h-3" /> },
      'Delivered': { backgroundColor: colors.success + '20', color: colors.success, icon: <CheckCircle className="w-3 h-3" /> },
      'Pending': { backgroundColor: colors.info + '20', color: colors.info, icon: <Clock className="w-3 h-3" /> }
    };
    return statusMap[status] || statusMap['Pending'];
  };

  const getRiskBadge = (riskLevel) => {
    const riskMap = {
      'low': { backgroundColor: colors.success + '20', color: colors.success, label: 'Low Risk', icon: <CheckCircle className="w-3 h-3" /> },
      'medium': { backgroundColor: colors.warning + '20', color: colors.warning, label: 'Medium Risk', icon: <AlertCircle className="w-3 h-3" /> },
      'high': { backgroundColor: colors.danger + '20', color: colors.danger, label: 'High Risk', icon: <AlertTriangle className="w-3 h-3" /> },
      'critical': { backgroundColor: colors.danger + '30', color: colors.danger, label: 'CRITICAL', icon: <AlertOctagon className="w-3 h-3" /> }
    };
    return riskMap[riskLevel] || riskMap['low'];
  };

  const toggleExpand = (id) => {
    if (expandedAssignment === id) {
      setExpandedAssignment(null);
    } else {
      setExpandedAssignment(id);
    }
  };

  const handleAssignAgent = (shipment) => {
    setSelectedShipment(shipment);
    setSelectedAgent('');
    setShowAssignModal(true);
  };

  const confirmAssignAgent = () => {
    if (selectedShipment && selectedAgent) {
      const agent = clearingAgents.find(a => a.id === parseInt(selectedAgent));
      // Update the shipment with assigned agent
      const shipmentIndex = shipments.findIndex(s => s.id === selectedShipment.id);
      if (shipmentIndex !== -1) {
        shipments[shipmentIndex].assignedAgent = agent;
        shipments[shipmentIndex].assignedDate = new Date().toISOString().split('T')[0];
      }
      setShowAssignModal(false);
      setSelectedShipment(null);
      setSelectedAgent('');
      alert(`Shipment ${selectedShipment.id} assigned to ${agent.name}`);
    }
  };

  const filteredShipments = shipments.filter(item => {
    const matchesSearch = item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.destination.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.origin.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || item.status === filterStatus;
    const matchesAgent = filterAgent === 'all' || 
                         (item.assignedAgent && item.assignedAgent.id === parseInt(filterAgent));
    return matchesSearch && matchesStatus && matchesAgent;
  });

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
              <UserPlus className="w-5 h-5" style={{ color: colors.primary }} />
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
                <Ship className="w-5 h-5" style={{ color: colors.primary }} />
                <div>
                  <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {selectedShipment?.id}
                  </p>
                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    {selectedShipment?.destination} • {selectedShipment?.status}
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
                    {agent.name} ★ {agent.rating} • {agent.specialties.join(', ')}
                  </option>
                ))}
              </select>
            </div>

            {selectedAgent && (
              <div className={`mt-4 p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <p className={`text-sm font-medium mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Agent Details
                </p>
                {clearingAgents.map((agent) => {
                  if (agent.id === parseInt(selectedAgent)) {
                    return (
                      <div key={agent.id} className="space-y-1 text-sm">
                        <div className="flex items-center gap-2">
                          <Building className="w-4 h-4" style={{ color: colors.primary }} />
                          <span>{agent.name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4" style={{ color: colors.primary }} />
                          <span>{agent.email}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4" style={{ color: colors.primary }} />
                          <span>{agent.phone}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Award className="w-4 h-4" style={{ color: colors.primary }} />
                          <span>★ {agent.rating} • {agent.specialties.join(', ')}</span>
                        </div>
                      </div>
                    );
                  }
                  return null;
                })}
              </div>
            )}
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

  // Risk Alert Component
  const RiskAlert = ({ shipment }) => {
    if (!shipment.riskWarnings || shipment.riskWarnings.length === 0) {
      return null;
    }

    const riskBadge = getRiskBadge(shipment.riskLevel);

    return (
      <div className={`p-3 rounded-lg border-l-4 mb-3 ${
        shipment.riskLevel === 'critical' 
          ? 'border-red-500 bg-red-50 dark:bg-red-900/20' 
          : shipment.riskLevel === 'high' 
          ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20'
          : 'border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20'
      }`}>
        <div className="flex items-start gap-2">
          <AlertOctagon className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
            shipment.riskLevel === 'critical' ? 'text-red-500' : 
            shipment.riskLevel === 'high' ? 'text-orange-500' : 'text-yellow-500'
          }`} />
          <div className="flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className={`text-sm font-bold ${
                shipment.riskLevel === 'critical' ? 'text-red-700 dark:text-red-400' : 
                shipment.riskLevel === 'high' ? 'text-orange-700 dark:text-orange-400' : 
                'text-yellow-700 dark:text-yellow-400'
              }`}>
                {riskBadge.label}
              </span>
              <span className={`text-xs px-2 py-0.5 rounded-full ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`}>
                {shipment.customsDays} days in customs
              </span>
            </div>
            <div className="mt-1 space-y-1">
              {shipment.riskWarnings.map((warning, idx) => (
                <p key={idx} className={`text-xs ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  {warning}
                </p>
              ))}
            </div>
            {shipment.riskLevel === 'critical' && (
              <div className="mt-2">
                <button className="text-xs px-3 py-1 rounded-lg text-white transition-all duration-200 hover:shadow-md"
                  style={{ backgroundColor: colors.danger }}
                >
                  Take Action Now
                </button>
              </div>
            )}
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
              Assignments & Clearance
            </h1>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              Manage clearing agents and track customs clearance progress
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
              New Shipment
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
            <p className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{shipments.length}</p>
          </div>
          <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white shadow-sm'}`}>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4" style={{ color: colors.warning }} />
              <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>In Customs</span>
            </div>
            <p className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {shipments.filter(s => s.status === 'Customs Clearance').length}
            </p>
          </div>
          <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white shadow-sm'}`}>
            <div className="flex items-center gap-2">
              <UserPlus className="w-4 h-4" style={{ color: colors.success }} />
              <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Assigned</span>
            </div>
            <p className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {shipments.filter(s => s.assignedAgent).length}
            </p>
          </div>
          <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white shadow-sm'}`}>
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" style={{ color: colors.danger }} />
              <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Risks</span>
            </div>
            <p className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {shipments.filter(s => s.riskLevel === 'high' || s.riskLevel === 'critical').length}
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
                placeholder="Search by shipment ID, origin, or destination..."
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
                  <option value="all">All Status</option>
                  <option value="In Transit">In Transit</option>
                  <option value="Customs Clearance">Customs Clearance</option>
                  <option value="Delivered">Delivered</option>
                </select>
                <ChevronDown className={`absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
              </div>
              <div className="relative">
                <Filter className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                <select
                  value={filterAgent}
                  onChange={(e) => setFilterAgent(e.target.value)}
                  className={`pl-10 pr-8 py-2.5 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 appearance-none ${
                    isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                  }`}
                >
                  <option value="all">All Agents</option>
                  <option value="unassigned">Unassigned</option>
                  {clearingAgents.map((agent) => (
                    <option key={agent.id} value={agent.id}>{agent.name}</option>
                  ))}
                </select>
                <ChevronDown className={`absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
              </div>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setFilterStatus('all');
                  setFilterAgent('all');
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
        <div className="flex justify-between items-center mb-4">
          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            Showing {filteredShipments.length} shipments
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setShowRisks(!showRisks)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                showRisks 
                  ? 'text-white' 
                  : isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
              }`}
              style={{ backgroundColor: showRisks ? colors.primary : 'transparent' }}
            >
              <AlertTriangle className="w-4 h-4" />
              Risks
            </button>
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
        </div>

        {/* Shipments List */}
        {viewMode === 'list' ? (
          <div className="space-y-3">
            {filteredShipments.map((shipment) => {
              const isExpanded = expandedAssignment === shipment.id;
              const statusStyle = getStatusBadge(shipment.status);
              const riskBadge = getRiskBadge(shipment.riskLevel);

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
                          <Ship className="w-5 h-5" style={{ color: colors.primary }} />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                              {shipment.id}
                            </h3>
                            <span className="text-xs px-2 py-0.5 rounded-full flex items-center gap-1" style={statusStyle}>
                              {statusStyle.icon}
                              {shipment.status}
                            </span>
                            <span className="text-xs px-2 py-0.5 rounded-full flex items-center gap-1" style={riskBadge}>
                              {riskBadge.icon}
                              {riskBadge.label}
                            </span>
                          </div>
                          <p className={`text-xs md:text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                            {shipment.origin} → {shipment.destination}
                          </p>
                          {shipment.assignedAgent && (
                            <p className={`text-xs flex items-center gap-1 mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                              <Users className="w-3 h-3" style={{ color: colors.primary }} />
                              Agent: {shipment.assignedAgent.name}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-wrap items-center gap-3 ml-12 mt-1">
                        <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                          <Calendar className="w-3 h-3 inline mr-1" />
                          ETA: {shipment.eta}
                        </span>
                        <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                          <Package className="w-3 h-3 inline mr-1" />
                          {shipment.items} items
                        </span>
                        {shipment.customsDays > 0 && (
                          <span className={`text-xs flex items-center gap-1 ${shipment.customsDays > 5 ? 'text-red-500' : 'text-yellow-500'}`}>
                            <ClockIcon className="w-3 h-3" />
                            {shipment.customsDays} days in customs
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {!shipment.assignedAgent && shipment.status !== 'Delivered' && (
                        <button
                          onClick={() => handleAssignAgent(shipment)}
                          className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                          title="Assign Clearing Agent"
                        >
                          <UserPlus className="w-4 h-4" style={{ color: colors.primary }} />
                        </button>
                      )}
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
                      {/* Risk Alerts */}
                      {showRisks && shipment.riskWarnings.length > 0 && (
                        <RiskAlert shipment={shipment} />
                      )}

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        <div>
                          <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Items</p>
                          <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{shipment.items}</p>
                        </div>
                        <div>
                          <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Weight</p>
                          <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{shipment.weight}</p>
                        </div>
                        <div>
                          <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Container</p>
                          <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{shipment.container}</p>
                        </div>
                        <div>
                          <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Location</p>
                          <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{shipment.currentLocation}</p>
                        </div>
                      </div>

                      {/* Milestones */}
                      <div>
                        <p className={`text-sm font-medium mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          Shipment Timeline
                        </p>
                        <div className="space-y-2">
                          {shipment.milestones.map((milestone, index) => (
                            <div key={index} className="flex items-center gap-3">
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

                      {/* Actions */}
                      <div className="flex flex-wrap gap-2 pt-2">
                        {!shipment.assignedAgent && shipment.status !== 'Delivered' && (
                          <button
                            onClick={() => handleAssignAgent(shipment)}
                            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:shadow-md"
                            style={{
                              backgroundColor: colors.primary,
                              color: 'white'
                            }}
                          >
                            <UserPlus className="w-4 h-4" />
                            Assign Agent
                          </button>
                        )}
                        {shipment.assignedAgent && (
                          <button
                            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
                            style={{
                              backgroundColor: colors.primaryBg,
                              color: colors.primary
                            }}
                          >
                            <MessageSquare className="w-4 h-4" />
                            Contact Agent
                          </button>
                        )}
                        <button
                          onClick={() => navigate(`/importer/assignment/${shipment.id.replace('#', '')}`)}
                          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                            isDark ? 'hover:bg-gray-600 text-gray-300' : 'hover:bg-gray-100 text-gray-600'
                          }`}
                        >
                          <EyeIcon className="w-4 h-4" />
                          View Details
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
              const riskBadge = getRiskBadge(shipment.riskLevel);

              return (
                <div
                  key={shipment.id}
                  className={`rounded-lg p-4 transition-all duration-300 cursor-pointer hover:shadow-lg ${
                    isDark ? 'bg-gray-800 border border-gray-700 hover:border-gray-600' : 'bg-white shadow-md hover:shadow-xl'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="p-2 rounded-lg flex-shrink-0" style={{ backgroundColor: colors.primaryBg }}>
                        <Ship className="w-4 h-4" style={{ color: colors.primary }} />
                      </div>
                      <div>
                        <h3 className={`font-bold text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          {shipment.id}
                        </h3>
                        <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                          {shipment.origin} → {shipment.destination}
                        </p>
                      </div>
                    </div>
                    <span className="text-xs px-2 py-0.5 rounded-full flex items-center gap-1" style={riskBadge}>
                      {riskBadge.icon}
                      {riskBadge.label}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-xs mb-2">
                    <span className={`px-2 py-0.5 rounded-full flex items-center gap-1`} style={statusStyle}>
                      {statusStyle.icon}
                      {shipment.status}
                    </span>
                    {shipment.customsDays > 0 && (
                      <span className={`${shipment.customsDays > 5 ? 'text-red-500' : 'text-yellow-500'}`}>
                        {shipment.customsDays}d in customs
                      </span>
                    )}
                  </div>

                  {shipment.assignedAgent && (
                    <p className={`text-xs flex items-center gap-1 mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      <Users className="w-3 h-3" style={{ color: colors.primary }} />
                      Agent: {shipment.assignedAgent.name}
                    </p>
                  )}

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
                      <Calendar className="w-3 h-3" style={{ color: colors.primary }} />
                      <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>ETA: {shipment.eta}</span>
                    </div>
                    <div className="flex gap-1">
                      {!shipment.assignedAgent && shipment.status !== 'Delivered' && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAssignAgent(shipment);
                          }}
                          className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                          title="Assign Agent"
                        >
                          <UserPlus className="w-4 h-4" style={{ color: colors.primary }} />
                        </button>
                      )}
                     <button
                      onClick={() => navigate(`/importer/assignment/${shipment.id.replace('#', '')}`)}
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

        {filteredShipments.length === 0 && (
          <div className={`text-center py-12 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            <Ship className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <p className="text-lg font-medium">No shipments found</p>
            <p className="text-sm">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

// Helper function to get status color
const getStatusColor = (status) => {
  switch(status) {
    case 'Delivered': return '#10b981';
    case 'In Transit': return '#714b67';
    case 'Customs Clearance': return '#f59e0b';
    default: return '#3b82f6';
  }
};

export default ImporterAssignments;