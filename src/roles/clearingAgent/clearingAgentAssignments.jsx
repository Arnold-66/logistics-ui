import React, { useState, useContext } from 'react';
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
  Home,
  Edit,
  Save,
  Upload,
  Printer,
  Share2,
  Link,
  MessageSquare,
  Building,
  User,
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
  Plus,
  List,
  Grid
} from 'lucide-react';
import { ThemeContext } from "../../context/themeContext";
import { useNavigate } from 'react-router-dom';

const ClearingAgentAssignments = () => {
  const navigate = useNavigate();
  const { darkMode } = useContext(ThemeContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  const [expandedAssignment, setExpandedAssignment] = useState(null);
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

  // All assignments for the clearing agent
  const assignments = [
    {
      id: 1,
      shipmentId: '#458',
      importer: 'ImportFlow Ltd',
      importerContact: 'John Doe',
      goods: 'Electronics Components',
      quantity: 450,
      weight: '12.5 tons',
      status: 'in_progress',
      priority: 'high',
      assignedDate: '2026-08-10',
      dueDate: '2026-08-15',
      progress: 70,
      stage: 'Customs Inspection',
      location: 'Port of Mombasa',
      container: 'MSKU-458921',
      destination: 'Kampala, Uganda',
      lastUpdate: '2 hours ago',
      statusColor: colors.primary,
      documents: [
        { name: 'Commercial Invoice', status: 'approved' },
        { name: 'Bill of Lading', status: 'approved' },
        { name: 'PVoC', status: 'pending' },
        { name: 'COC', status: 'pending' }
      ],
      timeline: [
        { stage: 'Assignment Received', date: '2026-08-10 09:00', completed: true },
        { stage: 'Document Review', date: '2026-08-10 14:30', completed: true },
        { stage: 'Customs Inspection', date: '2026-08-11 10:00', completed: false },
        { stage: 'Customs Clearance', date: '2026-08-13', completed: false },
        { stage: 'Release to Importer', date: '2026-08-15', completed: false }
      ]
    },
    {
      id: 2,
      shipmentId: '#459',
      importer: 'TechImport Ltd',
      importerContact: 'Jane Smith',
      goods: 'Industrial Machinery',
      quantity: 120,
      weight: '8.2 tons',
      status: 'pending',
      priority: 'critical',
      assignedDate: '2026-08-12',
      dueDate: '2026-08-18',
      progress: 25,
      stage: 'Document Review',
      location: 'Customs Checkpoint',
      container: 'IN-782341',
      destination: 'Nairobi, Kenya',
      lastUpdate: '5 hours ago',
      statusColor: colors.warning,
      documents: [
        { name: 'Commercial Invoice', status: 'approved' },
        { name: 'COC', status: 'pending' },
        { name: 'Freight Invoice', status: 'pending' }
      ],
      timeline: [
        { stage: 'Assignment Received', date: '2026-08-12 10:00', completed: true },
        { stage: 'Document Review', date: '2026-08-13', completed: false },
        { stage: 'Customs Inspection', date: '2026-08-15', completed: false },
        { stage: 'Customs Clearance', date: '2026-08-17', completed: false },
        { stage: 'Release to Importer', date: '2026-08-18', completed: false }
      ]
    },
    {
      id: 3,
      shipmentId: '#460',
      importer: 'Global Traders Ltd',
      importerContact: 'David Mbeki',
      goods: 'Textile Fabrics',
      quantity: 280,
      weight: '10.8 tons',
      status: 'completed',
      priority: 'medium',
      assignedDate: '2026-08-05',
      dueDate: '2026-08-10',
      progress: 100,
      stage: 'Cleared',
      location: 'Nairobi Warehouse',
      container: 'SA-456732',
      destination: 'Kigali, Rwanda',
      lastUpdate: '2 days ago',
      statusColor: colors.success,
      documents: [
        { name: 'Commercial Invoice', status: 'approved' },
        { name: 'Proof of Payment', status: 'approved' },
        { name: 'COC', status: 'approved' }
      ],
      timeline: [
        { stage: 'Assignment Received', date: '2026-08-05 09:00', completed: true },
        { stage: 'Document Review', date: '2026-08-06 14:00', completed: true },
        { stage: 'Customs Inspection', date: '2026-08-07 10:00', completed: true },
        { stage: 'Customs Clearance', date: '2026-08-08', completed: true },
        { stage: 'Release to Importer', date: '2026-08-10 16:00', completed: true }
      ]
    },
    {
      id: 4,
      shipmentId: '#461',
      importer: 'East African Traders',
      importerContact: 'Sarah Ochieng',
      goods: 'Chemicals',
      quantity: 90,
      weight: '4.5 tons',
      status: 'in_progress',
      priority: 'high',
      assignedDate: '2026-08-13',
      dueDate: '2026-08-20',
      progress: 45,
      stage: 'Customs Inspection',
      location: 'Mombasa Port',
      container: 'CH-672134',
      destination: 'Kampala, Uganda',
      lastUpdate: '3 hours ago',
      statusColor: colors.primary,
      documents: [
        { name: 'Commercial Invoice', status: 'approved' },
        { name: 'Bill of Lading', status: 'approved' },
        { name: 'COC', status: 'pending' },
        { name: 'MSDS', status: 'pending' }
      ],
      timeline: [
        { stage: 'Assignment Received', date: '2026-08-13 11:00', completed: true },
        { stage: 'Document Review', date: '2026-08-14 09:00', completed: true },
        { stage: 'Customs Inspection', date: '2026-08-14 14:00', completed: false },
        { stage: 'Customs Clearance', date: '2026-08-18', completed: false },
        { stage: 'Release to Importer', date: '2026-08-20', completed: false }
      ]
    },
    {
      id: 5,
      shipmentId: '#462',
      importer: 'Mombasa Traders Ltd',
      importerContact: 'Peter Mwangi',
      goods: 'Food Products',
      quantity: 500,
      weight: '15.2 tons',
      status: 'pending',
      priority: 'high',
      assignedDate: '2026-08-14',
      dueDate: '2026-08-22',
      progress: 10,
      stage: 'Assignment Received',
      location: 'Mombasa Port',
      container: 'MSKU-459002',
      destination: 'Nairobi, Kenya',
      lastUpdate: '1 hour ago',
      statusColor: colors.warning,
      documents: [
        { name: 'Commercial Invoice', status: 'pending' },
        { name: 'Bill of Lading', status: 'pending' },
        { name: 'COC', status: 'pending' }
      ],
      timeline: [
        { stage: 'Assignment Received', date: '2026-08-14 09:00', completed: true },
        { stage: 'Document Review', date: '2026-08-15', completed: false },
        { stage: 'Customs Inspection', date: '2026-08-17', completed: false },
        { stage: 'Customs Clearance', date: '2026-08-20', completed: false },
        { stage: 'Release to Importer', date: '2026-08-22', completed: false }
      ]
    },
    {
      id: 6,
      shipmentId: '#463',
      importer: 'Uganda Importers Ltd',
      importerContact: 'Grace Akello',
      goods: 'Construction Materials',
      quantity: 350,
      weight: '22.5 tons',
      status: 'completed',
      priority: 'medium',
      assignedDate: '2026-08-01',
      dueDate: '2026-08-08',
      progress: 100,
      stage: 'Cleared',
      location: 'Kampala Warehouse',
      container: 'SA-456733',
      destination: 'Kampala, Uganda',
      lastUpdate: '3 days ago',
      statusColor: colors.success,
      documents: [
        { name: 'Commercial Invoice', status: 'approved' },
        { name: 'Bill of Lading', status: 'approved' },
        { name: 'COC', status: 'approved' }
      ],
      timeline: [
        { stage: 'Assignment Received', date: '2026-08-01 08:00', completed: true },
        { stage: 'Document Review', date: '2026-08-02 10:00', completed: true },
        { stage: 'Customs Inspection', date: '2026-08-03 14:00', completed: true },
        { stage: 'Customs Clearance', date: '2026-08-05', completed: true },
        { stage: 'Release to Importer', date: '2026-08-08 16:00', completed: true }
      ]
    }
  ];

  const getStatusBadge = (status) => {
    const statusMap = {
      'pending': { 
        backgroundColor: colors.warning + '20', 
        color: colors.warning, 
        icon: <Clock className="w-3 h-3" />,
        label: 'Pending'
      },
      'in_progress': { 
        backgroundColor: colors.info + '20', 
        color: colors.info, 
        icon: <RefreshCw className="w-3 h-3" />,
        label: 'In Progress'
      },
      'completed': { 
        backgroundColor: colors.success + '20', 
        color: colors.success, 
        icon: <CheckCircle className="w-3 h-3" />,
        label: 'Completed'
      }
    };
    return statusMap[status] || statusMap['pending'];
  };

  const getPriorityBadge = (priority) => {
    const priorityMap = {
      'critical': { backgroundColor: colors.danger + '30', color: colors.danger, label: 'Critical' },
      'high': { backgroundColor: colors.danger + '20', color: colors.danger, label: 'High' },
      'medium': { backgroundColor: colors.warning + '20', color: colors.warning, label: 'Medium' },
      'low': { backgroundColor: colors.info + '20', color: colors.info, label: 'Low' }
    };
    return priorityMap[priority] || priorityMap['medium'];
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'completed': return colors.success;
      case 'in_progress': return colors.primary;
      case 'pending': return colors.warning;
      default: return colors.info;
    }
  };

  const filteredAssignments = assignments.filter(item => {
    const matchesSearch = item.shipmentId.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.importer.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.goods.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || item.status === filterStatus;
    const matchesPriority = filterPriority === 'all' || item.priority === filterPriority;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const toggleExpand = (id) => {
    if (expandedAssignment === id) {
      setExpandedAssignment(null);
    } else {
      setExpandedAssignment(id);
    }
  };

  // Stats
  const totalAssignments = assignments.length;
  const pendingAssignments = assignments.filter(a => a.status === 'pending').length;
  const inProgressAssignments = assignments.filter(a => a.status === 'in_progress').length;
  const completedAssignments = assignments.filter(a => a.status === 'completed').length;

  return (
    <div className="min-h-screen w-full p-4 md:p-6" style={{ backgroundColor: isDark ? '#1a1a2e' : '#f8fafc' }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className={`text-2xl md:text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              My Assignments
            </h1>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              All shipments assigned to you for clearance
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => window.location.reload()}
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

        {/* Stats Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6">
          <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white shadow-sm'}`}>
            <div className="flex items-center gap-2">
              <ClipboardList className="w-4 h-4" style={{ color: colors.primary }} />
              <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Total</span>
            </div>
            <p className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{totalAssignments}</p>
          </div>
          <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white shadow-sm'}`}>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" style={{ color: colors.warning }} />
              <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Pending</span>
            </div>
            <p className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{pendingAssignments}</p>
          </div>
          <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white shadow-sm'}`}>
            <div className="flex items-center gap-2">
              <RefreshCw className="w-4 h-4" style={{ color: colors.info }} />
              <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>In Progress</span>
            </div>
            <p className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{inProgressAssignments}</p>
          </div>
          <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white shadow-sm'}`}>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" style={{ color: colors.success }} />
              <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Completed</span>
            </div>
            <p className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{completedAssignments}</p>
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
                placeholder="Search by shipment ID, importer, or goods..."
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
                  <option value="pending">Pending</option>
                  <option value="in_progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
                <ChevronDown className={`absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
              </div>
              <div className="relative">
                <Filter className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                <select
                  value={filterPriority}
                  onChange={(e) => setFilterPriority(e.target.value)}
                  className={`pl-10 pr-8 py-2.5 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 appearance-none ${
                    isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                  }`}
                >
                  <option value="all">All Priority</option>
                  <option value="critical">Critical</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
                <ChevronDown className={`absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
              </div>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setFilterStatus('all');
                  setFilterPriority('all');
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
            Showing {filteredAssignments.length} assignments
          </p>
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

        {/* Assignments List/Grid */}
        {viewMode === 'list' ? (
          <div className="space-y-3">
            {filteredAssignments.map((assignment) => {
              const isExpanded = expandedAssignment === assignment.id;
              const statusStyle = getStatusBadge(assignment.status);
              const priorityStyle = getPriorityBadge(assignment.priority);
              const progressColor = getStatusColor(assignment.status);
              const isOverdue = assignment.status !== 'completed' && new Date(assignment.dueDate) < new Date();

              return (
                <div
                  key={assignment.id}
                  className={`rounded-lg transition-all duration-300 ${
                    isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-md'
                  } ${isExpanded ? 'p-4 md:p-6' : 'p-3 md:p-4'}`}
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                    <div className="flex-1 cursor-pointer" onClick={() => toggleExpand(assignment.id)}>
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg flex-shrink-0" style={{ backgroundColor: colors.primaryBg }}>
                          <Ship className="w-5 h-5" style={{ color: colors.primary }} />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 
                              className={`font-bold cursor-pointer hover:underline ${isDark ? 'text-white' : 'text-gray-900'}`}
                              onClick={(e) => {
                                e.stopPropagation();
                                navigate(`/clearing-agent/assignment/${assignment.id}`);
                              }}
                            >
                              {assignment.shipmentId}
                            </h3>
                            <span className="text-xs px-2 py-0.5 rounded-full flex items-center gap-1" style={statusStyle}>
                              {statusStyle.icon}
                              {statusStyle.label}
                            </span>
                            {isOverdue && (
                              <span className="text-xs px-2 py-0.5 rounded-full flex items-center gap-1" style={{ backgroundColor: colors.danger + '20', color: colors.danger }}>
                                <AlertCircle className="w-3 h-3" />
                                Overdue
                              </span>
                            )}
                            <span className="text-xs px-2 py-0.5 rounded-full" style={priorityStyle}>
                              {priorityStyle.label}
                            </span>
                          </div>
                          <p className={`text-xs md:text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                            {assignment.importer} • {assignment.goods}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-wrap items-center gap-3 ml-12 mt-1">
                        <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                          <MapPin className="w-3 h-3 inline mr-1" />
                          {assignment.location}
                        </span>
                        <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                          <Package className="w-3 h-3 inline mr-1" />
                          {assignment.quantity} items
                        </span>
                        <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                          <Calendar className="w-3 h-3 inline mr-1" />
                          Due: {assignment.dueDate}
                        </span>
                        <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                          Stage: {assignment.stage}
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
                            {assignment.progress}%
                          </span>
                        </div>
                        <div className="w-24 md:w-32 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full rounded-full transition-all duration-500"
                            style={{ 
                              width: `${assignment.progress}%`,
                              backgroundColor: progressColor
                            }}
                          />
                        </div>
                      </div>
                      <button
                        onClick={() => navigate(`/clearing-agent/assignment/${assignment.id}`)}
                        className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" style={{ color: colors.primary }} />
                      </button>
                      <button
                        onClick={() => toggleExpand(assignment.id)}
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
                      {/* Documents Status */}
                      <div>
                        <h4 className={`text-sm font-medium mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          Document Status
                        </h4>
                        <div className="grid grid-cols-2 gap-2">
                          {assignment.documents.map((doc, idx) => (
                            <div key={idx} className={`flex items-center justify-between p-2 rounded ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                              <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{doc.name}</span>
                              <span className={`text-xs px-2 py-0.5 rounded-full ${
                                doc.status === 'approved' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                              }`}>
                                {doc.status === 'approved' ? '✅ Approved' : '⏳ Pending'}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Timeline Preview */}
                      <div>
                        <h4 className={`text-sm font-medium mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          Timeline
                        </h4>
                        <div className="space-y-1">
                          {assignment.timeline.slice(0, 3).map((item, idx) => (
                            <div key={idx} className="flex items-center gap-3">
                              {item.completed ? (
                                <CheckCircle className="w-3 h-3 text-green-500" />
                              ) : (
                                <Clock className="w-3 h-3 text-yellow-500" />
                              )}
                              <span className={`text-sm ${item.completed ? 'line-through' : ''} ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                {item.stage}
                              </span>
                            </div>
                          ))}
                          {assignment.timeline.length > 3 && (
                            <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                              +{assignment.timeline.length - 3} more stages
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 pt-2">
                        <button
                          onClick={() => navigate(`/clearing-agent/assignment/${assignment.id}`)}
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
          </div>
        ) : (
          // Grid View
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredAssignments.map((assignment) => {
              const statusStyle = getStatusBadge(assignment.status);
              const priorityStyle = getPriorityBadge(assignment.priority);
              const progressColor = getStatusColor(assignment.status);

              return (
                <div
                  key={assignment.id}
                  className={`rounded-lg p-4 transition-all duration-300 cursor-pointer hover:shadow-lg ${
                    isDark ? 'bg-gray-800 border border-gray-700 hover:border-gray-600' : 'bg-white shadow-md hover:shadow-xl'
                  }`}
                  onClick={() => navigate(`/clearing-agent/assignment/${assignment.id}`)}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="p-2 rounded-lg flex-shrink-0" style={{ backgroundColor: colors.primaryBg }}>
                        <Ship className="w-4 h-4" style={{ color: colors.primary }} />
                      </div>
                      <div>
                        <h3 className={`font-bold text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          {assignment.shipmentId}
                        </h3>
                        <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                          {assignment.importer}
                        </p>
                      </div>
                    </div>
                    <span className="text-xs px-2 py-0.5 rounded-full" style={priorityStyle}>
                      {priorityStyle.label}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-xs mb-2">
                    <span className={`px-2 py-0.5 rounded-full flex items-center gap-1`} style={statusStyle}>
                      {statusStyle.icon}
                      {statusStyle.label}
                    </span>
                    <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>
                      <Calendar className="w-3 h-3 inline mr-1" />
                      {assignment.dueDate}
                    </span>
                  </div>

                  <p className={`text-xs mb-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    <Package className="w-3 h-3 inline mr-1" />
                    {assignment.goods} • {assignment.quantity} items
                  </p>

                  <div className="mt-2">
                    <div className="flex justify-between items-center mb-1">
                      <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Progress</span>
                      <span className={`text-xs font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {assignment.progress}%
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full rounded-full transition-all duration-500"
                        style={{ 
                          width: `${assignment.progress}%`,
                          backgroundColor: progressColor
                        }}
                      />
                    </div>
                  </div>

                  <div className="mt-3 pt-3 border-t flex items-center justify-between" style={{ borderColor: isDark ? '#374151' : '#e5e7eb' }}>
                    <div className="flex items-center gap-1 text-xs">
                      <MapPin className="w-3 h-3" style={{ color: colors.primary }} />
                      <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Stage: {assignment.stage}</span>
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

        {filteredAssignments.length === 0 && (
          <div className={`text-center py-12 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            <Ship className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <p className="text-lg font-medium">No assignments found</p>
            <p className="text-sm">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClearingAgentAssignments;