import React, { useState, useContext } from 'react';
import {
  ClipboardList,
  CheckCircle,
  Clock,
  AlertCircle,
  X,
  Search,
  Filter,
  Plus,
  Eye,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Calendar,
  User,
  FileText,
  Ship,
  Package,
  Truck,
  Container,
  MapPin,
  Flag,
  Building,
  CreditCard,
  Shield,
  FileCheck,
  FileSignature,
  FileBarChart,
  MoreVertical,
  Download,
  RefreshCw,
  ArrowUpRight,
  ArrowDownRight,
  TrendingUp,
  TrendingDown,
  BarChart3,
  PieChart,
  Users,
  Briefcase,
  Home,
  Menu,
  X as XIcon,
  Edit,
  Trash2,
  MessageSquare,
  Paperclip,
  Clock as ClockIcon,
  Calendar as CalendarIcon,
  User as UserIcon,
  Tag,
  Flag as FlagIcon,
  Star,
  StarHalf,
  StarOff,
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
  Wind
} from 'lucide-react';
import { ThemeContext } from '../context/themeContext';
import { useNavigate } from 'react-router-dom';

const Tasks = () => {
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');
  const [expandedTask, setExpandedTask] = useState(null);
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

  const isDark = theme === 'dark';

  // Task data
  const tasksData = [
    {
      id: 1,
      title: 'Upload Commercial Invoice for Shipment #458',
      description: 'Upload the commercial invoice matching factory declarations for shipment #458',
      status: 'pending',
      priority: 'high',
      category: 'document',
      dueDate: '2026-08-15',
      createdDate: '2026-08-10',
      assignedTo: 'John Doe',
      assignedBy: 'Jane Smith',
      shipmentId: '#458',
      documentType: 'Commercial Invoice',
      progress: 0,
      comments: 3,
      attachments: 2,
      tags: ['invoice', 'commercial', 'urgent'],
      subtasks: [
        { id: 1, title: 'Gather invoice details', completed: true },
        { id: 2, title: 'Verify factory declarations', completed: false },
        { id: 3, title: 'Upload to system', completed: false }
      ],
      activity: [
        { action: 'Task created', date: '2026-08-10 09:00', user: 'Jane Smith' },
        { action: 'Comment added', date: '2026-08-11 14:30', user: 'John Doe' }
      ]
    },
    {
      id: 2,
      title: 'Submit Sales Contract for Shipment #459',
      description: 'Submit the official sales agreement for shipment #459',
      status: 'in_progress',
      priority: 'medium',
      category: 'contract',
      dueDate: '2026-08-20',
      createdDate: '2026-08-12',
      assignedTo: 'Jane Smith',
      assignedBy: 'John Doe',
      shipmentId: '#459',
      documentType: 'Sales Contract',
      progress: 45,
      comments: 1,
      attachments: 1,
      tags: ['contract', 'sales', 'agreement'],
      subtasks: [
        { id: 1, title: 'Review contract terms', completed: true },
        { id: 2, title: 'Get buyer signature', completed: true },
        { id: 3, title: 'Upload signed contract', completed: false }
      ],
      activity: [
        { action: 'Task created', date: '2026-08-12 10:00', user: 'John Doe' },
        { action: 'Contract reviewed', date: '2026-08-13 11:00', user: 'Jane Smith' }
      ]
    },
    {
      id: 3,
      title: 'Proof of Payments for Shipment #458',
      description: 'Upload payment confirmation and receipts for shipment #458',
      status: 'completed',
      priority: 'high',
      category: 'payment',
      dueDate: '2026-08-10',
      createdDate: '2026-08-05',
      assignedTo: 'John Doe',
      assignedBy: 'Jane Smith',
      shipmentId: '#458',
      documentType: 'Proof of Payments',
      progress: 100,
      comments: 2,
      attachments: 3,
      tags: ['payment', 'receipt', 'complete'],
      subtasks: [
        { id: 1, title: 'Get payment confirmation', completed: true },
        { id: 2, title: 'Upload receipts', completed: true },
        { id: 3, title: 'Verify amounts', completed: true }
      ],
      activity: [
        { action: 'Task created', date: '2026-08-05 09:00', user: 'Jane Smith' },
        { action: 'Payment uploaded', date: '2026-08-08 15:00', user: 'John Doe' },
        { action: 'Task completed', date: '2026-08-09 16:00', user: 'System' }
      ]
    },
    {
      id: 4,
      title: 'UNBS Certificate of Conformity',
      description: 'Upload UNBS Certificate of Conformity for product quality certification',
      status: 'pending',
      priority: 'critical',
      category: 'certificate',
      dueDate: '2026-08-25',
      createdDate: '2026-08-14',
      assignedTo: 'John Doe',
      assignedBy: 'System',
      shipmentId: '#460',
      documentType: 'UNBS CoC',
      progress: 10,
      comments: 0,
      attachments: 0,
      tags: ['unbs', 'certificate', 'quality', 'urgent'],
      subtasks: [
        { id: 1, title: 'Request CoC from supplier', completed: false },
        { id: 2, title: 'Verify certificate', completed: false },
        { id: 3, title: 'Upload to system', completed: false }
      ],
      activity: [
        { action: 'Task created', date: '2026-08-14 08:00', user: 'System' }
      ]
    },
    {
      id: 5,
      title: 'UNBS Pre-Export Verification (PVoC)',
      description: 'Upload UNBS Pre-Export Verification of Conformity for pre-shipment quality verification',
      status: 'pending',
      priority: 'high',
      category: 'certificate',
      dueDate: '2026-08-28',
      createdDate: '2026-08-15',
      assignedTo: 'Jane Smith',
      assignedBy: 'System',
      shipmentId: '#460',
      documentType: 'UNBS PVoC',
      progress: 25,
      comments: 1,
      attachments: 1,
      tags: ['unbs', 'pvoc', 'verification', 'pending'],
      subtasks: [
        { id: 1, title: 'Request PVoC from supplier', completed: true },
        { id: 2, title: 'Review verification documents', completed: false },
        { id: 3, title: 'Upload to system', completed: false }
      ],
      activity: [
        { action: 'Task created', date: '2026-08-15 09:00', user: 'System' },
        { action: 'Comment added', date: '2026-08-16 10:00', user: 'Jane Smith' }
      ]
    },
    {
      id: 6,
      title: 'Freight Invoice for Shipment #458',
      description: 'Upload freight invoice for URA customs value calculation',
      status: 'in_progress',
      priority: 'medium',
      category: 'invoice',
      dueDate: '2026-08-22',
      createdDate: '2026-08-13',
      assignedTo: 'John Doe',
      assignedBy: 'Jane Smith',
      shipmentId: '#458',
      documentType: 'Freight Invoice',
      progress: 60,
      comments: 2,
      attachments: 2,
      tags: ['freight', 'invoice', 'ura', 'customs'],
      subtasks: [
        { id: 1, title: 'Get freight invoice from carrier', completed: true },
        { id: 2, title: 'Verify URA requirements', completed: true },
        { id: 3, title: 'Upload to system', completed: false }
      ],
      activity: [
        { action: 'Task created', date: '2026-08-13 11:00', user: 'Jane Smith' },
        { action: 'Freight invoice received', date: '2026-08-14 14:00', user: 'John Doe' },
        { action: 'URA verification completed', date: '2026-08-15 16:00', user: 'John Doe' }
      ]
    },
    {
      id: 7,
      title: 'Import Items List for Shipment #461',
      description: 'Create and upload import items list with quantities and HS codes',
      status: 'pending',
      priority: 'low',
      category: 'list',
      dueDate: '2026-09-05',
      createdDate: '2026-08-18',
      assignedTo: 'Jane Smith',
      assignedBy: 'John Doe',
      shipmentId: '#461',
      documentType: 'Import Items List',
      progress: 5,
      comments: 0,
      attachments: 0,
      tags: ['items', 'import', 'quantity', 'hs-code'],
      subtasks: [
        { id: 1, title: 'Compile item list', completed: false },
        { id: 2, title: 'Verify HS codes', completed: false },
        { id: 3, title: 'Upload to system', completed: false }
      ],
      activity: [
        { action: 'Task created', date: '2026-08-18 10:00', user: 'John Doe' }
      ]
    },
    {
      id: 8,
      title: 'Importer Details Verification',
      description: 'Verify and update importer details including company registration and TIN',
      status: 'completed',
      priority: 'high',
      category: 'details',
      dueDate: '2026-08-01',
      createdDate: '2026-07-25',
      assignedTo: 'John Doe',
      assignedBy: 'System',
      shipmentId: '#458',
      documentType: 'Importer Details',
      progress: 100,
      comments: 1,
      attachments: 2,
      tags: ['importer', 'details', 'registration', 'complete'],
      subtasks: [
        { id: 1, title: 'Verify company registration', completed: true },
        { id: 2, title: 'Verify TIN number', completed: true },
        { id: 3, title: 'Update contact details', completed: true }
      ],
      activity: [
        { action: 'Task created', date: '2026-07-25 08:00', user: 'System' },
        { action: 'Documents verified', date: '2026-07-28 10:00', user: 'John Doe' },
        { action: 'Task completed', date: '2026-07-30 16:00', user: 'System' }
      ]
    }
  ];

  // Get status badge style
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

  // Get priority badge style
  const getPriorityBadge = (priority) => {
    const priorityMap = {
      'critical': { backgroundColor: colors.danger + '30', color: colors.danger, label: 'Critical' },
      'high': { backgroundColor: colors.danger + '20', color: colors.danger, label: 'High' },
      'medium': { backgroundColor: colors.warning + '20', color: colors.warning, label: 'Medium' },
      'low': { backgroundColor: colors.info + '20', color: colors.info, label: 'Low' }
    };
    return priorityMap[priority] || priorityMap['medium'];
  };

  // Get category icon
  const getCategoryIcon = (category) => {
    const iconMap = {
      'document': <FileText className="w-4 h-4" />,
      'contract': <FileSignature className="w-4 h-4" />,
      'payment': <CreditCard className="w-4 h-4" />,
      'certificate': <Shield className="w-4 h-4" />,
      'invoice': <FileBarChart className="w-4 h-4" />,
      'details': <Building className="w-4 h-4" />,
      'list': <Package className="w-4 h-4" />
    };
    return iconMap[category] || <FileText className="w-4 h-4" />;
  };

  // Get category label
  const getCategoryLabel = (category) => {
    const labelMap = {
      'document': 'Document',
      'contract': 'Contract',
      'payment': 'Payment',
      'certificate': 'Certificate',
      'invoice': 'Invoice',
      'details': 'Details',
      'list': 'List'
    };
    return labelMap[category] || category;
  };

  // Filter tasks
  const filteredTasks = tasksData.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          task.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          task.shipmentId.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || task.status === filterStatus;
    const matchesPriority = filterPriority === 'all' || task.priority === filterPriority;
    const matchesCategory = filterCategory === 'all' || task.category === filterCategory;
    return matchesSearch && matchesStatus && matchesPriority && matchesCategory;
  });

  // Get unique values for filters
  const statusOptions = ['all', 'pending', 'in_progress', 'completed', 'overdue'];
  const priorityOptions = ['all', 'critical', 'high', 'medium', 'low'];
  const categoryOptions = ['all', 'document', 'contract', 'payment', 'certificate', 'invoice', 'details', 'list'];

  // Stats
  const totalTasks = tasksData.length;
  const pendingTasks = tasksData.filter(t => t.status === 'pending').length;
  const inProgressTasks = tasksData.filter(t => t.status === 'in_progress').length;
  const completedTasks = tasksData.filter(t => t.status === 'completed').length;

  // Toggle expansion
  const toggleExpand = (id) => {
    if (expandedTask === id) {
      setExpandedTask(null);
    } else {
      setExpandedTask(id);
    }
  };

  // Navigate to task details
  const viewTaskDetails = (id) => {
    navigate(`/task/${id}`);
  };

  // Get progress color
  const getProgressColor = (progress) => {
    if (progress === 100) return colors.success;
    if (progress >= 70) return colors.primary;
    if (progress >= 40) return colors.warning;
    return colors.danger;
  };

  // Count overdue tasks
  const overdueTasks = tasksData.filter(t => {
    if (t.status === 'completed') return false;
    const dueDate = new Date(t.dueDate);
    const today = new Date();
    return dueDate < today;
  }).length;

  return (
    <div className="min-h-screen w-full p-4 md:p-6" style={{ backgroundColor: isDark ? '#1a1a2e' : '#f8fafc' }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className={`text-2xl md:text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              My Tasks
            </h1>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              Manage and track all your tasks
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
              New Task
            </button>
          </div>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3 md:gap-4 mb-6">
          <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white shadow-sm'}`}>
            <div className="flex items-center gap-2">
              <ClipboardList className="w-4 h-4" style={{ color: colors.primary }} />
              <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Total</span>
            </div>
            <p className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{totalTasks}</p>
          </div>
          <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white shadow-sm'}`}>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" style={{ color: colors.warning }} />
              <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Pending</span>
            </div>
            <p className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{pendingTasks}</p>
          </div>
          <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white shadow-sm'}`}>
            <div className="flex items-center gap-2">
              <RefreshCw className="w-4 h-4" style={{ color: colors.info }} />
              <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>In Progress</span>
            </div>
            <p className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{inProgressTasks}</p>
          </div>
          <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white shadow-sm'}`}>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" style={{ color: colors.success }} />
              <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Completed</span>
            </div>
            <p className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{completedTasks}</p>
          </div>
          <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white shadow-sm'}`}>
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4" style={{ color: colors.danger }} />
              <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Overdue</span>
            </div>
            <p className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{overdueTasks}</p>
          </div>
          <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white shadow-sm'}`}>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" style={{ color: colors.success }} />
              <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Completion Rate</span>
            </div>
            <p className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0}%
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
                placeholder="Search tasks by title, description, or shipment ID..."
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
                      {status === 'all' ? 'All Status' : status.replace('_', ' ').charAt(0).toUpperCase() + status.replace('_', ' ').slice(1)}
                    </option>
                  ))}
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
                  {priorityOptions.map((priority) => (
                    <option key={priority} value={priority}>
                      {priority === 'all' ? 'All Priority' : priority.charAt(0).toUpperCase() + priority.slice(1)}
                    </option>
                  ))}
                </select>
                <ChevronDown className={`absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
              </div>
              <div className="relative">
                <Filter className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className={`pl-10 pr-8 py-2.5 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 appearance-none ${
                    isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                  }`}
                >
                  {categoryOptions.map((category) => (
                    <option key={category} value={category}>
                      {category === 'all' ? 'All Categories' : getCategoryLabel(category)}
                    </option>
                  ))}
                </select>
                <ChevronDown className={`absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
              </div>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setFilterStatus('all');
                  setFilterPriority('all');
                  setFilterCategory('all');
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

        {/* Tasks List */}
        <div className="space-y-3">
          {filteredTasks.map((task) => {
            const isExpanded = expandedTask === task.id;
            const statusStyle = getStatusBadge(task.status);
            const priorityStyle = getPriorityBadge(task.priority);
            const progressColor = getProgressColor(task.progress);
            const isOverdue = task.status !== 'completed' && new Date(task.dueDate) < new Date();

            return (
              <div
                key={task.id}
                className={`rounded-lg transition-all duration-300 ${
                  isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-md'
                } ${isExpanded ? 'p-4 md:p-6' : 'p-3 md:p-4'}`}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                  <div className="flex-1 cursor-pointer" onClick={() => toggleExpand(task.id)}>
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-lg flex-shrink-0 mt-1 ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
                        {getCategoryIcon(task.category)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 
                            className={`font-bold cursor-pointer hover:underline ${isDark ? 'text-white' : 'text-gray-900'}`}
                            onClick={(e) => {
                              e.stopPropagation();
                              viewTaskDetails(task.id);
                            }}
                          >
                            {task.title}
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
                          <span className={`text-xs px-2 py-0.5 rounded-full ${isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'}`}>
                            {task.shipmentId}
                          </span>
                        </div>
                        <p className={`text-xs md:text-sm truncate ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                          {task.description}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-3 ml-12 mt-1">
                      <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        <CalendarIcon className="w-3 h-3 inline mr-1" />
                        Due: {new Date(task.dueDate).toLocaleDateString()}
                      </span>
                      <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        <UserIcon className="w-3 h-3 inline mr-1" />
                        {task.assignedTo}
                      </span>
                      <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        <MessageSquare className="w-3 h-3 inline mr-1" />
                        {task.comments} comments
                      </span>
                      <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        <Paperclip className="w-3 h-3 inline mr-1" />
                        {task.attachments} attachments
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
                          {task.progress}%
                        </span>
                      </div>
                      <div className="w-24 md:w-32 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full rounded-full transition-all duration-500"
                          style={{ 
                            width: `${task.progress}%`,
                            backgroundColor: progressColor
                          }}
                        />
                      </div>
                    </div>
                    <button
                      onClick={() => viewTaskDetails(task.id)}
                      className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      title="View Details"
                    >
                      <Eye className="w-4 h-4" style={{ color: colors.primary }} />
                    </button>
                    <button
                      onClick={() => toggleExpand(task.id)}
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
                    {/* Tags */}
                    <div>
                      <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Tags</p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {task.tags.map((tag, idx) => (
                          <span key={idx} className={`text-xs px-2 py-0.5 rounded ${isDark ? 'bg-gray-600 text-gray-300' : 'bg-gray-200 text-gray-600'}`}>
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Subtasks */}
                    <div>
                      <p className={`text-sm font-medium mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        Subtasks ({task.subtasks.filter(s => s.completed).length}/{task.subtasks.length})
                      </p>
                      <div className="space-y-1">
                        {task.subtasks.map((subtask) => (
                          <div key={subtask.id} className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              checked={subtask.completed}
                              readOnly
                              className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
                              style={{ accentColor: colors.primary }}
                            />
                            <span className={`text-sm ${subtask.completed ? 'line-through' : ''} ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                              {subtask.title}
                            </span>
                            {subtask.completed && (
                              <CheckCircle className="w-3 h-3 text-green-500" />
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Activity */}
                    <div>
                      <p className={`text-sm font-medium mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        Activity
                      </p>
                      <div className="space-y-1">
                        {task.activity.map((activity, idx) => (
                          <div key={idx} className={`flex items-center gap-3 p-2 rounded ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: colors.primary }}></div>
                            <div className="flex-1">
                              <p className={`text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>{activity.action}</p>
                              <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                                {activity.date} • by {activity.user}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 pt-2">
                      <button
                        onClick={() => viewTaskDetails(task.id)}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:shadow-md"
                        style={{
                          backgroundColor: colors.primary,
                          color: 'white'
                        }}
                      >
                        <Eye className="w-4 h-4" />
                        View Full Details
                      </button>
                      {task.status !== 'completed' && (
                        <button
                          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                            isDark ? 'hover:bg-gray-600 text-gray-300' : 'hover:bg-gray-100 text-gray-600'
                          }`}
                        >
                          <CheckCircle className="w-4 h-4" />
                          Mark Complete
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {filteredTasks.length === 0 && (
            <div className={`text-center py-12 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              <ClipboardList className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p className="text-lg font-medium">No tasks found</p>
              <p className="text-sm">Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Tasks;