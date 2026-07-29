import React, { useState, useContext } from 'react';
import {
  Shield,
  FileCheck,
  Clock,
  CheckCircle,
  AlertCircle,
  FileText,
  Ship,
  Package,
  Truck,
  MapPin,
  Calendar,
  User,
  Building,
  Phone,
  Mail,
  Search,
  Filter,
  X,
  Eye,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Plus,
  Download,
  RefreshCw,
  BarChart3,
  TrendingUp,
  TrendingDown,
  Users,
  Briefcase,
  Home,
  Menu,
  Upload,
  Printer,
  Share2,
  Link,
  MessageSquare,
  Globe,
  Flag,
  Anchor,
  Container,
  Box,
  Layers,
  ClipboardList,
  Award,
  Target,
  Rocket,
  Zap,
  Flame,
  Coffee,
  Sun,
  Moon,
  Cloud,
  CloudRain,
  Snowflake,
  Wind,
  CheckSquare,
  Square,
  Clock as ClockIcon,
  Calendar as CalendarIcon,
  User as UserIcon,
  Tag,
  MoreVertical,
  Edit,
  Trash2
} from 'lucide-react';
import { ThemeContext } from "../../context/themeContext";
import { useNavigate } from 'react-router-dom';

const ClearingAgentDashboard = () => {
  const navigate = useNavigate();
  const { darkMode } = useContext(ThemeContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  const [expandedItem, setExpandedItem] = useState(null);
  const [selectedTab, setSelectedTab] = useState('overview');

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

  // Agent Data
  const agentData = {
    company: {
      name: 'Swift Clearance Services',
      address: 'Plot 45, Customs Area, Mombasa, Kenya',
      contactPerson: 'Michael Ochieng',
      contactEmail: 'michael@swiftclearance.co.ke',
      contactPhone: '+254 712 345 678',
      registrationNumber: 'CAG-2024-0789',
      licenseNumber: 'CL-2024-0456',
      established: '2018',
      sla: {
        clearanceTime: '3-5 days',
        responseTime: '2 hours',
        complianceRate: '98%',
        customerSatisfaction: '4.8/5'
      }
    },
    statistics: {
      totalAssignments: 156,
      activeAssignments: 23,
      completedAssignments: 133,
      pendingDocuments: 8,
      clearanceRate: '92%',
      averageClearanceTime: '3.5 days'
    },
    assignments: [
      {
        id: 1,
        shipmentId: '#458',
        importer: 'ImportFlow Ltd',
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
        documents: ['Commercial Invoice', 'Bill of Lading', 'PVoC', 'COC'],
        documentsStatus: {
          'Commercial Invoice': 'approved',
          'Bill of Lading': 'approved',
          'PVoC': 'pending',
          'COC': 'pending'
        },
        updates: [
          { date: '2026-08-10 09:00', action: 'Assignment received', user: 'System' },
          { date: '2026-08-10 14:30', action: 'Documents reviewed', user: 'Michael Ochieng' },
          { date: '2026-08-11 10:00', action: 'Customs inspection scheduled', user: 'Michael Ochieng' }
        ],
        container: 'MSKU-458921',
        destination: 'Kampala, Uganda'
      },
      {
        id: 2,
        shipmentId: '#459',
        importer: 'TechImport Ltd',
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
        documents: ['Commercial Invoice', 'COC', 'Freight Invoice'],
        documentsStatus: {
          'Commercial Invoice': 'approved',
          'COC': 'pending',
          'Freight Invoice': 'pending'
        },
        updates: [
          { date: '2026-08-12 10:00', action: 'Assignment received', user: 'System' }
        ],
        container: 'IN-782341',
        destination: 'Nairobi, Kenya'
      },
      {
        id: 3,
        shipmentId: '#460',
        importer: 'Global Traders Ltd',
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
        documents: ['Commercial Invoice', 'Proof of Payment', 'COC'],
        documentsStatus: {
          'Commercial Invoice': 'approved',
          'Proof of Payment': 'approved',
          'COC': 'approved'
        },
        updates: [
          { date: '2026-08-05 09:00', action: 'Assignment received', user: 'System' },
          { date: '2026-08-06 14:00', action: 'Documents approved', user: 'Michael Ochieng' },
          { date: '2026-08-07 10:00', action: 'Customs clearance completed', user: 'Michael Ochieng' },
          { date: '2026-08-10 16:00', action: 'Goods delivered', user: 'System' }
        ],
        container: 'SA-456732',
        destination: 'Kigali, Rwanda'
      },
      {
        id: 4,
        shipmentId: '#461',
        importer: 'East African Traders',
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
        documents: ['Commercial Invoice', 'Bill of Lading', 'COC', 'MSDS'],
        documentsStatus: {
          'Commercial Invoice': 'approved',
          'Bill of Lading': 'approved',
          'COC': 'pending',
          'MSDS': 'pending'
        },
        updates: [
          { date: '2026-08-13 11:00', action: 'Assignment received', user: 'System' },
          { date: '2026-08-14 09:00', action: 'Inspection initiated', user: 'Michael Ochieng' }
        ],
        container: 'CH-672134',
        destination: 'Kampala, Uganda'
      }
    ],
    notifications: [
      { id: 1, title: 'New assignment #461 received', time: '2 hours ago', read: false },
      { id: 2, title: 'Document pending for #459', time: '4 hours ago', read: false },
      { id: 3, title: 'Clearance completed for #460', time: '1 day ago', read: true },
      { id: 4, title: 'SLA reminder: #458 due in 2 days', time: '2 days ago', read: true }
    ]
  };

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
      },
      'overdue': { 
        backgroundColor: colors.danger + '20', 
        color: colors.danger, 
        icon: <AlertCircle className="w-3 h-3" />,
        label: 'Overdue'
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

  const getDocumentStatusBadge = (status) => {
    const statusMap = {
      'approved': { backgroundColor: colors.success + '20', color: colors.success, label: '✅ Approved' },
      'pending': { backgroundColor: colors.warning + '20', color: colors.warning, label: '⏳ Pending' },
      'rejected': { backgroundColor: colors.danger + '20', color: colors.danger, label: '❌ Rejected' }
    };
    return statusMap[status] || statusMap['pending'];
  };

  const getProgressColor = (progress) => {
    if (progress === 100) return colors.success;
    if (progress >= 70) return colors.primary;
    if (progress >= 40) return colors.warning;
    return colors.danger;
  };

  const toggleExpand = (id) => {
    if (expandedItem === id) {
      setExpandedItem(null);
    } else {
      setExpandedItem(id);
    }
  };

  const filteredAssignments = agentData.assignments.filter(item => {
    const matchesSearch = item.shipmentId.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.importer.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.goods.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || item.status === filterStatus;
    const matchesPriority = filterPriority === 'all' || item.priority === filterPriority;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  // Assignment Card Component
  const AssignmentCard = ({ assignment }) => {
    const isExpanded = expandedItem === assignment.id;
    const statusStyle = getStatusBadge(assignment.status);
    const priorityStyle = getPriorityBadge(assignment.priority);
    const progressColor = getProgressColor(assignment.progress);
    const isOverdue = assignment.status !== 'completed' && new Date(assignment.dueDate) < new Date();

    return (
      <div className={`rounded-lg transition-all duration-300 ${
        isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-md'
      } ${isExpanded ? 'p-4 md:p-6' : 'p-3 md:p-4'}`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex-1 cursor-pointer" onClick={() => toggleExpand(assignment.id)}>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg flex-shrink-0" style={{ backgroundColor: colors.primaryBg }}>
                <Ship className="w-5 h-5" style={{ color: colors.primary }} />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
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
              title="View Assignment"
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
              <div className="space-y-1">
                {Object.entries(assignment.documentsStatus).map(([doc, status]) => {
                  const docStatus = getDocumentStatusBadge(status);
                  return (
                    <div key={doc} className={`flex items-center justify-between p-2 rounded ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                      <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{doc}</span>
                      <span className="text-xs px-2 py-0.5 rounded-full" style={docStatus}>
                        {docStatus.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Updates */}
            <div>
              <h4 className={`text-sm font-medium mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Activity Log
              </h4>
              <div className="space-y-1">
                {assignment.updates.map((update, idx) => (
                  <div key={idx} className={`flex items-center gap-3 p-2 rounded ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: colors.primary }}></div>
                    <div className="flex-1">
                      <p className={`text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>{update.action}</p>
                      <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        {update.date} • by {update.user}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-2 pt-2">
              {assignment.status !== 'completed' && (
                <button
                  onClick={() => navigate(`/clearing-agent/assignment/${assignment.id}`)}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:shadow-md"
                  style={{
                    backgroundColor: colors.primary,
                    color: 'white'
                  }}
                >
                  <Edit className="w-4 h-4" />
                  Update Status
                </button>
              )}
              <button
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isDark ? 'hover:bg-gray-600 text-gray-300' : 'hover:bg-gray-100 text-gray-600'
                }`}
              >
                <FileText className="w-4 h-4" />
                View Documents
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen w-full p-4 md:p-6" style={{ backgroundColor: isDark ? '#1a1a2e' : '#f8fafc' }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className={`text-2xl md:text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Clearing Agent Dashboard
            </h1>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              Welcome back, {agentData.company.contactPerson}
            </p>
          </div>
          <div className="flex gap-2">
            <button
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:shadow-lg"
              style={{
                backgroundColor: colors.primary,
                color: 'white'
              }}
            >
              <RefreshCw className="w-4 h-4" />
              Refresh
            </button>
          </div>
        </div>

        {/* Agent Profile Card */}
        <div className={`rounded-lg p-6 mb-6 ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-md'}`}>
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg" style={{ backgroundColor: colors.primaryBg }}>
                <Shield className="w-8 h-8" style={{ color: colors.primary }} />
              </div>
              <div>
                <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {agentData.company.name}
                </h2>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  {agentData.company.address}
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-4 md:ml-auto text-sm">
              <div>
                <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>License</p>
                <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{agentData.company.licenseNumber}</p>
              </div>
              <div>
                <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Clearance Time</p>
                <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{agentData.company.sla.clearanceTime}</p>
              </div>
              <div>
                <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Compliance Rate</p>
                <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{agentData.company.sla.complianceRate}</p>
              </div>
              <div>
                <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Response Time</p>
                <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{agentData.company.sla.responseTime}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4 mb-6">
          <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white shadow-sm'}`}>
            <div className="flex items-center gap-2">
              <ClipboardList className="w-4 h-4" style={{ color: colors.primary }} />
              <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Total</span>
            </div>
            <p className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{agentData.statistics.totalAssignments}</p>
          </div>
          <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white shadow-sm'}`}>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" style={{ color: colors.warning }} />
              <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Active</span>
            </div>
            <p className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{agentData.statistics.activeAssignments}</p>
          </div>
          <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white shadow-sm'}`}>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" style={{ color: colors.success }} />
              <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Completed</span>
            </div>
            <p className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{agentData.statistics.completedAssignments}</p>
          </div>
          <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white shadow-sm'}`}>
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4" style={{ color: colors.warning }} />
              <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Pending Docs</span>
            </div>
            <p className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{agentData.statistics.pendingDocuments}</p>
          </div>
          <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white shadow-sm'}`}>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" style={{ color: colors.success }} />
              <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Clearance Rate</span>
            </div>
            <p className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{agentData.statistics.clearanceRate}</p>
          </div>
          <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white shadow-sm'}`}>
            <div className="flex items-center gap-2">
              <ClockIcon className="w-4 h-4" style={{ color: colors.info }} />
              <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Avg. Time</span>
            </div>
            <p className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{agentData.statistics.averageClearanceTime}</p>
          </div>
        </div>

        {/* Tabs */}
        <div className={`rounded-lg ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-md'} mb-6`}>
          <div className="flex border-b overflow-x-auto" style={{ borderColor: isDark ? '#374151' : '#e5e7eb' }}>
            <button
              onClick={() => setSelectedTab('overview')}
              className={`px-4 py-3 text-sm font-medium transition-all duration-200 border-b-2 whitespace-nowrap ${
                selectedTab === 'overview'
                  ? 'border-primary text-primary'
                  : isDark ? 'border-transparent text-gray-400 hover:text-white' : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
              style={{ borderColor: selectedTab === 'overview' ? colors.primary : 'transparent' }}
            >
              <BarChart3 className="w-4 h-4 inline mr-2" />
              Overview
            </button>
            <button
              onClick={() => setSelectedTab('assignments')}
              className={`px-4 py-3 text-sm font-medium transition-all duration-200 border-b-2 whitespace-nowrap ${
                selectedTab === 'assignments'
                  ? 'border-primary text-primary'
                  : isDark ? 'border-transparent text-gray-400 hover:text-white' : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
              style={{ borderColor: selectedTab === 'assignments' ? colors.primary : 'transparent' }}
            >
              <Ship className="w-4 h-4 inline mr-2" />
              Assignments
            </button>
            <button
              onClick={() => setSelectedTab('sla')}
              className={`px-4 py-3 text-sm font-medium transition-all duration-200 border-b-2 whitespace-nowrap ${
                selectedTab === 'sla'
                  ? 'border-primary text-primary'
                  : isDark ? 'border-transparent text-gray-400 hover:text-white' : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
              style={{ borderColor: selectedTab === 'sla' ? colors.primary : 'transparent' }}
            >
              <Award className="w-4 h-4 inline mr-2" />
              SLA Performance
            </button>
          </div>

          <div className="p-6">
            {/* Overview Tab */}
            {selectedTab === 'overview' && (
              <div className="space-y-6">
                {/* Recent Assignments */}
                <div>
                  <h3 className={`text-sm font-medium mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    Recent Assignments
                  </h3>
                  <div className="space-y-3">
                    {agentData.assignments.slice(0, 3).map((assignment) => (
                      <div key={assignment.id} className={`p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                          <div>
                            <div className="flex items-center gap-2">
                              <Ship className="w-4 h-4" style={{ color: colors.primary }} />
                              <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                {assignment.shipmentId}
                              </span>
                              <span 
                                className="text-xs px-2 py-0.5 rounded-full"
                                style={getStatusBadge(assignment.status)}
                              >
                                {assignment.status}
                              </span>
                            </div>
                            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                              {assignment.importer} • {assignment.goods}
                            </p>
                          </div>
                          <div className="flex items-center gap-4">
                            <div>
                              <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Progress</p>
                              <p className={`text-sm font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{assignment.progress}%</p>
                            </div>
                            <button
                              onClick={() => navigate(`/clearing-agent/assignment/${assignment.id}`)}
                              className="text-xs px-3 py-1 rounded-lg transition-all duration-200 hover:shadow-md"
                              style={{
                                backgroundColor: colors.primary,
                                color: 'white'
                              }}
                            >
                              <Eye className="w-3 h-3 inline mr-1" />
                              View
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* SLA Summary */}
                <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                  <h3 className={`text-sm font-medium mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    SLA Performance Summary
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Clearance Time</p>
                      <p className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{agentData.company.sla.clearanceTime}</p>
                    </div>
                    <div>
                      <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Response Time</p>
                      <p className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{agentData.company.sla.responseTime}</p>
                    </div>
                    <div>
                      <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Compliance Rate</p>
                      <p className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{agentData.company.sla.complianceRate}</p>
                    </div>
                    <div>
                      <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Satisfaction</p>
                      <p className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{agentData.company.sla.customerSatisfaction}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Assignments Tab */}
            {selectedTab === 'assignments' && (
              <div>
                {/* Filters */}
                <div className="flex flex-col sm:flex-row gap-3 mb-4">
                  <div className="flex-1 relative">
                    <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                    <input
                      type="text"
                      placeholder="Search by shipment ID, importer, or goods..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className={`w-full pl-10 pr-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
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
                        className={`pl-10 pr-8 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 appearance-none ${
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
                        className={`pl-10 pr-8 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 appearance-none ${
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
                      className={`px-4 py-2 rounded-lg border transition-all duration-200 ${
                        isDark ? 'border-gray-600 text-gray-400 hover:bg-gray-700' : 'border-gray-300 text-gray-500 hover:bg-gray-100'
                      }`}
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Assignments List */}
                <div className="space-y-3">
                  {filteredAssignments.map((assignment) => (
                    <AssignmentCard key={assignment.id} assignment={assignment} />
                  ))}
                  {filteredAssignments.length === 0 && (
                    <div className={`text-center py-12 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      <Ship className="w-16 h-16 mx-auto mb-4 opacity-50" />
                      <p className="text-lg font-medium">No assignments found</p>
                      <p className="text-sm">Try adjusting your search or filters</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* SLA Tab */}
            {selectedTab === 'sla' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                    <h4 className={`text-sm font-medium mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      SLA Metrics
                    </h4>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm">
                          <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Clearance Time</span>
                          <span className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{agentData.company.sla.clearanceTime}</span>
                        </div>
                        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden mt-1">
                          <div className="h-full rounded-full" style={{ width: '85%', backgroundColor: colors.success }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm">
                          <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Response Time</span>
                          <span className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{agentData.company.sla.responseTime}</span>
                        </div>
                        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden mt-1">
                          <div className="h-full rounded-full" style={{ width: '90%', backgroundColor: colors.success }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm">
                          <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Compliance Rate</span>
                          <span className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{agentData.company.sla.complianceRate}</span>
                        </div>
                        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden mt-1">
                          <div className="h-full rounded-full" style={{ width: '98%', backgroundColor: colors.success }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                    <h4 className={`text-sm font-medium mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      Performance Summary
                    </h4>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>On-Time Clearance</span>
                        <span className={`font-bold text-green-500`}>94%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Accuracy Rate</span>
                        <span className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>98%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Customer Satisfaction</span>
                        <span className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{agentData.company.sla.customerSatisfaction}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Active Assignments</span>
                        <span className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{agentData.statistics.activeAssignments}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* SLA Document Requirements */}
                <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                  <h4 className={`text-sm font-medium mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    SLA Documentation Requirements
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div className={`flex items-center gap-2 p-2 rounded ${isDark ? 'bg-gray-600' : 'bg-gray-100'}`}>
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Agent Details (Company Name, Business Address, Contact Person Details)</span>
                    </div>
                    <div className={`flex items-center gap-2 p-2 rounded ${isDark ? 'bg-gray-600' : 'bg-gray-100'}`}>
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>SLA (Service Level Agreement)</span>
                    </div>
                    <div className={`flex items-center gap-2 p-2 rounded ${isDark ? 'bg-gray-600' : 'bg-gray-100'}`}>
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Customs License</span>
                    </div>
                    <div className={`flex items-center gap-2 p-2 rounded ${isDark ? 'bg-gray-600' : 'bg-gray-100'}`}>
                      <Clock className="w-4 h-4 text-yellow-500" />
                      <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Insurance Certificate (Pending)</span>
                    </div>
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

export default ClearingAgentDashboard;