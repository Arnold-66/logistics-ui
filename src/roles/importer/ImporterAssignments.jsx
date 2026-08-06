// roles/importer/ImporterAssignments.jsx
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
  AlertOctagon,
  Star,
  StarHalf,
  StarOff,
  Filter as FilterIcon,
  Send,
  UserCircle,
  Building2
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
  const [expandedAgentRow, setExpandedAgentRow] = useState(null);
  const [expandedAssignmentRow, setExpandedAssignmentRow] = useState(null);
  const [viewMode, setViewMode] = useState('list');
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedShipment, setSelectedShipment] = useState(null);
  const [selectedAgent, setSelectedAgent] = useState('');
  const [showRisks, setShowRisks] = useState(true);
  const [agentSearch, setAgentSearch] = useState('');
  const [agentFilter, setAgentFilter] = useState('all');
  const [selectedAgentDetails, setSelectedAgentDetails] = useState(null);
  const [isNewAssignment, setIsNewAssignment] = useState(false);
  const [showNotifyModal, setShowNotifyModal] = useState(false);
  const [notifyAgent, setNotifyAgent] = useState(null);
  const [notifyMessage, setNotifyMessage] = useState('');
  const [expandedAssignmentDetails, setExpandedAssignmentDetails] = useState(null);

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
    teal: '#14b8a6',
    indigo: '#6366f1',
    pink: '#ec4899'
  };

  const isDark = darkMode;

  // Available clearing agents with more details
  const clearingAgents = [
    { 
      id: 1, 
      name: 'Swift Clearance Services', 
      email: 'info@swiftclearance.co.ke', 
      phone: '+254 712 345 678', 
      rating: 4.8, 
      reviews: 127,
      specialties: ['Electronics', 'Chemicals', 'Pharmaceuticals'],
      experience: '12 years',
      location: 'Mombasa, Kenya',
      availability: 'Available',
      status: 'active',
      languages: ['English', 'Swahili'],
      certifications: ['Customs Brokers License', 'KRA Certified']
    },
    { 
      id: 2, 
      name: 'Mombasa Port Logistics', 
      email: 'operations@mombasalogistics.com', 
      phone: '+254 723 456 789', 
      rating: 4.5, 
      reviews: 98,
      specialties: ['Machinery', 'Textiles', 'Vehicles'],
      experience: '8 years',
      location: 'Mombasa, Kenya',
      availability: 'Available',
      status: 'active',
      languages: ['English'],
      certifications: ['Customs Brokers License']
    },
    { 
      id: 3, 
      name: 'East Africa Customs Solutions', 
      email: 'support@eacustoms.co.ke', 
      phone: '+254 734 567 890', 
      rating: 4.2, 
      reviews: 76,
      specialties: ['Food Products', 'Construction', 'Electronics'],
      experience: '10 years',
      location: 'Nairobi, Kenya',
      availability: 'Busy',
      status: 'active',
      languages: ['English', 'Swahili', 'French'],
      certifications: ['Customs Brokers License', 'EAC Certified']
    },
    { 
      id: 4, 
      name: 'TransGlobal Clearing', 
      email: 'info@transglobal.com', 
      phone: '+254 745 678 901', 
      rating: 3.9, 
      reviews: 54,
      specialties: ['General Cargo', 'Vehicles', 'Heavy Machinery'],
      experience: '15 years',
      location: 'Dar es Salaam, Tanzania',
      availability: 'Available',
      status: 'active',
      languages: ['English', 'Swahili'],
      certifications: ['Customs Brokers License', 'TRA Certified']
    },
    { 
      id: 5, 
      name: 'Premium Clearance Services', 
      email: 'info@premiumclearance.com', 
      phone: '+256 712 345 678', 
      rating: 4.9, 
      reviews: 203,
      specialties: ['Electronics', 'Pharmaceuticals', 'Medical Equipment', 'Chemicals'],
      experience: '20 years',
      location: 'Kampala, Uganda',
      availability: 'Available',
      status: 'active',
      languages: ['English', 'Swahili', 'Luganda'],
      certifications: ['Customs Brokers License', 'URA Certified', 'ISO Certified']
    },
    { 
      id: 6, 
      name: 'Eagle Eye Customs', 
      email: 'info@eagleeye.com', 
      phone: '+254 756 789 012', 
      rating: 4.6, 
      reviews: 143,
      specialties: ['Perishables', 'Food Products', 'Agricultural Goods'],
      experience: '7 years',
      location: 'Mombasa, Kenya',
      availability: 'Booked',
      status: 'active',
      languages: ['English', 'Swahili'],
      certifications: ['Customs Brokers License', 'KRA Certified']
    },
    { 
      id: 7, 
      name: 'FastTrack Logistics', 
      email: 'info@fasttracklogistics.com', 
      phone: '+254 767 890 123', 
      rating: 4.4, 
      reviews: 89,
      specialties: ['Automotive Parts', 'Machinery', 'Electronics'],
      experience: '6 years',
      location: 'Nairobi, Kenya',
      availability: 'Available',
      status: 'active',
      languages: ['English'],
      certifications: ['Customs Brokers License']
    },
    { 
      id: 8, 
      name: 'Coastal Clearance Agency', 
      email: 'info@coastalclearance.com', 
      phone: '+255 789 012 345', 
      rating: 4.1, 
      reviews: 67,
      specialties: ['Textiles', 'General Cargo', 'Construction Materials'],
      experience: '9 years',
      location: 'Dar es Salaam, Tanzania',
      availability: 'Available',
      status: 'active',
      languages: ['English', 'Swahili'],
      certifications: ['Customs Brokers License', 'TRA Certified']
    }
  ];

  // Assignments grouped by agent
  const assignmentsByAgent = {
    'Swift Clearance Services': [
      {
        id: '#458',
        container: 'MSKU-458921',
        cargo: 'Premium Electronics Components',
        origin: 'Shanghai, China',
        destination: 'Port of Mombasa',
        status: 'In Transit',
        progress: 70,
        eta: '12 Aug 2026',
        clearanceProgress: 45,
        documents: ['Bill of Lading', 'Commercial Invoice', 'Packing List'],
        statuses: {
          documents: 'Submitted',
          inspection: 'Pending',
          duty: 'Not Started',
          release: 'Pending'
        },
        lastUpdate: '2 hours ago',
        customsDays: 0,
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
        container: 'IN-782341',
        cargo: 'Textile Fabrics',
        origin: 'Mumbai, India',
        destination: 'Kampala, Uganda',
        status: 'Customs Clearance',
        progress: 45,
        eta: '18 Aug 2026',
        clearanceProgress: 30,
        documents: ['Bill of Lading', 'Commercial Invoice', 'Packing List', 'UNBS CoC'],
        statuses: {
          documents: 'In Progress',
          inspection: 'Pending',
          duty: 'Not Started',
          release: 'Pending'
        },
        lastUpdate: '5 hours ago',
        customsDays: 4,
        milestones: [
          { stage: 'Supplier dispatched goods', date: '01 Aug 2026', completed: true },
          { stage: 'Vessel departed', date: '08 Aug 2026', completed: true },
          { stage: 'Arrived Mombasa', date: '12 Aug 2026', completed: true },
          { stage: 'Customs inspection', date: '14 Aug 2026', completed: false },
          { stage: 'Delivery', date: '18 Aug 2026', completed: false },
        ]
      }
    ],
    'Mombasa Port Logistics': [
      {
        id: '#460',
        container: 'SA-456732',
        cargo: 'Industrial Machinery',
        origin: 'Durban, South Africa',
        destination: 'Nairobi, Kenya',
        status: 'Delivered',
        progress: 100,
        eta: '05 Aug 2026',
        clearanceProgress: 100,
        documents: ['Bill of Lading', 'Commercial Invoice', 'Packing List', 'Delivery Note'],
        statuses: {
          documents: 'Completed',
          inspection: 'Completed',
          duty: 'Completed',
          release: 'Completed'
        },
        lastUpdate: '2 days ago',
        customsDays: 0,
        milestones: [
          { stage: 'Supplier dispatched goods', date: '10 Jul 2026', completed: true },
          { stage: 'Vessel departed', date: '20 Jul 2026', completed: true },
          { stage: 'Arrived Mombasa', date: '25 Jul 2026', completed: true },
          { stage: 'Customs inspection', date: '28 Jul 2026', completed: true },
          { stage: 'Delivery', date: '05 Aug 2026', completed: true },
        ]
      }
    ],
    'East Africa Customs Solutions': [
      {
        id: '#462',
        container: 'DE-782341',
        cargo: 'Automotive Components',
        origin: 'Hamburg, Germany',
        destination: 'Kampala, Uganda',
        status: 'Customs Clearance',
        progress: 60,
        eta: '15 Sep 2026',
        clearanceProgress: 40,
        documents: ['Bill of Lading', 'Commercial Invoice', 'Packing List', 'Certificate of Origin', 'UNBS PVoC'],
        statuses: {
          documents: 'In Progress',
          inspection: 'Pending',
          duty: 'Not Started',
          release: 'Pending'
        },
        lastUpdate: '3 hours ago',
        customsDays: 7,
        milestones: [
          { stage: 'Supplier dispatched goods', date: '20 Aug 2026', completed: true },
          { stage: 'Vessel departed', date: '25 Aug 2026', completed: true },
          { stage: 'Arrived Mombasa', date: '10 Sep 2026', completed: true },
          { stage: 'Customs inspection', date: '12 Sep 2026', completed: false },
          { stage: 'Delivery', date: '15 Sep 2026', completed: false },
        ]
      }
    ]
  };

  // Unassigned shipments
  const unassignedShipments = [
    {
      id: '#461',
      container: 'JP-893421',
      cargo: 'Packaging Materials',
      origin: 'Tokyo, Japan',
      destination: 'Port of Mombasa',
      status: 'In Transit',
      progress: 25,
      eta: '28 Sep 2026',
      clearanceProgress: 0,
      documents: ['Bill of Lading', 'Commercial Invoice', 'Packing List'],
      statuses: {
        documents: 'Not Started',
        inspection: 'Pending',
        duty: 'Not Started',
        release: 'Pending'
      },
      lastUpdate: '1 day ago',
      customsDays: 0,
      milestones: [
        { stage: 'Supplier dispatched goods', date: '01 Sep 2026', completed: true },
        { stage: 'Vessel departed', date: '05 Sep 2026', completed: true },
        { stage: 'Arrived Mombasa', date: '25 Sep 2026', completed: false },
        { stage: 'Customs inspection', date: '28 Sep 2026', completed: false },
        { stage: 'Delivery', date: '30 Sep 2026', completed: false },
      ]
    }
  ];

  // Get unique agents with their assignments
  const getAgentAssignments = () => {
    const agentList = [];
    clearingAgents.forEach(agent => {
      const assignments = assignmentsByAgent[agent.name] || [];
      if (assignments.length > 0 || unassignedShipments.length > 0) {
        agentList.push({
          ...agent,
          assignments: assignments,
          unassignedCount: unassignedShipments.length
        });
      }
    });
    return agentList;
  };

  const agentAssignments = getAgentAssignments();

  // Toggle agent row expansion
  const toggleAgentExpand = (agentId) => {
    setExpandedAgentRow(expandedAgentRow === agentId ? null : agentId);
    setExpandedAssignmentDetails(null);
  };

  // Toggle assignment details expansion
  const toggleAssignmentExpand = (assignmentId) => {
    setExpandedAssignmentDetails(expandedAssignmentDetails === assignmentId ? null : assignmentId);
  };

  // Handle notify agent
  const handleNotifyAgent = (agent) => {
    setNotifyAgent(agent);
    setNotifyMessage(`Dear ${agent.contactPerson || agent.name},\n\nI hope this message finds you well. I would like to check on the status of the following assignments:\n\n${agent.assignments.map(a => `- ${a.id} (${a.container}) - ${a.status}`).join('\n')}\n\nPlease provide an update at your earliest convenience.\n\nBest regards,\n${user?.name || 'Importer'}`);
    setShowNotifyModal(true);
  };

  const confirmNotify = () => {
    console.log(`Notifying ${notifyAgent.name}: ${notifyMessage}`);
    setShowNotifyModal(false);
    setNotifyAgent(null);
    setNotifyMessage('');
    alert(`Notification sent to ${notifyAgent.name}`);
  };

  // Get clearance progress color
  const getProgressColor = (progress) => {
    if (progress >= 80) return colors.success;
    if (progress >= 50) return colors.warning;
    return colors.danger;
  };

  // Get status badge
  const getStatusBadge = (status) => {
    const statusMap = {
      'In Transit': { bg: colors.primary + '20', color: colors.primary, icon: <Ship className="w-3 h-3" /> },
      'Customs Clearance': { bg: colors.warning + '20', color: colors.warning, icon: <Shield className="w-3 h-3" /> },
      'Delivered': { bg: colors.success + '20', color: colors.success, icon: <CheckCircle className="w-3 h-3" /> },
      'Pending': { bg: colors.info + '20', color: colors.info, icon: <Clock className="w-3 h-3" /> }
    };
    return statusMap[status] || statusMap['Pending'];
  };

  // Render Notify Modal
  const NotifyModal = () => {
    if (!showNotifyModal || !notifyAgent) return null;

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
           onClick={() => setShowNotifyModal(false)}>
        <div
          className="w-full max-w-md rounded-xl shadow-2xl overflow-hidden bg-white dark:bg-gray-800"
          onClick={(e) => e.stopPropagation()}
        >
          <div className={`p-4 border-b ${isDark ? 'border-gray-700' : 'border-gray-200'} flex items-center justify-between`}
            style={{ backgroundColor: colors.info + '10' }}>
            <div className="flex items-center gap-3">
              <MessageSquare className="w-5 h-5" style={{ color: colors.info }} />
              <h3 className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Notify {notifyAgent.name}
              </h3>
            </div>
            <button
              onClick={() => setShowNotifyModal(false)}
              className="p-1 rounded-lg transition-colors hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-4">
            <div className="mb-4">
              <label className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                To: {notifyAgent.name}
              </label>
              <p className={`text-xs mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                {notifyAgent.email} • {notifyAgent.phone}
              </p>
            </div>
            <div className="mb-4">
              <label className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Message
              </label>
              <textarea
                value={notifyMessage}
                onChange={(e) => setNotifyMessage(e.target.value)}
                rows="8"
                className={`w-full mt-1 px-3 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2 ${
                  isDark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900'
                }`}
                style={{ focusRingColor: colors.primary }}
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setShowNotifyModal(false)}
                className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isDark ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Cancel
              </button>
              <button
                onClick={confirmNotify}
                className="flex-1 px-4 py-2 rounded-lg text-sm font-medium text-white transition-all duration-200 hover:opacity-90 flex items-center justify-center gap-2"
                style={{ backgroundColor: colors.info }}
              >
                <Send className="w-4 h-4" />
                Send Message
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Render stars for rating
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    
    return (
      <div className="flex items-center gap-0.5 inline-flex">
        {[...Array(fullStars)].map((_, i) => (
          <Star key={`full-${i}`} className="w-3 h-3 fill-current text-yellow-400" />
        ))}
        {halfStar && <StarHalf className="w-3 h-3 fill-current text-yellow-400" />}
        {[...Array(emptyStars)].map((_, i) => (
          <StarOff key={`empty-${i}`} className="w-3 h-3 text-gray-300 dark:text-gray-600" />
        ))}
      </div>
    );
  };

  // Render expanded assignment details (milestones)
  const renderExpandedAssignmentDetails = (assignment) => {
    if (expandedAssignmentDetails !== assignment.id) return null;

    return (
      <tr className={`border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
        <td colSpan="7" className="p-0">
          <div className={`p-4 ${isDark ? 'bg-gray-800/80' : 'bg-gray-50'}`}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Milestones */}
              <div>
                <h4 className={`text-sm font-medium mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Shipment Milestones
                </h4>
                <div className="space-y-2">
                  {assignment.milestones.map((milestone, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="relative flex items-center justify-center w-5">
                        {milestone.completed ? (
                          <CheckCircle className="w-4 h-4" style={{ color: colors.success }} />
                        ) : (
                          <Clock className="w-4 h-4" style={{ color: colors.warning }} />
                        )}
                        {idx < assignment.milestones.length - 1 && (
                          <div className={`absolute top-5 w-0.5 h-4 ${
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

              {/* Document Status */}
              <div>
                <h4 className={`text-sm font-medium mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Document Status
                </h4>
                <div className="space-y-1">
                  {Object.entries(assignment.statuses).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between text-sm">
                      <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>
                        {key.charAt(0).toUpperCase() + key.slice(1)}
                      </span>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        value === 'Completed' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                        value === 'In Progress' || value === 'Submitted' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' :
                        value === 'Not Started' ? 'bg-gray-100 text-gray-600 dark:bg-gray-600 dark:text-gray-400' :
                        'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                      }`}>
                        {value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </td>
      </tr>
    );
  };

  return (
    <div className="min-h-screen w-full p-4 md:p-6" style={{ backgroundColor: isDark ? '#1a1a2e' : '#f8fafc' }}>
      <NotifyModal />
      
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className={`text-2xl md:text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Clearing Agent Assignments
            </h1>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              Manage clearing agents and track clearance progress
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => {
                setIsNewAssignment(true);
                setShowAssignModal(true);
              }}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:shadow-lg"
              style={{
                backgroundColor: colors.primary,
                color: 'white'
              }}
            >
              <Plus className="w-4 h-4" />
              New Assignment
            </button>
          </div>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6">
          <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white shadow-sm'}`}>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" style={{ color: colors.primary }} />
              <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Active Agents</span>
            </div>
            <p className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {agentAssignments.filter(a => a.assignments.length > 0).length}
            </p>
          </div>
          <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white shadow-sm'}`}>
            <div className="flex items-center gap-2">
              <Ship className="w-4 h-4" style={{ color: colors.primary }} />
              <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Total Assignments</span>
            </div>
            <p className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {Object.values(assignmentsByAgent).reduce((acc, curr) => acc + curr.length, 0) + unassignedShipments.length}
            </p>
          </div>
          <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white shadow-sm'}`}>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4" style={{ color: colors.warning }} />
              <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>In Customs</span>
            </div>
            <p className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {Object.values(assignmentsByAgent).reduce((acc, curr) => 
                acc + curr.filter(a => a.status === 'Customs Clearance').length, 0
              )}
            </p>
          </div>
          <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white shadow-sm'}`}>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" style={{ color: colors.success }} />
              <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Completed</span>
            </div>
            <p className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {Object.values(assignmentsByAgent).reduce((acc, curr) => 
                acc + curr.filter(a => a.status === 'Delivered').length, 0
              )}
            </p>
          </div>
        </div>

        {/* Agents Table */}
        <div className={`rounded-lg overflow-hidden ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-md'}`}>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className={`border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                  <th className={`text-left py-3 px-4 font-medium text-xs uppercase tracking-wider ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    Agent
                  </th>
                  <th className={`text-left py-3 px-4 font-medium text-xs uppercase tracking-wider ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    Location
                  </th>
                  <th className={`text-left py-3 px-4 font-medium text-xs uppercase tracking-wider ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    Rating
                  </th>
                  <th className={`text-left py-3 px-4 font-medium text-xs uppercase tracking-wider ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    Assignments
                  </th>
                  <th className={`text-left py-3 px-4 font-medium text-xs uppercase tracking-wider ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    Status
                  </th>
                  <th className={`text-left py-3 px-4 font-medium text-xs uppercase tracking-wider ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {agentAssignments.map((agent) => {
                  const isExpanded = expandedAgentRow === agent.id;
                  const totalAssignments = agent.assignments.length + (agent.unassignedCount || 0);
                  
                  return (
                    <React.Fragment key={agent.id}>
                      {/* Agent Row */}
                      <tr 
                        className={`border-b cursor-pointer transition-colors ${
                          isDark ? 'border-gray-700 hover:bg-gray-700' : 'border-gray-100 hover:bg-gray-50'
                        } ${isExpanded ? (isDark ? 'bg-gray-700' : 'bg-gray-100') : ''}`}
                        onClick={() => toggleAgentExpand(agent.id)}
                      >
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg flex-shrink-0" style={{ backgroundColor: colors.primaryBg }}>
                              <Shield className="w-4 h-4" style={{ color: colors.primary }} />
                            </div>
                            <div>
                              <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                {agent.name}
                              </p>
                              <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                                {agent.experience} • {agent.specialties.slice(0, 2).join(', ')}
                                {agent.specialties.length > 2 && ' ...'}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <span className={`text-xs ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                            <MapPin className="w-3 h-3 inline mr-1" style={{ color: colors.primary }} />
                            {agent.location}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            {renderStars(agent.rating)}
                            <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                              ({agent.reviews})
                            </span>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            {totalAssignments}
                          </span>
                          <span className={`text-xs ml-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                            ({agent.assignments.length} assigned)
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            agent.availability === 'Available' 
                              ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                              : agent.availability === 'Busy'
                              ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                              : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                          }`}>
                            {agent.availability}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-1">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleNotifyAgent(agent);
                              }}
                              className="p-1.5 rounded-lg transition-colors hover:bg-gray-100 dark:hover:bg-gray-600"
                              style={{ color: colors.info }}
                              title="Send Message"
                            >
                              <MessageSquare className="w-4 h-4" />
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleAgentExpand(agent.id);
                              }}
                              className="p-1.5 rounded-lg transition-colors hover:bg-gray-100 dark:hover:bg-gray-600"
                              style={{ color: colors.primary }}
                              title={isExpanded ? 'Hide Assignments' : 'View Assignments'}
                            >
                              {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                            </button>
                          </div>
                        </td>
                      </tr>

                      {/* Expanded Assignments Table */}
                      {isExpanded && (
                        <tr className={`border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                          <td colSpan="6" className="p-0">
                            <div className={`p-4 ${isDark ? 'bg-gray-800/80' : 'bg-gray-50'}`}>
                              <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                  <thead>
                                    <tr className={`border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                                      <th className={`text-left py-2 px-3 font-medium text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                                        Shipment
                                      </th>
                                      <th className={`text-left py-2 px-3 font-medium text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                                        Container
                                      </th>
                                      <th className={`text-left py-2 px-3 font-medium text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                                        Cargo
                                      </th>
                                      <th className={`text-left py-2 px-3 font-medium text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                                        Status
                                      </th>
                                      <th className={`text-left py-2 px-3 font-medium text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                                        Clearance
                                      </th>
                                      <th className={`text-left py-2 px-3 font-medium text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                                        ETA
                                      </th>
                                      <th className={`text-left py-2 px-3 font-medium text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                                        Actions
                                      </th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {agent.assignments.map((assignment) => {
                                      const statusStyle = getStatusBadge(assignment.status);
                                      const isAssignmentExpanded = expandedAssignmentDetails === assignment.id;
                                      
                                      return (
                                        <React.Fragment key={assignment.id}>
                                          <tr className={`border-b ${isDark ? 'border-gray-700' : 'border-gray-100'} hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors`}>
                                            <td className="py-2 px-3">
                                              <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                                {assignment.id}
                                              </span>
                                            </td>
                                            <td className="py-2 px-3">
                                              <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>
                                                {assignment.container}
                                              </span>
                                            </td>
                                            <td className="py-2 px-3">
                                              <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>
                                                {assignment.cargo}
                                              </span>
                                            </td>
                                            <td className="py-2 px-3">
                                              <span className={`text-xs px-2 py-0.5 rounded-full flex items-center gap-1 w-fit`} style={statusStyle}>
                                                {statusStyle.icon}
                                                {assignment.status}
                                              </span>
                                            </td>
                                            <td className="py-2 px-3">
                                              <div className="flex items-center gap-2">
                                                <div className="w-16 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                                                  <div 
                                                    className="h-full rounded-full transition-all duration-500"
                                                    style={{ 
                                                      width: `${assignment.clearanceProgress}%`,
                                                      backgroundColor: getProgressColor(assignment.clearanceProgress)
                                                    }}
                                                  />
                                                </div>
                                                <span className={`text-xs font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                                  {assignment.clearanceProgress}%
                                                </span>
                                              </div>
                                            </td>
                                            <td className="py-2 px-3">
                                              <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>
                                                {assignment.eta}
                                              </span>
                                            </td>
                                            <td className="py-2 px-3">
                                              <div className="flex items-center gap-1">
                                                <button
                                                  className="p-1 rounded-lg transition-colors hover:bg-gray-100 dark:hover:bg-gray-600"
                                                  style={{ color: colors.primary }}
                                                  title="View Details"
                                                  onClick={() => navigate(`/importer/assignment/${assignment.id.replace('#', '')}`)}
                                                >
                                                  <Eye className="w-3.5 h-3.5" />
                                                </button>
                                                <button
                                                  className="p-1 rounded-lg transition-colors hover:bg-gray-100 dark:hover:bg-gray-600"
                                                  style={{ color: colors.primary }}
                                                  title="View Timeline"
                                                  onClick={(e) => {
                                                    e.stopPropagation();
                                                    toggleAssignmentExpand(assignment.id);
                                                  }}
                                                >
                                                  {isAssignmentExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                                                </button>
                                              </div>
                                            </td>
                                          </tr>
                                          {renderExpandedAssignmentDetails(assignment)}
                                        </React.Fragment>
                                      );
                                    })}
                                    
                                    {/* Unassigned within agent */}
                                    {agent.unassignedCount > 0 && (
                                      <tr className={`border-b ${isDark ? 'border-gray-700' : 'border-gray-100'}`}>
                                        <td colSpan="7" className="py-3 px-4 text-center">
                                          <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                                            {agent.unassignedCount} unassigned shipment{agent.unassignedCount !== 1 ? 's' : ''} available
                                          </span>
                                          <button
                                            onClick={() => {
                                              setIsNewAssignment(true);
                                              setShowAssignModal(true);
                                            }}
                                            className="ml-3 text-sm font-medium hover:underline"
                                            style={{ color: colors.primary }}
                                          >
                                            Assign Now
                                          </button>
                                        </td>
                                      </tr>
                                    )}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })}

                {/* Unassigned Shipments Row */}
                {unassignedShipments.length > 0 && (
                  <tr className={`border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                    <td colSpan="6" className="p-0">
                      <div className={`p-4 ${isDark ? 'bg-gray-800/80' : 'bg-gray-50'}`}>
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <AlertCircle className="w-5 h-5" style={{ color: colors.warning }} />
                            <h4 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                              Unassigned Shipments
                            </h4>
                            <span className={`text-xs px-2 py-0.5 rounded-full ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`}>
                              {unassignedShipments.length}
                            </span>
                          </div>
                        </div>
                        <div className="overflow-x-auto">
                          <table className="w-full text-sm">
                            <thead>
                              <tr className={`border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                                <th className={`text-left py-2 px-3 font-medium text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                                  Shipment
                                </th>
                                <th className={`text-left py-2 px-3 font-medium text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                                  Container
                                </th>
                                <th className={`text-left py-2 px-3 font-medium text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                                  Cargo
                                </th>
                                <th className={`text-left py-2 px-3 font-medium text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                                  Status
                                </th>
                                <th className={`text-left py-2 px-3 font-medium text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                                  ETA
                                </th>
                                <th className={`text-left py-2 px-3 font-medium text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                                  Action
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {unassignedShipments.map((shipment) => {
                                const statusStyle = getStatusBadge(shipment.status);
                                return (
                                  <tr key={shipment.id} className={`border-b ${isDark ? 'border-gray-700' : 'border-gray-100'}`}>
                                    <td className="py-2 px-3">
                                      <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                        {shipment.id}
                                      </span>
                                    </td>
                                    <td className="py-2 px-3">
                                      <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>
                                        {shipment.container}
                                      </span>
                                    </td>
                                    <td className="py-2 px-3">
                                      <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>
                                        {shipment.cargo}
                                      </span>
                                    </td>
                                    <td className="py-2 px-3">
                                      <span className={`text-xs px-2 py-0.5 rounded-full flex items-center gap-1 w-fit`} style={statusStyle}>
                                        {statusStyle.icon}
                                        {shipment.status}
                                      </span>
                                    </td>
                                    <td className="py-2 px-3">
                                      <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>
                                        {shipment.eta}
                                      </span>
                                    </td>
                                    <td className="py-2 px-3">
                                      <button
                                        onClick={() => {
                                          setSelectedShipment(shipment);
                                          setShowAssignModal(true);
                                        }}
                                        className="flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-medium text-white transition-all duration-200 hover:opacity-90"
                                        style={{ backgroundColor: colors.primary }}
                                      >
                                        <UserPlus className="w-3 h-3" />
                                        Assign
                                      </button>
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImporterAssignments;