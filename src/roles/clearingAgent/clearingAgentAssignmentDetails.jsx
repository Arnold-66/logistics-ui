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
  Plus
} from 'lucide-react';
import { ThemeContext } from "../../context/themeContext";
import { useNavigate, useParams } from 'react-router-dom';

const ClearingAgentAssignmentDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { darkMode } = useContext(ThemeContext);
  const [assignment, setAssignment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [isEditing, setIsEditing] = useState(false);
  const [updateStatus, setUpdateStatus] = useState('');
  const [updateNote, setUpdateNote] = useState('');
  const [selectedStage, setSelectedStage] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');

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

  // Sample assignment data - in real app, fetch from API
  const assignmentsData = {
    1: {
      id: 1,
      shipmentId: '#458',
      importer: 'ImportFlow Ltd',
      importerContact: 'John Doe',
      importerEmail: 'john@importflow.com',
      importerPhone: '+256 712 345 678',
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
      documents: [
        { name: 'Commercial Invoice', status: 'approved', file: 'invoice_458.pdf' },
        { name: 'Bill of Lading', status: 'approved', file: 'bol_458.pdf' },
        { name: 'PVoC', status: 'pending', file: null },
        { name: 'COC', status: 'pending', file: null }
      ],
      updates: [
        { date: '2026-08-10 09:00', action: 'Assignment received', user: 'System' },
        { date: '2026-08-10 14:30', action: 'Documents reviewed', user: 'Michael Ochieng' },
        { date: '2026-08-11 10:00', action: 'Customs inspection scheduled', user: 'Michael Ochieng' }
      ],
      timeline: [
        { stage: 'Assignment Received', date: '2026-08-10 09:00', completed: true },
        { stage: 'Document Review', date: '2026-08-10 14:30', completed: true },
        { stage: 'Customs Inspection', date: '2026-08-11 10:00', completed: false },
        { stage: 'Customs Clearance', date: '2026-08-13', completed: false },
        { stage: 'Release to Importer', date: '2026-08-15', completed: false }
      ],
      sla: {
        targetClearance: '3-5 days',
        currentDays: 3,
        compliance: 'On Track'
      }
    },
    2: {
      id: 2,
      shipmentId: '#459',
      importer: 'TechImport Ltd',
      importerContact: 'Jane Smith',
      importerEmail: 'jane@techimport.com',
      importerPhone: '+254 723 456 789',
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
      documents: [
        { name: 'Commercial Invoice', status: 'approved', file: 'invoice_459.pdf' },
        { name: 'COC', status: 'pending', file: null },
        { name: 'Freight Invoice', status: 'pending', file: null }
      ],
      updates: [
        { date: '2026-08-12 10:00', action: 'Assignment received', user: 'System' }
      ],
      timeline: [
        { stage: 'Assignment Received', date: '2026-08-12 10:00', completed: true },
        { stage: 'Document Review', date: '2026-08-13', completed: false },
        { stage: 'Customs Inspection', date: '2026-08-15', completed: false },
        { stage: 'Customs Clearance', date: '2026-08-17', completed: false },
        { stage: 'Release to Importer', date: '2026-08-18', completed: false }
      ],
      sla: {
        targetClearance: '3-5 days',
        currentDays: 1,
        compliance: 'On Track'
      }
    },
    3: {
      id: 3,
      shipmentId: '#460',
      importer: 'Global Traders Ltd',
      importerContact: 'David Mbeki',
      importerEmail: 'david@globaltraders.com',
      importerPhone: '+254 734 567 890',
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
      documents: [
        { name: 'Commercial Invoice', status: 'approved', file: 'invoice_460.pdf' },
        { name: 'Proof of Payment', status: 'approved', file: 'pop_460.pdf' },
        { name: 'COC', status: 'approved', file: 'coc_460.pdf' }
      ],
      updates: [
        { date: '2026-08-05 09:00', action: 'Assignment received', user: 'System' },
        { date: '2026-08-06 14:00', action: 'Documents approved', user: 'Michael Ochieng' },
        { date: '2026-08-07 10:00', action: 'Customs clearance completed', user: 'Michael Ochieng' },
        { date: '2026-08-10 16:00', action: 'Goods delivered', user: 'System' }
      ],
      timeline: [
        { stage: 'Assignment Received', date: '2026-08-05 09:00', completed: true },
        { stage: 'Document Review', date: '2026-08-06 14:00', completed: true },
        { stage: 'Customs Inspection', date: '2026-08-07 10:00', completed: true },
        { stage: 'Customs Clearance', date: '2026-08-08', completed: true },
        { stage: 'Release to Importer', date: '2026-08-10 16:00', completed: true }
      ],
      sla: {
        targetClearance: '3-5 days',
        currentDays: 5,
        compliance: 'Completed'
      }
    },
    4: {
      id: 4,
      shipmentId: '#461',
      importer: 'East African Traders',
      importerContact: 'Sarah Ochieng',
      importerEmail: 'sarah@eastafricantraders.com',
      importerPhone: '+254 745 678 901',
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
      documents: [
        { name: 'Commercial Invoice', status: 'approved', file: 'invoice_461.pdf' },
        { name: 'Bill of Lading', status: 'approved', file: 'bol_461.pdf' },
        { name: 'COC', status: 'pending', file: null },
        { name: 'MSDS', status: 'pending', file: null }
      ],
      updates: [
        { date: '2026-08-13 11:00', action: 'Assignment received', user: 'System' },
        { date: '2026-08-14 09:00', action: 'Inspection initiated', user: 'Michael Ochieng' }
      ],
      timeline: [
        { stage: 'Assignment Received', date: '2026-08-13 11:00', completed: true },
        { stage: 'Document Review', date: '2026-08-14 09:00', completed: true },
        { stage: 'Customs Inspection', date: '2026-08-14 14:00', completed: false },
        { stage: 'Customs Clearance', date: '2026-08-18', completed: false },
        { stage: 'Release to Importer', date: '2026-08-20', completed: false }
      ],
      sla: {
        targetClearance: '3-5 days',
        currentDays: 2,
        compliance: 'On Track'
      }
    }
  };

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      const data = assignmentsData[parseInt(id)];
      if (data) {
        setAssignment(data);
        setUpdateStatus(data.status);
        setSelectedStage(data.stage);
      } else {
        navigate('/clearing-agent-dashboard');
      }
      setLoading(false);
    }, 300);
  }, [id, navigate]);

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

  const showToastMessage = (message, type = 'success') => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleUpdateStatus = () => {
    if (!assignment) return;

    const newStatus = updateStatus;
    const newStage = selectedStage;
    const note = updateNote;

    // Update the assignment
    setAssignment(prev => ({
      ...prev,
      status: newStatus,
      stage: newStage,
      progress: newStatus === 'completed' ? 100 : prev.progress,
      updates: [...prev.updates, {
        date: new Date().toLocaleString(),
        action: `Status updated to ${newStatus} - ${newStage}`,
        user: 'Michael Ochieng'
      }]
    }));

    setIsEditing(false);
    setUpdateNote('');
    showToastMessage(`Status updated successfully: ${newStatus} - ${newStage}`, 'success');
  };

  const handleDocumentUpload = (docName) => {
    // In real app, open file picker
    showToastMessage(`Document "${docName}" uploaded successfully!`, 'success');
  };

  const handleAddNote = () => {
    if (!updateNote.trim() || !assignment) return;

    setAssignment(prev => ({
      ...prev,
      updates: [...prev.updates, {
        date: new Date().toLocaleString(),
        action: `Note: ${updateNote}`,
        user: 'Michael Ochieng'
      }]
    }));
    setUpdateNote('');
    showToastMessage('Note added successfully', 'success');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: isDark ? '#1a1a2e' : '#f8fafc' }}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto" style={{ borderColor: colors.primary }}></div>
          <p className={`mt-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Loading assignment details...</p>
        </div>
      </div>
    );
  }

  if (!assignment) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: isDark ? '#1a1a2e' : '#f8fafc' }}>
        <div className="text-center">
          <Ship className="w-16 h-16 mx-auto mb-4 opacity-50" style={{ color: isDark ? '#4b5563' : '#9ca3af' }} />
          <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Assignment not found</h2>
          <button
            onClick={() => navigate('/clearing-agent-dashboard')}
            className="mt-4 px-6 py-2 rounded-lg text-white font-medium transition-all duration-200 hover:shadow-lg"
            style={{ backgroundColor: colors.primary }}
          >
            <ArrowLeft className="w-4 h-4 inline mr-2" />
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const statusStyle = getStatusBadge(assignment.status);
  const priorityStyle = getPriorityBadge(assignment.priority);
  const progressColor = getProgressColor(assignment.progress);

  // Toast Component
  const Toast = ({ message, type }) => {
    if (!showToast) return null;
    
    const bgColor = type === 'success' ? 'bg-green-500' : type === 'error' ? 'bg-red-500' : 'bg-blue-500';
    const icon = type === 'success' ? <CheckCircle className="w-5 h-5" /> : 
                  type === 'error' ? <AlertCircle className="w-5 h-5" /> : 
                  <Info className="w-5 h-5" />;

    return (
      <div className={`fixed top-24 right-4 z-50 flex items-center gap-3 px-4 py-3 rounded-lg shadow-xl text-white ${bgColor} animate-slide-in`}>
        {icon}
        <span className="text-sm font-medium">{message}</span>
        <button onClick={() => setShowToast(false)} className="ml-2 hover:opacity-80">
          <X className="w-4 h-4" />
        </button>
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

  // Status Update Modal
  const StatusUpdateModal = () => {
    if (!isEditing) return null;

    const stages = ['Document Review', 'Customs Inspection', 'Customs Clearance', 'Release to Importer'];

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
        <div className={`relative w-full max-w-lg rounded-xl shadow-2xl overflow-hidden ${
          isDark ? 'bg-gray-800' : 'bg-white'
        }`}>
          <div className={`flex items-center justify-between p-4 border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
            <div className="flex items-center gap-3">
              <Edit className="w-5 h-5" style={{ color: colors.primary }} />
              <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Update Status
              </h3>
            </div>
            <button
              onClick={() => setIsEditing(false)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 space-y-4">
            <div>
              <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Status
              </label>
              <select
                value={updateStatus}
                onChange={(e) => setUpdateStatus(e.target.value)}
                className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                  isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                }`}
                style={{ focusRingColor: colors.primary }}
              >
                <option value="pending">Pending</option>
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            <div>
              <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Current Stage
              </label>
              <select
                value={selectedStage}
                onChange={(e) => setSelectedStage(e.target.value)}
                className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                  isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                }`}
                style={{ focusRingColor: colors.primary }}
              >
                {stages.map((stage) => (
                  <option key={stage} value={stage}>{stage}</option>
                ))}
              </select>
            </div>

            <div>
              <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Update Note
              </label>
              <textarea
                value={updateNote}
                onChange={(e) => setUpdateNote(e.target.value)}
                placeholder="Add a note about this update..."
                rows="3"
                className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                  isDark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900'
                }`}
                style={{ focusRingColor: colors.primary }}
              />
            </div>
          </div>

          <div className={`flex items-center justify-end gap-3 p-4 border-t ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
            <button
              onClick={() => setIsEditing(false)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                isDark ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-600'
              }`}
            >
              Cancel
            </button>
            <button
              onClick={handleUpdateStatus}
              className="flex items-center gap-2 px-6 py-2 rounded-lg text-sm font-medium text-white transition-all duration-200 hover:shadow-lg"
              style={{ backgroundColor: colors.primary }}
            >
              <Save className="w-4 h-4" />
              Update Status
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen w-full p-4 md:p-6" style={{ backgroundColor: isDark ? '#1a1a2e' : '#f8fafc' }}>
      <Toast message={toastMessage} type={toastType} />
      <StatusUpdateModal />

      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm mb-4">
          <button
            onClick={() => navigate('/clearing-agent-dashboard')}
            className={`flex items-center gap-1 hover:underline ${isDark ? 'text-gray-400' : 'text-gray-500'}`}
          >
            <Home className="w-4 h-4" />
            Dashboard
          </button>
          <ChevronRight className={`w-4 h-4 ${isDark ? 'text-gray-600' : 'text-gray-400'}`} />
          <span className={isDark ? 'text-white' : 'text-gray-900'}>Assignment Details</span>
        </div>

        {/* Header */}
        <div className={`rounded-lg p-6 mb-6 ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-md'}`}>
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg flex-shrink-0" style={{ backgroundColor: colors.primaryBg }}>
                <Ship className="w-8 h-8" style={{ color: colors.primary }} />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {assignment.shipmentId}
                  </h1>
                  <span className="text-xs px-2 py-0.5 rounded-full flex items-center gap-1" style={statusStyle}>
                    {statusStyle.icon}
                    {statusStyle.label}
                  </span>
                  <span className="text-xs px-2 py-0.5 rounded-full" style={priorityStyle}>
                    {priorityStyle.label} Priority
                  </span>
                </div>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  {assignment.importer} • {assignment.goods}
                </p>
                <div className="flex flex-wrap items-center gap-3 mt-2">
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
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {assignment.status !== 'completed' && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:shadow-lg"
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
                onClick={() => navigate('/clearing-agent-dashboard')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isDark ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-600'
                }`}
              >
                <X className="w-4 h-4" />
                Close
              </button>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className={`rounded-lg p-4 mb-6 ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-md'}`}>
          <div className="flex justify-between items-center mb-2">
            <span className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Clearance Progress
            </span>
            <span className={`text-sm font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {assignment.progress}%
            </span>
          </div>
          <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full rounded-full transition-all duration-1000"
              style={{ 
                width: `${assignment.progress}%`,
                backgroundColor: progressColor
              }}
            />
          </div>
          <div className="flex justify-between mt-2 text-xs">
            <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Assigned: {assignment.assignedDate}</span>
            <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>SLA: {assignment.sla.targetClearance}</span>
            <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Days: {assignment.sla.currentDays}</span>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - 2/3 */}
          <div className="lg:col-span-2 space-y-6">
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
                  onClick={() => setActiveTab('timeline')}
                  className={`px-4 py-3 text-sm font-medium transition-all duration-200 border-b-2 whitespace-nowrap ${
                    activeTab === 'timeline'
                      ? 'border-primary text-primary'
                      : isDark ? 'border-transparent text-gray-400 hover:text-white' : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                  style={{ borderColor: activeTab === 'timeline' ? colors.primary : 'transparent' }}
                >
                  <ClockIcon className="w-4 h-4 inline mr-2" />
                  Timeline
                </button>
                <button
                  onClick={() => setActiveTab('updates')}
                  className={`px-4 py-3 text-sm font-medium transition-all duration-200 border-b-2 whitespace-nowrap ${
                    activeTab === 'updates'
                      ? 'border-primary text-primary'
                      : isDark ? 'border-transparent text-gray-400 hover:text-white' : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                  style={{ borderColor: activeTab === 'updates' ? colors.primary : 'transparent' }}
                >
                  <MessageSquare className="w-4 h-4 inline mr-2" />
                  Updates
                </button>
              </div>

              <div className="p-6">
                {/* Overview Tab */}
                {activeTab === 'overview' && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Importer</p>
                        <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{assignment.importer}</p>
                      </div>
                      <div>
                        <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Contact</p>
                        <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{assignment.importerContact}</p>
                      </div>
                      <div>
                        <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Email</p>
                        <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{assignment.importerEmail}</p>
                      </div>
                      <div>
                        <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Phone</p>
                        <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{assignment.importerPhone}</p>
                      </div>
                      <div>
                        <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Container</p>
                        <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{assignment.container}</p>
                      </div>
                      <div>
                        <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Destination</p>
                        <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{assignment.destination}</p>
                      </div>
                    </div>

                    {/* SLA Status */}
                    <div className={`p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                      <div className="flex items-center gap-2">
                        <Award className="w-4 h-4" style={{ color: colors.primary }} />
                        <span className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>SLA Status</span>
                      </div>
                      <div className="grid grid-cols-3 gap-2 mt-2 text-sm">
                        <div>
                          <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Target</p>
                          <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{assignment.sla.targetClearance}</p>
                        </div>
                        <div>
                          <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Days Used</p>
                          <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{assignment.sla.currentDays}</p>
                        </div>
                        <div>
                          <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Status</p>
                          <p className={`font-medium text-green-500`}>{assignment.sla.compliance}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Documents Tab */}
                {activeTab === 'documents' && (
                  <div className="space-y-3">
                    {assignment.documents.map((doc, idx) => {
                      const docStatus = getDocumentStatusBadge(doc.status);
                      return (
                        <div key={idx} className={`flex items-center justify-between p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                          <div className="flex items-center gap-3">
                            <FileText className="w-4 h-4" style={{ color: colors.primary }} />
                            <div>
                              <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{doc.name}</p>
                              <span className="text-xs px-2 py-0.5 rounded-full" style={docStatus}>
                                {docStatus.label}
                              </span>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            {doc.status === 'approved' ? (
                              <button className="p-1.5 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                                <Eye className="w-4 h-4 text-gray-400" />
                              </button>
                            ) : (
                              <button 
                                onClick={() => handleDocumentUpload(doc.name)}
                                className="p-1.5 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                              >
                                <Upload className="w-4 h-4" style={{ color: colors.primary }} />
                              </button>
                            )}
                            <button className="p-1.5 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                              <Download className="w-4 h-4 text-gray-400" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Timeline Tab */}
                {activeTab === 'timeline' && (
                  <div className="space-y-4">
                    {assignment.timeline.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <div className="relative flex items-center justify-center w-6">
                          {item.completed ? (
                            <CheckCircle className="w-4 h-4 text-green-500" />
                          ) : (
                            <Clock className="w-4 h-4 text-yellow-500" />
                          )}
                          {idx < assignment.timeline.length - 1 && (
                            <div className={`absolute top-6 w-0.5 h-6 ${item.completed ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                          )}
                        </div>
                        <div className="flex-1">
                          <p className={`text-sm ${item.completed ? 'line-through' : ''} ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                            {item.stage}
                          </p>
                          <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-400'}`}>
                            {item.date}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Updates Tab */}
                {activeTab === 'updates' && (
                  <div className="space-y-4">
                    <div className="space-y-3">
                      {assignment.updates.map((update, idx) => (
                        <div key={idx} className={`p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                          <div className="flex items-start justify-between">
                            <div>
                              <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                {update.action}
                              </p>
                              <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                                {update.date} • by {update.user}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Add Note */}
                    <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Add a note..."
                          value={updateNote}
                          onChange={(e) => setUpdateNote(e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && handleAddNote()}
                          className={`flex-1 px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                            isDark ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900'
                          }`}
                          style={{ focusRingColor: colors.primary }}
                        />
                        <button
                          onClick={handleAddNote}
                          disabled={!updateNote.trim()}
                          className="px-4 py-2 rounded-lg text-white text-sm font-medium transition-all duration-200 hover:shadow-lg disabled:opacity-50"
                          style={{ backgroundColor: colors.primary }}
                        >
                          <Send className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - 1/3 */}
          <div className="space-y-6">
            {/* Assignment Info */}
            <div className={`rounded-lg p-6 ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-md'}`}>
              <h3 className={`text-sm font-medium mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Assignment Info</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Status</span>
                  <span className="flex items-center gap-1" style={{ color: statusStyle.color }}>
                    {statusStyle.icon}
                    {statusStyle.label}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Priority</span>
                  <span className="font-medium" style={{ color: priorityStyle.color }}>
                    {priorityStyle.label}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Stage</span>
                  <span className={isDark ? 'text-white' : 'text-gray-900'}>{assignment.stage}</span>
                </div>
                <div className="flex justify-between">
                  <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Assigned</span>
                  <span className={isDark ? 'text-white' : 'text-gray-900'}>{assignment.assignedDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Due Date</span>
                  <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{assignment.dueDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Progress</span>
                  <span className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{assignment.progress}%</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className={`rounded-lg p-6 ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-md'}`}>
              <h3 className={`text-sm font-medium mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Quick Actions</h3>
              <div className="space-y-2">
                {assignment.status !== 'completed' && (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 hover:shadow-md"
                    style={{ backgroundColor: colors.primaryBg, color: colors.primary }}
                  >
                    <Edit className="w-4 h-4" />
                    <span className="text-sm font-medium">Update Status</span>
                  </button>
                )}
                <button className="w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 hover:shadow-md" style={{ backgroundColor: colors.primaryBg, color: colors.primary }}>
                  <Printer className="w-4 h-4" />
                  <span className="text-sm font-medium">Print Report</span>
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 hover:shadow-md" style={{ backgroundColor: colors.primaryBg, color: colors.primary }}>
                  <Share2 className="w-4 h-4" />
                  <span className="text-sm font-medium">Share Update</span>
                </button>
              </div>
            </div>

            {/* Importer Details */}
            <div className={`rounded-lg p-6 ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-md'}`}>
              <h3 className={`text-sm font-medium mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Importer Details</h3>
              <div className="space-y-2 text-sm">
                <div>
                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Company</p>
                  <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{assignment.importer}</p>
                </div>
                <div>
                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Contact</p>
                  <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{assignment.importerContact}</p>
                </div>
                <div>
                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Email</p>
                  <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{assignment.importerEmail}</p>
                </div>
                <div>
                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Phone</p>
                  <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{assignment.importerPhone}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Send icon component
const Send = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13" />
    <polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
);

export default ClearingAgentAssignmentDetails;